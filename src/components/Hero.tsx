import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-nebula-radial opacity-50"></div>
      <div className="absolute inset-0 gradient-nebula animate-gradient opacity-30"></div>
      
      {/* Nebula particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full glass-effect text-sm font-medium mb-6">
            Welcome to the Nexus
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 animate-fade-in">
          <span className="gradient-text">Vanshika Jangam</span>
          <br />
          <span className="text-foreground">Frontend Nebula</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in font-light">
          Full-Stack Developer crafting cosmic digital experiences with
          <span className="text-accent font-medium"> React.js</span>,
          <span className="text-secondary font-medium"> Next.js</span>,
          <span className="text-primary font-medium"> Node.js</span>, and
          <span className="gradient-text font-medium"> MongoDB</span>
        </p>

        <div className="glass-effect rounded-2xl px-6 py-4 mb-12 inline-block animate-fade-in">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              📍 Ahmedabad, India
            </span>
            <span className="flex items-center gap-2">
              📧 vanshika.jangamcg@gmail.com
            </span>
            <span className="flex items-center gap-2">
              📱 +91 6359338919
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-accent mt-2">
            <a href="https://linkedin.com/in/vanshika-jangam-0a232332a/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              LinkedIn
            </a>
            <a href="https://triivya.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              Portfolio
            </a>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-16 animate-fade-in">
          <Button
            size="lg"
            className="gradient-nebula hover:opacity-90 transition-opacity glow-effect font-medium"
            onClick={() => scrollToSection('projects')}
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-effect hover:bg-accent/10 border-accent/50"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </Button>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="animate-bounce inline-block p-3 rounded-full glass-effect hover:bg-accent/10 transition-colors"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-6 h-6 text-accent" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
