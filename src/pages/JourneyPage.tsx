import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowLeft, ExternalLink, Users, Trophy, Zap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import NavigationDock from "@/components/NavigationDock";
import Footer from "@/components/Footer";

interface JourneyEvent {
  id: number;
  year: string;
  month?: string;
  title: string;
  type: "hackathon" | "collaboration" | "milestone" | "launch" | "award";
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

const typeConfig = {
  hackathon: { label: "HACKATHON", color: "text-orange-400", borderColor: "border-orange-400/30", bg: "bg-orange-400/10" },
  collaboration: { label: "COLLAB", color: "text-blue-400", borderColor: "border-blue-400/30", bg: "bg-blue-400/10" },
  milestone: { label: "MILESTONE", color: "text-primary", borderColor: "border-primary/30", bg: "bg-primary/10" },
  launch: { label: "LAUNCH", color: "text-green-400", borderColor: "border-green-400/30", bg: "bg-green-400/10" },
  award: { label: "AWARD", color: "text-yellow-400", borderColor: "border-yellow-400/30", bg: "bg-yellow-400/10" },
};

const journeyEvents: JourneyEvent[] = [
  {
    id: 1,
    year: "2026",
    month: "Feb",
    title: "OverSightAI — Live at oversightai.in",
    type: "launch",
    description: "Launched OverSightAI, a centralized governance control plane for enterprise AI agents, built atop DataHub, Keycloak, and Langfuse.",
    tags: ["DataHub", "Keycloak", "AI Governance", "Open Source"],
    link: "https://oversightai.in",
    linkLabel: "Visit Site",
    highlight: true,
  },
  {
    id: 2,
    year: "2026",
    month: "Jan",
    title: "Artisy — Indian Art Marketplace Launched",
    type: "launch",
    description: "Launched Artisy, a marketplace dedicated to Indian artisans integrating Razorpay and Delhivery for seamless payments and shipping.",
    tags: ["NextJS", "Razorpay", "Delhivery", "E-commerce"],
    link: "https://artisy.in",
    linkLabel: "Visit Site",
  },
  {
    id: 3,
    year: "2026",
    month: "Mar",
    title: "Chalo Kisaan — AgriTourism Platform",
    type: "launch",
    description: "Built a progressive web app connecting rural Indian farmers with urban tourists. Hosted fully on AWS with a Lighthouse PWA score of 90+.",
    tags: ["FastAPI", "AWS", "PWA", "React"],
    link: "https://chalokisaan.in",
    linkLabel: "Visit Site",
    highlight: true,
  },
  {
    id: 4,
    year: "2025",
    month: "Aug",
    title: "SDE Intern at Druve Media",
    type: "milestone",
    description: "Joined Druve Media as a Software Development Engineer Intern to build and maintain real-time applications using React Native and FastAPI.",
    tags: ["React Native", "FastAPI", "WebSockets"],
    link: "https://druvemedia.in",
    linkLabel: "Company",
  },
  {
    id: 5,
    year: "2025",
    month: "Jan",
    title: "SDE Intern at EternIQ",
    type: "milestone",
    description: "Joined EternIQ as an SDE Intern. Reduced client-side load times by 40% across their web platform. Built component library using Tailwind CSS.",
    tags: ["React", "Node.js", "Tailwind CSS"],
    link: "https://eterniq.in",
    linkLabel: "Company",
  },
  {
    id: 6,
    year: "2024",
    month: "Nov",
    title: "FOMO — Fraud Detection Platform",
    type: "hackathon",
    description: "Built FOMO (Fraud Observation & Monitoring Operations) — a real-time fraud detection system using Django, AWS, and Gemini AI.",
    tags: ["Django", "AWS RDS", "Gemini", "Docker"],
    link: "https://github.com/abhi2k4/fraudguard",
    linkLabel: "GitHub",
  },
  {
    id: 7,
    year: "2024",
    month: "Sep",
    title: "Coders Club — Official Launch",
    type: "collaboration",
    description: "Founded and launched Coders Club at APSIT — a student community helping engineers prepare for placements through workshops, projects and peer learning.",
    tags: ["Community", "Leadership", "Education"],
    link: "https://codersclub.apsit.edu.in",
    linkLabel: "Visit Site",
    highlight: true,
  },
  {
    id: 8,
    year: "2022",
    month: "Jul",
    title: "Started B.E. in Computer Engineering",
    type: "milestone",
    description: "Enrolled at University of Mumbai's APSIT to pursue a Bachelor's degree in Computer Engineering. Started the journey of turning code into craft.",
    tags: ["Engineering", "Mumbai", "CS"],
  },
];

const collaborations: Collaboration[] = [
  {
    id: 1,
    name: "Druve Media",
    role: "SDE Intern",
    description: "Built real-time communication features using React Native and WebSocket APIs.",
    tags: ["React Native", "FastAPI", "Real-time"],
    link: "https://druvemedia.in",
    logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1755021397/know%20me/druve_bmvvnb.jpg",
  },
  {
    id: 2,
    name: "EternIQ",
    role: "SDE Intern",
    description: "Delivered performance improvements and a design system rewrite for their main platform.",
    tags: ["React", "Node.js", "Figma"],
    link: "https://eterniq.in",
    logoUrl: "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744970928/know%20me/eterniq_abqsnr.ico",
  },
  {
    id: 3,
    name: "Coders Club — APSIT",
    role: "Founding Member",
    description: "Built and scaled an active student community for engineers preparing for industry placement.",
    tags: ["Community", "Leadership", "Education"],
    link: "https://codersclub.apsit.edu.in",
  },
];

/* ─── Journey Page ───────────────────────────────────── */
const JourneyPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      {/* Progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[100]"
        style={{ width: progressWidth }}
      />

      <NavigationDock />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/6">
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
            <span className="section-subtitle">Journey</span>
            <h1 className="section-title">
              Events &<br />
              <span className="text-primary">milestones.</span>
            </h1>
            <p className="max-w-xl text-white/35 text-sm leading-relaxed mt-4">
              A timeline of meaningful moments — from lines of code to launched products,
              internships, hackathons, and communities built along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <StatsSection />

      {/* Timeline */}
      <TimelineSection />

