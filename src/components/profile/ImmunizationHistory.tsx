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

      <div className="space-y-3">
        {/* Item 1 */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">DPT-HB-Hib 3</h4>
              <p className="text-xs text-slate-500">
                Puskesmas Melati • 2 Bulan lalu
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
            Lengkap
          </span>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">Polio 4</h4>
              <p className="text-xs text-slate-500">
                Puskesmas Melati • 2 Bulan lalu
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
            Lengkap
          </span>
        </div>
      </div>
    </div>
  );
}
