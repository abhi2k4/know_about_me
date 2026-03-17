import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, ExternalLink } from "lucide-react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Software Development Engineer Intern",
      company: "Druve Media",
      location: "Kalyan, Maharashtra",
      duration: "Aug 2025 – Present",
      type: "Full-time",
      description: [
        "Built and maintained responsive web applications using React and Node.js.",
        "Designed the UI components for the application.",
        "Worked closely with cross-functional teams to deliver features efficiently.",
        "Created reusable UI components with Tailwind CSS for a unified design system.",
      ],
      technologies: ["React Native", "FastAPI", "Websocket APIs", "Git", "REST APIs"],
      logoUrl:
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1755021397/know%20me/druve_bmvvnb.jpg",
      companyUrl: "https://druvemedia.in",
    },
    {
      id: 2,
      title: "Software Development Engineer Intern",
      company: "EternIQ",
      location: "Thane, Maharashtra",
      duration: "Jan 2025 – Jun 2025",
      type: "Full-time",
      description: [
        "Developed and maintained web applications using React and Node.js.",
        "Enhanced client-side performance, reducing load times by 40%.",
        "Collaborated with teams to deliver new features on schedule.",
        "Implemented modular UI components with Tailwind CSS.",
      ],
      technologies: ["React", "Node.js", "JavaScript", "Tailwind CSS", "Git", "Figma"],
      logoUrl:
        "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970928/know%20me/eterniq_abqsnr.ico",
      companyUrl: "https://eterniq.in",
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Parallax dot pattern */}
      <motion.div
        className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"
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
          <span className="section-subtitle">Experience</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="section-title">
              Professional<br />
              <span style={{ color: "hsl(var(--primary))" }}>journey.</span>
            </h2>
            <p className="max-w-sm text-white/30 text-sm leading-relaxed pb-2">
              Companies I've built production software for, contributed to real products,
              and shipped features that users rely on.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl">
          <div className="relative pl-6 md:pl-10 space-y-0">
            {/* vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pb-16 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border border-primary/60 bg-primary/20" />

                {/* Duration */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-primary/70 tracking-wider">
                    {exp.duration}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  {exp.type && (
                    <span className="font-mono text-[10px] text-white/20 border border-white/10 px-2 py-0.5 tracking-widest uppercase">
                      {exp.type}
                    </span>
                  )}
                </div>

                {/* Card */}
                <div className="border border-white/8 hover:border-white/14 transition-colors duration-300 bg-background group">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-6 md:p-8 border-b border-white/6">
                    <div className="flex items-start gap-4">
                      {exp.logoUrl && (
                        <div className="flex-shrink-0 w-10 h-10 bg-white overflow-hidden hidden md:block">
                          <img
                            src={exp.logoUrl}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white/90 leading-tight mb-1">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono text-primary/80">{exp.company}</p>
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-white/20 hover:text-primary/60 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-white/25">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="p-6 md:p-8 border-b border-white/6">
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/40 leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tag-mono">
                          {tech}
                        </span>
                      ))}
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