'use client';

import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Annotation } from 'react-simple-maps';

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

  // The full value is always in the accessibility tree; only the visible text
  // is typed, so a screen reader never hears it one character at a time.
  return (
    <>
      <span className="vx-sr-only">{String(text)}</span>
      <span aria-hidden="true">{currentText}</span>
    </>
  );
};

function Fact({ label, children }) {
  return (
    <div className="vx-fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

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
    <div className="vx-country-info">
      {/* The country, drawn large; its greeting appears on hover. */}
      <div
        className="vx-card vx-country-info__map"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="img"
        aria-label={`Map of ${data.displayName || data.name}`}
      >
        <ComposableMap projection="geoMercator" width={400} height={350} style={{ width: '100%', height: '100%' }}>
          <ZoomableGroup
            center={data.mapCenter}
            zoom={data.mapZoom}
            minZoom={data.mapZoom}
            maxZoom={data.mapZoom}
            // The map is a picture, not a control: no wheel, pinch or drag. Any of
            // those would swallow the gesture the page needs to scroll.
            filterZoomEvent={() => false}
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
                          fill: 'var(--accent)',
                          stroke: 'var(--bg)',
                          strokeWidth: 0.5,
                          outline: 'none',
                          opacity: hovered ? 1 : 0.88,
                          transition: 'opacity 0.3s ease',
                        },
                        hover: {
                          fill: 'var(--accent)',
                          stroke: 'var(--bg)',
                          strokeWidth: 0.5,
                          outline: 'none',
                          opacity: 1,
                        },
                        pressed: { outline: 'none' },
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
                  fontFamily: 'var(--ff-mono)',
                  fill: '#fff',
                  fontSize: `${18 / data.mapZoom}px`,
                  fontWeight: 'bold',
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

      <div className="vx-card vx-card--pad vx-country-info__facts">
        <h2 className="vx-country-info__name">{data.displayName || data.name}</h2>

        <dl className="vx-facts">
          <Fact label="Continent"><TypeWriter text={data.continent} /></Fact>
          <Fact label="Capital"><TypeWriter text={data.capital} /></Fact>
          <Fact label="Area"><TypeWriter text={data.area} /></Fact>
          <Fact label="Population"><TypeWriter text={data.population} /></Fact>
          <Fact label="Visited cities">
            <TypeWriter text={visitedCities.join(', ')} />
          </Fact>
        </dl>

        {weather ? (
          <ul className="vx-weather" aria-label="Current conditions">
            <li>
              <Icon name="temperature" />
              <span>{weather.temperature_2m}°C</span>
            </li>
            <li>
              <Icon name="droplet" />
              <span>{weather.relative_humidity_2m}%</span>
            </li>
            <li>
              <Icon name="cloudRain" />
              <span>{weather.precipitation} mm</span>
            </li>
            <li>
              <Icon name="clock" />
              <span>{currentTime || weather.time.split('T')[1]}</span>
            </li>
          </ul>
        ) : (
          <p className="vx-weather vx-weather--loading" role="status">
            <span className="vx-miniloader" aria-hidden="true" />
            {labels.weatherLoadingLabel || 'Fetching atmosphere...'}
          </p>
        )}
      </div>
    </div>
  );
}
