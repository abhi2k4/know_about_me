import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useGoToSection } from "@/hooks/useGoToSection";
import { useProjects } from "@/hooks/useProjects";
import { useExperiences } from "@/hooks/useExperiences";

const Index = () => {
  const { hash } = useLocation();
  const goToSection = useGoToSection();
  // Same cached queries the sections use; their content shifts layout once loaded.
  const { isLoading: projectsLoading } = useProjects();
  const { isLoading: experiencesLoading } = useExperiences();
  const layoutReady = !projectsLoading && !experiencesLoading;

  // Deep links like /#contact arrive from other pages; scroll once async sections have rendered.
  useEffect(() => {
    if (!hash || !layoutReady) return;
    const id = setTimeout(() => goToSection(hash.slice(1)), 150);
    return () => clearTimeout(id);
  }, [hash, layoutReady, goToSection]);

  return (
    <div className="relative flex min-h-screen flex-col bg-[#040404]">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <TechStack />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
