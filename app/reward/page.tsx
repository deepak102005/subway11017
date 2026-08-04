'use client';

import React from 'react';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import RewardCard from '@/components/RewardCard';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import Confetti from '@/components/Confetti';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function RewardPage() {
  const { state, markRewardClaimed, resetState } = useLocalStorage();

  const isClaimed = state.rewardClaimed;

  return (
    <AnimatedContainer>
      {/* Confetti Explosion on Unlocked State */}
      {!isClaimed && <Confetti trigger={true} />}

      <Header showBack={!isClaimed} />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-4 text-center">
        {/* Top Logo */}
        <Logo compact showTagline className="mb-2" />

        {/* Claim Status Label for Image 4 Match */}
        {isClaimed && (
          <span className="text-xs font-black tracking-widest text-[#007A33] uppercase my-1">
            CLAIM STATUS
          </span>
        )}

        {/* Reward Card Component (Unlocked or Claimed) */}
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
