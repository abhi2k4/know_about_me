import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCapIcon, CalendarIcon, MapPinIcon, AwardIcon, BookOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { motion } from "framer-motion";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  courses?: string[];
  logoUrl?: string;
}

const Education = () => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const educationItems: EducationItem[] = [
    {
      id: 1,
      degree: "B.E. in Computer Engineering",
      institution: "University of Mumbai",
      location: "Mumbai, India",
      duration: "2022 - 2026",
      // gpa: "9.0/10",
      description: "Currently pursuing my Bachelor's in Computer Engineering with a focus on full-stack development, data structures, and algorithms.",
      achievements: [
        "Founding Member of Coders Club - an emerging community for tech enthusiasts",
        "Participated in several hackathons and coding competitions",
        "Built multiple projects showcased in college tech exhibitions"
      ],
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development",
        "Machine Learning",
        "Operating Systems"
      ],
      logoUrl: "public/University-icon.png"
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "PACE Junior College",
      location: "Borivali, Mumbai, India", 
      duration: "2020 - 2022",
      // gpa: "90%",
      description: "Completed my higher secondary education with specialization in Science and Mathematics.",
      achievements: [
        "Successfully completed multiple programming certifications",
        "Scored 87 percentile in CET"
      ],
      courses: [
        "Computer Science",
        "Mathematics",
        "Physics",
        "Chemistry"
      ],
      logoUrl: "public/pace.avif"
    }
  ];

  return (
    <section
      id="education"
      className="py-24 bg-gradient-to-b from-background to-secondary/5"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}>
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium tracking-wide uppercase text-sm mb-2">Academic Background</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Education Journey</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My educational qualifications and academic achievements that have shaped my technical knowledge.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {educationItems.map((edu, index) => (
              <div 
                key={edu.id} 
                className={`relative pl-12 transition-all duration-500 delay-${index * 200}`}
              >
                <div className="absolute left-0 top-1 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCapIcon className="w-4 h-4 text-primary" />
                </div>
                {index !== educationItems.length - 1 && (
                  <div className="absolute left-4 top-9 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 to-primary/5" />
                )}
                
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-border/30 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row gap-4 items-start mb-4">
                    {edu.logoUrl && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-full  bg-white p-1 border border-border/30 overflow-hidden hidden md:block">
                        <img 
                          src={edu.logoUrl} 
                          alt={edu.institution} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-xl font-bold">{edu.degree}</h4>
                          <p className="text-primary font-medium">{edu.institution}</p>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 md:self-start">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{edu.duration}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center mb-4 text-sm text-muted-foreground">
                        <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{edu.location}</span>
                        {edu.gpa && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">GPA: {edu.gpa}</span>
                          </>
                        )}
                      </div>
                      
                      {edu.description && (
                        <p className="mb-4 text-muted-foreground">{edu.description}</p>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {edu.courses && edu.courses.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <BookOpenIcon className="w-4 h-4 text-primary" />
                              Key Courses
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((course, i) => (
                                <Badge key={i} variant="outline" className="bg-secondary/20">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <AwardIcon className="w-4 h-4 text-primary" />
                              Achievements
                            </h5>
                            <ul className="space-y-1">
                              {edu.achievements.map((achievement, i) => (
                                <li key={i} className="text-muted-foreground text-sm flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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

export default Education;