import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Triivya – E-Commerce Clothing Platform",
      description: "Developed a fully functional paid e-commerce site with secure authentication, product filters, cart, and payment flow. Optimized for responsive design and high performance, improving page load speed by 35%. Delivered the platform to a real client, ensuring scalability and security.",
      tags: ["Next.js", "MongoDB", "Express.js", "Tailwind CSS"],
      gradient: "from-primary to-secondary",
      link: "https://triivya.com",
      demo: "https://triivya.com",
    },
    {
      title: "CodeChisel – Coding Education Platform",
      description: "Built an interactive coding platform with real-time code execution and student progress tracking. Designed a clean, responsive UI for an engaging learning experience.",
      tags: ["React.js", "Tailwind CSS", "Node.js"],
      gradient: "from-secondary to-accent",
      link: "https://codin-learning.netlify.app",
      demo: "https://codin-learning.netlify.app",
    },
    {
      title: "Ideolyze – Idea Refinement Tool",
      description: "Created a platform to help users visualize and refine startup ideas with a user-friendly interface. Focused on clean UI/UX for better usability.",
      tags: ["React.js", "Frontend"],
      gradient: "from-accent to-lavender",
      link: "https://ideolyze.netlify.app",
      demo: "https://ideolyze.netlify.app",
    },
    {
      title: "Multi-Category Content Website",
      description: "Developed a modular blog-style site covering recipes, cocktails, and general topics. Integrated external APIs for dynamic content fetching.",
      tags: ["React.js", "API Integration"],
      gradient: "from-primary to-accent",
      link: "https://multi-category.netlify.app",
      demo: "https://multi-category.netlify.app",
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="absolute inset-0 gradient-nebula opacity-10 animate-gradient"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of cosmic creations showcasing modern web development techniques
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-effect border-accent/20 overflow-hidden group hover:glow-effect transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-accent/10 border border-accent/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-accent/50 hover:bg-accent/10"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-accent/50 hover:bg-accent/10"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
