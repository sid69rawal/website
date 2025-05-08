import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  id: number;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  image: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: 'fas fa-bolt',
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'GPU-Accelerated Properties',
    description: 'We exclusively use transform and opacity for animations, offloading work to the GPU for silky-smooth 60fps performance even on mobile devices. This prevents jank and ensures buttery animations across all platforms.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    id: 2,
    icon: 'fas fa-clock',
    iconBgColor: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Standardized Timing System',
    description: 'Our animations follow a consistent timing pattern: 200ms for simple transitions, 600ms for complex reveals, creating a cohesive motion design system that reinforces your brand and guides user attention.',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    id: 3,
    icon: 'fas fa-chart-line',
    iconBgColor: 'bg-accent/10',
    iconColor: 'text-accent',
    title: 'Performance Monitoring',
    description: 'We integrate real-user monitoring (RUM) to track animation performance metrics in the wild, ensuring sub-2.5s Largest Contentful Paint (LCP) and sub-100ms First Input Delay (FID) for all users.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    id: 4,
    icon: 'fas fa-mobile-alt',
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Responsive Animation Design',
    description: 'Our animations adapt to every screen size, with optimized variants for mobile, tablet, and desktop. We reduce complexity on lower-powered devices while preserving the core experience.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  },
  {
    id: 5,
    icon: 'fas fa-fingerprint',
    iconBgColor: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Micro-Interaction System',
    description: 'Every interactive element features carefully crafted micro-animations that provide instant feedback, improve perceived performance, and create moments of delight throughout the user journey.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
  }
];

const FeaturesSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeFeature, setActiveFeature] = useState<number>(1);
  
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '-50px',
  });
  
  useEffect(() => {
    if (entry?.isIntersecting) {
      controls.start('visible');
    }
  }, [controls, entry]);
  
  useEffect(() => {
    if (!imageRef.current) return;
    
    // Handle feature image changes with smooth transition
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (!imageRef.current) return;
        
        // Find the active feature
        const feature = features.find(f => f.id === activeFeature);
        if (feature) {
          imageRef.current.src = feature.image;
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.3
          });
        }
      }
    });
  }, [activeFeature]);
  
  useEffect(() => {
    // Setup scroll triggers for each feature item
    const featureElements = document.querySelectorAll('[data-feature-id]');
    
    featureElements.forEach((element) => {
      const featureId = Number(element.getAttribute('data-feature-id'));
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveFeature(featureId),
        onEnterBack: () => setActiveFeature(featureId)
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900 theme-transition">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Animation Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our technical approach to creating world-class animations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Feature image - GPU Acceleration */}
            <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl theme-transition h-[500px] sticky top-32">
              <img 
                ref={imageRef}
                src={features[0].image}
                alt="Feature"
                className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
                id="feature-image"
              />
            </div>
          </motion.div>
          
          <div className="space-y-16">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                data-feature-id={feature.id}
                className="animate-when-visible"
                variants={slideUpVariants}
                initial="hidden"
                animate={controls}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-start">
                  <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center mr-6 shrink-0", feature.iconBgColor, feature.iconColor)}>
                    <i className={cn(feature.icon, "text-2xl")}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
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
