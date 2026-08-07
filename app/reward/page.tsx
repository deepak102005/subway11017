'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import RewardCard from '@/components/RewardCard';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import Confetti from '@/components/Confetti';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ToastContext';
import { ROUTES } from '@/lib/routes';

export default function RewardPage() {
  const router = useRouter();
  const { state, isLoaded, markRewardClaimed, resetState } = useLocalStorage();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoaded) return;

    // Guard: must have scratched or already claimed to view reward
    if (!state.scratchCompleted && !state.rewardClaimed) {
      showToast('⭐ Please leave a Google review to claim your reward.', 'warning');
      router.replace(ROUTES.HOME);
      return;
    }
  }, [state, isLoaded, router, showToast]);

  const isClaimed = state.rewardClaimed;

  // Show nothing while guards are running
  if (!isLoaded || (!state.scratchCompleted && !state.rewardClaimed)) {
    return null;
  }

  return (
    <AnimatedContainer>
      {/* Confetti Explosion on first unlock */}
      {!isClaimed && <Confetti trigger={true} />}

      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-4 text-center">
        {/* Top Logo */}
        <Logo compact showTagline className="mb-2" />

        {/* Claim Status Label */}
        {isClaimed && (
          <span className="text-xs font-black tracking-widest text-[#007A33] uppercase my-1">
            CLAIM STATUS
          </span>
        )}

        {/* Reward Card Component */}
        <RewardCard
          isAlreadyClaimed={isClaimed}
          onClaimReward={markRewardClaimed}
          onResetForDemo={resetState}
        />
      </div>

      <FooterWave />
    </AnimatedContainer>
  );
}
