'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import GoogleButton from '@/components/GoogleButton';
import LimitedOffer from '@/components/LimitedOffer';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useToast } from '@/components/ToastContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ROUTES } from '@/lib/routes';
import {
  getRewardState,
  getReviewPendingTimestamp,
  clearReviewPending,
  markReviewCompleted,
} from '@/utils/storage';

type VerifyStatus = 'idle' | 'verifying' | 'done';

export default function LandingScreen() {
  const router = useRouter();
  const { state, isLoaded } = useLocalStorage();
  const { showToast } = useToast();
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');
  const isVerifyingRef = useRef(false); // prevent duplicate calls

  // ─── Verification call ───────────────────────────────────────────────────────

  const runVerification = useCallback(async () => {
    // Guard against duplicate concurrent calls
    if (isVerifyingRef.current) return;

    const pendingTs = getReviewPendingTimestamp();
    if (!pendingTs) return; // User hasn't tapped the Maps button yet

    isVerifyingRef.current = true;
    setVerifyStatus('verifying');

    try {
      const res = await fetch(`/api/verify-review?pendingTs=${pendingTs}`, {
        cache: 'no-store',
      });
      const data: { verified: boolean; message: string } = await res.json();

      if (data.verified) {
        // ✅ Review confirmed
        markReviewCompleted(); // clears pending + writes localStorage
        setVerifyStatus('done');
        showToast('✅ Review verified successfully! Scratch your card to claim your reward.', 'success');
        // Small delay so the toast is visible before navigation
        await new Promise((r) => setTimeout(r, 600));
        router.push(ROUTES.SCRATCH);
      } else {
        // ❌ No review detected
        clearReviewPending();
        setVerifyStatus('idle');
        showToast('⭐ Please leave a Google review to claim your reward.', 'warning');
      }
    } catch (err) {
      console.error('[LandingScreen] Verification error:', err);
      clearReviewPending();
      setVerifyStatus('idle');
      showToast('⭐ Please leave a Google review to claim your reward.', 'warning');
    } finally {
      isVerifyingRef.current = false;
    }
  }, [router, showToast]);

  // ─── Guard: already completed states ─────────────────────────────────────────

  useEffect(() => {
    if (!isLoaded) return;
    const current = getRewardState();

    if (current.rewardClaimed) {
      router.replace(ROUTES.REWARD);
      return;
    }
    if (current.reviewCompleted && current.scratchCompleted) {
      router.replace(ROUTES.REWARD);
      return;
    }
    if (current.reviewCompleted && !current.scratchCompleted) {
      router.replace(ROUTES.SCRATCH);
      return;
    }
  }, [isLoaded, router]);

  // ─── Return detection — fires when user comes back from Google Maps ───────────

  useEffect(() => {
    const handleReturn = () => {
      // Only verify if there's a pending timestamp and we're not already verifying
      if (getReviewPendingTimestamp() && !isVerifyingRef.current) {
        runVerification();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleReturn();
      }
    };

    window.addEventListener('focus', handleReturn);
    window.addEventListener('pageshow', handleReturn);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleReturn);
      window.removeEventListener('pageshow', handleReturn);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [runVerification]);

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <AnimatedContainer>
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-6 sm:py-10 text-center">
        {/* Subway Logo Branding */}
        <Logo className="mb-10 sm:mb-14" />

        {/* Primary CTA Google Review Button */}
        <GoogleButton className="my-2" />

        {/* Highlighted Instruction Banner */}
        <div className="mt-3 mb-2 px-4 py-2 rounded-xl bg-[#007A33]/10 border-2 border-[#007A33]/30 shadow-sm max-w-sm sm:max-w-md w-full flex items-center justify-center">
          <p className="text-xs sm:text-sm font-black text-[#007A33] uppercase tracking-wide">
            Leave a Review &{' '}
            <span className="bg-[#FFC72C] text-[#007A33] px-2 py-0.5 rounded-md font-black">
              Come Back to Claim
            </span>
          </p>
        </div>

        {/* Limited Time Notice */}
        <LimitedOffer />
      </div>

      <FooterWave />

      {/* ── Verification Overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {verifyStatus === 'verifying' && (
          <motion.div
            key="verify-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-5 px-6"
          >
            {/* Spinner card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-[28px] p-7 shadow-2xl max-w-xs w-full flex flex-col items-center gap-4 text-center"
            >
              {/* Animated spinner */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-[#007A33]/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-[#007A33] animate-spin" />
                {/* Google G inside */}
                <div className="absolute inset-2 rounded-full bg-[#007A33]/5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
              </div>

              <div>
                <p className="font-black text-[#007A33] text-base">Verifying your review…</p>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Checking Google for your review. This takes just a moment.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedContainer>
  );
}
