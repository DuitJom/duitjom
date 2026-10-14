import React, { useState } from 'react';
import { ShieldCheck, Smartphone, Mail, KeyRound, Fingerprint, Check, X, Shield, QrCode } from 'lucide-react';
import { Language } from '../types.ts';
import { translations } from '../data/translations.ts';

interface TwoFactorModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ isOpen, lang, onClose }) => {
  const t = translations[lang].security;
  const [activeMethods, setActiveMethods] = useState<{
    sms: boolean;
    email: boolean;
    authenticator: boolean;
    passkey: boolean;
  }>({
    sms: true,
    email: true,
    authenticator: false,
    passkey: true,
  });

  const [showTotpQr, setShowTotpQr] = useState(false);

  if (!isOpen) return null;

  const toggleMethod = (key: keyof typeof activeMethods) => {
    setActiveMethods((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#0e071c] border border-purple-500/30 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.18)] text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-purple-300/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-purple-900/30"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white">
              {t.title}
            </h3>
            <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* 2FA Protection Summary */}
        <div className="p-3.5 mb-5 rounded-xl bg-purple-950/40 border border-purple-500/25 flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-emerald-300">Piawaian Keselamatan Bank Negara:</span>
            <span className="text-purple-200/80 block mt-0.5">
              OTP mandatori untuk pendaftaran baharu bagi memastikan tiada penyamaran identiti.
            </span>
          </div>
        </div>

        {/* 2FA Methods List */}
        <div className="space-y-3 mb-6">
          {/* Method 1: SMS OTP */}
          <div className="p-4 rounded-xl bg-[#140a28] border border-purple-900/50 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 mt-0.5">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold text-white">{t.methodSms}</h4>
                  <span className="text-[10px] font-semibold text-purple-300 bg-purple-900/40 border border-purple-700/40 px-1.5 py-0.2 rounded">
                    Asas (Wajib Daftar)
                  </span>
                </div>
                <p className="text-[11px] text-purple-300/70 mt-0.5">{t.methodSmsDesc}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleMethod('sms')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                activeMethods.sms ? 'bg-purple-600' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  activeMethods.sms ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Method 2: Email OTP */}
          <div className="p-4 rounded-xl bg-[#140a28] border border-purple-900/50 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">{t.methodEmail}</h4>
                <p className="text-[11px] text-purple-300/70 mt-0.5">{t.methodEmailDesc}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleMethod('email')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                activeMethods.email ? 'bg-purple-600' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  activeMethods.email ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Method 3: Authenticator App */}
          <div className="p-4 rounded-xl bg-[#140a28] border border-purple-900/50">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">{t.methodAuthApp}</h4>
                  <p className="text-[11px] text-purple-300/70 mt-0.5">{t.methodAuthAppDesc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleMethod('authenticator');
                  if (!activeMethods.authenticator) {
                    setShowTotpQr(true);
                  }
                }}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  activeMethods.authenticator ? 'bg-purple-600' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    activeMethods.authenticator ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {showTotpQr && activeMethods.authenticator && (
              <div className="mt-3 pt-3 border-t border-purple-900/40 flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                  <QrCode className="w-14 h-14 text-black" />
                </div>
                <div className="text-[11px] text-purple-200">
                  <span className="font-semibold block text-white">Imbas dengan Google Authenticator:</span>
                  <span className="font-mono text-[10px] text-purple-300 block mt-0.5">RCASH-2FA: 9812-4421-9902</span>
                  <button
                    type="button"
                    onClick={() => setShowTotpQr(false)}
                    className="text-purple-400 underline mt-1 text-[10px]"
                  >
                    Simpan & Lengkapkan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Method 4: Biometric / Passkey */}
          <div className="p-4 rounded-xl bg-[#140a28] border border-purple-900/50 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-900/40 text-purple-400 mt-0.5">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold text-white">{t.methodPasskey}</h4>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/40 px-1.5 py-0.2 rounded">
                    {t.statusRecommended}
                  </span>
                </div>
                <p className="text-[11px] text-purple-300/70 mt-0.5">{t.methodPasskeyDesc}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleMethod('passkey')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                activeMethods.passkey ? 'bg-purple-600' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  activeMethods.passkey ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-purple-700 hover:bg-purple-600 transition-colors"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
