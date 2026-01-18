import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { School, CalendarRange, MapPin, Trophy, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
      logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970928/know%20me/University-icon_n0axod.jpg"
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
      logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970932/know%20me/pace_v1q67j.avif"
    }
  ];

  return (
    <section
      id="education"
      className="relative py-24 md:py-32 overflow-hidden bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
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
              <motion.div 
                key={edu.id} 
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
                    {edu.logoUrl && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white p-2 border border-white/10 overflow-hidden hidden md:block group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={edu.logoUrl} 
                          alt={edu.institution} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                            {edu.degree}
                          </h4>
                          <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mt-1">
                            {edu.institution}
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1 rounded-full">
                            <CalendarRange className="w-3.5 h-3.5" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{edu.location}</span>
                          </div>
                          {edu.gpa && (
                            <div className="flex items-center gap-2 px-3 font-medium text-primary">
                              <span>GPA: {edu.gpa}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {edu.description && (
                        <p className="mb-6 text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {edu.courses && edu.courses.length > 0 && (
                          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <h5 className="font-medium mb-3 flex items-center gap-2 text-foreground">
                              <BookOpen className="w-4 h-4 text-primary" />
                              Key Courses
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((course, i) => (
                                <Badge key={i} variant="outline" className="border-white/10 bg-transparent hover:bg-white/5 transition-colors">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <h5 className="font-medium mb-3 flex items-center gap-2 text-foreground">
                              <Trophy className="w-4 h-4 text-primary" />
                              Achievements
                            </h5>
                            <ul className="space-y-2">
                              {edu.achievements.map((achievement, i) => (
                                <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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

export default Education;