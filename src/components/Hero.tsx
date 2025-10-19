import React from 'react';
import { Button } from "@/components/ui/button";
import GlareHover from './GlareHover'; // Adjust path based on your project structure

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-start bg-gradient-to-b from-black via-purple-900 to-black text-white overflow-hidden">
      {/* Bitmoji-like character */}
      <div className="absolute right-20 top-1/3 transform -translate-y-1/4">
        <img src="/bitmoji.png" alt="Bitmoji" className="w-96 h-auto" />
      </div>
      
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-left px-4 max-w-3xl ml-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-white">Hi, I'm Vanshika Jangam!</span>
          <br />
          <span className="text-purple-300">I Transform Ideas into Engaging Experiences</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-300">
          Discover a passionate and dedicated UI/UX developer, driven by the vision of crafting impactful and user-centric experiences.
        </p>
        <div className="flex gap-4">
          <GlareHover
            width="auto"
            height="auto"
            background="transparent"
            borderRadius="8px"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareSize={200}
            transitionDuration={500}
            className="inline-flex"
          >
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Let's Connect
            </Button>
          </GlareHover>
          <GlareHover
            width="auto"
            height="auto"
            background="transparent"
            borderRadius="8px"
            borderColor="transparent"
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareSize={200}
            transitionDuration={500}
            className="inline-flex"
          >
            <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900">
              Download CV
            </Button>
          </GlareHover>
        </div>
      </div>

      {/* Navigation */}
      <GlareHover
        width="auto"
        height="auto"
        background="transparent"
        borderRadius="8px"
        borderColor="transparent"
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareSize={200}
        transitionDuration={500}
        className="inline-flex"
      >
        <a href="#contact" className="absolute bottom-10 right-10 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Get in Touch
        </a>
      </GlareHover>
    </section>
  );
};

export default Hero;