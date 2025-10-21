import { useState, useEffect, useRef } from "react";
// Assuming Button import paths are correct for your environment
import { Button } from "@/components/ui/button"; 
import { Menu, X } from "lucide-react";

// The corrected navigation items
const navItems = ["about", "projects", "education", "contact"];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(navItems[0]); 
  
  // Ref for the navigation links container to measure positions
  const navRef = useRef<HTMLDivElement>(null);
  
  // State for the glowing indicator's dynamic position and size
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  // --- Effect 1: Handle scroll and set active link ---
  useEffect(() => {
    const handleScroll = () => {
      // Set scroll state for glass effect
      setIsScrolled(window.scrollY > 50);

      // Determine the current active section based on scroll position
      let currentActive = navItems[0];
      let hasFound = false;
      
      // Check sections from top to bottom
      for (const item of navItems) {
        const section = document.getElementById(item);
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section's top is visible near the top of the viewport
          if (rect.top <= 120 && rect.bottom > 120) {
            currentActive = item;
            hasFound = true;
            break;
          }
        }
      }
      
      // Default to the first item if near the very top
      if (!hasFound && window.scrollY < 100) {
         currentActive = navItems[0];
      }

      setActiveItem(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to initialize the active item and scroll state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Effect 2: Update the glowing indicator position ---
  useEffect(() => {
    if (!navRef.current) return;

    // Find the currently active button element using its dynamic class name
    const activeElement = navRef.current.querySelector(
      `.nav-link-${activeItem}`
    ) as HTMLElement;

    if (activeElement) {
      setIndicatorStyle({
        width: activeElement.offsetWidth,
        // The left position is relative to the parent (navRef)
        left: activeElement.offsetLeft,
        opacity: 1,
      });
    } else {
       // Hide the indicator if the active item is not found
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeItem, isScrolled]); // Recalculate if active item or nav state changes

  const scrollToSection = (id: string) => {
    // Set active item immediately on click for instant visual feedback
    setActiveItem(id); 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-heading font-extrabold gradient-text z-50 transition-all hover:scale-105"
          >
            VJ
          </button>

          {/* Desktop Navigation Links Container (Relative Parent for Indicator) */}
          <div 
            ref={navRef}
            className="hidden md:flex items-center gap-12 relative h-10"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                // Dynamic class for the positioning logic and hover/active styles
                className={`capitalize text-lg font-medium relative z-10 transition-colors nav-link-${item} 
                  ${activeItem === item 
                    // Active link text is a bit brighter to stand out against the glow
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
              className="nav-indicator-glow" // Custom CSS for glow and transition
              style={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
                opacity: indicatorStyle.opacity,
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:text-accent z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
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
    </>
  );
};

export default Navigation;
