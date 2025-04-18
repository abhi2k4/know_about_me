import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCapIcon, CalendarIcon, MapPinIcon } from "lucide-react";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
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
    //   gpa: "9.0/10",
      description: "Focused on full-stack development, data structures, and algorithms.",
      achievements: [
        "Achieved top 5% in graduating class",
        "Led team project that won first place in college hackathon",
        "Published research paper on machine learning"
      ]
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "PACE Junior College",
      location: "Borivali, Mumbai, India", 
      duration: "2020 - 2022",
    //   gpa: "90%",
      achievements: [
        "Secured top rank in Mathematics and Computer Science",
        "Participated in national level coding competitions"
      ]
    }
  ];

  return (
    <section
      id="education"
      className="py-24"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}>
        <div className="text-center mb-16">
          <h2 className="section-subtitle">Academic Background</h2>
          <h3 className="section-title">Education Journey</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My educational background and academic achievements.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {educationItems.map((edu, index) => (
              <div 
                key={edu.id} 
                className={`relative pl-10 transition-all duration-500 delay-${index * 200}`}
              >
                <div className="absolute left-0 top-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCapIcon className="w-3 h-3 text-primary" />
                </div>
                {index !== educationItems.length - 1 && (
                  <div className="absolute left-3 top-7 bottom-0 w-[1px] bg-border" />
                )}
                
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <p className="text-primary">{edu.institution}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0 text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">{edu.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3 text-sm text-muted-foreground">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>{edu.location}</span>
                    {edu.gpa && (
                      <>
                        <span className="mx-2">•</span>
                        <span>GPA: {edu.gpa}</span>
                      </>
                    )}
                  </div>
                  
                  {edu.description && (
                    <p className="mb-3 text-muted-foreground">{edu.description}</p>
                  )}
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2">Achievements</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-muted-foreground">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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