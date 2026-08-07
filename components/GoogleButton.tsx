'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { buttonVariants } from '@/lib/animations';
import { GOOGLE_MAPS_DEEP_LINK, GOOGLE_MAPS_WEB_URL } from '@/lib/constants';
import { setReviewPending } from '@/utils/storage';

interface GoogleButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
}

/**
 * Opens Google Maps using the native app deep link when available,
 * with a web URL fallback. Always stays in the same tab to prevent
 * blank/untitled pages.
 *
 * Priority:
 *   1. comgooglemaps:// — iOS Google Maps app
 *   2. intent:// — Android Google Maps app
 *   3. https://maps.google.com — Web fallback
 */
function openGoogleMaps() {
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(ua);
  const isIOS = /iphone|ipad|ipod/.test(ua);

  if (isIOS) {
    // Try to open the native iOS Google Maps app.
    // We create a hidden iframe to attempt the custom scheme without navigating away.
    // If the app opens, great. After the timeout the page stays open.
    // We then fall back to the web URL via window.location.
    let appOpened = false;

    // Listen for blur — if the page loses focus the app likely opened
    const blurHandler = () => { appOpened = true; };
    window.addEventListener('blur', blurHandler, { once: true });

    // Attempt deep link
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = GOOGLE_MAPS_DEEP_LINK;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
      window.removeEventListener('blur', blurHandler);
      if (!appOpened) {
        // App not installed — fall back to web in same tab
        window.location.href = GOOGLE_MAPS_WEB_URL;
      }
    }, 1200);
  } else if (isAndroid) {
    // On Android use the intent:// URI which keeps the browser alive
    const intentUrl =
      `intent://maps.google.com/maps?q=Subway+11017+S+Parker+Rd+Parker+CO#Intent;` +
      `scheme=https;package=com.google.android.apps.maps;` +
      `S.browser_fallback_url=${encodeURIComponent(GOOGLE_MAPS_WEB_URL)};end`;
    window.location.href = intentUrl;
  } else {
    // Desktop — just open the web URL in the same tab
    window.location.href = GOOGLE_MAPS_WEB_URL;
  }
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  text = 'Google Review & Claim',
  className = '',
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);

    // Record the exact moment the user tapped — used by the verification API
    setReviewPending();

    if (onClick) {
      onClick();
    }

    openGoogleMaps();
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      disabled={isProcessing}
      onClick={handleClick}
      className={`w-full max-w-sm sm:max-w-md bg-[#007A33] hover:bg-[#006329] text-white font-bold text-lg sm:text-xl py-4 sm:py-4.5 px-5 rounded-[24px] shadow-[0_12px_30px_rgba(0,0,0,0.18)] border-2 border-white/20 flex items-center justify-between transition-all duration-300 group cursor-pointer active:scale-98 disabled:opacity-85 disabled:cursor-not-allowed ${className}`}
    >
      {/* Google 'G' Logo Badge */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-2 shadow-inner shrink-0">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      </div>

      {/* Button Text */}
      <span className="flex-1 text-center font-bold tracking-tight px-2 drop-shadow-sm">
        {isProcessing ? 'Opening Google Maps...' : text}
      </span>

      {/* Right Arrow Icon */}
      <div className="w-7 h-7 flex items-center justify-center text-white/90 group-hover:translate-x-1 transition-transform shrink-0">
        <FaChevronRight className="w-5 h-5 stroke-[2]" />
      </div>
    </motion.button>
  );
};

export default GoogleButton;
