"use client";

import { loadScript } from './utils'; // Assuming utils.ts is also moved to src/lib

interface LoadingStatus {
  gsapCore: boolean;
  scrollTrigger: boolean;
  motionPath: boolean;
  lottie: boolean;
  three: boolean;
}

const loadingStatus: LoadingStatus = {
  gsapCore: false,
  scrollTrigger: false,
  motionPath: false,
  lottie: false,
  three: false
};

// GSAP Core
export async function loadGSAP(): Promise<typeof import('gsap')> {
  if (typeof window === "undefined") return Promise.reject(new Error("GSAP can only be loaded in the browser."));
  if (loadingStatus.gsapCore && (window as any).gsap) return Promise.resolve((window as any).gsap);

  try {
    // Using dynamic import for tree-shaking and modern ESM handling
    const gsapModule = await import('gsap');
    (window as any).gsap = gsapModule.gsap; // Make globally accessible if needed by plugins not explicitly imported
    loadingStatus.gsapCore = true;
    return gsapModule;
  } catch (error) {
    console.error('Failed to load GSAP core:', error);
    throw error;
  }
}

// ScrollTrigger plugin
export async function loadScrollTrigger(): Promise<typeof import('gsap/ScrollTrigger').ScrollTrigger> {
  if (typeof window === "undefined") return Promise.reject(new Error("ScrollTrigger can only be loaded in the browser."));
  if (!loadingStatus.gsapCore) {
    await loadGSAP();
  }
  if (loadingStatus.scrollTrigger && (window as any).ScrollTrigger) return Promise.resolve((window as any).ScrollTrigger);
  
  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const gsap = (window as any).gsap || (await import('gsap')).gsap; // Ensure gsap is available
    gsap.registerPlugin(ScrollTrigger);
    (window as any).ScrollTrigger = ScrollTrigger;
    loadingStatus.scrollTrigger = true;
    return ScrollTrigger;
  } catch (error) {
    console.error('Failed to load ScrollTrigger:', error);
    throw error;
  }
}

// MotionPath plugin
export async function loadMotionPath(): Promise<typeof import('gsap/MotionPathPlugin').MotionPathPlugin> {
   if (typeof window === "undefined") return Promise.reject(new Error("MotionPathPlugin can only be loaded in the browser."));
  if (!loadingStatus.gsapCore) {
    await loadGSAP();
  }
  if (loadingStatus.motionPath && (window as any).MotionPathPlugin) return Promise.resolve((window as any).MotionPathPlugin);

  try {
    const { MotionPathPlugin } = await import('gsap/MotionPathPlugin');
    const gsap = (window as any).gsap || (await import('gsap')).gsap;
    gsap.registerPlugin(MotionPathPlugin);
    (window as any).MotionPathPlugin = MotionPathPlugin;
    loadingStatus.motionPath = true;
    return MotionPathPlugin;
  } catch (error) {
    console.error('Failed to load MotionPathPlugin:', error);
    throw error;
  }
}

// Lottie
export async function loadLottie(): Promise<any> { // Lottie doesn't have great default export typing
  if (typeof window === "undefined") return Promise.reject(new Error("Lottie can only be loaded in the browser."));
  if (loadingStatus.lottie && (window as any).lottie) return Promise.resolve((window as any).lottie);

  try {
    const lottie = await import('lottie-web');
    (window as any).lottie = lottie.default; // lottie-web typically exports as default
    loadingStatus.lottie = true;
    return lottie.default;
  } catch (error) {
    console.error('Failed to load Lottie:', error);
    throw error;
  }
}

// Three.js
export async function loadThree(): Promise<typeof import('three')> {
  if (typeof window === "undefined") return Promise.reject(new Error("Three.js can only be loaded in the browser."));
  if (loadingStatus.three && (window as any).THREE) return Promise.resolve((window as any).THREE);
  
  try {
    const THREE = await import('three');
    (window as any).THREE = THREE;
    loadingStatus.three = true;
    return THREE;
  } catch (error) {
    console.error('Failed to load Three.js:', error);
    throw error;
  }
}
