'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Hand, Maximize2, Minimize2, Pause, Play, X, ZoomIn, ZoomOut } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox, { useLightboxState } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import CountryInfo from './CountryInfo';
import RichText from './RichText';
import PageHero from './ui/PageHero';
import SectionHead from './ui/SectionHead';
import { Reveal } from './motion/Reveal';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/**
 * Chrome needs `pointerEvents` pinned and `flushSync` around the rotation state
 * or the globe stutters — see the "Workaround for rotating globe on chromium"
 * change in the original site. Detection now happens after mount so the markup
 * stays identical on the server.
 *
 * Colours are theme tokens, so the globe follows the admin accent and both
 * themes: visited countries are solid accent, the rest a faint wash of the ink.
 */
const buildStyles = (isChrome) => ({
  visited: {
    default: { fill: "var(--accent)", stroke: "var(--bg)", strokeWidth: 0.4, outline: "none", transition: "fill 0.3s ease", cursor: "pointer", ...(isChrome ? { pointerEvents: "auto" } : {}) },
    hover: { fill: "var(--accent-dark)", stroke: "var(--bg)", strokeWidth: 0.4, outline: "none", cursor: "pointer", ...(isChrome ? { pointerEvents: "auto" } : {}) },
    pressed: { fill: "var(--accent-dark)", outline: "none", ...(isChrome ? { pointerEvents: "auto" } : {}) }
  },
  other: {
    default: { fill: "var(--globe-land)", stroke: "var(--bg)", strokeWidth: 0.4, outline: "none", cursor: "default", ...(isChrome ? { pointerEvents: "none" } : {}) },
    hover: { fill: "var(--globe-land)", stroke: "var(--bg)", strokeWidth: 0.4, outline: "none", cursor: "default", ...(isChrome ? { pointerEvents: "none" } : {}) },
    pressed: { fill: "var(--globe-land)", outline: "none", ...(isChrome ? { pointerEvents: "none" } : {}) }
  }
});

const MemoizedGeographies = memo(({ geographies, visitedCountries, styles, setSelectedCountry }) => {
  return geographies.map((geo) => {
    const isVisited = visitedCountries.includes(geo.properties.name);
    return (
      <Geography
        key={geo.rsmKey}
        geography={geo}
        data-tooltip-id={isVisited ? "map-tooltip" : undefined}
        data-tooltip-content={isVisited ? geo.properties.name : undefined}
        onClick={() => {
          if (isVisited) setSelectedCountry(geo.properties.name);
        }}
        style={isVisited ? styles.visited : styles.other}
      />
    );
  });
});
MemoizedGeographies.displayName = 'MemoizedGeographies';

