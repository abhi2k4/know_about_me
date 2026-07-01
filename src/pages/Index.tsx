import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
