'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBG = ({ config = {} }) => {
  const [init, setInit] = useState(false);

  const {
    enabled = true,
    color = "#c91574",
    count = 150,
    speed = 2,
    linkDistance = 150,
    linkOpacity = 0.3,
    opacity = 0.4,
  } = config;

  useEffect(() => {
    if (!enabled) return;
    initParticlesEngine(async (engine) => {

      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [enabled]);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "none",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 80,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          color: color,
          distance: linkDistance,
          enable: true,
          opacity: linkOpacity,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: count,
        },
        opacity: {
          value: opacity,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [color, count, speed, linkDistance, linkOpacity, opacity],
  );

  if (init && enabled) {
    return (
      <Particles
        id="tsparticles"
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesBG
