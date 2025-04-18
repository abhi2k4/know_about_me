import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BriefcaseIcon, CalendarIcon } from "lucide-react";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
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
      description: [
        "Developed and maintained responsive web application using React and Node.js",
        "Optimized client-side application performance",
        "Collaborated with cross-functional teams to deliver features on time"
      ],
      technologies: ["React", "Node.js", "JavaScript", "Tailwind CSS"]
    },
    // {
    //   id: 2,
    //   title: "Frontend Developer Intern",
    //   company: "XYZ Solutions",
    //   location: "Remote",
    //   duration: "Jun 2022 - Dec 2022",
    //   description: [
    //     "Built interactive user interfaces using React and Tailwind CSS",
    //     "Implemented state management with Redux",
    //     "Participated in code reviews and team meetings"
    //   ],
    //   technologies: ["React", "Redux", "Tailwind CSS", "JavaScript"]
    // }
  ];

  return (
    <section
      id="experience"
      className="py-24 bg-secondary/5"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}>
        <div className="text-center mb-16">
          <h2 className="section-subtitle">Work History</h2>
          <h3 className="section-title">Professional Experience</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My professional journey and the companies I've had the privilege to work with.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`relative pl-10 transition-all duration-500 delay-${index * 200}`}
              >
                <div className="absolute left-0 top-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <BriefcaseIcon className="w-3 h-3 text-primary" />
                </div>
                {index !== experiences.length - 1 && (
                  <div className="absolute left-3 top-7 bottom-0 w-[1px] bg-border" />
                )}
                
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{exp.title}</h4>
                      <p className="text-primary">{exp.company}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0 text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{exp.location}</p>
                  
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 bg-secondary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
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