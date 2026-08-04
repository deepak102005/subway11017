'use client';

import React from 'react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="relative w-full h-16 sm:h-20 overflow-hidden z-10 flex items-center justify-between px-4">
      {/* Top Left Empty Container (Back button removed) */}
      <div />

      {/* Top right green curved shape matching design */}
      <svg
        className="absolute top-0 right-0 w-44 sm:w-56 h-full text-[#007A33] pointer-events-none"
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0 H200 V80 C120 80 80 0 0 0 Z" fill="currentColor" />
      </svg>
    </header>
  );
};

export default Header;
