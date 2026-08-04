'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cookieBounceVariants } from '@/lib/animations';

interface CookieProps {
  className?: string;
  size?: number;
}

export const Cookie: React.FC<CookieProps> = ({
  className = '',
  size = 90,
}) => {
  return (
    <motion.div
      variants={cookieBounceVariants}
      initial="initial"
      animate={['animate', 'float']}
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/cookie.png"
        alt="Subway Cookie"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain drop-shadow-md select-none"
        priority
      />

      {/* Burst sparkles around cookie matching Image 3 design */}
      <div className="absolute -top-1 -right-1 flex gap-1">
        <span className="w-1.5 h-3 bg-[#007A33] rounded-full rotate-12"></span>
        <span className="w-1.5 h-3 bg-[#FFC72C] rounded-full -rotate-12"></span>
      </div>
    </motion.div>
  );
};

export default Cookie;
