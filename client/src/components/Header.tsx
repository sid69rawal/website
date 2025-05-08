import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Handle header background change on scroll
      setIsScrolled(scrollTop > 50);
      
      // Handle header hide/show on scroll
      if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      
      setLastScrollTop(scrollTop);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <motion.header 
      id="header"
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2" : "py-4",
      )}
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary transition-transform duration-200 transform hover:scale-105">
              MotionCraft<span className="text-accent">.</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="font-medium hover:text-primary transition-colors duration-200">Services</a>
          <a href="#showcase" className="font-medium hover:text-primary transition-colors duration-200">Work</a>
          <a href="#features" className="font-medium hover:text-primary transition-colors duration-200">Features</a>
          <a href="#contact" className="font-medium hover:text-primary transition-colors duration-200">Contact</a>
          <ThemeToggle />
        </div>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg mx-4 overflow-hidden"
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: 'auto', opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-3 space-y-3">
              <a 
                href="#services" 
                className="block font-medium hover:text-primary transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Services
              </a>
              <a 
                href="#showcase" 
                className="block font-medium hover:text-primary transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Work
              </a>
              <a 
                href="#features" 
                className="block font-medium hover:text-primary transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Features
              </a>
              <a 
                href="#contact" 
                className="block font-medium hover:text-primary transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
              <div className="w-full text-left font-medium">
                <ThemeToggle isMobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
