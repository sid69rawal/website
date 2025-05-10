/** @jsxImportSource react */
"use client"; 

import * as React from "react";
import type { HTMLAttributes, ReactNode, ElementType, ComponentType, ForwardedRef } from "react";
import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";

// Properties that might conflict between HTMLAttributes and MotionProps
type ConflictingHTMLAttributes = 
  | 'onAnimationStart' 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd' 
  | 'style'
  | 'children';

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
  as: ComponentInput = "section", // Renamed to avoid conflict with React.Component
  containerClassName,
  ...props 
}, ref: ForwardedRef<HTMLElement>) => { 
  const variantsStyles = {
    default: "bg-background text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-50 text-gray-900",
    muted: "bg-muted/40 text-foreground", 
  };

  const sizesStyles = {
    sm: "py-8 md:py-12", 
    md: "py-16 md:py-20",
    lg: "py-24 md:py-28",
    xl: "py-32 md:py-36",
    full: "min-h-screen flex items-center py-16", 
  };

  const MotionComponent = React.useMemo(() => {
    if (typeof ComponentInput === "string") {
      // This assumes ComponentInput is a valid HTML tag name that motion supports
      return motion[ComponentInput as keyof typeof motion] as any; // Cast to any for flexibility
    }
    // If ComponentInput is a React component, wrap it with motion
    // Pass relevant props here
 return motion(ComponentInput as React.ForwardRefExoticComponent<any>);
    // }, [ComponentInput, className, variant, size, props, ref]); // Include props and ref in dependencies
 // The above change is more complex than intended. Let's simplify.
 // When wrapping a non-string component, simply pass it to motion.
 // The issue might be in how the props are spread later.
 // Let's revert the change inside the memo and focus on the render part.
 // The original code was:
 // return motion(ComponentInput as ComponentType<any>);
    return motion.div; // Fallback to motion.div or handle other cases as needed
  }, [ComponentInput]);

  // Fallback in case MotionComponent couldn't be derived (e.g. invalid 'as' string)
  if (!MotionComponent) {
    console.error(`Motion component for type '${String(ComponentInput)}' could not be created. Defaulting to 'section'.`);
    const FallbackComponent = motion.section;
    return (
        <FallbackComponent 
            ref={ref as React.Ref<HTMLDivElement>} // Cast ref appropriately for fallback
            className={cn(
                "relative w-full overflow-hidden",
                variantsStyles[variant],
                sizesStyles[size],
                className
            )}
            {...props}
        >
            <div className={cn("container mx-auto px-6", containerClassName)}> 
                {children}
            </div>
        </FallbackComponent>
    );
  }

  return (
    <MotionComponent
      ref={ref as any} // Cast ref to 'any' to bypass polymorphic ref type checking issues
      className={cn(
        "relative w-full overflow-hidden",
        variantsStyles[variant],
        sizesStyles[size],
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
