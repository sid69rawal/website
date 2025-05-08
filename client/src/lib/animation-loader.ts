import { loadScript } from './utils';

// Track loading status
const loadingStatus = {
  gsapCore: false,
  scrollTrigger: false,
  motionPath: false,
  lottie: false,
  three: false
};

// GSAP Core
export async function loadGSAP(): Promise<typeof import('gsap')> {
  if (!loadingStatus.gsapCore) {
    try {
      // For production, consider loading from CDN instead
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
      const gsap = await import('gsap');
      loadingStatus.gsapCore = true;
      return gsap;
    } catch (error) {
      console.error('Failed to load GSAP core:', error);
      throw error;
    }
  }
  return import('gsap');
}

// ScrollTrigger plugin
export async function loadScrollTrigger(): Promise<any> {
  if (!loadingStatus.gsapCore) {
    await loadGSAP();
  }
  
  if (!loadingStatus.scrollTrigger) {
    try {
      // For production, consider loading from CDN instead
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = await import('gsap');
      gsap.gsap.registerPlugin(ScrollTrigger);
      loadingStatus.scrollTrigger = true;
      return ScrollTrigger;
    } catch (error) {
      console.error('Failed to load ScrollTrigger:', error);
      throw error;
    }
  }
  return (await import('gsap/ScrollTrigger')).ScrollTrigger;
}

// MotionPath plugin
export async function loadMotionPath(): Promise<any> {
  if (!loadingStatus.gsapCore) {
    await loadGSAP();
  }
  
  if (!loadingStatus.motionPath) {
    try {
      // For production, consider loading from CDN instead
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MotionPathPlugin.min.js');
      const { MotionPathPlugin } = await import('gsap/MotionPathPlugin');
      const gsap = await import('gsap');
      gsap.gsap.registerPlugin(MotionPathPlugin);
      loadingStatus.motionPath = true;
      return MotionPathPlugin;
    } catch (error) {
      console.error('Failed to load MotionPath:', error);
      throw error;
    }
  }
  return (await import('gsap/MotionPathPlugin')).MotionPathPlugin;
}

// Lottie
export async function loadLottie(): Promise<any> {
  if (!loadingStatus.lottie) {
    try {
      // For production, consider loading from CDN instead
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js');
      const lottie = await import('lottie-web');
      loadingStatus.lottie = true;
      return lottie.default;
    } catch (error) {
      console.error('Failed to load Lottie:', error);
      throw error;
    }
  }
  return (await import('lottie-web')).default;
}

// Three.js
export async function loadThree(): Promise<any> {
  if (!loadingStatus.three) {
    try {
      // For production, consider loading from CDN instead
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.158.0/three.min.js');
      const THREE = await import('three');
      loadingStatus.three = true;
      return THREE;
    } catch (error) {
      console.error('Failed to load Three.js:', error);
      throw error;
    }
  }
  return import('three');
}