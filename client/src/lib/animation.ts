import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionValue, useTransform, useSpring } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation durations
export const DURATIONS = {
  short: 0.2, // 200ms for simple transitions
  medium: 0.4, // 400ms for medium complexity
  long: 0.6, // 600ms for complex reveals
};

// Common easing functions
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1], // Smooth ease out (Cubiz Bezier)
  easeOutBack: [0.34, 1.56, 0.64, 1], // Slight overshoot
  easeInOut: [0.65, 0, 0.35, 1], // Smooth ease in-out
  spring: { stiffness: 100, damping: 15, mass: 1 }, // Spring physics
};

// Fade-in animation variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: DURATIONS.medium,
      ease: EASING.easeOut
    }
  }
};

// Slide-up animation variants
export const slideUpVariants = {
  hidden: { 
    y: 30,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { 
      duration: DURATIONS.medium,
      ease: EASING.easeOut
    }
  }
};

// Slide-in right animation variants
export const slideInRightVariants = {
  hidden: { 
    x: 50,
    opacity: 0 
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { 
      duration: DURATIONS.long,
      ease: EASING.easeOut
    }
  }
};

// Scale-in animation variants
export const scaleInVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0 
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { 
      duration: DURATIONS.short,
      ease: EASING.easeOutBack
    }
  }
};

// Stagger animation container variants
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Helper function to create parallax effect with framer-motion
export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

// Helper function to create smooth scrolling parallax effect
export function useSmoothTransform(value: MotionValue<number>, output: number[]) {
  const smooth = useSpring(value, { stiffness: 100, damping: 30, mass: 0.5 });
  return useTransform(smooth, [0, 1], output);
}

// Initial animation setup for GSAP
export function setupGSAPAnimations() {
  // Set default ease for all GSAP animations
  gsap.defaults({
    ease: "power2.out",
    duration: DURATIONS.medium
  });
  
  // Clear any existing ScrollTriggers to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Register debounced refresh for ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    // Debounce refresh to prevent excessive calls
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
}

// Returns a delayed staggered animation based on index
export function getStaggerDelay(index: number, baseDelay: number = 0.2) {
  return {
    transition: {
      delay: baseDelay + (index * 0.1),
      duration: DURATIONS.medium,
      ease: EASING.easeOut
    }
  };
}

// Helper for creating scroll-triggered animations with GSAP
export function createScrollTrigger(
  trigger: string | Element,
  animation: gsap.core.Timeline,
  options: Partial<ScrollTrigger.Vars> = {}
) {
  return ScrollTrigger.create({
    trigger,
    start: "top 80%",
    toggleActions: "play none none reverse",
    animation,
    ...options
  });
}
