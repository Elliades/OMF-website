/**
 * Section component for consistent section styling and animations
 * Used throughout the OMF Vitrine website
 */
"use client";

import { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  titleStyles?: CSSProperties;
  fullWidth?: boolean;
  subtitle?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
  style,
  titleStyles,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        "min-h-screen py-24 flex flex-col items-center justify-center transition-colors duration-300",
        className
      )}
    >
      <div className={fullWidth ? "w-full" : "container px-4 mx-auto"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4 dark:text-white"
            style={titleStyles}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-center mb-6 text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
          <div className="relative">
            <div className="w-24 h-1 bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] mx-auto"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white dark:bg-[#0f172a] opacity-30 blur-sm"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Subtle "scroll for more" indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
        <span className="text-xs text-gray-500 dark:text-gray-400 sr-only">Scroll for more</span>
      </motion.div>
    </section>
  );
} 