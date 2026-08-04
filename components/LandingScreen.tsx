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
import { getRewardState } from '@/utils/storage';

export default function LandingScreen() {
  const router = useRouter();
  const { state, isLoaded, markReviewCompleted } = useLocalStorage();

  useEffect(() => {
    if (!isLoaded) return;

    if (state.rewardClaimed) {
      router.push(ROUTES.REWARD);
    }
  }, [state, isLoaded, router]);

  const handleReviewClick = () => {
    markReviewCompleted();
    router.push(ROUTES.SCRATCH);
  };

  return (
    <AnimatedContainer>
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-6 sm:py-10 text-center">
        {/* Subway Logo Branding */}
        <Logo className="mb-10 sm:mb-14" />

        {/* Primary CTA Google Review Button */}
        <GoogleButton onClick={handleReviewClick} className="my-2" />

        {/* Limited Time Notice */}
        <LimitedOffer />
      </div>

      <FooterWave />
    </AnimatedContainer>
  );
}
