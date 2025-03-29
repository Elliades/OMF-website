/**
 * Footer component for the OMF Vitrine website
 */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <footer className={`${isDark ? 'bg-gradient-to-br from-section-dark to-slate-950' : 'bg-gradient-to-r from-gray-100 to-gray-200'} py-16`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">OMF</h3>
              <p className="mb-4">
                Open-source framework for MagicDraw plugin development.
                Built by developers, for developers.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="https://github.com/OMF-Open-MBSE-Framework/OMF.git" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition"
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
                    className="hover:text-primary transition-colors"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Link>
                <Link 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition"
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
                    className="hover:text-primary transition-colors"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link 
                  href="mailto:openMBSEFramework@gmail.com"
                  className="transition"
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
                    className="hover:text-primary transition-colors"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#whats-omf" className="hover:ml-1 transition-all duration-200">
                    What's OMF?
                  </Link>
                </li>
                <li>
                  <Link href="#core" className="hover:ml-1 transition-all duration-200">
                    Core Features
                  </Link>
                </li>
                <li>
                  <Link href="#feature-items" className="hover:ml-1 transition-all duration-200">
                    Feature Items
                  </Link>
                </li>
                <li>
                  <Link href="#library" className="hover:ml-1 transition-all duration-200">
                    Library
                  </Link>
                </li>
                <li>
                  <Link href="#test-framework" className="hover:ml-1 transition-all duration-200">
                    Test Framework
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="https://github.com/OMF-Open-MBSE-Framework/OMF.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:ml-1 transition-all duration-200"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://github.com/OMF-Open-MBSE-Framework/OMF.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:ml-1 transition-all duration-200"
                  >
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://github.com/OMF-Open-MBSE-Framework/OMF.git/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:ml-1 transition-all duration-200"
                  >
                    Issue Tracker
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://github.com/OMF-Open-MBSE-Framework/OMF.git/wiki" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:ml-1 transition-all duration-200"
                  >
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${isDark ? 'border-slate-800' : 'border-gray-300'} mt-12 pt-8 text-center ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            <p>© {new Date().getFullYear()} OMF. All rights reserved.</p>
            <p className="mt-2 text-xs">
              <span className={`inline-block px-2 py-1 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-gray-200 text-gray-600'} rounded-full`}>
                <span className="mr-1 text-green-400">●</span> Modern UI by Claude
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 