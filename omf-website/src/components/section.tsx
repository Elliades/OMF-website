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

  // Use pattern backgrounds for even-indexed sections (except index 0)
  const useDarkPattern = index > 0 && index % 2 === 0;

  // Dark pattern background - used when useDarkPattern is true
  const darkPatternStyle: CSSProperties = {
    backgroundImage: `url('/svg/pattern-dark.svg')`,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    backgroundColor: "#050309",
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

  // Combine styles
  const sectionStyle: CSSProperties = {
    ...(useDarkPattern ? darkPatternStyle : {}),
    ...style
  };

  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 transition-colors duration-300",
        useDarkPattern ? "text-white" : "bg-section-light dark:bg-section-dark",
        className
      )}
      style={sectionStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {useDarkPattern && <div style={hoverOverlay} />}
      
      <div className={cn(
        "relative z-10",
        fullWidth ? "w-full" : "container mx-auto px-4"
      )}>
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white" style={titleStyles}>
            {title}
            <motion.div
              className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-primary to-accent rounded"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
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