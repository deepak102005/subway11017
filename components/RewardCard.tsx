'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { popVariants } from '@/lib/animations';
import Cookie from './Cookie';
import AddressList from './AddressList';
import { PRIMARY_LOCATION } from '@/lib/constants';

interface RewardCardProps {
  isAlreadyClaimed?: boolean;
  onClaimReward?: () => void;
  onResetForDemo?: () => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  isAlreadyClaimed = false,
  onClaimReward,
  onResetForDemo,
}) => {
  if (isAlreadyClaimed) {
    // Screen 4: Offer Already Claimed Card (Matching Image 4)
    return (
      <motion.div
        variants={popVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm sm:max-w-md mx-auto my-4 px-2"
      >
        <div className="bg-white rounded-[28px] shadow-[0_16px_36px_rgba(0,0,0,0.14)] border border-gray-200 overflow-hidden relative">
          {/* Dark Header Status Bar */}
          <div className="bg-[#1E293B] text-white text-center py-2.5 px-4 font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2">
            <FaLock className="text-[#FFC72C] w-4 h-4" />
            <span>OFFER ALREADY CLAIMED</span>
          </div>

          {/* Subhead Status Badge */}
          <div className="bg-[#E6F4EA] text-[#007A33] text-center py-1.5 px-3 font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-1.5 border-b border-[#007A33]/10">
            <FaCheckCircle className="text-[#007A33] w-4 h-4" />
            <span>OFFER REDEEMED</span>
          </div>

          {/* Main Body Content */}
          <div className="p-6 flex flex-col items-center text-center">
            {/* Cookie Circular Image Badge with Green Checkmark */}
            <div className="relative my-2">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#007A33]/20 shadow-md relative bg-[#F8F8F8]">
                <Image
                  src="/cookie.png"
                  alt="Claimed Cookie"
                  fill
                  className="object-cover p-1"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#007A33] border-2 border-white flex items-center justify-center text-white shadow-md">
                <FaCheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] uppercase tracking-tight leading-tight mt-3 mb-2">
              YOU HAVE ALREADY CLAIMED
              <br />
              <span className="text-[#007A33]">YOUR FREE COOKIE!</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-xs mb-4">
              This single-use offer has already been redeemed on this device.
              Thank you for your Google Review and for eating fresh at Subway! 🥪
            </p>

            {/* Location Box */}
            <div className="w-full bg-[#F1F5F9] rounded-xl p-3 flex items-start gap-3 text-left mb-4 border border-gray-200">
              <div className="w-7 h-7 rounded-full bg-[#007A33]/15 flex items-center justify-center text-[#007A33] shrink-0 mt-0.5">
                <FaMapMarkerAlt className="w-4 h-4 text-[#007A33]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#1E293B] text-xs sm:text-sm">
                  {PRIMARY_LOCATION.address}
                </span>
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  {PRIMARY_LOCATION.cityStateZip}
                </span>
              </div>
            </div>

            {/* Claim Meta Footer Line */}
            <div className="w-full pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs text-gray-500 font-semibold">
              <span>Limit: 1 claim per customer</span>
              <span className="text-[#007A33] font-bold">Status: Claimed</span>
            </div>

            {/* Sub-caption */}
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-3">
              *Thank you for being a valued Subway customer!
            </p>

            {/* Dev Reset Option for testing */}
            {onResetForDemo && (
              <button
                onClick={onResetForDemo}
                className="mt-4 text-[11px] text-[#007A33] underline hover:text-[#005C26] font-medium cursor-pointer"
              >
                Reset demo state (test again)
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Screen 3: Unlocked Reward Screen (Matching Image 3)
  return (
    <motion.div
      variants={popVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm sm:max-w-md mx-auto my-4 px-2"
    >
      <div className="bg-[#007A33] rounded-[28px] p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.18)] border-2 border-white/20 relative overflow-hidden">
        {/* Header Title: SCRATCH & WIN! */}
        <div className="flex items-center justify-center gap-2 text-center py-1 pb-3">
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

        {/* Inner Card Container */}
        <div className="bg-[#FFC72C] rounded-[22px] p-2 overflow-hidden shadow-inner">
          <div className="bg-white rounded-[18px] p-4 sm:p-5 flex flex-col items-center text-center shadow-md relative border-2 border-dashed border-[#007A33]/20">
            {/* YOU WON Badge */}
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className="text-[#FFC72C] text-lg font-black">→</span>
              <span className="text-sm sm:text-base font-black text-[#007A33] tracking-widest uppercase">
                YOU WON!
              </span>
              <span className="text-[#FFC72C] text-lg font-black">←</span>
            </div>

            {/* Offer Banner Grid: Heading + Cookie Image on Right */}
            <div className="flex items-center justify-between gap-2 my-2 w-full text-left">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-black text-[#007A33] leading-snug uppercase tracking-tight">
                  GET <span className="text-[#FFC72C] bg-[#007A33] px-1.5 py-0.5 rounded-md">FREE</span> COOKIE
                  <br />
                  ON YOUR ORDER
                </h3>
              </div>
              <Cookie size={75} className="shrink-0" />
            </div>

            {/* Divider */}
            <div className="w-full h-[1.5px] bg-[#007A33]/30 my-3" />

            {/* Location Subhead */}
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className="text-[#FFC72C] text-base font-black">→</span>
              <span className="text-xs sm:text-sm font-black text-[#007A33] tracking-wider uppercase">
                AT THIS LOCATION
              </span>
              <span className="text-[#FFC72C] text-base font-black">←</span>
            </div>

            {/* Single Address List Component */}
            <AddressList singleAddressOnly={true} />

            {/* Bottom Redeem Instructions */}
            <p className="text-xs sm:text-sm font-bold text-[#007A33] mt-3 mb-1">
              Show this offer at checkout to redeem.
            </p>

            {/* Footer Notice without T&C Apply */}
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
              *Valid for a limited time.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardCard;
