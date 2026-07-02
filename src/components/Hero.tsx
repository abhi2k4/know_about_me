import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { Linkedin, Github, ArrowRight } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

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
    { name: "X", href: "https://x.com/amt_official04", icon: XIcon },
    { name: "LinkedIn", href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/abhi2k4", icon: Github },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-[#040404] overflow-hidden"
      ref={heroRef}
    >

      {/* Centered Profile Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute left-0 right-0 mx-auto bottom-0 w-[85vw] max-w-[460px] md:max-w-[500px] h-[65vh] md:h-[82vh] z-10 pointer-events-none will-change-transform flex items-center justify-center"
      >
        <img
          src="https://res.cloudinary.com/ds2uw5gcw/image/upload/v1783014014/know%20me/photo2_csdlts.png"
          alt="Abhishek Thormothe"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center select-none filter brightness-[0.7] contrast-[1.1] saturate-[0.85] transition-opacity duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-[#040404]/20 to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#040404] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#040404] to-transparent z-10" />
      </motion.div>

      {/* Giant Name Typography with Text Hover Effect */}
      <div className="absolute left-0 right-0 bottom-[0.5vh] md:bottom-[-2vh] h-[22vh] sm:h-[34vh] md:h-[38vh] z-20 flex justify-center select-none pointer-events-none overflow-hidden px-2 opacity-85">
        <TextHoverEffect text="ABHISHEK" />
      </div>

      {/* Foreground Content Layout */}
      <motion.div
        style={{ y: textY }}
        className="flex-1 w-full px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-stretch relative z-30 pt-24 md:pt-28 pb-32 md:pb-24 gap-6 md:gap-0 will-change-transform"
      >
        {/* Left Side */}
        <div className="flex flex-col justify-center gap-4 md:gap-6 w-full md:max-w-[320px] text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B6443A] animate-pulse" />
            <span className="text-[10px] font-medium tracking-wider text-white/80 uppercase">Available for work</span>
          </motion.div>

          {/* Terminal-style line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#8B8680] tracking-wide"
          >
            <span className="text-[#B6443A]">~/abhishek</span>
            <span>$ open --currently</span>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-light leading-snug tracking-tight">
              Mumbai-based Software Developer crafting purposeful digital systems.
            </p>
            <p className="font-mono text-[11px] md:text-xs text-[#8B8680]">
              specializing in <span className="text-white">{typewriterText}</span><span className="text-[#B6443A] animate-pulse">_</span>
            </p>
          </motion.div>

        </div>

        {/* Right Side: CTAs */}
        <div className="flex flex-col justify-start md:justify-center items-start md:items-end w-full md:w-auto gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-[#B6443A] text-white hover:bg-[#c94f44] transition-colors duration-300 shadow-lg shadow-red-950/20 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-[#B6443A] group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <span className="tracking-wide uppercase text-[11px] md:text-xs font-semibold">Let's Collaborate</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 bg-white/5"
            >
              View My Work
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Centered Social Links below the giant ABHISHEK text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute left-0 right-0 bottom-4 md:bottom-10 z-30 flex justify-center items-center gap-4 pointer-events-auto"
      >
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#B6443A] hover:border-[#B6443A]/30 transition-all duration-300"
              aria-label={link.name}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Hero;