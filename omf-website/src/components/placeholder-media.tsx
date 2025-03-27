/**
 * PlaceholderMedia component for displaying images and GIFs
 * Used throughout the OMF Vitrine website for demos and examples
 */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, ZoomIn, ZoomOut, MoveHorizontal, MoveVertical, Settings } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [actualHeight, setActualHeight] = useState(height);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Set initial dimensions
    if (imgRef.current && imgRef.current.complete) {
      updateDimensions();
    }
    
    // Add window resize handler
    const handleResize = () => {
      updateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const incrementScale = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const decrementScale = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const moveHorizontal = (direction: 'left' | 'right') => {
    setPosition(prev => ({
      ...prev,
      x: direction === 'left' 
        ? prev.x - 5
        : prev.x + 5
    }));
  };

  const moveVertical = (direction: 'up' | 'down') => {
    setPosition(prev => ({
      ...prev,
      y: direction === 'up'
        ? prev.y - 5
        : prev.y + 5
    }));
  };

  const resetPosition = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(prev => !prev);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out",
        isExpanded ? "fixed inset-0 z-50" : "",
        className
      )}
      style={{ 
        width, 
        height: isExpanded ? "100%" : actualHeight
      }}
      onClick={onClick}
    >
      {gifPath ? (
        <>
          <div className="relative w-full h-full overflow-hidden">
            <img
              ref={imgRef}
              src={gifPath}
              alt={label}
              className="w-full h-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center center'
              }}
              onLoad={updateDimensions}
            />
          </div>
          
          {/* Small settings button */}
          <button
            onClick={toggleControls}
            className="absolute top-2 right-2 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-10"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Controls panel - only shown when showControls is true */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
              <div className="text-sm text-white mb-2 text-center">{label}</div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button 
                  onClick={(e) => { e.stopPropagation(); decrementScale(); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <div className="text-xs text-white">{scale.toFixed(1)}x</div>
                <button 
                  onClick={(e) => { e.stopPropagation(); incrementScale(); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveHorizontal('left'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                >
                  <MoveHorizontal className="h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveVertical('up'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                >
                  <MoveVertical className="h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveVertical('down'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors rotate-180"
                >
                  <MoveVertical className="h-4 w-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveHorizontal('right'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors rotate-180"
                >
                  <MoveHorizontal className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); resetPosition(); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors text-xs"
                >
                  Reset
                </button>
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
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