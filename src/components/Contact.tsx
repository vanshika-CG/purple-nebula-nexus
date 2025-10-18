import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent! 🚀",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/vanshikajangam" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vanshika-jangam-0a232332a/" },
    { icon: Twitter, label: "Portfolio", href: "https://triivya.com" },
    { icon: Mail, label: "Email", href: "mailto:vanshika.jangamcg@gmail.com" },
  ];

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

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-heading font-semibold mb-6">
              Connect via <span className="gradient-text">Social</span>
            </h3>
            <div className="space-y-4 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center gap-4 p-4 rounded-xl glass-effect hover:bg-accent/10 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <social.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
