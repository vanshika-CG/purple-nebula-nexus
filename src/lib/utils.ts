// lib/utils.ts (or wherever your utility file is located)

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges Tailwind CSS classes intelligently.
 * It uses 'clsx' to concatenate class names and 'tailwind-merge'
 * to resolve conflicting classes (e.g., 'p-4' and 'p-8' will result in 'p-8').
 * * @param inputs - An array of class names, conditional class objects, or other ClassValue types.
 * @returns A single, clean string of merged Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}