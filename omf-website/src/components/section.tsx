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
        "min-h-screen py-24 flex flex-col items-center justify-center",
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
          <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
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
    </section>
  );
} 