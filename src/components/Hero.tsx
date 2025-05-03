import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, TwitterIcon, Code, Server, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DynamicSVG } from "@/components/DynamicSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter} from "@fortawesome/free-brands-svg-icons";

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
    { href: "https://x.com/your-handle", icon: faXTwitter, label: "X (Twitter)", isLucideIcon: false },
    { href: "mailto:thormothe.abhishek@gmail.com", icon: Mail, label: "Email", isLucideIcon: true }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      ref={heroRef}
    >
     {/* Decorative background elements with dynamic SVGs */}
      <div className="absolute inset-0 overflow-hidden -z-10 hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
        
        <DynamicSVG 
          icon="frontend" 
          className="absolute top-[15%] right-[15%] text-blue-500 opacity-70 animate-float"
          size={32}
        />
        <DynamicSVG 
          icon="laptop" 
          className="absolute top-[30%] left-[10%] text-emerald-500 opacity-70 animate-float"
          size={28}
          style={{ animationDelay: "1.5s" }}
        />
        <DynamicSVG 
          icon="sparkle" 
          className="absolute bottom-[20%] right-[10%] text-purple-500 opacity-70 animate-float"
          size={24}
          style={{ animationDelay: "2s" }}
        />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      </div>

      <div className="container mx-auto lg:gap-8 px-6  py-12 flex flex-col lg:flex-row items-center justify-center text-center">
        {/* Bitmoji-like avatar with animated elements */}
        <div className="relative animate-float lg:mb-0">
          {/* Status Badge - Moved above the image */}
          

          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front side - Avatar */}
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <div className="relative">
                  {/* Enhanced Status Badge */}
                 

                  <Avatar className="w-full h-full border-4 border-primary/10 shadow-xl transition-transform duration-300 group-hover:scale-105 select-none">
                    <AvatarImage 
                      src="/profile.svg" 
                      alt="Developer Avatar" 
                      className="object-cover select-none pointer-events-none"
                      draggable="false"
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
        </div>

        {/* Text content - centered */}
        <div className="flex flex-col items-center text-center max-w-2xl">
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 transition-all duration-700 font-audiowide ${
              isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-shift">
                Abhishek
              </span>
              <span className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse-slow"></span>
            </span>
          </h1>
          
          <h2 className={`text-xl md:text-3xl font-semibold mb-6 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="relative inline-block group">
              <span className="border-r-2 border-primary pr-2 mr-2 hover:text-primary transition-colors">Developer</span>
              <span className="absolute -inset-1 bg-primary/10 scale-0 group-hover:scale-100 rounded transition-transform"></span>
            </span>
            <span className="relative inline-block group">
              <span className="border-r-2 border-primary pr-2 mr-2 hover:text-primary transition-colors">Designer</span>
              <span className="absolute -inset-1 bg-primary/10 scale-0 group-hover:scale-100 rounded transition-transform"></span>
            </span>
            <span className="relative inline-block group">
              <span className="hover:text-primary transition-colors">Problem Solver</span>
              <span className="absolute -inset-1 bg-primary/10 scale-0 group-hover:scale-100 rounded transition-transform"></span>
            </span>
          </h2>
          
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
          
          <div className="flex gap-6 mb-4 mt-4 animate-fade-in">
            {socialLinks.map((social, index) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label={social.label}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="block text-muted-foreground group-hover:text-foreground transition-colors transform group-hover:scale-110 duration-300">
                  {social.isLucideIcon ? (
                    <social.icon className="h-6 w-6" />
                  ) : (
                    <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                  )}
                </span>
                <span className="absolute -inset-2 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-all duration-300"
        aria-label="Scroll down"
      >
        <span className="text-sm font-medium mb-2 mt-25">Scroll Down</span>
        <ArrowDown className="h-5 w-5  animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
