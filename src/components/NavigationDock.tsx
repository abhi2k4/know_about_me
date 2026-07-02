import { useState, useEffect } from "react";
import { FileDown, ExternalLink, FileText, LayoutGrid, IdCard, Building2, GraduationCap, Blocks, AtSign, ChevronDown, Waypoints } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dock } from "@/components/ui/dock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NavigationDock = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [downloading, setDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      
      // Show on top hover for desktop
      const threshold = 80;
      if (e.clientY < threshold) {
        setIsVisible(true);
      } else if (e.clientY > 200) {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      if (pathname !== "/") return;

      const sections = navLinks.filter(l => l.isSection).map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active if the section overlaps the trigger threshold line (250px from top of viewport)
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, pathname]);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  const navLinks = [
    { name: "Home", href: "#home", icon: LayoutGrid, isSection: true },
    { name: "About", href: "#about", icon: IdCard, isSection: true },
    { name: "Experience", href: "#experience", icon: Building2, isSection: true },
    { name: "Projects", href: "#projects", icon: Blocks, isSection: true },
    { name: "Journey", href: "/journey", icon: Waypoints, isSection: false },
    { name: "Contact", href: "#contact", icon: AtSign, isSection: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isSection: boolean) => {
    e.preventDefault();
    
    if (isSection) {
      const sectionName = href.substring(1); // removes '#'
      
      if (pathname !== "/") {
        navigate("/");
        // wait for page to mount
        setTimeout(() => {
          if (sectionName === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            document.getElementById(sectionName)?.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        if (sectionName === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document.getElementById(sectionName)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const getIsActive = (link: { href: string; isSection: boolean }) => {
    if (link.isSection) {
      return pathname === "/" && activeSection === link.href.substring(1);
    }
    return pathname === link.href;
  };

  // Desktop: Top navbar that hides/shows on hover
  if (!isMobile) {
    return (
      <>
        {/* Hover Hint Area - Large hover zone at top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-auto"
          onMouseEnter={() => setIsVisible(true)}
          style={{ pointerEvents: isVisible ? 'none' : 'auto' }}
        />

        {/* Hint Text - Shows when dock is hidden */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-muted-foreground/60 font-medium flex flex-col items-center gap-2"
          >
            {/* <span>Hover to navigate</span> */}
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Desktop Top Dock (Auto-hide) */}
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : -100,
            scale: isVisible ? 1 : 0.95
          }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none"
          style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
          <motion.div
            animate={{ y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <TooltipProvider delayDuration={200}>
              <Dock orientation="top" className="gap-1 px-4 py-3 shadow-lg shadow-primary/10">
                {/* Logo/Home */}
                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="/#home" 
                        onClick={(e) => handleNavClick(e, "#home", true)}
                        className={`inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors ${
                          getIsActive(navLinks[0])
                            ? "bg-primary/20 text-primary"
                            : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <LayoutGrid className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-background/90 backdrop-blur-sm border border-primary/20">
                      Home
                    </TooltipContent>
                  </Tooltip>
                </motion.div>

                {/* Navigation Items */}
                {navLinks.slice(1, -1).map((link, index) => {
                  const Icon = link.icon;
                  const isActive = getIsActive(link);
                  return (
                    <motion.div 
                      key={link.name}
                      whileHover={{ scale: 1.15 }} 
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={link.isSection ? `/${link.href}` : link.href}
                            onClick={(e) => handleNavClick(e, link.href, link.isSection)}
                            className={`inline-flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-primary/20 text-primary"
                                : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-background/90 backdrop-blur-sm border border-primary/20">
                          {link.name}
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                })}

                {/* Separator */}
                <div className="h-6 w-px bg-primary/20 mx-1" />

                {/* Contact */}
                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="/#contact" 
                        onClick={(e) => handleNavClick(e, "#contact", true)}
                        className={`inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors ${
                          getIsActive(navLinks[navLinks.length - 1])
                            ? "bg-primary/20 text-primary"
                            : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <AtSign className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-background/90 backdrop-blur-sm border border-primary/20">
                      Contact
                    </TooltipContent>
                  </Tooltip>
                </motion.div>

                {/* Resume Dropdown */}
                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground">
                            <FileText className={`w-5 h-5 ${downloading ? "animate-bounce" : ""}`} />
                          </button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-background/90 backdrop-blur-sm border border-primary/20">
                        Resume
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="center" className="w-48 backdrop-blur-md bg-background/90">
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
                </motion.div>
              </Dock>
            </TooltipProvider>
          </motion.div>
        </motion.div>
      </>
    );
  }

  // Mobile: Bottom fixed dock
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <TooltipProvider delayDuration={200}>
        <Dock orientation="bottom" className="gap-0.5 px-3 py-2 shadow-lg shadow-primary/10">
          {/* Mobile Navigation - Compact */}
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = getIsActive(link);
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.isSection ? `/${link.href}` : link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.isSection)}
                      className={`inline-flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background/90 backdrop-blur-sm border border-primary/20">
                    {link.name}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}

          {/* Separator */}
          <div className="h-6 w-px bg-primary/20 mx-0.5" />

          {/* Mobile Resume Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.08 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center justify-center h-9 w-9 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground">
                      <FileText className={`w-4 h-4 ${downloading ? "animate-bounce" : ""}`} />
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background/90 backdrop-blur-sm border border-primary/20">
                  Resume
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="center" className="w-48 backdrop-blur-md bg-background/90">
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
            </motion.div>
        </Dock>
      </TooltipProvider>
    </motion.div>
  );
};

export default NavigationDock;
