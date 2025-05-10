
"use client";

import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react'; 

const ContactSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Removed useState for isPending, isSubmitted, and useTransition as FormSubmit handles submission.
  // Removed useToast as FormSubmit handles success/error feedback typically via redirection.

  const { entry, isIntersecting } = useIntersectionObserver(ref, {
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  if (isIntersecting) {
    controls.start('visible');
  }

  // The handleSubmit function and startTransition are no longer needed with FormSubmit.
  // FormSubmit handles the submission directly via the form's action attribute.
  
  return (
    <section id="contact" className="py-24 bg-muted/30 dark:bg-gray-900 theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            ref={ref}
            className="text-center mb-16"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Let's Build Your Success Online</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Interested in a new website or improving your Google visibility? Fill out the form, and we'll be in touch to discuss how we can help.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-10 theme-transition"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            {/* Updated form action to use FormSubmit.co */}
            <form 
              ref={formRef} 
              action="https://formsubmit.co/sidrawal1200@gmail.com" 
              method="POST" 
              className="space-y-6"
            >
              {/* FormSubmit.co specific hidden inputs */}
              <input type="hidden" name="_subject" value="New Project Inquiry from YourBusinessOnline Website" />
              {/* You can enable captcha on FormSubmit.co dashboard if needed */}
              <input type="hidden" name="_captcha" value="false" /> 
              {/* Optional: customize the thank you page URL. Create this page in your Next.js app. */}
              {/* Replace YOUR_WEBSITE_URL with your actual domain and /thank-you page path */}
              <input type="hidden" name="_next" value="https://yourbusinessonline.dev/thank-you" /> 
              <input type="hidden" name="_template" value="table" />


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="bg-background dark:bg-gray-700"
                    placeholder="Your name"
                    required
                    aria-label="Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="bg-background dark:bg-gray-700"
                    placeholder="your.email@example.com"
                    required
                    aria-label="Email Address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-foreground mb-1.5">I'm interested in...</label>
                <Select name="project" required>
                  <SelectTrigger className="w-full bg-background dark:bg-gray-700" aria-label="Project Type">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_website">New Website Development</SelectItem>
                    <SelectItem value="website_redesign">Website Redesign & SEO</SelectItem>
                    <SelectItem value="seo_services">SEO & Google Visibility Improvement</SelectItem>
                    <SelectItem value="ecommerce_solution">E-commerce Website Solution</SelectItem>
                    <SelectItem value="consultation">General Consultation / Undecided</SelectItem>
                    <SelectItem value="other">Other Specific Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Your Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  className="bg-background dark:bg-gray-700"
                  placeholder="Tell us a bit about your project, goals, and any current website (if applicable)..."
                  required
                  aria-label="Your Message"
                ></Textarea>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full px-6 py-3 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1",
                    "flex items-center justify-center relative overflow-hidden",
                  )}
                  // Removed disabled state as FormSubmit handles this.
                  aria-live="polite" 
                >
                  {/* Removed isPending and isSubmitted logic from button text */}
                  Send Project Inquiry <Send className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
