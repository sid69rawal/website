"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { fadeInVariants, slideUpVariants } from '@/lib/animation';
import Link from 'next/link';

const HeroSection = () => {
  const controls = useAnimation();
  const shapesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start('visible');
    
    const animateShapes = () => {
      if (!shapesRef.current) return;
      const shapes = shapesRef.current.querySelectorAll('.shape');
      
      shapes.forEach((shapeEl) => {
        const shape = shapeEl as HTMLElement; // Type assertion
        gsap.to(shape, {
          x: () => gsap.utils.random(-30, 30, 1), // Ensure random values are numbers
          y: () => gsap.utils.random(-20, 20, 1),
          scale: () => gsap.utils.random(0.8, 1.2, 0.1),
          opacity: () => gsap.utils.random(0.3, 0.7, 0.1),
          duration: gsap.utils.random(3, 5, 1),
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    };
    
    // Ensure GSAP is available and then animate
    if (typeof window !== "undefined" && gsap) {
      animateShapes();
    }
    
    return () => {
      if (shapesRef.current) {
        const shapes = shapesRef.current.querySelectorAll('.shape');
        shapes.forEach(shape => gsap.killTweensOf(shape));
      }
    };
  }, [controls]);
  
  return (
    <section className="relative h-screen flex items-center justify-center" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:via-background dark:to-secondary/10 z-0 overflow-hidden">
        <div ref={shapesRef} className="absolute inset-0">
          <div className="shape absolute w-64 h-64 rounded-full bg-primary/10 dark:bg-primary/20 blur-2xl filter" style={{ top: '15%', left: '10%', opacity: 0.5 }}></div>
          <div className="shape absolute w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-2xl filter" style={{ bottom: '10%', right: '5%', opacity: 0.4 }}></div>
          <div className="shape absolute w-48 h-48 rounded-full bg-accent/10 dark:bg-accent/20 blur-xl filter" style={{ top: '20%', right: '20%', opacity: 0.6 }}></div>
           {/* Add more shapes for variety */}
          <div className="shape absolute w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/10 blur-lg filter" style={{ top: '50%', left: '30%', opacity: 0.3 }}></div>
          <div className="shape absolute w-72 h-72 rounded-lg bg-secondary/5 dark:bg-secondary/10 blur-xl filter -rotate-45" style={{ bottom: '25%', left: '15%', opacity: 0.25 }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          id="hero-title"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground"
          variants={fadeInVariants}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.3 }}
        >
          Crafting <span className="text-primary">World-Class</span> Web Animations
        </motion.h1>
        
        <motion.p
          id="hero-subtitle"
          className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
          variants={fadeInVariants}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.6 }}
        >
          Transform your digital experience with buttery-smooth, GPU-accelerated animations that captivate and convert.
        </motion.p>
        
        <motion.div
          id="hero-cta"
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          variants={fadeInVariants}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.9 }}
        >
          <Link 
            href="#showcase" 
            className={cn(
              "btn-effect px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover:shadow-primary/50",
              "font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1"
            )}
          >
            View Our Work
          </Link>
          
          <Link 
            href="#contact" 
            className={cn(
              "px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg shadow-sm hover:shadow-primary/30",
              "font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1"
            )}
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
