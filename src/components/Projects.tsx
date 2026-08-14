import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FolderGit2 } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";

const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`rounded-2xl bg-white/[0.04] animate-pulse min-h-[280px] ${i === 0 ? "md:col-span-2" : "md:col-span-1"}`}
      />
    ))}
  </div>
);

const Projects = () => {

  const { data: projects = [], isLoading } = useProjects();

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#080808]"
    >
      <div className="w-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <FolderGit2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">Portfolio</span>
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
        {isLoading ? (
          <ProjectsSkeleton />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {projects.slice(0, 5).map((project, index) => {
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
          </motion.div>
        )}

        {/* Deep Dive Button */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full flex justify-center mt-12 md:mt-16"
          >
            <Link to="/projects">
              <motion.button
                className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-[#B6443A] text-white hover:bg-[#c94f44] transition-colors duration-300 shadow-lg shadow-red-950/10 group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-[#B6443A] group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <span className="tracking-wide uppercase text-[10px] md:text-xs font-semibold">Deep Dive</span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
