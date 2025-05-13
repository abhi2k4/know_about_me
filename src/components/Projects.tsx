import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from './ProjectCarousel';
import { projects } from "@/data/projects";

const Projects = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden bg-secondary/10
        [background-image:linear-gradient(var(--secondary)_0.5px,transparent_0.5px),linear-gradient(to_right,var(--secondary)_0.5px,transparent_0.5px)]
        [background-size:32px_32px] before:absolute before:inset-0 before:bg-background/50"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ${
        isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}>
        <div className="text-center mb-16">
          <h2 className="section-subtitle">Featured Work</h2>
          <h3 className="section-title">Projects I've Built</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Here are some of my recent projects that showcase my skills and experience
            in building modern web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
