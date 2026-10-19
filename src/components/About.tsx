import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Hand } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

// *word* renders as an italic serif accent.
const STATEMENT =
  "I'm Abhishek, a software engineer who treats *performance* as a feature. I build full-stack platforms, distributed data systems and applied-AI products, and I obsess over the last ten percent: the latency, the edge cases, the *feel*.";

const memories = [
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ccd25_xji8tt.jpg", label: "Google Cloud Days", date: "2025", x: "2%", y: 40, rotate: -7 },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ms_qkhpiq.jpg", label: "Microsoft GitTogether", date: "2025", x: "21%", y: 0, rotate: 4 },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/aws_fikp28.jpg", label: "AWS Summit", date: "2025", x: "40%", y: 56, rotate: -3 },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/next_j02zzm.jpg", label: "Next.js Summit", date: "2024", x: "59%", y: 8, rotate: 6 },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/dsaclub_fzgcjx.jpg", label: "DSA Club Drive", date: "2024", x: "76%", y: 48, rotate: -5 },
];

const Word = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = word.startsWith("*");
  const text = word.replace(/\*/g, "");
  return (
    <motion.span style={{ opacity }} className={accent ? "font-serif font-normal italic text-[#f0eadd]" : undefined}>
      {text}{" "}
    </motion.span>
  );
};

const Polaroid = ({ photo }: { photo: (typeof memories)[number] }) => (
  <figure className="w-full rounded-[4px] bg-[#f0eadd] p-2.5 pb-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
    <div className="aspect-[4/3] overflow-hidden rounded-[2px] bg-black">
      <img
        src={getOptimizedImageUrl(photo.src, 600)}
        alt={photo.label}
        draggable={false}
        loading="lazy"
        className="h-full w-full object-cover contrast-[1.05] saturate-[0.9]"
      />
    </div>
    <figcaption className="mt-2.5 flex items-baseline justify-between gap-2 px-0.5 text-black">
      <span className="truncate font-serif text-[17px] italic leading-none">{photo.label}</span>
      <span className="font-mono text-[10px] text-black/50">{photo.date}</span>
    </figcaption>
  </figure>
);

const About = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [stack, setStack] = useState(memories.map((_, i) => i));

  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 85%", "end 45%"] });
  const words = STATEMENT.split(" ");

  const bringToFront = (i: number) => setStack((s) => [...s.filter((n) => n !== i), i]);

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#040404] px-5 py-24 sm:px-8 md:py-36">
      <SectionLabel index="01">About</SectionLabel>

      <p
        ref={textRef}
        className="mt-10 max-w-[22ch] text-[clamp(2rem,5.6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:max-w-[24ch]"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={reduceMotion ? [-1, 0] : [start, start + 1 / words.length]}
            />
          );
        })}
      </p>

      <div className="mt-20 flex items-end justify-between gap-6 md:mt-28">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">In the room</p>
          <p className="mt-2 max-w-sm text-sm text-white/55">
            Conferences, summits and community drives: where I go to learn from people building at scale.
          </p>
        </div>
        <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 md:flex">
          <Hand className="h-3.5 w-3.5" /> Drag them around
        </p>
      </div>

      {/* Desktop: a loose pile of polaroids you can push around */}
      <div ref={boardRef} className="relative mt-10 hidden h-[400px] md:block">
        {memories.map((photo, i) => (
          <motion.div
            key={photo.label}
            drag={!reduceMotion}
            dragConstraints={boardRef}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
            onPointerDown={() => bringToFront(i)}
            initial={{ opacity: 0, y: 80, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.08 }}
            whileHover={{ scale: 1.04 }}
            whileDrag={{ scale: 1.08, rotate: 0, cursor: "grabbing" }}
            style={{ left: photo.x, top: photo.y, zIndex: stack.indexOf(i) + 1 }}
            className="absolute w-[min(24%,300px)] cursor-grab touch-none"
          >
            <Polaroid photo={photo} />
          </motion.div>
        ))}
      </div>

      {/* Mobile: a swipeable strip */}
      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 hide-scrollbar md:hidden">
        {memories.map((photo) => (
          <div key={photo.label} className="w-[72vw] max-w-[300px] shrink-0 snap-center" style={{ rotate: `${photo.rotate / 2}deg` }}>
            <Polaroid photo={photo} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
