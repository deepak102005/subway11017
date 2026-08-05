import { STORAGE_KEYS } from '@/lib/constants';
import { UserRewardState } from '@/types/reward';

const defaultState: UserRewardState = {
  reviewCompleted: false,
  scratchCompleted: false,
  rewardUnlocked: false,
  rewardClaimed: false,
};

export const getRewardState = (): UserRewardState => {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATE);
    if (!raw) return defaultState;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading reward state:', e);
    return defaultState;
  }
};

export const updateRewardState = (
  updates: Partial<UserRewardState>
): UserRewardState => {
  if (typeof window === 'undefined') return defaultState;
  try {
    const current = getRewardState();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error updating reward state:', e);
    return defaultState;
  }
};

export const markReviewCompleted = (): UserRewardState => {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('subway_review_pending', 'true');
    } catch (e) {
      console.error('Error setting sessionStorage:', e);
    }
  }
  return updateRewardState({
    reviewCompleted: true,
    reviewTimestamp: Date.now(),
  });
};

export const isReviewPendingInSession = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem('subway_review_pending') === 'true';
  } catch (e) {
    return false;
  }
};

export const markScratchCompleted = (): UserRewardState => {
  return updateRewardState({
    scratchCompleted: true,
    scratchTimestamp: Date.now(),
    rewardUnlocked: true,
  });
};

export const markRewardClaimed = (): UserRewardState => {
  return updateRewardState({
    rewardClaimed: true,
    claimedTimestamp: Date.now(),
    claimId: 'SUB-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
  });
};

export const resetRewardState = (): UserRewardState => {
  if (typeof window === 'undefined') return defaultState;
  try {
    localStorage.removeItem(STORAGE_KEYS.STATE);
    sessionStorage.removeItem('subway_review_pending');
  } catch (e) {
    console.error('Error resetting state:', e);
  }
  return defaultState;
};
