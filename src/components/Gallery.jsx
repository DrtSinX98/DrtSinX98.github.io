import { useState, useEffect, useRef, useCallback } from 'react';
import { Col, Image, Container, Row, Button, Modal, ListGroup } from "react-bootstrap";
import { ComposableMap, Geographies, Geography, Graticule, ZoomableGroup } from "react-simple-maps";
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


import galleryDimensions from '../data/galleryDimensions.json';

const imageModules = import.meta.glob('../images/gallery/*/*/*.webp', { eager: true, import: 'default' });

const galleriesByCountry = {};

const cityDisplayNames = {
  "Poznan": "Poznań",
  "Vasteras": "Västerås"
};

for (const [path, url] of Object.entries(imageModules)) {
  const parts = path.split('/');
  const country = parts[parts.length - 3];
  const city = parts[parts.length - 2];
  const dims = galleryDimensions[path] || { width: 800, height: 600 };
  
  if (!galleriesByCountry[country]) galleriesByCountry[country] = {};
  if (!galleriesByCountry[country][city]) galleriesByCountry[country][city] = [];
  
  galleriesByCountry[country][city].push({ src: url, width: dims.width, height: dims.height });
}

// Ensure sorting by file name or keeping natural order
for (const country in galleriesByCountry) {
  for (const city in galleriesByCountry[country]) {
    galleriesByCountry[country][city].sort((a, b) => {
      // Natural sort for strings like img1.jpg and img10.jpg
      return a.src.localeCompare(b.src, undefined, { numeric: true, sensitivity: 'base' });
    });
  }
}
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const visitedCountries = [
  "India", "Sweden", "Thailand", 
  "Turkey", "Qatar", "Finland", "Norway", 
  "Estonia", "Latvia", "Lithuania", "Poland", 
  "Denmark", "Germany", "Hungary", "Italy"
];

const countryFlags = {
  "India": "🇮🇳", "Sweden": "🇸🇪", "Thailand": "🇹🇭", 
  "Turkey": "🇹🇷", "Qatar": "🇶🇦", "Finland": "🇫🇮", "Norway": "🇳🇴", 
  "Estonia": "🇪🇪", "Latvia": "🇱🇻", "Lithuania": "🇱🇹", "Poland": "🇵🇱", 
  "Denmark": "🇩🇰", "Germany": "🇩🇪", "Hungary": "🇭🇺", "Italy": "🇮🇹"
};


const visitedStyle = {
  default: { fill: "var(--bs-body-color)", outline: "none", transition: "all 0.3s ease", cursor: "pointer" },
  hover: { fill: "var(--secondary-color)", outline: "none", cursor: "pointer" },
  pressed: { fill: "var(--secondary-color)", outline: "none" }
};

const defaultStyle = {
  default: { fill: "rgba(201, 21, 116, 0.15)", outline: "none", transition: "all 0.3s ease", cursor: "default" },
  hover: { fill: "rgba(201, 21, 116, 0.25)", outline: "none", cursor: "default" },
  pressed: { fill: "rgba(201, 21, 116, 0.15)", outline: "none" }
};

