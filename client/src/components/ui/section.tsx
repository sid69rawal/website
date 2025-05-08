import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";

interface SectionProps extends HTMLAttributes<HTMLElement>, MotionProps {
  variant?: "default" | "primary" | "secondary" | "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  asChild?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}, ref) => {
  const variants = {
    default: "bg-background",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-50 text-gray-900",
  };

  const sizes = {
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
    full: "min-h-screen py-16",
  };

  return (
    <motion.section
      ref={ref}
      className={cn(
        variants[variant],
        sizes[size],
        "relative w-full overflow-hidden theme-transition",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
});

Section.displayName = "Section";

export { Section };
