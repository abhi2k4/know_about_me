import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CalendarRange, MapPin, BookOpen, Trophy } from "lucide-react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const educationItems: EducationItem[] = [
    {
      id: 1,
      degree: "B.E. in Computer Engineering",
      institution: "University of Mumbai",
      location: "Mumbai, India",
      duration: "2022 – 2026",
      description:
        "Pursuing Bachelor's in Computer Engineering with focus on full-stack development, data structures, and algorithms.",
      achievements: [
        "Founding Member of Coders Club — an emerging community for tech enthusiasts",
        "Participated in several hackathons and coding competitions",
        "Built multiple projects showcased in college tech exhibitions",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development",
        "Machine Learning",
        "Operating Systems",
      ],
      logoUrl:
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970928/know%20me/University-icon_n0axod.jpg",
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "PACE Junior College",
      location: "Borivali, Mumbai, India",
      duration: "2020 – 2022",
      description:
        "Completed higher secondary education with specialization in Science and Mathematics.",
      achievements: [
        "Successfully completed multiple programming certifications",
        "Scored 87 percentile in CET",
      ],
      courses: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
      logoUrl:
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970932/know%20me/pace_v1q67j.avif",
    },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0c0c0c" }}
    >
      {/* Parallax background grid */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
        style={{ y: bgY }}
      />

      <div
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-subtitle">Education</span>
          <h2 className="section-title">
            Academic<br />
            <span style={{ color: "hsl(var(--primary))" }}>background.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl">
          <div className="relative pl-6 md:pl-10 space-y-0">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8" />

            {educationItems.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pb-16 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border border-primary/60 bg-primary/20" />

                {/* Duration tag — above card */}
                <div className="flex items-center gap-3 mb-4 ml-0">
                  <span className="font-mono text-xs text-primary/70 tracking-wider">
                    {edu.duration}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* Card */}
                <div className="border border-white/8 hover:border-white/14 transition-colors duration-300 bg-background group">
                  {/* Card header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-6 md:p-8 border-b border-white/6">
                    <div className="flex items-start gap-4">
                      {edu.logoUrl && (
                        <div className="flex-shrink-0 w-10 h-10 bg-white overflow-hidden hidden md:block">
                          <img
                            src={edu.logoUrl}
                            alt={edu.institution}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white/90 leading-tight mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-mono text-primary/80">{edu.institution}</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-3 md:gap-1.5 md:items-end text-xs font-mono text-white/30">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                      {edu.gpa && (
                        <span className="text-primary/60">GPA: {edu.gpa}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <div className="p-6 md:p-8 border-b border-white/6">
                      <p className="text-sm text-white/40 leading-relaxed">{edu.description}</p>
                    </div>
                  )}

                  {/* Grid: Courses + Achievements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/6">
                    {edu.courses && edu.courses.length > 0 && (
                      <div className="p-6 md:p-8">
                        <h5 className="flex items-center gap-2 text-xs font-mono tracking-[0.15em] text-white/30 uppercase mb-4">
                          <BookOpen className="w-3 h-3 text-primary/60" />
                          Key Courses
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((c, i) => (
                            <span key={i} className="tag-mono">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="p-6 md:p-8">
                        <h5 className="flex items-center gap-2 text-xs font-mono tracking-[0.15em] text-white/30 uppercase mb-4">
                          <Trophy className="w-3 h-3 text-primary/60" />
                          Achievements
                        </h5>
                        <ul className="space-y-2.5">
                          {edu.achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-white/40 leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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