
"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation'; 
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Search, LayoutTemplate, Smartphone, TrendingUp, Users, Settings, ArrowRight, Package, BoxIcon, Palette, Code, Gauge, HelpCircle, Layers, Briefcase } from 'lucide-react';
import type { ElementType } from 'react';
import { siteConfig } from '@/config/site';


if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Define an icon map to ensure bundler picks up the icons correctly
const iconMap = {
  LayoutTemplate,
  Search,
  Smartphone,
  TrendingUp,
  Users,
  Settings,
  ArrowRight,
  Package, // Fallback
  BoxIcon, 
  Palette,
  Code,
  Gauge,
  HelpCircle,
  Layers,
  Briefcase, // Example: Using Briefcase for "E-commerce Solutions"
};

interface ServiceItem {
  iconName: keyof typeof iconMap; 
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  link: string;
  linkColor: string;
}

const services: ServiceItem[] = [
  {
    iconName: 'LayoutTemplate',
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Custom Website Design',
    description: 'Professionally designed, user-friendly websites tailored to your brand, built to convert visitors into customers.',
    link: '#contact',
    linkColor: 'text-primary hover:text-primary/80'
  },
  {
    iconName: 'Search',
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'SEO & Google Visibility',
    description: 'Improve your search engine rankings and get found by more customers on Google with our expert SEO strategies.',
    link: '#contact',
    linkColor: 'text-secondary hover:text-secondary/80'
  },
  {
    iconName: 'Smartphone',
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Responsive Development',
    description: 'Websites that look and perform beautifully on all devices – desktops, tablets, and smartphones – for a seamless user experience.',
    link: '#contact',
    linkColor: 'text-accent hover:text-accent/80'
  },
  {
    iconName: 'TrendingUp',
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Conversion Rate Optimization',
    description: 'We analyze user behavior and optimize your website design and content to turn more visitors into paying customers.',
    link: '#contact',
    linkColor: 'text-primary hover:text-primary/80'
  },
  {
    iconName: 'Users', 
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Lead Generation Websites',
    description: 'Strategically designed websites focused on capturing leads and growing your customer base effectively.',
    link: '#contact',
    linkColor: 'text-secondary hover:text-secondary/80'
  },
  // {
  //   iconName: 'Settings', 
  //   iconBgColor: 'bg-accent/10 dark:bg-accent/20',
  //   iconColor: 'text-accent',
  //   title: 'Website Maintenance & Support',
  //   description: 'Ongoing support and maintenance services to keep your website secure, up-to-date, and performing optimally.',
  //   link: '#contact',
  //   linkColor: 'text-accent hover:text-accent/80'
  // }
];

const getValidIconComponent = (iconName: keyof typeof iconMap, serviceTitle: string): ElementType => {
  const Icon = iconMap[iconName];
  if (!Icon) {
    console.error(`Icon input for "${serviceTitle}" is null or undefined. Defaulting to 'Package'.`);
    return Package; // Default fallback icon
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

  return (
    <section id="services" className="py-20 md:py-24 lg:py-28 bg-background dark:bg-gray-950 theme-transition"> {/* Increased py padding */}
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef} 
          className="text-center mb-16 md:mb-20" // Increased bottom margin
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 text-foreground">{siteConfig.servicesSection.title}</h2> {/* Increased mb */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {siteConfig.servicesSection.subtitle}
          </p>
        </motion.div>

        
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12" // Increased gap
        >
          {services.map((service, index) => {
            const IconComponent = getValidIconComponent(service.iconName, service.title);
            
            return (
              
              <div
                key={index}
                className={cn(
                  "service-card-item bg-card dark:bg-gray-800 rounded-xl shadow-lg p-8 theme-transition",
                  "flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group",
                  "opacity-0" 
                )}
              >
                <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-md", service.iconBgColor)}>
                  <IconComponent className={cn("w-8 h-8", service.iconColor)} />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-card-foreground">{service.title}</h3> {/* Increased mb */}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
