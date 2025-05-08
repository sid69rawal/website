"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Image from 'next/image'; // Use Next.js Image

// Register ScrollTrigger if not already registered
if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: number;
  icon: string; // Keep Font Awesome class for now
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  dataAiHint?: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: 'fas fa-bolt',
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'GPU-Accelerated Properties',
    description: 'We exclusively use transform and opacity for animations, offloading work to the GPU for silky-smooth 60fps performance even on mobile devices. This prevents jank and ensures buttery animations across all platforms.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Abstract visual representing GPU acceleration',
    dataAiHint: 'abstract technology'
  },
  {
    id: 2,
    icon: 'fas fa-clock',
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Standardized Timing System',
    description: 'Our animations follow a consistent timing pattern: 200ms for simple transitions, 600ms for complex reveals, creating a cohesive motion design system that reinforces your brand and guides user attention.',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Clock illustration representing timing',
    dataAiHint: 'time concept'
  },
  {
    id: 3,
    icon: 'fas fa-chart-line',
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Performance Monitoring',
    description: 'We integrate real-user monitoring (RUM) to track animation performance metrics in the wild, ensuring sub-2.5s Largest Contentful Paint (LCP) and sub-100ms First Input Delay (FID) for all users.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Chart showing performance metrics',
    dataAiHint: 'data analytics'
  },
  {
    id: 4,
    icon: 'fas fa-mobile-alt',
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Responsive Animation Design',
    description: 'Our animations adapt to every screen size, with optimized variants for mobile, tablet, and desktop. We reduce complexity on lower-powered devices while preserving the core experience.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Mobile, tablet, and desktop devices showing responsive design',
    dataAiHint: 'responsive devices'
  },
  {
    id: 5,
    icon: 'fas fa-fingerprint',
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Micro-Interaction System',
    description: 'Every interactive element features carefully crafted micro-animations that provide instant feedback, improve perceived performance, and create moments of delight throughout the user journey.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Close-up of a user interface with interactive elements',
    dataAiHint: 'ui interaction'
  }
];

const FeaturesSection = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null); // Renamed for clarity
  const imageContainerRef = useRef<HTMLDivElement>(null); // For GSAP target
  const [activeFeature, setActiveFeature] = useState<FeatureItem>(features[0]);
  
  const { entry, isIntersecting } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    rootMargin: '-50px',
    freezeOnceVisible: true,
  });
  
  useEffect(() => {
    if (isIntersecting) {
      controls.start('visible');
    }
  }, [controls, isIntersecting]);
  
  useEffect(() => {
    if (!imageContainerRef.current) return;
    
    gsap.to(imageContainerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        // Update image source via state (activeFeature) which triggers re-render
        gsap.to(imageContainerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    });
  }, [activeFeature]); // React to activeFeature state change
  
  useEffect(() => {
    const featureElements = document.querySelectorAll('[data-feature-id]');
    const triggers: ScrollTrigger[] = [];

    featureElements.forEach((element) => {
      const featureId = Number(element.getAttribute('data-feature-id'));
      const feature = features.find(f => f.id === featureId);
      if (!feature) return;

      const st = ScrollTrigger.create({
        trigger: element,
        start: 'top center+=100', // Adjust trigger points
        end: 'bottom center-=100',
        onEnter: () => setActiveFeature(feature),
        onEnterBack: () => setActiveFeature(feature),
        // markers: process.env.NODE_ENV === 'development', // For debugging
      });
      triggers.push(st.scrollTrigger!);
    });
    
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array, runs once
  
  return (
    <section id="features" className="py-24 bg-muted/30 dark:bg-gray-900 theme-transition">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-20"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Our Approach to Animation</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the principles and techniques that drive our world-class web animations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            className="sticky top-24" // Sticky positioning for the image
            variants={slideUpVariants} // You might want a different animation here
            initial="hidden"
            animate={controls}
          >
            <div ref={imageContainerRef} className="bg-card dark:bg-gray-800 p-2 rounded-xl shadow-2xl theme-transition aspect-video relative overflow-hidden">
              {/* Using Next.js Image component */}
              <Image 
                src={activeFeature.image}
                alt={activeFeature.imageAlt}
                data-ai-hint={activeFeature.dataAiHint}
                fill // Use fill for responsive image that covers the container
                style={{ objectFit: 'cover' }} // Ensures image covers while maintaining aspect ratio
                className="rounded-lg transition-opacity duration-300" // Opacity handled by GSAP
                priority={activeFeature.id === 1} // Prioritize first image for LCP
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>
          
          <div className="space-y-12 lg:space-y-16">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                id={`feature-item-${feature.id}`} // Unique ID for each feature item
                data-feature-id={feature.id}
                variants={slideUpVariants}
                initial="hidden"
                animate={controls} // Animate all items together when section is visible
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="flex items-start space-x-5">
                  <div className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 shadow-md", 
                    feature.iconBgColor, 
                    feature.iconColor
                  )}>
                    <i className={cn(feature.icon, "text-2xl md:text-3xl")}></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
