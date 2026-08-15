"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const graphemeSegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function segmentCharacters(text: string) {
  if (!graphemeSegmenter) return Array.from(text);
  return Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment);
}

export interface FlippingWordSwapProps {
  /** The word or short phrase shown at rest. */
  word1?: string;
  /** The word or short phrase revealed on interaction. */
  word2?: string;
  /** List of words to cycle through continuously in loop. */
  words?: string[];
  /** Whether the animation loops continuously. Defaults to true. */
  autoplay?: boolean;
  /** Pause between word flips in milliseconds. Defaults to 3000. */
  interval?: number;
  /** Duration of each character flip in milliseconds. */
  duration?: number;
  /** Delay between neighboring character flips in milliseconds. */
  stagger?: number;
  /** Additional classes applied to the interactive container. */
  className?: string;
  /** Additional classes applied only to the revealed word. */
  toClassName?: string;
  /** Inline styles applied to the interactive container. */
  style?: CSSProperties;
  /** Inline styles applied only to the revealed word. */
  toStyle?: CSSProperties;
}

export function FlippingWordSwap({
  word1: initialWord1,
  word2: initialWord2,
  words,
  autoplay = true,
  interval = 3200,
  duration = 450,
  stagger = 35,
  className,
  toClassName,
  style,
  toStyle,
}: FlippingWordSwapProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isHoveredRef = useRef(false);

  // Multi-word loop list or 2-word fallbacks
  const wordList = words && words.length > 0 
    ? words 
    : [initialWord1 || "Full-Stack Engineering", initialWord2 || "Applied AI & Systems"];

  const [wordIndex, setWordIndex] = useState(0);

  const currentWord1 = wordList[wordIndex];
  const currentWord2 = wordList[(wordIndex + 1) % wordList.length];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const resolvedDuration = prefersReducedMotion
      ? 0
      : Math.max(180, duration) / 1000;
    const resolvedStagger = prefersReducedMotion
      ? 0
      : Math.max(0, stagger) / 1000;

    const context = gsap.context(() => {
      const firstWord = gsap.utils.toArray<HTMLElement>(
        '[data-flip-word="first"]',
      );
      const secondWord = gsap.utils.toArray<HTMLElement>(
        '[data-flip-word="second"]',
      );

      gsap.set(firstWord, {
        rotationX: 0,
        opacity: 1,
        transformOrigin: "center top",
      });
      gsap.set(secondWord, {
        rotationX: -82,
        opacity: 0,
        transformOrigin: "center bottom",
      });

      const timeline = gsap.timeline({ paused: true });
      timeline
        .to(firstWord, {
          rotationX: 82,
          opacity: 0,
          duration: resolvedDuration,
          stagger: resolvedStagger,
          ease: "power2.in",
        })
        .to(
          secondWord,
          {
            rotationX: 0,
            opacity: 1,
            duration: resolvedDuration,
            stagger: resolvedStagger,
            ease: "power2.out",
          },
          `<${resolvedDuration * 0.62}`,
        );

      timelineRef.current = timeline;
    }, containerRef);

    return () => {
      timelineRef.current = null;
      context.revert();
    };
  }, [duration, stagger, currentWord1, currentWord2]);

  // Autoplay / Continuous Looping
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      if (timelineRef.current && !isHoveredRef.current) {
        timelineRef.current.play().then(() => {
          setWordIndex((prev) => (prev + 1) % wordList.length);
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, wordList.length]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (timelineRef.current) {
      timelineRef.current.play().then(() => {
        setWordIndex((prev) => (prev + 1) % wordList.length);
      });
    }
  }, [wordList.length]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  const renderCharacters = (text: string, layer: "first" | "second") =>
    segmentCharacters(text).map((character, index) => (
      <span
        key={`${layer}-${index}-${character}`}
        data-flip-word={layer}
        className="inline-block whitespace-pre [backface-visibility:hidden] [will-change:transform,opacity]"
      >
        {character === " " ? "\u00a0" : character}
      </span>
    ));

  return (
    <button
      ref={containerRef}
      type="button"
      className={cn(
        "relative inline-grid cursor-pointer select-none border-0 bg-transparent p-0 align-baseline font-[inherit] leading-[inherit] tracking-[inherit] text-[inherit]",
        "rounded-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2",
        className,
      )}
      aria-label={currentWord1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="col-start-1 row-start-1 inline-grid overflow-hidden [perspective:800px]">
        <span
          className="col-start-1 row-start-1 inline-flex items-baseline justify-start gap-[0.012em] whitespace-pre"
          aria-hidden="true"
        >
          {renderCharacters(currentWord1, "first")}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 inline-flex items-baseline justify-start gap-[0.012em] whitespace-pre",
            toClassName,
          )}
          aria-hidden="true"
          style={toStyle}
        >
          {renderCharacters(currentWord2, "second")}
        </span>
      </span>
    </button>
  );
}
