import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.16, 1, 0.3, 1] as const;

/** Opening block for sub-pages: back link, eyebrow, oversized title with a serif accent line. */
const PageHero = ({
  index,
  label,
  title,
  accent,
  intro,
  children,
}: {
  index: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  children?: React.ReactNode;
}) => (
  <section className="relative px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-40">
    <Link
      to="/"
      className="group mb-14 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
      Back to index
    </Link>

    <SectionLabel index={index}>{label}</SectionLabel>

    <h1 className="mt-8 text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-white">
      {[title, accent].map((line, i) => (
        <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.18em]">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease, delay: 0.1 + i * 0.1 }}
            className={`block ${i === 1 ? "font-serif font-normal italic text-[#f0eadd]" : ""}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.4 }}
      className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
    >
      <p className="max-w-md text-[15px] leading-relaxed text-white/55">{intro}</p>
      {children}
    </motion.div>
  </section>
);

export default PageHero;
