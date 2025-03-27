/**
 * PlaceholderMedia component for displaying images and GIFs
 * Used throughout the OMF Vitrine website for demos and examples
 */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";

interface PlaceholderMediaProps {
  type: "image" | "gif";
  width?: string;
  height?: number;
  label: string;
  className?: string;
  onClick?: () => void;
}

// Mapping of section labels to GIF files
const gifMapping: Record<string, string> = {
  "Feature creation and activation demo (~8s)": "/gifs/FeatureRegistering.gif",
  "Error rollback demonstration (~10s)": "/gifs/Error Management.gif",
  "Button click in MagicDraw UI": "/gifs/CreateUIAction.gif",
  "Immediate response to model modifications": "/gifs/LiveAction.gif",
};

export default function PlaceholderMedia({
  type,
  width = "100%",
  height = 300,
  label,
  className,
  onClick
}: PlaceholderMediaProps) {
  const gifPath = gifMapping[label];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [actualHeight, setActualHeight] = useState(height);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  
  // Update dimensions when the image loads
  const updateDimensions = () => {
    if (imgRef.current) {
      const imgWidth = imgRef.current.naturalWidth;
      const imgHeight = imgRef.current.naturalHeight;
      
      setDimensions({
        width: imgWidth,
        height: imgHeight
      });
      
      // Calculate appropriate container height
      const aspectRatio = imgWidth / imgHeight;
      let newHeight = height;
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        
        // If image is wider than tall
        if (aspectRatio > 1) {
          // Use default height, but ensure it's not too tall for a wide image
          newHeight = Math.min(height, containerWidth / aspectRatio);
        } else {
          // For tall images, limit height to avoid overly tall containers
          newHeight = Math.min(350, Math.max(250, containerWidth / aspectRatio * 0.8));
        }
      }
      
      setActualHeight(newHeight);
    }
  };

  // Handle Escape key press to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    // Handle scroll to exit fullscreen
    const handleScroll = () => {
      if (isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);
    
    // Set initial dimensions
    if (imgRef.current && imgRef.current.complete) {
      updateDimensions();
    }
    
    // Add window resize handler
    const handleResize = () => {
      updateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isFullscreen]);
  
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
    
    // When entering fullscreen, scroll to the component to make it visible
    if (!isFullscreen && fullscreenRef.current) {
      setTimeout(() => {
        fullscreenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out",
        isFullscreen ? "fixed inset-x-0 top-16 bottom-0 z-50 rounded-none" : "",
        className
      )}
      style={{ 
        width: isFullscreen ? "100%" : width, 
        height: isFullscreen ? "calc(100vh - 4rem)" : actualHeight,
      }}
      onClick={onClick}
    >
      {gifPath ? (
        <>
          <div ref={fullscreenRef} className="relative w-full h-full overflow-hidden">
            <img
              ref={imgRef}
              src={gifPath}
              alt={label}
              className="w-full h-full object-contain transition-transform duration-200"
              onLoad={updateDimensions}
            />
            
            {/* Caption overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <div className="text-sm text-white text-center">{label}</div>
            </div>
          </div>
          
          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-2 right-2 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-10"
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          
          {/* Close button (only visible in fullscreen mode) */}
          {isFullscreen && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
              className="absolute top-2 left-2 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🎥</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
} 