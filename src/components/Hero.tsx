
import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <span 
          className="inline-block px-4 py-1.5 mb-8 text-sm font-medium bg-accent rounded-full animate-fade-in-down"
        >
          Full Stack Developer
        </span>
        
        <h1 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Building <span className="text-blue-500 dark:text-blue-400">digital experiences</span> with code and creativity
        </h1>
        
        <p 
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 transition-all duration-700 delay-100 ${
            isSubtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          I'm a passionate full stack developer creating elegant solutions to complex problems. Combining technical expertise with creative thinking.
        </p>
        
        <div 
          ref={buttonsRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-200 ${
            isButtonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button size="lg" className="rounded-full">
            View Projects
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Contact Me
          </Button>
        </div>
        
        <div className="flex gap-6 mt-8 animate-fade-in">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a 
            href="mailto:email@example.com" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-all duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-sm font-medium mb-2">Scroll Down</span>
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
};

export default Hero;
