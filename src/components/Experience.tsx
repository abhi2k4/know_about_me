import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Building2, CalendarRange, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
  logoUrl?: string;
  type?: string;
  companyUrl?: string;
}

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Software Development Engineer Intern",
      company: "Druve Media",
      location: "Kalyan, Maharashtra",
      duration: "Aug 2025 - Present",
      type: "Full-time",
      description: [
        "Built and maintained responsive web applications using React and Node.js.",
        "Designed the UI components for the application.",
        "Worked closely with cross-functional teams to deliver features efficiently.",
        "Created reusable UI components with Tailwind CSS for a unified design system."
      ],
      technologies: [
        "React",
        "Node.js",
        "JavaScript",
        "Tailwind CSS",
        "Git",
        "Figma"
      ],
      logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1755021397/know%20me/druve_bmvvnb.jpg",
      companyUrl: "https://druvemedia.in"
    },
    {
      id: 2,
      title: "Software Development Engineer Intern",
      company: "EternIQ",
      location: "Thane, Maharashtra",
      duration: "Jan 2025 - Jun 2025",
      type: "Full-time",
      description: [
        "Developed and maintained web applications using React and Node.js.",
        "Enhanced client-side performance, reducing load times by 40%.",
        "Collaborated with teams to deliver new features on schedule.",
        "Implemented modular UI components with Tailwind CSS."
      ],
      technologies: [
        "React",
        "Django",
        "FastAPI",
        "Websocket APIs",
        "Git",
        "REST APIs"
      ],
      logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970928/know%20me/eterniq_abqsnr.ico",
      companyUrl: "https://eterniq.in"
    }
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}>
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium tracking-wide uppercase text-sm mb-2">Work History</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My professional journey and the companies I've had the privilege to work with.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-4" />
                
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] top-6 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/10 md:left-[13px]" />
                
                {/* Card */}
                <div className="group relative bg-card/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                    {exp.logoUrl && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 p-2 border border-white/10 overflow-hidden hidden md:block group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={exp.logoUrl} 
                          alt={exp.company} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="text-xl md:text-2xl font-bold text-foreground">{exp.title}</h4>
                            {exp.type && (
                              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                                {exp.type}
                              </Badge>
                            )}
                          </div>
                          <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mt-1">
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1 rounded-full">
                            <CalendarRange className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <ul className="grid gap-3">
                            {exp.description.map((item, i) => (
                              <li key={i} className="text-muted-foreground flex items-start gap-3 text-sm md:text-base leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <Badge 
                                key={i} 
                                variant="secondary"
                                className="bg-secondary/20 hover:bg-primary/10 hover:text-primary transition-colors duration-300 rounded-md px-2.5 py-1 text-xs font-normal"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;