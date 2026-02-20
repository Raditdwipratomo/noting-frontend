"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Download, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnak } from "@/contexts/AnakContext";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import { reminderService } from "@/lib/api/services/reminder.service";
import type { GrowthStatisticsResponse } from "@/lib/types/pertumbuhan.types";
import type { ReminderResponse } from "@/lib/types/reminder.types";
import { cn } from "@/lib/utils";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getReminderStyle(tipe: string) {
  if (tipe === "posyandu" || tipe === "medis") {
    return {
      bg: "bg-red-50 border-red-400",
      pill: "bg-red-100 text-red-600",
      timeText: "text-red-400",
      titleText: "text-slate-800",
      descText: "text-slate-500",
    };
  }
  if (tipe === "imunisasi") {
    return {
      bg: "bg-blue-50 border-blue-400",
      pill: "bg-blue-100 text-blue-600",
      timeText: "text-blue-400",
      titleText: "text-slate-800",
      descText: "text-slate-500",
    };
  }
  // Makanan or others
  return {
    bg: "bg-emerald-50 border-emerald-400",
    pill: "bg-emerald-100 text-emerald-600",
    timeText: "text-emerald-400",
    titleText: "text-slate-800",
    descText: "text-slate-500",
  };
}

export default function ProfileSidebar() {
  const { selectedAnakId } = useAnak();
  const [stats, setStats] = useState<GrowthStatisticsResponse | null>(null);
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;

    let cancelled = false;

    // Fetch Stats
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const data = await pertumbuhanService.getStatistics(String(selectedAnakId));
        if (!cancelled) setStats(data);
      } catch (err) {
        console.error("Stats error:", err);
      } finally {
        if (!cancelled) setLoadingStats(false);
      }
    };

    // Fetch Reminders
    const fetchReminders = async () => {
      setLoadingReminders(true);
      try {
        const data = await reminderService.getByAnakId(selectedAnakId, false);
        // Only take the next 3 upcoming/active reminders
        if (!cancelled) setReminders(data.slice(0, 3));
      } catch (err) {
        console.error("Reminders error:", err);
      } finally {
        if (!cancelled) setLoadingReminders(false);
      }
    };

    fetchStats();
    fetchReminders();

    return () => {
      cancelled = true;
    };
  }, [selectedAnakId]);

  const totalBerat = stats?.total_growth?.berat
    ? parseFloat(stats.total_growth.berat).toFixed(1)
    : "0";
  const totalTinggi = stats?.total_growth?.tinggi
    ? parseFloat(stats.total_growth.tinggi).toFixed(1)
    : "0";

  return (
    <div className="w-full lg:w-[35%] bg-white border-l border-slate-200 p-6 flex flex-col h-full overflow-y-auto">
      {/* Statistik Cepat */}
      <div className="mb-8">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-slate-800 mb-4">
          Statistik Pertumbuhan Total
        </h3>
        <div className="bg-gradient-to-br from-primary to-teal-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          {loadingStats ? (
             <div className="flex items-center justify-center py-6 relative z-10">
               <Loader2 size={24} className="animate-spin text-white/70" />
             </div>
          ) : (
            <>
              <div className="mb-6 relative z-10">
                <p className="text-teal-100 text-sm mb-1">Total Kenaikan Berat</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{parseFloat(totalBerat) > 0 ? "+" : ""}{totalBerat}</span>
                  <span className="text-lg font-medium opacity-80 mb-1">kg</span>
                  <div className="ml-auto bg-white/20 px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" /> Record
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-xs text-teal-100 mb-1">Total Kenaikan Tinggi</div>
                  <div className="font-bold text-lg">
                    {parseFloat(totalTinggi) > 0 ? "+" : ""}{totalTinggi} <span className="text-xs font-normal">cm</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex flex-col justify-center">
                  <div className="text-xs text-teal-100 mb-1">Total Record</div>
                  <div className="font-bold text-lg">
                    {stats?.total_records ?? 0} <span className="text-xs font-normal">kali</span>
                  </div>
                </div>
              </div>
            </>
          )}
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
          {loadingReminders && (
            <div className="flex items-center justify-center py-6 text-slate-400">
              <Loader2 size={20} className="animate-spin" />
            </div>
          )}

          {!loadingReminders && reminders.length === 0 && (
            <p className="text-slate-400 text-sm text-center italic py-4">Belum ada reminder.</p>
          )}

          {!loadingReminders &&
            reminders.map((reminder) => {
              const style = getReminderStyle(reminder.tipe_notifikasi);
              return (
                <div
                  key={reminder.id}
                  className={cn("p-4 rounded-2xl border-l-4 relative", style.bg)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div
                      className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                        style.pill
                      )}
                    >
                      {reminder.tipe_notifikasi.replace("_", " ")}
                    </div>
                    <span className={cn("text-xs font-bold", style.timeText)}>
                      {formatDate(reminder.waktu_reminder)}
                    </span>
                  </div>
                  <h4 className={cn("font-bold mb-1", style.titleText)}>
                    {reminder.pesan_custom?.split(".")[0] || "Pengingat"}
                  </h4>
                  <p className={cn("text-xs mb-3 line-clamp-2", style.descText)}>
                    {reminder.pesan_custom || "Jadwal penting untuk si kecil."}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full py-2 bg-white text-xs font-bold shadow-sm"
                  >
                    Tandai Selesai
                  </Button>
                </div>
              );
            })}

          {/* Tambah Reminder */}
          <Link href="/dashboard">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-colors mt-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium text-slate-500">
                Tambah Pengingat Baru
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Unduh Laporan */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <h4 className="font-bold text-base mb-2">Unduh Laporan Medis</h4>
          <p className="text-xs text-slate-400 mb-4">
            Dapatkan rangkuman kesehatan anak dalam format PDF untuk konsultasi
            dokter.
          </p>
          <Button disabled className="w-full py-2.5 bg-primary hover:bg-teal-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            <Download className="w-5 h-5" />
            <span className="opacity-90">Segera Hadir</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
