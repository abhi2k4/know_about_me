
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with cart, checkout, and payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "Task Management System",
      description: "A collaborative task management tool with real-time updates and team functionality.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io", "Prisma"],
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 3,
      title: "Financial Dashboard",
      description: "An analytics dashboard for tracking financial data with interactive charts and reports.",
      tags: ["React", "D3.js", "Express", "MySQL", "AWS"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 4,
      title: "Social Media App",
      description: "A social platform with user profiles, posts, comments, and real-time notifications.",
      tags: ["React Native", "Firebase", "Redux", "GraphQL", "Jest"],
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      demoUrl: "#",
      codeUrl: "#"
    }
  ];

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden bg-secondary/50"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
