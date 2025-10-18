import { Code2, Palette, Zap } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, semantic HTML and modern JavaScript",
    },
    {
      icon: Palette,
      title: "Visual Design",
      description: "Crafting beautiful interfaces with CSS and modern frameworks",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Building fast, responsive applications with React and optimization",
    },
  ];

  const technologies = {
    "Languages & Frontend": ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Next.js"],
    "Backend & Databases": ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    "Cloud & DevOps": ["Microsoft Azure (Certified)", "Netlify", "Git"]
  };

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 gradient-nebula-radial opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Profile <span className="gradient-text">Core</span>
          </h2>
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Enthusiastic and detail-oriented Computer Science student with hands-on experience in 
              <span className="text-accent font-medium"> full-stack web development</span>. 
              Proficient in <span className="text-primary font-medium">React.js</span>, 
              <span className="text-secondary font-medium"> Node.js</span>, and 
              <span className="text-accent font-medium"> MongoDB</span>, with strong problem-solving skills and clean code practices. 
              Delivered real-world projects, including a <span className="gradient-text font-medium">paid e-commerce platform</span>, 
              focusing on performance, security, and user experience. Passionate about building scalable, 
              user-friendly applications and contributing to innovative development teams.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 hover:glow-effect transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl gradient-nebula flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <skill.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-heading font-semibold mb-8 text-center">
            Tech <span className="gradient-text">Constellation</span>
          </h3>
          <div className="space-y-6">
            {Object.entries(technologies).map(([category, techs], catIndex) => (
              <div key={catIndex}>
                <h4 className="text-lg font-heading font-semibold mb-3 text-accent">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {techs.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium hover:bg-accent/20 hover:scale-105 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
