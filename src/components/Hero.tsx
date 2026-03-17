import { useRef } from "react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { motion, useScroll, useTransform } from "framer-motion";
import Aurora from "@/components/ui/aurora";
import { useTypewriter } from 'react-simple-typewriter';
import { Link } from "react-router-dom";

type SocialLink = {
  href: string;
  icon: any;
  label: string;
  isBrand?: boolean;
};

const Hero = () => {
  const { ref: titleRef } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [typewriterText] = useTypewriter({
    words: [
      'API Development',
      'UI/UX',
      'Machine Learning',
      'Front-End Development'
    ],
    loop: true,
    delaySpeed: 2000,
    deleteSpeed: 50,
    typeSpeed: 80,
  });

  const socialLinks: SocialLink[] = [
    { href: "https://github.com/abhi2k4", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/amt_official04", icon: faXTwitter, label: "X (Twitter)", isBrand: true },
    { href: "mailto:thormothe.abhishek@gmail.com", icon: Mail, label: "Email" }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-background"
      ref={heroRef}
    >
      {/* Flat dark background - no gradient */}
      <div className="absolute inset-0 -z-20" style={{ backgroundColor: "#080808" }} aria-hidden="true" />
      
      {/* Aurora effect - subtle red accents */}
      <div className="absolute inset-0 -z-4 pointer-events-none opacity-15">
        <Aurora colorStops={["#3A0B0B", "#FF3232", "#FFBDBD"]} amplitude={1.0} blend={0.6} speed={0.4} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 flex flex-col relative z-10 min-h-screen justify-between">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-start"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></span>
            <span className="text-xs font-light tracking-wide text-foreground/70">
              Available for new opportunities
            </span>
          </div> */}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-8 sm:py-12">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-16 items-center">
              {/* Left - Name */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col justify-center text-center md:text-left order-2 md:order-1"
              >
                <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl xl:text-7xl font-black leading-[0.85] tracking-tighter">
                  <span className="block text-foreground">I AM</span>
                  <span className="block text-foreground">ABHISHEK</span>
                </h1>
              </motion.div>

              {/* Center - Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex justify-center items-center order-1 md:order-2"
              >
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
                  {/* Rotating outer dashed ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/20"
                    aria-hidden="true"
                  />

                  {/* Main circle with enhanced styling */}
                  <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-primary/30 bg-gradient-to-br from-primary/10 to-transparent shadow-2xl shadow-primary/10">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5 rounded-full animate-pulse" aria-hidden="true" />
                    
                    <img 
                      src="/Profile-red.png"
                      alt="Abhishek - Digital Product Designer"
                      className="w-full h-full object-cover rounded-full relative z-10 hover:scale-105 transition-transform duration-500"
                      ref={titleRef as React.RefObject<HTMLImageElement>}
                    />
                  </div>

                  {/* Inner accent ring */}
                  <div className="absolute inset-6 rounded-full border border-primary/10" aria-hidden="true" />
                  
                  {/* Decorative dots */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>

              {/* Right - Role */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col justify-center text-center md:text-right order-3"
              >
                <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-black leading-[0.85] tracking-tighter">
                  <span className="block text-foreground">FULL</span>
                  <span className="block text-foreground">STACK</span>
                  <span className="block text-foreground">DEVELOPER</span>
                </div>
              </motion.div>
            </div>

            {/* Subtitle with typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12 sm:mt-16 lg:mt-20"
            >
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground/70 font-light leading-relaxed max-w-3xl mx-auto">
                Specialized in <span className="text-foreground font-medium">{typewriterText}</span>
                <span className="text-primary animate-pulse ml-1">|</span>
                <span className="block mt-2">
                  Crafting elegant digital solutions at the intersection of engineering and design.
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA and Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-8 pb-6 sm:pb-8"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to="/projects">
              <Button 
                aria-label="View my work" 
                size="lg" 
                className="rounded-none px-10 py-7 text-xs uppercase tracking-[0.2em] bg-foreground text-background hover:bg-primary transition-all duration-300 font-mono flex items-center gap-3 group" 
              >
                <span>View My Work</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
          
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ y: -6, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 border-foreground/20 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 backdrop-blur-sm"
                aria-label={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.isBrand ? (
                  <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                ) : (
                  <social.icon className="w-5 h-5" />
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ opacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40 font-light">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-8 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
