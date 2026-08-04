'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

export const LimitedOffer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-5 text-center select-none"
    >
      {/* Left burst accent lines matching design */}
      <div className="flex flex-col gap-1 items-end opacity-80">
        <span className="w-2.5 h-0.5 bg-[#007A33] rounded-full rotate-45"></span>
        <span className="w-3.5 h-0.5 bg-[#007A33] rounded-full"></span>
        <span className="w-2.5 h-0.5 bg-[#007A33] rounded-full -rotate-45"></span>
      </div>

      {/* Clock Icon */}
      <div className="w-6 h-6 rounded-full border-2 border-[#007A33] flex items-center justify-center text-[#007A33] shrink-0">
        <FiClock className="w-4 h-4 stroke-[2.5]" />
      </div>

      {/* Text with yellow underline */}
      <div className="text-base sm:text-lg font-bold tracking-tight">
        <span className="text-[#007A33]">Valid for </span>
        <span className="text-[#FFC72C] relative inline-block">
          limited time!
          {/* Decorative yellow underline stroke */}
          <svg
            className="absolute -bottom-1 left-0 w-full h-2 text-[#FFC72C]"
            viewBox="0 0 100 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8 C 25 3, 75 11, 98 6"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      {/* Right burst accent lines matching design */}
      <div className="flex flex-col gap-1 items-start opacity-80">
        <span className="w-2.5 h-0.5 bg-[#007A33] rounded-full -rotate-45"></span>
        <span className="w-3.5 h-0.5 bg-[#007A33] rounded-full"></span>
        <span className="w-2.5 h-0.5 bg-[#007A33] rounded-full rotate-45"></span>
      </div>
    </motion.div>
  );
};

export default LimitedOffer;
