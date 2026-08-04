'use client';

import { useState, useEffect } from 'react';
import { UserRewardState } from '@/types/reward';
import {
  getRewardState,
  updateRewardState,
  markReviewCompleted as storageMarkReview,
  markScratchCompleted as storageMarkScratch,
  markRewardClaimed as storageMarkClaimed,
  resetRewardState as storageReset,
} from '@/utils/storage';

export function useLocalStorage() {
  const [state, setState] = useState<UserRewardState>({
    reviewCompleted: false,
    scratchCompleted: false,
    rewardUnlocked: false,
    rewardClaimed: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(getRewardState());
    setIsLoaded(true);
  }, []);

  const markReviewCompleted = () => {
    const updated = storageMarkReview();
    setState(updated);
  };

  const markScratchCompleted = () => {
    const updated = storageMarkScratch();
    setState(updated);
  };

  const markRewardClaimed = () => {
    const updated = storageMarkClaimed();
    setState(updated);
  };

  const resetState = () => {
    const updated = storageReset();
    setState(updated);
  };

  return {
    state,
    isLoaded,
    markReviewCompleted,
    markScratchCompleted,
    markRewardClaimed,
    resetState,
    updateState: (updates: Partial<UserRewardState>) => {
      const updated = updateRewardState(updates);
      setState(updated);
    },
  };
}
