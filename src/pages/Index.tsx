import { useEffect } from "react";
import NavigationDock from "@/components/NavigationDock";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <main>
        <NavigationDock />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
