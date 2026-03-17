import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import LogoLoop from "./LogoLoop";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const techLogos = [
    { src: "https://cdn.simpleicons.org/react/white", alt: "React", title: "React" },
    { src: "https://cdn.simpleicons.org/typescript/white", alt: "TypeScript", title: "TypeScript" },
    { src: "https://cdn.simpleicons.org/javascript/white", alt: "JavaScript", title: "JavaScript" },
    { src: "https://cdn.simpleicons.org/nodedotjs/white", alt: "Node.js", title: "Node.js" },
    { src: "https://cdn.simpleicons.org/express/white", alt: "Express", title: "Express" },
    { src: "https://cdn.simpleicons.org/python/white", alt: "Python", title: "Python" },
    { src: "https://cdn.simpleicons.org/django/white", alt: "Django", title: "Django" },
    { src: "https://cdn.simpleicons.org/flask/white", alt: "Flask", title: "Flask" },
    { src: "https://cdn.simpleicons.org/mysql/white", alt: "MySQL", title: "MySQL" },
    { src: "https://cdn.simpleicons.org/firebase/white", alt: "Firebase", title: "Firebase" },
    { src: "https://cdn.simpleicons.org/supabase/white", alt: "Supabase", title: "Supabase" },
    { src: "https://cdn.simpleicons.org/tailwindcss/white", alt: "Tailwind CSS", title: "Tailwind CSS" },
    { src: "https://cdn.simpleicons.org/html5/white", alt: "HTML5", title: "HTML5" },
    { src: "https://cdn.simpleicons.org/figma/white", alt: "Figma", title: "Figma" },
    { src: "https://cdn.simpleicons.org/git/white", alt: "Git", title: "Git" },
    { src: "https://cdn.simpleicons.org/github/white", alt: "GitHub", title: "GitHub" },
    { src: "https://cdn.simpleicons.org/vercel/white", alt: "Vercel", title: "Vercel" },
    { src: "https://cdn.simpleicons.org/vite/white", alt: "Vite", title: "Vite" },
  ];

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"] },
    { category: "Backend", items: ["Node.js", "Express", "Django", "FastAPI", "Flask"] },
    { category: "Database", items: ["MySQL", "Supabase", "Firebase", "PostgreSQL"] },
    { category: "Design & Tools", items: ["Figma", "Git", "Docker", "Vercel", "AWS"] },
  ];

  const traits = [
    { num: "01", label: "Clean Code", desc: "Prioritize readability, modularity and maintainability in every line." },
    { num: "02", label: "Problem First", desc: "Start with the user problem, then design the solution." },
    { num: "03", label: "Ship Fast", desc: "Iterate rapidly, validate early, and refine with real feedback." },
    { num: "04", label: "Full Stack", desc: "Comfortable across the entire stack — from DB to pixel." },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Parallax dot grid bg */}
      <motion.div
        className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"
        style={{ y: bgY }}
      />

      {/* Tech Logo Ticker */}
      <div className="relative py-8 border-b border-white/5 overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={30}
          gap={48}
          className="opacity-40 hover:opacity-70 transition-opacity duration-500"
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
        style={{ y: textY }}
        ref={animRef as React.RefObject<HTMLDivElement>}
      >
        {/* Section Header */}
        <div className={`mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-subtitle">About Me</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="section-title">
              Building things<br />
              <span style={{ color: "hsl(var(--primary))" }}>with intent.</span>
            </h2>
            <p className="max-w-md text-white/40 text-sm leading-relaxed md:text-right pb-2">
              I'm Abhishek — a full-stack engineer who believes great software lives at the intersection of
              thoughtful engineering and considered design. I'm currently pursuing B.E. in Computer Engineering
              at University of Mumbai.
            </p>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 border border-white/8">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/8"
          >
            <span className="num-accent mb-6 block">[ 00 — IDENTITY ]</span>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              Started coding at 16. Today I build production-grade applications used by real users — from
              an AI governance platform handling enterprise data to an agritourism PWA empowering rural farmers.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              I care about craft. Every component I build, every API I design, every system I architect
              starts from a genuine desire to make something that works well — and feels good to use.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-primary"/>
              <span className="text-xs tracking-[0.2em] text-white/30 uppercase font-mono">Mumbai, India</span>
            </div>
          </motion.div>

          {/* Right — Traits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="divide-y divide-white/8"
          >
            {traits.map((t, i) => (
              <motion.div
                key={t.num}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="p-6 md:p-8 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="num-accent pt-0.5">{t.num}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white/90 mb-1 group-hover:text-primary transition-colors">{t.label}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div
          className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="num-accent mb-6 block">[ 01 — SKILLS ]</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-white/8">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + gi * 0.08 }}
                className="p-6 md:p-8 bg-background border-white/8 hover:bg-white/[0.02] transition-colors"
              >
                <h4 className="text-xs font-mono tracking-[0.15em] text-primary uppercase mb-4">
                  {group.category}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-2 group/item">
                      <span className="w-1 h-1 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors flex-shrink-0"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
