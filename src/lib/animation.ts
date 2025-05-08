"use client"; // Indicate this module is for client-side usage

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MotionValue } from "framer-motion"; // Import type for MotionValue
import { useTransform, useSpring } from "framer-motion";

// Register GSAP plugins if GSAP is available (runs only in browser)
if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export const DURATIONS = {
  short: 0.2, 
  medium: 0.4, 
  long: 0.6, 
};

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1], 
  easeOutBack: [0.34, 1.56, 0.64, 1], 
  easeInOut: [0.65, 0, 0.35, 1], 
  spring: { stiffness: 100, damping: 15, mass: 1 }, 
};

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

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]); // Adjusted for bidirectional parallax
}

export function useSmoothTransform(value: MotionValue<number>, inputRange: number[], outputRange: number[]) {
  const smooth = useSpring(value, { stiffness: 100, damping: 30, mass: 0.5 });
  return useTransform(smooth, inputRange, outputRange);
}

// Resize timer declaration on window for TS
declare global {
  interface Window {
    resizeTimer?: NodeJS.Timeout;
  }
}

export function setupGSAPAnimations() {
  if (typeof window === "undefined" || !gsap) return; // Guard for SSR and GSAP availability

  gsap.defaults({
    ease: "power2.out",
    duration: DURATIONS.medium
  });
  
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  const debouncedRefresh = gsap.utils.debounce(() => {
    ScrollTrigger.refresh();
  }, 250);

  window.addEventListener('resize', debouncedRefresh);
  
  // Cleanup on component unmount (though this setup is global, consider context for component-specific cleanup)
  return () => {
    window.removeEventListener('resize', debouncedRefresh);
  };
}

export function getStaggerDelay(index: number, baseDelay: number = 0.1, increment: number = 0.075) { // Adjusted increment
  return {
    transition: {
      delay: baseDelay + (index * increment),
      duration: DURATIONS.medium,
      ease: EASING.easeOut
    }
  };
}

export function createScrollTrigger(
  trigger: string | Element,
  animation: gsap.core.Timeline | gsap.core.Tween, // Allow Tween as well
  options: Partial<ScrollTrigger.Vars> = {}
): ScrollTrigger | undefined { // Return ScrollTrigger instance or undefined
  if (typeof window === "undefined" || !gsap || !ScrollTrigger) return undefined;

  return ScrollTrigger.create({
    trigger,
    start: "top 80%", // Default start, can be overridden by options
    toggleActions: "play none none reverse", // Default actions
    animation,
    ...options
  });
}
