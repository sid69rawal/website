import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { staggerContainerVariants, slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';

interface ServiceItem {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  linkColor: string;
}

const services: ServiceItem[] = [
  {
    icon: 'fas fa-layer-group',
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'CSS Animation Mastery',
    description: 'High-performance animations using GPU-accelerated properties like transform and opacity for buttery-smooth 60fps experiences.',
    linkColor: 'text-primary'
  },
  {
    icon: 'fas fa-code',
    iconBgColor: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'GSAP Timeline Magic',
    description: 'Complex, sequence-based animations with precise control using the industry-leading GreenSock Animation Platform.',
    linkColor: 'text-secondary'
  },
  {
    icon: 'fas fa-cubes',
    iconBgColor: 'bg-accent/10',
    iconColor: 'text-accent',
    title: 'Three.js 3D Experiences',
    description: 'Immersive WebGL-powered 3D scenes and interactive elements that create memorable, engaging experiences.',
    linkColor: 'text-accent'
  },
  {
    icon: 'fas fa-vector-square',
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Lottie Vector Animations',
    description: 'Crisp, resolution-independent animations exported from After Effects for lightweight, scalable motion.',
    linkColor: 'text-primary'
  },
  {
    icon: 'fas fa-tachometer-alt',
    iconBgColor: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Performance Optimization',
    description: 'Animation auditing and optimization to ensure sub-2.5s LCP and smooth 60fps performance across all devices.',
    linkColor: 'text-secondary'
  },
  {
    icon: 'fas fa-paint-brush',
    iconBgColor: 'bg-accent/10',
    iconColor: 'text-accent',
    title: 'Motion Design Systems',
    description: 'Cohesive animation libraries with standardized timings, easings, and patterns that reinforce your brand identity.',
    linkColor: 'text-accent'
  }
];

const ServicesSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: '-50px',
  });
  
  useEffect(() => {
    if (entry?.isIntersecting) {
      controls.start('visible');
    }
  }, [controls, entry]);
  
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900 theme-transition">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          variants={slideUpVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Animation Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Leveraging cutting-edge technology to create immersive, performant animations.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={cn(
                "card-hover bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 theme-transition",
                "transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              )}
              variants={slideUpVariants}
            >
              <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center mb-6", service.iconBgColor, service.iconColor)}>
                <i className={cn(service.icon, "text-2xl")}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
              </p>
              <a href="#" className={cn(service.linkColor, "font-medium inline-flex items-center group")}>
                Learn more 
                <i className="fas fa-arrow-right ml-2 transition-transform duration-200 group-hover:translate-x-1"></i>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
