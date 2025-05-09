
"use client"; // Home.tsx needs to be a client component due to hooks and event listeners

import { useEffect, lazy, Suspense } from 'react';
import { setupGSAPAnimations } from '@/lib/animation';
import { isLowEndDevice } from '@/lib/utils'; // Assuming this is correctly determining device capability
import { loadScrollTrigger } from '@/lib/animation-loader';
// import { animationPreset } from '@/lib/performance-aware-animation'; // Not directly used here
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

// Lazy load non-critical sections for faster initial render
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const ShowcaseSection = lazy(() => import('@/components/ShowcaseSection'));
const FeaturesSection = lazy(() => import('@/components/FeaturesSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

// Placeholder loading component
const SectionPlaceholder = () => (
  <div className="w-full py-24 flex items-center justify-center min-h-[300px]">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function HomePage() {
  // Initialize GSAP animations with performance optimizations
  useEffect(() => {
    const lowEnd = isLowEndDevice();
    
    const initializeAnimations = async () => {
      try {
        if (!lowEnd) {
          await loadScrollTrigger();
        }
        setupGSAPAnimations();
        console.log(`Animation mode: ${lowEnd ? 'reduced' : 'full'}`);
      } catch (error) {
        console.error('Failed to initialize animations:', error);
      }
    };
    
    initializeAnimations();
    
    // Add button ripple effect
    const addRippleEffect = () => {
      // Logic adapted for Next.js, ensure 'btn-effect' class exists on target buttons
      document.querySelectorAll('.btn-effect').forEach(buttonEl => {
        const button = buttonEl as HTMLElement; // Type assertion for button element
        const existingListener = (button as any).__rippleListener;
        if (existingListener) {
          button.removeEventListener('mousedown', existingListener as EventListener);
        }

        const listener = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const ripple = document.createElement('span');
          // Use a class that's defined in globals.css for the ripple itself
          ripple.className = 'ripple-effect'; 
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          button.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600); // Match animation duration in globals.css
        };
        
        (button as any).__rippleListener = listener;
        button.addEventListener('mousedown', listener as EventListener);
      });
    };
    
    addRippleEffect();

    // Ripple animation CSS is now in globals.css, no need to inject style element.

  }, []);
  
  return (
    <div className="min-h-screen theme-transition">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionPlaceholder />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <ShowcaseSection />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <CTASection />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionPlaceholder />}>
        <Footer />
      </Suspense>
    </div>
  );
}

