"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeeklyOverview from "@/components/rencana-makan/WeeklyOverview";
import DailyPlanCard from "@/components/rencana-makan/DailyPlanCard";
import WeeklySummary from "@/components/rencana-makan/WeeklySummary";
import { useAnak } from "@/contexts/AnakContext";
import { giziService } from "@/lib/api/services/gizi.service";
import type {
  RencanaGiziDetailResponse,
  GiziProgressResponse,
} from "@/lib/types/gizi.types";
import { Loader2, CalendarOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RencanaMakanPage() {
  const { selectedAnakId } = useAnak();
  const [rencana, setRencana] = useState<RencanaGiziDetailResponse | null>(null);
  const [progress, setProgress] = useState<GiziProgressResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const fetchData = useCallback(async () => {
    if (!selectedAnakId) return;
    setLoading(true);
    try {
      const [rencanaData, progressData] = await Promise.allSettled([
        giziService.getCurrentRencana(selectedAnakId),
        giziService.getProgress(selectedAnakId),
      ]);
      setRencana(rencanaData.status === "fulfilled" ? rencanaData.value : null);
      setProgress(progressData.status === "fulfilled" ? progressData.value : null);
    } catch (err) {
      console.error("RencanaMakan fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedAnakId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleGeneratePlan = async () => {
    if (!selectedAnakId) return;
    setGenerating(true);
    try {
      await giziService.generateRencana(selectedAnakId);
      await fetchData();
    } catch (err) {
      console.error("Generate plan error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const dailyPlans = rencana?.rekomendasi_harian ?? [];
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return (
    <div className="w-full max-w-screen bg-white shadow-2xl overflow-hidden border border-gray-200 min-h-screen flex flex-col">
      <DashboardHeader activePage="/rencana-makan" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-screen mx-auto px-6 py-10">
          <WeeklyOverview progress={progress} loading={loading} />

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gray-400" />
            </div>
          )}

          {!loading && !rencana && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
              <CalendarOff size={64} />
              <h2 className="text-xl font-bold text-gray-600">
                Belum Ada Rencana Makan
              </h2>
              <p className="text-sm text-center max-w-md">
                Buat rencana gizi mingguan untuk si kecil. AI akan menyusun menu harian
                sesuai kebutuhan nutrisi berdasarkan data pertumbuhan.
              </p>
              <Button
                onClick={handleGeneratePlan}
                disabled={generating}
                className="mt-2 px-6 py-6 rounded-xl font-bold shadow-sm"
              >
                {generating ? (
                  <Loader2 size={18} className="animate-spin mr-2" />
                ) : (
                  <Plus size={18} className="mr-2" />
                )}
                Buat Rencana Makan
              </Button>
            </div>
          )}

          {!loading && rencana && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Daily Plan List */}
              <div className="lg:w-[65%] space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      calendar_view_day
                    </span>
                    Ikhtisar Mingguan
                  </h2>
                  <span className="text-sm font-medium text-slate-500">
                    {progress
                      ? `${progress.overall_progress}`
                      : "Memuat..."}
                  </span>
                </div>
                <div className="space-y-4">
                  {dailyPlans.map((plan) => {
                    const date = new Date(plan.tanggal);
                    const dayName = dayNames[date.getDay()];
                    const dayNumber = date.getDate().toString();
                    const dayShort = dayName.slice(0, 3);

                    let status: "Selesai" | "Aktif" | "Belum Dimulai";
                    if (plan.status === "selesai") status = "Selesai";
                    else if (plan.status === "sedang_berjalan") status = "Aktif";
                    else status = "Belum Dimulai";

                    const completedCount = plan.detail_makanan_harian?.filter(
                      (d) => d.status_konsumsi
                    ).length ?? 0;
                    const totalCount = plan.detail_makanan_harian?.length ?? 0;

                    return (
                      <DailyPlanCard
                        key={plan.id_rekomendasi_harian}
                        dayName={`Hari ${plan.hari_ke} - ${dayName}`}
                        dayNumber={dayNumber}
                        dayShort={dayShort}
                        status={status}
                        progressText={`${completedCount}/${totalCount} Selesai`}
                        progressPercentage={plan.progress_harian}
                        isToday={isToday(plan.tanggal)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="lg:w-[35%] space-y-6">
                <WeeklySummary progress={progress} loading={loading} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full px-6 py-12 border-t border-slate-100 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined filled">
                child_care
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-600">
              NutriStunting
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 NutriStunting. Membantu cegah stunting untuk masa depan
            Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}

function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
