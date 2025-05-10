"use client"; // Uses client-side checks (isLowEndDevice) and GSAP

import { gsap } from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import type only
import { isLowEndDevice } from './utils'; // Ensure path is correct

// Register ScrollTrigger if GSAP is available (client-side)
if (typeof window !== "undefined" && gsap && typeof gsap.registerPlugin === 'function') {
  try {
    // Dynamically import and register ScrollTrigger if needed, or assume it's loaded elsewhere
    // import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => gsap.registerPlugin(ST));
    // For now, assume ScrollTrigger is either globally registered or imported where used.
    // If ScrollTrigger is consistently used, explicitly import and register it here or in animation-loader.
  } catch (e) {
     console.error("Could not register ScrollTrigger", e);
  }
}


// Define stricter types for the preset
interface AnimationPreset {
  durations: { short: number; medium: number; long: number };
  easings: { easeOut: string; easeInOut: string; easeOutBack: string; bounce: string | false }; // bounce can be false
  staggerDelays: { tight: number; normal: number; loose: number };
  complexity: {
    maxAnimatedElements: number;
    enableParallax: boolean;
    enableBlur: boolean; // Consider if blur effects are used
    enable3D: boolean; // Consider if 3D transforms are used
  };
  createScrollTrigger: (
    trigger: gsap.DOMTarget, // Use GSAP's DOMTarget type
    animation: gsap.core.Animation, // Use GSAP's Animation type
    options?: Partial<ScrollTrigger.Vars> // Use ScrollTrigger.Vars type
  ) => ScrollTrigger | undefined; // Return ScrollTrigger instance or undefined
  batchAnimate: (
    elements: gsap.DOMTarget, // Use GSAP's DOMTarget type
    properties: gsap.TweenVars,
    staggerAmount?: number | gsap.StaggerVars // Allow StaggerVars object
  ) => gsap.core.Tween | undefined; // Return Tween instance or undefined
}


export function createAnimationPreset(): AnimationPreset {
  // Detect low-end device only on the client-side
  const lowEndDevice = typeof window !== 'undefined' ? isLowEndDevice() : false;
  
  const durations = {
    short: lowEndDevice ? 0.15 : 0.2,
    medium: lowEndDevice ? 0.3 : 0.4,
    long: lowEndDevice ? 0.45 : 0.6, // Slightly faster long anims on low-end
  };
  
  const easings = {
    easeOut: lowEndDevice ? 'power1.out' : 'power2.out',
    easeInOut: lowEndDevice ? 'power1.inOut' : 'power2.inOut',
    easeOutBack: lowEndDevice ? 'back.out(1.2)' : 'back.out(1.7)',
    bounce: lowEndDevice ? false : 'bounce.out', // Ensure bounce is string or false
  };
  
  const staggerDelays = {
    tight: lowEndDevice ? 0.03 : 0.05,
    normal: lowEndDevice ? 0.07 : 0.1,
    loose: lowEndDevice ? 0.12 : 0.15,
  };
  
  const complexity = {
    maxAnimatedElements: lowEndDevice ? 8 : 25, // Adjusted limits
    enableParallax: !lowEndDevice,
    enableBlur: !lowEndDevice,
    enable3D: !lowEndDevice,
  };
  
  return {
    durations,
    easings: easings as { easeOut: string; easeInOut: string; easeOutBack: string; bounce: string | false },
    staggerDelays,
    complexity,
    
    createScrollTrigger(trigger, animation, options = {}) {
       // Guard against running on server or if ScrollTrigger isn't loaded
      if (typeof window === "undefined" || !gsap || !(gsap as any).ScrollTrigger) {
        // Attempt to register ScrollTrigger if not already
        if (gsap && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
        } else {
          console.warn("ScrollTrigger is not available or not registered with GSAP.");
          return undefined;
        }
      }

      const ST = (gsap as any).ScrollTrigger; // Access registered plugin

      // Simplified trigger for low-end devices: just play animation once when visible
      if (lowEndDevice) {
        return ST.create({
          trigger,
          start: "top 90%", // Trigger sooner
          toggleActions: 'play none none none', // Play once
          animation,
          once: true, // Ensure it only runs once
          ...options, // Allow overrides
        });
      }
      
      // Full-featured trigger for capable devices
      return ST.create({
        trigger,
        start: "top 80%", // Default start
        toggleActions: 'play none none reverse', // Default toggle actions
        animation,
        // markers: process.env.NODE_ENV === 'development', // Debug markers
        ...options,
      });
    },
    
    batchAnimate(elements, properties, staggerConfig = staggerDelays.normal) {
       if (typeof window === "undefined" || !gsap || !gsap.utils || typeof gsap.utils.toArray !== 'function') return undefined;

      // Use gsap.utils.toArray to reliably convert DOMTarget to Element[]
      const elementsArray: Element[] = gsap.utils.toArray(elements);

      const limitedElements = lowEndDevice 
        ? elementsArray.slice(0, complexity.maxAnimatedElements)
        : elementsArray;

       if (limitedElements.length === 0) return undefined; // No elements to animate
      
      return gsap.to(limitedElements, {
        ...properties,
        duration: properties.duration ?? durations.medium, // Use default duration if not provided
        ease: properties.ease ?? easings.easeOut, // Use default ease if not provided
        stagger: staggerConfig // Pass stagger config directly
      });
    }
  };
}

// Create a singleton instance (consider if context/prop drilling is better for SSR/RSC)
export const animationPreset = createAnimationPreset();
