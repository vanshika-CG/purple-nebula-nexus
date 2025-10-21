// src/pages/Index.tsx

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
// ❌ REMOVE THE useLenis IMPORT
// import { useLenis } from "@/hooks/useLenis"; 

const Index = () => {
  // ❌ REMOVE THE useLenis CALL - Lenis is initialized via the provider
  // useLenis(); 

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;