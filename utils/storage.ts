import { STORAGE_KEYS } from '@/lib/constants';
import { UserRewardState } from '@/types/reward';

const SESSION_KEY_REVIEW_PENDING = 'subway_review_pending_ts';

const defaultState: UserRewardState = {
  reviewCompleted: false,
  scratchCompleted: false,
  rewardUnlocked: false,
  rewardClaimed: false,
};

// ─── Core State Helpers ────────────────────────────────────────────────────────

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

// ─── Review Pending (set when user taps Google Maps button) ────────────────────

/**
 * Called the moment the user taps "Google Review & Claim".
 * Records the timestamp so we know when to verify from.
 */
export const setReviewPending = (): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_KEY_REVIEW_PENDING, String(Date.now()));
  } catch (e) {
    console.error('Error setting review pending:', e);
  }
};

/**
 * Returns the timestamp (ms) when the user opened Maps, or null if not pending.
 */
export const getReviewPendingTimestamp = (): number | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY_REVIEW_PENDING);
    if (!raw) return null;
    const ts = parseInt(raw, 10);
    return isNaN(ts) ? null : ts;
  } catch {
    return null;
  }
};

/**
 * Clears the review-pending flag (called after verification completes).
 */
export const clearReviewPending = (): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_KEY_REVIEW_PENDING);
  } catch {
    // ignore
  }
};

// ─── Review Completed (only called after successful API verification) ──────────

export const markReviewCompleted = (): UserRewardState => {
  clearReviewPending();
  return updateRewardState({
    reviewCompleted: true,
    reviewTimestamp: Date.now(),
  });
};

// ─── Scratch / Reward ──────────────────────────────────────────────────────────

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
    clearReviewPending();
  } catch (e) {
    console.error('Error resetting state:', e);
  }
  return defaultState;
};
