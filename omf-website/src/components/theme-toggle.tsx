/**
 * Theme toggle component for switching between light and dark mode
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="dark-mode-toggle"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDarkMode ? (
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
            className="text-yellow-300"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
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
            className="text-slate-700"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </motion.div>
    </Button>
  );
} 