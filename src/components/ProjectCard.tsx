import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import ProjectCarousel from './ProjectCarousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={() => setShowCaseStudy(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className={`max-w-[500px] w-full cursor-pointer
          group relative bg-background rounded-lg overflow-hidden
          shadow-[0_2px_10px_0px_rgba(0,0,0,0.05)]
          hover:shadow-[0_20px_40px_0px_rgba(0,0,0,0.15)]
          dark:shadow-[0_2px_8px_0px_rgba(200,200,200,0.1)]
          dark:hover:shadow-[0_20px_40px_0px_rgba(200,200,200,0.2)]
          transition-all duration-500 ease-out transform
        `}
      >
        {/* Image container with hover zoom */}
        <div className="relative overflow-hidden aspect-video">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCarousel
              images={project.images}
              className="aspect-video w-full"
            />
          </motion.div>
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Play icon on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-primary/90 text-white rounded-full p-4 backdrop-blur-sm">
              <ChevronRight className="h-6 w-6" />
            </div>
          </motion.div>
        </div>

        <div className="p-6 relative">
          <motion.h3
            className="text-xl font-bold mb-2"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground mb-4"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.description}
          </motion.p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="space-y-4">
            {(project.codeUrl || project.demoUrl) && (
              <motion.div
                className="flex gap-4"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {project.codeUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                    className="hover-lift"
                  >
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button
                    size="sm"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                    className="hover-lift"
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </motion.div>
            )}
            {project.note && (
              <p className="text-sm text-blue-500 text-muted-foreground italic mt-4">
                {project.note}
              </p>
            )}
            {/* Click to know more message */}
            <motion.div
              className="p-3 bg-primary/5 border border-primary/20 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm">
                <span>Click to read full case study</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: '0 0 30px rgba(var(--primary), 0.3)',
          }}
        />
      </motion.div>

      {/* Case Study Modal */}
      <Dialog open={showCaseStudy} onOpenChange={setShowCaseStudy}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Case Study
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            {/* Project Overview */}
            <ProjectCarousel images={project.images} className="aspect-video w-full rounded-lg" />

            {/* Problem Statement */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">The Problem</h3>
              <p className="text-muted-foreground">{project.problem}</p>
            </section>

            {/* Solution */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">The Solution</h3>
              <p className="text-muted-foreground">{project.solution}</p>
            </section>

            {/* Your Role */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">My Role</h3>
              <p className="text-muted-foreground">{project.role}</p>
            </section>

            {/* Tech Stack */}
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

            {/* Key Challenges */}
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

            {/* Outcomes */}
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

            {/* Links */}
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
