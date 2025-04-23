import { useState, useEffect } from "react";
import { FileDown, ExternalLink, File, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const position = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (position >= top && position <= top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Variants for animated elements
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      pointerEvents: "none",
    },
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      }
    },
  };
  
  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }
    })
  };
  
  const backdropVariants = {
    closed: { opacity: 0, pointerEvents: "none" },
    open: { opacity: 1, pointerEvents: "auto" }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 font-bold text-lg transition-all duration-300 hover:opacity-80 z-10"
        >
          <Logo/>
          <span className="font-audiowide">abhi codes</span>
        </a>

        {/* Enhanced Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-full px-1 py-1 shadow-sm">
            <ul className="flex gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                        isActive 
                          ? "text-foreground bg-primary/10" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Resume Button */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      >
                        <File className={`h-4 w-4 ${downloading ? "animate-bounce text-primary" : ""}`} />
                        <span>Resume</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 backdrop-blur-md bg-background/90">
                      <DropdownMenuItem>
                        <a 
                          href="/Abhishek Resume.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 cursor-pointer w-full"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>View Online</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <a 
                          href="/Abhishek Resume.pdf" 
                          download="Abhishek_Resume.pdf"
                          className="flex items-center gap-2 cursor-pointer w-full"
                          onClick={handleDownload}
                        >
                          <FileDown className="h-4 w-4" />
                          <span>Download PDF</span>
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-background/80 backdrop-blur-sm">
                <p>View or download my resume</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Resume Button */}
          <a
            href="/Abhishek Resume.pdf" 
            download="Abhishek_Resume.pdf"
            onClick={handleDownload}
            className="inline-flex items-center justify-center rounded-md w-8 h-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <File className={`h-4 w-4 ${downloading ? "animate-bounce text-primary" : ""}`} />
            <span className="sr-only">Download Resume</span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            className="z-50"
            size="icon"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu panel */}
            <motion.div
              className="fixed top-[72px] right-4 left-4 bg-card shadow-lg border rounded-xl overflow-hidden z-40 max-h-[calc(100vh-88px)]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="overflow-y-auto max-h-[calc(100vh-88px)]">
                <nav className="py-4">
                  <ul className="space-y-1">
                    {navLinks.map((link, i) => (
                      <motion.li 
                        key={link.name}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <a
                          href={link.href}
                          className="flex items-center justify-between px-6 py-3 hover:bg-primary/5 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="font-medium">{link.name}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="border-t my-4" />
                  
                  {/* Resume options */}
                  <div className="px-6 py-3 space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Resume</h3>
                    <a 
                      href="/Abhishek Resume.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span>View Online</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                    
                    <a 
                      href="/Abhishek Resume.pdf" 
                      download="Abhishek_Resume.pdf"
                      className="flex items-center justify-between py-2 hover:text-primary transition-colors"
                      onClick={() => {
                        handleDownload();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <FileDown className="h-4 w-4 mr-2" />
                        <span>Download PDF</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
