import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useInView, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.16, 1, 0.3, 1] as const;

type EventType = "hackathon" | "collaboration" | "milestone" | "launch" | "award";

interface JourneyEvent {
  id: number;
  year: string;
  month?: string;
  title: string;
  type: EventType;
  description: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
  highlight?: boolean;
}

interface Collaboration {
  id: number;
  name: string;
  role: string;
  description: string;
  tags: string[];
  link?: string;
  logoUrl?: string;
}

const typeLabels: Record<EventType, string> = {
  milestone: "Milestone",
  hackathon: "Hackathon",
  collaboration: "Leadership",
  launch: "Launch",
  award: "Certified",
};

const journeyEvents: JourneyEvent[] = [
  {
    id: 1,
    year: "2026",
    month: "May",
    title: "B.E. Computer Engineering Graduation",
    type: "milestone",
    description: "Expected graduation from AP Shah Institute of Technology, University of Mumbai. Consistently maintaining a strong academic record with a CGPA of 7.52/10.",
    tags: ["Engineering", "Mumbai", "CS"],
    highlight: true,
  },
  {
    id: 2,
    year: "2025",
    month: "Aug",
    title: "SDE Intern at Druve Media",
    type: "milestone",
    description: "Architected a society management system and an analytics dashboard for monitoring real-time trends. Designed a reusable React component library, cutting frontend dev time by roughly 40%.",
    tags: ["React", "FastAPI", "Analytics"],
    link: "https://druvemedia.in",
    linkLabel: "Company",
  },
  {
    id: 3,
    year: "2025",
    month: "Jan",
    title: "SDE Intern at EternIQ",
    type: "milestone",
    description: "Optimized the client-side rendering pipeline of a React + Node.js web app, delivering a 40% reduction in load time. Delivered 6 end-to-end features across 5 Agile sprints with a 100% sprint completion rate.",
    tags: ["React", "Node.js", "Agile"],
    link: "https://eterniq.in",
    linkLabel: "Company",
  },
  {
    id: 4,
    year: "2024",
    month: "Nov",
    title: "Union Bank of India Hackathon",
    type: "hackathon",
    description: "Built FOMO (Fraud Observation & Monitoring Operations), an ML-based real-time fraud detection system utilizing Django and FastAPI at PSB's Series iDEA Hackathon by Union Bank of India.",
    tags: ["Django", "FastAPI", "Hackathon"],
    highlight: true,
  },
  {
    id: 5,
    year: "2024",
    month: "Oct",
    title: "Organiser, DataWeb Hackathon",
    type: "collaboration",
    description: "Led the organization and execution of the DataWeb Hackathon, managing teams, logistics, and ensuring a seamless competitive experience for all participants.",
    tags: ["Leadership", "Event Management"],
  },
  {
    id: 6,
    year: "2024",
    month: "Sep",
    title: "Design & Publicity Head, Coders Club",
    type: "collaboration",
    description: "Founding team member. Spearheaded the design and publicity efforts to build, brand, and scale the official student coding community at APSIT.",
    tags: ["Community", "Leadership", "Design"],
  },
  {
    id: 7,
    year: "2024",
    month: "Mar",
    title: "Development Head, HackScript 4.0",
    type: "collaboration",
    description: "Spearheaded the technical development and digital infrastructure for HackScript 4.0, coordinating a successful and large-scale college hackathon event.",
    tags: ["Leadership", "Web Dev"],
  },
  {
    id: 8,
    year: "2024",
    month: "Feb",
    title: "Technical Co-Lead, OJUS Cultural Fest",
    type: "collaboration",
    description: "Managed technical operations and digital infrastructure for OJUS – Radiance of Euphoria, the highly anticipated official cultural fest of APSIT.",
    tags: ["Event Tech", "Leadership"],
  },
  {
    id: 9,
    year: "2023",
    title: "Technical Certifications Achieved",
    type: "award",
    description: "Earned AWS Academy Graduate certifications in Cloud Foundations and Data Engineering. Completed HackerRank SQL (Intermediate) and finished the Google Android Developer Virtual Internship.",
    tags: ["AWS", "SQL", "Android"],
    highlight: true,
  },
  {
    id: 10,
    year: "2022",
    month: "Jul",
    title: "Started B.E. in Computer Engineering",
    type: "milestone",
    description: "Enrolled at University of Mumbai's APSIT to pursue a Bachelor's degree in Computer Engineering. The start of an incredible journey.",
    tags: ["Engineering", "Mumbai", "CS"],
  },
];

