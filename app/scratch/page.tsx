'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import ScratchCard from '@/components/ScratchCard';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ToastContext';
import { ROUTES } from '@/lib/routes';

export default function ScratchPage() {
  const router = useRouter();
  const { state, isLoaded, markScratchCompleted } = useLocalStorage();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoaded) return;

    // Guard: reward already claimed — skip to reward page
    if (state.rewardClaimed || state.scratchCompleted) {
      router.replace(ROUTES.REWARD);
      return;
    }

    // Guard: no verified review — send back to landing with toast
    if (!state.reviewCompleted) {
      showToast('⭐ Please leave a Google review to claim your reward.', 'warning');
      router.replace(ROUTES.HOME);
      return;
    }
  }, [state, isLoaded, router, showToast]);

  const handleScratchComplete = () => {
    markScratchCompleted();
    router.push(ROUTES.REWARD);
  };

  // Show nothing while guards are running
  if (!isLoaded || !state.reviewCompleted) {
    return null;
  }

  return (
    <AnimatedContainer>
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-4 text-center">
        {/* Subway Branding Header */}
        <Logo compact showTagline className="mb-4" />

        {/* Main Scratch Card Interactive Component */}
        <ScratchCard onComplete={handleScratchComplete} scratchThreshold={60} />
      </div>

      <FooterWave />
    </AnimatedContainer>
  );
}
