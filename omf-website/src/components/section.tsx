/**
 * Section component for displaying major content sections
 * Each section has a title, optional subtitle, and children content
 */
"use client";

import { ReactNode, CSSProperties, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  titleStyles?: CSSProperties;
  fullWidth?: boolean;
  subtitle?: string;
  index: number; // Section index for applying different SVG patterns
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
  style = {},
  titleStyles,
  fullWidth = false,
  index
}: SectionProps) {
  const { theme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // useEffect for hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // useEffect for theme detection
  useEffect(() => {
    if (mounted) {
      // Check both theme and resolvedTheme for more reliable detection
      const isDarkMode = theme === 'dark' || resolvedTheme === 'dark';
      setIsDark(isDarkMode);
    }
  }, [theme, resolvedTheme, mounted, id]);

  // Determine which SVG pattern to use based on the section index
  // Each section gets its own unique pattern
  const getSVGClasses = () => {
    // Cycle through all available patterns based on index
    // We'll have 7 different patterns
    const patternIndex = index % 7;
    
    switch(patternIndex) {
      case 1:
        return 'svg-purple-light svg-purple-dark';
      case 2:
        return 'svg-acid-light svg-black-dark';
      case 3:
        return 'svg-orange-light svg-cyan2-dark';
      case 4:
        return 'svg-acid-light svg-acid-dark';
      case 5:
        return 'svg-red2-light svg-red2-dark';
      case 6:
        return 'svg-gold-light svg-gold-dark';
      case 0:
        return 'svg-pattern-light svg-pattern-dark';
      default:
        return 'svg-black-light svg-dark-pattern';
    }
  };

  // Hover overlay for dark pattern sections
  const hoverOverlay: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: isHovered ? 0.7 : 0.3,
    transition: "opacity 0.3s ease-in-out",
    zIndex: 0
  };

  if (!mounted) {
    // Return a minimal section while theme is loading to prevent flash
    return (
      <section
        id={id}
        className={cn(
          "relative py-16 md:py-24 transition-colors duration-300",
          className
        )}
        style={{...style, display: 'block'}}
      >
        <div className={cn(
          "relative z-10",
          fullWidth ? "w-full" : "container mx-auto px-4"
        )}>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-[10rem] lg:text-[7rem] md:text-[5rem] sm:text-[3.5rem] leading-none font-bold mb-6" 
              style={titleStyles}
            >
              {title}
              <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-primary to-accent rounded" />
            </h2>
            {subtitle && (
              <p className="text-[2rem] md:text-[2rem] sm:text-[1.5rem] leading-tight max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 transition-colors duration-300",
        getSVGClasses(), // Toutes les sections ont maintenant un fond SVG
        className
      )}
      style={{...style, visibility: 'visible', display: 'block'}} // Ensure visibility and display
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isDark && <div style={hoverOverlay} />}
      
      <div className={cn(
        "relative z-10",
        fullWidth ? "w-full" : "container mx-auto px-4"
      )}>
        <div className="text-center mb-10 md:mb-16">
          <h2 className={cn(
            "text-[10rem] lg:text-[7rem] md:text-[5rem] sm:text-[3.5rem] leading-none font-bold mb-6"
          )} 
            style={titleStyles}
          >
            {title}
            <motion.div
              className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-primary to-accent rounded"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </h2>
          {subtitle && (
            <p className={cn(
              "text-[2rem] md:text-[2rem] sm:text-[1.5rem] leading-tight max-w-3xl mx-auto",
              "text-gray-600"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
      
      {/* Subtle "scroll for more" indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center text-sm animate-pulse">
        <span className="mb-1">Scroll for more</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}