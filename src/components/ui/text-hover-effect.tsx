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
  const [maskPosition, setMaskPosition] = useState({ cx: 600, cy: 150 });
  const [isGlancing, setIsGlancing] = useState(false);

  const isInView = useInView(svgRef, { once: false, amount: 0.1 });

  // Auto-glance sweep when scrolled into view
  useEffect(() => {
    if (isInView) {
      setIsGlancing(true);
      setMaskPosition({ cx: -300, cy: 150 });
      
      const startTimeout = setTimeout(() => {
        setMaskPosition({ cx: 1500, cy: 150 });
      }, 100);

      const endTimeout = setTimeout(() => {
        setIsGlancing(false);
      }, 4000);

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
      const cx = ((cursor.x - svgRect.left) / svgRect.width) * 1200;
      const cy = ((cursor.y - svgRect.top) / svgRect.height) * 300;
      setMaskPosition({ cx, cy });
    }
  }, [cursor, isGlancing]);

  useEffect(() => {
    const triggerElement = svgRef.current?.closest("footer") || svgRef.current?.closest("section") || svgRef.current?.parentElement;
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
    ? { duration: 3.5, ease: "easeInOut" }
    : { duration: duration ?? 0, ease: "easeOut" };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 300"
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
              <stop offset="0%" stopColor="#B6443A" />
              <stop offset="35%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#8B8680" />
              <stop offset="100%" stopColor="#B6443A" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: -300, cy: 150 }}
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
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.2"
        className="fill-transparent stroke-neutral-200 font-sans text-[170px] font-black uppercase tracking-tighter dark:stroke-white/15"
        initial={{ strokeDashoffset: 4000, strokeDasharray: 4000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 4000,
        }}
        transition={{
          duration: 8,
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
        strokeWidth="1.2"
        mask="url(#textMask)"
        className="fill-transparent font-sans text-[170px] font-black uppercase tracking-tighter"
      >
        {text}
      </text>
    </svg>
  );
};
