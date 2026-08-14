import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { ExternalLink, Github, ChevronRight, X, ArrowLeft, Users, Star, GitFork } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCarousel from "@/components/ProjectCarousel";
import { Link } from "react-router-dom";

/* ─── Community Contribution Data ───────────────────── */
interface CommunityItem {
  id: number;
  name: string;
  type: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  stats?: { label: string; value: string }[];
}

const communityContributions: CommunityItem[] = [
  {
    id: 1,
    name: "Coders Club — APSIT",
    type: "FOUNDED",
    description:
      "Co-founded the official coding community at APSIT. Designed and deployed the full club platform (codersclub.apsit.edu.in) serving 600+ members with curated notes, newsletters, event management, and attendance tracking.",
    tags: ["React", "Node.js", "MongoDB", "Community", "Education"],
    link: "https://codersclub.apsit.edu.in",
    linkLabel: "Visit Site",
    stats: [
      { label: "Members", value: "600+" },
      { label: "Events", value: "10+" },
    ],
  },
  {
    id: 2,
    name: "HackScript 4.0 — Dev Lead",
    type: "ORGANISED",
    description:
      "Led engineering for an inter-college hackathon with 200+ participants. Built the judge portal and live leaderboard from scratch. Managed end-to-end logistics, sponsor communication and participant onboarding.",
    tags: ["Event Tech", "Leadership", "Full Stack", "Django"],
    link: "https://hackscript.apsit.edu.in/",
    linkLabel: "Visit Site",
    stats: [
      { label: "Participants", value: "200+" },
      { label: "Teams", value: "40+" },
    ],
  },
  {
    id: 3,
    name: "DataWeb Hackathon — Organiser",
    type: "ORGANISED",
    description:
      "Coordinated end-to-end logistics for 150+ registrants. Handled sponsor communications, participant onboarding, and built registration infrastructure with real-time verification status.",
    tags: ["Event Management", "Community", "Data"],
    link: "https://dataweb2026.vercel.app/",
    linkLabel: "Visit Site",
    stats: [
      { label: "Registrants", value: "150+" },
    ],
  },
  {
    id: 4,
    name: "OJUS — Radiance of Euphoria",
    type: "TECH CO-LEAD",
    description:
      "Technical Co-Lead for APSIT's annual cultural fest. Managed tech infrastructure for 1,000+ attendee event including live stage controls, registration systems, and real-time crowd management tools.",
    tags: ["Event Tech", "Leadership", "Infrastructure"],
    stats: [
      { label: "Attendees", value: "1000+" },
    ],
  },
];

