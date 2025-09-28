import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { Container } from "@tsparticles/engine";
import React from "react";

function BackgroundParticlesComponent() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadStarsPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (!container) return;
    console.log("Particles container loaded", container);
  };

  const startOptions = useMemo(
    () => ({
      preset: "stars",
      background: {
        color: {
          value: "transparent",
        },
      },
      particles: {
        number: {
          value: 100,
        },
        color: {
          value: "#ffffff",
        },
        move: {
          enable: true,
          speed: 0.5,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    }),
    []
  );

  return init ? (
    <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={startOptions} />
  ) : null;
}

const BackgroundParticles = React.memo(BackgroundParticlesComponent);
export default BackgroundParticles;