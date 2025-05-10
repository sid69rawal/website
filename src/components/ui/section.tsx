/** @jsxImportSource react */
"use client"; // Uses framer-motion, likely client-side

import * as React from "react";
import type { HTMLAttributes, ReactNode, ElementType, ComponentType } from "react";
import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";

// Properties that might conflict between HTMLAttributes and MotionProps
type ConflictingHTMLAttributes = 
  | 'onAnimationStart' 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd' 
  | 'style'
  | 'children'; // `children` can also conflict if MotionProps defines it differently

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, ConflictingHTMLAttributes>, MotionProps {
  variant?: "default" | "primary" | "secondary" | "dark" | "light" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: ElementType; 
  containerClassName?: string; 
  children?: ReactNode; 
}

const Section = React.forwardRef<HTMLElement, SectionProps>(({
  className,
  variant = "default",
  size = "md",
  children,
  as: Component = "section", // Component is of type ElementType here
  containerClassName,
  ...props
}, ref) => {
  const variants = {
    default: "bg-background text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-50 text-gray-900",
    muted: "bg-muted/40 text-foreground", 
  };

  const sizes = {
    sm: "py-8 md:py-12", 
    md: "py-16 md:py-20",
    lg: "py-24 md:py-28",
    xl: "py-32 md:py-36",
    full: "min-h-screen flex items-center py-16", 
  };

  const MotionComponent = typeof Component === 'string'
    ? motion(Component)
    : motion(Component as ComponentType<any>); 


  return (
    <MotionComponent
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        variants[variant],
        sizes[size],
        className
      )}
      {...props} 
    >
      <div className={cn("container mx-auto px-6", containerClassName)}> 
        {children}
      </div>
    </MotionComponent>
  );
});

Section.displayName = "Section";

export { Section };
