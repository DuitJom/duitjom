import React from 'react';
import { ShieldCheck, Moon, Sun, Globe, Smartphone, HelpCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { Language, AuthMode, ThemeMode } from '../types.ts';
import { translations } from '../data/translations.ts';

interface HeaderProps {
  authMode: AuthMode;
  isLoggedIn: boolean;
  lang: Language;
  themeMode: ThemeMode;
  onSetAuthMode: (mode: AuthMode) => void;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onOpenSecurityModal: () => void;
  onOpenInfoModal: (infoType: 'rates' | 'otpGuide' | 'help') => void;
}

export const Header: React.FC<HeaderProps> = ({
  authMode,
  isLoggedIn,
  lang,
  themeMode,
  onSetAuthMode,
  onToggleLang,
  onToggleTheme,
  onOpenSecurityModal,
  onOpenInfoModal,
}) => {
  const t = translations[lang].nav;

  return (
    <header className="w-full border-b border-purple-900/30 bg-[#090514]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="shrink-0 flex items-center">
          <BrandLogo size="md" />
        </div>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-purple-200/80">
          <button
            type="button"
            onClick={onOpenSecurityModal}
            className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.security}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenInfoModal('otpGuide')}
            className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
            <span>Panduan OTP</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenInfoModal('rates')}
            className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.fees}
          </button>

          <button
            type="button"
            onClick={() => onOpenInfoModal('help')}
            className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.help}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-2.5 py-1.5 rounded-lg bg-[#140a28] border border-purple-900/50 hover:border-purple-600/50 text-purple-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Tukar Bahasa (BM / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-mono uppercase">{lang}</span>
          </button>

          {/* Dark Mode Automatic / OLED Selector */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-2.5 py-1.5 rounded-lg bg-[#140a28] border border-purple-900/50 hover:border-purple-600/50 text-purple-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title={`Mod Tema: ${themeMode === 'oled' ? 'OLED Pitch Black' : 'Ungu Hitam'}`}
          >
            {themeMode === 'oled' ? (
              <Moon className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden sm:inline text-[11px]">
              {themeMode === 'oled' ? 'OLED' : 'Ungu'}
            </span>
          </button>

          {/* Primary Action Button */}
          {!isLoggedIn ? (
            <button
              type="button"
              onClick={() => onSetAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {authMode === 'login' ? 'Daftar Akaun' : 'Log Masuk'}
            </button>
          ) : (
            <span className="text-xs font-semibold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 whitespace-nowrap shrink-0">
              Sesi Disahkan
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
