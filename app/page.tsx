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

  const checkAndNavigate = React.useCallback(() => {
    const currentState = getRewardState();

    if (currentState.rewardClaimed) {
      router.push(ROUTES.REWARD);
      return;
    }

    if (currentState.reviewCompleted) {
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

  return <LandingScreen />;
}
