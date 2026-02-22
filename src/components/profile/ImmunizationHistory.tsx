"use client";

import { Syringe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImmunizationHistory() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-slate-800 flex items-center gap-2">
          <Syringe className="text-blue-500 w-5 h-5" />
          Riwayat Imunisasi Terakhir
        </h3>
        <Button
          variant="ghost"
          className="text-primary hover:text-teal-600 text-sm font-semibold hover:bg-transparent"
        >
          Lihat Semua
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl text-center border border-dashed border-slate-200">
        <Syringe className="w-8 h-8 text-slate-300 mb-2" />
        <p className="text-sm font-medium text-slate-500">Belum ada riwayat imunisasi.</p>
        <p className="text-xs text-slate-400 mt-1">Fitur pendataan imunisasi akan segera hadir.</p>
      </div>
    </div>
  );
}
