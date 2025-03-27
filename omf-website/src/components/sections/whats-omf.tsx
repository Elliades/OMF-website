/**
 * "What's OMF?" section component
 * First section to introduce what OMF is about
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/section";
import PlaceholderMedia from "@/components/placeholder-media";

interface WhatsOMFProps {
  index: number;
}

export default function WhatsOMF({ index }: WhatsOMFProps) {
  return (
    <Section
      id="whats-omf"
      title="What's OMF?"
      subtitle="Open-source framework for robust and efficient MagicDraw plugins"
      index={index}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div className="bg-white/90 dark:bg-gray-800/50 p-8 rounded-lg shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              OMF is an open-source framework designed to simplify the robust and efficient
              development of MagicDraw plugins. Built by developers for developers, OMF
              streamlines complex automations reliably and elegantly.
            </p>
            <div className="flex items-center">
              <span className="gradient-text font-bold text-lg">Build Smarter, Not Harder</span>
              <div className="flex-grow ml-4 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <div className="mt-6 space-y-3">
              <Feature>Feature-oriented architecture for clean organization</Feature>
              <Feature>Error-proof operations with automatic rollback</Feature>
              <Feature>Ready-to-use UI components and APIs</Feature>
              <Feature>Comprehensive SysML factory and helpers</Feature>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center"
        >
          {/* OMF logo or illustration */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-20 dark:opacity-40 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-full p-8 border border-gray-200 dark:border-gray-700">
              <div className="w-40 h-40 md:w-60 md:h-60 relative flex items-center justify-center">
                <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  OMF
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            See it in action
          </h3>
        </div>
        <PlaceholderMedia 
          type="gif" 
          label="Feature creation and activation demo (~8s)" 
          className="mx-auto max-w-3xl shadow-lg rounded-lg overflow-hidden"
        />
      </div>
    </Section>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="text-primary dark:text-primary-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </div>
  );
} 