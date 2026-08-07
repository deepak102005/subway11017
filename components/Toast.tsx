'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'warning' | 'error';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onDismiss: (id: string) => void;
}

const ICONS: Record<ToastType, string> = {
  success: '✅',
  warning: '⭐',
  error: '❌',
};

const COLORS: Record<ToastType, string> = {
  success: 'bg-[#007A33] border-[#005C26]',
  warning: 'bg-[#FFC72C] border-[#e6b000]',
  error: 'bg-red-500 border-red-700',
};

const TEXT_COLORS: Record<ToastType, string> = {
  success: 'text-white',
  warning: 'text-[#1a1a1a]',
  error: 'text-white',
};

const AUTO_DISMISS_MS = 4500;

export function Toast({ id, message, type, onDismiss }: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100);
      setProgress(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        onDismiss(id);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`relative w-full max-w-sm mx-auto rounded-2xl border-2 shadow-[0_8px_32px_rgba(0,0,0,0.18)] overflow-hidden ${COLORS[type]}`}
      role="alert"
      aria-live="polite"
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-white/40 transition-all"
        style={{ width: `${progress}%` }}
      />

      <div className={`flex items-start gap-3 px-4 py-3.5 ${TEXT_COLORS[type]}`}>
        <span className="text-xl leading-none mt-0.5 shrink-0">{ICONS[type]}</span>
        <p className="text-sm font-bold leading-snug flex-1">{message}</p>
        <button
          onClick={() => onDismiss(id)}
          className={`shrink-0 text-lg leading-none opacity-60 hover:opacity-100 transition-opacity ml-1 ${TEXT_COLORS[type]}`}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