function InteractiveGlobe({ setSelectedCountry, countries, content }) {
  const [rotation, setRotation] = useState([-40, -30, 0]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState([0, 0]);
  const [zoomConfig, setZoomConfig] = useState({ isZoomed: false, x: 50, y: 50 });
  const [isChrome, setIsChrome] = useState(false);
  const animationRef = useRef(null);

  const interactingRef = useRef(false);
  const draggingRef = useRef(false);
  const lastTimeRef = useRef(0);

  // The rotation state changes every frame, so anything rebuilt during render
  // becomes a new prop on all ~180 <Geography> elements and defeats both the
  // memo() below and React's own bail-outs. These must stay referentially stable.
  const visitedCountries = useMemo(() => countries.map((c) => c.name), [countries]);
  const styles = useMemo(() => buildStyles(isChrome), [isChrome]);

  // The globe starts rotating on the first frame, so server rendering it only
  // ships ~60 kB of already-stale path data and trips hydration. Mount it on the
  // client and reserve the SVG's 4:3 box so nothing shifts.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsChrome(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));
    setMounted(true);
  }, []);

  // Keep refs in sync with state
  useEffect(() => { interactingRef.current = isInteracting; }, [isInteracting]);
  useEffect(() => { draggingRef.current = isDragging; }, [isDragging]);

  const rotateGlobe = useCallback((time) => {
    if (isChrome) {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!interactingRef.current && !draggingRef.current) {
        // Calculate rotation based on elapsed time (approx 0.15 deg per 16.6ms frame)
        const rotationStep = (delta * 0.15) / 16.666;
        // Cap max rotation step in case of long freezes or tab backgrounding
        const safeStep = Math.min(rotationStep, 10);
        flushSync(() => {
          setRotation((prev) => [(prev[0] + safeStep) % 360, prev[1], prev[2]]);
        });
      }
    } else {
      if (!isInteracting && !isDragging) {
        setRotation((prev) => [(prev[0] + 0.15) % 360, prev[1], prev[2]]);
      }
    }
    animationRef.current = requestAnimationFrame(rotateGlobe);
  }, [isInteracting, isDragging, isChrome]);

  useEffect(() => {
    if (isChrome) lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(rotateGlobe);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [rotateGlobe, isChrome]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart([e.clientX, e.clientY]);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart[0];
      const deltaY = e.clientY - dragStart[1];
      if (isChrome) {
        flushSync(() => {
          setRotation((prev) => [(prev[0] + deltaX / 2.5) % 360, Math.max(-90, Math.min(90, prev[1] - deltaY / 2.5)), prev[2]]);
        });
      } else {
        setRotation((prev) => [(prev[0] + deltaX / 2.5) % 360, Math.max(-90, Math.min(90, prev[1] - deltaY / 2.5)), prev[2]]);
      }
      setDragStart([e.clientX, e.clientY]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart([e.touches[0].clientX, e.touches[0].clientY]);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - dragStart[0];
      const deltaY = e.touches[0].clientY - dragStart[1];
      if (isChrome) {
        flushSync(() => {
          setRotation((prev) => [(prev[0] + deltaX / 2.5) % 360, Math.max(-90, Math.min(90, prev[1] - deltaY / 2.5)), prev[2]]);
        });
      } else {
        setRotation((prev) => [(prev[0] + deltaX / 2.5) % 360, Math.max(-90, Math.min(90, prev[1] - deltaY / 2.5)), prev[2]]);
      }
      setDragStart([e.touches[0].clientX, e.touches[0].clientY]);
    }
  };

  const handleDoubleClick = (e) => {
    if (zoomConfig.isZoomed) {
      setZoomConfig({ isZoomed: false, x: 50, y: 50 });
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomConfig({ isZoomed: true, x, y });
    }
  };

  const total = Number(content.totalCountries) || 195;
  const share = Math.min(100, Math.round((countries.length / total) * 100));

  return (
    <div className="vx-globe vx-card">
      <div className="vx-globe__info">
        <p className="vx-mono-label">Countries visited</p>
        <p className="vx-stat" aria-label={`${countries.length} of ${total} countries visited`}>
          <span className="vx-stat__num">{countries.length}</span>
          <span className="vx-stat__of">/ {total}</span>
        </p>
        <div className="vx-meter" role="img" aria-label={`${share}% of the world`}>
          <span style={{ width: `${Math.max(share, 2)}%` }} />
        </div>
        <p className="vx-globe__sub">{content.mapSubline}</p>

        <ul className="vx-legend" aria-hidden="true">
          <li><i className="is-visited" /> Visited</li>
          <li><i /> Still to go</li>
        </ul>
        {/* The interactions are invisible, so say what they are. */}
        <p className="vx-globe__hint">
          <Hand size={14} aria-hidden="true" /> Drag to rotate · double-click to zoom
        </p>
      </div>

      <div className="vx-globe__stage">
        <div
          className="vx-globe__canvas"
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => { setIsInteracting(false); handleMouseUp(); }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={(e) => { setIsInteracting(true); handleTouchStart(e); }}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { setIsInteracting(false); handleMouseUp(); }}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: zoomConfig.isZoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${zoomConfig.x}% ${zoomConfig.y}%`,
          }}
        >
          {mounted ? (
            <ComposableMap projection="geoOrthographic" projectionConfig={{ scale: 280, rotate: rotation }}>
              {/* The sphere gives the world a body — an ocean disc — instead of
                  continents floating in space. */}
              <Sphere id="vx-sphere" fill="var(--globe-ocean)" stroke="var(--line-strong)" strokeWidth={0.8} />
              <Graticule stroke="var(--ink)" strokeWidth={0.4} style={{ opacity: 0.12 }} />
              <Geographies geography={geoUrl}>
                {({ geographies }) => (
                  // Memoised for every browser now, not just Chrome: the props above
                  // are stable, so the ~180 <Geography> elements are no longer
                  // rebuilt on each frame. They still redraw through the projection
                  // context, which is what actually spins the globe.
                  <MemoizedGeographies
                    geographies={geographies}
                    visitedCountries={visitedCountries}
                    styles={styles}
                    setSelectedCountry={setSelectedCountry}
                  />
                )}
              </Geographies>
            </ComposableMap>
          ) : (
            <div style={{ width: '100%', aspectRatio: '800 / 600' }} />
          )}
        </div>
      </div>

      <Tooltip id="map-tooltip" className="map-tooltip" />
    </div>
  );
}

/**
 * Every visited country, always visible, grouped by continent in the same
 * hairline-row panel the About page uses for its tech stack. (This replaces a
 * modal that was hidden behind a tap on the counter — nothing suggested the
 * counter was a button.) Lives outside the globe so it doesn't re-render with
 * each frame.
 */
const CountryChips = memo(({ countries, onSelect, title }) => {
  const groups = useMemo(() => {
    const by = new Map();
    [...countries]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((c) => {
        // Transcontinental countries are stored as "Europe/Asia"; file them under the first.
        const key = (c.continent || 'Elsewhere').split('/')[0].trim();
        by.set(key, [...(by.get(key) || []), c]);
      });
    return [...by.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
  }, [countries]);

  return (
    <section aria-labelledby="visited-title">
      <SectionHead id="visited-title" index="02" icon="mapMarker" title={title}>
        <span className="vx-count">{countries.length}</span>
      </SectionHead>
      <div className="vx-card vx-skills">
        {groups.map(([continent, list]) => (
          <div key={continent} className="vx-skillrow">
            <h3 className="vx-skillrow__title">
              <span className="vx-skillrow__icon vx-skillrow__icon--num" aria-hidden="true">{list.length}</span>
              {continent}
            </h3>
            <ul className="vx-countries__list">
              {list.map((country) => (
                <li key={country.name}>
                  <button type="button" className="vx-country" onClick={() => onSelect(country.name)}>
                    <span className="vx-country__flag" aria-hidden="true">{country.flag || '🌍'}</span>
                    {country.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});
CountryChips.displayName = 'CountryChips';

/**
 * The photo viewer's filmstrip. It replaces the Thumbnails plugin, whose boxes are
 * all one fixed size, so every photo that isn't that shape got black bars: here
 * each thumbnail is as wide as its own photo (fixed height, the photo's aspect
 * ratio), and the current one is brought to the middle of the strip.
 */
function PhotoStrip({ onGo }) {
  const { slides, globalIndex } = useLightboxState();
  const track = useRef(null);

  useEffect(() => {
    const box = track.current;
    const item = box?.children[globalIndex];
    if (!item) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    box.scrollTo({ left: item.offsetLeft - (box.clientWidth - item.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [globalIndex]);

  if (slides.length < 2) return null;

  // Dragging or scrolling the strip must not also swipe the photo behind it.
  const keep = (e) => e.stopPropagation();

  return (
    <nav className="vx-strip" aria-label="Photos">
      <ul className="vx-strip__track" ref={track} onPointerDown={keep} onWheel={keep}>
        {slides.map((slide, i) => (
          <li key={`${i}|${slide.src}`}>
            <button
              type="button"
              className={`vx-strip__thumb${i === globalIndex ? ' is-active' : ''}`}
              style={{ aspectRatio: `${slide.width || 3} / ${slide.height || 2}` }}
              aria-label={`Photo ${i + 1} of ${slides.length}`}
              aria-current={i === globalIndex ? 'true' : undefined}
              onClick={() => onGo(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.src} alt="" loading="lazy" decoding="async" draggable={false} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// The viewer's controls, drawn with the same line icons as the rest of the site.
const lightboxIcon = (Icon) => {
  const Rendered = () => <Icon className="yarl__icon" size={22} strokeWidth={2} aria-hidden="true" />;
  return Rendered;
};
const LIGHTBOX_ICONS = {
  iconClose: lightboxIcon(X),
  iconPrev: lightboxIcon(ChevronLeft),
  iconNext: lightboxIcon(ChevronRight),
  iconZoomIn: lightboxIcon(ZoomIn),
  iconZoomOut: lightboxIcon(ZoomOut),
  iconSlideshowPlay: lightboxIcon(Play),
  iconSlideshowPause: lightboxIcon(Pause),
  iconEnterFullscreen: lightboxIcon(Maximize2),
  iconExitFullscreen: lightboxIcon(Minimize2),
};

const LazyImage = ({ style, ...restProps }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`gallery-image-wrapper vx-photo${loaded ? ' is-loaded' : ''}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...restProps}
        alt={restProps.alt || ''}
        loading="lazy"
        onLoad={(e) => {
          setLoaded(true);
          if (restProps.onLoad) restProps.onLoad(e);
        }}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
      />
    </div>
  );
};

