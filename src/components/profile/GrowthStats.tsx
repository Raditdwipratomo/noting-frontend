"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, Scale, Ruler, BrainCircuit } from "lucide-react";

export default function GrowthStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Tinggi Badan */}
      <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
          <Ruler className="w-5 h-5" />
        </div>
        <div className="text-sm text-blue-600 font-bold mb-1">Tinggi Badan</div>
        <div className="text-3xl font-[var(--font-display)] font-bold text-blue-800 mb-1">
          88 <span className="text-base font-normal opacity-70">cm</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-200/50 text-xs font-semibold text-blue-700">
          Z-Score: -0.5 SD
        </div>
      </div>

      {/* Berat Badan */}
      <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
          <Scale className="w-5 h-5" />
        </div>
        <div className="text-sm text-orange-600 font-bold mb-1">Berat Badan</div>
        <div className="text-3xl font-[var(--font-display)] font-bold text-orange-800 mb-1">
          12.5 <span className="text-base font-normal opacity-70">kg</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-orange-200/50 text-xs font-semibold text-orange-700">
          Z-Score: +0.2 SD
        </div>
      </div>

      {/* Lingkar Kepala */}
      <div className="bg-purple-50 p-5 rounded-3xl border border-purple-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div className="text-sm text-purple-600 font-bold mb-1">
          Lingkar Kepala
        </div>
        <div className="text-3xl font-[var(--font-display)] font-bold text-purple-800 mb-1">
          48 <span className="text-base font-normal opacity-70">cm</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-purple-200/50 text-xs font-semibold text-purple-700">
          Normal
        </div>
      </div>
    </div>
  );
}