      {/* Collaborations */}
      <CollaborationsSection />

      <Footer />
    </div>
  );
};

/* ─── Stats ──────────────────────────────────────────── */
const StatsSection = () => {
  const stats = [
    { icon: <Zap className="w-4 h-4" />, value: "5+", label: "Projects Shipped" },
    { icon: <Users className="w-4 h-4" />, value: "2", label: "Internships" },
    { icon: <Trophy className="w-4 h-4" />, value: "3+", label: "Hackathons" },
    { icon: <Calendar className="w-4 h-4" />, value: "4", label: "Years Coding" },
  ];

  return (
    <div className="border-b border-white/6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/6">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="flex flex-col items-center justify-center py-10 gap-2"
        >
          <span className="text-primary/60">{s.icon}</span>
          <span className="text-3xl font-bold tracking-tight text-white/90">{s.value}</span>
          <span className="text-xs font-mono text-white/25 tracking-widest uppercase">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Timeline ───────────────────────────────────────── */
const TimelineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.05, triggerOnce: true });

  // Group by year
  const grouped: Record<string, JourneyEvent[]> = {};
  journeyEvents.forEach((e) => {
    if (!grouped[e.year]) grouped[e.year] = [];
    grouped[e.year].push(e);
  });

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" ref={animRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto">
        <div
          className={`mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="section-subtitle">Timeline</span>
          <h2 className="text-2xl font-bold text-white/80">From first commit to production.</h2>
        </div>

        <div className="max-w-3xl space-y-16">
          {years.map((year) => (
            <div key={year}>
              {/* Year header */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-4xl font-bold text-white/10">{year}</span>
                <div className="flex-1 h-px bg-white/6" />
              </div>

              <div className="relative pl-6 md:pl-10 space-y-0">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8" />

                {grouped[year].map((event, idx) => {
                  const cfg = typeConfig[event.type];
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative pb-8 last:pb-0"
                    >
                      {/* Dot */}
                      <div
                        className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border ${cfg.borderColor} ${cfg.bg}`}
                      />

                      <div className={`border ${event.highlight ? "border-white/15" : "border-white/6"} hover:border-white/14 transition-colors bg-background`}>
                        <div className="p-5 md:p-6">
                          {/* Meta row */}
                          <div className="flex items-center gap-3 mb-3">
                            {event.month && (
                              <span className="font-mono text-[10px] text-white/20 tracking-wider">
                                {event.month} {event.year}
                              </span>
                            )}
                            <span
                              className={`font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border ${cfg.borderColor} ${cfg.color}`}
                            >
                              {cfg.label}
                            </span>
                            {event.highlight && (
                              <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-primary/20 text-primary/50">
                                HIGHLIGHT
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-semibold text-white/85 mb-2">{event.title}</h3>
                          <p className="text-sm text-white/35 leading-relaxed mb-3">{event.description}</p>

                          {event.tags && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {event.tags.map((t) => (
                                <span key={t} className="tag-mono">{t}</span>
                              ))}
                            </div>
                          )}

                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/50 hover:text-primary transition-colors no-underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {event.linkLabel || "View"}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Collaborations ─────────────────────────────────── */
const CollaborationsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/6"
      style={{ backgroundColor: "#0c0c0c" }}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto">
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="section-subtitle">Collaborations</span>
          <h2 className="text-2xl font-bold text-white/80">
            Companies & communities<br />
            <span className="text-primary">I've worked with.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-white/8 bg-white/8">
          {collaborations.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0c0c0c] p-7 md:p-8 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  {c.logoUrl && (
                    <div className="w-9 h-9 bg-white overflow-hidden flex-shrink-0">
                      <img src={c.logoUrl} alt={c.name} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors">
                      {c.name}
                    </h3>
                    <p className="font-mono text-[10px] text-primary/60 tracking-widest uppercase">{c.role}</p>
                  </div>
                </div>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/15 hover:text-primary/60 transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-xs text-white/35 leading-relaxed mb-4">{c.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
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

export default JourneyPage;
