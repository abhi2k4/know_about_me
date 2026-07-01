import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 60]);
  const textY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : -30]);

  const [typewriterText] = useTypewriter({
    words: [
      "api development",
      "ui/ux design",
      "machine learning",
      "web architectures",
      "creative coding",
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
    { name: "Twitter", href: "https://x.com/amt_official04", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/abhi2k4", icon: Github },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-[#040404] overflow-hidden"
      ref={heroRef}
    >
      {/* Background Vertical Stripes */}
      <div className="absolute inset-0 flex justify-center pointer-events-none z-0 overflow-hidden">
        <div className="w-full max-w-5xl h-full grid grid-cols-5 border-x border-white/[0.02]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="border-r border-white/[0.02] h-full relative"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-b from-[#B6443A]/[0.03] via-transparent to-transparent" 
                style={{ opacity: i % 2 === 0 ? 0.8 : 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Faint scan-line texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
        }}
      />

      {/* Centered Profile Image with Vignette & Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[500px] h-[75vh] md:h-[82vh] z-10 pointer-events-none will-change-transform opacity-30 md:opacity-100 flex items-center justify-center"
      >
        <img
          src="/Profile-red.png"
          alt="Abhishek Thormothe"
          className="w-full h-full object-cover object-center select-none filter brightness-[0.7] contrast-[1.1] saturate-[0.85]"
        />

        {/* vignettes/fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#040404] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#040404] to-transparent z-10" />
      </motion.div>

      {/* Giant Name Typography (Layered behind active text widgets but in front of photo) */}
      <div className="absolute left-0 right-0 bottom-[8vh] md:bottom-[5vh] z-20 flex justify-center select-none pointer-events-none overflow-hidden">
        <motion.h1 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16vw] font-black leading-none tracking-tighter text-[#F5F1EA] uppercase whitespace-nowrap text-center opacity-[0.95]"
        >
          Abhishek
        </motion.h1>
      </div>

      {/* Foreground Content Layout */}
      <motion.div
        style={{ y: textY }}
        className="flex-1 w-full px-6 sm:px-12 md:px-16 flex flex-col md:flex-row justify-between items-center md:items-stretch relative z-30 pt-28 pb-16 md:pb-24 will-change-transform"
      >
        {/* Left Side: Status Badge, Terminal Line, Bio */}
        <div className="flex flex-col justify-center gap-6 w-full md:max-w-[340px] text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B6443A] animate-pulse" />
            <span className="text-[10px] font-medium tracking-wider text-[#F5F1EA]/80 uppercase">Available for work</span>
          </motion.div>

          {/* Terminal-style status line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 font-mono text-[11px] text-[#8B8680] tracking-wide"
          >
            <span className="text-[#B6443A]">~/abhishek</span>
            <span>$ open --currently</span>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-[#F5F1EA] font-light leading-snug tracking-tight">
              Mumbai-based Software Developer crafting purposeful digital systems.
            </p>
            <p className="font-mono text-xs text-[#8B8680]">
              specializing in <span className="text-[#F5F1EA]">{typewriterText}</span><span className="text-[#B6443A] animate-pulse">_</span>
            </p>
          </motion.div>
        </div>

        {/* Right Side: CTA Button Group */}
        <div className="flex flex-col justify-center items-end w-full md:w-auto mt-12 md:mt-0 lg:pr-12 gap-4">
          {/* Primary: Let's Collaborate */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="flex items-center gap-4 pl-2 pr-6 py-2 rounded-full bg-[#B6443A] text-white font-medium text-sm md:text-base hover:bg-[#c94f44] transition-colors duration-300 shadow-lg shadow-red-950/20 group relative overflow-hidden pointer-events-auto w-fit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#B6443A] group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="tracking-wide uppercase text-xs md:text-sm font-semibold">Let's Collaborate</span>
            </motion.button>
          </motion.div>

          {/* Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1EA]/60 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 pointer-events-auto bg-white/5"
            >
              View My Work
            </button>
          </motion.div>
        </div>
      </motion.div>

   

      {/* Far Right: Vertical Social Icons */}
      <div className="hidden lg:flex flex-col items-center gap-5 absolute right-12 top-1/2 -translate-y-1/2 z-30">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#B6443A] hover:border-[#B6443A]/30 hover:bg-white/[0.02] transition-all duration-300 pointer-events-auto"
              aria-label={link.name}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;