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
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number, height: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Get natural dimensions of the image when it loads
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setNaturalDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight
      });
    }
  }, [gifPath]);

  const handleImageLoad = () => {
    if (imgRef.current) {
      setNaturalDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight
      });
    }
  };

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

  // Calculate container height based on natural dimensions
  const containerHeight = naturalDimensions && typeof width === 'string' && width.endsWith('%')
    ? Math.min(naturalDimensions.height, 400) // Limit height to 400px max
    : height;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800",
        isExpanded ? "fixed inset-0 z-50" : "",
        className
      )}
      style={{ 
        width,
        height: containerHeight
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
              onLoad={handleImageLoad}
              className="w-full h-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center center'
              }}
            />
          </div>
          
          {/* Small settings button */}
          <button
            onClick={toggleControls}
            className="absolute top-2 right-2 p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors z-10"
            aria-label="Media settings"
          >
            <Settings className="h-4 w-4 stroke-current" />
          </button>

          {/* Controls panel - only shown when showControls is true */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
              <div className="text-sm text-white mb-2 text-center">{label}</div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button 
                  onClick={(e) => { e.stopPropagation(); decrementScale(); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4 stroke-current" />
                </button>
                <div className="text-xs text-white">{scale.toFixed(1)}x</div>
                <button 
                  onClick={(e) => { e.stopPropagation(); incrementScale(); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4 stroke-current" />
                </button>
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveHorizontal('left'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                  aria-label="Move left"
                >
                  <MoveHorizontal className="h-4 w-4 stroke-current" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveVertical('up'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                  aria-label="Move up"
                >
                  <MoveVertical className="h-4 w-4 stroke-current" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveVertical('down'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors rotate-180"
                  aria-label="Move down"
                >
                  <MoveVertical className="h-4 w-4 stroke-current" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); moveHorizontal('right'); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors rotate-180"
                  aria-label="Move right"
                >
                  <MoveHorizontal className="h-4 w-4 stroke-current" />
                </button>
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); resetPosition(); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors text-xs"
                  aria-label="Reset position"
                >
                  Reset
                </button>
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                  aria-label={isExpanded ? "Minimize" : "Maximize"}
                >
                  {isExpanded ? 
                    <Minimize2 className="h-4 w-4 stroke-current" /> : 
                    <Maximize2 className="h-4 w-4 stroke-current" />
                  }
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