'use client';

import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import blobshape from "blobshape";

function Rimage({ light, dark }) {
  // The blob paths are randomised on every frame, so they can't be server
  // rendered. The fixed-size wrapper below is, which keeps the layout stable.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Col lg={4} className="image-p">
      <div className="blob">
        {mounted && (
          <>
            <Blob
              color="var(--secondary-color)"
              style={{ opacity: 0.8, position: "absolute", top: 0, left: 0 }}
            />
            <Blob
              color="var(--primary-color)"
              style={{ opacity: 1.0, position: "absolute", top: 0, left: 0 }}
            />
            <Blob
              color="var(--secondary-color)"
              style={{ opacity: 1.0, position: "absolute", top: 0, left: 0 }}
            />
            <Blob
              image
              light={light}
              dark={dark}
              style={{
                width: "92%",
                opacity: 0.95,
                position: "absolute",
                top: 10,
                left: 10
              }}
            />
          </>
        )}
      </div>
      <style>
        {`
          .blob{
          width:400px;
          height:320px;
          position: relative;
          }

          .image-p{
          align-items: center;
          justify-content: center;
          }

        `}
      </style>
    </Col>
  );
}

function getRandomPath() {
  return blobshape({
    growth: 8,
    edges: 15
  }).path;
}

function Blob(props) {
  // Imperative API on purpose. The original declared `to`/`from` inline and
  // relied on `onRest` re-rendering with fresh random paths to keep going; under
  // React 18 that spring settles on its target without ever animating. Driving
  // the loop explicitly gives the same continuous morph and survives the
  // double-mount that Strict Mode does in development.
  const [{ path }, api] = useSpring(() => ({ path: getRandomPath() }));

  useEffect(() => {
    let cancelled = false;
    const duration = props.image ? 3000 : 2000;

    const morph = async () => {
      while (!cancelled) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(api.start({ path: getRandomPath(), config: { duration } }));
      }
    };
    morph();

    return () => {
      cancelled = true;
      api.stop();
    };
  }, [api, props.image]);

  return (
    <svg viewBox="0 0 500 500" width="100%" style={props.style}>
      {!props.image && <animated.path fill={props.color} d={path} />}

      {props.image && (
        <>
          <defs>
            <clipPath id="a">
              <animated.path fill={props.color} d={path} />
            </clipPath>
          </defs>
          <image
            className="pfp-light"
            width="80%"
            height="80%"
            clipPath="url(#a)"
            xlinkHref={props.light}
            preserveAspectRatio="xMidYMid slice"
          />
          <image
            className="pfp-dark"
            width="80%"
            height="80%"
            clipPath="url(#a)"
            xlinkHref={props.dark}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      )}
    </svg>
  );
}

export default Rimage;
