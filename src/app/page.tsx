
"use client"; // Home.tsx needs to be a client component due to hooks and event listeners

import type { Metadata } from 'next';
import { useEffect, lazy, Suspense } from 'react';
import { setupGSAPAnimations } from '@/lib/animation';
import { isLowEndDevice } from '@/lib/utils'; // Assuming this is correctly determining device capability
import { loadScrollTrigger } from '@/lib/animation-loader';
// import { animationPreset } from '@/lib/performance-aware-animation'; // Not directly used here
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { siteConfig } from '@/config/site';

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

// It's generally better to export metadata from server components or layout files.
// However, if this page needs to be client-rendered but still wants to influence metadata,
// this is one way, though dynamic metadata modification from client components has limitations.
// For static metadata, it's best in layout.tsx or making this page a server component if possible.
// As a workaround for a client component, we can set it, but it might not be ideal for SSR/SEO.

// export const metadata: Metadata = {
//   title: siteConfig.title, // Default title from layout will be used if not overridden
//   description: "GetUrBizOnline offers expert web design and SEO services in Toronto & India to help your business get found on Google and attract more customers. Get a free quote!",
// };
// Let's remove the metadata export here as it's a client component.
// Metadata should be in layout or a server component.
// For now, the default metadata from RootLayout will apply.
// If specific metadata for this page is needed, consider refactoring or using Head for client-side updates.


export default function HomePage() {
  // Initialize GSAP animations with performance optimizations
  useEffect(() => {
    // For client components, document.title can be used if direct metadata export isn't feasible.
    document.title = siteConfig.title; // Sets the tab title
    // For meta description, you'd typically use next/head or handle it server-side.
    // Let's assume meta description is handled by the layout for now.

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
      document.querySelectorAll('.btn-effect').forEach(buttonEl => {
        const button = buttonEl as HTMLElement; 
        const existingListener = (button as any).__rippleListener;
        if (existingListener) {
          button.removeEventListener('mousedown', existingListener as EventListener);
        }

        const listener = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const ripple = document.createElement('span');
          ripple.className = 'ripple-effect'; 
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          button.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600); 
        };
        
        (button as any).__rippleListener = listener;
        button.addEventListener('mousedown', listener as EventListener);
      });
    };
    
    addRippleEffect();

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

// For static export of metadata for this page, it should be defined outside the component
// and the component should ideally be a Server Component or use `generateMetadata` function.
// Since HomePage is a client component, we'll update metadata in `layout.tsx` or relevant server parent.
// For this exercise, I will update the default metadata in layout.tsx to be more specific to the homepage.
// And add specific metadata objects to other static pages.
