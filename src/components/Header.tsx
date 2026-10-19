import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import LocalTime from "@/components/LocalTime";
import { useCommandMenu } from "@/components/CommandMenu";
import { useGoToSection } from "@/hooks/useGoToSection";
import { SECTIONS } from "@/lib/site";

const PAGE_LABELS: Record<string, string> = {
  "/projects": "Archive",
  "/journey": "Journey",
};

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const goToSection = useGoToSection();
  const { setOpen: setMenuOpen } = useCommandMenu();
  const [active, setActive] = useState("home");
  const [expanded, setExpanded] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Scroll spy: a section is "active" while it crosses the middle band of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const activeIndex = SECTIONS.findIndex((s) => s.id === active);
  const label = isHome ? SECTIONS[activeIndex]?.label ?? "Index" : PAGE_LABELS[pathname] ?? "Index";
  const indexLabel = isHome ? `0${activeIndex}` : "↩";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Soft fade so the chrome stays legible over content */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#040404]/80 to-transparent" />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-3 px-4 pt-4 sm:px-8 sm:pt-6">
        {/* Identity */}
        <button
          onClick={() => goToSection("home")}
          className="pointer-events-auto group flex items-center gap-3 justify-self-start text-left"
          aria-label="Abhishek Thormothe — back to top"
        >
          <span className="text-[#f0eadd] transition-transform duration-500 group-hover:-rotate-12">
            <Logo />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[13px] font-semibold tracking-tight text-white">Abhishek Thormothe</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
              Mumbai · <LocalTime /> IST
            </span>
          </span>
        </button>

        {/* Dynamic island */}
        <motion.nav
          layout
          transition={spring}
          style={{ borderRadius: 999 }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false);
          }}
          className="pointer-events-auto relative overflow-hidden border border-white/10 bg-[#0b0b0b]/85 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          aria-label="Sections"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {expanded ? (
              <motion.ul
                key="expanded"
                layout="position"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-0.5 p-1"
              >
                {SECTIONS.slice(1).map((section) => {
                  const isActive = isHome && section.id === active;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => goToSection(section.id)}
                        className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                          isActive ? "text-black" : "text-white/55 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="island-active"
                            transition={spring}
                            className="absolute inset-0 -z-0 rounded-full bg-[#f0eadd]"
                          />
                        )}
                        <span className="relative">{section.label}</span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            ) : (
              <motion.button
                key="collapsed"
                layout="position"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.2 }}
                // Touch devices have no hover — tapping the island opens the full menu instead.
                onClick={() => setMenuOpen(true)}
                className="flex h-9 items-center gap-3 pl-3.5 pr-4"
                aria-label={`Current section: ${label}. Open menu`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B6443A] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B6443A]" />
                </span>
                <span className="relative h-4 w-[92px] overflow-hidden text-left">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={label}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center gap-2 text-[12px] font-medium leading-4 text-white"
                    >
                      <span className="font-mono text-[10px] text-white/35">{indexLabel}</span>
                      {label}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/10">
                  <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left rounded-full bg-[#f0eadd]" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Actions */}
        <div className="pointer-events-auto flex items-center gap-2 justify-self-end">
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden h-9 items-center gap-1 rounded-full px-3.5 text-[13px] font-medium text-white/70 transition-colors hover:text-white md:flex"
          >
            Résumé
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-[#0b0b0b]/85 pl-3.5 pr-2 text-[13px] font-medium text-white/80 backdrop-blur-xl transition-colors hover:border-white/25 hover:text-white"
            aria-label="Open command menu"
          >
            Menu
            <kbd className="hidden h-5 items-center rounded-md border border-white/10 bg-white/[0.05] px-1.5 font-mono text-[10px] text-white/50 sm:inline-flex">
              ⌘K
            </kbd>
            <span className="flex h-5 w-5 flex-col items-center justify-center gap-[3px] sm:hidden">
              <span className="h-px w-3 bg-current" />
              <span className="h-px w-3 bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
