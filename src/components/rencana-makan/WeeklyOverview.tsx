"use client";

import { CalendarDays, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WeeklyOverview() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">
          Oktober 2024
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Rencana Minggu ke-3
        </h1>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-slate-200 text-slate-600 hover:border-primary bg-white text-gray-800"
        >
          <CalendarDays className="w-5 h-5" />
          Pilih Minggu
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-slate-200 text-slate-600 hover:border-primary bg-white text-gray-800"
        >
          <Download className="w-5 h-5" />
          Unduh PDF
        </Button>
      </div>
    </div>
  );
}
