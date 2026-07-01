import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import ProjectCarousel from './ProjectCarousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    images: string[];
    tags: string[];
    demoUrl?: string;
    codeUrl?: string;
    note?: string;
    problem?: string;
    solution?: string;
    role?: string;
    stack?: {
    name: string;
    icon?: string;
  }[];
  outcomes?: string[];
  challenges?: string[];
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={() => setShowCaseStudy(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative w-full rounded-2xl p-6 md:p-8 cursor-pointer bg-[#0c0c0c] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-500 flex flex-col justify-between min-h-[280px] md:min-h-[320px] overflow-hidden"
      >
        {/* Subtle hover grid decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Top Bar: Number & Arrow */}
        <div className="flex items-center justify-between w-full relative z-10">
          <span className="font-mono text-xs text-[#8B8680] tracking-wider">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 group-hover:scale-105 transition-all duration-300">
            <ArrowUpRight className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Main Info */}
        <div className="my-6 space-y-3 relative z-10">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-[#B6443A] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-white/45 font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {project.tags.slice(0, 4).map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[10px] font-mono text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Case Study Modal (Retained) */}
      <Dialog open={showCaseStudy} onOpenChange={setShowCaseStudy}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Case Study
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            <ProjectCarousel images={project.images} className="aspect-video w-full rounded-lg" />

            {project.problem && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">The Problem</h3>
                <p className="text-muted-foreground">{project.problem}</p>
              </section>
            )}

            {project.solution && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">The Solution</h3>
                <p className="text-muted-foreground">{project.solution}</p>
              </section>
            )}

            {project.role && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">My Role</h3>
                <p className="text-muted-foreground">{project.role}</p>
              </section>
            )}

            {project.stack && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Tech Stack</h3>
                <div className="flex flex-wrap gap-4">
                  {project.stack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary"
                    >
                      {tech.icon && <img src={tech.icon} alt={tech.name} className="w-4 h-4" />}
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.challenges && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Key Challenges</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.outcomes && (
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Outcomes</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
              </section>
            )}

            <div className="flex gap-4 pt-4">
              {project.codeUrl && (
                <Button variant="outline" asChild>
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
