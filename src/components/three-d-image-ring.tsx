"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut } from "framer-motion";
import { cn } from "../lib/utils";
import { animate } from "framer-motion";
import { Hand } from "lucide-react"; // Added Hand icon import

export interface ThreeDImageRingProps {
  /** Array of image URLs to display in the ring */
  images: string[];
  /** Container width in pixels (will be scaled) */
  width?: number;
  /** 3D perspective value */
  perspective?: number;
  /** Distance of images from center (z-depth) */
  imageDistance?: number;
  /** Initial rotation of the ring */
  initialRotation?: number;
  /** Animation duration for entrance */
  animationDuration?: number;
  /** Stagger delay between images */
  staggerDelay?: number;
  /** Hover opacity for non-hovered images */
  hoverOpacity?: number;
  /** Custom container className */
  containerClassName?: string;
  /** Custom ring className */
  ringClassName?: string;
  /** Custom image className */
  imageClassName?: string;
  /** Background color of the stage */
  backgroundColor?: string;
  /** Enable/disable drag functionality */
  draggable?: boolean;
  /** Power for the drag end inertia animation */
  inertiaPower?: number;
  /** Time constant for the drag end inertia animation (duration of deceleration in ms) */
  inertiaTimeConstant?: number;
  /** Multiplier for initial velocity when drag ends */
  inertiaVelocityMultiplier?: number;
  /** Callback function when the active image changes (index) */
  onActiveImageChange: (index: number) => void; 
  /** Aspect ratio of individual images (e.g., 16/9 for widescreen, 4/3 for standard) */
  imageAspectRatio?: number;
}

export function ThreeDImageRing({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  onActiveImageChange,
  imageAspectRatio = 16 / 9,
}: ThreeDImageRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const velocity = useRef<number>(0);
  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);
  const angle = useMemo(() => 360 / images.length, [images.length]);
  
  const [activeIndex, setActiveIndex] = useState(0); 

  // Calculate image height based on width and aspect ratio
  const imageHeight = useMemo(() => width / imageAspectRatio, [width, imageAspectRatio]);

  const getBgPos = (imageIndex: number, currentRot: number, scale: number) => {
    const scaledImageDistance = imageDistance * scale;
    const imageAngle = imageIndex * angle; 
    const effectiveRotation = currentRot + imageAngle; 
    
    const normalizedRotation = (effectiveRotation % 360 + 360) % 360; 
    const parallaxFactor = normalizedRotation / 360;

    const parallaxOffset = parallaxFactor * scaledImageDistance; 
    
    return `${-(parallaxOffset / 1.5)}px 0px`;
  };

  const calculateActiveIndex = (latestRotation: number) => {
    const normalizedRotation = ((latestRotation % 360) + 360) % 360;
    let index = Math.round((360 - normalizedRotation) / angle) % images.length;
    index = (index + images.length) % images.length;
    return index;
  };

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          (imgElement as HTMLElement).style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;

      const newIndex = calculateActiveIndex(latestRotation);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onActiveImageChange(newIndex);
      }
    });

    const initialIndex = calculateActiveIndex(rotationY.get());
    setActiveIndex(initialIndex);
    onActiveImageChange(initialIndex);

    return () => unsubscribe();
  }, [rotationY, images.length, imageDistance, currentScale, angle, activeIndex, onActiveImageChange]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) {
      (ringRef.current as HTMLElement).style.cursor = "grabbing";
    }
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!draggable || !isDragging.current) return;
    const clientX = "touches" in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    velocity.current = deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle, 
      onUpdate: (latest) => {
        rotationY.set(latest);
      },
      onComplete: () => {
        onActiveImageChange(calculateActiveIndex(rotationY.get()));
      }
    });
    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${imageHeight * 1.33}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn(
            "w-full h-full absolute",
            ringClassName
          )}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {showImages && images.map((imageUrl, index) => (
              <motion.div
                key={index}
                className={cn(
                  "absolute transition-shadow duration-300",
                  index === activeIndex ? "ring-4 ring-accent/70 shadow-2xl shadow-accent/50" : "",
                  imageClassName
                )}
                style={{
                  width: `${width}px`,
                  height: `${imageHeight}px`,
                  transformStyle: "preserve-3d",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backfaceVisibility: "hidden",
                  rotateY: index * angle,
                  z: -imageDistance * currentScale,
                  transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                  backgroundPosition: getBgPos(index, rotationY.get(), currentScale),
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={imageVariants}
                custom={index}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: easeOut,
                }}
                whileHover={index !== activeIndex ? { opacity: 1, transition: { duration: 0.15 } } : {}}
                onHoverStart={() => {
                  if (isDragging.current || index === activeIndex) return;
                  if (ringRef.current) {
                    Array.from(ringRef.current.children).forEach((imgEl, i) => {
                      if (i !== index) {
                        (imgEl as HTMLElement).style.opacity = `${hoverOpacity}`;
                      }
                    });
                  }
                }}
                onHoverEnd={() => {
                  if (isDragging.current) return;
                  if (ringRef.current) {
                    Array.from(ringRef.current.children).forEach((imgEl) => {
                      (imgEl as HTMLElement).style.opacity = `1`;
                    });
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Added Hand Icon and Drag Instruction */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex items-center gap-2 text-muted-foreground text-sm"
        style={{ top: `${imageHeight * 1.33 + 20}px` }} // Position below the ring
      >
        <Hand className="w-5 h-5" />
        <span>Drag to rotate</span>
      </div>
    </div>
  );
}

export default ThreeDImageRing;