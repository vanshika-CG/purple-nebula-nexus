import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import robotAnimation from './../../public/animation/Robot says hello.json';
import { cn } from '@/lib/utils';
import { useLenis } from '@/hooks/useLenis';

const SCROLL_THRESHOLD = 500;
const DURATION = 3000;

const ScrollSlideRobot: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [isRobotVisible, setIsRobotVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // ⭐️ OPTIMIZATION: Only use Lenis listener. Native scroll listeners 
    // run out of sync with Lenis and cause "stutter."
    const handleScroll = (e: any) => {
      const currentScroll = e.scroll;

      if (currentScroll > SCROLL_THRESHOLD && !isLocked) {
        setIsLocked(true); 
        setIsRobotVisible(true);
      }
      
      if (currentScroll < SCROLL_THRESHOLD / 2 && isLocked) {
        setIsLocked(false);
        setIsRobotVisible(false);
      }
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [isLocked, lenis]);

  useEffect(() => {
    if (isRobotVisible) {
      const timeoutId = setTimeout(() => setIsRobotVisible(false), DURATION);
      return () => clearTimeout(timeoutId);
    }
  }, [isRobotVisible]);

  const variants = {
    hidden: { x: '100%', opacity: 0, transition: { duration: 0.5 } },
    visible: { x: '0%', opacity: 1, transition: { type: 'spring', damping: 15 } },
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      <AnimatePresence>
        {isRobotVisible && (
          <motion.div
            initial="hidden" animate="visible" exit="hidden" variants={variants}
            className={cn(
              "fixed right-0 top-1/2 -translate-y-1/2 size-32 md:size-40",
              "bg-background/90 rounded-full border border-accent/30 shadow-2xl p-1"
            )}
          >
            <Lottie animationData={robotAnimation} loop={true} autoplay={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollSlideRobot;