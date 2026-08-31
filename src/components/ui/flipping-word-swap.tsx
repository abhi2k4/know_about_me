"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

export interface FlippingWordSwapProps {
  /** The word or short phrase shown at rest. */
  word1?: string;
  /** The word or short phrase revealed on interaction. */
  word2?: string;
  /** List of words to cycle through continuously in loop. */
  words?: string[];
  /** Whether the animation loops continuously. Defaults to true. */
  autoplay?: boolean;
  /** Pause between word flips in milliseconds. Defaults to 3200. */
  interval?: number;
  /** Duration of each flip in milliseconds. */
  duration?: number;
  /** Additional classes applied to the container. */
  className?: string;
  /** Additional classes applied only to the revealed word. */
  toClassName?: string;
  /** Inline styles applied to the container. */
  style?: CSSProperties;
  /** Inline styles applied only to the revealed word. */
  toStyle?: CSSProperties;
  stagger?: number;
}

export function FlippingWordSwap({
  word1: initialWord1,
  word2: initialWord2,
  words,
  autoplay = true,
  interval = 3200,
  className,
  style,
}: FlippingWordSwapProps) {
  const wordList =
    words && words.length > 0
      ? words
      : [initialWord1 || "Full-Stack Scale", initialWord2 || "Applied AI"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordList.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, wordList.length]);

  return (
    <span
      className={cn("inline-block relative overflow-hidden align-bottom py-1", className)}
      style={style}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={wordList[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block whitespace-nowrap"
        >
          {wordList[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
