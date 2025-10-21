import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react"; // Added useEffect for potential robot animation/speech
import { useToast } from "@/hooks/use-toast";
import React from 'react';

// --- NEW GreetingRobot Component ---
const GreetingRobot = () => {
  const [greeting, setGreeting] = useState("Hello there!");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- Placeholder for Text-to-Speech ---
  const speakGreeting = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0; // Normal speech rate
      utterance.pitch = 1.0; // Normal pitch

      // Optional: Find a robotic voice
      // const voices = window.speechSynthesis.getVoices();
      // utterance.voice = voices.find(voice => voice.name.includes('Google US English')); // Example, adjust as needed

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis API not supported in this browser.");
    }
  };

  useEffect(() => {
    // Automatically say hello when component mounts
    speakGreeting(greeting);
    // You could also add a delay here, or trigger on scroll into view
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 rounded-2xl glass-effect text-center relative overflow-hidden min-h-[400px]">
      
      {/* Background radial gradient for subtle effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-800/30 to-transparent opacity-50 z-0 animate-fade-in-slow"></div>

      {/* --- PLACEHOLDER FOR 3D ROBOT ANIMATION --- */}
      {/* This is where you would integrate a 3D library like @react-three/fiber */}
      {/* For now, it's a styled div, but imagine a realistic, moving robot model here! */}
      <div 
        className={`w-64 h-64 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-full flex items-center justify-center mb-6 
                    border-4 border-purple-400 shadow-lg relative z-10 transition-transform duration-500 
                    ${isSpeaking ? 'scale-105 animate-pulse-slight' : 'scale-100'}`}
        style={{
          // For a real 3D model, this div would be your Canvas component
          // e.g., <Canvas><RobotModel /></Canvas>
          transform: isSpeaking ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)',
          boxShadow: isSpeaking ? '0 0 40px rgba(139, 92, 246, 0.7)' : '0 0 20px rgba(139, 92, 246, 0.4)'
        }}
      >
        {/* Replace with your 3D robot model or a complex SVG animation */}
        <span className="text-8xl text-white drop-shadow-lg pointer-events-none">🤖</span>
      </div>
      {/* --- END 3D ROBOT PLACEHOLDER --- */}

      <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white relative z-10">
        <span className={`transition-colors duration-300 ${isSpeaking ? 'text-cyan-400' : 'text-white'}`}>
          {greeting}
        </span>
      </h3>
      <p className="text-lg text-muted-foreground max-w-sm relative z-10">
        I'm Aura, Vanshika's AI companion. Glad to see you here! Feel free to send a message.
      </p>

      {/* Optional: A button to re-trigger the greeting */}
      <Button 
        onClick={() => speakGreeting(greeting)} 
        disabled={isSpeaking}
        className="mt-6 gradient-nebula hover:opacity-90 transition-opacity glow-effect relative z-10"
      >
        {isSpeaking ? "Speaking..." : "Say Hello Again"}
      </Button>
    </div>
  );
};
// --- END GreetingRobot Component ---

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, send formData to a backend endpoint here.
    
    toast({
      title: "Message sent! 🚀",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 gradient-nebula-radial opacity-20"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's create something amazing together. Reach out and let's discuss your next project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch"> {/* Added items-stretch to make columns equal height */}
          
          {/* LEFT COLUMN: Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-2xl font-heading font-semibold mb-6">
              Send Vanshika a <span className="gradient-text">Message</span>
            </h3>
            
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="glass-effect border-accent/30 focus:border-accent"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="glass-effect border-accent/30 focus:border-accent"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Project Idea / Inquiry"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={7}
                className="glass-effect border-accent/30 focus:border-accent resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full gradient-nebula hover:opacity-90 transition-opacity glow-effect"
              size="lg"
            >
              Send Message
            </Button>
          </form>

          {/* RIGHT COLUMN: Greeting Robot */}
          <GreetingRobot />
          
        </div>
      </div>
    </section>
  );
};

export default Contact;