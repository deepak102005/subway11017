'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingScreen from '@/components/LandingScreen';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ROUTES } from '@/lib/routes';

import { getRewardState } from '@/utils/storage';

export default function Home() {
  const router = useRouter();
  const { state, isLoaded } = useLocalStorage();

  useEffect(() => {
    if (!isLoaded) return;

    if (state.rewardClaimed) {
      router.push(ROUTES.REWARD);
    }
  }, [state, isLoaded, router]);

  return <LandingScreen />;
}
