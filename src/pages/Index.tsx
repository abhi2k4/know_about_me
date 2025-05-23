import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DynamicSVG } from "@/components/DynamicSVG";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

const Index = () => {
  // Handle scroll animations for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.parallax');
      scrollElements.forEach((element) => {
        const scrollY = window.scrollY;
        const speed = parseFloat(element.getAttribute('data-speed') || '0.1');
        // Fix the TypeScript error by using HTMLElement type
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${scrollY * speed}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col relative">
        {/* Dynamic floating SVGs positioned across the entire page */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <DynamicSVG 
          icon="database" 
          className="absolute top-[10%] right-[5%] text-blue-500 opacity-50 animate-float"
          size={24}
        />
       
        <DynamicSVG 
          icon="terminal" 
          className="absolute top-[75%] right-[12%] text-emerald-500 opacity-40 animate-float"
          size={22}
          style={{ animationDelay: "1.3s" }}
        />
        <DynamicSVG 
          icon="github" 
          className="absolute top-[25%] right-[20%] text-gray-600 dark:text-gray-400 opacity-30 animate-float"
          size={18}
          style={{ animationDelay: "2s" }}
        />
        <DynamicSVG 
          icon="code" 
          className="absolute bottom-[15%] left-[15%] text-cyan-500 opacity-40 animate-float"
          size={26}
          style={{ animationDelay: "1.5s" }}
        />
        <DynamicSVG 
          icon="web" 
          className="absolute bottom-[30%] left-[30%] text-indigo-500 opacity-30 animate-float"
          size={18}
          style={{ animationDelay: "0.5s" }}
          />
           <DynamicSVG 
          icon="cpu" 
          className="absolute top-[40%] left-[8%] text-purple-500 opacity-40 animate-float"
          size={20}
          style={{ animationDelay: "0.7s" }}
        />
        </div>
        
        <Header />
        <main>
          <Hero />
          <About />
          <Experience /> 
          <Education /> 
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
