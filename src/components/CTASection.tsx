"use client";

import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import Link from 'next/link'; 
import { siteConfig } from '@/config/site';

const CTASection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  
  const { entry, isIntersecting } = useIntersectionObserver(ref, { 
    threshold: 0.2,
    freezeOnceVisible: true, 
  });
  
  if (isIntersecting) {
    controls.start('visible');
  }
  
  return (
    <section className="py-20 md:py-24 lg:py-28 relative overflow-hidden bg-gradient-to-br from-primary to-secondary dark:from-primary/90 dark:to-secondary/90 theme-transition"> {/* Increased py padding */}
      <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-[0.03] z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM0-30V0h-2v4h-4v2h4v4h2V6h4V4H0zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-white"> {/* Increased mb */}
            {siteConfig.ctaSection.title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 md:mb-12 leading-relaxed"> {/* Increased mb */}
            {siteConfig.ctaSection.subtitle}
          </p>
          <Link 
            href={siteConfig.ctaSection.buttonLink} 
            className={cn(
              "btn-effect inline-block px-10 py-4 bg-white hover:bg-gray-100 text-primary rounded-lg shadow-xl hover:shadow-2xl",
              "font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-white/50"
            )}
          >
            {siteConfig.ctaSection.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
