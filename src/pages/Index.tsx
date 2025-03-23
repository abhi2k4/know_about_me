
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
