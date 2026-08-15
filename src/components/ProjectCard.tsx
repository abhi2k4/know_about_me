import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";

interface ProjectCardProps {
  project: {
    id?: number;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    demo_url?: string;
    code_url?: string;
    note?: string;
    problem?: string;
    solution?: string;
    role?: string;
    stack?: { name: string; icon?: string }[];
    outcomes?: string[];
    challenges?: string[];
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={() => setShowCaseStudy(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative w-full rounded-2xl p-7 md:p-9 cursor-pointer bg-[#0c0c0c] border border-white/[0.06] hover:border-[#B6443A]/30 hover:bg-[#0f0a09] transition-all duration-500 flex flex-col justify-between min-h-[260px] md:min-h-[300px] overflow-hidden"
      >
        {/* Subtle hover grid decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#B6443A08_1px,transparent_1px),linear-gradient(to_bottom,#B6443A08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Top Bar: Number & Arrow */}
        <div className="flex items-center justify-between w-full relative z-10">
          <span className="font-mono text-xs text-[#B6443A]/50 tracking-wider">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 group-hover:text-[#B6443A] group-hover:border-[#B6443A]/30 group-hover:scale-105 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Main Info */}
        <div className="my-6 md:my-8 space-y-3 relative z-10">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-[#B6443A] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/40 font-light leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#B6443A]/[0.06] border border-[#B6443A]/10 rounded-full text-[10px] font-mono text-[#B6443A]/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Case Study Modal */}
      <Dialog open={showCaseStudy} onOpenChange={setShowCaseStudy}>
        <DialogContent 
          data-lenis-prevent
          className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 text-white"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{project.title}</DialogTitle>
            <DialogDescription className="text-white/50">Case Study</DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            {project.images?.length > 0 && (
              <ProjectCarousel images={project.images} className="aspect-video w-full rounded-lg" />
            )}

            {project.problem && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-[#B6443A]">The Problem</h3>
                <p className="text-white/60 text-sm leading-relaxed">{project.problem}</p>
              </section>
            )}

            {project.solution && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-[#B6443A]">The Solution</h3>
                <p className="text-white/60 text-sm leading-relaxed">{project.solution}</p>
              </section>
            )}

            {project.role && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-[#B6443A]">My Role</h3>
                <p className="text-white/60 text-sm leading-relaxed">{project.role}</p>
              </section>
            )}

            {project.stack && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-[#B6443A]">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      {tech.icon && <img src={tech.icon} alt={tech.name} className="w-4 h-4" />}
                      <span className="text-sm font-medium text-white/80">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.challenges && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-[#B6443A]">Key Challenges</h3>
                <ul className="list-disc list-inside space-y-2 text-white/60 text-sm">
                  {project.challenges.map((challenge, i) => <li key={i}>{challenge}</li>)}
                </ul>
              </section>
            )}

            {project.outcomes && (
              <section className="space-y-3">
                <h3 className="text-lg font-semibold text-[#B6443A]">Outcomes</h3>
                <ul className="list-disc list-inside space-y-2 text-white/60 text-sm">
                  {project.outcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
                </ul>
              </section>
            )}

            {project.note && (
              <p className="text-xs text-white/30 italic border-t border-white/5 pt-4">{project.note}</p>
            )}

            <div className="flex gap-4 pt-4 border-t border-white/5">
              {project.code_url && (
                <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5">
                  <a href={project.code_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                </Button>
              )}
              {project.demo_url && (
                <Button asChild className="bg-[#B6443A] hover:bg-[#c94f44] text-white border-none">
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
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
