import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, TwitterIcon, Code, Server, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DynamicSVG } from "@/components/DynamicSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter} from "@fortawesome/free-brands-svg-icons";

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      ref={heroRef}
    >
      {/* Decorative background elements with dynamic SVGs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
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
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 [perspective:1000px] group">
            <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front side - Avatar */}
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <Avatar className="w-full h-full border-4 border-primary/10 shadow-xl">
                  <AvatarImage src="/profile.svg" alt="Developer Avatar" className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    AC
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Back side - Logo */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="w-full h-full rounded-full border-4 shadow-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <img 
                    src="/abhicodes.png" 
                    alt="Logo" 
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Keep your existing floating tech icons */}
            <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow">
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
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 transition-all duration-700 ${
              isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-shift">Abhishek</span>
          </h1>
          
          <h2 className={`text-xl md:text-3xl font-semibold mb-6 transition-all duration-700 delay-100 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="border-r-2 border-primary pr-2 mr-2">Developer</span>
            <span className="border-r-2 border-primary pr-2 mr-2">Designer</span>
            <span>Problem Solver</span>
          </h2>
          
          <p 
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className={`text-lg md:text-xl text-muted-foreground mb-8 transition-all duration-700 delay-100 ${
            isSubtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          I craft modern web applications and actively collaborate on diverse projects. 
          With expertise in React, Node.js, and cloud technologies, I focus on building 
          efficient solutions and contributing to open-source communities.
        </p>
          
          <div 
            ref={buttonsRef as React.RefObject<HTMLDivElement>}
            className={`flex sm:flex-row gap-4 mb-8 transition-all duration-700 delay-200 ${
              isButtonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button size="lg" className="rounded-full" onClick={() => window.location.href = "#projects"}>
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" onClick={() => window.location.href = "#contact"}>
              Contact Me
            </Button>
          </div>
          
          <div className="flex gap-6 mb-4 mt-4 animate-fade-in">
            <a 
              href="https://github.com/abhi2k4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/thormotheabhishek" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://x.com/your-handle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform"
              aria-label="X (Twitter)"
            >
              <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
            </a>
            <a 
              href="mailto:thormothe.abhishek@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
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
