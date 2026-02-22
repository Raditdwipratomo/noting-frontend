"use client";

import { useState, useEffect } from "react";
import { Scale, Ruler, BrainCircuit, Loader2 } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import { diagnosaService } from "@/lib/api/services/diagnosa.service";
import type { PertumbuhanResponse } from "@/lib/types/pertumbuhan.types";
import type { DiagnosaResponseData } from "@/lib/types/diagnosa.types";

export default function GrowthStats() {
  const { selectedAnakId } = useAnak();
  const [latestGrowth, setLatestGrowth] = useState<PertumbuhanResponse | null>(null);
  const [latestDiagnosa, setLatestDiagnosa] = useState<DiagnosaResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;

    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [growth, diagnosa] = await Promise.allSettled([
          pertumbuhanService.getLatestGrowth(selectedAnakId),
          diagnosaService.getLatest(selectedAnakId),
        ]);

        if (!cancelled) {
          setLatestGrowth(growth.status === "fulfilled" ? growth.value : null);
          setLatestDiagnosa(diagnosa.status === "fulfilled" ? diagnosa.value : null);
        }
      } catch (err) {
        console.error("GrowthStats fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [selectedAnakId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 mb-8 shadow-sm">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  // If we don't have measurement data at all
  if (!latestGrowth) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl border border-slate-100 mb-8 shadow-sm text-center">
        <p className="text-slate-500 font-medium mb-2">Belum ada data pertumbuhan</p>
        <p className="text-sm text-slate-400">Silakan input data pengukuran di halaman Pertumbuhan.</p>
      </div>
    );
  }

  const tbZScore = latestDiagnosa?.z_score_tinggi_badan
    ? parseFloat(latestDiagnosa.z_score_tinggi_badan).toFixed(1)
    : null;
  const bbZScore = latestDiagnosa?.z_score_berat_badan
    ? parseFloat(latestDiagnosa.z_score_berat_badan).toFixed(1)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Tinggi Badan */}
      <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
          <Ruler className="w-5 h-5" />
        </div>
        <div className="text-sm text-blue-600 font-bold mb-1">Tinggi Badan</div>
        <div className="text-3xl font-[var(--font-display)] font-bold text-blue-800 mb-1">
          {latestGrowth.tinggi_badan_cm} <span className="text-base font-normal opacity-70">cm</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-200/50 text-xs font-semibold text-blue-700">
          {tbZScore ? `Z-Score: ${tbZScore} SD` : "Normal"}
        </div>
      </div>

      {/* Berat Badan */}
      <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
          <Scale className="w-5 h-5" />
        </div>
        <div className="text-sm text-orange-600 font-bold mb-1">Berat Badan</div>
        <div className="text-3xl font-[var(--font-display)] font-bold text-orange-800 mb-1">
          {latestGrowth.berat_badan_kg} <span className="text-base font-normal opacity-70">kg</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-orange-200/50 text-xs font-semibold text-orange-700">
          {bbZScore ? `Z-Score: ${bbZScore} SD` : "Normal"}
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
          {latestGrowth.lingkar_kepala_cm || "-"} <span className="text-base font-normal opacity-70">cm</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-purple-200/50 text-xs font-semibold text-purple-700">
          {latestGrowth.lingkar_kepala_cm ? "Normal" : "Tidak Tercatat"}
        </div>
      </div>

      {/* Lingkar Lengan Atas */}
      <div className="bg-teal-50 p-5 rounded-3xl border border-teal-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
          <Ruler className="w-5 h-5" />
        </div>
        <div className="text-sm text-teal-600 font-bold mb-1">
          Lingkar Lengan Atas
        </div>
        <div className="text-3xl font-[var(--font-display)] font-bold text-teal-800 mb-1">
          {latestGrowth.lingkar_lengan_atas_cm || "-"} <span className="text-base font-normal opacity-70">cm</span>
        </div>
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-teal-200/50 text-xs font-semibold text-teal-700">
          {latestGrowth.lingkar_lengan_atas_cm ? "Normal" : "Tidak Tercatat"}
        </div>
      </div>
    </div>
  );
}
