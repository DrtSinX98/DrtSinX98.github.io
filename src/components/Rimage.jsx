import { React, useState } from "react";
import { Col } from "react-bootstrap";
import pfp from "../images/pfp.jpg";
import { useSpring, animated } from "react-spring";
import blobshape from "blobshape";

function Rimage() {
  return (
    <Col lg={4} className="image-p">
      <div className="blob">
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
          style={{
            width: "92%",
            opacity: 0.95,
            position: "absolute",
            top: 10,
            left: 10
          }}
        />
      </div>
      <style>
        {`
          .blob{
          width:400px;
          height:400px;
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
  const [flip, set] = useState(false);

  const { path } = useSpring({
    to: { path: getRandomPath() },
    from: { path: getRandomPath() },
    reverse: flip,
    config: {
      duration: props.image ? 3000 : 2000
    },
    onRest: (x) => {
      x.value.path = getRandomPath();
      // !props.image &&
      set(!flip);
    }
  });

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
            width="80%"
            height="80%"
            clipPath="url(#a)"
            xlinkHref={pfp}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      )}
    </svg>
  );
}

export default Rimage;
