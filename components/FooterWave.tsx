'use client';

import React from 'react';

export const FooterWave: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden leading-none mt-auto pointer-events-none z-10">
      <svg
        className="relative block w-full h-20 sm:h-24 md:h-28"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Yellow Accent Wave Layer */}
        <path
          d="M0 60 C150 95 350 40 600 70 C850 100 1050 45 1200 65 V120 H0 Z"
          fill="#FFC72C"
        />
        {/* Primary Green Wave Layer */}
        <path
          d="M0 72 C180 105 380 48 620 80 C840 108 1020 55 1200 75 V120 H0 Z"
          fill="#007A33"
        />
      </svg>
    </div>
  );
};

export default FooterWave;
