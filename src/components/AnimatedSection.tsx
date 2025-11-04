// src/components/AnimatedSection.tsx

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeInUp' | 'fadeInScale' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  className?: string;
  threshold?: number;
}

const AnimatedSection = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold });

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeInScale: 'animate-fade-in-scale',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right',
  };

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animationClasses[animation] : 'opacity-0'}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
