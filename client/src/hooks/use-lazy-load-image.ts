import { useState, useEffect } from 'react';
import { getOptimizedImageUrl } from '@/lib/utils';

interface LazyLoadImageOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook for lazy loading images when they enter the viewport
 * Returns the state of the loading process and the final image src
 */
export function useLazyLoadImage(src: string, options: LazyLoadImageOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Default options
  const {
    threshold = 0.1,
    rootMargin = '200px 0px',
    once = true
  } = options;

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setIsLoading(false);
    setError(null);
    
    // Early return if no src provided
    if (!src) return;
    
    // Create IntersectionObserver to detect when component enters viewport
    let observer: IntersectionObserver;
    
    const target = document.getElementById('image-container');
    
    if (target) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          
          // When image container enters viewport
          if (entry.isIntersecting) {
            setInView(true);
            
            // Start loading image
            if (!isLoading && !isLoaded) {
              setIsLoading(true);
              
              // Create new image to preload
              const img = new Image();
              
              // Use optimized version of image (lower quality for faster loading)
              img.src = getOptimizedImageUrl(src);
              
              // Handle successful load
              img.onload = () => {
                setIsLoaded(true);
                setIsLoading(false);
              };
              
              // Handle error
              img.onerror = (e) => {
                setError(new Error('Failed to load image'));
                setIsLoading(false);
              };
            }
            
            // If once is true, disconnect observer after image is in view
            if (once) {
              observer.disconnect();
            }
          } else {
            setInView(false);
          }
        },
        { threshold, rootMargin }
      );
      
      observer.observe(target);
    }
    
    // Clean up observer
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, threshold, rootMargin, once, isLoading, isLoaded]);
  
  return {
    isLoaded,
    isLoading,
    inView,
    error,
    // Return optimized image URL if loaded, otherwise empty string
    imageSrc: isLoaded ? getOptimizedImageUrl(src) : ''
  };
}