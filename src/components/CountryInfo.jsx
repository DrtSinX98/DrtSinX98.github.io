'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Annotation } from 'react-simple-maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf, faDroplet, faCloudRain, faClock } from '@fortawesome/free-solid-svg-icons';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// TypeWriter component for stats
const TypeWriter = ({ text, delay = 30 }) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    setCurrentText('');
    let i = 0;
    // ensure text is string
    const strText = String(text);
    const timer = setInterval(() => {
      if (i < strText.length) {
        setCurrentText(strText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{currentText}</span>;
};

export default function CountryInfo({ country, data, visitedCities, labels = {} }) {
  const [weather, setWeather] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    if (data) {
      setWeather(null);
      setTimezone(null);
      setCurrentTime('');
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lng}&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto`)
        .then(res => res.json())
        .then(resData => {
          if (resData.current) {
            setWeather(resData.current);
          }
          if (resData.timezone) {
            setTimezone(resData.timezone);
          }
        })
        .catch(err => console.error(err));
    }
  }, [data]);

  useEffect(() => {
    if (!timezone) return;

    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(formattedTime);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  if (!data) return null;

  return (
    <div className="mb-5 mt-3">
      <Row className="g-4 align-items-stretch">
        {/* Left Column: Map */}
        <Col md={5}>
          <div
            className="glass-card"
            style={{
              height: '100%',
              minHeight: '350px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <ComposableMap projection="geoMercator" width={400} height={350} style={{ width: '100%', height: '100%' }}>
              <ZoomableGroup
                center={data.mapCenter}
                zoom={data.mapZoom}
                minZoom={data.mapZoom}
                maxZoom={data.mapZoom * 4}
                filterZoomEvent={e => e.type === 'wheel'}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies
                      .filter(geo => geo.properties.name === country)
                      .map(geo => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: 'rgba(201, 21, 116, 0.4)',
                              stroke: 'var(--secondary-color)',
                              strokeWidth: 0.5,
                              outline: 'none',
                              filter: hovered ? 'drop-shadow(0 0 15px var(--secondary-color))' : 'none',
                              transition: 'all 0.4s ease'
                            },
                            hover: {
                              fill: 'rgba(201, 21, 116, 0.6)',
                              stroke: 'var(--secondary-color)',
                              strokeWidth: 1,
                              outline: 'none',
                              filter: 'drop-shadow(0 0 25px var(--secondary-color))',
                              transition: 'all 0.4s ease'
                            },
                            pressed: { outline: 'none' }
                          }}
                        />
                      ))
                  }
                </Geographies>

                {/* Greeting Annotation */}
                <Annotation
                  subject={data.mapCenter}
                  dx={0}
                  dy={0}
                  connectorProps={{ stroke: "none" }}
                >
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{
                      fontFamily: 'monospace',
                      fill: '#fff',
                      fontSize: `${18 / data.mapZoom}px`,
                      fontWeight: 'bold',
                      textShadow: '0px 0px 5px rgba(0,0,0,1), 0px 0px 10px var(--secondary-color)',
                      pointerEvents: 'none',
                      opacity: hovered ? 1 : 0,
                      transition: 'opacity 0.4s ease'
                    }}
                  >
                    {data.greeting}!
                  </text>
                </Annotation>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </Col>

        {/* Right Column: Info */}
        <Col md={7}>
          <div className="glass-card h-100 d-flex flex-column justify-content-center p-4" style={{ fontFamily: 'monospace', fontSize: '1.05rem' }}>
            <h3 className="mb-4 pink" style={{ fontWeight: 'bold', fontFamily: 'var(--bs-font-sans-serif)' }}>
              {data.displayName || data.name}
            </h3>

            <div className="mb-2">
              <strong style={{ color: 'var(--bs-body-color)' }}>Continent: </strong>
              <span style={{ color: 'var(--secondary-color)' }}><TypeWriter text={data.continent} /></span>
            </div>

            <div className="mb-2">
              <strong style={{ color: 'var(--bs-body-color)' }}>Area: </strong>
              <span style={{ color: 'var(--secondary-color)' }}><TypeWriter text={data.area} /></span>
            </div>
            <div className="mb-2">
              <strong style={{ color: 'var(--bs-body-color)' }}>Population: </strong>
              <span style={{ color: 'var(--secondary-color)' }}><TypeWriter text={data.population} /></span>
            </div>
            <div className="mb-4">
              <strong style={{ color: 'var(--bs-body-color)' }}>Visited Cities: </strong>
              <span style={{ color: 'var(--secondary-color)' }}><TypeWriter text={visitedCities.join(', ')} /></span>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <strong style={{ color: 'var(--bs-body-color)' }}>Capital: </strong>
                <span style={{ color: 'var(--secondary-color)' }}><TypeWriter text={data.capital} /></span>
              </div>
            </div>

            {weather ? (
              <Row className="g-3">
                <Col xs={6} md={3} className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faTemperatureHalf} className="me-2" style={{ color: 'var(--secondary-color)' }} />
                  <span style={{ color: 'var(--secondary-color)' }}>{weather.temperature_2m}°C</span>
                </Col>
                <Col xs={6} md={3} className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faDroplet} className="me-2" style={{ color: 'var(--secondary-color)' }} />
                  <span style={{ color: 'var(--secondary-color)' }}>{weather.relative_humidity_2m}%</span>
                </Col>
                <Col xs={6} md={3} className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCloudRain} className="me-2" style={{ color: 'var(--secondary-color)' }} />
                  <span style={{ color: 'var(--secondary-color)' }}>{weather.precipitation} mm</span>
                </Col>
                <Col xs={6} md={3} className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faClock} className="me-2" style={{ color: 'var(--secondary-color)' }} />
                  <span style={{ color: 'var(--secondary-color)' }}>{currentTime || weather.time.split('T')[1]}</span>
                </Col>
              </Row>
            ) : (
              <div className="d-flex align-items-center mt-2">
                <Spinner animation="border" size="sm" style={{ color: 'var(--secondary-color)' }} className="me-2" />
                <span style={{ color: 'var(--bs-body-color)' }}>{labels.weatherLoadingLabel || 'Fetching atmosphere...'}</span>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
