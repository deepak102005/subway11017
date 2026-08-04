'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, onBack }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="relative w-full h-16 sm:h-20 overflow-hidden z-10 flex items-center justify-between px-4">
      {/* Optional Back Button */}
      {showBack ? (
        <button
          onClick={handleBack}
          aria-label="Go Back"
          className="relative z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#007A33] flex items-center justify-center shadow-sm border border-gray-200 cursor-pointer active:scale-95 transition-all"
        >
          <FaChevronLeft className="w-4 h-4 mr-0.5" />
        </button>
      ) : (
        <div />
      )}

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
