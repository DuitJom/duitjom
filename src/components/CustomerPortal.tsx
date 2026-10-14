import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Building2,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Smartphone,
  CreditCard,
  ChevronRight,
  Bell,
  RefreshCw,
} from 'lucide-react';
import { UserProfile, Language } from '../types.ts';
import { translations } from '../data/translations.ts';
import { BrandLogo } from './BrandLogo.tsx';

interface CustomerPortalProps {
  user: UserProfile;
  lang: Language;
  onLogout: () => void;
  onOpenSecurityModal: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  user,
  lang,
  onLogout,
  onOpenSecurityModal,
}) => {
  const t = translations[lang].portal;
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'security'>('overview');
  const [isSimulatingAction, setIsSimulatingAction] = useState<string | null>(null);

  const mockTransactions = [
    {
      id: 'TXN-98241',
      title: 'Pindahan DuitNow ke Maybank',
      type: 'out',
      amount: 150.0,
      recipient: 'Ahmad Danial (MBB-5140****981)',
      time: 'Hari ini, 02:45 PM',
      status: 'Selesai',
    },
    {
      id: 'TXN-98240',
      title: 'Tambah Nilai FPX CIMB Clicks',
      type: 'in',
      amount: 500.0,
      recipient: 'Akaun Simpanan Rcash',
      time: 'Semalam, 09:12 AM',
      status: 'Selesai',
    },
    {
      id: 'TXN-98239',
      title: 'Bayaran DuitNow QR Restoran Pelita',
      type: 'out',
      amount: 28.5,
      recipient: 'Pelita Nasi Kandar KL',
      time: '12 Okt 2026, 08:30 PM',
      status: 'Selesai',
    },
    {
      id: 'TXN-98238',
      title: 'Penerimaan Tunai daripada Shahril',
      type: 'in',
      amount: 120.0,
      recipient: 'DuitNow ID: 012-4458921',
      time: '10 Okt 2026, 04:15 PM',
      status: 'Selesai',
    },
  ];

  const handleActionClick = (actionName: string) => {
    setIsSimulatingAction(actionName);
    setTimeout(() => {
      setIsSimulatingAction(null);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Banner / Customer Info */}
      <div className="glass-purple-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              <div className="w-full h-full bg-[#120724] rounded-[14px] flex items-center justify-center text-xl font-bold font-['Outfit'] text-purple-200">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-['Outfit'] text-white">
                  {user.name}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t.verifiedCustomer}</span>
                </span>
              </div>
              <p className="text-xs text-purple-300/70 mt-0.5 font-mono">
                {user.email} · {user.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenSecurityModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-medium hover:bg-purple-900/40 hover:text-white transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>2FA Aktif</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium hover:bg-red-900/40 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logoutButton}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Wallet Balance Card & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card (Col-Span 2) */}
        <div className="md:col-span-2 glass-purple-card rounded-2xl p-6 sm:p-7 relative overflow-hidden bg-gradient-to-br from-[#170a2f] via-[#100622] to-[#0a0416]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-purple-300/80">
              <Wallet className="w-4 h-4 text-purple-400" />
              <span>{t.balance}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowBalance(!showBalance)}
              className="text-purple-400 hover:text-purple-200 transition-colors p-1"
              aria-label="Papar / Sembunyi Baki"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-purple-400">RM</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                {showBalance ? user.balance.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '••••••••'}
              </span>
            </div>
            <p className="text-[11px] text-purple-400/60 mt-1">
              {t.duitnowId}: <strong className="text-purple-300 font-mono">{user.phone}</strong>
            </p>
          </div>

          {/* 4 Primary Fintech Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-purple-900/40">
            <button
              type="button"
              onClick={() => handleActionClick(t.actions.transfer)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1d0e3a] hover:bg-purple-800/40 border border-purple-700/30 hover:border-purple-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-xs font-medium text-slate-200">{t.actions.transfer}</span>
            </button>

            <button
              type="button"
              onClick={() => handleActionClick(t.actions.topup)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1d0e3a] hover:bg-purple-800/40 border border-purple-700/30 hover:border-purple-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-slate-200">{t.actions.topup}</span>
            </button>

            <button
              type="button"
              onClick={() => handleActionClick(t.actions.scan)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1d0e3a] hover:bg-purple-800/40 border border-purple-700/30 hover:border-purple-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-600/20 text-amber-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <QrCode className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs font-medium text-slate-200">{t.actions.scan}</span>
            </button>

            <button
              type="button"
              onClick={() => handleActionClick(t.actions.withdraw)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1d0e3a] hover:bg-purple-800/40 border border-purple-700/30 hover:border-purple-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs font-medium text-slate-200">{t.actions.withdraw}</span>
            </button>
          </div>

          {isSimulatingAction && (
            <div className="mt-3 p-2 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-2 animate-fade-in">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Membuka modul {isSimulatingAction}...</span>
            </div>
          )}
        </div>

        {/* Security & 2FA Status Side Card */}
        <div className="glass-purple-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 mb-4">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{t.securityStatus}</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#140927] border border-purple-900/50 flex items-start gap-3">
                <Smartphone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Autentikasi 2FA Aktif</h4>
                  <p className="text-[11px] text-purple-300/70 mt-0.5">
                    Pengesahan OTP pada pendaftaran & transaksi sensitif.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#140927] border border-purple-900/50 flex items-start gap-3">
                <Lock className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Enkripsi AES-256</h4>
                  <p className="text-[11px] text-purple-300/70 mt-0.5">
                    Data akaun & token disulitkan dengan piawaian Bank Negara Malaysia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSecurityModal}
            className="w-full mt-4 py-2 px-3 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-600/30 text-purple-200 text-xs font-medium transition-colors flex items-center justify-between"
          >
            <span>Urus Tetapan 2FA</span>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="glass-purple-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold font-['Outfit'] text-white">
            {t.recentActivity}
          </h3>
          <span className="text-xs text-purple-400 font-medium">Bulan Ini (Okt 2026)</span>
        </div>

        <div className="divide-y divide-purple-950/70">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.type === 'in'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                  }`}
                >
                  {tx.type === 'in' ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">{tx.title}</h4>
                  <p className="text-[11px] text-purple-300/70">{tx.recipient} · {tx.time}</p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-sm font-bold font-mono ${
                    tx.type === 'in' ? 'text-emerald-400' : 'text-slate-100'
                  }`}
                >
                  {tx.type === 'in' ? '+' : '-'} RM {tx.amount.toFixed(2)}
                </span>
                <span className="block text-[10px] text-purple-400/80">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
