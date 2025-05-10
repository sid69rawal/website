"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Search, LayoutTemplate, Smartphone, TrendingUp, Users, Settings, ArrowRight, Package, Cubes, Palette, Code, Gauge, HelpCircle, Layers } from 'lucide-react';
import type { ElementType } from 'react';

// Define an icon map to ensure bundler picks up the icons correctly
const iconMap = {
  LayoutTemplate,
  Search,
  Smartphone,
  TrendingUp,
  Users,
  Settings,
  ArrowRight,
  Package,
  Cubes,
  Palette,
  Code,
  Gauge,
  HelpCircle,
  Layers
};

interface ServiceItem {
  icon: ElementType; // Uses keyof typeof iconMap if we strictly map, but ElementType is fine if direct components are passed
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  link: string;
  linkColor: string;
}

const services: ServiceItem[] = [
  {
    icon: iconMap.LayoutTemplate,
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Custom Website Design',
    description: 'Professionally designed, user-friendly websites tailored to your brand, built to convert visitors into customers.',
    link: '#contact',
    linkColor: 'text-primary hover:text-primary/80'
  },
  {
    icon: iconMap.Search,
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'SEO & Google Visibility',
    description: 'Improve your search engine rankings and get found by more customers on Google with our expert SEO strategies.',
    link: '#contact',
    linkColor: 'text-secondary hover:text-secondary/80'
  },
  {
    icon: iconMap.Smartphone,
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Responsive Development',
    description: 'Websites that look and perform beautifully on all devices – desktops, tablets, and smartphones – for a seamless user experience.',
    link: '#contact',
    linkColor: 'text-accent hover:text-accent/80'
  },
  {
    icon: iconMap.TrendingUp,
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Conversion Rate Optimization',
    description: 'We analyze user behavior and optimize your website design and content to turn more visitors into paying customers.',
    link: '#contact',
    linkColor: 'text-primary hover:text-primary/80'
  },
  {
    icon: iconMap.Users,
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Lead Generation Websites',
    description: 'Strategically designed websites focused on capturing leads and growing your customer base effectively.',
    link: '#contact',
    linkColor: 'text-secondary hover:text-secondary/80'
  },
  {
    icon: iconMap.Settings, 
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Website Maintenance & Support',
    description: 'Ongoing support and maintenance services to keep your website secure, up-to-date, and performing optimally.',
    link: '#contact',
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
  
  const getValidIconComponent = (iconInput: ElementType | string | undefined | null, serviceTitle: string): ElementType => {
    // Check if iconInput is a function (typical for React components including lucide-react icons)
    // Also check if it's an object with a render method (less common for lucide, but good for general components)
    if (typeof iconInput === 'function' || (typeof iconInput === 'object' && iconInput !== null && 'render' in iconInput)) {
      return iconInput as ElementType;
    }
    // Log an error if the icon is not a valid component type and provide more info
    console.error(
        `Icon input for "${serviceTitle}" is not a valid component. Received type: ${typeof iconInput}, Value:`, 
        iconInput === undefined ? 'undefined' : JSON.stringify(iconInput)
    );
    return iconMap.Package; // Fallback icon
  };


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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Grow Your Business Online</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive web solutions to help you attract customers, enhance your Google presence, and achieve your business goals.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => {
            const IconComponent = getValidIconComponent(service.icon as ElementType, service.title);
            
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
