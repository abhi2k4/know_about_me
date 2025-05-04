import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { useTheme } from "@/components/ThemeProvider";

export const ParticleBackground = () => {
  const { theme } = useTheme();

  return (
    <Particles
      className="fixed inset-0 -z-1 pointer-events-none"
      options={{
        particles: {
          number: { value: 15, density: { enable: true, value_area: 800 } },
          color: { 
            value: theme === 'dark' ? "#3b82f6" : "#1e40af"
          },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.2,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
          },
          size: {
            value: 5,
            random: true,
            animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true
          }
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fullScreen: {
          enable: false,
          zIndex: -1
        },
        detectRetina: true
      }}
    />
  );
};