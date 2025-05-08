import { gsap } from 'gsap';
import { isLowEndDevice } from './utils';

/**
 * Animation preset factory that adjusts animation complexity based on device capabilities
 */
export function createAnimationPreset() {
  // Detect if running on a low-end device or slow connection
  const lowEndDevice = isLowEndDevice();
  
  // Base durations and easing
  const durations = {
    short: lowEndDevice ? 0.15 : 0.2,   // 150-200ms for micro interactions
    medium: lowEndDevice ? 0.3 : 0.4,    // 300-400ms for standard transitions
    long: lowEndDevice ? 0.4 : 0.6,     // 400-600ms for complex animations
  };
  
  // Easing presets - simpler on low-end devices
  const easings = {
    // Simple easing for low-end devices
    easeOut: lowEndDevice ? 'power1.out' : 'power2.out',
    easeInOut: lowEndDevice ? 'power1.inOut' : 'power2.inOut',
    easeOutBack: lowEndDevice ? 'back.out(1.2)' : 'back.out(1.7)',
    bounce: lowEndDevice ? 'none' : 'bounce.out',
  };
  
  // Stagger delays reduced on low-end devices
  const staggerDelays = {
    tight: lowEndDevice ? 0.02 : 0.05,
    normal: lowEndDevice ? 0.05 : 0.1,
    loose: lowEndDevice ? 0.1 : 0.15,
  };
  
  // Scale complexity based on device capability
  const complexity = {
    // Reduce number of animated elements on low-end devices
    maxAnimatedElements: lowEndDevice ? 5 : 20,
    // Disable some effects on low-end devices
    enableParallax: !lowEndDevice,
    enableBlur: !lowEndDevice,
    enable3D: !lowEndDevice,
  };
  
  return {
    durations,
    easings,
    staggerDelays,
    complexity,
    
    // Helper functions
    createScrollTrigger(
      trigger: string | Element,
      animation: gsap.core.Timeline,
      options = {}
    ) {
      // Only apply complex scroll animations on capable devices
      if (lowEndDevice) {
        // Simplified animation for low-end devices
        return gsap.timeline({
          scrollTrigger: {
            trigger,
            toggleActions: 'play none none none',
            ...options,
          }
        }).add(animation);
      }
      
      // Full-featured animation for high-end devices
      return gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          ...options,
        }
      }).add(animation);
    },
    
    // Optimize animation batching
    batchAnimate(elements: NodeListOf<Element> | Element[], properties: gsap.TweenVars, staggerAmount = 0.1) {
      const elementsArray = Array.from(elements);
      
      // Limit number of animated elements on low-end devices
      const limitedElements = lowEndDevice 
        ? elementsArray.slice(0, this.complexity.maxAnimatedElements)
        : elementsArray;
      
      return gsap.to(limitedElements, {
        ...properties,
        stagger: {
          amount: staggerAmount,
          ease: this.easings.easeOut
        }
      });
    }
  };
}

// Create a singleton instance
export const animationPreset = createAnimationPreset();