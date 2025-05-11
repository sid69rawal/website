"use client"; // Needs client-side hooks and refs

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import NextImage, { ImageProps as NextImageProps } from 'next/image'; // Use Next.js Image
import { Loader2, Image as ImageIcon } from 'lucide-react'; // Use lucide icons

interface LazyImageProps extends Omit<NextImageProps, 'src' | 'alt' | 'placeholder' | 'blurDataURL'> {
  src: string;
  alt: string;
  placeholderColor?: string; // Optional background color while loading
  threshold?: number;
  rootMargin?: string;
  containerClassName?: string; // Class for the container div
}

export function LazyImage({
  src,
  alt,
  className, // This className applies to the NextImage component
  containerClassName, // This className applies to the wrapper div
  placeholderColor = 'hsl(var(--muted))', // Use theme color
  threshold = 0.1,
  rootMargin = '200px 0px',
  width, // Extract width and height for the placeholder aspect ratio
  height,
  priority, // Explicitly destructure priority
  ...props // Pass remaining props like sizes, fill, etc., to NextImage
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement>(null); // Ref on the container div

  // Calculate aspect ratio for placeholder
  const aspectRatio = (typeof width === 'number' && typeof height === 'number' && height !== 0)
    ? (width / height)
    : 16 / 9; // Default aspect ratio

  // Set up intersection observer
  useEffect(() => {
    // Ensure IntersectionObserver exists (it's client-side)
     if (!('IntersectionObserver' in window)) {
        setIsInView(true); // Fallback for older browsers/SSR: load immediately
        return;
     }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Observe only once
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
       observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      console.error("Image loading error:", e);
      setError("Failed to load image.");
      setIsLoaded(true); // Treat error as 'loaded' to remove spinner
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        'lazy-image-container relative overflow-hidden',
        containerClassName // Apply container class
      )}
      style={{
        backgroundColor: !isLoaded && !error ? placeholderColor : undefined, // Show placeholder color only while loading
        aspectRatio: `${aspectRatio}`, // Maintain aspect ratio
        width: props.fill ? '100%' : width, // Set width/height if not using fill
        height: props.fill ? '100%' : height,
      }}
    >
      {/* Placeholder */}
      {!isLoaded && !error && !isInView && ( // Show placeholder before intersection
         <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
           <ImageIcon className="w-1/4 h-1/4 text-muted-foreground/50" />
         </div>
      )}
      {isInView && !isLoaded && !error && ( // Show spinner only when in view and loading
         <div className="absolute inset-0 flex items-center justify-center">
           <Loader2 className="w-8 h-8 animate-spin text-primary" />
         </div>
      )}

      {/* Error State */}
      {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 text-destructive text-xs p-2 text-center">
             <ImageIcon className="w-6 h-6 mb-1" />
             <span>{error}</span>
          </div>
      )}

      {/* Actual image - rendered only when in view */}
      {isInView && !error && (
          <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'transition-opacity duration-500 ease-in-out',
              isLoaded ? 'opacity-100' : 'opacity-0', // Fade in on load
              className // Apply image-specific class
            )}
            onLoadingComplete={handleLoadingComplete}
            onError={handleError}
            priority={priority} // Pass priority prop
            loading={priority ? undefined : "lazy"} // If priority is true, next/image handles loading as 'eager'
            {...props} // Pass remaining props (like sizes, fill)
          />
      )}
    </div>
  );
}