const collaborations: Collaboration[] = [
  {
    id: 1,
    name: "Coders Club",
    role: "Founding Team & Head of Design",
    description: "Built and scaled an active student community, leading all design and publicity initiatives.",
    tags: ["Community", "Leadership", "Design"],
    link: "https://codersclub.apsit.edu.in",
  },
  {
    id: 2,
    name: "OJUS Cultural Fest",
    role: "Technical Co-Lead",
    description: "Managed technical operations and digital infrastructure for APSIT's biggest cultural festival.",
    tags: ["Event Tech", "Leadership"],
  },
  {
    id: 3,
    name: "HackScript 4.0",
    role: "Development Head",
    description: "Led the development team to orchestrate digital operations for the major hackathon.",
    tags: ["Web Dev", "Leadership"],
  },
];

const FILTERS: { id: "all" | EventType; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "milestone", label: "Milestones" },
  { id: "collaboration", label: "Leadership" },
  { id: "hackathon", label: "Hackathons" },
  { id: "award", label: "Certifications" },
];

const stats = [
  { value: 4, suffix: "", label: "Leadership roles" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 12, suffix: "+", label: "Hackathons" },
  { value: 4, suffix: "", label: "Certifications" },
];

/* ─── Journey Page ───────────────────────────────────── */
const JourneyPage = () => (
  <div className="min-h-screen bg-[#040404] text-white">
    <Header />

    <PageHero
      index="J"
      label="Journey"
      title="Four years,"
      accent="in moments."
      intro="Academics, internships, hackathon builds, certifications and the student communities I helped lead, newest first."
    />

    <StatsBand />
    <Timeline />
    <Collaborations />

    <Footer />
  </div>
);

/* ─── Stats: numbers count up as they enter ─────────── */
const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

const StatsBand = () => (
  <section className="grid grid-cols-2 border-y border-white/[0.07] md:grid-cols-4">
    {stats.map((s, i) => (
      <div
        key={s.label}
        className={`px-5 py-10 sm:px-8 md:py-14 ${i % 2 === 1 ? "border-l border-white/[0.07]" : ""} ${
          i > 1 ? "border-t border-white/[0.07] md:border-t-0" : ""
        } ${i === 2 ? "md:border-l" : ""}`}
      >
        <p className="font-serif text-[clamp(3.5rem,8vw,7rem)] italic leading-none text-[#f0eadd]">
          <CountUp value={s.value} suffix={s.suffix} />
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{s.label}</p>
      </div>
    ))}
  </section>
);

