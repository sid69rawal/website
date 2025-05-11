"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react'; // Import all for dynamic access
import type { ElementType } from 'react';
import { siteConfig, ServiceConfig, serviceIconMap } from '@/config/site'; // Import ServiceConfig

if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import Lucide icons
const IconComponents = LucideIcons as unknown as { [key: string]: React.FC<LucideIcons.LucideProps> };

const getValidIconComponent = (iconName: keyof typeof serviceIconMap, serviceTitle: string): ElementType => {
  const Icon = IconComponents[iconName];
  if (!Icon) {
    console.warn(`Icon "${iconName}" for service "${serviceTitle}" not found. Defaulting to 'Package'.`);
    return IconComponents.Package; // Default fallback icon
  }
  return Icon;
};

const ServicesSection = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
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
    if (isIntersecting && typeof window !== 'undefined' && gsap && ScrollTrigger) {
      const serviceCards = gsap.utils.toArray('.service-card-item') as HTMLElement[];

      serviceCards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: (index % 3) * 0.15,
          }
        );
      });
    }
  }, [isIntersecting]);

  const servicesToDisplay = siteConfig.allServices.filter(
    service => service.slug !== "website-maintenance-support" // Exclude if needed
  );

  return (
    <section id="services" className="py-20 md:py-24 lg:py-28 bg-background dark:bg-gray-950 theme-transition">
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef}
          className="text-center mb-16 md:mb-20"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 text-foreground">{siteConfig.servicesSection.title}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {siteConfig.servicesSection.subtitle}
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {servicesToDisplay.map((service: ServiceConfig, index: number) => {
            const IconComponent = getValidIconComponent(service.iconName as keyof typeof serviceIconMap, service.title);
            
            // Determine icon background and text color - can be part of siteConfig if varied per service
            const iconBgColor = index % 3 === 0 ? 'bg-primary/10 dark:bg-primary/20' : index % 3 === 1 ? 'bg-secondary/10 dark:bg-secondary/20' : 'bg-accent/10 dark:bg-accent/20';
            const iconColor = index % 3 === 0 ? 'text-primary' : index % 3 === 1 ? 'text-secondary' : 'text-accent';
            const linkColor = index % 3 === 0 ? 'text-primary hover:text-primary/80' : index % 3 === 1 ? 'text-secondary hover:text-secondary/80' : 'text-accent hover:text-accent/80';


            return (
              <div
                key={service.slug}
                className={cn(
                  "service-card-item bg-card dark:bg-gray-800 rounded-xl shadow-lg p-8 theme-transition",
                  "flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group card-hover",
                  "opacity-0"
                )}
              >
                <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md", iconBgColor)}>
                  <IconComponent className={cn("w-8 h-8", iconColor)} />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">
                  {service.shortDescription}
                </p>
                <Link href={service.link} className={cn(
                  "font-medium inline-flex items-center group mt-auto text-sm",
                  linkColor,
                  "transition-colors duration-200"
                )}>
                  Learn more
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;