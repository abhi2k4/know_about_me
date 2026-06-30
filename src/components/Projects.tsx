import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#080808]"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="w-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs tracking-wider text-muted-foreground uppercase">Portfolio</span>
          </div>

          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-foreground max-w-xl">
              Explore my portfolio of creative solutions
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs md:text-right pb-2">
              A collection of digital products, applications, and experiments.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <div 
                key={project.id}
                className={isFeatured ? "md:col-span-2" : "md:col-span-1"}
              >
                <ProjectCard
                  project={project}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
