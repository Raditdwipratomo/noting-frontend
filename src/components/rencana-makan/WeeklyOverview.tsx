"use client";

import { Loader2, Flame, Egg, Droplets, Wheat, Pill } from "lucide-react";
import type { GiziProgressResponse, RencanaGiziDetailResponse } from "@/lib/types/gizi.types";
import { Card, CardContent } from "@/components/ui/card";

interface WeeklyOverviewProps {
  progress: GiziProgressResponse | null;
  rencana: RencanaGiziDetailResponse | null;
  loading: boolean;
}

export default function WeeklyOverview({ progress, rencana, loading }: WeeklyOverviewProps) {
  if (loading) {
    return (
      <Card className="rounded-2xl border-gray-100 shadow-sm mb-8">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (!progress) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const nutrisi = rencana?.kebutuhan_nutrisi;
  const kalori = rencana?.kebutuhan_kalori_harian;

  return (
    <div className="space-y-6 mb-8">
      {/* Progress Header */}
      <Card className="rounded-2xl border-gray-100 shadow-sm bg-gradient-to-r from-primary/5 to-teal-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-xl text-slate-800">
                Minggu ke-{progress.minggu_ke}
              </h2>
              <p className="text-sm text-slate-500">
                {formatDate(progress.tanggal_mulai)} — {formatDate(progress.tanggal_selesai)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {progress.overall_percentage}%
              </div>
              <p className="text-xs text-slate-500">{progress.overall_progress}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.overall_percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Kebutuhan Nutrisi Cards */}
      {(kalori || nutrisi) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {kalori != null && (
            <Card className="rounded-xl border-gray-100 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                  <Flame className="text-orange-500" size={18} />
                </div>
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Kalori</span>
                <span className="text-xl font-bold text-gray-900">{kalori}</span>
                <span className="text-[10px] text-gray-500">kkal/hari</span>
              </CardContent>
            </Card>
          )}
          {nutrisi?.protein_gram != null && (
            <Card className="rounded-xl border-gray-100 shadow-sm bg-gradient-to-br from-rose-50 to-rose-100/50 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center mb-1">
                  <Egg className="text-rose-500" size={18} />
                </div>
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Protein</span>
                <span className="text-xl font-bold text-gray-900">{nutrisi.protein_gram}</span>
                <span className="text-[10px] text-gray-500">gram/hari</span>
              </CardContent>
            </Card>
          )}
          {nutrisi?.lemak_persen != null && (
            <Card className="rounded-xl border-gray-100 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                  <Droplets className="text-amber-500" size={18} />
                </div>
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Lemak</span>
                <span className="text-xl font-bold text-gray-900">{nutrisi.lemak_persen}%</span>
                <span className="text-[10px] text-gray-500">dari total</span>
              </CardContent>
            </Card>
          )}
          {nutrisi?.karbohidrat_persen != null && (
            <Card className="rounded-xl border-gray-100 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                  <Wheat className="text-blue-500" size={18} />
                </div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Karbo</span>
                <span className="text-xl font-bold text-gray-900">{nutrisi.karbohidrat_persen}%</span>
                <span className="text-[10px] text-gray-500">dari total</span>
              </CardContent>
            </Card>
          )}
          {nutrisi?.kalsium_mg != null && (
            <Card className="rounded-xl border-gray-100 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                  <Pill className="text-purple-500" size={18} />
                </div>
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Kalsium</span>
                <span className="text-xl font-bold text-gray-900">{nutrisi.kalsium_mg}</span>
                <span className="text-[10px] text-gray-500">mg/hari</span>
              </CardContent>
            </Card>
          )}
          {nutrisi?.zat_besi_mg != null && (
            <Card className="rounded-xl border-gray-100 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:scale-[1.02] transition-transform">
              <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <Pill className="text-emerald-500" size={18} />
                </div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Zat Besi</span>
                <span className="text-xl font-bold text-gray-900">{nutrisi.zat_besi_mg}</span>
                <span className="text-[10px] text-gray-500">mg/hari</span>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
