"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: 150, cy: 50 });
  const [isGlancing, setIsGlancing] = useState(false);

  const isInView = useInView(svgRef, { once: false, amount: 0.1 });

  // Auto-glance sweep when scrolled into view
  useEffect(() => {
    if (isInView) {
      setIsGlancing(true);
      setMaskPosition({ cx: -60, cy: 50 });
      
      const startTimeout = setTimeout(() => {
        setMaskPosition({ cx: 360, cy: 50 });
      }, 100);

      const endTimeout = setTimeout(() => {
        setIsGlancing(false);
      }, 1500);

      return () => {
        clearTimeout(startTimeout);
        clearTimeout(endTimeout);
      };
    }
  }, [isInView]);

  useEffect(() => {
    if (isGlancing) return; // Skip mouse tracking during initial glance
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cx = ((cursor.x - svgRect.left) / svgRect.width) * 300;
      const cy = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx, cy });
    }
  }, [cursor, isGlancing]);

  useEffect(() => {
    const triggerElement = svgRef.current?.closest("footer") || svgRef.current?.parentElement;
    if (!triggerElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    triggerElement.addEventListener("mousemove", handleMouseMove);
    triggerElement.addEventListener("mouseenter", handleMouseEnter);
    triggerElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      triggerElement.removeEventListener("mousemove", handleMouseMove);
      triggerElement.removeEventListener("mouseenter", handleMouseEnter);
      triggerElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const isRevealed = hovered || isGlancing;
  const maskTransition = isGlancing
    ? { duration: 1.3, ease: "easeInOut" }
    : { duration: duration ?? 0, ease: "easeOut" };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {isRevealed && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          initial={{ cx: -60, cy: 50 }}
          animate={maskPosition}
          transition={maskTransition}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};
