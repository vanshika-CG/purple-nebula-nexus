import { Code2, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Orb from "../Orb"; // Adjust path if Orb.tsx is in a different directory
import meImage from "../../public/me.jpg"; // Adjust path if me.png is in a different directory

const About = () => {
  const techDescriptions = {
    "HTML5": "Modern web structure and semantics",
    "CSS3": "Advanced styling and animations",
    "JavaScript": "Dynamic client-side scripting",
    "React.js": "Component-based UI framework",
    "Tailwind CSS": "Utility-first CSS framework",
    "Next.js": "React framework for SSR and SSG",
    "Node.js": "Server-side JavaScript runtime",
    "Express.js": "Web framework for Node.js",
    "MongoDB": "NoSQL document database",
    "REST APIs": "Standardized API architecture",
    "Microsoft Azure (Certified)": "Cloud computing platform",
    "Netlify": "Modern web deployment platform",
    "Git": "Version control system"
  };

  const allTechs = {
    "Languages & Frontend": ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Next.js"],
    "Backend & Databases": ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    "Cloud & DevOps": ["Microsoft Azure (Certified)", "Netlify", "Git"]
  };

  const categoryIcons = {
    "Languages & Frontend": <Code2 className="w-6 h-6 text-accent" />,
    "Backend & Databases": <Zap className="w-6 h-6 text-accent" />,
    "Cloud & DevOps": <Palette className="w-6 h-6 text-accent" />
  };

  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-nebula-radial opacity-20"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Split Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left - Image Card */}
          <div className="relative">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
            <div className="relative glass-effect rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent"></div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-background">
                <img 
                  src={meImage} 
                  alt="Vanshika Jangam portrait"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
                
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-foreground">
                VANSHIKA JANGAM
              </h1>
              <p className="text-2xl text-accent font-medium mb-6">UI/UX DESIGNER</p>
              <p className="text-muted-foreground leading-relaxed">
                Enthusiastic and detail-oriented Computer Science student with hands-on experience in 
                <span className="text-accent font-medium"> full-stack web development</span>. 
                Proficient in <span className="text-accent font-medium">React.js</span>, 
                <span className="text-accent font-medium"> Node.js</span>, and 
                <span className="text-accent font-medium"> MongoDB</span>, with strong problem-solving skills and clean code practices. 
                Delivered real-world projects, including a <span className="text-accent font-medium">paid e-commerce platform</span>, 
                focusing on performance, security, and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Tech Stack with Orb Background */}
        <motion.div 
          className="glass-effect rounded-2xl p-8 md:p-12 border border-border/20 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Orb Background */}
          <div className="absolute inset-0 z-0">
            <Orb 
              hue={276} // Matches --primary from index.css
              hoverIntensity={0.3}
              rotateOnHover={true}
              forceHoverState={false}
              className="w-full h-full opacity-30"
            />
          </div>
          
          {/* Tech Stack Content */}
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-semibold mb-10 text-center text-foreground">
              Tech <span className="gradient-text">Constellation</span>
            </h3>
            <div className="space-y-8">
              {Object.entries(allTechs).map(([category, techs], catIndex) => (
                <motion.div 
                  key={catIndex} 
                  className="relative"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {categoryIcons[category]}
                    <h4 className="text-xl font-heading font-semibold text-accent">
                      {category}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {techs.map((tech, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseLeave={() => setHoveredTech(null)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span
                          className="flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-accent-foreground hover:bg-accent/20 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
                          role="button"
                          aria-label={`Learn more about ${tech}`}
                        >
                          {tech}
                        </span>
                        {hoveredTech === tech && (
                          <div className="absolute z-10 -top-10 left-1/2 -translate-x-1/2 bg-card/90 text-foreground text-xs rounded-lg py-2 px-3 shadow-lg min-w-max">
                            {techDescriptions[tech]}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;