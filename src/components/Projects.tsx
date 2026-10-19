import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CaseStudyDialog from "@/components/CaseStudyDialog";
import { useProjects, type Project } from "@/hooks/useProjects";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { splitTitle } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

const ProjectsSkeleton = () => (
  <div className="border-t border-white/10">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center gap-6 border-b border-white/10 py-8">
        <div className="h-3 w-6 animate-pulse rounded bg-white/5" />
        <div className="h-10 w-1/2 animate-pulse rounded bg-white/5" />
      </div>
    ))}
  </div>
);

const Projects = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.slice(0, 5);

  // Floating preview trails the cursor with a soft spring.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.6 });

  const onPointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section id="projects" className="relative w-full bg-[#040404] px-5 py-24 sm:px-8 md:py-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="02">Selected work</SectionLabel>
          <h2 className="mt-8 text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
            Things I've <span className="font-serif font-normal italic text-[#f0eadd]">shipped</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-white/50 md:text-right">
          Production platforms, distributed systems and AI products. Open any one for the full case study.
        </p>
      </div>

      <div className="mt-14 md:mt-20">
        {isLoading ? (
          <ProjectsSkeleton />
        ) : (
          <ul
            onPointerMove={onPointerMove}
            onPointerLeave={() => setHovered(null)}
            className="group/list border-t border-white/10"
          >
            {featured.map((project, index) => (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease, delay: index * 0.06 }}
                className="border-b border-white/10 transition-opacity duration-500 md:group-hover/list:opacity-30 md:hover:!opacity-100"
              >
                <button
                  onClick={() => {
                    setHovered(null);
                    setSelected(project);
                  }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(index)}
                  onFocus={() => setHovered(null)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-4 py-7 text-left md:grid-cols-[4rem_1fr_minmax(0,18rem)_3rem] md:py-9"
                >
                  <span className="font-mono text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>

                  <span className="min-w-0 transition-transform duration-500 ease-out md:group-hover:translate-x-3">
                    <span className="flex items-center gap-3">
                      <span className="truncate pb-[0.12em] text-[clamp(1.75rem,4.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
                        {splitTitle(project.title)[0]}
                      </span>
                      {project.demo_url && (
                        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300/80 sm:inline-flex">
                          <span className="h-1 w-1 rounded-full bg-emerald-400" /> Live
                        </span>
                      )}
                    </span>
                    {splitTitle(project.title)[1] && (
                      <span className="mt-1 block truncate font-serif text-lg italic text-[#f0eadd]/60 sm:text-2xl">
                        {splitTitle(project.title)[1]}
                      </span>
                    )}
                  </span>

                  <span className="col-span-2 col-start-2 row-start-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-white/40 md:col-span-1 md:col-start-3 md:row-start-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>

                  <span className="col-start-3 row-start-1 flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-white/10 text-white/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#f0eadd] group-hover:bg-[#f0eadd] group-hover:text-black md:col-start-4">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>

                  {/* Touch screens get an inline thumbnail instead of the hover preview */}
                  {project.images?.[0] && (
                    <span className="col-span-3 col-start-1 row-start-3 block aspect-[16/9] overflow-hidden rounded-xl border border-white/10 md:hidden">
                      <img
                        src={getOptimizedImageUrl(project.images[0], 700)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover object-top"
                      />
                    </span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {!isLoading && (
        <div className="mt-12 flex justify-end">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
          >
            Full archive
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      )}

      {/* Cursor-following preview (desktop) */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {hovered !== null && featured[hovered] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative -ml-[190px] -mt-[130px] h-[260px] w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
            >
              {featured.map((p, i) => (
                <img
                  key={p.id}
                  src={getOptimizedImageUrl(p.images?.[0], 800)}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ${
                    i === hovered ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                Open case study <ArrowUpRight className="h-3 w-3" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <CaseStudyDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
