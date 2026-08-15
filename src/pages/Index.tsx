import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <Header />
      <main>
        {/* 1. Hero (Who I am + What I build + Socials) */}
        <Hero />

        {/* 2. About (My story + Stats) */}
        <About />

        {/* 3. FEATURED PROJECTS (OverSightAI, Project 2, Project 3) */}
        <Projects />

        {/* 4. EXPERIENCE */}
        <Experience />

        {/* 5. TECH STACK */}
        <TechStack />

        {/* 6. ACHIEVEMENTS / Services (Worthwhile) */}
        <Services />

        {/* 7. CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
