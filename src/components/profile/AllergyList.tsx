"use client";

import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllergyList() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-slate-800 flex items-center gap-2">
          <AlertCircle className="text-secondary w-5 h-5" />
          Daftar Alergi & Pantangan
        </h3>
        <Button variant="ghost" className="text-primary hover:text-teal-600 text-sm font-semibold hover:bg-transparent">
          <Plus className="w-4 h-4 mr-1" />
          Tambah
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Tinggi */}
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="text-sm font-bold text-red-700">Susu Sapi</span>
          <span className="text-xs text-red-500 ml-1 opacity-70">(Tinggi)</span>
        </div>

        {/* Sedang */}
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          <span className="text-sm font-bold text-orange-700">
            Kacang Tanah
          </span>
          <span className="text-xs text-orange-500 ml-1 opacity-70">
            (Sedang)
          </span>
        </div>

        {/* Tambah */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-400 cursor-pointer hover:border-primary hover:text-primary transition-colors">
          <span className="text-sm font-medium">Tambah Lainnya...</span>
        </div>
      </div>
    </div>
  );
}
