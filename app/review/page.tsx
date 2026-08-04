'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Logo from '@/components/Logo';
import FooterWave from '@/components/FooterWave';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ROUTES } from '@/lib/routes';

export default function ReviewPage() {
  const router = useRouter();
  const { markReviewCompleted } = useLocalStorage();

  useEffect(() => {
    markReviewCompleted();
    const timer = setTimeout(() => {
      router.push(ROUTES.SCRATCH);
    }, 1200);

    return () => clearTimeout(timer);
  }, [markReviewCompleted, router]);

  return (
    <AnimatedContainer>
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 py-8 text-center">
        <Logo className="mb-8" />

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 max-w-xs w-full flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#007A33] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-[#007A33] text-sm">
            Redirecting to Scratch & Win...
          </p>
        </div>
      </div>

      <FooterWave />
    </AnimatedContainer>
  );
}
