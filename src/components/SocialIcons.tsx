import React from 'react';

export const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.44c.64-.78 1.08-1.86.96-2.94-1 .04-2.13.67-2.79 1.45-.58.67-1.1 1.76-.96 2.82 1.12.09 2.15-.55 2.79-1.33z" />
  </svg>
);

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const MyDigitalIdIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="5" fill="#1e1035" />
    <path
      d="M5 8.5C5 7.11929 6.11929 6 7.5 6H16.5C17.8807 6 19 7.11929 19 8.5V15.5C19 16.8807 17.8807 18 16.5 18H7.5C6.11929 18 5 16.8807 5 15.5V8.5Z"
      stroke="#a855f7"
      strokeWidth="1.5"
    />
    <circle cx="10" cy="11" r="2" fill="#c084fc" />
    <path d="M7.5 15C7.5 13.8954 8.61929 13 10 13C11.3807 13 12.5 13.8954 12.5 15" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 10H16.5M14.5 12H16.5M14.5 14H16.5" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PasskeyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M2 12a10 10 0 0 1 18-6" />
    <path d="M2 16h.01" />
    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
    <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
    <path d="M5 10a8 8 0 0 1 14 0" />
    <path d="M7 16a4 4 0 0 1 8 0" />
  </svg>
);

export const FpxIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 20" fill="none" className={className}>
    <rect width="32" height="20" rx="3" fill="#180e2b" />
    <path d="M4 14V6H10.5C11.5 6 12 6.5 12 7.5C12 8.5 11.5 9 10.5 9H6.5V11H10V12H6.5V14H4Z" fill="#a855f7" />
    <path d="M13 14V6H19C20 6 20.5 6.7 20.5 7.7C20.5 8.7 20 9.3 19 9.3H15.5V14H13Z" fill="#c084fc" />
    <path d="M22 6L25 10L22 14H24L26 11.2L28 14H30L27 10L30 6H28L26 8.8L24 6H22Z" fill="#38bdf8" />
  </svg>
);
