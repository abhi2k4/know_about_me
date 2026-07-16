import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveResume } from "@/hooks/useResumes";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { activeResume } = useActiveResume();
  // const resumeUrl = "/resume" || "/Abhishek Resume.pdf";

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);

      // Scroll spy for active section highlight
      const sections = ["home", "about", "services", "experience", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            const sectionNameMap: { [key: string]: string } = {
              home: "Home",
              about: "About",
              services: "Services",
              experience: "Journey",
              projects: "Projects",
              contact: "Contact",
            };
            setActiveSection(sectionNameMap[section]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const goToSection = (sectionName: string) => {
    setActiveSection(sectionName);
    if (sectionName === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
      return;
    }

    const sectionMap: { [key: string]: string } = {
      "About": "about",
      "Services": "services",
      "Journey": "experience",
      "Projects": "projects",
      "Contact": "contact",
    };

    const targetId = sectionMap[sectionName] || sectionName.toLowerCase();
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "About" },
    { name: "Services" },
    { name: "Journey" },
    { name: "Projects" },
  ];

  return (
    <>
      {/* Floating Pill Header */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out w-fit ${
          showHeader ? "top-6 sm:top-8" : "-top-32"
        }`}
      >
        <div 
          className={`flex items-center gap-6 sm:gap-12 rounded-full transition-all duration-500 shadow-2xl p-2 pl-5 sm:pl-8 ${
            isScrolled 
              ? "bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-black/50" 
              : "bg-[#040404]/40 backdrop-blur-md border border-white/5 shadow-none"
          }`}
        >
          {/* Logo / Brand */}
          <div 
            onClick={() => goToSection("Home")}
            className="flex items-center gap-3 font-bold cursor-pointer group"
          >
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center text-black text-xs font-black group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="text-white/90 text-base tracking-tight group-hover:text-white transition-colors whitespace-nowrap">
              Abhishek <span className="hidden sm:inline">Thormothe</span>
            </span>
          </div>

          {/* Desktop Nav Links (Nested Pill) */}
          <div className="hidden md:flex items-center gap-1.5 p-1.5 bg-white/[0.03] rounded-full border border-white/5 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => goToSection(link.name)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right side CTA & Mobile trigger */}
          <div className="flex items-center gap-3 pr-1">
            {/* Resume Link (Desktop) */}
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 pointer-events-auto"
              title="View Resume"
            >
              <FileText className="w-4.5 h-4.5" />
            </a>

            <motion.button
              onClick={() => goToSection("Contact")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hidden sm:inline-flex items-center justify-center gap-1 w-28 h-10 rounded-full bg-[#f0eadd] text-black text-sm font-semibold shadow-inner relative overflow-hidden"
              animate={{
                backgroundColor: isHovered ? "#ffffff" : "#f0eadd",
                scale: isHovered ? 1.05 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                animate={{
                  x: isHovered ? -3 : 8 // Centers the combined block vs centering just the text
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <span className="relative z-10">Say Hi</span>
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0,
                    width: isHovered ? 20 : 0,
                    marginLeft: isHovered ? 6 : 0
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block overflow-hidden"
                >
                  <motion.span
                    className="inline-block origin-[70%_70%]"
                    animate={isHovered ? {
                      rotate: [0, 14, -8, 14, -4, 10, 0],
                    } : { rotate: 0 }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut",
                      repeat: isHovered ? Infinity : 0,
                      repeatDelay: 0.2,
                    }}
                  >
                    👋
                  </motion.span>
                </motion.span>
              </motion.div>
            </motion.button>

            {/* Mobile menu trigger */}
            <button
              className="md:hidden text-white/70 hover:text-white p-2.5 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#040404]/95 backdrop-blur-xl pt-32 px-8 md:hidden flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-white/70">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => goToSection(link.name)}
                  className="text-left py-3 hover:text-white transition-colors border-b border-white/5 flex items-center justify-between"
                >
                  {link.name}
                  <ArrowUpRight className="w-5 h-5 opacity-45" />
                </button>
              ))}
              <a 
                href="/resume" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-left py-3 text-white/70 hover:text-white transition-colors border-b border-white/5 flex items-center justify-between"
              >
                <span>Resume</span>
                <FileText className="w-5 h-5 opacity-45" />
              </a>
              <button
                onClick={() => goToSection("Contact")}
                className="text-left py-3 text-[#f0eadd] hover:text-white transition-colors border-b border-white/5 flex items-center justify-between"
              >
                Say Hi
                <ArrowUpRight className="w-5 h-5 opacity-45" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
