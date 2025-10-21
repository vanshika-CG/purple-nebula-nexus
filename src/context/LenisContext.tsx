// src/context/LenisContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

// Define the type for the context value
type LenisContextType = Lenis | null;

// Create the Context
const LenisContext = createContext<LenisContextType>(null);

// Custom hook to use the shared Lenis instance
export const useLenisContext = () => {
  return useContext(LenisContext);
};

// Provider component
interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // ⭐️ Only create the Lenis instance once here
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      // Check for existence before calling raf
      if (lenis) { 
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []); // Empty dependency array ensures run only on mount

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
};