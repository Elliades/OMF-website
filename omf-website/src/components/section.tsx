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
  index?: number; // Section index for applying alternating patterns
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
  index = 0
}: SectionProps) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  // Determine if section should have a special background pattern
  // Skip index 0 (first section), then apply patterns to alternating sections
  const shouldHavePattern = index > 0 && index % 2 === 0;
  
  // Determine which pattern to use based on the section index
  // This creates a rotating pattern through the available backgrounds
  const getPatternIndex = () => {
    if (!shouldHavePattern) return -1;
    // Take the section index (skipping 0), divide by 2 (since we only style even indices)
    // then use modulo 3 to cycle through the 3 pattern options
    return Math.floor(index / 2) % 3;
  };
  
  const patternIndex = getPatternIndex();
  
  // Light mode SVG backgrounds
  const lightPatterns = [
    {
      backgroundImage: `url('/svg/white-purple-corner.svg')`,
      backgroundColor: "#f8f8fe",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
    {
      backgroundImage: `url('/svg/white-acid-corner.svg')`,
      backgroundColor: "#f8fef8",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
    {
      backgroundImage: `url('/svg/white-orange-corner.svg')`,
      backgroundColor: "#fef8f8",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    }
  ];
  
  // Dark mode SVG backgrounds
  const darkPatterns = [
    {
      backgroundImage: `url('/svg/purple-corner.svg')`,
      backgroundColor: "#220033",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
    {
      backgroundImage: `url('/svg/acid-corner.svg')`,
      backgroundColor: "#003322",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
    {
      backgroundImage: `url('/svg/cyan-corner.svg')`,
      backgroundColor: "#002233",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    }
  ];

  // Choose the appropriate pattern style based on theme and section index
  const getPatternStyle = (): CSSProperties => {
    if (!shouldHavePattern || patternIndex === -1) return {};
    
    return isDark ? darkPatterns[patternIndex] : lightPatterns[patternIndex];
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

  // Combine background style with user style
  const sectionStyle = {
    ...getPatternStyle(),
    ...style
  };

  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 transition-colors duration-300",
        shouldHavePattern ? "text-white" : "bg-section-light dark:bg-section-dark",
        className
      )}
      style={sectionStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {shouldHavePattern && isDark && <div style={hoverOverlay} />}
      
      <div className={cn(
        "relative z-10",
        fullWidth ? "w-full" : "container mx-auto px-4"
      )}>
        <div className="text-center mb-10 md:mb-16">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            shouldHavePattern && isDark ? "text-white" : shouldHavePattern ? "text-gray-800" : "dark:text-white"
          )} 
            style={titleStyles}
          >
            {title}
            <motion.div
              className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-primary to-accent rounded"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </h2>
          {subtitle && (
            <p className={cn(
              "text-lg max-w-3xl mx-auto",
              shouldHavePattern && isDark ? "text-gray-200" : 
              shouldHavePattern ? "text-gray-600" : "text-gray-600 dark:text-gray-300"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
      
      {/* Subtle "scroll for more" indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center text-sm text-gray-400 dark:text-gray-500 animate-pulse">
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