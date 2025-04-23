import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BriefcaseIcon, CalendarIcon, MapPinIcon, CodeIcon, ListChecksIcon, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { motion } from "framer-motion";

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
      company: "Eterniq",
      location: "Mumbai, India",
      duration: "Jan 2025 - Present",
      type: "Full-time",
      description: [
        "Developed and maintained responsive web application using React and Node.js",
        "Optimized client-side application performance resulting in 40% faster load times",
        "Collaborated with cross-functional teams to deliver features on time",
        "Implemented reusable UI components with Tailwind CSS for consistent design"
      ],
      technologies: ["React", "Node.js", "JavaScript", "Tailwind CSS", "Git", "RESTful APIs"],
      logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970928/know%20me/eterniq_abqsnr.ico",
      companyUrl: "https://eterniq.com"
    },
  ];

  return (
    <section
      id="experience"
      className="py-24 bg-gradient-to-b from-secondary/5 to-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ${
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
              <div 
                key={exp.id} 
                className={`relative pl-12 transition-all duration-500 delay-${index * 200}`}
              >
                {/* Timeline elements */}
                <div className="absolute left-0 top-1 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shadow-sm">
                  <BriefcaseIcon className="w-4 h-4 text-primary" />
                </div>
                {index !== experiences.length - 1 && (
                  <div className="absolute left-4 top-9 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 to-primary/5" />
                )}
                
                {/* Card */}
                <div className="group bg-background/80 backdrop-blur-sm rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-border/30 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
                    {exp.logoUrl && (
                      <div className="flex-shrink-0 w-16 h-16 bg-background rounded-full p-1 border border-border/30 overflow-hidden hidden md:block">
                        <img 
                          src={exp.logoUrl} 
                          alt={exp.company} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold">{exp.title}</h4>
                            {exp.type && (
                              <Badge variant="outline" className="bg-primary/5 text-primary text-xs">
                                {exp.type}
                              </Badge>
                            )}
                          </div>
                          <p className="text-primary font-medium flex items-center gap-2">
                            {exp.company}
                            {exp.companyUrl && (
                              <a 
                                href={exp.companyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                            )}
                          </p>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 md:self-start">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{exp.duration}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center mb-4 text-sm text-muted-foreground">
                        <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{exp.location}</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                          <h5 className="font-medium mb-2 flex items-center gap-2">
                            <ListChecksIcon className="w-4 h-4 text-primary" />
                            Responsibilities & Achievements
                          </h5>
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <li key={i} className="text-muted-foreground flex items-start">
                                <span className="text-primary mr-2 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="col-span-2">
                          <h5 className="font-medium mb-2 flex items-center gap-2">
                            <CodeIcon className="w-4 h-4 text-primary" />
                            Technologies Used
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <Badge 
                                key={i} 
                                variant="secondary"
                                className="bg-secondary/30"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;