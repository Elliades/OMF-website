/**
 * Section component for consistent section styling and animations
 * Used throughout the OMF Vitrine website
 */
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function Section({
  id,
  title,
  children,
  className,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 dark:text-white">
            {title}
          </h2>
          <div className="relative">
            <div className="w-24 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white dark:bg-section-dark opacity-30 blur-sm"></div>
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