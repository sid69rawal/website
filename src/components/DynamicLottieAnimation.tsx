"use client"; // Needs client-side hooks and rendering

import React, { useEffect, useRef, useState } from 'react';
import type Lottie from 'lottie-web'; // Import type only
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'; // Ensure path is correct
import { Loader2 } from 'lucide-react'; // Use a spinner from lucide

interface DynamicLottieAnimationProps {
  animationPath: string;
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export function DynamicLottieAnimation({
  animationPath,
  width = '100%',
  height = '100%',
  autoplay = true,
  loop = true,
  className = ''
}: DynamicLottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<any>(null); // Ref to store Lottie animation instance
  const [isAnimationLoading, setIsAnimationLoading] = useState(true);
  
  const { isIntersecting } = useIntersectionObserver(containerRef, {
    rootMargin: '100px 0px',
    threshold: 0.1,
    freezeOnceVisible: true, // Load only once when visible
  });
  
  useEffect(() => {
    let lottieInstance: typeof Lottie | null = null;
    let animationData: any = null;

    const loadAnimation = async () => {
        if (isIntersecting && containerRef.current && !animRef.current) {
            setIsAnimationLoading(true);
            try {
                // Dynamically import Lottie library
                lottieInstance = (await import('lottie-web')).default;

                // Fetch animation data
                const response = await fetch(animationPath);
                if (!response.ok) throw new Error(`Failed to fetch animation data: ${response.statusText}`);
                animationData = await response.json();

                // Load the animation
                animRef.current = lottieInstance.loadAnimation({
                    container: containerRef.current!,
                    renderer: 'svg',
                    loop,
                    autoplay,
                    animationData,
                });
            } catch (err) {
                console.error('Failed to load Lottie animation:', err);
                // Handle error state here if needed
            } finally {
                setIsAnimationLoading(false);
            }
        } else if (!isIntersecting) {
            // Reset loading state if element is not intersecting (e.g., if it scrolls out of view and back in, and we want to re-trigger loading)
            // This part might need adjustment based on desired behavior if freezeOnceVisible is false.
            // For freezeOnceVisible: true, this else if might not be strictly necessary as useEffect won't re-run to load again.
            setIsAnimationLoading(true); 
        }
    };

    loadAnimation();

    // Cleanup function
    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [isIntersecting, animationPath, autoplay, loop]); // Re-run if these props change or intersection status changes

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ width, height, position: 'relative', overflow: 'hidden' }} // Ensure container has dimensions
    >
      {isIntersecting && isAnimationLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {!isIntersecting && (
         <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
           {/* Placeholder content or spinner if desired before intersection */}
         </div>
      )}
      {/* The div where Lottie renders will be populated by the useEffect */}
    </div>
  );
}