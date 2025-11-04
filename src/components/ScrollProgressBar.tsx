// src/components/ScrollProgressBar.tsx

import { useScrollProgress } from '@/hooks/useScrollAnimation';

const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-lavender transition-all duration-300 ease-out shadow-lg"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px hsl(var(--accent) / 0.6), 0 0 20px hsl(var(--lavender) / 0.4)',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
