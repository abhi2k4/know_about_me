import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import CaseStudyDialog from "@/components/CaseStudyDialog";
import { useProjects, type Project } from "@/hooks/useProjects";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { splitTitle } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

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
    name: "Coders Club - APSIT",
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
    name: "HackScript 4.0 - Dev Lead",
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
    name: "DataWeb Hackathon - Organiser",
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
    name: "OJUS - Radiance of Euphoria",
    type: "TECH CO-LEAD",
    description:
      "Technical Co-Lead for APSIT's annual cultural fest. Managed tech infrastructure for 1,000+ attendee event including live stage controls, registration systems, and real-time crowd management tools.",
    tags: ["Event Tech", "Leadership", "Infrastructure"],
    stats: [
      { label: "Attendees", value: "1000+" },
    ],
  },
];

/* ─── Filters ────────────────────────────────────────── */
const FILTERS = [
  { id: "all", label: "All", match: () => true },
  { id: "live", label: "Live", match: (p: Project) => !!p.demo_url },
  { id: "source", label: "Source available", match: (p: Project) => !!p.code_url },
];

/* ─── Projects Page ──────────────────────────────────── */
const ProjectsPage = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const active = FILTERS.find((f) => f.id === filter)!;
  const visible = projects.filter(active.match);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <Header />

      <PageHero
        index="A"
        label="Archive"
        title="Everything"
        accent="I've built."
        intro="Production platforms, hackathon builds and side projects, shipped to real users. Hover a card to flip through its screens, or open it for the full case study."
      >
        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border border-white/10 p-1">
            {FILTERS.map((f) => {
              const count = projects.filter(f.match).length;
              const isActive = f.id === filter;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? "text-black" : "text-white/55 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="archive-filter"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-[#f0eadd]"
                    />
                  )}
                  <span className="relative">
                    {f.label}
                    <span className={`ml-1.5 font-mono text-[10px] ${isActive ? "text-black/50" : "text-white/30"}`}>
                      {isLoading ? "–" : count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </PageHero>

      {/* ── Gallery ─────────────────────────────────── */}
      <section className="px-5 pb-24 sm:px-8 md:pb-36">
        {isLoading ? (
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`${i % 4 === 0 || i % 4 === 3 ? "md:col-span-7" : "md:col-span-5"}`}>
                <div className="aspect-[16/10] animate-pulse rounded-2xl bg-white/[0.04]" />
                <div className="mt-5 h-8 w-1/2 animate-pulse rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <GalleryCard
                  key={project.id}
                  project={project}
                  index={projects.indexOf(project)}
                  // Alternate wide/narrow so the grid reads like an editorial spread.
                  wide={i % 4 === 0 || i % 4 === 3}
                  onOpen={() => setSelected(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <CommunitySection />

      <Footer />

      <CaseStudyDialog project={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

/* ─── Gallery card: scrub through screenshots with the cursor ─── */
const GalleryCard = ({
  project,
  index,
  wide,
  onOpen,
}: {
  project: Project;
  index: number;
  wide: boolean;
  onOpen: () => void;
}) => {
  const images = (project.images ?? []).filter((img) => img?.trim());
  const [frame, setFrame] = useState(0);
  const [name, subtitle] = splitTitle(project.title);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || images.length < 2) return;
    const r = e.currentTarget.getBoundingClientRect();
    setFrame(Math.min(images.length - 1, Math.floor(((e.clientX - r.left) / r.width) * images.length)));
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease }}
      className={`group ${wide ? "md:col-span-7" : "md:col-span-5 md:mt-24"}`}
    >
      <button
        onClick={onOpen}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setFrame(0)}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e] text-left"
        aria-label={`Open case study: ${project.title}`}
      >
        {images.length > 0 ? (
          images.map((src, i) => (
            <img
              key={src + i}
              src={getOptimizedImageUrl(src, wide ? 1200 : 900)}
              alt={i === 0 ? `${name} screenshot` : ""}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03] ${
                i === frame ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/25">No preview</span>
        )}

        {/* Story-style frame indicator */}
        {images.length > 1 && (
          <span className="absolute inset-x-3 top-3 hidden gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
            {images.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                <span className={`block h-full bg-white transition-transform duration-300 ${i <= frame ? "translate-x-0" : "-translate-x-full"}`} />
              </span>
            ))}
          </span>
        )}

        <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0eadd] text-black opacity-0 shadow-xl transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[11px] text-white/35">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-2 text-3xl font-semibold leading-none tracking-[-0.04em] text-white sm:text-4xl">{name}</h2>
          {subtitle && <p className="mt-2 font-serif text-lg italic text-[#f0eadd]/60 sm:text-xl">{subtitle}</p>}
          <p className="mt-4 font-mono text-[11px] text-white/40">{project.tags.slice(0, 4).join(" · ")}</p>
        </div>
        <div className="flex shrink-0 gap-2 pt-6">
          {project.code_url && (
            <a
              href={project.code_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} source code`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-1.5 rounded-full border border-emerald-400/25 px-3.5 font-mono text-[11px] uppercase tracking-wider text-emerald-300/90 transition-colors hover:border-emerald-300/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Community Contributions ───────────────────────── */
const CommunitySection = () => (
  <section className="border-t border-white/[0.07] px-5 py-24 sm:px-8 md:py-36">
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <SectionLabel index="B">Community</SectionLabel>
        <h2 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
          Beyond <span className="font-serif font-normal italic text-[#f0eadd]">the repo</span>
        </h2>
      </div>
      <p className="max-w-xs text-sm text-white/50 md:text-right">
        Communities I've founded, hackathons I've run and events whose tech I've led.
      </p>
    </div>

    <ul className="mt-14 border-t border-white/10 md:mt-20">
      {communityContributions.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease, delay: i * 0.05 }}
          className="group grid gap-6 border-b border-white/10 py-10 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:gap-10 md:py-12"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B6443A]">{item.type}</span>

          <div>
            <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 hover:text-[#f0eadd]">
                  {item.name}
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-[#f0eadd]" />
                </a>
              ) : (
                item.name
              )}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-[15px]">{item.description}</p>
            <p className="mt-4 font-mono text-[11px] text-white/35">{item.tags.join(" · ")}</p>
          </div>

          {item.stats && (
            <dl className="flex gap-8 md:justify-end md:text-right">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-5xl italic leading-none text-[#f0eadd] sm:text-6xl">{s.value}</dd>
                  <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </motion.li>
      ))}
    </ul>
  </section>
);

export default ProjectsPage;
