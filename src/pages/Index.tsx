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
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col relative">
        <main>
          <Header />
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
