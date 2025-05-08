import { useEffect, lazy, Suspense } from 'react';
import { setupGSAPAnimations } from '@/lib/animation';
import { isLowEndDevice } from '@/lib/utils';
import { loadScrollTrigger } from '@/lib/animation-loader';
import { animationPreset } from '@/lib/performance-aware-animation';
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
  <div className="w-full py-24 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  // Initialize GSAP animations with performance optimizations
  useEffect(() => {
    // Check if device is low-end to reduce animation complexity
    const lowEnd = isLowEndDevice();
    
    // Dynamically load ScrollTrigger only when needed
    const initializeAnimations = async () => {
      try {
        // Load ScrollTrigger plugin on-demand
        if (!lowEnd) {
          await loadScrollTrigger();
        }
        
        // Initialize GSAP animations with performance settings
        setupGSAPAnimations();
        
        // Log device capability for debugging
        console.log(`Animation mode: ${lowEnd ? 'reduced' : 'full'}`);
      } catch (error) {
        console.error('Failed to initialize animations:', error);
      }
    };
    
    initializeAnimations();
    
    // Add button ripple effect - but only on capable devices
    const addRippleEffect = () => {
      // Skip effect on low-end devices
      if (lowEnd) return;
      
      const buttons = document.querySelectorAll('.btn-effect');
      
      buttons.forEach(button => {
        button.addEventListener('mousedown', function(e: any) {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const ripple = document.createElement('span');
          ripple.className = 'ripple-effect';
          ripple.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.7);
            transform: translate(-50%, -50%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.5;
            will-change: transform, opacity;
            animation: ripple ${lowEnd ? '0.4s' : '0.6s'} ease-out;
          `;
          
          button.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, lowEnd ? 400 : 600);
        });
      });
    };
    
    addRippleEffect();
    
    // Add keyframes for ripple effect
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // Clean up
      const style = document.getElementById('ripple-keyframes');
      if (style) {
        style.remove();
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen theme-transition">
      <Header />
      <HeroSection />
      
      {/* Lazy-loaded sections with Suspense fallbacks */}
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
      
      <Suspense fallback={<SectionPlaceholder />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
