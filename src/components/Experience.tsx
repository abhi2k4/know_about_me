import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useExperiences } from "@/hooks/useExperiences";

const ease = [0.16, 1, 0.3, 1] as const;

const Experience = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const { data: experiences = [], isLoading } = useExperiences();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative w-full bg-[#040404] px-5 py-24 sm:px-8 md:py-36">
      <div className="grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionLabel index="03">Journey</SectionLabel>
          <h2 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
            Where I've
            <br />
            <span className="font-serif font-normal italic text-[#f0eadd]">done the work</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
            Roles, teams and the problems I was trusted with, most recent first.
          </p>
          <Link
            to="/journey"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
          >
            Full timeline
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ol ref={listRef} className="relative pl-8 sm:pl-12">
          {/* Track + scroll-drawn progress */}
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10" />
          <motion.span
            style={{ scaleY: lineProgress }}
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-[#f0eadd] to-[#B6443A]"
          />

          {isLoading
            ? [...Array(3)].map((_, i) => (
                <li key={i} className="pb-16">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
                  <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-white/5" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-white/5" />
                </li>
              ))
            : experiences.map((exp, index) => (
                <motion.li
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, ease }}
                  className="group relative pb-16 last:pb-0"
                >
                  <motion.span
                    initial={{ scale: 0.4, backgroundColor: "#262626" }}
                    whileInView={{ scale: 1, backgroundColor: "#f0eadd" }}
                    viewport={{ once: true, margin: "0px 0px -45% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full ring-4 ring-[#040404] sm:-left-12"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                    {exp.duration}
                    {index === 0 && <span className="ml-3 text-[#B6443A]">● Latest</span>}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">{exp.title}</h3>
                  <p className="mt-1 font-serif text-xl italic text-[#f0eadd]/80 sm:text-2xl">{exp.company}</p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-[15px]">{exp.description}</p>
                </motion.li>
              ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
