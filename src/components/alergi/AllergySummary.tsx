"use client";

import { Loader2, ShieldAlert, AlertTriangle, Activity } from "lucide-react";
import type { AlergiSummaryResponse } from "@/lib/types/alergi.types";
import { Card, CardContent } from "@/components/ui/card";

interface AllergySummaryProps {
  summary: AlergiSummaryResponse | null;
  loading: boolean;
}

export default function AllergySummary({ summary, loading }: AllergySummaryProps) {
  if (loading) {
    return (
      <Card className="rounded-2xl border-gray-100 shadow-sm">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return (
      <Card className="rounded-2xl border-gray-100 shadow-sm">
        <CardContent className="p-6 text-center text-gray-400 text-sm">
          Belum ada data ringkasan
        </CardContent>
      </Card>
    );
  }

  const list = summary.list ?? [];
  const byTingkat = summary.by_severity ?? {};

  return (
    <div className="space-y-4">
      {/* Total card */}
      <Card className="rounded-2xl border-gray-100 shadow-sm bg-white text-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ShieldAlert size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Ringkasan Alergi</h3>
              <p className="text-xs text-slate-400">
                Total {summary.total} alergi tercatat
              </p>
            </div>
          </div>

          {/* List of Allergens */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Daftar Alergen
            </h4>
            <div className="flex flex-wrap gap-2 text-sm text-slate-600">
              {list.length > 0 ? (
                list.map((name, idx) => (
                  <span key={idx} className="bg-slate-100 px-2.5 py-1 rounded-md capitalize font-medium">
                    {name}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Tidak ada alergi yang tercatat</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* By severity */}
      <Card className="rounded-2xl border-gray-100 shadow-sm bg-white text-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <Activity size={20} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-800">Tingkat Keparahan</h3>
          </div>

          <div className="space-y-3">
            {(["berat", "sedang", "ringan"] as const).map((level) => {
              const count = byTingkat[level] ?? 0;
              const colors = {
                berat: "bg-red-500",
                sedang: "bg-amber-500",
                ringan: "bg-blue-500",
              };
              return (
                <div key={level} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[level]}`} />
                  <span className="text-sm text-slate-600 capitalize flex-1">
                    {level}
                  </span>
                  <span className="font-bold text-slate-800">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Warning for severe allergies */}
      {summary.severe_allergies && summary.severe_allergies.length > 0 && (
        <Card className="rounded-2xl border-red-100 bg-red-50 shadow-sm">
          <CardContent className="p-4 flex gap-3">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-red-700">Perhatian!</h4>
              <p className="text-xs text-red-600 mt-1 mb-2">
                {summary.severe_allergies.length} alergi dengan tingkat keparahan <strong>berat</strong> terdeteksi.
                Pastikan untuk menghindari alergen ini:
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-red-700 font-bold capitalize">
                {summary.severe_allergies.map(name => name).join(", ")}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
