"use client"; // Uses framer-motion, likely client-side

import * as React from "react"; // Added React import
import type { HTMLAttributes, ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";

// Properties that might conflict between HTMLAttributes and MotionProps
type ConflictingHTMLAttributes = 
  | 'onAnimationStart' 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd' 
  | 'style'
  | 'children'; // Added children as it also conflicts

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, ConflictingHTMLAttributes>, MotionProps {
  variant?: "default" | "primary" | "secondary" | "dark" | "light" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: ElementType; // Allow changing the root element type
  containerClassName?: string; // Allow custom class for the inner container
  children?: ReactNode; // Explicitly define children to resolve type conflict
}

const Section = React.forwardRef<HTMLElement, SectionProps>(({
  className,
  variant = "default",
  size = "md",
  children,
  as: Component = "section", // Default to <section>
  containerClassName,
  ...props
}, ref) => {
  const variants = {
    default: "bg-background text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-50 text-gray-900",
    muted: "bg-muted/40 text-foreground", // Using muted with opacity
  };

  const sizes = {
    sm: "py-8 md:py-12", // Adjusted padding
    md: "py-16 md:py-20",
    lg: "py-24 md:py-28",
    xl: "py-32 md:py-36",
    full: "min-h-screen flex items-center py-16", // Added flex for vertical centering in full height
  };

  const MotionComponent = motion(Component); // Create motion component dynamically

  return (
    <MotionComponent
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        variants[variant],
        sizes[size],
        className
      )}
      {...props} // Pass motion props
    >
      {/* Added optional container div */}
      <div className={cn("container mx-auto px-6", containerClassName)}> 
        {children}
      </div>
    </MotionComponent>
  );
});

Section.displayName = "Section";

export { Section };