function InteractiveGlobe({ setSelectedCountry }) {
  const [rotation, setRotation] = useState([-40, -30, 0]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState([0, 0]);
  const [zoomConfig, setZoomConfig] = useState({ isZoomed: false, x: 50, y: 50 });
  const [showList, setShowList] = useState(false);
  const animationRef = useRef(null);

  const rotateGlobe = useCallback(() => {
    if (!isInteracting && !isDragging) {
      setRotation((prev) => [(prev[0] + 0.15) % 360, prev[1], prev[2]]);
    }
    animationRef.current = requestAnimationFrame(rotateGlobe);
  }, [isInteracting, isDragging]);

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
      animationRef.current = requestAnimationFrame(rotateGlobe);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [rotateGlobe]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart([e.clientX, e.clientY]);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart[0];
      const deltaY = e.clientY - dragStart[1];
      setRotation((prev) => [(prev[0] + deltaX / 2.5) % 360, Math.max(-90, Math.min(90, prev[1] - deltaY / 2.5)), prev[2]]);
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
      setRotation((prev) => [(prev[0] + deltaX / 2.5) % 360, Math.max(-90, Math.min(90, prev[1] - deltaY / 2.5)), prev[2]]);
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
          <span className="visited-count">15</span>
          <span className="total-count">/ 195</span>
        </div>
        <h4 className="text-md-start text-center m-0" style={{ color: "var(--bs-body-color)", fontWeight: "300", lineHeight: "1.6" }}>
          <span className="pink fw-bold">Explore the world through my lens.</span><br />
          Click on my highlighted visited countries to see some wonderful pictures!
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
        <ComposableMap projection="geoOrthographic" projectionConfig={{ scale: 280, rotate: rotation }}>
          <Graticule stroke="var(--bs-body-color)" strokeWidth={0.5} style={{ opacity: 0.15 }} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
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
                    style={isVisited ? visitedStyle : defaultStyle}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <Tooltip id="map-tooltip" style={{ background: "linear-gradient(135deg, var(--secondary-color), #ff4d94)", color: "white", padding: "8px 20px", borderRadius: "20px", fontWeight: "600", boxShadow: "0 4px 10px rgba(201, 21, 116, 0.3)", border: "none", zIndex: 1000 }} />
      
      <Modal show={showList} onHide={() => setShowList(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: 'var(--bs-card-bg)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Modal.Title style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Visited Countries</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'var(--bs-card-bg)', maxHeight: '60vh', overflowY: 'auto' }}>
          <Row className="g-2">
            {visitedCountries.sort().map(country => (
              <Col xs={4} key={country}>
                <div 
                  onClick={() => {
                    setSelectedCountry(country);
                    setShowList(false);
                  }}
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
                  <span style={{ fontSize: '1.5rem' }}>{countryFlags[country] || '🌍'}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{country}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>

      <style>{`
        .country-list-item:hover {
          background-color: rgba(201, 21, 116, 0.1) !important;
          color: var(--secondary-color) !important;
        }
      `}</style>
    </div>
  );
}


const LazyImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      {...props}
      loading="lazy"
      onLoad={(e) => {
        setLoaded(true);
        if (props.onLoad) props.onLoad(e);
      }}
      style={{
        ...props.style,
        filter: loaded ? 'none' : 'blur(10px)',
        opacity: loaded ? 1 : 0.8,
        transition: 'filter 0.4s ease-out, opacity 0.4s ease-out',
        backgroundColor: 'rgba(201, 21, 116, 0.1)',
      }}
    />
  );
};

function Gallery() {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, country: null, city: null, index: -1 });
return (
    <Container>
      <Row>
        <Col lg={4} className="image-p">
          <div id="gl-img">
            <Image src="https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/gl.svg" alt="project-pic" className="mb-4" fluid />
          </div>
        </Col>
        <Col>
          <h1>Welcome to my <span className="pink">Gallery!</span></h1>
          <p className="lead">I love to travel a lot and have travelled to many places in <span className='pink'>India</span> and <span className='pink'>abroad</span>. <br />As I have some interest in <span className="pink">photography</span>, I try to click pictures of monuments, architecture, and nature. <br /> Below you can find a beautifully curated gallery of the pictures taken from my <span className="pink">phone</span>.</p>
        </Col>
      </Row>
      <hr className="my-4" />
      
      {selectedCountry ? (
        <>
          <Button variant="secondary" className="mb-4 back-btn" onClick={() => setSelectedCountry(null)}>
            ← Back to Map
          </Button>

          {galleriesByCountry[selectedCountry] ? (
            Object.entries(galleriesByCountry[selectedCountry]).map(([city, photos]) => (
              <div key={city}>
                <h2 className='place'>{cityDisplayNames[city] || city}</h2>
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
              No photos available for {selectedCountry} yet.
            </p>
          )}

          <Lightbox
            slides={lightbox.open && lightbox.country && lightbox.city ? galleriesByCountry[lightbox.country][lightbox.city] : []}
            open={lightbox.open}
            index={lightbox.index}
            close={() => setLightbox({ ...lightbox, open: false })}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          />
        </>
      ) : (

        <InteractiveGlobe setSelectedCountry={setSelectedCountry} />
      )}
      <style>{`
         #gl-img {
            width: 350px;
            height: 250px;
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