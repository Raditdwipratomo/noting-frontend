"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Check,
  Pencil,
  Sunrise,
  Sun,
  Moon,
  PlusCircle,
  Megaphone,
  ArrowUp,
  Loader2,
  CalendarOff,
} from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { giziService } from "@/lib/api/services/gizi.service";
import type {
  RekomendasiHarian,
  DetailMakananHarian,
} from "@/lib/types/gizi.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

type TimeOfDay = "pagi" | "siang" | "malam";

const timeIcons: Record<TimeOfDay, React.ElementType> = {
  pagi: Sunrise,
  siang: Sun,
  malam: Moon,
};

const timeIconColors: Record<TimeOfDay, string> = {
  pagi: "text-orange-400",
  siang: "text-yellow-500",
  malam: "text-blue-400",
};

const timeLabels: Record<TimeOfDay, string> = {
  pagi: "Pagi",
  siang: "Siang",
  malam: "Malam",
};

function getTimeOfDay(waktuMakan: string): TimeOfDay {
  const wm = waktuMakan.toLowerCase();
  if (wm.includes("pagi") || wm.includes("susu_pagi") || wm.includes("snack_pagi") || wm.includes("makan_pagi")) {
    return "pagi";
  }
  if (wm.includes("siang") || wm.includes("snack_sore") || wm.includes("sore")) {
    return "siang";
  }
  return "malam";
}

function CalorieRing({
  totalCalorie,
  consumedCalorie,
}: {
  totalCalorie: number;
  consumedCalorie: number;
}) {
  const percentage =
    totalCalorie > 0
      ? Math.min(Math.round((consumedCalorie / totalCalorie) * 100), 100)
      : 0;
  const remaining = Math.max(totalCalorie - consumedCalorie, 0);
  const data = [
    { name: "Calorie", value: percentage, fill: "var(--secondary)" },
  ];

  const message =
    percentage >= 100
      ? "Target Tercapai! 🎉"
      : percentage >= 75
      ? "Hampir Tercapai!"
      : percentage >= 50
      ? "Separuh Jalan"
      : "Ayo Terus!";

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl text-white mb-8 relative overflow-hidden shadow-lg border-none">
      <CardContent className="p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10" />
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="80%"
                outerRadius="100%"
                barSize={8}
                data={data}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "#374151" }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300 mb-1">Kebutuhan Kalori</p>
            <p className="font-bold text-lg leading-tight mb-2">{message}</p>
            <p className="text-xs text-gray-400">
              Sisa {remaining} kkal lagi untuk hari ini.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChecklistItemCard({
  item,
  onToggle,
}: {
  item: DetailMakananHarian;
  onToggle: (detailId: number, currentStatus: boolean) => void;
}) {
  const timeOfDay = getTimeOfDay(item.waktu_makan);
  const TimeIcon = timeIcons[timeOfDay];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <TimeIcon size={14} className={timeIconColors[timeOfDay]} />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {timeLabels[timeOfDay]}
        </span>
      </div>

      <Card
        className={cn(
          "rounded-xl border shadow-sm transition-colors",
          item.status_konsumsi
            ? "bg-gray-50 border-gray-100 hover:border-primary/30"
            : "bg-white border-gray-200 hover:border-primary"
        )}
      >
        <CardContent className="p-4 flex gap-3 group items-start">
          {item.status_konsumsi ? (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Check size={14} />
            </div>
          ) : (
            <div
              onClick={() => onToggle(item.id_detail, item.status_konsumsi)}
              className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors"
            />
          )}

          <div className="flex-1">
            <h5
              className={cn(
                "text-sm font-bold text-gray-800",
                item.status_konsumsi && "line-through decoration-gray-400"
              )}
            >
              {item.nama_makanan}
            </h5>
            <p className="text-xs text-gray-500">
              {item.porsi}{item.nutrisi_makanan ? ` • ${item.nutrisi_makanan.kalori_total} kkal` : ""}
            </p>
          </div>

          {item.status_konsumsi ? (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-primary"
              >
                <Pencil size={14} />
              </Button>
            </div>
          ) : (
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-primary hover:bg-teal-600 shadow-md"
              onClick={() => onToggle(item.id_detail, item.status_konsumsi)}
            >
              <Check size={14} />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DailyChecklist() {
  const { selectedAnakId } = useAnak();
  const [todayData, setTodayData] = useState<RekomendasiHarian | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayData = useCallback(async () => {
    if (!selectedAnakId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await giziService.getTodayRecommendation(selectedAnakId);
      setTodayData(data);
    } catch (err: any) {
      console.error("DailyChecklist fetch error:", err);
      setError(err.message || "Gagal memuat data");
      setTodayData(null);
    } finally {
      setLoading(false);
    }
  }, [selectedAnakId]);

  useEffect(() => {
    fetchTodayData();
  }, [fetchTodayData]);

  const handleToggle = async (detailId: number, currentStatus: boolean) => {
    if (!selectedAnakId) return;

    try {
      await giziService.updateMakananStatus(selectedAnakId, detailId, {
        status_konsumsi: !currentStatus,
      });
      // Refresh data after toggle
      await fetchTodayData();
    } catch (err: any) {
      console.error("Toggle error:", err);
    }
  };

  // Calculate calorie stats from today's food items
  const items = todayData?.detail_makanan_harian ?? [];
  const totalCalorie = items.reduce((sum, item) => sum + (item.nutrisi_makanan?.kalori_total || 0), 0);
  const consumedCalorie = items
    .filter((item) => item.status_konsumsi)
    .reduce((sum, item) => sum + (item.nutrisi_makanan?.kalori_total || 0), 0);

  return (
    <div className="w-full lg:w-[35%] bg-white border-l border-gray-200 p-6 flex flex-col h-full overflow-y-auto hide-scroll">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
          Ceklis Harian
        </h3>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary hover:bg-primary/20"
        >
          Hari Ini
        </Badge>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <Loader2 size={32} className="animate-spin" />
            <span className="text-sm">Memuat ceklis harian...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-sm mb-2">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTodayData}
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      )}

      {/* Empty state — no plan for today */}
      {!loading && !error && !todayData && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-gray-400 text-center px-4">
            <CalendarOff size={48} />
            <p className="text-sm font-medium">Belum ada rencana makan hari ini</p>
            <p className="text-xs">
              Buat rencana gizi mingguan di halaman Rencana Makan terlebih dahulu.
            </p>
          </div>
        </div>
      )}

      {/* Data loaded */}
      {!loading && !error && todayData && (
        <>
          {/* Calorie Progress */}
          <CalorieRing
            totalCalorie={totalCalorie}
            consumedCalorie={consumedCalorie}
          />

          {/* Checklist Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <ChecklistItemCard
                key={item.id_detail}
                item={item}
                onToggle={handleToggle}
              />
            ))}

            {items.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-4">
                Tidak ada menu untuk hari ini.
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom section */}
      <div className="mt-auto pt-6">
        {/* Note Input */}
        <div className="mt-4 relative">
          <Input
            type="text"
            className="w-full bg-gray-100 border-none rounded-xl py-6 pl-4 pr-10 text-sm focus-visible:ring-primary placeholder-gray-400"
            placeholder="Tambah catatan hari ini..."
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 hover:bg-primary"
          >
            <ArrowUp size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
