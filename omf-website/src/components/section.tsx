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
  index: number; // Section index for applying alternating patterns
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
    // Check both theme and resolvedTheme for more reliable detection
    const isDarkMode = theme === 'dark' || resolvedTheme === 'dark';
    setIsDark(isDarkMode);
    
    // Debug output for theme detection
    // console.log(`Section ${id}: theme=${theme}, resolvedTheme=${resolvedTheme}, isDark=${isDarkMode}`);
  }, [theme, resolvedTheme, id]);

  // Determine if section should have a special background pattern
  // Sections with odd indices (1, 3, 5, 7) will have SVG patterns
  const shouldHavePattern = index > 0 && index % 2 === 1;
  
  // Determine which pattern classes to use based on the section index
  // This creates a rotating pattern through the available backgrounds
  const getSVGClasses = () => {
    if (!shouldHavePattern) return '';
    
    // Rotate through 3 different patterns
    // For odd indices (1, 3, 5, 7)
    const patternIndex = Math.floor((index - 1) / 2) % 3;
    
    switch(patternIndex) {
      case 0:
        return 'svg-purple-light svg-purple-dark';
      case 1:
        return 'svg-acid-light svg-acid-dark';
      case 2:
        return 'svg-orange-light svg-cyan-dark';
      default:
        return '';
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

  // Debug info (enable it temporarily for troubleshooting)
  // console.log(`Section ${id}: mounted=${mounted}, isDark=${isDark}, pattern=${patternIndex}, style=`, sectionStyle);

  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 transition-colors duration-300",
        shouldHavePattern ? getSVGClasses() : "bg-section-light dark:bg-section-dark",
        className
      )}
      style={style}
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
            "text-[10rem] lg:text-[7rem] md:text-[5rem] sm:text-[3.5rem] leading-none font-bold mb-6",
            shouldHavePattern && isDark ? "text-white" : shouldHavePattern ? "text-gray-800" : "dark:text-white"
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