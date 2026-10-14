import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className={`${iconSizes[size]} relative rounded-xl bg-gradient-to-br from-purple-500 via-purple-700 to-indigo-950 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105`}
      >
        <div className="w-full h-full bg-[#0a0517] rounded-[10px] flex items-center justify-center overflow-hidden relative">
          {/* Subtle geometric inner glow */}
          <div className="absolute inset-0 bg-radial from-purple-500/20 to-transparent"></div>
          
          <svg viewBox="0 0 32 32" fill="none" className="w-5/6 h-5/6 relative z-10" xmlns="http://www.w3.org/2000/svg">
            {/* Dynamic R stroke with currency node */}
            <path
              d="M8 6H16.5C19.5376 6 22 8.46243 22 11.5C22 14.5376 19.5376 17 16.5 17H8V6Z"
              stroke="url(#brandGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 17H13L19.5 26"
              stroke="url(#brandGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Fintech digital currency spark node */}
            <circle cx="21" cy="9" r="2.2" fill="#c084fc" className="animate-pulse" />
            <defs>
              <linearGradient id="brandGrad" x1="8" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e9d5ff" />
                <stop offset="0.5" stopColor="#a855f7" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className={`font-extrabold tracking-tight text-white font-['Outfit'] ${textSizes[size]}`}>
            rcash
          </span>
          <span className={`font-semibold text-purple-400 font-['Outfit'] ${size === 'lg' ? 'text-2xl' : 'text-base'} ml-0.5`}>
            .my
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-medium text-purple-300/70 tracking-wider uppercase">
            Malaysia Fintech
          </span>
        )}
      </div>
    </div>
  );
};
