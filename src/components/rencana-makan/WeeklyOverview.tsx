"use client";

import { Loader2 } from "lucide-react";
import type { GiziProgressResponse } from "@/lib/types/gizi.types";
import { Card, CardContent } from "@/components/ui/card";

interface WeeklyOverviewProps {
  progress: GiziProgressResponse | null;
  loading: boolean;
}

export default function WeeklyOverview({ progress, loading }: WeeklyOverviewProps) {
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

  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm mb-8 bg-gradient-to-r from-primary/5 to-teal-50">
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
  );
}
