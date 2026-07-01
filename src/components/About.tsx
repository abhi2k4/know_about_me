import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ShieldCheck, Server, Globe, Cpu } from "lucide-react";

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
      category: "Data & Backend",
      icon: <Server className="w-5 h-5 text-white/70" />,
      skills: ["Python", "SQL", "Django", "FastAPI", "Node.js", "MySQL", "MongoDB"]
    },
    {
      category: "Frontend & Design",
      icon: <Globe className="w-5 h-5 text-white/70" />,
      skills: ["React.js", "React Native", "TypeScript", "Tailwind CSS", "Figma (UI/UX)"]
    },
    {
      category: "DevOps & Cloud",
      icon: <Cpu className="w-5 h-5 text-white/70" />,
      skills: ["AWS (EC2, S3, RDS, Bedrock, CloudFront)", "Docker", "GitHub Actions", "Git"]
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-6 py-20 sm:px-12 md:py-32 bg-[#040404] border-b border-white/5"
    >
      <div
        ref={animRef as React.RefObject<HTMLDivElement>}
        className="w-full flex flex-col gap-16 lg:gap-24"
      >
        {/* Top: Badge & Header */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 w-fit mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs tracking-wider text-white/60 uppercase font-mono">About Me</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white max-w-4xl">
              Building robust digital platforms at the intersection of full-stack engineering and data.
            </h2>
          </div>

          <div className="flex-1 text-white/60 text-base sm:text-lg leading-relaxed space-y-6 lg:pt-20">
            <p>
              I began my development journey with a solid foundation in computer science during my Bachelor of Computer Engineering at Mumbai University's AP Shah Institute of Technology. As I explored various domains, I steadily expanded my skills across the full stack.
            </p>
            <p>
              From building production-grade fintech applications and analytics dashboards during my SDE internships to constructing real-time fraud detection systems at Union Bank hackathons, I have tackled diverse technical challenges.
            </p>
            <p>
              What truly drives me is solving complex, real-world problems with clean, efficient code. I'm passionate about building robust systems that perform seamlessly under the hood while offering smooth, intuitive user experiences.
            </p>
          </div>
        </div>

        {/* Bottom: Stats & Skills Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/5">
          {/* Stats Column */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter mb-2">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider max-w-[200px]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Skills Column */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 25 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="border border-white/5 bg-[#0a0a0a]/50 p-6 rounded-2xl flex flex-col hover:border-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  {group.icon}
                  <span className="text-sm font-semibold text-white/90">{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-white/[0.03] text-white/60 border border-white/[0.05] px-2.5 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
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
