"use client";

import { TrendingUp, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileSidebar() {
  return (
    <div className="w-full lg:w-[35%] bg-white border-l border-slate-200 p-6 flex flex-col h-full overflow-y-auto">
      {/* Statistik Cepat */}
      <div className="mb-8">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-slate-800 mb-4">
          Statistik Cepat
        </h3>
        <div className="bg-gradient-to-br from-primary to-teal-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="mb-6 relative z-10">
            <p className="text-teal-100 text-sm mb-1">Pertumbuhan Bulan Ini</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">+0.5</span>
              <span className="text-lg font-medium opacity-80 mb-1">kg</span>
              <div className="ml-auto bg-white/20 px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
                <TrendingUp className="w-4 h-4" /> Bagus
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-teal-100 mb-1">Tinggi</div>
              <div className="font-bold text-lg">
                +1.2 <span className="text-xs font-normal">cm</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-teal-100 mb-1">Lingkar Kepala</div>
              <div className="font-bold text-lg">
                +0.2 <span className="text-xs font-normal">cm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder */}
      <div className="mb-8 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[var(--font-display)] font-bold text-lg text-slate-800">
            Reminder Berikutnya
          </h3>
          <span className="text-xs text-primary font-bold hover:underline cursor-pointer">
            Lihat Kalender
          </span>
        </div>

        <div className="space-y-4">
          {/* Reminder 1 */}
          <div className="bg-red-50 p-4 rounded-2xl border-l-4 border-red-400 relative">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                Medis
              </div>
              <span className="text-xs text-red-400 font-bold">3 Hari Lagi</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-1">
              Pemberian Vitamin A
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Bulan Vitamin A (Februari & Agustus). Kunjungi Posyandu terdekat.
            </p>
            <Button className="w-full py-2 bg-white border border-red-200 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50">
              Tandai Selesai
            </Button>
          </div>

          {/* Reminder 2 */}
          <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-400 relative">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                Imunisasi
              </div>
              <span className="text-xs text-blue-400 font-bold">12 Okt 2023</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-1">Campak Lanjutan</h4>
            <p className="text-xs text-slate-500">
              Jadwal imunisasi lanjutan untuk usia 24 bulan.
            </p>
          </div>

          {/* Tambah Reminder */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-slate-500">
              Tambah Pengingat Baru
            </div>
          </div>
        </div>
      </div>

      {/* Unduh Laporan */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <h4 className="font-bold text-base mb-2">Unduh Laporan Medis</h4>
          <p className="text-xs text-slate-400 mb-4">
            Dapatkan rangkuman kesehatan Budi dalam format PDF untuk konsultasi
            dokter.
          </p>
          <Button className="w-full py-2.5 bg-primary hover:bg-teal-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            <Download className="w-5 h-5" />
            Unduh PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
