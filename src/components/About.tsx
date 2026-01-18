import { useState} from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SkillBadge from "./SkillBadge";
import { LayoutTemplate, Terminal, Layers, PenTool } from "lucide-react";
import GithubStats from "./GitHubStats";
import { Button } from "@/components/ui/button";
import LogoLoop from "./LogoLoop";

const About = () => {
  const { ref: sectionRef, isVisible: isSectionVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const TAB_KEYS = ['frontend', 'backend', 'database', 'design'] as const;
  type TabKey = typeof TAB_KEYS[number];

  const [activeTab, setActiveTab] = useState<'frontend'|'backend'|'database'|'design'>('frontend');

  const frontendSkills = [
    "React", "TypeScript", "JavaScript", 
    "HTML5", "CSS3", "Tailwind CSS"
  ];
  
  const backendSkills = [
    "Node.js", "Express", "Django", "Flask",
     "Java"
  ];
  
  const databaseSkills = [
     "MySQL", "Firebase", "Supabase"
  ];

  const uiUxSkills = [
    "Figma", "UI Design", "Responsive Design",
    "Wireframing"
  ];
  
  const skillMatrix: Record<string, { name: string; level: number }[]> = {
    frontend: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'JavaScript', level: 92 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 88 },
      { name: 'Tailwind CSS', level: 90 }
    ],
    backend: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'Django', level: 72 },
      { name: 'Flask', level: 70 },
      { name: 'Java', level: 75 }
    ],
    database: [
      { name: 'MySQL', level: 85 },
      { name: 'Firebase', level: 80 },
      { name: 'Supabase', level: 78 }
    ],
    design: [
      { name: 'Figma', level: 88 },
      { name: 'UI Design', level: 86 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Wireframing', level: 80 }
    ]
  };

  // Tech stack logos for the loop
  const techLogos = [
    {
      src: "https://cdn.simpleicons.org/react/white",
      alt: "React",
      title: "React"
    },
    {
      src: "https://cdn.simpleicons.org/typescript/white",
      alt: "TypeScript",
      title: "TypeScript"
    },
    {
      src: "https://cdn.simpleicons.org/javascript/white",
      alt: "JavaScript",
      title: "JavaScript"
    },
    {
      src: "https://cdn.simpleicons.org/nodedotjs/white",
      alt: "Node.js",
      title: "Node.js"
    },
    {
      src: "https://cdn.simpleicons.org/express/white",
      alt: "Express",
      title: "Express"
    },
    {
      src: "https://cdn.simpleicons.org/python/white",
      alt: "Python",
      title: "Python"
    },
    {
      src: "https://cdn.simpleicons.org/django/white",
      alt: "Django",
      title: "Django"
    },
    {
      src: "https://cdn.simpleicons.org/flask/white",
      alt: "Flask",
      title: "Flask"
    },
    {
      src: "https://cdn.simpleicons.org/mysql/white",
      alt: "MySQL",
      title: "MySQL"
    },
    {
      src: "https://cdn.simpleicons.org/firebase/white",
      alt: "Firebase",
      title: "Firebase"
    },
    {
      src: "https://cdn.simpleicons.org/supabase/white",
      alt: "Supabase",
      title: "Supabase"
    },
    {
      src: "https://cdn.simpleicons.org/tailwindcss/white",
      alt: "Tailwind CSS",
      title: "Tailwind CSS"
    },
    {
      src: "https://cdn.simpleicons.org/html5/white",
      alt: "HTML5",
      title: "HTML5"
    },
    {
      src: "https://cdn.simpleicons.org/figma/white",
      alt: "Figma",
      title: "Figma"
    },
    {
      src: "https://cdn.simpleicons.org/git/white",
      alt: "Git",
      title: "Git"
    },
    {
      src: "https://cdn.simpleicons.org/github/white",
      alt: "GitHub",
      title: "GitHub"
    },
    {
      src: "https://cdn.simpleicons.org/vercel/white",
      alt: "Vercel",
      title: "Vercel"
    },
    {
      src: "https://cdn.simpleicons.org/vite/white",
      alt: "Vite",
      title: "Vite"
    },
    {
      src: "https://cdn.simpleicons.org/npm/white",
      alt: "npm",
      title: "npm"
    }
  ];

  return (
    <section
      id="about"
      className="relative py-8 overflow-hidden bg-background"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
        <div className="mb-12 overflow-hidden">
          <LogoLoop 
            logos={techLogos}
            speed={30}
            gap={48}
            className="opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      
      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className={`container mx-auto py-24 md:py-32 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:bg-card/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <LayoutTemplate className="w-24 h-24 text-primary rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <LayoutTemplate className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Frontend Development</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Building responsive, performant user interfaces with modern frameworks and a focus on accessibility and user experience.
              </p>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:bg-card/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Terminal className="w-24 h-24 text-primary rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Backend Development</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Creating robust APIs, implementing business logic, and ensuring secure, scalable server-side applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:bg-card/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Layers className="w-24 h-24 text-primary rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Database & Architecture</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Designing efficient database schemas, optimizing queries, and implementing reliable data storage solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                {databaseSkills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isSectionVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:bg-card/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <PenTool className="w-24 h-24 text-primary rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">UI/UX Design</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Creating intuitive user interfaces and engaging user experiences through thoughtful design principles.
              </p>
              <div className="flex flex-wrap gap-2">
                {uiUxSkills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        
       </div>
     </section>
   );
 };
 
 export default About;
