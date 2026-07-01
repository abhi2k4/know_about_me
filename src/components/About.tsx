import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Server, Globe, Cpu, Database } from "lucide-react";

// Skill icon URLs from simple CDN
const skillIcons: Record<string, string> = {
  "Python": "https://cdn.simpleicons.org/python/ffffff",
  "Django": "https://cdn.simpleicons.org/django/ffffff",
  "FastAPI": "https://cdn.simpleicons.org/fastapi/ffffff",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/ffffff",
  "React.js": "https://cdn.simpleicons.org/react/ffffff",
  "React Native": "https://cdn.simpleicons.org/react/ffffff",
  "TypeScript": "https://cdn.simpleicons.org/typescript/ffffff",
  "JavaScript": "https://cdn.simpleicons.org/javascript/ffffff",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/ffffff",
  "SQL": "https://cdn.simpleicons.org/mysql/ffffff",
  "MySQL": "https://cdn.simpleicons.org/mysql/ffffff",
  "MongoDB": "https://cdn.simpleicons.org/mongodb/ffffff",
  "PostgreSQL": "https://cdn.simpleicons.org/postgresql/ffffff",
  "AWS": "https://cdn.simpleicons.org/amazonwebservices/ffffff",
  "Docker": "https://cdn.simpleicons.org/docker/ffffff",
  "Git": "https://cdn.simpleicons.org/git/ffffff",
  "GitHub Actions": "https://cdn.simpleicons.org/githubactions/ffffff",
  "Supabase": "https://cdn.simpleicons.org/supabase/ffffff",
  "Figma": "https://cdn.simpleicons.org/figma/ffffff",
  "Gemini": "https://cdn.simpleicons.org/googlegemini/ffffff",
  "Flask": "https://cdn.simpleicons.org/flask/ffffff",
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { value: "12+", label: "Months of SDE Internship Experience" },
    { value: "12+", label: "Hackathons Participated & Won" },
    { value: "7.52", label: "B.E. Computer Engineering CGPA" },
  ];

  const skillGroups = [
    {
      category: "Backend & Data",
      icon: <Server className="w-4 h-4 text-[#B6443A]" />,
      skills: ["Python", "Django", "FastAPI", "Flask", "Node.js", "SQL", "MongoDB", "Supabase"],
    },
    {
      category: "Frontend & Design",
      icon: <Globe className="w-4 h-4 text-[#B6443A]" />,
      skills: ["React.js", "TypeScript", "JavaScript", "React Native", "Tailwind CSS", "Figma"],
    },
    {
      category: "Cloud & DevOps",
      icon: <Cpu className="w-4 h-4 text-[#B6443A]" />,
      skills: ["AWS", "Docker", "GitHub Actions", "Git", "Gemini"],
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-5 sm:px-8 py-16 sm:py-20 md:px-12 md:py-32 bg-[#040404] border-b border-white/5"
    >
      <div
        ref={animRef as React.RefObject<HTMLDivElement>}
        className="w-full flex flex-col gap-12 lg:gap-24"
      >
        {/* Top: Badge & Header */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 w-fit mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-[#B6443A] animate-pulse"></span>
              <span className="text-xs tracking-wider text-white/60 uppercase font-mono">About Me</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] text-white max-w-4xl">
              Building robust digital platforms at the intersection of full-stack engineering and data.
            </h2>
          </div>

          <div className="flex-1 text-white/55 text-sm sm:text-base leading-relaxed space-y-5 lg:pt-20">
            <p>
              I began my development journey with a solid foundation in computer science during my Bachelor of Computer Engineering at Mumbai University's AP Shah Institute of Technology.
            </p>
            <p>
              From building production-grade fintech applications and analytics dashboards during my SDE internships to constructing real-time fraud detection systems at Union Bank hackathons, I have tackled diverse technical challenges.
            </p>
            <p>
              What truly drives me is solving complex, real-world problems with clean, efficient code — building robust systems that perform seamlessly while offering smooth, intuitive user experiences.
            </p>
          </div>
        </div>

        {/* Bottom: Stats & Skills Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-8 border-t border-white/5">
          {/* Stats Column */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-1.5 md:mb-2">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-wider max-w-[180px]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Skills Column */}
          <div className="lg:col-span-8 flex flex-col gap-5 md:gap-6">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 25 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.12 }}
                className="border border-white/[0.05] bg-[#0a0a0a]/70 p-5 md:p-6 rounded-2xl hover:border-[#B6443A]/20 transition-colors duration-300"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  {group.icon}
                  <span className="text-sm font-semibold text-white/90">{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const iconUrl = skillIcons[skill];
                    return (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-xs bg-white/[0.03] text-white/60 border border-white/[0.05] hover:border-[#B6443A]/20 hover:text-white/80 px-2.5 py-1.5 rounded-lg transition-colors duration-200"
                      >
                        {iconUrl && (
                          <img
                            src={iconUrl}
                            alt={skill}
                            className="w-3 h-3 object-contain opacity-60"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
