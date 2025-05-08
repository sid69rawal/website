"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Layers, Code, Cubes, SquareCode, Gauge, Palette, AlertTriangle, ArrowRight } from 'lucide-react'; // Using Lucide icons via direct import

interface ServiceItem {
  icon: React.ElementType; 
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  link: string;
  linkColor: string;
}

const services: ServiceItem[] = [
  {
    icon: Layers,
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'CSS Animation Mastery',
    description: 'High-performance animations using GPU-accelerated properties like transform and opacity for buttery-smooth 60fps experiences.',
    link: '#features', 
    linkColor: 'text-primary hover:text-primary/80'
  },
  {
    icon: Code,
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'GSAP Timeline Magic',
    description: 'Complex, sequence-based animations with precise control using the industry-leading GreenSock Animation Platform.',
    link: '#features',
    linkColor: 'text-secondary hover:text-secondary/80'
  },
  {
    icon: Cubes,
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Three.js 3D Experiences',
    description: 'Immersive WebGL-powered 3D scenes and interactive elements that create memorable, engaging experiences.',
    link: '#features',
    linkColor: 'text-accent hover:text-accent/80'
  },
  {
    icon: SquareCode, 
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Lottie Vector Animations',
    description: 'Crisp, resolution-independent animations exported from After Effects for lightweight, scalable motion graphics.',
    link: '#features',
    linkColor: 'text-primary hover:text-primary/80'
  },
  {
    icon: Gauge,
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Performance Optimization',
    description: 'Animation auditing and optimization to ensure sub-2.5s LCP and smooth 60fps performance across all devices.',
    link: '#features',
    linkColor: 'text-secondary hover:text-secondary/80'
  },
  {
    icon: Palette,
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Motion Design Systems',
    description: 'Cohesive animation libraries with standardized timings, easings, and patterns that reinforce your brand identity.',
    link: '#features',
    linkColor: 'text-accent hover:text-accent/80'
  }
];

const ServicesSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const { entry, isIntersecting } = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '-50px',
    freezeOnceVisible: true, 
  });
  
  useEffect(() => {
    if (isIntersecting) {
      controls.start('visible');
    }
  }, [controls, isIntersecting]);
  
  return (
    <section id="services" className="py-24 bg-background dark:bg-gray-950 theme-transition">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          className="text-center mb-20"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Our Animation Services</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging cutting-edge technology to create immersive, performant animations that elevate your brand.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            if (!IconComponent) {
              // Fallback or error logging if an icon is still undefined
              console.error(`Icon for service "${service.title}" is undefined.`);
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "bg-card dark:bg-gray-800 rounded-xl shadow-lg p-8 theme-transition",
                    "flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                  )}
                  variants={slideUpVariants}
                >
                  <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md", service.iconBgColor)}>
                    <AlertTriangle className={cn("w-8 h-8", service.iconColor)} /> 
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-card-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">
                    {service.description} (Icon loading error)
                  </p>
                  <Link href={service.link} className={cn(
                    "font-medium inline-flex items-center group mt-auto text-sm",
                    service.linkColor,
                    "transition-colors duration-200"
                  )}>
                    Learn more 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            }
            return (
              <motion.div 
                key={index}
                className={cn(
                  "bg-card dark:bg-gray-800 rounded-xl shadow-lg p-8 theme-transition",
                  "flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                )}
                variants={slideUpVariants} 
              >
                <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md", service.iconBgColor)}>
                  <IconComponent className={cn("w-8 h-8", service.iconColor)} />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
                <Link href={service.link} className={cn(
                  "font-medium inline-flex items-center group mt-auto text-sm",
                  service.linkColor,
                  "transition-colors duration-200"
                )}>
                  Learn more 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
