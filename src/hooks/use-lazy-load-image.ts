"use client"; // This hook uses browser APIs (IntersectionObserver)

import { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl } from '@/lib/utils'; // Ensure path is correct

interface LazyLoadImageOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // Stop observing once in view
}

interface LazyLoadImageResult {
  isLoaded: boolean;
  isLoading: boolean;
  inView: boolean;
  error: Error | null;
  imageSrc: string;
  ref: React.RefObject<HTMLImageElement | HTMLDivElement>; // Ref for the target element
}

/**
 * Hook for lazy loading images when they enter the viewport.
 * Returns loading state and the optimized image src.
 * Assign the returned `ref` to the image or its container.
 */
export function useLazyLoadImage(src: string, options: LazyLoadImageOptions = {}): LazyLoadImageResult {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const elementRef = useRef<HTMLImageElement | HTMLDivElement>(null); // Ref for the observer target

  const {
    threshold = 0.1,
    rootMargin = '200px 0px',
    once = true // Default to observing only once
  } = options;

  const optimizedSrc = getOptimizedImageUrl(src); // Get optimized URL once

  useEffect(() => {
    // Reset state if the source URL changes
    setIsLoaded(false);
    setIsLoading(false);
    setInView(false); // Reset inView as well
    setError(null);
    
    if (!src || !elementRef.current) return; // Exit if no src or ref is not attached yet
     if (!('IntersectionObserver' in window)) {
        // Fallback for environments without IntersectionObserver
        setInView(true);
        return;
    }


    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(entry.target); // Unobserve if `once` is true
            observer.disconnect(); // Disconnect fully
          }
        } else if (!once) {
            // If not observing only once, handle element leaving viewport (optional)
            // setInView(false);
            // You might want to unload the image here for performance, but often not necessary
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(elementRef.current);
    
    return () => {
      observer.disconnect(); // Cleanup observer on unmount or src change
    };
  }, [src, threshold, rootMargin, once]); // Add src to dependencies

  useEffect(() => {
    // Start loading the image only when it's in view and not already loading/loaded/errored
    if (inView && !isLoading && !isLoaded && !error) {
      setIsLoading(true);
      const img = new Image();
      img.src = optimizedSrc; // Use the pre-calculated optimized URL
      
      img.onload = () => {
        setIsLoaded(true);
        setIsLoading(false);
        setError(null);
      };
      
      img.onerror = (e) => {
        console.error("Image failed to load:", optimizedSrc, e);
        setError(new Error('Failed to load image'));
        setIsLoading(false);
        setIsLoaded(false); // Ensure loaded is false on error
      };
    }
  }, [inView, isLoading, isLoaded, error, optimizedSrc]); // Add dependencies

  return {
    ref: elementRef, // Return the ref to be attached to the element
    isLoaded,
    isLoading,
    inView,
    error,
    imageSrc: isLoaded && !error ? optimizedSrc : '' // Return src only if loaded successfully
  };
}