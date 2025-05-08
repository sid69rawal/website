import { useState, useEffect } from 'react';

/**
 * Custom hook for dynamically importing a module when needed
 * This allows code-splitting and lazy loading of expensive libraries
 */
export function useDynamicImport<T>(
  importFn: () => Promise<T>,
  immediate: boolean = false
): {
  module: T | null;
  loading: boolean;
  error: Error | null;
  importModule: () => Promise<T | null>;
} {
  const [module, setModule] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  // Function to trigger the import
  const importModule = async (): Promise<T | null> => {
    if (module) return module;
    
    try {
      setLoading(true);
      setError(null);
      
      const importedModule = await importFn();
      setModule(importedModule);
      return importedModule;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load module'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Optionally import immediately
  useEffect(() => {
    if (immediate) {
      importModule();
    }
  }, [immediate]);

  return { module, loading, error, importModule };
}

// Type for different animation libraries
type AnimationLibrary = 'gsap' | 'three' | 'lottie';

/**
 * Helper hook for importing specific animation libraries
 */
export function useAnimationLibrary<T = any>(
  libraryName: AnimationLibrary,
  immediate: boolean = false
) {
  // Use type assertion to handle the different library types
  const getImportFn = () => {
    switch (libraryName) {
      case 'gsap':
        return () => import('gsap') as Promise<T>;
      case 'three':
        return () => import('three') as Promise<T>;
      case 'lottie':
        return () => import('lottie-web') as Promise<T>;
      default:
        throw new Error(`Unknown library: ${libraryName}`);
    }
  };
  
  return useDynamicImport<T>(getImportFn(), immediate);
}

// Type for GSAP plugins
type GSAPPlugin = 'ScrollTrigger' | 'MotionPathPlugin' | 'DrawSVGPlugin';

/**
 * Helper hook for importing GSAP plugins
 */
export function useGSAPPlugin<T = any>(
  pluginName: GSAPPlugin,
  immediate: boolean = false
) {
  // Use type assertion to handle the different plugin types
  const getImportFn = () => {
    switch (pluginName) {
      case 'ScrollTrigger':
        return async () => {
          const gsap = await import('gsap');
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          gsap.gsap.registerPlugin(ScrollTrigger);
          return ScrollTrigger as unknown as T;
        };
      case 'MotionPathPlugin':
        return async () => {
          const gsap = await import('gsap');
          const { MotionPathPlugin } = await import('gsap/MotionPathPlugin');
          gsap.gsap.registerPlugin(MotionPathPlugin);
          return MotionPathPlugin as unknown as T;
        };
      case 'DrawSVGPlugin':
        return async () => {
          const gsap = await import('gsap');
          const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin');
          gsap.gsap.registerPlugin(DrawSVGPlugin);
          return DrawSVGPlugin as unknown as T;
        };
      default:
        throw new Error(`Unknown GSAP plugin: ${pluginName}`);
    }
  };
  
  return useDynamicImport<T>(getImportFn(), immediate);
}