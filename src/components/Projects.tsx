// projects.tsx (FINAL CLEAN VERSION - NO RING VIEW, NO UNUSED IMPORTS)

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Grid3X3, List, LayoutGrid } from "lucide-react";
import { ThreeDCarousel } from "@/components/ThreeDCarousel";
import { Badge } from "@/components/ui/badge";
import GlareHover from "@/components/GlareHover";

// Project type definition
interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  demo: string;
  image: string;
}

type ProjectViewMode = "CAROUSEL" | "GRID" | "LIST";

// Project Details Card - Used in Grid View
const ProjectDetailsCard: React.FC<{ project: Project }> = ({ project }) => (
  <GlareHover
    width="100%"
    height="auto"
    background="transparent"
    borderRadius="12px"
    borderColor="transparent"
    glareColor="#ffffff"
    glareOpacity={0.2}
    glareSize={200}
    transitionDuration={500}
    className="block"
  >
    <Card className="glass-effect border-accent/20 overflow-hidden transition-all duration-500 hover:glow-effect h-full flex flex-col backdrop-blur-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-heading font-bold mb-2 gradient-text">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              className="text-xs px-2 py-0.5 bg-primary-foreground/10 border border-primary-foreground/30 font-medium text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          <Button
            size="sm"
            className="flex-1 bg-accent hover:bg-accent/80 text-primary-foreground transition-colors"
            onClick={() => window.open(project.demo, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Demo
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-accent/50 hover:bg-accent/20"
            onClick={() => window.open(project.link, "_blank")}
          >
            <Github className="w-4 h-4 mr-2" />
            Code
          </Button>
        </div>
      </div>
    </Card>
  </GlareHover>
);

// Project List Item - Used in List View
const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => (
  <GlareHover
    width="100%"
    height="auto"
    background="transparent"
    borderRadius="12px"
    borderColor="transparent"
    glareColor="#ffffff"
    glareOpacity={0.2}
    glareSize={200}
    transitionDuration={500}
    className="block"
  >
    <Card className="glass-effect border-accent/20 p-4 flex flex-col sm:flex-row gap-4 items-center transition-all duration-300 hover:border-accent/50 hover:shadow-xl bg-background/50 backdrop-blur-md">
      <div className="w-full sm:w-40 h-24 overflow-hidden rounded-lg flex-shrink-0 border border-accent/30">
        <img
          src={project.image}
          alt={`${project.title} thumbnail`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="sm:w-3/5 w-full">
        <h3 className="text-xl font-heading font-bold mb-1">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-text hover:underline"
          >
            {project.title}
          </a>
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <Badge key={tagIndex} className="text-xs bg-accent/20 border border-accent/50 text-accent-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="sm:w-1/5 w-full flex flex-row sm:flex-col gap-2 justify-end sm:items-end">
        <Button
          size="sm"
          className="w-1/2 sm:w-auto bg-primary hover:bg-primary/80"
          onClick={() => window.open(project.demo, "_blank")}
        >
          <ExternalLink className="w-3 h-3 mr-1 sm:mr-2" />
          Demo
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-1/2 sm:w-auto border-muted-foreground/50 hover:bg-muted-foreground/10"
          onClick={() => window.open(project.link, "_blank")}
        >
          <Github className="w-3 h-3 mr-1 sm:mr-2" />
          Code
        </Button>
      </div>
    </Card>
  </GlareHover>
);

// Grid View
const ProjectGridView: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      <ProjectDetailsCard key={index} project={project} />
    ))}
  </div>
);

// List View
const ProjectListView: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="flex flex-col gap-4">
    {projects.map((project, index) => (
      <ProjectListItem key={index} project={project} />
    ))}
  </div>
);

