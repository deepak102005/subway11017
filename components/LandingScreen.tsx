'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import GoogleButton from '@/components/GoogleButton';
import LimitedOffer from '@/components/LimitedOffer';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ROUTES } from '@/lib/routes';
import { getRewardState, isReviewPendingInSession } from '@/utils/storage';

export default function LandingScreen() {
  const router = useRouter();
  const { state, isLoaded, markReviewCompleted } = useLocalStorage();

  const checkAndNavigate = React.useCallback(() => {
    const currentState = getRewardState();

    if (currentState.rewardClaimed) {
      router.push(ROUTES.REWARD);
      return;
    }

    if (currentState.reviewCompleted && isReviewPendingInSession()) {
      router.push(ROUTES.SCRATCH);
    }
  }, [router]);

  useEffect(() => {
    if (!isLoaded) return;
    checkAndNavigate();
  }, [isLoaded, checkAndNavigate]);

  useEffect(() => {
    const handleReturn = () => {
      checkAndNavigate();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleReturn();
      }
    };

    const handlePageShow = () => {
      handleReturn();
    };

    window.addEventListener('focus', handleReturn);
    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleReturn);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAndNavigate]);

  const handleReviewClick = () => {
    markReviewCompleted();
  };

  return (
    <AnimatedContainer>
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-6 sm:py-10 text-center">
        {/* Subway Logo Branding */}
        <Logo className="mb-10 sm:mb-14" />

        {/* Primary CTA Google Review Button */}
        <GoogleButton onClick={handleReviewClick} className="my-2" />

        {/* Highlighted Instruction Banner */}
        <div className="mt-3 mb-2 px-4 py-2 rounded-xl bg-[#007A33]/10 border-2 border-[#007A33]/30 shadow-sm max-w-sm sm:max-w-md w-full flex items-center justify-center">
          <p className="text-xs sm:text-sm font-black text-[#007A33] uppercase tracking-wide">
            Leave a Review & <span className="bg-[#FFC72C] text-[#007A33] px-2 py-0.5 rounded-md font-black">Come Back to Claim</span>
          </p>
        </div>

        {/* Limited Time Notice */}
        <LimitedOffer />
      </div>

      <FooterWave />
    </AnimatedContainer>
  );
}
