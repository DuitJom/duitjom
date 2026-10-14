import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, X, ShieldAlert } from 'lucide-react';
import { Language } from '../types.ts';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSent(false);
    setEmail('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-[#0e071c] border border-purple-500/30 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.18)] text-slate-100">
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 text-purple-300/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-purple-900/30"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white mb-2">
              {lang === 'ms' ? 'Pautan Penetapan Dihantar!' : 'Reset Link Sent!'}
            </h3>
            <p className="text-xs text-purple-200/80 mb-6 leading-relaxed">
              {lang === 'ms'
                ? `Kami telah menghantar pautan pengesahan keselamatan ke ${email}. Sila semak peti masuk anda.`
                : `We have sent a secure recovery link to ${email}. Please check your inbox.`}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-700 hover:bg-purple-600 transition-colors"
            >
              {lang === 'ms' ? 'Kembali ke Log Masuk' : 'Back to Sign In'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-900/40 text-purple-300">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Outfit'] text-white">
                  {lang === 'ms' ? 'Set Semula Kata Laluan' : 'Reset Password'}
                </h3>
                <p className="text-xs text-purple-300/70">
                  {lang === 'ms'
                    ? 'Masukkan emel berdaftar anda untuk menerima token pengesahan.'
                    : 'Enter your registered email to receive a secure token.'}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-purple-200/90 mb-1.5">
                {lang === 'ms' ? 'Alamat Emel' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@contoh.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#130924] border border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15 rounded-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Menghantar...</span>
              ) : (
                <>
                  <span>{lang === 'ms' ? 'Hantar Pautan Keselamatan' : 'Send Recovery Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