/* ─── Odometer year: each digit rolls independently ─── */
const Digit = ({ digit, direction }: { digit: string; direction: 1 | -1 }) => (
  <span className="relative inline-block overflow-hidden">
    <span className="invisible">0</span>
    <AnimatePresence initial={false} custom={direction}>
      <motion.span
        key={digit}
        custom={direction}
        variants={{
          enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%" }),
          center: { y: "0%" },
          exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%" }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.6, ease }}
        className="absolute inset-0"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </span>
);

/* ─── Timeline ───────────────────────────────────────── */
const Timeline = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [year, setYear] = useState(journeyEvents[0].year);
  const [direction, setDirection] = useState<1 | -1>(1);
  const yearRef = useRef(year);
  const listRef = useRef<HTMLOListElement>(null);

  const events = journeyEvents.filter((e) => filter === "all" || e.type === filter);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // The sticky year follows whichever event is crossing the middle of the viewport.
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-year]");
    if (!items?.length) return;
    yearRef.current = items[0].dataset.year!;
    setYear(yearRef.current);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const next = (entry.target as HTMLElement).dataset.year!;
          if (next === yearRef.current) return;
          setDirection(Number(next) < Number(yearRef.current) ? 1 : -1);
          yearRef.current = next;
          setYear(next);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section className="px-5 py-24 sm:px-8 md:py-36">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel index="01">Timeline</SectionLabel>
          <h2 className="mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
            From first commit <br className="hidden sm:block" />
            <span className="font-serif font-normal italic text-[#f0eadd]">to production</span>
          </h2>
        </div>

        <LayoutGroup>
          <div role="tablist" aria-label="Filter timeline" className="flex flex-wrap gap-1 rounded-3xl border border-white/10 p-1 sm:rounded-full">
            {FILTERS.map((f) => {
              const count = f.id === "all" ? journeyEvents.length : journeyEvents.filter((e) => e.type === f.id).length;
              const isActive = f.id === filter;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? "text-black" : "text-white/55 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="journey-filter"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-[#f0eadd]"
                    />
                  )}
                  <span className="relative">
                    {f.label}
                    <span className={`ml-1.5 font-mono text-[10px] ${isActive ? "text-black/50" : "text-white/30"}`}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Sticky odometer year (desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-32">
            <p
              aria-live="polite"
              aria-label={`Year ${year}`}
              className="flex text-[clamp(6rem,15vw,15rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-white"
            >
              {year.split("").map((d, i) => (
                <Digit key={i} digit={d} direction={direction} />
              ))}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
              {(() => {
                const n = events.filter((e) => e.year === year).length;
                return `${n} ${n === 1 ? "moment" : "moments"} this year`;
              })()}
            </p>
          </div>
        </div>

        <ol ref={listRef} className="relative pl-8 sm:pl-12">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10" />
          <motion.span
            style={{ scaleY: lineProgress }}
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-[#f0eadd] to-[#B6443A]"
          />

          <AnimatePresence mode="popLayout" initial={false}>
            {events.map((event, i) => {
              const firstOfYear = i === 0 || events[i - 1].year !== event.year;
              return (
                <motion.li
                  key={event.id}
                  layout
                  data-year={event.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease }}
                  className="relative pb-14 last:pb-0"
                >
                  {firstOfYear && (
                    <p className="mb-6 text-5xl font-semibold tracking-[-0.05em] text-white/90 md:hidden">{event.year}</p>
                  )}
                  <span
                    className={`absolute -left-8 h-[11px] w-[11px] rounded-full ring-4 ring-[#040404] sm:-left-12 ${
                      firstOfYear ? "top-[4.6rem] md:top-1.5" : "top-1.5"
                    } ${event.highlight ? "bg-[#B6443A]" : "bg-[#f0eadd]"}`}
                  />
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em]">
                    <span className="text-white/40">
                      {event.month ? `${event.month} ` : ""}
                      {event.year}
                    </span>
                    <span className="text-[#B6443A]">{typeLabels[event.type]}</span>
                    {event.highlight && <span className="text-[#f0eadd]/70">★ Highlight</span>}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{event.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-[15px]">{event.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {event.tags && <p className="font-mono text-[11px] text-white/35">{event.tags.join(" · ")}</p>}
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                      >
                        {event.linkLabel || "View"}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  );
};

/* ─── Collaborations ─────────────────────────────────── */
const Collaborations = () => (
  <section className="border-t border-white/[0.07] px-5 py-24 sm:px-8 md:py-36">
    <SectionLabel index="02">Collaborations</SectionLabel>
    <h2 className="mt-8 max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
      Communities I've <span className="font-serif font-normal italic text-[#f0eadd]">helped build</span>
    </h2>

    <div className="mt-16 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-3">
      {collaborations.map((c, i) => (
        <motion.article
          key={c.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease, delay: i * 0.08 }}
          className="group relative pt-6"
        >
          <span className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.08 }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-[#f0eadd]/60"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B6443A]">{c.role}</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
            {c.link ? (
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 hover:text-[#f0eadd]">
                {c.name}
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-[#f0eadd]" />
              </a>
            ) : (
              c.name
            )}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{c.description}</p>
          <p className="mt-5 font-mono text-[11px] text-white/35">{c.tags.join(" · ")}</p>
        </motion.article>
      ))}
    </div>
  </section>
);

export default JourneyPage;