// View Selector (Only Carousel, Grid, List)
const ProjectViewSelector: React.FC<{
  currentMode: ProjectViewMode;
  setMode: (mode: ProjectViewMode) => void;
}> = ({ currentMode, setMode }) => (
  <div className="flex justify-center gap-2 p-2 rounded-full bg-accent/10 border border-accent/30 mb-12 max-w-fit mx-auto shadow-xl">
    <Button
      variant={currentMode === "CAROUSEL" ? "default" : "ghost"}
      onClick={() => setMode("CAROUSEL")}
      className={currentMode === "CAROUSEL" ? "bg-accent hover:bg-accent/80 text-background" : "text-muted-foreground hover:bg-accent/20"}
      size="sm"
      title="3D Carousel View"
    >
      <LayoutGrid className="w-4 h-4" />
      <span className="ml-2 hidden sm:inline">3D</span>
    </Button>
    <Button
      variant={currentMode === "GRID" ? "default" : "ghost"}
      onClick={() => setMode("GRID")}
      className={currentMode === "GRID" ? "bg-accent hover:bg-accent/80 text-background" : "text-muted-foreground hover:bg-accent/20"}
      size="sm"
      title="Grid View"
    >
      <Grid3X3 className="w-4 h-4" />
      <span className="ml-2 hidden sm:inline">Grid</span>
    </Button>
    <Button
      variant={currentMode === "LIST" ? "default" : "ghost"}
      onClick={() => setMode("LIST")}
      className={currentMode === "LIST" ? "bg-accent hover:bg-accent/80 text-background" : "text-muted-foreground hover:bg-accent/20"}
      size="sm"
      title="List View"
    >
      <List className="w-4 h-4" />
      <span className="ml-2 hidden sm:inline">List</span>
    </Button>
  </div>
);

// Project Data
const allProjects: Project[] = [
  {
    title: "Triivya – E-Commerce Clothing Platform",
    description: "Developed a fully functional paid e-commerce site with secure authentication, product filters, cart, and payment flow. Optimized for responsive design and high performance, improving page load speed by 35%. Delivered the platform to a real client, ensuring scalability and security.",
    tags: ["Next.js", "MongoDB", "Express.js", "Tailwind CSS"],
    gradient: "from-primary to-secondary",
    link: "https://github.com/your-repo-triivya",
    demo: "https://triivya.com",
    image: "/triivya.png",
  },
  {
    title: "CodeChisel – Coding Education Platform",
    description: "Built an interactive coding platform with real-time code execution and student progress tracking. Designed a clean, responsive UI for an engaging learning experience.",
    tags: ["React.js", "Tailwind CSS", "Node.js"],
    gradient: "from-secondary to-accent",
    link: "https://github.com/your-repo-codechisel",
    demo: "https://codin-learning.netlify.app",
    image: "/codechisel.png",
  },
  {
    title: "Ideolyze – Idea Refinement Tool",
    description: "Created a platform to help users visualize and refine startup ideas with a user-friendly interface. Focused on clean UI/UX for better usability.",
    tags: ["React.js", "Frontend"],
    gradient: "from-accent to-lavender",
    link: "https://github.com/your-repo-ideolyze",
    demo: "https://ideolyze.netlify.app",
    image: "/ideolyze.png",
  },
  {
    title: "Multi-Category Content Website",
    description: "Developed a modular blog-style site covering recipes, cocktails, and general topics. Integrated external APIs for dynamic content fetching.",
    tags: ["React.js", "API Integration"],
    gradient: "from-primary to-accent",
    link: "https://github.com/your-repo-multicat",
    demo: "https://multi-category.netlify.app",
    image: "/multi.png",
  },
];

// Main Projects Component
const Projects = () => {
  const [viewMode, setViewMode] = useState<ProjectViewMode>("CAROUSEL");

  return (
    <section id="projects" className="py-24 px-4 relative min-h-screen flex items-center">
      <div className="absolute inset-0 gradient-nebula opacity-10 animate-gradient"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your preferred way to explore my cosmic creations.
          </p>
        </div>

        <ProjectViewSelector currentMode={viewMode} setMode={setViewMode} />

        <div className="mt-8">
          {viewMode === "CAROUSEL" && <ThreeDCarousel projects={allProjects} autoRotate={false} />}

          {viewMode === "GRID" && <ProjectGridView projects={allProjects} />}

          {viewMode === "LIST" && <ProjectListView projects={allProjects} />}
        </div>
      </div>
    </section>
  );
};

export default Projects;