/* ─── Projects Page ──────────────────────────────────── */
const ProjectsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const { data: projects = [], isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[100]"
        style={{ width: progressWidth }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-primary transition-colors mb-10 no-underline"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-subtitle">Portfolio</span>
            <h1 className="section-title">
              Things I've<br />
              <span className="text-primary">built.</span>
            </h1>
            <p className="max-w-xl text-white/35 text-sm leading-relaxed mt-4">
              A collection of production projects — real products, shipped to real users.
              Each one a lesson in engineering, design, and problem solving.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Project Grid ────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Label row */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-white/20 tracking-widest uppercase">
              {isLoading ? "Loading..." : `${projects.length} projects`}
            </span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          {/* Cards with gap, each card has its own border */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/8 rounded-2xl animate-pulse min-h-[280px]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <ProjectGridCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Community Contributions ──────────────────── */}
      <CommunitySection />

      <Footer />

      {/* Case Study Drawer */}
      {selectedProject && (
        <CaseStudyDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

/* ─── Project Grid Card ─────────────────────────────── */
interface CardProps {
  project: any;
  index: number;
  onOpen: () => void;
}

const ProjectGridCard = ({ project, index, onOpen }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background border border-white/8 hover:border-white/16 group cursor-pointer relative overflow-hidden flex flex-col transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        {project.images?.some((img: string) => img && img.trim()) ? (
          <motion.div
            className="w-full h-full"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ProjectCarousel images={project.images} className="aspect-video w-full" />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/3 text-xs text-white/20 font-mono min-h-[160px]">
            NO PREVIEW
          </div>
        )}
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-white/80 border border-white/20 px-4 py-2 tracking-widest uppercase">
            View Case Study <ChevronRight className="w-3 h-3" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 border-t border-white/6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-base font-semibold text-white/90 leading-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] text-white/20 tracking-widest pt-0.5 flex-shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="text-xs text-white/35 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="tag-mono">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/6 mt-auto">
          {project.code_url && (
            <a
              href={project.code_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-mono text-white/30 hover:text-white transition-colors no-underline"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-mono text-white/30 hover:text-primary transition-colors no-underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Community Contributions Section ───────────────── */
const CommunitySection = () => {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/6"
      style={{ backgroundColor: "#0c0c0c" }}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="section-subtitle">Community</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-title">
              Beyond code —<br />
              <span className="text-primary">contributions.</span>
            </h2>
            <p className="max-w-sm text-white/30 text-sm leading-relaxed pb-2">
              Open source, communities, hackathons, and events I've built, 
              organized, or led — the work that extends beyond individual repos.
            </p>
          </div>
        </div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityContributions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-white/8 hover:border-white/15 bg-background transition-colors duration-300 group p-6 md:p-7 flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary/60 uppercase border border-primary/20 px-2 py-0.5 inline-block mb-2">
                    {item.type}
                  </span>
                  <h3 className="text-base font-semibold text-white/85 group-hover:text-white transition-colors leading-tight">
                    {item.name}
                  </h3>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/15 hover:text-primary/60 transition-colors flex-shrink-0 mt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs text-white/35 leading-relaxed mb-5 flex-1">
                {item.description}
              </p>

              {/* Stats */}
              {item.stats && item.stats.length > 0 && (
                <div className="flex items-center gap-6 mb-4 py-3 border-y border-white/5">
                  {item.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-lg font-bold text-white/80">{s.value}</p>
                      <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span key={t} className="tag-mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Case Study Drawer ─────────────────────────────── */
interface DrawerProps {
  project: any;
  onClose: () => void;
}

const CaseStudyDrawer = ({ project, onClose }: DrawerProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer panel */}
      <motion.div
        data-lenis-prevent
        className="relative ml-auto w-full max-w-2xl h-full bg-[#0a0a0a] border-l border-white/8 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="sticky top-0 z-10 w-full flex items-center justify-between px-6 py-4 border-b border-white/6 bg-[#0a0a0a] hover:bg-white/3 transition-colors"
        >
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Case Study</span>
          <X className="w-4 h-4 text-white/30 hover:text-white transition-colors" />
        </button>

        <div className="p-6 md:p-8 space-y-8">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-white/90 mb-1">{project.title}</h2>
            <p className="text-sm text-white/35">{project.description}</p>
          </div>

          {/* Images */}
          {project.images?.some((img: string) => img && img.trim()) && (
            <div className="overflow-hidden border border-white/8">
              <ProjectCarousel images={project.images} className="aspect-video w-full" />
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4">
            {project.code_url && (
              <a
                href={project.code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono border border-white/15 px-4 py-2.5 hover:border-primary/40 hover:text-primary transition-colors no-underline text-white/50 uppercase tracking-widest"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono border border-primary/40 px-4 py-2.5 hover:bg-primary/10 text-primary transition-colors no-underline uppercase tracking-widest"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>

          {/* Sections */}
          {[
            { label: "The Problem", content: project.problem },
            { label: "The Solution", content: project.solution },
            { label: "My Role", content: project.role },
          ].map(
            (s) =>
              s.content && (
                <div key={s.label} className="border-t border-white/6 pt-6">
                  <h4 className="font-mono text-[10px] tracking-[0.2em] text-primary/70 uppercase mb-3">
                    {s.label}
                  </h4>
                  <p className="text-sm text-white/45 leading-relaxed">{s.content}</p>
                </div>
              )
          )}

          {/* Stack */}
          {project.stack && (
            <div className="border-t border-white/6 pt-6">
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-primary/70 uppercase mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t.name} className="tag-mono">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div className="border-t border-white/6 pt-6">
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-primary/70 uppercase mb-3">
                Key Challenges
              </h4>
              <ul className="space-y-2.5">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcomes */}
          {project.outcomes && (
            <div className="border-t border-white/6 pt-6 pb-8">
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-primary/70 uppercase mb-3">
                Outcomes
              </h4>
              <ul className="space-y-2.5">
                {project.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage;