function Gallery({ content = {}, countries = [], galleries = {}, illustration = null, animateIllustration = true }) {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, country: null, city: null, index: -1 });
  const viewRef = useRef(null);
  const hasMounted = useRef(false);

  const countryData = countries.find((c) => c.name === selectedCountry);
  // The stored label carries its own arrow ("← Back to Map"); the button draws
  // a real icon, so drop the glyph rather than show two arrows.
  const backLabel = (content.backLabel || 'Back to Map').replace(/^[\s←]+/, '');

  // Opening or closing a country swaps the whole view, so bring the new view
  // into sight — otherwise the reader is left looking at the old scroll position.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    viewRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [selectedCountry]);

  const cityEntries = selectedCountry ? Object.entries(galleries[selectedCountry] || {}) : [];

  return (
    <>
      <PageHero
        page="gallery"
        label="Gallery"
        heading={content.heading}
        lead={<RichText value={content.lead} />}
        image={content.image}
        illustration={illustration}
        alt="Illustration: a traveller with a folder of photographs"
        animate={animateIllustration}
      />

      <div className="vx-wrap vx-gallery" ref={viewRef}>
        {selectedCountry ? (
          <>
            <button type="button" className="vx-btn vx-btn--soft vx-backbtn" onClick={() => setSelectedCountry(null)}>
              <ArrowLeft size={16} aria-hidden="true" /> {backLabel}
            </button>

            <CountryInfo
              country={selectedCountry}
              data={countryData}
              visitedCities={Object.keys(galleries[selectedCountry] || {})}
              labels={content}
            />

            {cityEntries.length > 0 ? (
              cityEntries.map(([city, photos], ci) => (
                <section key={city} className="vx-city" aria-labelledby={`city-${ci}`}>
                  <Reveal className="vx-city__head">
                    <span className="vx-sechead__index" aria-hidden="true">{String(ci + 1).padStart(2, '0')}</span>
                    <h2 id={`city-${ci}`} className="vx-city__name">{city}</h2>
                    <span className="vx-city__count">{photos.length}</span>
                  </Reveal>
                  <RowsPhotoAlbum
                    photos={photos}
                    targetRowHeight={300}
                    onClick={({ index }) => setLightbox({ open: true, country: selectedCountry, city, index })}
                    render={{ image: LazyImage }}
                  />
                </section>
              ))
            ) : (
              <p className="vx-empty">
                {(content.emptyLabel || 'No photos available for {country} yet.').replace('{country}', selectedCountry)}
              </p>
            )}

            <Lightbox
              slides={lightbox.open && lightbox.country && lightbox.city ? galleries[lightbox.country][lightbox.city] : []}
              open={lightbox.open}
              index={lightbox.index}
              close={() => setLightbox({ ...lightbox, open: false })}
              plugins={[Fullscreen, Slideshow, Zoom]}
              className="vx-lightbox"
              render={{
                ...LIGHTBOX_ICONS,
                controls: () => <PhotoStrip onGo={(index) => setLightbox((l) => ({ ...l, index }))} />,
              }}
              on={{ view: ({ index }) => setLightbox((l) => (l.index === index ? l : { ...l, index })) }}
            />
          </>
        ) : (
          <>
            <section aria-labelledby="map-title">
              <SectionHead id="map-title" index="01" icon="globe" title={content.mapHeadline || 'Explore the world through my lens.'} />
              <InteractiveGlobe setSelectedCountry={setSelectedCountry} countries={countries} content={content} />
            </section>
            <CountryChips
              countries={countries}
              onSelect={setSelectedCountry}
              title={content.visitedListTitle || 'Visited Countries'}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Gallery;
