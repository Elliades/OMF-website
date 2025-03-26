/**
 * PlaceholderMedia component to represent GIFs, images, or videos
 * Will be replaced with actual media content later
 */
"use client";

import { motion } from "framer-motion";

interface PlaceholderMediaProps {
  type: "gif" | "image" | "video";
  width?: number | string;
  height?: number | string;
  label?: string;
  className?: string;
}

export default function PlaceholderMedia({
  type,
  width = "100%",
  height = 300,
  label,
  className = "",
}: PlaceholderMediaProps) {
  // Different background colors based on type
  const bgColors = {
    gif: "bg-blue-200",
    image: "bg-green-200",
    video: "bg-purple-200",
  };

  // Icons based on type
  const icons = {
    gif: (
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
        className="h-8 w-8 text-blue-600"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
    image: (
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
        className="h-8 w-8 text-green-600"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
    video: (
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
        className="h-8 w-8 text-purple-600"
      >
        <path d="m10 7 5 3-5 3Z" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    ),
  };

  return (
    <motion.div
      className={`rounded-lg border border-gray-200 overflow-hidden ${bgColors[type]} flex items-center justify-center ${className}`}
      style={{ width, height }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center p-6">
        {icons[type]}
        <p className="mt-3 font-medium">{type.toUpperCase()}: {label || `Placeholder ${type}`}</p>
        <p className="text-xs text-gray-500 mt-2">Will be replaced with actual {type}</p>
      </div>
    </motion.div>
  );
} 