import React, { useState } from 'react';
import { User, Mail, Smartphone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Language, PasswordCriteria } from '../types.ts';
import { translations } from '../data/translations.ts';

interface RegisterFormProps {
  lang: Language;
  onRequestOtp: (formData: { name: string; email: string; phone: string; password: string }) => void;
  onSwitchToLogin: () => void;
  onOpenSecurityModal: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  lang,
  onRequestOtp,
  onSwitchToLogin,
  onOpenSecurityModal,
}) => {
  const t = translations[lang].auth;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('123456789');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time password strength calculation
  const criteria: PasswordCriteria = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = Math.min(4, Math.max(0, Object.values(criteria).filter(Boolean).length));
  const strengthMap: Record<number, { label: string; color: string; text: string }> = {
    0: { label: 'Sangat Lemah', color: 'bg-zinc-600', text: 'text-zinc-400' },
    1: { label: 'Lemah', color: 'bg-red-500', text: 'text-red-400' },
    2: { label: 'Sederhana', color: 'bg-amber-500', text: 'text-amber-400' },
    3: { label: 'Baik', color: 'bg-purple-500', text: 'text-purple-400' },
    4: { label: 'Kuat (Disyorkan)', color: 'bg-emerald-500', text: 'text-emerald-400' },
  };
  const currentStrength = strengthMap[strengthScore] ?? strengthMap[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(lang === 'ms' ? 'Sila masukkan nama penuh anda.' : 'Please enter your full name.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError(lang === 'ms' ? 'Sila masukkan alamat emel yang sah.' : 'Please enter a valid email address.');
      return;
    }

    if (!phone.trim()) {
      setError(lang === 'ms' ? 'Sila masukkan nombor telefon bimbit.' : 'Please enter your mobile phone number.');
      return;
    }

    if (password.length < 8) {
      setError(lang === 'ms' ? 'Kata laluan mestilah sekurang-kurangnya 8 aksara.' : 'Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError(lang === 'ms' ? 'Kata laluan dan pengesahan tidak sepadan.' : 'Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError(lang === 'ms' ? 'Sila setujui Terma & Syarat serta Akta PDPA.' : 'Please agree to the Terms & PDPA policy.');
      return;
    }

    // Format phone with +60 prefix
    const cleanPhone = phone.replace(/^0/, '').replace(/\s+/g, '');
    const fullPhone = `+60 ${cleanPhone}`;

    // Trigger the mandatory Registration OTP Overlay Modal!
    onRequestOtp({
      name,
      email,
      phone: fullPhone,
      password,
    });
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
          {t.registerTitle}
        </h2>
        <p className="text-sm text-purple-200/70 mt-2 max-w-sm mx-auto leading-relaxed">
          {t.registerSubtitle}
        </p>
      </div>

      {error && (
        <div className="p-3 mb-5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-purple-200/90 mb-1.5">
            {t.fullNameLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/60">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-[#130924] border border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15 rounded-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-purple-200/90 mb-1.5">
            {t.emailLabel}
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
              placeholder={t.emailPlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-[#130924] border border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15 rounded-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Malaysian Mobile Phone (+60) */}
        <div>
          <label className="block text-xs font-semibold text-purple-200/90 mb-1.5">
            {t.phoneLabel}
          </label>
          <div className="relative flex">
            {/* Country Flag & Prefix */}
            <div className="inline-flex items-center gap-1.5 px-3 bg-[#170c2d] border border-r-0 border-purple-900/50 rounded-l-xl text-xs font-medium text-purple-200 select-none">
              <span className="text-base" role="img" aria-label="Malaysia">
                🇲🇾
              </span>
              <span>+60</span>
            </div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400/60">
                <Smartphone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className="w-full pl-9 pr-4 py-3 bg-[#130924] border border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15 rounded-r-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none font-mono"
              />
            </div>
          </div>
          <span className="text-[10px] text-purple-400/60 mt-1 block">
            *Kod OTP keselamatan pendaftaran akan dihantar melalui SMS & WhatsApp ke nombor ini.
          </span>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-purple-200/90 mb-1.5">
            {t.passwordLabel}
          </label>
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
              aria-label="Papar kata laluan"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-purple-300/80">Kekuatan:</span>
                <span className={`font-semibold ${currentStrength.text}`}>
                  {currentStrength.label}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`rounded-full transition-all duration-300 ${
                      step <= strengthScore ? currentStrength.color : 'bg-purple-950/70'
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[10px] text-purple-300/70">
                <span className={criteria.minLength ? 'text-emerald-400' : ''}>
                  • Min 8 aksara
                </span>
                <span className={criteria.hasUpper ? 'text-emerald-400' : ''}>
                  • Huruf besar (A-Z)
                </span>
                <span className={criteria.hasNumber ? 'text-emerald-400' : ''}>
                  • Nombor (0-9)
                </span>
                <span className={criteria.hasSpecial ? 'text-emerald-400' : ''}>
                  • Simbol khas (!@#$)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-purple-200/90 mb-1.5">
            {t.confirmPasswordLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400/60">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.confirmPasswordPlaceholder}
              className={`w-full pl-10 pr-4 py-3 bg-[#130924] border rounded-xl text-sm text-white placeholder-purple-400/30 transition-all outline-none ${
                confirmPassword && password !== confirmPassword
                  ? 'border-red-500/70'
                  : 'border-purple-900/50 hover:border-purple-600/50 focus:border-purple-400 focus:bg-[#180c2f] focus:ring-4 focus:ring-purple-500/15'
              }`}
            />
          </div>
        </div>

        {/* Terms & PDPA Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                agreeTerms
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-[#140a28] border-purple-900/70'
              }`}
            >
              {agreeTerms && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="text-[11px] text-purple-200/80 leading-snug">
              {t.agreeCheckbox}
            </span>
          </label>
        </div>

        {/* Submit Button (Triggers OTP Modal!) */}
        <button
          type="submit"
          className="w-full mt-3 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 active:scale-[0.99] transition-all duration-200 shadow-[0_0_25px_rgba(147,51,234,0.35)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t.registerButton}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Switch to Login Tab */}
      <div className="text-center pt-5 mt-5 border-t border-purple-950/60">
        <p className="text-xs text-purple-300/70">
          {t.haveAccount}{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-purple-400 hover:text-purple-200 font-semibold underline underline-offset-2 transition-colors ml-1"
          >
            {translations[lang].auth.loginTab}
          </button>
        </p>
      </div>

      {/* 2FA Notice */}
      <div className="mt-5 flex items-center justify-center">
        <button
          type="button"
          onClick={onOpenSecurityModal}
          className="inline-flex items-center gap-2 text-[11px] text-purple-400/80 hover:text-purple-300 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Pengesahan OTP automatik pada setiap pendaftaran akaun baru</span>
        </button>
      </div>
    </div>
  );
};
