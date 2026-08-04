'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaHandPointer } from 'react-icons/fa';
import { calculateScratchPercentage, fillSilverTexture } from '@/utils/scratch';
import { popVariants } from '@/lib/animations';
import Cookie from './Cookie';

interface ScratchCardProps {
  onComplete: () => void;
  scratchThreshold?: number; // 60%
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  onComplete,
  scratchThreshold = 60,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState<boolean>(false);
  const [hasUserStarted, setHasUserStarted] = useState<boolean>(false);

  // Initialize Canvas Surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Fill metallic silver texture
      fillSilverTexture(ctx, rect.width, rect.height);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const checkScratchAmount = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const currentPercent = calculateScratchPercentage(ctx, width, height);
      setPercentage(currentPercent);

      if (currentPercent >= scratchThreshold && !isFullyRevealed) {
        setIsFullyRevealed(true);
        // Fade out canvas and trigger complete callback
        ctx.clearRect(0, 0, width, height);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    },
    [scratchThreshold, isFullyRevealed, onComplete]
  );

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isFullyRevealed) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      if (!hasUserStarted) {
        setHasUserStarted(true);
      }

      const rect = canvas.getBoundingClientRect();
      const clientX = x - rect.left;
      const clientY = y - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(clientX, clientY, 32, 0, Math.PI * 2, false);
      ctx.fill();

      checkScratchAmount(ctx, rect.width, rect.height);
    },
    [isFullyRevealed, hasUserStarted, checkScratchAmount]
  );

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  return (
    <motion.div
      variants={popVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm sm:max-w-md mx-auto my-4 px-2"
    >
      {/* Outer Card Container matching design */}
      <div className="bg-[#007A33] rounded-[28px] p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.18)] border-2 border-white/20 relative overflow-hidden">
        {/* Header Title: SCRATCH & WIN! */}
        <div className="flex items-center justify-center gap-2 text-center py-2 pb-3.5">
          {/* Left Sparkles */}
          <div className="flex gap-1 items-center">
            <span className="w-2.5 h-1 bg-[#FFC72C] rounded-full rotate-45"></span>
            <span className="w-3.5 h-1 bg-[#FFC72C] rounded-full"></span>
            <span className="w-2.5 h-1 bg-[#FFC72C] rounded-full -rotate-45"></span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase drop-shadow-sm">
            SCRATCH & <span className="text-[#FFC72C]">WIN!</span>
          </h2>

          {/* Right Sparkles */}
          <div className="flex gap-1 items-center">
            <span className="w-2.5 h-1 bg-[#FFC72C] rounded-full -rotate-45"></span>
            <span className="w-3.5 h-1 bg-[#FFC72C] rounded-full"></span>
            <span className="w-2.5 h-1 bg-[#FFC72C] rounded-full rotate-45"></span>
          </div>
        </div>

        {/* Scratch Surface Area Box */}
        <div
          ref={containerRef}
          className="relative w-full h-72 sm:h-80 rounded-[22px] bg-[#FFC72C] p-2 overflow-hidden shadow-inner flex items-center justify-center"
        >
          {/* Underneath Revealed Content (Shown as user scratches) */}
          <div className="absolute inset-2 bg-white rounded-[18px] p-4 flex flex-col items-center justify-center text-center shadow-md select-none">
            <span className="text-xs sm:text-sm font-black text-[#007A33] tracking-widest uppercase mb-1">
              — YOU WON! —
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-[#007A33] leading-tight mb-2">
              GET <span className="text-[#FFC72C]">FREE</span> COOKIE
              <br />
              ON YOUR ORDER
            </h3>

            <div className="my-2">
              <Cookie size={85} />
            </div>

            <div className="bg-[#007A33]/10 px-3 py-1 rounded-full mt-1">
              <p className="text-xs font-bold text-[#007A33]">
                Scratching... {percentage}%
              </p>
            </div>
          </div>

          {/* Silver Metallic Canvas Overlay */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[18px] cursor-pointer touch-none transition-opacity duration-500 ${
              isFullyRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* Initial Overlay Hint (Finger touch icon + SCRATCH HERE) */}
          {!hasUserStarted && !isFullyRevealed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#007A33] mb-2 animate-touch-pulse">
                <FaHandPointer className="w-9 h-9 sm:w-10 sm:h-10 text-[#007A33]" />
              </div>
              <span className="text-lg sm:text-xl font-black tracking-wider text-[#007A33] drop-shadow-sm uppercase">
                SCRATCH HERE
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ScratchCard;
