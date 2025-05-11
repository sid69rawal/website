"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Search, LayoutTemplate, Smartphone, Zap, ShieldCheck } from 'lucide-react'; 
import type { ElementType } from 'react';
import { siteConfig } from '@/config/site';
import { AspectRatio } from "@/components/ui/aspect-ratio";


if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: number;
  icon: ElementType;
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
    icon: Search,
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Google-Optimized Websites',
    description: 'We build websites with SEO best practices at their core, ensuring your business gets found by customers actively searching on Google. Higher visibility means more leads and sales.',
    image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Team working on SEO strategy with charts',
    dataAiHint: 'seo strategy'
  },
  {
    id: 2,
    icon: LayoutTemplate,
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Conversion-Focused Design',
    description: 'Our designs are not just visually appealing; they are strategically crafted to guide visitors towards taking action, whether it’s making a purchase, filling a form, or contacting you.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Website design showing clear call to action buttons',
    dataAiHint: 'website cta'
  },
  {
    id: 3,
    icon: Smartphone,
    iconBgColor: 'bg-accent/10 dark:bg-accent/20',
    iconColor: 'text-accent',
    title: 'Mobile-First Responsive Design',
    description: 'With a majority of users browsing on mobile, we ensure your website provides a seamless experience on all devices, crucial for user satisfaction and Google rankings.',
    image: 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Website displayed on mobile, tablet, and desktop screens',
    dataAiHint: 'responsive design'
  },
  {
    id: 4,
    icon: Zap,
    iconBgColor: 'bg-primary/10 dark:bg-primary/20',
    iconColor: 'text-primary',
    title: 'Fast Loading Speeds',
    description: 'Page speed is a critical ranking factor and vital for user experience. We optimize every aspect of your site for lightning-fast load times, reducing bounce rates.',
    image: 'https://images.unsplash.com/photo-1551818255-e6e1097514cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Abstract visual representing speed and performance',
    dataAiHint: 'speed performance'
  },
  {
    id: 5,
    icon: ShieldCheck, 
    iconBgColor: 'bg-secondary/10 dark:bg-secondary/20',
    iconColor: 'text-secondary',
    title: 'Secure & Reliable Platforms',
    description: 'We build on robust and secure technologies, implementing best practices to protect your website and customer data, fostering trust and credibility.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    imageAlt: 'Abstract visual representing data security and protection',
    dataAiHint: 'data security'
  }
];

const FeaturesSection = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
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
        gsap.to(imageContainerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    });
  }, [activeFeature]);
  
  useEffect(() => {
    const featureElements = document.querySelectorAll('[data-feature-id]');
    const triggers: ScrollTrigger[] = [];

    featureElements.forEach((element) => {
      const featureId = Number(element.getAttribute('data-feature-id'));
      const feature = features.find(f => f.id === featureId);
      if (!feature) return;

      const st = ScrollTrigger.create({
        trigger: element,
        start: 'top center+=100',
        end: 'bottom center-=100',
        onEnter: () => setActiveFeature(feature),
        onEnterBack: () => setActiveFeature(feature),
      });
      if (st) { 
        triggers.push(st);
      }
    });
    
    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="features" className="py-20 md:py-24 lg:py-28 bg-muted/30 dark:bg-gray-900 theme-transition"> {/* Increased py padding */}
      <div className="container mx-auto px-6">
        <motion.div 
          ref={sectionRef}
          className="text-center mb-16 md:mb-20" // Consistent with other sections
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 text-foreground">{siteConfig.featuresSection.title}</h2> {/* Increased mb */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {siteConfig.featuresSection.subtitle}
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <motion.div
            className="w-full lg:w-1/2 lg:sticky lg:top-24 mb-10 lg:mb-0" 
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
          >
            <div ref={imageContainerRef} className="bg-card dark:bg-gray-800 p-2 rounded-xl shadow-2xl theme-transition relative overflow-hidden">
              <AspectRatio ratio={4/3} className="rounded-lg overflow-hidden"> {/* Enforce aspect ratio */}
                <Image 
                  src={activeFeature.image}
                  alt={activeFeature.imageAlt}
                  data-ai-hint={activeFeature.dataAiHint}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-opacity duration-300"
                  priority={activeFeature.id === 1}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </AspectRatio>
            </div>
          </motion.div>
          
          <div className="w-full lg:w-1/2 space-y-10 md:space-y-12 lg:space-y-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div 
                  key={feature.id}
                  id={`feature-item-${feature.id}`}
                  data-feature-id={feature.id}
                  variants={slideUpVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="flex items-start space-x-4 md:space-x-5">
                    <div className={cn(
                      "w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 shadow-md", 
                      feature.iconBgColor, 
                      feature.iconColor
                    )}>
                      <IconComponent className="text-xl md:text-3xl w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-2.5 text-foreground">{feature.title}</h3> {/* Adjusted mb */}
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
