import { useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useExperiences } from "@/hooks/useExperiences";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { data: experiences = [], isLoading } = useExperiences();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#080808]"
    >
      <div
        className="w-full flex flex-col"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-foreground max-w-xl">
            A brief snapshot of my professional growth
          </h2>
        </motion.div>

        {/* Minimalist List */}
        <div className="w-full flex flex-col border-t border-white/10">
          {isLoading ? (
            <>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="w-full py-10 border-b border-white/10 animate-pulse">
                  <div className="h-6 bg-white/5 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-white/5 rounded w-2/3" />
                </div>
              ))}
            </>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group w-full flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-white/10 hover:bg-white transition-all duration-500 cursor-default px-6 md:px-8 rounded-2xl"
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

                {/* Right Side: Duration */}
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-medium text-white/80 group-hover:text-black/80 tracking-tight transition-colors duration-500">
                    {exp.duration}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;