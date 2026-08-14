import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, 
  Globe, 
  Cpu, 
  Database, 
  Layers, 
  Sparkles, 
  Grid3X3, 
  Infinity as InfinityIcon,
  Code2
} from "lucide-react";

export interface TechSkill {
  name: string;
  category: "backend" | "frontend" | "cloud" | "data" | "ai";
  categoryLabel: string;
  icon: string;
  color?: string;
  description: string;
}

const techSkills: TechSkill[] = [
  // Backend
  { name: "Python", category: "backend", categoryLabel: "Backend", icon: "https://cdn.simpleicons.org/python", description: "Core Language" },
  { name: "Django", category: "backend", categoryLabel: "Backend", icon: "https://cdn.simpleicons.org/django/092E20", description: "Web Framework" },
  { name: "FastAPI", category: "backend", categoryLabel: "Backend", icon: "https://cdn.simpleicons.org/fastapi/009688", description: "Async APIs" },
  { name: "Node.js", category: "backend", categoryLabel: "Backend", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", description: "Runtime" },
  { name: "Flask", category: "backend", categoryLabel: "Backend", icon: "https://cdn.simpleicons.org/flask/ffffff", description: "Micro-framework" },
  
  // Frontend
  { name: "React.js", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/react/61DAFB", description: "UI Library" },
  { name: "TypeScript", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/typescript/3178C6", description: "Typed JS" },
  { name: "Next.js", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff", description: "React Framework" },
  { name: "JavaScript", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", description: "Language" },
  { name: "Tailwind CSS", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", description: "Styling" },
  { name: "React Native", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/react/61DAFB", description: "Mobile Apps" },
  { name: "Figma", category: "frontend", categoryLabel: "Frontend", icon: "https://cdn.simpleicons.org/figma/F24E1E", description: "UI/UX Design" },
  
  // Data
  { name: "PostgreSQL", category: "data", categoryLabel: "Data", icon: "https://cdn.simpleicons.org/postgresql/4169E1", description: "Relational DB" },
  { name: "MongoDB", category: "data", categoryLabel: "Data", icon: "https://cdn.simpleicons.org/mongodb/47A248", description: "NoSQL DB" },
  { name: "MySQL", category: "data", categoryLabel: "Data", icon: "https://cdn.simpleicons.org/mysql/4479A1", description: "SQL Engine" },
  { name: "Supabase", category: "data", categoryLabel: "Data", icon: "https://cdn.simpleicons.org/supabase/3FCF8E", description: "BaaS & Postgres" },
  { name: "Redis", category: "data", categoryLabel: "Data", icon: "https://cdn.simpleicons.org/redis/DC382D", description: "In-Memory Cache" },

  // Cloud & DevOps
  { name: "AWS", category: "cloud", categoryLabel: "Cloud", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg", description: "Cloud Infra" },
  { name: "Docker", category: "cloud", categoryLabel: "Cloud", icon: "https://cdn.simpleicons.org/docker/2496ED", description: "Containers" },
  { name: "GitHub Actions", category: "cloud", categoryLabel: "Cloud", icon: "https://cdn.simpleicons.org/githubactions/2088FF", description: "CI/CD Pipelines" },
  { name: "Git", category: "cloud", categoryLabel: "Cloud", icon: "https://cdn.simpleicons.org/git/F05032", description: "Version Control" },
  
  // AI & Architecture
  { name: "Google Gemini", category: "ai", categoryLabel: "AI & ML", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2", description: "LLMs & Multimodal" },
];

const categories = [
  { id: "all", label: "All Stack", icon: Layers },
  { id: "backend", label: "Backend & Systems", icon: Server },
  { id: "frontend", label: "Frontend & UI", icon: Globe },
  { id: "data", label: "Data & Storage", icon: Database },
  { id: "cloud", label: "Cloud & DevOps", icon: Cpu },
  { id: "ai", label: "Applied AI", icon: Sparkles },
];

// Row 1 & Row 2 for the Marquee
const row1 = techSkills.slice(0, Math.ceil(techSkills.length / 2));
const row2 = techSkills.slice(Math.ceil(techSkills.length / 2));

export const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");

  const filteredSkills = selectedCategory === "all" 
    ? techSkills 
    : techSkills.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full pt-10 border-t border-white/5 flex flex-col gap-8">
      {/* Header with Switcher */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Code2 className="w-4 h-4 text-[#B6443A]" />
          <span className="font-mono text-xs tracking-wider uppercase text-white/60">
            Technology Stack & Tooling
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 w-fit">
          <button
            onClick={() => setViewMode("marquee")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === "marquee"
                ? "bg-[#B6443A] text-white shadow-md shadow-red-950/40"
                : "text-white/50 hover:text-white"
            }`}
          >
            <InfinityIcon className="w-3.5 h-3.5" />
            <span>Stream</span>
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === "grid"
                ? "bg-[#B6443A] text-white shadow-md shadow-red-950/40"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Matrix</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Infinite Dual Marquee Stream */}
      {viewMode === "marquee" ? (
        <div className="relative w-full overflow-hidden flex flex-col gap-4 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Row 1: Leftward */}
          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((tech, idx) => (
              <TechPill key={`${tech.name}-row1-${idx}`} tech={tech} />
            ))}
          </div>

          {/* Row 2: Rightward */}
          <div className="flex w-max gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((tech, idx) => (
              <TechPill key={`${tech.name}-row2-${idx}`} tech={tech} />
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: Interactive Filterable Grid */
        <div className="flex flex-col gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? "text-white bg-white/10 border border-white/20 shadow-lg"
                      : "text-white/40 hover:text-white/80 bg-white/[0.02] border border-white/5 hover:border-white/10"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-xl bg-[#B6443A]/20 border border-[#B6443A]/40 pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#B6443A]" : "text-white/40"}`} />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Grid Cards */}
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* Individual Tech Pill for Marquee */
const TechPill = ({ tech }: { tech: TechSkill }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#B6443A]/40 hover:bg-[#120a09] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-950/20 group cursor-default">
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <img
          src={tech.icon}
          alt={tech.name}
          className={`w-4 h-4 object-contain filter group-hover:scale-110 transition-transform duration-300 ${
            tech.name === "AWS" || tech.name === "Next.js" || tech.name === "Flask" ? "brightness-0 invert" : ""
          }`}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-white/90 group-hover:text-white whitespace-nowrap">
          {tech.name}
        </span>
        <span className="text-[10px] font-mono text-white/40 group-hover:text-[#B6443A] transition-colors whitespace-nowrap">
          {tech.description}
        </span>
      </div>
    </div>
  );
};

/* Individual Tech Card for Grid */
const TechCard = ({ tech }: { tech: TechSkill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-start justify-between p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#B6443A]/40 transition-colors duration-300 group overflow-hidden cursor-default min-h-[110px]"
    >
      {/* Spotlight Hover Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(182, 68, 58, 0.18), transparent 80%)`,
          }}
        />
      )}

      {/* Top: Icon + Category Badge */}
      <div className="w-full flex items-center justify-between mb-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#B6443A]/30 transition-all duration-300">
          <img
            src={tech.icon}
            alt={tech.name}
            className={`w-4 h-4 object-contain ${
              tech.name === "AWS" || tech.name === "Next.js" || tech.name === "Flask" ? "brightness-0 invert" : ""
            }`}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-wider text-white/30 group-hover:text-white/60 transition-colors">
          {tech.categoryLabel}
        </span>
      </div>

      {/* Bottom: Name & Subtitle */}
      <div className="relative z-10">
        <h4 className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
          {tech.name}
        </h4>
        <p className="text-[10px] font-mono text-white/40 group-hover:text-[#B6443A] transition-colors mt-0.5">
          {tech.description}
        </p>
      </div>
    </motion.div>
  );
};

export default TechStack;
