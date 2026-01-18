import { useEffect } from "react";
import NavigationDock from "@/components/NavigationDock";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DynamicSVG } from "@/components/DynamicSVG";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <main>
        <NavigationDock />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
