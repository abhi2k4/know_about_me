import { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, TwitterIcon, Code, Server, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DynamicSVG } from "@/components/DynamicSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter} from "@fortawesome/free-brands-svg-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { BackgroundEffect } from "./BackgroundEffect";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

// First, add proper typing for the social icons
type SocialLink = {
  href: string;
  icon: any; // we'll type this more specifically
  label: string;
  isLucideIcon?: boolean;
};

const Hero = () => {
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { ref: subtitleRef, isVisible: isSubtitleVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { ref: buttonsRef, isVisible: isButtonsVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollValue = window.scrollY;
      heroRef.current.style.setProperty('--parallax-y', `${scrollValue * 0.3}px`);
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Update the social icons array with proper typing
  const socialLinks: SocialLink[] = [
    { href: "https://github.com/abhi2k4", icon: Github, label: "GitHub", isLucideIcon: true },
    { href: "https://linkedin.com/in/thormotheabhishek", icon: Linkedin, label: "LinkedIn", isLucideIcon: true },
    { href: "https://x.com/amt_official04", icon: faXTwitter, label: "X (Twitter)", isLucideIcon: false },
    { href: "mailto:thormothe.abhishek@gmail.com", icon: Mail, label: "Email", isLucideIcon: true }
  ];

  // Enhanced typewriter configuration
  const [typewriterText] = useTypewriter({
    words: [
      'Full Stack Developer',
      'UI/UX Designer',
      'Problem Solver',
      'Open Source Contributor'
    ],
    loop: true,
    delaySpeed: 2000,
    deleteSpeed: 50,
    typeSpeed: 100,
  });

  // Add this near your motion.h2 component
  const roleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      ref={heroRef}
    >
      <BackgroundEffect />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-orbit-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-orbit-slow-reverse"></div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-center text-center relative z-10">
        {/* Enhanced Avatar Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative animate-float lg:mb-0"
        >
          {/* Status Badge - Moved above the image */}
          

          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front side - Avatar */}
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <div className="relative">
                  {/* Enhanced Status Badge */}
                 

                  <Avatar className="w-full h-full border-4 border-primary/10 shadow-xl transition-transform duration-300 group-hover:scale-105 select-none">
                    {isImageLoading && (
                      <Skeleton className="w-full h-full rounded-full animate-pulse" />
                    )}
                    <AvatarImage 
                      src="/profile.svg" 
                      alt="Developer Avatar" 
                      className="object-cover select-none pointer-events-none"
                      draggable="false"
                      onLoadingStatusChange={(status) => {
                        setIsImageLoading(status === 'loading');
                      }}
                    />
                  </Avatar>
                </div>
              </div>
              
              {/* Back side - Logo */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="w-full h-full rounded-full border-4 shadow-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <img 
                    src="/abhicodes.png" 
                    alt="Logo" 
                    className="object-cover rounded-full select-none pointer-events-none"
                    draggable="false"
                  />
                </div>
              </div>
            </div>

            {/* Keep your existing floating tech icons */}
                <div className="absolute -top-2 -right-2 z-30 transform-gpu transition-all duration-300 hover:scale-110">
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg animate-pulse-slow"></div>
                      
                      {/* Badge */}
                      <span className="relative inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium 
                        bg-background/95 backdrop-blur-md border border-green-500/30 
                        text-green-500 rounded-full shadow-lg 
                        transition-all duration-300 hover:border-green-500/50
                        hover:bg-green-500/10 group"
                      >
                        {/* Animated Dot */}
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        
                        {/* Text with hover effect */}
                        <span className="relative transition-transform group-hover:translate-x-0.5">
                          Contributing
                        </span>
                        
                        {/* Subtle highlight */}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </span>
                    </div>
                  </div>
            <div className="absolute -top-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow">
              <Code className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-2 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow" style={{ animationDelay: "1s" }}>
              <Server className="h-6 w-6" />
            </div>
            <div className="absolute top-1/2 -right-6 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow" style={{ animationDelay: "2s" }}>
              <Database className="h-6 w-6" />
            </div>
          </div>
          
          <span className="inline-block px-4 py-1.5 mb-6 mt-6 text-sm font-medium bg-accent rounded-full animate-fade-in-down">
            Full Stack Developer
          </span>
        </motion.div>

        {/* Enhanced Text Content */}
        <div className="flex flex-col items-center text-center max-w-2xl lg:ml-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 font-audiowide group"
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x">
                Abhishek
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl animate-pulse-slow"></span>
            </span>
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={roleVariants}
            className="relative text-xl md:text-3xl font-semibold mb-6 group perspective-1000"
          >
            {/* Code bracket with glow effect */}
            <motion.span
              className="text-primary relative inline-block"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <span className="relative z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                &lt;
              </span>
              <span className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.span>

            {/* Typewriter text container */}
            <span className="relative inline-block mx-2 min-w-[200px]">
              <span className="relative z-10 px-4">
                {typewriterText}
                <Cursor cursorStyle="▎" cursorColor="var(--primary)" cursorBlinking />
              </span>
              
              {/* Animated background */}
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  originX: 0,
                  transformStyle: "preserve-3d"
                }}
              />
              
              {/* Highlight effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg transform group-hover:translate-y-0.5" />
            </span>

            {/* Closing bracket with glow effect */}
            <motion.span
              className="text-primary relative inline-block"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.1
              }}
            >
              <span className="relative z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                /&gt;
              </span>
              <span className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.span>
          </motion.h2>
          
          <p 
            ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
            className={`relative text-lg md:text-xl text-muted-foreground mb-8 transition-all duration-700 delay-100 hover:text-foreground px-2 ${
              isSubtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="relative z-10">
              I craft modern web applications and actively collaborate on diverse projects. 
              With expertise in React, Node.js, and cloud technologies, I focus on building 
              efficient solutions and contributing to open-source communities.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
          </p>
          
          <div 
            ref={buttonsRef as React.RefObject<HTMLDivElement>}
            className={`flex sm:flex-row gap-4 mb-8 transition-all duration-700 delay-200 ${
              isButtonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button 
              data-cursor-text="See My Work"
              size="lg" 
              className="rounded-full relative group overflow-hidden"
              onClick={() => window.location.href = "#projects"}
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button 
              data-cursor-text="Get in Touch"
              size="lg" 
              variant="outline" 
              className="rounded-full relative group overflow-hidden"
              onClick={() => window.location.href = "#contact"}
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </div>
          
          {/* Enhanced Social Links */}
          <div className="flex gap-6 mb-4 mt-4 animate-fade-in">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="relative group"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="block text-muted-foreground group-hover:text-foreground transition-colors transform group-hover:scale-110 duration-300">
                  {social.isLucideIcon ? (
                    <social.icon className="h-6 w-6" />
                  ) : (
                    <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                  )}
                </span>
                <span className="absolute -inset-2 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Simple Scroll Indicator */}
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full animate-bounce"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.a>
    </section>
  );
};

export default Hero;
