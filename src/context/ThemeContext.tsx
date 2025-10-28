// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "nebula" | "violet" | "cosmic" | "amethyst";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("nebula");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("site-theme") as Theme | null;
    if (saved && ["nebula", "violet", "cosmic", "amethyst"].includes(saved)) {
      setThemeState(saved);
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("site-theme", t);
    document.documentElement.dataset.theme = t;
  };

  // Apply on mount/change
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};