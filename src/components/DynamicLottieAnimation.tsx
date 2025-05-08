"use client"; // Needs client-side hooks and rendering

import React, { useEffect, useRef, useState, Suspense } from 'react';
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

// Dynamically import lottie-web only on the client
const LottiePlayer = React.lazy(() => 
  import('lottie-web').then(module => ({ default: module.default }))
);

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
            }
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
      {/* Render nothing until intersecting to trigger Suspense fallback */}
      {isIntersecting ? (
        <Suspense fallback={ // Suspense isn't directly needed here if we manage loading state, but kept for potential future use
           <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          {/* The div where Lottie renders will be populated by the useEffect */}
        </Suspense>
      ) : (
        // Optional: Render a placeholder before intersection
         <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
           {/* Placeholder content or spinner if desired before intersection */}
         </div>
      )}
    </div>
  );
}
