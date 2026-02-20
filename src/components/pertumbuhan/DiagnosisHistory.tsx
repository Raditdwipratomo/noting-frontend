"use client";

import { BarChart3 } from "lucide-react";
import { diagnosisHistory } from "@/lib/data/pertumbuhan-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badgeColors = {
  amber: "bg-amber-100 text-amber-700 hover:bg-amber-100/80 border-amber-200",
  emerald: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 border-emerald-200",
};

const dotColors = {
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
};

export default function DiagnosisHistory() {
  return (
    <div className="flex-1 flex flex-col">
      {/* History Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
            Riwayat Diagnosa
          </h3>
          <Button variant="link" className="text-primary text-sm font-semibold hover:underline p-0 h-auto">
            Lihat Semua
          </Button>
        </div>

        <div className="relative pl-4 space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
          {diagnosisHistory.map((record) => (
            <div key={record.id} className="relative pl-6">
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-white",
                  dotColors[record.statusColor]
                )}
              />

              <div
                className={cn(
                  "rounded-xl p-3 border border-gray-100 transition-all",
                  record.isLatest
                    ? "bg-gray-50"
                    : cn(
                        "bg-white",
                        record.statusColor === "emerald" && !record.isLatest ? "opacity-70 hover:opacity-100" : ""
                      )
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-gray-500">
                    {record.date}
                  </span>
                  <Badge
                     variant="outline"
                    className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold border-transparent", badgeColors[record.statusColor])}
                  >
                    {record.status}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-gray-800">
                  {record.location}
                </p>
                <div className="flex gap-3 mt-2 text-xs text-gray-600">
                  <span>TB: {record.height}</span>
                  <span>BB: {record.weight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Button */}
      <div className="mt-auto pt-6">
        <Button 
          variant="secondary"
          className="w-full py-6 bg-secondary hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2"
        >
          <BarChart3 size={20} />
          Input Pengukuran Baru
        </Button>
      </div>
    </div>
  );
}
