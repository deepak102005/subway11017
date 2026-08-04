'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import ScratchCard from '@/components/ScratchCard';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ROUTES } from '@/lib/routes';

export default function ScratchPage() {
  const router = useRouter();
  const { state, isLoaded, markScratchCompleted } = useLocalStorage();

  useEffect(() => {
    if (!isLoaded) return;

    // ONLY lock and force redirect if the offer has officially been redeemed at the counter
    if (state.rewardClaimed) {
      router.push(ROUTES.REWARD);
    }
  }, [state, isLoaded, router]);

  const handleScratchComplete = () => {
    markScratchCompleted();
    router.push(ROUTES.REWARD);
  };

  return (
    <AnimatedContainer>
      <Header showBack={!state.rewardClaimed} onBack={() => router.push(ROUTES.HOME)} />

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
