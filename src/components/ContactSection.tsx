"use client";

import { useRef, useState, useTransition } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { slideUpVariants } from '@/lib/animation';
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Send, CheckCircle } from 'lucide-react'; // Using Lucide icons
import { useToast } from '@/hooks/use-toast'; // Using ShadCN toast
import { handleContactFormSubmission } from '@/app/actions/contactActions'; // Server Action

const ContactSection = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const { entry, isIntersecting } = useIntersectionObserver(ref, {
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  if (isIntersecting) {
    controls.start('visible');
  }

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await handleContactFormSubmission(formData);
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "We'll get back to you soon.",
          variant: "default",
        });
        formRef.current?.reset(); 
        setTimeout(() => setIsSubmitted(false), 3000); // Reset submitted state for UI
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    });
  };
  
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">Get in Touch</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Ready to discuss your animation project? Fill out the form below or reach out directly.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-10 theme-transition"
            variants={slideUpVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <form ref={formRef} action={handleSubmit} className="space-y-6">
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
                <label htmlFor="project" className="block text-sm font-medium text-foreground mb-1.5">Project Type</label>
                <Select name="project" required>
                  <SelectTrigger className="w-full bg-background dark:bg-gray-700" aria-label="Project Type">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website Animation Overhaul</SelectItem>
                    <SelectItem value="landing">Landing Page Animation</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Animation Suite</SelectItem>
                    <SelectItem value="webapp">Web Application UI Motion</SelectItem>
                    <SelectItem value="3d">3D Interactive Experience</SelectItem>
                    <SelectItem value="other">Other / Custom Project</SelectItem>
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
                  placeholder="Tell us about your project requirements..."
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
                  disabled={isPending}
                  aria-live="polite"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" /> Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
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
