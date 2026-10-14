import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Smartphone, Mail, RefreshCw, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { OTPState, Language } from '../types.ts';
import { translations } from '../data/translations.ts';

interface OtpOverlayModalProps {
  otpState: OTPState;
  lang: Language;
  onVerify: (codeString: string) => void;
  onResend: () => void;
  onClose: () => void;
  onQuickFillTestCode: () => void;
}

export const OtpOverlayModal: React.FC<OtpOverlayModalProps> = ({
  otpState,
  lang,
  onVerify,
  onResend,
  onClose,
  onQuickFillTestCode,
}) => {
  const t = translations[lang].otp;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState<string[]>(otpState.code || ['', '', '', '', '', '']);

  useEffect(() => {
    // Keep local digits in sync if prop changes (e.g. quick test code)
    if (otpState.code && otpState.code.some((d) => d !== '')) {
      setDigits(otpState.code);
    }
  }, [otpState.code]);

  useEffect(() => {
    // Focus first input upon mount
    if (otpState.isOpen && !otpState.isSuccess) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [otpState.isOpen, otpState.isSuccess]);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...digits];

    if (cleaned.length === 0) {
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    // Single digit input
    const char = cleaned.slice(-1);
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto focus next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else {
      // Check if all filled
      if (newDigits.every((d) => d !== '')) {
        onVerify(newDigits.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    // Focus last filled or next
    const targetIdx = Math.min(pasted.length, 5);
    inputRefs.current[targetIdx]?.focus();

    if (pasted.length === 6) {
      onVerify(pasted);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = digits.join('');
    if (fullCode.length === 6) {
      onVerify(fullCode);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Masked phone format for privacy
  const maskedPhone = otpState.phone
    ? otpState.phone.replace(/(\+?60\s?1\d)(\d{3,4})(\d{4})/, '$1-*** $3')
    : '+60 12-*** 8891';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      {/* Outer ambient glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-[#0e071c] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.18)] text-slate-100 overflow-hidden">
        {/* Subtle decorative purple wave lines in background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-purple-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

        {/* Close Button */}
        {!otpState.isSuccess && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-purple-300/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {otpState.isSuccess ? (
          /* SUCCESS STATE */
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-5 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-['Outfit'] text-white mb-2">
              {t.successTitle}
            </h3>
            <p className="text-sm text-purple-200/80 max-w-sm mb-6">
              {t.successSubtitle}
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
              <span>Menyediakan papan pemuka Rcash anda...</span>
            </div>
          </div>
        ) : (
          /* VERIFICATION FORM */
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header Icon & Title */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-['Outfit'] text-white">
                    {t.title}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    2FA Wajib
                  </span>
                </div>
                <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">
                  {t.subtitle}
                </p>
              </div>
            </div>

            {/* Recipient Details Card */}
            <div className="bg-[#150a2b] border border-purple-900/50 rounded-xl p-3.5 mb-6 flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between text-purple-200">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-mono">{maskedPhone}</span>
                </div>
                <span className="text-[11px] text-purple-400 font-medium">SMS OTP</span>
              </div>
              {otpState.email && (
                <div className="flex items-center justify-between text-purple-300/80 pt-1 border-t border-purple-900/30">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate font-mono">{otpState.email}</span>
                  </div>
                  <span className="text-[11px] text-purple-400 font-medium shrink-0">Emel Sandaran</span>
                </div>
              )}
            </div>

            {/* 6-Digit OTP Input Boxes */}
            <div className="mb-4" onPaste={handlePaste}>
              <label className="block text-xs font-medium text-purple-200/90 mb-2.5 text-center">
                Masukkan 6-Digit Kod Keselamatan:
              </label>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold font-mono rounded-xl bg-[#160a2c] text-white border transition-all duration-200 outline-none
                      ${
                        digit
                          ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                          : 'border-purple-900/50 focus:border-purple-400 focus:bg-[#1a0c36] focus:ring-2 focus:ring-purple-500/30'
                      }
                      ${otpState.error ? 'border-red-500/80 text-red-200' : ''}
                    `}
                    disabled={otpState.isVerifying}
                    aria-label={`Digit ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {otpState.error && (
              <div className="flex items-center gap-2 p-2.5 mb-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{otpState.error}</span>
              </div>
            )}

            {/* Quick Test Code Button (For Smooth Demo Testing) */}
            <div className="flex items-center justify-center mb-5">
              <button
                type="button"
                onClick={onQuickFillTestCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-800/40 hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.useTestCode}: <strong className="font-mono text-purple-200">{otpState.testCode}</strong></span>
              </button>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={otpState.isVerifying || digits.some((d) => d === '')}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 active:scale-[0.99] transition-all duration-200 shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
            >
              {otpState.isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.verifying}</span>
                </>
              ) : (
                <span>{t.verifyButton}</span>
              )}
            </button>

            {/* Resend Timer & Action */}
            <div className="flex items-center justify-between text-xs text-purple-300/80 pt-2 border-t border-purple-900/40">
              <div>
                {otpState.timeLeft > 0 ? (
                  <span>
                    {t.resendIn}{' '}
                    <span className="font-mono font-semibold text-purple-200">
                      {formatTimer(otpState.timeLeft)}
                    </span>
                  </span>
                ) : (
                  <span className="text-amber-300">Kod telah tamat tempoh</span>
                )}
              </div>

              <button
                type="button"
                onClick={onResend}
                disabled={otpState.timeLeft > 0 || otpState.isVerifying}
                className="font-medium text-purple-400 hover:text-purple-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t.resendButton}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
