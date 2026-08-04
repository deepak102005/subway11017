'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { containerStagger } from '@/lib/animations';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.main
      variants={containerStagger}
      initial="hidden"
      animate="visible"
      className={`min-h-screen w-full bg-[#F8F8F8] flex flex-col items-center justify-between mx-auto max-w-md shadow-2xl relative overflow-x-hidden ${className}`}
    >
      {children}
    </motion.main>
  );
};

export default AnimatedContainer;
