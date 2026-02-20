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

  const byJenis = summary.by_jenis ?? {};
  const byTingkat = summary.by_tingkat_keparahan ?? {};

  return (
    <div className="space-y-4">
      {/* Total card */}
      <Card className="rounded-2xl border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ShieldAlert size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Ringkasan Alergi</h3>
              <p className="text-xs text-slate-400">
                Total {summary.total_alergi} alergi tercatat
              </p>
            </div>
          </div>

          {/* By type */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Berdasarkan Jenis
            </h4>
            {Object.entries(byJenis).map(([jenis, count]) => (
              <div
                key={jenis}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-600 capitalize">{jenis}</span>
                <span className="font-bold text-slate-800">{count}</span>
              </div>
            ))}
            {Object.keys(byJenis).length === 0 && (
              <p className="text-xs text-slate-400 italic">Tidak ada data</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* By severity */}
      <Card className="rounded-2xl border-gray-100 shadow-sm">
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
      {summary.alergi_berat && summary.alergi_berat.length > 0 && (
        <Card className="rounded-2xl border-red-100 bg-red-50 shadow-sm">
          <CardContent className="p-4 flex gap-3">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-red-700">Perhatian!</h4>
              <p className="text-xs text-red-600 mt-1">
                {summary.alergi_berat.length} alergi dengan tingkat keparahan <strong>berat</strong> terdeteksi.
                Pastikan untuk menghindari alergen ini.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
