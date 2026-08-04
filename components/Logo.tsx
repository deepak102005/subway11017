'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { logoVariants } from '@/lib/animations';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = true,
  compact = false,
}) => {
  return (
    <motion.div
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="relative w-64 h-24 sm:w-72 sm:h-28 flex items-center justify-center">
        <Image
          src="/subway-logo.png"
          alt="SUBWAY"
          width={320}
          height={120}
          className="object-contain drop-shadow-sm"
          priority
          onError={(e) => {
            // Fallback SVG display if image loading fails
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
        {/* Inline vector fallback if image loading fails */}
        <div className="hidden text-3xl font-black italic tracking-tighter text-[#007A33] selection-none">
          SUB<span className="text-[#FFC72C]">WAY</span>
        </div>
      </div>

      {showTagline && (
        <div
          className={`font-black tracking-tight leading-none mt-1 ${
            compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[#007A33] lowercase">eat</span>
            <span className="text-[#FFC72C] lowercase">fresh</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <span className="text-[#007A33] lowercase">feel</span>
            <span className="text-[#FFC72C] lowercase relative">
              good
              <span className="text-[10px] sm:text-xs absolute -top-1 -right-3.5 font-bold">
                TM
              </span>
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
