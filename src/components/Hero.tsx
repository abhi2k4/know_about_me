import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { useGoToSection } from "@/hooks/useGoToSection";

const NAME = "ABHISHEK";
const FOCUS_AREAS = ["distributed systems", "full-stack platforms", "applied AI", "data pipelines", "developer tools"];
const ease = [0.16, 1, 0.3, 1] as const;

const useDepth = (sx: MotionValue<number>, sy: MotionValue<number>, amount: number) => ({
  x: useTransform(sx, (v) => v * amount),
  y: useTransform(sy, (v) => v * amount),
});

const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % FOCUS_AREAS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={FOCUS_AREAS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="whitespace-nowrap font-serif text-[1.15em] italic text-[#f0eadd]"
        >
          {FOCUS_AREAS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const goToSection = useGoToSection();
  const [loaded, setLoaded] = useState({ bg: false, fg: false });

  // Pointer parallax: each layer drifts by a different depth, faking a 3D room.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const bgPointer = useDepth(sx, sy, -14);
  const namePointer = useDepth(sx, sy, 10);
  const fgPointer = useDepth(sx, sy, 26);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  // Scroll: the name sinks behind the person while the room pulls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 160]);
  const nameScrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 260]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.86]);
  const fgScrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const uiOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const imgClass = "h-full w-full select-none object-cover object-[50%_18%] sm:object-[center_25%] md:object-[center_30%]";

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#040404]"
    >
      {/* Layer 1 — the room */}
      <motion.div style={{ y: bgScrollY }} className="absolute -inset-6 z-0">
        <motion.div style={bgPointer} className="h-full w-full translate-y-[11%] md:translate-y-0">
          <motion.picture
            initial={{ scale: 1.12, opacity: 0 }}
            animate={loaded.bg ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.8, ease }}
            className="block h-full w-full"
          >
            <source media="(max-width: 768px)" srcSet="/portfolio-mobile.webp" type="image/webp" />
            <source srcSet="/portfolio.webp" type="image/webp" />
            <img
              src="/portfolio.webp"
              alt=""
              fetchPriority="high"
              decoding="async"
              onLoad={() => setLoaded((l) => ({ ...l, bg: true }))}
              className={`${imgClass} brightness-[0.55] contrast-[1.05] saturate-[0.85]`}
            />
          </motion.picture>
        </motion.div>
      </motion.div>

      {/* Layer 2 — the name, sitting between the room and the person */}
      <motion.div
        style={{ y: nameScrollY, scale: nameScale }}
        className="pointer-events-none absolute inset-x-0 top-[10%] z-10 flex justify-center md:top-[13%]"
      >
        <motion.h1 style={namePointer} className="select-none">
          <span className="sr-only">Abhishek Thormothe — Full Stack Software Engineer in Mumbai</span>
          <span
            aria-hidden
            className="flex text-[19vw] font-extrabold leading-[0.8] tracking-[-0.065em] text-[#f0eadd] md:text-[17.5vw]"
          >
            {NAME.split("").map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.05 }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>
      </motion.div>

      {/* Layer 3 — the person (transparent cutout) */}
      <motion.div style={{ y: fgScrollY }} className="pointer-events-none absolute -inset-6 z-20">
        <motion.div style={fgPointer} className="h-full w-full translate-y-[11%] md:translate-y-0">
          <motion.picture
            initial={{ y: 60, opacity: 0 }}
            animate={loaded.fg ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.4, ease, delay: 0.35 }}
            className="block h-full w-full"
          >
            <source media="(max-width: 768px)" srcSet="/portfolio-f-mobile.webp" type="image/webp" />
            <source srcSet="/portfolio-f.webp" type="image/webp" />
            <img
              src="/portfolio-f.webp"
              alt="Abhishek Thormothe seated at a desk"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setLoaded((l) => ({ ...l, fg: true }))}
              className={`${imgClass} brightness-[0.92]`}
            />
          </motion.picture>
        </motion.div>
      </motion.div>

      {/* Grounding gradient + vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(120%_80%_at_50%_30%,transparent_40%,rgba(4,4,4,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-[#040404] via-[#040404]/75 to-transparent" />

      {/* Layer 4 — interface */}
      <motion.div
        style={{ opacity: uiOpacity }}
        className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-1 items-end gap-6 px-5 pb-8 sm:px-8 md:grid-cols-[1fr_auto_1fr] md:pb-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="max-w-md"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              Open to full-time SWE roles
            </span>
          </div>
          <p className="text-[17px] leading-snug tracking-tight text-white/85 sm:text-xl">
            Software engineer in Mumbai, building fast, honest software. Lately deep in <RotatingWord />
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          onClick={() => goToSection("about")}
          className="group hidden flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white md:flex"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-white" />
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.05 }}
          className="flex items-center gap-2 md:justify-self-end"
        >
          <Magnetic>
            <button
              onClick={() => goToSection("contact")}
              className="group flex h-12 items-center gap-3 whitespace-nowrap rounded-full bg-[#f0eadd] pl-5 pr-1.5 text-sm font-semibold text-black transition-colors hover:bg-white"
            >
              <span className="sm:hidden">Let's talk</span>
              <span className="hidden sm:inline">Start a conversation</span>
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-black text-[#f0eadd]">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </button>
          </Magnetic>
          <button
            onClick={() => goToSection("projects")}
            className="group flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-black/30 px-5 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
          >
            Selected work
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
