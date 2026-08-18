import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { Linkedin, Github, ArrowRight, Mail, Briefcase } from "lucide-react";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [fgLoaded, setFgLoaded] = useState(false);

  // Smooth Scroll Parallax
  const { scrollY } = useScroll();
  const bgScrollY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 120]);
  const fgScrollY = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : 35]);
  const textY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : -30]);

  const [typewriterText] = useTypewriter({
    words: [
                  "software engineering",
                  "full stack development",
                  "data engineering",
                  "api development",
                  "system architecture",
                  "machine learning",
                  "creative coding"
            ],
    loop: true,
    delaySpeed: 2000,
    deleteSpeed: 40,
    typeSpeed: 60,
  });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "X", href: "https://x.com/amt_official04", icon: XIcon },
    { name: "LinkedIn", href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/abhi2k4", icon: Github },
    { name: "Email", href: "mailto:thormothe.abhishek@gmail.com", icon: Mail },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-[#040404] overflow-hidden"
      ref={heroRef}
    >

      {/* Layer 1: Office Background with Scroll Parallax & Ambient Entry */}
      <motion.div
        style={{ y: bgScrollY }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none will-change-transform overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <picture className="w-full h-full">
            <source media="(max-width: 768px)" srcSet="/portfolio-mobile.webp" type="image/webp" />
            <source srcSet="/portfolio.webp" type="image/webp" />
            <img
              src="/portfolio.webp"
              alt="Office Background"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setBgLoaded(true)}
              className={`w-full h-full object-cover object-[50%_18%] sm:object-[center_25%] md:object-[center_30%] select-none filter contrast-[1.02] brightness-[0.9] transition-opacity duration-500 ${
                bgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>
        </motion.div>
        {/* Ambient Top & Bottom Gradients */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-[#040404] via-[#040404]/60 to-transparent" />
      </motion.div>

      {/* Layer 2: Foreground Cutout with Distinct Parallax & Rise/Fade Entrance */}
      <motion.div
        style={{ y: fgScrollY }}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none will-change-transform overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full h-full"
        >
          <picture className="w-full h-full">
            <source media="(max-width: 768px)" srcSet="/portfolio-f-mobile.webp" type="image/webp" />
            <source srcSet="/portfolio-f.webp" type="image/webp" />
            <img
              src="/portfolio-f.webp"
              alt="Abhishek Thormothe"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setFgLoaded(true)}
              className={`w-full h-full object-cover object-[50%_18%] sm:object-[center_25%] md:object-[center_30%] select-none filter contrast-[1.02] brightness-[0.9] transition-opacity duration-500 ${
                fgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* Foreground Content Layout */}
      <motion.div
        style={{ y: textY }}
        className="flex-1 w-full px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end relative z-20 pt-24 sm:pt-28 md:pt-32 pb-24 md:pb-28 gap-6 md:gap-0 will-change-transform pointer-events-none"
      >
        {/* Left Side: Bio */}
        <div className="flex flex-col justify-center gap-3.5 md:gap-5 w-full md:max-w-[380px] text-left md:p-7 md:rounded-3xl md:bg-black/55 md:backdrop-blur-xl md:border md:border-white/10 md:shadow-2xl pointer-events-auto">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 md:bg-white/[0.06] backdrop-blur-md border border-white/15 w-fit shadow-lg"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#B6443A]" />
            <span className="text-[10px] font-medium tracking-wider text-white uppercase">Open for Full-Time Roles</span>
          </motion.div>

          {/* Terminal-style line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-white/70 tracking-wide"
          >
            <span className="text-[#B6443A]">~/abhishek</span>
            <span>$ open --currently</span>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-2"
          >
            <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-snug tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] md:drop-shadow-none">
              Mumbai-based Software Developer crafting purposeful digital systems.
            </p>
            <p className="font-mono text-[11px] md:text-xs text-white/90 md:text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] md:drop-shadow-none">
              specializing in <span className="text-white font-semibold">{typewriterText}</span><span className="text-[#B6443A] animate-pulse">_</span>
            </p>
          </motion.div>
        </div>

        {/* Right Side: Direct CTA Buttons (No enclosing glassmorphic card) */}
        <div className="flex flex-row md:flex-col items-center md:items-end w-full md:w-auto gap-3 pointer-events-auto pt-2 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-1 md:flex-initial"
          >
            <motion.button
              onClick={scrollToContact}
              className="w-full md:w-auto flex items-center justify-center gap-2.5 sm:gap-3 pl-2 pr-4 sm:pr-5 py-2.5 sm:py-2 rounded-full bg-[#B6443A] text-white hover:bg-[#c94f44] transition-colors duration-300 shadow-xl shadow-black/70 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-[#B6443A] group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <span className="tracking-wide uppercase text-[10px] sm:text-[11px] md:text-xs font-semibold whitespace-nowrap">Let's Collaborate</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex-1 md:flex-initial"
          >
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full md:w-auto px-4 py-3 md:px-5 md:py-2 text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wider text-white hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 bg-black/40 backdrop-blur-md hover:bg-black/60 shadow-xl shadow-black/50 text-center whitespace-nowrap"
            >
              View My Work
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Social Icons Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute left-0 right-0 bottom-5 md:bottom-7 z-30 flex justify-center items-center pointer-events-auto"
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#B6443A] hover:border-[#B6443A] transition-all duration-300"
                aria-label={link.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;