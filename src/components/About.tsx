import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Server, Globe, Cpu, Database, User } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

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
  "AWS": "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg",
  "Docker": "https://cdn.simpleicons.org/docker/ffffff",
  "Git": "https://cdn.simpleicons.org/git/ffffff",
  "GitHub Actions": "https://cdn.simpleicons.org/githubactions/ffffff",
  "Supabase": "https://cdn.simpleicons.org/supabase/ffffff",
  "Figma": "https://cdn.simpleicons.org/figma/ffffff",
  "Gemini": "https://cdn.simpleicons.org/googlegemini/ffffff",
  "Flask": "https://cdn.simpleicons.org/flask/ffffff",
};

const memories = [
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ccd25_xji8tt.jpg", label: "Google Cloud Community Days", date: "2025" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/dsaclub_fzgcjx.jpg", label: "DSA Club Drive", date: "2024" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/ms_qkhpiq.jpg", label: "GitTogether @ Microsoft", date: "2025" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/next_j02zzm.jpg", label: "Next.js Summit", date: "2024" },
  { src: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1782987796/know%20me/photos/aws_fikp28.jpg", label: "AWS Summit", date: "2025" }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



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
        className="w-full flex flex-col gap-12 lg:gap-24"
      >
        {/* Top: Badge & Header */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-6 md:mb-8">
              <User className="w-4 h-4 text-[#B6443A]" />
              <span className="text-sm font-medium tracking-wider text-white/60 uppercase font-mono">About Me</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] text-white max-w-4xl">
              Crafting systems at the intersection of{" "}
              <span className="block sm:inline-block">
                <FlipWords 
                  words={["Full-Stack Engineering", "Data Architecture", "Applied AI"]} 
                  className="text-[#B6443A] font-semibold pl-0 pr-2"
                />
              </span>
            </h2>
          </div>

          {/* 3D Fanning Deck of Memories */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end lg:p-8 lg:pr-28">
            <motion.div 
              className="relative flex items-center justify-center h-48 sm:h-64 md:h-72 w-full max-w-[480px]"
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredCardIndex(null);
                }
              }}
            >
              {memories.map((photo, i) => {
                const totalCards = memories.length;
                const offset = i - Math.floor(totalCards / 2);
                
                // Always fanned out positions
                const xOffset = offset * (isMobile ? 55 : 90);
                const rotation = offset * 8;
                const yOffset = Math.abs(offset) * (isMobile ? 4 : 8);

                const isHovered = hoveredCardIndex === i;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-[120px] sm:w-[160px] md:w-[200px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#0d0d0d] will-change-transform group cursor-pointer"
                    style={{ originY: 1 }} // Rotate from bottom edge for clean fan effect
                    animate={{
                      x: xOffset,
                      y: isHovered ? yOffset - (isMobile ? 16 : 25) : yOffset, // pop up higher when hovered/tapped
                      rotate: isHovered ? 0 : rotation,
                      scale: isHovered ? 1.15 : 1,
                      zIndex: isHovered ? 50 : i + 10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                    }}
                    onMouseEnter={() => !isMobile && setHoveredCardIndex(i)}
                    onMouseLeave={() => !isMobile && setHoveredCardIndex(null)}
                    onClick={() => {
                      if (isMobile) {
                        setHoveredCardIndex(hoveredCardIndex === i ? null : i);
                      }
                    }}
                  >
                    {/* Dark gradient overlay for typography contrast */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 z-10 flex flex-col justify-end p-2 sm:p-3 ${
                      isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`} />
                    
                    <img
                      src={getOptimizedImageUrl(photo.src, 400)}
                      alt={photo.label}
                      className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.8] brightness-[0.85] group-hover:saturate-100 group-hover:brightness-100 transition-all duration-300"
                    />

                    {/* Captions that slide up on hover/touch */}
                    <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 z-20 transition-transform duration-300 ease-out ${
                      isHovered ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
                    }`}>
                      <p className="text-[8px] sm:text-[10px] font-mono text-white/50 uppercase tracking-wider">{photo.date}</p>
                      <h4 className="text-[10px] sm:text-xs font-semibold text-white truncate">{photo.label}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom: Skills Grid */}
        <div className="w-full pt-8 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="border border-white/[0.05] bg-[#0a0a0a]/70 p-5 md:p-6 rounded-2xl hover:border-[#B6443A]/20 transition-colors duration-300 flex flex-col"
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
                            className={`w-3 h-3 object-contain opacity-60 ${skill === 'AWS' ? 'brightness-0 invert' : ''}`}
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
