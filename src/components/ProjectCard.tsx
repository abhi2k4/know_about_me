import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import ProjectCarousel from './ProjectCarousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={() => setShowCaseStudy(true)}
        className={`max-w-[500px] w-full cursor-pointer
          group relative bg-background rounded-lg overflow-hidden
          shadow-[0_2px_10px_0px_rgba(0,0,0,0.05)]
          hover:shadow-[0_8px_30px_0px_rgba(0,0,0,0.12)]
          dark:shadow-[0_2px_8px_0px_rgba(200,200,200,0.1)]
          dark:hover:shadow-[0_8px_20px_0px_rgba(200,200,200,0.2)]
          transition-all duration-300 ease-in-out transform
          hover:-translate-y-1
          delay-${index * 100}
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >
        <ProjectCarousel 
          images={project.images} 
          className="aspect-video w-full"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="space-y-4">
            {(project.codeUrl || project.demoUrl) && (
              <div className="flex gap-4">
                {project.codeUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button size="sm" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            )}
            {project.note && (
              <p className="text-sm text-blue-500 text-muted-foreground italic mt-4">
                {project.note}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <Dialog open={showCaseStudy} onOpenChange={setShowCaseStudy}>
        <DialogContent className="max-w-3xl  max-h-[90vh] overflow-y-auto">
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
