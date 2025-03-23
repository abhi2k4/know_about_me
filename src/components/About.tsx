import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SkillBadge from "./SkillBadge";
import { Code, Database, Globe, Server, Palette } from "lucide-react";

const About = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const frontendSkills = [
    "React", "TypeScript", "JavaScript", 
    "HTML5", "CSS3", "Tailwind CSS"
  ];
  
  const backendSkills = [
    "Node.js", "Express", "Django", "Flask",
     "Java"
  ];
  
  const databaseSkills = [
    "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase"
  ];

  const uiUxSkills = [
    "Figma", "UI Design", "Responsive Design",
    "Wireframing", "Prototyping", "User Research", "Design Systems"
  ];
  
  // const devOpsSkills = [
  //   "Docker", "Kubernetes", "AWS", "GCP",
  //   "CI/CD", "Git", "GitHub Actions", "Terraform"
  // ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className={`container mx-auto px-4 transition-all duration-700 ${
        isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}>
        <div className="text-center mb-16">
          <h2 className="section-subtitle">About Me</h2>
          <h3 className="section-title">My Skills & Expertise</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            With a strong foundation in both front-end and back-end technologies, I create
            scalable, efficient, and user-friendly applications. Here's what I bring to the table:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
            hover:shadow-lg hover:shadow-primary/5 hover:bg-card/80 
            hover:backdrop-blur-md hover:scale-[1.02] hover:-translate-y-1 
            border border-primary/5 group">
            <div className="flex items-center mb-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg 
              bg-blue-500/10 text-blue-500 mr-4
              transition-all duration-300 group-hover:scale-110 
              group-hover:bg-blue-500/20 group-hover:rotate-3">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Frontend Development</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Building responsive, performant user interfaces with modern frameworks and a focus on accessibility and user experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {frontendSkills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
            hover:shadow-lg hover:shadow-primary/5 hover:bg-card/80 
            hover:backdrop-blur-md hover:scale-[1.02] hover:-translate-y-1 
            border border-primary/5 group">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg 
                bg-green-500/10 text-green-500 mr-4
                transition-all duration-300 group-hover:scale-110 
                group-hover:bg-green-500/20 group-hover:rotate-3">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Backend Development</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Creating robust APIs, implementing business logic, and ensuring secure, scalable server-side applications.
            </p>
            <div className="flex flex-wrap gap-2">
              {backendSkills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
            hover:shadow-lg hover:shadow-primary/5 hover:bg-card/80 
            hover:backdrop-blur-md hover:scale-[1.02] hover:-translate-y-1 
            border border-primary/5 group">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg 
                bg-amber-500/10 text-amber-500 mr-4
                transition-all duration-300 group-hover:scale-110 
                group-hover:bg-amber-500/20 group-hover:rotate-3">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Database & Storage</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Designing efficient database schemas, optimizing queries, and implementing data storage solutions for various application needs.
            </p>
            <div className="flex flex-wrap gap-2">
              {databaseSkills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
            hover:shadow-lg hover:shadow-primary/5 hover:bg-card/80 
            hover:backdrop-blur-md hover:scale-[1.02] hover:-translate-y-1 
            border border-primary/5 group">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg 
              bg-pink-500/10 text-pink-500 mr-4
              transition-all duration-300 group-hover:scale-110 
              group-hover:bg-pink-500/20 group-hover:rotate-3">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">UI/UX Design</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Creating intuitive user interfaces and engaging user experiences through thoughtful design principles and modern aesthetics.
          </p>
          <div className="flex flex-wrap gap-2">
            {uiUxSkills.map((skill) => (
              <SkillBadge key={skill} name={skill} />
            ))}
          </div>
        </div>
          {/* <div className="bg-card rounded-xl p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/10 text-purple-500 mr-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">DevOps & Deployment</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Setting up CI/CD pipelines, containerization, cloud deployment, and ensuring smooth operation of applications.
            </p>
            <div className="flex flex-wrap gap-2">
              {devOpsSkills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div> */}
        </div>
        
        <div className="mt-16 bg-card rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">My Journey</h3>
          <p className="text-muted-foreground mb-4">
            I began my development journey with a strong foundation in computer science, gradually expanding my expertise across the full technology stack. Over the years, I've worked on a diverse range of projects, from e-commerce platforms to complex enterprise systems.
          </p>
          <p className="text-muted-foreground">
            What drives me is the opportunity to solve real-world problems through elegant code. I'm passionate about creating solutions that are not only technically sound but also deliver exceptional user experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
