import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ProjectCarousel from './ProjectCarousel';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  demoUrl?: string;
  codeUrl?: string;
  note?: string;
}

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    images: string[];
    tags: string[];
    demoUrl?: string;
    codeUrl?: string;
    note?: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`max-w-[500px] w-full
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
  );
};

export default ProjectCard;
