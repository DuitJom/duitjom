import React from 'react';
import { X, Smartphone, CreditCard, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../types.ts';

interface InfoModalProps {
  type: 'rates' | 'otpGuide' | 'help' | null;
  lang: Language;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, lang, onClose }) => {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#0e071c] border border-purple-500/30 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.18)] text-slate-100 max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-purple-300/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-purple-900/30"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'otpGuide' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-900/40 text-purple-300">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Outfit'] text-white">
                  Panduan Kotak Overlay OTP Rcash.my
                </h3>
                <p className="text-xs text-purple-300/70">
                  Cara fungsi pengesahan kod keselamatan 6-digit.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-purple-200/90 mb-5">
              <div className="p-3.5 rounded-xl bg-[#140a28] border border-purple-900/40">
                <h4 className="font-semibold text-white mb-1">1. Bilakah Kotak OTP Muncul?</h4>
                <p className="text-purple-300/70">
                  Kotak overlay OTP hanya muncul **semasa pelanggan mendaftar akaun baharu**. Selepas akaun berjaya disahkan, log masuk harian pelanggan hanya memerlukan Emel dan Kata Laluan biasa.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#140a28] border border-purple-900/40">
                <h4 className="font-semibold text-white mb-1">2. Saluran Penghantaran OTP</h4>
                <p className="text-purple-300/70">
                  Kod 6-digit dihantar serentak melalui SMS ke nombor Malaysia (+60) dan salinan ke peti masuk emel anda.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#140a28] border border-purple-900/40">
                <h4 className="font-semibold text-white mb-1">3. Ciri Ujian Pantas (Demo Sandbox)</h4>
                <p className="text-purple-300/70">
                  Untuk kemudahan demo, anda boleh klik butang "Guna Kod Ujian Pantas" di dalam kotak overlay untuk mengisi kod 6-digit secara automatik.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === 'rates' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-900/40 text-purple-300">
                <CreditCard className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Outfit'] text-white">
                  Kadar & Caj Transaksi Rcash.my
                </h3>
                <p className="text-xs text-purple-300/70">
                  Kadar telus dan sifar caj tersembunyi.
                </p>
              </div>
            </div>

            <div className="divide-y divide-purple-900/40 text-xs mb-5">
              <div className="py-2.5 flex justify-between">
                <span className="text-purple-200">Pendaftaran Akaun & OTP</span>
                <span className="font-bold text-emerald-400">PERCUMA</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-purple-200">Pindahan Wang DuitNow Antara Bank</span>
                <span className="font-bold text-emerald-400">RM 0.00 (Percuma)</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-purple-200">Tambah Nilai FPX Online Banking</span>
                <span className="font-bold text-emerald-400">RM 0.00</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-purple-200">Pengeluaran Tunai Segera ke Bank Tempatan</span>
                <span className="font-bold text-purple-300">RM 0.50</span>
              </div>
            </div>
          </div>
        )}

        {type === 'help' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-900/40 text-purple-300">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Outfit'] text-white">
                  Pusat Bantuan & Sokongan Pelanggan
                </h3>
                <p className="text-xs text-purple-300/70">
                  Bantuan 24/7 untuk pengguna perkhidmatan rcash.my
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div className="p-3 rounded-xl bg-[#140a28] border border-purple-900/40">
                <h4 className="font-semibold text-white">Emel Sokongan Rasmi</h4>
                <p className="text-purple-300/80 font-mono mt-0.5">support@rcash.my</p>
              </div>
              <div className="p-3 rounded-xl bg-[#140a28] border border-purple-900/40">
                <h4 className="font-semibold text-white">Talian Khidmat Pelanggan</h4>
                <p className="text-purple-300/80 font-mono mt-0.5">+60 3-8888 2274 (Isnin - Ahad)</p>
              </div>
              <div className="p-3 rounded-xl bg-[#140a28] border border-purple-900/40">
                <h4 className="font-semibold text-white">Keselamatan Siber</h4>
                <p className="text-purple-300/80 mt-0.5">
                  Rcash tidak pernah meminta kata laluan atau kod OTP anda melalui panggilan telefon.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-700 hover:bg-purple-600 transition-colors"
        >
          Faham & Tutup
        </button>
      </div>
    </div>
  );
};
