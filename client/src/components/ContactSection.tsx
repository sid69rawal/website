import { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const entry = useIntersectionObserver(ref, {
    threshold: 0.1,
  });
  
  if (entry?.isIntersecting) {
    controls.start('visible');
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          project: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900 theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            ref={ref}
            className="text-center mb-16"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready to discuss your animation project? Fill out the form below.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-10 theme-transition"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formState.name}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600",
                      "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 theme-transition"
                    )}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formState.email}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600",
                      "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 theme-transition"
                    )}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Type</label>
                <select 
                  id="project" 
                  name="project"
                  value={formState.project}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600",
                    "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                    "focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 theme-transition"
                  )}
                  required
                >
                  <option value="" disabled>Select a project type</option>
                  <option value="website">Website Animation Overhaul</option>
                  <option value="landing">Landing Page Animation</option>
                  <option value="ecommerce">E-commerce Animation Suite</option>
                  <option value="webapp">Web Application UI Motion</option>
                  <option value="3d">3D Interactive Experience</option>
                  <option value="other">Other / Custom Project</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formState.message}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600",
                    "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                    "focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 theme-transition"
                  )}
                  placeholder="Tell us about your project requirements..."
                  required
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className={cn(
                    "btn-effect w-full px-6 py-4 text-white rounded-lg font-medium",
                    "transition-all duration-200 shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1",
                    "flex items-center justify-center relative overflow-hidden",
                    "bg-primary hover:bg-primary/90"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <i className="fas fa-circle-notch fa-spin mr-2"></i> Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center">
                      <i className="fas fa-check mr-2"></i> Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span>Send Message</span>
                      <i className="fas fa-paper-plane ml-2"></i>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
