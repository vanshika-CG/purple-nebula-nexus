// src/pages/Index.tsx

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <CustomCursor />
      <Navigation />
      <AnimatedSection animation="fadeInUp" threshold={0.15}>
        <Hero />
      </AnimatedSection>
      <AnimatedSection animation="fadeInScale" threshold={0.15}>
        <About />
      </AnimatedSection>
      <AnimatedSection animation="slideInRight" threshold={0.15}>
        <Projects />
      </AnimatedSection>
      <AnimatedSection animation="slideInLeft" threshold={0.15}>
        <Education />
      </AnimatedSection>
      <AnimatedSection animation="fadeInUp" threshold={0.15}>
        <Contact />
      </AnimatedSection>
      <AnimatedSection animation="fadeInUp" threshold={0.1}>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Index;