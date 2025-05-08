"use client"; // This hook is client-side only

import { useState, useEffect, useCallback } from 'react';

interface UseDynamicImportResult<T> {
  module: T | null;
  loading: boolean;
  error: Error | null;
  importModule: () => Promise<T | null>;
}

export function useDynamicImport<T>(
  importFn: () => Promise<T>,
  immediate: boolean = false
): UseDynamicImportResult<T> {
  const [module, setModule] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [hasImported, setHasImported] = useState(false); // Track if import was attempted

  const importModule = useCallback(async (): Promise<T | null> => {
    // Avoid re-importing if already loaded or currently loading
    if (module || loading) return module; 
    
    setHasImported(true); // Mark as attempted
    setLoading(true);
    setError(null);
    
    try {
      const importedModule = await importFn();
      setModule(importedModule);
      return importedModule;
    } catch (err) {
      console.error("Dynamic import failed:", err); // Log error
      setError(err instanceof Error ? err : new Error('Failed to load module'));
      return null;
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importFn, module, loading]); // Dependencies for useCallback

  useEffect(() => {
    // Import immediately if requested and not already attempted/loaded
    if (immediate && !hasImported && !module) {
      importModule();
    }
  }, [immediate, importModule, hasImported, module]);

  return { module, loading, error, importModule };
}

// --- Specific Library Hooks ---

type AnimationLibrary = 'gsap' | 'three' | 'lottie';
type GSAPPlugin = 'ScrollTrigger' | 'MotionPathPlugin' | 'DrawSVGPlugin'; // Extend as needed

// Generic type for animation library modules (adjust if specific types are known)
type AnimationModuleType = any; 
type GSAPPluginType = any; 

export function useAnimationLibrary(
  libraryName: AnimationLibrary,
  immediate: boolean = false
) {
  const getImportFn = useCallback(() => {
    switch (libraryName) {
      case 'gsap':
        return () => import('gsap');
      case 'three':
        return () => import('three');
      case 'lottie':
        // Lottie often exports as default, handle that
        return () => import('lottie-web').then(mod => mod.default || mod); 
      default:
         // Throw error for unknown library during development
        if (process.env.NODE_ENV === 'development') {
             throw new Error(`Unknown library requested for dynamic import: ${libraryName}`);
        }
        // Return a promise resolving to null in production to avoid crashing
        console.error(`Unknown library requested for dynamic import: ${libraryName}`);
        return () => Promise.resolve(null as AnimationModuleType);
    }
  }, [libraryName]);
  
  return useDynamicImport<AnimationModuleType>(getImportFn(), immediate);
}


export function useGSAPPlugin(
  pluginName: GSAPPlugin,
  immediate: boolean = false
) {
  const getImportFn = useCallback(async () => {
     // Ensure GSAP core is loaded first
    const gsap = await import('gsap').then(mod => mod.gsap); // Ensure we get the gsap object
    if (!gsap) throw new Error("GSAP core failed to load.");

    let pluginModule: any;
    switch (pluginName) {
      case 'ScrollTrigger':
        pluginModule = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(pluginModule.ScrollTrigger);
        return pluginModule.ScrollTrigger as GSAPPluginType;
      case 'MotionPathPlugin':
         pluginModule = await import('gsap/MotionPathPlugin');
         gsap.registerPlugin(pluginModule.MotionPathPlugin);
        return pluginModule.MotionPathPlugin as GSAPPluginType;
      // Add cases for other plugins like DrawSVGPlugin if needed
      // case 'DrawSVGPlugin':
      //   pluginModule = await import('gsap/DrawSVGPlugin');
      //   gsap.registerPlugin(pluginModule.DrawSVGPlugin);
      //   return pluginModule.DrawSVGPlugin as GSAPPluginType;
      default:
        if (process.env.NODE_ENV === 'development') {
            throw new Error(`Unknown GSAP plugin requested: ${pluginName}`);
        }
        console.error(`Unknown GSAP plugin requested: ${pluginName}`);
        return null as GSAPPluginType;
    }
  }, [pluginName]); // Dependency for useCallback

  return useDynamicImport<GSAPPluginType>(getImportFn, immediate);
}