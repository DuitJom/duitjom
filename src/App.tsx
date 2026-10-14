import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { LoginForm } from './components/LoginForm.tsx';
import { RegisterForm } from './components/RegisterForm.tsx';
import { OtpOverlayModal } from './components/OtpOverlayModal.tsx';
import { TwoFactorModal } from './components/TwoFactorModal.tsx';
import { ForgotPasswordModal } from './components/ForgotPasswordModal.tsx';
import { InfoModal } from './components/InfoModal.tsx';
import { CustomerPortal } from './components/CustomerPortal.tsx';
import { BrandLogo } from './components/BrandLogo.tsx';
import { AuthMode, Language, ThemeMode, UserProfile, OTPState } from './types.ts';
import { translations } from './data/translations.ts';
import { ShieldCheck, CheckCircle2, Lock, Smartphone, HelpCircle } from 'lucide-react';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [lang, setLang] = useState<Language>('ms');
  const [themeMode, setThemeMode] = useState<ThemeMode>('purple-black');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Modals state
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [activeInfoType, setActiveInfoType] = useState<'rates' | 'otpGuide' | 'help' | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Registration OTP State
  const [otpState, setOtpState] = useState<OTPState>({
    isOpen: false,
    email: '',
    phone: '',
    code: ['', '', '', '', '', ''],
    testCode: '782490',
    timeLeft: 60,
    isVerifying: false,
    error: null,
    isSuccess: false,
  });

  // Automatic dark mode detection & theme handling
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches && themeMode === 'auto') {
      setThemeMode('purple-black');
    }
  }, [themeMode]);

  // OTP Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpState.isOpen && otpState.timeLeft > 0 && !otpState.isSuccess) {
      timer = setInterval(() => {
        setOtpState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpState.isOpen, otpState.timeLeft, otpState.isSuccess]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handler when customer submits login form (Only Email & Password)
  const handleLoginSuccess = (email: string) => {
    const loggedInUser: UserProfile = {
      id: 'RC-99824',
      name: email.includes('@') ? email.split('@')[0].replace('.', ' ') : 'Pelanggan Rcash',
      email: email,
      phone: '+60 12-345 6789',
      isVerified: true,
      twoFactorEnabled: true,
      twoFactorMethod: 'sms',
      balance: 4850.25,
      currency: 'MYR',
      joinedDate: 'Januari 2026',
      lastLogin: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
    };

    setCurrentUser(loggedInUser);
    setIsLoggedIn(true);
    showToast(lang === 'ms' ? 'Log masuk berjaya! Selamat datang kembali.' : 'Sign in successful! Welcome back.');
  };

  // Handler when customer registers: specifically triggers the OTP Overlay Modal!
  const handleRequestOtp = (formData: { name: string; email: string; phone: string; password: string }) => {
    // Generate a new 6-digit test code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    setOtpState({
      isOpen: true,
      email: formData.email,
      phone: formData.phone,
      code: ['', '', '', '', '', ''],
      testCode: generatedCode,
      timeLeft: 60,
      isVerifying: false,
      error: null,
      isSuccess: false,
      registrationData: formData,
    });
  };

  // Handler to verify 6-digit OTP code in modal
  const handleVerifyOtp = (codeString: string) => {
    setOtpState((prev) => ({ ...prev, isVerifying: true, error: null }));

    setTimeout(() => {
      // In this system, either the generated test code or any 6-digit valid submission succeeds
      if (codeString.length === 6) {
        setOtpState((prev) => ({
          ...prev,
          isVerifying: false,
          isSuccess: true,
        }));

        // Transition to logged in customer portal after 1.5s
        setTimeout(() => {
          const regData = otpState.registrationData;
          const newUser: UserProfile = {
            id: `RC-${Math.floor(10000 + Math.random() * 90000)}`,
            name: regData?.name || 'Pelanggan Baharu',
            email: regData?.email || otpState.email,
            phone: regData?.phone || otpState.phone,
            isVerified: true,
            twoFactorEnabled: true,
            twoFactorMethod: 'sms',
            balance: 50.0, // Welcome bonus RM 50
            currency: 'MYR',
            joinedDate: 'Okt 2026',
            lastLogin: 'Baru sahaja',
          };

          setCurrentUser(newUser);
          setIsLoggedIn(true);
          setOtpState((prev) => ({ ...prev, isOpen: false, isSuccess: false }));
          showToast(
            lang === 'ms'
              ? 'Akaun rcash.my anda telah berjaya diaktifkan bersama bonus RM 50!'
              : 'Your rcash.my account is now active with a RM 50 welcome bonus!'
          );
        }, 1200);
      } else {
        setOtpState((prev) => ({
          ...prev,
          isVerifying: false,
          error: translations[lang].otp.invalidCode,
        }));
      }
    }, 800);
  };

  const handleResendOtp = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpState((prev) => ({
      ...prev,
      timeLeft: 60,
      testCode: newCode,
      code: ['', '', '', '', '', ''],
      error: null,
    }));
    showToast(
      lang === 'ms'
        ? `Kod OTP baharu dihantar ke ${otpState.phone}!`
        : `New OTP code sent to ${otpState.phone}!`
    );
  };

  const handleQuickFillTestCode = () => {
    const codeArr = otpState.testCode.split('');
    setOtpState((prev) => ({
      ...prev,
      code: codeArr,
      error: null,
    }));
    // Automatically trigger verification with the test code
    handleVerifyOtp(otpState.testCode);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthMode('login');
    showToast(lang === 'ms' ? 'Anda telah log keluar dengan selamat.' : 'You have been safely signed out.');
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'purple-black' ? 'oled' : 'purple-black'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'ms' ? 'en' : 'ms'));
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 relative ${
        themeMode === 'oled' ? 'bg-[#020106]' : 'bg-[#080411]'
      }`}
    >
      {/* Dynamic Purple Atmosphere Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Centered Purple Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[130px]" />
        {/* Bottom Left Indigo Glow */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[120px]" />
        {/* Subtle Topographic Curve Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] bg-repeat pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #c084fc 2%, transparent 0%), radial-gradient(circle at 75px 75px, #9333ea 2%, transparent 0%)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Top Bar Header */}
      <Header
        authMode={authMode}
        isLoggedIn={isLoggedIn}
        lang={lang}
        themeMode={themeMode}
        onSetAuthMode={(mode) => setAuthMode(mode)}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        onOpenInfoModal={(type) => setActiveInfoType(type)}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-purple-950/90 border border-purple-500/40 text-purple-100 text-xs shadow-2xl backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        {isLoggedIn && currentUser ? (
          /* LOGGED IN CUSTOMER PORTAL VIEW */
          <CustomerPortal
            user={currentUser}
            lang={lang}
            onLogout={handleLogout}
            onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
          />
        ) : (
          /* AUTHENTICATION CONTAINER (LOGIN / REGISTER) */
          <div className="w-full max-w-[460px] mx-auto">
            {/* Top Logo / Brand Lockup for Authentication View */}
            <div className="flex flex-col items-center justify-center mb-6">
              <BrandLogo size="lg" showSubtitle={true} />
            </div>

            {/* Glassmorphic Purple-Black Auth Card */}
            <div className="glass-purple-card rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(147,51,234,0.14)]">
              {/* Segmented Tab Switcher (Log Masuk vs Daftar Akaun) */}
              <div className="flex items-center p-1 mb-6 bg-[#110722] border border-purple-900/50 rounded-xl">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300/70 hover:text-purple-200 hover:bg-purple-950/40'
                  }`}
                >
                  {translations[lang].auth.loginTab}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300/70 hover:text-purple-200 hover:bg-purple-950/40'
                  }`}
                >
                  {translations[lang].auth.registerTab}
                </button>
              </div>

              {/* Conditional View: Login or Register */}
              {authMode === 'login' ? (
                <LoginForm
                  lang={lang}
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToRegister={() => setAuthMode('register')}
                  onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
                  onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
                />
              ) : (
                <RegisterForm
                  lang={lang}
                  onRequestOtp={handleRequestOtp}
                  onSwitchToLogin={() => setAuthMode('login')}
                  onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
                />
              )}
            </div>

            {/* Malaysian Trust / Bank-Grade Compliance Footer Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-purple-400/60 select-none">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>2FA Disahkan</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>SSL AES-256 Bit</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>PDPA Malaysia</span>
            </div>
          </div>
        )}
      </main>

      {/* Registration OTP Modal Overlay (Specifically triggered on registration) */}
      {otpState.isOpen && (
        <OtpOverlayModal
          otpState={otpState}
          lang={lang}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onClose={() => setOtpState((prev) => ({ ...prev, isOpen: false }))}
          onQuickFillTestCode={handleQuickFillTestCode}
        />
      )}

      {/* 2FA Security Configuration Modal */}
      <TwoFactorModal
        isOpen={isSecurityModalOpen}
        lang={lang}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        lang={lang}
        onClose={() => setIsForgotPasswordOpen(false)}
      />

      {/* Info Modal (OTP Guide, Rates & Fees, Support) */}
      <InfoModal
        type={activeInfoType}
        lang={lang}
        onClose={() => setActiveInfoType(null)}
      />

      {/* Clean Quiet Footer */}
      <footer className="w-full border-t border-purple-900/30 py-6 px-4 text-center text-xs text-purple-400/60 relative z-10 bg-[#07030e]/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 rcash.my — Sistem Pembayaran Digital & Dompet Pintar Malaysia. Hak Cipta Terpelihara.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="https://www.rcash.my" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
              https://www.rcash.my
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setActiveInfoType('help')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              Dasar Privasi
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setActiveInfoType('rates')}
              className="hover:text-purple-300 transition-colors cursor-pointer"
            >
              Terma Perkhidmatan
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
