import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "SDE Intern",
      company: "Druve Media",
      duration: "Aug 2025 - Jan 2026",
      description: "Architected a society management system & analytics dashboard. Designed a reusable React component library, cutting frontend dev time by 40%.",
    },
    {
      id: 2,
      title: "SDE Intern",
      company: "EternIQ",
      duration: "Jan 2025 - Jun 2025",
      description: "Optimized client-side rendering pipeline of a React/Node app, reducing load time by 40%. Delivered 6 end-to-end features across 5 Agile sprints.",
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#080808]"
    >
      <div
        className="w-full flex flex-col"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs tracking-wider text-muted-foreground uppercase">Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-foreground max-w-xl">
            A Yearly snapshot of my creative growth
          </h2>
        </motion.div>

        {/* Minimalist List */}
        <div className="w-full flex flex-col border-t border-white/10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group w-full flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-white/10 hover:bg-white transition-all duration-500 cursor-default px-6 md:px-12 -mx-6 md:-mx-12 rounded-3xl"
            >
              {/* Left Side: Role & Info */}
              <div className="flex-1 max-w-2xl md:pr-12 mb-6 md:mb-0">
                <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-black uppercase tracking-tight mb-2 transition-colors duration-500">
                  {exp.title} <span className="text-white/50 group-hover:text-black/50 transition-colors duration-500">| {exp.company}</span>
                </h3>
                <p className="text-sm text-white/60 group-hover:text-black/70 leading-relaxed transition-colors duration-500">
                  {exp.description}
                </p>
              </div>

              {/* Right Side: Month & Year (Smaller font) */}
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg sm:text-xl md:text-2xl font-medium text-white/80 group-hover:text-black/80 tracking-tight transition-colors duration-500">
                  {exp.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;