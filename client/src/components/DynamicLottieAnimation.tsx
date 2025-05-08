import React, { useEffect, useRef, useState } from 'react';
import { useAnimationLibrary } from '@/hooks/use-dynamic-import';

interface DynamicLottieAnimationProps {
  animationPath: string;
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

/**
 * A component that dynamically loads Lottie and its animation data
 * only when it becomes visible in the viewport
 */
export function DynamicLottieAnimation({
  animationPath,
  width = '100%',
  height = '100%',
  autoplay = true,
  loop = true,
  className = ''
}: DynamicLottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lottieInstance, setLottieInstance] = useState<any>(null);
  
  // Use our custom hook for loading Lottie only when needed
  const { 
    module: lottie, 
    loading, 
    error, 
    importModule: loadLottie 
  } = useAnimationLibrary('lottie');
  
  // Setup intersection observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px 0px', // Load a bit before it becomes visible
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // When component becomes visible, load Lottie
  useEffect(() => {
    if (isVisible && !lottie) {
      loadLottie();
    }
  }, [isVisible, lottie, loadLottie]);
  
  // When Lottie is loaded, load and play the animation
  useEffect(() => {
    if (lottie && containerRef.current && !lottieInstance) {
      // Dynamically load the animation data (JSON)
      fetch(animationPath)
        .then(response => response.json())
        .then(animationData => {
          const instance = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop,
            autoplay,
            animationData
          });
          
          setLottieInstance(instance);
        })
        .catch(err => {
          console.error('Failed to load animation data:', err);
        });
    }
    
    // Cleanup animation when component unmounts
    return () => {
      if (lottieInstance) {
        lottieInstance.destroy();
      }
    };
  }, [lottie, animationPath, autoplay, loop, lottieInstance]);
  
  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ width, height }}
    >
      {loading && (
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-xs">
          Failed to load animation
        </div>
      )}
    </div>
  );
}