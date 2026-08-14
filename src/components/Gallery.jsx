'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { flushSync } from 'react-dom';
import { Col, Container, Row, Button, Modal, Spinner } from "react-bootstrap";
import { ComposableMap, Geographies, Geography, Graticule } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import CountryInfo from './CountryInfo';
import RichText from './RichText';
import Illustration from './Illustration';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/**
 * Chrome needs `pointerEvents` pinned and `flushSync` around the rotation state
 * or the globe stutters — see the "Workaround for rotating globe on chromium"
 * change in the original site. Detection now happens after mount so the markup
 * stays identical on the server.
 */
const buildStyles = (isChrome) => ({
  visited: {
    default: { fill: "var(--bs-body-color)", outline: "none", transition: "all 0.3s ease", cursor: "pointer", ...(isChrome ? { pointerEvents: "auto" } : {}) },
    hover: { fill: "var(--secondary-color)", outline: "none", cursor: "pointer", ...(isChrome ? { pointerEvents: "auto" } : {}) },
    pressed: { fill: "var(--secondary-color)", outline: "none", ...(isChrome ? { pointerEvents: "auto" } : {}) }
  },
  other: {
    default: { fill: "rgba(201, 21, 116, 0.15)", outline: "none", transition: "all 0.3s ease", cursor: "default", ...(isChrome ? { pointerEvents: "none" } : {}) },
    hover: { fill: "rgba(201, 21, 116, 0.25)", outline: "none", cursor: "default", ...(isChrome ? { pointerEvents: "none" } : {}) },
    pressed: { fill: "rgba(201, 21, 116, 0.15)", outline: "none", ...(isChrome ? { pointerEvents: "none" } : {}) }
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

/**
 * Kept out of the globe's render path — the globe re-renders on every animation
 * frame, and rebuilding these tiles 60 times a second is pure waste.
 */
const VisitedCountriesModal = memo(({ show, onHide, onSelect, countries, title }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton style={{ backgroundColor: 'var(--bs-card-bg)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Modal.Title style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backgroundColor: 'var(--bs-card-bg)', maxHeight: '60vh', overflowY: 'auto' }}>
      <Row className="g-2">
        {countries.map(country => (
          <Col xs={4} key={country.name}>
            <div
              onClick={() => onSelect(country.name)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: 'var(--bs-body-color)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '15px 5px',
                textAlign: 'center'
              }}
              className="country-list-item h-100"
            >
              <span style={{ fontSize: '1.5rem' }}>{country.flag || '🌍'}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{country.name}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Modal.Body>
  </Modal>
));
VisitedCountriesModal.displayName = 'VisitedCountriesModal';

function InteractiveGlobe({ setSelectedCountry, countries, content }) {
  const [rotation, setRotation] = useState([-40, -30, 0]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState([0, 0]);
  const [zoomConfig, setZoomConfig] = useState({ isZoomed: false, x: 50, y: 50 });
  const [showList, setShowList] = useState(false);
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
  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name)),
    [countries],
  );

  const closeList = useCallback(() => setShowList(false), []);
  const selectFromList = useCallback(
    (name) => {
      setSelectedCountry(name);
      setShowList(false);
    },
    [setSelectedCountry],
  );

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

  return (
    <div
      className="map-container glass-card p-4 mb-4"
      style={{ overflow: 'hidden' }}
    >
      <div className="d-flex align-items-center justify-content-center mb-4 gap-4 flex-wrap flex-md-nowrap">
        <div
          className="visited-counter"
          onClick={() => setShowList(true)}
          style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="View list of visited countries"
        >
          <span className="visited-count">{countries.length}</span>
          <span className="total-count">/ {content.totalCountries}</span>
        </div>
        <h4 className="text-md-start text-center m-0" style={{ color: "var(--bs-body-color)", fontWeight: "300", lineHeight: "1.6" }}>
          <span className="pink fw-bold">{content.mapHeadline}</span><br />
          {content.mapSubline}
        </h4>
      </div>
      <div
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
          width: '100%',
          height: '100%',
          transform: zoomConfig.isZoomed ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${zoomConfig.x}% ${zoomConfig.y}%`,
          transition: 'transform 0.4s ease'
        }}
      >
        {mounted ? (
          <ComposableMap projection="geoOrthographic" projectionConfig={{ scale: 280, rotate: rotation }}>
            <Graticule stroke="var(--bs-body-color)" strokeWidth={0.5} style={{ opacity: 0.15 }} />
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
      <Tooltip id="map-tooltip" style={{ background: "linear-gradient(135deg, var(--secondary-color), #ff4d94)", color: "white", padding: "8px 20px", borderRadius: "20px", fontWeight: "600", boxShadow: "0 4px 10px rgba(201, 21, 116, 0.3)", border: "none", zIndex: 1000 }} />

      <VisitedCountriesModal
        show={showList}
        onHide={closeList}
        onSelect={selectFromList}
        countries={sortedCountries}
        title={content.visitedListTitle}
      />

      <style>{`
        .country-list-item:hover {
          background-color: rgba(201, 21, 116, 0.1) !important;
          color: var(--secondary-color) !important;
        }
      `}</style>
    </div>
  );
}


const LazyImage = ({ style, ...restProps }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="gallery-image-wrapper" style={{
      ...style,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--bs-border-radius)'
    }}>
      {!loaded && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          <Spinner animation="grow" style={{ color: 'var(--secondary-color)', opacity: 0.5 }} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...restProps}
        alt={restProps.alt || ''}
        loading="lazy"
        onLoad={(e) => {
          setLoaded(true);
          if (restProps.onLoad) restProps.onLoad(e);
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      />
    </div>
  );
};

function Gallery({ content = {}, countries = [], galleries = {}, illustration = null, animateIllustration = true }) {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, country: null, city: null, index: -1 });
  const [showScrollUp, setShowScrollUp] = useState(false);

  const countryData = countries.find((c) => c.name === selectedCountry);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
return (
    <Container>
      <Row>
        <Col lg={4} className="image-p">
          <div id="gl-img">
            <Illustration
              illustration={illustration}
              src={content.image}
              alt="project-pic"
              className="mb-4"
              animate={animateIllustration}
            />
          </div>
        </Col>
        <Col>
          <h1><RichText value={content.heading} /></h1>
          <p className="lead"><RichText value={content.lead} /></p>
        </Col>
      </Row>
      <hr className="my-4" />

      {selectedCountry ? (
        <>
          <Button variant="secondary" className="mb-4 back-btn" onClick={() => setSelectedCountry(null)}>
            {content.backLabel}
          </Button>

          {showScrollUp && (
            <Button
              variant="secondary"
              className="back-btn"
              onClick={scrollToTop}
              style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                opacity: 0.9,
                fontSize: '24px',
                padding: 0
              }}
              title="Go Up"
            >
              ↑
            </Button>
          )}

          <CountryInfo
            country={selectedCountry}
            data={countryData}
            visitedCities={Object.keys(galleries[selectedCountry] || {})}
            labels={content}
          />

          {galleries[selectedCountry] ? (
            Object.entries(galleries[selectedCountry]).map(([city, photos]) => (
              <div key={city}>
                <h2 className='place'>{city}</h2>
                <RowsPhotoAlbum
                  photos={photos}
                  targetRowHeight={300}
                  onClick={({ index }) => setLightbox({ open: true, country: selectedCountry, city, index })}
                  render={{ image: LazyImage }}
                />
              </div>
            ))
          ) : (
            <p className="text-center mt-5" style={{ color: 'var(--bs-body-color)' }}>
              {(content.emptyLabel || 'No photos available for {country} yet.').replace('{country}', selectedCountry)}
            </p>
          )}

          <Lightbox
            slides={lightbox.open && lightbox.country && lightbox.city ? galleries[lightbox.country][lightbox.city] : []}
            open={lightbox.open}
            index={lightbox.index}
            close={() => setLightbox({ ...lightbox, open: false })}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </>
      ) : (

        <InteractiveGlobe setSelectedCountry={setSelectedCountry} countries={countries} content={content} />
      )}
      <style>{`
         #gl-img {
            width: 350px;
            height: 350px;
          }

          h1 {
            font-size: 50px;
            font-weight: bold;
          }

          .lead {
            font-size: 24px;
            line-height: 1.5;
          }

          .pink {
            color: var(--secondary-color);
          }

          .place {
            color: var(--tertiary-color);
            text-align: center;
            background-color: var(--secondary-color);
            border-radius: var(--bs-border-radius);
            padding: 5px;
            margin-top: 10px;
          }
          .react-photo-album--photo img {
            border-radius: var(--bs-border-radius);
          }
          .map-container {
            background-color: var(--bs-card-bg);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
          }
          .visited-counter {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(201, 21, 116, 0.2), rgba(201, 21, 116, 0.05));
            border: 2px solid var(--secondary-color);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--bs-body-color);
            box-shadow: 0 4px 10px rgba(201, 21, 116, 0.2);
            flex-shrink: 0;
          }
          .visited-count {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--secondary-color);
            line-height: 1;
          }
          .total-count {
            font-size: 0.9rem;
            opacity: 0.8;
          }
        `}</style>
    </Container>
  );
}

export default Gallery;
