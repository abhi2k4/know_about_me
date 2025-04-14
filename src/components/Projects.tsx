import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from './ProjectCarousel';

const Projects = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projects = [
    {
      id: 1,
      title: "Coder's Hub",
      description: "An online community for Coder's Club (from my engineering college) where students can learn the latest technologies required for placements.",
      tags: ["React", "Node.js", "Supabase", "Project Management", "Tailwind CSS"],
      images: [
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744603161/portfolio/900da580-289e-431d-8dbb-072565d4b5e6.png",
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606961/portfolio/d8167fba-15ea-4d8d-94f0-23d7ddf5792e.png",
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606990/portfolio/3d64d4cc-5864-47f3-ac06-d7425e10420b.png"
      ],
      demoUrl: "https://codersclub.apsit.edu.in",
      note: "This project is part of the official website of my college and cannot be shared publicly."
    },
    {
      id: 2,
      title: "Fraud Detection System",
      description: "A collaborative task management tool with real-time updates and team functionality.",
      tags: ["Django", "AWS RDS", "Gemini", "Docker", "Frontend"],
      images: [
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606936/portfolio/b885cdba-f848-4025-a7b2-aa88f3490575.png",
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606875/portfolio/0e137690-dfbf-4551-b276-43c2ecc3004d.png",
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744607293/portfolio/34e9ec99-8a58-4ea5-aee7-6d3cb8363ff9.png",
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606568/portfolio/87f6963c-dd6c-4a39-b341-71829ff75e1b.png",
      ],
      note: "This project is not hosted due to scalability issues.",
      // demoUrl: "#",
      codeUrl: "https://github.com/abhi2k4/fraudguard"
    },
    // {
    //   id: 3,
    //   title: "Financial Dashboard",
    //   description: "An analytics dashboard for tracking financial data with interactive charts and reports.",
    //   tags: ["React", "D3.js", "Express", "MySQL", "AWS"],
    //   imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   demoUrl: "#",
    //   codeUrl: "#"
    // },
    // {
    //   id: 4,
    //   title: "Social Media App",
    //   description: "A social platform with user profiles, posts, comments, and real-time notifications.",
    //   tags: ["React Native", "Firebase", "Redux", "GraphQL", "Jest"],
    //   imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   demoUrl: "#",
    //   codeUrl: "#"
    // }
  ];

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
