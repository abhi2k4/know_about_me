import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import LocalTime from "@/components/LocalTime";
import { useCommandMenu } from "@/components/CommandMenu";
import { useGoToSection } from "@/hooks/useGoToSection";
import { SECTIONS, SOCIALS } from "@/lib/site";

const WORDMARK = "Thormothe";

const Footer = () => {
  const goToSection = useGoToSection();
  const { setOpen } = useCommandMenu();

  const heading = "mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30";
  const link = "text-sm text-white/60 transition-colors hover:text-white";

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.07] bg-[#040404] px-5 pt-16 sm:px-8">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="max-w-[16rem] text-sm leading-relaxed text-white/50">
            Software engineer building fast, honest systems from Mumbai.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] text-white/40 transition-colors hover:text-white"
          >
            Press
            <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            to go anywhere
          </button>
        </div>

        <nav aria-label="Footer">
          <p className={heading}>Index</p>
          <ul className="space-y-2">
            {SECTIONS.slice(1).map((section) => (
              <li key={section.id}>
                <button onClick={() => goToSection(section.id)} className={link}>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={heading}>Elsewhere</p>
          <ul className="space-y-2">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1 ${link}`}>
                  {social.name}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
            <li>
              <a href="/resume" target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1 ${link}`}>
                Résumé
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 flex flex-col justify-between gap-6 md:col-span-1 md:items-end md:text-right">
          <div>
            <p className={heading}>Currently</p>
            <p className="flex items-center gap-2 text-sm text-white/70 md:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to full-time SWE roles
            </p>
            <button
              onClick={() => goToSection("contact")}
              className="group mt-2 inline-flex items-center gap-1 text-sm text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              Get in touch
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          <button
            onClick={() => goToSection("home")}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-white/[0.07] pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Abhishek Thormothe</span>
        <span>
          Mumbai, IN · <LocalTime /> IST
        </span>
      </div>

      {/* Wordmark bleeding off the bottom edge */}
      <div aria-hidden className="pointer-events-none mt-6 select-none overflow-hidden">
        <p className="flex translate-y-[14%] justify-center whitespace-nowrap text-[18vw] font-extrabold leading-[0.8] tracking-[-0.065em] text-transparent">
          {WORDMARK.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
              className="inline-block bg-gradient-to-b from-[#f0eadd]/[0.16] via-[#f0eadd]/[0.06] to-transparent bg-clip-text pb-[0.05em]"
            >
              {letter}
            </motion.span>
          ))}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
