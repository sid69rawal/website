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
import { siteConfig } from '@/config/site';

const ContactSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { entry, isIntersecting } = useIntersectionObserver(ref, {
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  if (isIntersecting) {
    controls.start('visible');
  }
  
  const formSubmitEmail = siteConfig.formSubmit.email;
  const redirectUrl = `${siteConfig.url}${siteConfig.formSubmit.thankYouPage}`; 

  return (
    <section id="contact" className="py-20 md:py-24 lg:py-28 bg-muted/30 dark:bg-gray-900 theme-transition"> {/* Increased py padding */}
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            ref={ref}
            className="text-center mb-16 md:mb-20" // Increased bottom margin
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 text-foreground">{siteConfig.contactSection.title}</h2> {/* Increased mb */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              {siteConfig.contactSection.subtitle}
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-10 lg:p-12 theme-transition" // Increased padding
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <form 
              ref={formRef} 
              action={`https://formsubmit.co/${formSubmitEmail}`} 
              method="POST" 
              className="space-y-8" // Increased space-y
            >
              <input type="hidden" name="_subject" value={siteConfig.formSubmit.subject} />
              <input type="hidden" name="_captcha" value="false" /> 
              <input type="hidden" name="_next" value={redirectUrl} /> 
              <input type="hidden" name="_template" value="table" />


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"> {/* Increased gap */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{siteConfig.contactSection.formFields.name}</label> {/* Increased mb */}
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="bg-background dark:bg-gray-700"
                    placeholder="Your name"
                    required
                    aria-label={siteConfig.contactSection.formFields.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{siteConfig.contactSection.formFields.email}</label> {/* Increased mb */}
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="bg-background dark:bg-gray-700"
                    placeholder="your.email@example.com"
                    required
                    aria-label={siteConfig.contactSection.formFields.email}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-foreground mb-2">{siteConfig.contactSection.formFields.projectInterest}</label> {/* Increased mb */}
                <Select name="project" required>
                  <SelectTrigger className="w-full bg-background dark:bg-gray-700" aria-label="Project Type">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {siteConfig.contactSection.formFields.projectOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{siteConfig.contactSection.formFields.message}</label> {/* Increased mb */}
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  className="bg-background dark:bg-gray-700"
                  placeholder="Tell us a bit about your project, goals, and any current website (if applicable)..."
                  required
                  aria-label={siteConfig.contactSection.formFields.message}
                ></Textarea>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full px-6 py-3.5 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1", // Increased py
                    "flex items-center justify-center relative overflow-hidden btn-effect", 
                  )}
                  aria-live="polite" 
                >
                  {siteConfig.contactSection.formFields.submitButtonText} <Send className="ml-2 h-5 w-5" />
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
