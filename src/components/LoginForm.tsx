import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, HelpCircle, Check, Sparkles } from 'lucide-react';
import { AppleIcon, GoogleIcon, MyDigitalIdIcon, PasskeyIcon } from './SocialIcons.tsx';
import { Language } from '../types.ts';
import { translations } from '../data/translations.ts';

interface LoginFormProps {
  lang: Language;
  onLoginSuccess: (email: string) => void;
  onSwitchToRegister: () => void;
  onOpenForgotPassword: () => void;
  onOpenSecurityModal: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  lang,
  onLoginSuccess,
  onSwitchToRegister,
  onOpenForgotPassword,
  onOpenSecurityModal,
}) => {
  const t = translations[lang].auth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailTooltip, setEmailTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError(
        lang === 'ms'
          ? 'Sila masukkan alamat emel dan kata laluan.'
          : 'Please enter both your email address and password.'
      );
      return;
    }

    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(
        lang === 'ms'
          ? 'Format emel tidak sah. Sila masukkan emel yang betul.'
          : 'Invalid email format. Please provide a valid email.'
      );
      return;
    }

    setIsLoading(true);

    // Simulate fast authenticated login check
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 700);
  };

  const handleQuickDemo = () => {
    setEmail('pelanggan@rcash.my');
    setPassword('Rcash2026Secure!');
    setError(null);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(`${provider.toLowerCase()}@rcash.user`);
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
          {t.loginTitle}
        </h2>
        <p className="text-sm text-purple-200/70 mt-2 max-w-sm mx-auto leading-relaxed">
          {t.loginSubtitle}
        </p>
      </div>

      {/* Demo Credentials Quick-Fill Pill */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={handleQuickDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-900/50 hover:text-white transition-all shadow-[0_0_12px_rgba(168,85,247,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{t.quickDemo}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 mb-5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Login Form (Only Email & Password for returning customers) */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-purple-200/90 flex items-center gap-1.5">
              <span>{t.emailLabel}</span>
              <div className="relative inline-block">
                <button
                  type="button"
                  onMouseEnter={() => setEmailTooltip(true)}
                  onMouseLeave={() => setEmailTooltip(false)}
                  onClick={() => setEmailTooltip(!emailTooltip)}
                  className="text-purple-400/70 hover:text-purple-300 transition-colors"
                  aria-label="Info emel"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                {emailTooltip && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 rounded-lg bg-[#190d33] border border-purple-500/40 text-[11px] text-purple-200 shadow-xl z-20 pointer-events-none">
                    Gunakan emel berdaftar akaun Rcash.my anda.
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/60">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-[#130924] border border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15 rounded-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-purple-200/90">
              {t.passwordLabel}
            </label>
            <button
              type="button"
              onClick={onOpenForgotPassword}
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              {t.forgotPassword}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/60">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full pl-10 pr-11 py-3 bg-[#130924] border border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15 rounded-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-400/70 hover:text-purple-200 transition-colors"
              aria-label={showPassword ? 'Sembunyikan kata laluan' : 'Papar kata laluan'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                rememberMe
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-[#140a28] border-purple-900/70'
              }`}
            >
              {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="text-xs text-purple-200/80">{t.rememberMe}</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 active:scale-[0.99] transition-all duration-200 shadow-[0_0_25px_rgba(147,51,234,0.35)] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{t.loginButton}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* "or continue with" Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="border-t border-purple-900/40 w-full"></div>
        <span className="bg-[#0e071c] px-3 text-[11px] font-medium text-purple-400/60 uppercase tracking-wider whitespace-nowrap">
          {t.orContinueWith}
        </span>
        <div className="border-t border-purple-900/40 w-full"></div>
      </div>

      {/* Social & Alternative Sign In Options */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-[#140a29] border border-purple-900/40 hover:border-purple-600/50 hover:bg-[#1b0d36] transition-all text-xs font-medium text-slate-200"
        >
          <GoogleIcon className="w-4 h-4" />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('Apple')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-[#140a29] border border-purple-900/40 hover:border-purple-600/50 hover:bg-[#1b0d36] transition-all text-xs font-medium text-slate-200"
        >
          <AppleIcon className="w-4 h-4 text-white" />
          <span>Apple ID</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('MyDigitalID')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-[#140a29] border border-purple-900/40 hover:border-purple-600/50 hover:bg-[#1b0d36] transition-all text-xs font-medium text-slate-200"
          title="Log masuk menggunakan MyDigital ID Malaysia"
        >
          <MyDigitalIdIcon className="w-4 h-4" />
          <span>MyDigital ID</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('Passkey')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-[#140a29] border border-purple-900/40 hover:border-purple-600/50 hover:bg-[#1b0d36] transition-all text-xs font-medium text-slate-200"
          title="Passkey Biometrik (Face ID / Touch ID)"
        >
          <PasskeyIcon className="w-4 h-4 text-purple-400" />
          <span>Passkey</span>
        </button>
      </div>

      {/* Switch to Register Tab */}
      <div className="text-center pt-2 border-t border-purple-950/60">
        <p className="text-xs text-purple-300/70">
          {t.noAccount}{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-purple-400 hover:text-purple-200 font-semibold underline underline-offset-2 transition-colors ml-1"
          >
            {translations[lang].auth.registerTab}
          </button>
        </p>
      </div>

      {/* 2FA Security Badge */}
      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={onOpenSecurityModal}
          className="inline-flex items-center gap-2 text-[11px] text-purple-400/80 hover:text-purple-300 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>{t.twoFactorProtected}</span>
        </button>
      </div>
    </div>
  );
};
