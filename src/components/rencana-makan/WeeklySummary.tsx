"use client";

import { Loader2, TrendingUp, Target, Utensils } from "lucide-react";
import type { GiziProgressResponse } from "@/lib/types/gizi.types";
import { Card, CardContent } from "@/components/ui/card";

interface WeeklySummaryProps {
  progress: GiziProgressResponse | null;
  loading: boolean;
}

export default function WeeklySummary({ progress, loading }: WeeklySummaryProps) {
  if (loading) {
    return (
      <Card className="rounded-2xl border-gray-100 shadow-sm">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (!progress) {
    return (
      <Card className="rounded-2xl border-gray-100 shadow-sm">
        <CardContent className="p-6 text-center text-gray-400 text-sm">
          Belum ada data ringkasan
        </CardContent>
      </Card>
    );
  }

  const daily = progress.daily_progress ?? [];
  const completedDays = daily.filter((d) => d.status === "selesai").length;
  const inProgressDays = daily.filter((d) => d.status === "sedang_berjalan").length;
  const totalDays = daily.length;

  const summaryCards = [
    {
      icon: Target,
      label: "Target Mingguan",
      value: `${progress.overall_percentage}%`,
      sub: progress.overall_progress,
      color: "text-primary bg-primary/10",
    },
    {
      icon: TrendingUp,
      label: "Hari Selesai",
      value: `${completedDays}/${totalDays}`,
      sub: `${inProgressDays} sedang berjalan`,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: Utensils,
      label: "Rata-rata Progress",
      value:
        daily.length > 0
          ? `${Math.round(daily.reduce((s, d) => s + d.percentage, 0) / daily.length)}%`
          : "0%",
      sub: "Per hari",
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Ringkasan</h3>

      {summaryCards.map((card) => (
        <Card key={card.label} className="rounded-2xl border-gray-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.color}`}>
              <card.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500">{card.label}</p>
              <p className="font-bold text-lg text-slate-800">{card.value}</p>
              <p className="text-xs text-slate-400">{card.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Daily progress breakdown */}
      <Card className="rounded-2xl border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <h4 className="text-sm font-bold text-slate-700 mb-3">Progress Harian</h4>
          <div className="space-y-2">
            {daily.map((day) => {
              const date = new Date(day.tanggal);
              const dayLabel = date.toLocaleDateString("id-ID", {
                weekday: "short",
                day: "numeric",
              });
              return (
                <div key={day.hari_ke} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-16">{dayLabel}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${day.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 w-10 text-right">
                    {day.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
