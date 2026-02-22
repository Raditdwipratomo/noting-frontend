"use client";

import { useState, useEffect } from "react";
import { BarChart3, Loader2 } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { diagnosaService } from "@/lib/api/services/diagnosa.service";
import type { DiagnosaResponseData } from "@/lib/types/diagnosa.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

function getStatusStyle(status: string): {
  color: "amber" | "emerald";
  label: string;
} {
  switch (status) {
    case "normal":
      return { color: "emerald", label: "Normal" };
    case "berisiko":
      return { color: "amber", label: "Berisiko" };
    case "stunting":
      return { color: "amber", label: "Stunting" };
    case "severely_stunted":
      return { color: "amber", label: "Stunting Parah" };
    default:
      return { color: "emerald", label: status };
  }
}

const badgeColors = {
  amber:
    "bg-amber-100 text-amber-700 hover:bg-amber-100/80 border-amber-200",
  emerald:
    "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 border-emerald-200",
};

const dotColors = {
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
};

export default function DiagnosisHistory() {
  const { selectedAnakId } = useAnak();
  const [history, setHistory] = useState<DiagnosaResponseData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await diagnosaService.getRiwayat(selectedAnakId, 5);
        if (!cancelled) setHistory(data);
      } catch {
        if (!cancelled) setHistory([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => {
      cancelled = true;
    };
  }, [selectedAnakId]);

  return (
    <div className="flex-1 flex flex-col">
      {/* History Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
            Riwayat Diagnosa
          </h3>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        )}

        {!loading && history.length === 0 && (
          <p className="text-gray-400 text-sm italic py-4">
            Belum ada riwayat diagnosa.
          </p>
        )}

        {!loading && history.length > 0 && (
          <div className="relative pl-4 space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {history.map((record, idx) => {
              const { color, label } = getStatusStyle(
                record.status_stunting
              );
              const date = new Date(
                record.tanggal_diagnosa
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div key={record.id_diagnosa} className="relative pl-6">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-white",
                      dotColors[color]
                    )}
                  />

                  <div
                    className={cn(
                      "rounded-xl p-3 border border-gray-100 transition-all",
                      idx === 0 ? "bg-gray-50" : "bg-white"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-gray-500">
                        {date}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-bold border-transparent",
                          badgeColors[color]
                        )}
                      >
                        {label}
                      </Badge>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-gray-600">
                      {record.pertumbuhan && (
                        <>
                          <span>
                            TB: {record.pertumbuhan.tinggi_badan_cm}cm
                          </span>
                          <span>
                            BB: {record.pertumbuhan.berat_badan_kg}kg
                          </span>
                          {record.pertumbuhan.lingkar_lengan_atas_cm && (
                            <span>
                              LILA: {record.pertumbuhan.lingkar_lengan_atas_cm}cm
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input Button */}
      <div className="mt-auto pt-6">
        <Link href="/pertumbuhan/input-data">
          <Button
            variant="secondary"
            className="w-full py-6 bg-secondary hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2"
          >
            <BarChart3 size={20} />
            Input Pengukuran Baru
          </Button>
        </Link>
      </div>
    </div>
  );
}
