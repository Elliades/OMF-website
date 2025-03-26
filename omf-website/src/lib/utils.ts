/**
 * Utility functions for the OMF Vitrine website
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind classes intelligently
 * @param inputs - Class names to combine
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
