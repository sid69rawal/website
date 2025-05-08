import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { fadeInVariants, slideUpVariants } from '@/lib/animation';

const HeroSection = () => {
  const controls = useAnimation();
  const shapesRef = useRef<HTMLDivElement>(null);
  
  // Animate in on mount
  useEffect(() => {
    controls.start('visible');
    
    // Animate abstract shapes
    const animateShapes = () => {
      if (!shapesRef.current) return;
      
      const shapes = shapesRef.current.querySelectorAll('.shape');
      
      shapes.forEach((shape) => {
        gsap.to(shape, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-20, 20),
          duration: 3,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.to(shape, {
              x: gsap.utils.random(-30, 30),
              y: gsap.utils.random(-20, 20),
              duration: 3,
              ease: 'power1.inOut',
            });
          },
          repeat: -1,
          yoyo: true,
        });
      });
    };
    
    animateShapes();
    
    return () => {
      gsap.killTweensOf(shapesRef.current?.querySelectorAll('.shape'));
    };
  }, [controls]);
  
  return (
    <section className="relative h-screen flex items-center" id="hero">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 dark:from-primary/20 dark:to-secondary/10 z-0"></div>
      
      {/* Abstract shapes */}
      <div ref={shapesRef} className="absolute inset-0 overflow-hidden">
        <div className="shape absolute w-64 h-64 rounded-full bg-primary/10 blur-xl" style={{ top: '15%', left: '10%' }}></div>
        <div className="shape absolute w-96 h-96 rounded-full bg-secondary/10 blur-xl" style={{ bottom: '10%', right: '5%' }}></div>
        <div className="shape absolute w-48 h-48 rounded-full bg-accent/10 blur-xl" style={{ top: '20%', right: '20%' }}></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            variants={fadeInVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            Crafting <span className="text-primary">World-Class</span> Web Animations
          </motion.h1>
          
          <motion.p
            id="hero-subtitle"
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
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
            <a 
              href="#showcase" 
              className={cn(
                "btn-effect px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg",
                "font-medium transition-all duration-200 shadow-lg hover:shadow-primary/50",
                "transform hover:-translate-y-1 relative overflow-hidden"
              )}
            >
              View Our Work
            </a>
            
            <a 
              href="#contact" 
              className={cn(
                "px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10",
                "rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1"
              )}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
        
        {/* Hero scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
