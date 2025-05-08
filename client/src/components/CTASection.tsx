import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';

const CTASection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  
  const entry = useIntersectionObserver(ref, {
    threshold: 0.2,
  });
  
  if (entry?.isIntersecting) {
    controls.start('visible');
  }
  
  return (
    <section className="py-24 relative overflow-hidden theme-transition">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90 dark:opacity-80 z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10 z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Digital Experience?
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Let's create animations that don't just look great, but drive engagement, reduce bounce rates, and increase conversions.
          </p>
          <a 
            href="#contact" 
            className={cn(
              "inline-block px-8 py-4 bg-white hover:bg-gray-100 text-primary rounded-lg",
              "font-medium transition-all duration-200 shadow-lg transform hover:-translate-y-1"
            )}
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
