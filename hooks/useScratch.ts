'use client';

import { useState, useCallback } from 'react';

export function useScratch(threshold: number = 60, onComplete?: () => void) {
  const [scratchPercent, setScratchPercent] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const updateProgress = useCallback(
    (percent: number) => {
      setScratchPercent(percent);
      if (percent >= threshold && !isCompleted) {
        setIsCompleted(true);
        if (onComplete) {
          onComplete();
        }
      }
    },
    [threshold, isCompleted, onComplete]
  );

  const resetScratch = useCallback(() => {
    setScratchPercent(0);
    setIsCompleted(false);
  }, []);

  return {
    scratchPercent,
    isCompleted,
    updateProgress,
    resetScratch,
  };
}
