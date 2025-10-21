// src/components/Navigation.tsx

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User2, Github, Linkedin, Twitter, Youtube, Mail, FileText, Code } from "lucide-react";
import { useLenis } from "@/hooks/useLenis"; 

// The corrected navigation items
const navItems = ["about", "projects", "education", "contact"];

// Placeholder for your profile data
const profileData = {
  name: "Your Name", 
  email: "your.email@example.com", 
  photoUrl: "/images/profile-placeholder.jpg", 
  socials: [
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/yourprofile" },
    { name: "GitHub", icon: Github, url: "https://github.com/yourusername" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/yourhandle" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/yourchannel" },
  ],
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileSliderOpen, setIsProfileSliderOpen] = useState(false); 
  const [activeItem, setActiveItem] = useState(navItems[0]);

  const navRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null); // ⭐️ REF FOR THE SLIDER CONTENT

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  const lenis = useLenis(); 

  // --- Effect 1: Handle scroll and set active link (Unchanged) ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let currentActive = navItems[0];
      let hasFound = false;
      
      for (const item of navItems) {
        const section = document.getElementById(item);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) { 
            currentActive = item;
            hasFound = true;
            break;
          }
        }
      }
      
      if (!hasFound && window.scrollY < 100) {
          currentActive = navItems[0];
      }

      setActiveItem(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Effect 2: Update the glowing indicator position (Unchanged) ---
  useEffect(() => {
    if (!navRef.current) return;

    const activeElement = navRef.current.querySelector(
      `.nav-link-${activeItem}`
    ) as HTMLElement;

    if (activeElement) {
      setIndicatorStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
        opacity: 1,
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeItem, isScrolled]); 
  
  // 🔑 EFFECT 3: LOCK LENIS SCROLLING AND ENABLE SLIDER SCROLLING
  useEffect(() => {
    const isOverlayOpen = isMobileMenuOpen || isProfileSliderOpen;

    if (isOverlayOpen) {
      // 1. DISABLE LENIS SCROLLING (The main fix for trackpad hijacking)
      if (lenis) {
        lenis.stop(); 
      }
      
      // 2. Add an event listener to the slider to prevent scroll propagation
      const sliderElement = sliderRef.current;
      if (sliderElement) {
        const preventScrollProp = (e: WheelEvent) => {
          // Check if the content is fully scrolled (top or bottom)
          const isAtTop = sliderElement.scrollTop === 0 && e.deltaY < 0;
          const isAtBottom = (sliderElement.scrollHeight - sliderElement.clientHeight <= sliderElement.scrollTop + 1) && e.deltaY > 0; // +1 tolerance

          // If not at the scroll limit, stop the event from reaching the document body.
          if (!isAtTop && !isAtBottom) {
             e.stopPropagation();
          }
        };
        
        // Add the wheel event listener
        sliderElement.addEventListener('wheel', preventScrollProp, { passive: false });
        
        return () => {
          // Cleanup on unmount/closure
          sliderElement.removeEventListener('wheel', preventScrollProp);
          if (lenis) lenis.start();
        };
      }
    } else {
      // Re-enable Lenis when closed
      if (lenis) {
        lenis.start(); 
      }
    }
    
    // Final cleanup only for lenis
    return () => {
      if (lenis) lenis.start();
    };
  }, [isMobileMenuOpen, isProfileSliderOpen, lenis]);


  const scrollToSection = (id: string) => {
    setActiveItem(id); 
    if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -120, duration: 1.2 });
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); 
    setIsProfileSliderOpen(false); 
  };
  
  const toggleProfileSlider = () => {
    if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
    }
    setIsProfileSliderOpen(!isProfileSliderOpen);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect border-b border-accent/20" : "bg-transparent"
        } ${isMobileMenuOpen ? "bg-background" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo/Home Button - VJ */}
          <button
            onClick={() => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-heading font-extrabold gradient-text z-50 transition-all hover:scale-105"
          >
            VJ
          </button>

          {/* Desktop Navigation Links Container (Relative Parent for Indicator) */}
          <div 
            ref={navRef}
            className="hidden md:flex items-center gap-10 relative h-7"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-1xl font-medium relative z-10 transition-colors nav-link-${item} 
                  ${activeItem === item 
                    ? 'active-nav-link text-lavender font-semibold' 
                    : 'text-muted-foreground hover:text-accent'
                  }
                `}
              >
                {item}
              </button>
            ))}

            {/* Glowing Indicator Element (Absolute Child) */}
            <div
              className="nav-indicator-glow" 
              style={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
                opacity: indicatorStyle.opacity,
              }}
            />
          </div>

          {/* Right side buttons (Profile & Mobile Menu) */}
          <div className="flex items-center gap-2">
            {/* Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`text-foreground hover:text-lavender transition-all duration-300 z-50 ${isProfileSliderOpen ? 'gradient-text' : ''}`}
              onClick={toggleProfileSlider}
              aria-label="Toggle Profile Slider"
            >
              <User2 className="h-6 w-6" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-accent z-50"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isProfileSliderOpen) setIsProfileSliderOpen(false); 
              }}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-20">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col items-center pt-16 h-full gap-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-3xl font-heading font-bold transition-all ${
                    activeItem === item ? 'gradient-text' : 'text-foreground hover:gradient-text'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Profile Slider Overlay --- */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          isProfileSliderOpen ? 'visible bg-black/50' : 'invisible'
        }`}
        onClick={toggleProfileSlider} 
      >
        <div
          ref={sliderRef} // ⭐️ ATTACHED REF FOR SCROLL HANDLER
          // Slider Container
          className={`absolute top-0 right-0 h-full w-full max-w-sm transition-transform duration-500 ease-in-out ${
            isProfileSliderOpen ? 'translate-x-0' : 'translate-x-full'
          }
            glass-effect-dark p-6 shadow-2xl backdrop-blur-3xl overflow-y-auto
          `}
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:text-accent z-50"
            onClick={toggleProfileSlider}
            aria-label="Close Profile Slider"
          >
            <X className="h-7 w-7" />
          </Button>
          
          <div className="flex flex-col items-center pt-10 pb-8 border-b border-white/20">
            {/* Profile Photo */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-lavender shadow-xl p-0.5 bg-background/50">
              <img
                src={profileData.photoUrl}
                alt={profileData.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Name and Title */}
            <h3 className="text-3xl font-heading font-bold mt-4 gradient-text">
              {profileData.name}
            </h3>
            <p className="text-sm text-gray-300 mt-1">Full Stack Developer | UI/UX Enthusiast</p>
          </div>

          <div className="py-6 border-b border-white/20">
            <h4 className="text-lg font-semibold text-lavender mb-3">Connect with Me:</h4>
            
            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3">
              {profileData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-lavender/20 transition-all duration-300 text-white text-sm font-medium shadow-lg group"
                >
                  <social.icon className="h-5 w-5 mr-2 text-accent group-hover:text-lavender transition-colors" />
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Additional Features / Contact */}
          <div className="pt-6">
            <h4 className="text-lg font-semibold text-lavender mb-3">Quick Actions:</h4>
            
            {/* Contact Button */}
            <a
                href={`mailto:${profileData.email}`}
                className="flex items-center p-3 rounded-xl bg-green-600/90 hover:bg-green-600 transition-colors duration-300 text-white font-bold justify-center shadow-lg mb-4"
            >
                <Mail className="h-5 w-5 mr-2" />
                Email Me Directly
            </a>

            {/* Creative Feature Idea: Quick Stats or Download CV */}
            <div className="flex justify-between gap-4">
                <Button 
                    className="w-full bg-blue-500/80 hover:bg-blue-600 transition-all duration-300 text-white font-bold shadow-md"
                >
                    <FileText className="h-5 w-5 mr-2" />
                    Download CV
                </Button>
                <Button 
                    variant="outline" 
                    className="w-full border-lavender text-lavender hover:bg-lavender/10 font-bold shadow-md"
                >
                    <Code className="h-5 w-5 mr-2" />
                    See My Stack
                </Button>
            </div>
            
            <div className="h-40" /> 
            
            <p className="text-xs text-center text-gray-400 mt-10">
                &copy; {new Date().getFullYear()} {profileData.name}. UI crafted with **React & Tailwind**.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;