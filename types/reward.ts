export interface StoreLocation {
  id: string;
  address: string;
  cityStateZip: string;
  fullAddress: string;
  isPrimary?: boolean;
}

export interface UserRewardState {
  reviewCompleted: boolean;
  reviewTimestamp?: number;
  scratchCompleted: boolean;
  scratchTimestamp?: number;
  rewardUnlocked: boolean;
  rewardClaimed: boolean;
  claimedTimestamp?: number;
  claimId?: string;
}

export interface ScratchCardProps {
  onComplete: () => void;
  width?: number;
  height?: number;
  scratchThreshold?: number; // default 60%
}
