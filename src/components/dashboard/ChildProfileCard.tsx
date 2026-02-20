"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Plus, Baby, Loader2 } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import { diagnosaService } from "@/lib/api/services/diagnosa.service";
import type { PertumbuhanResponse } from "@/lib/types/pertumbuhan.types";
import type { DiagnosaResponseData } from "@/lib/types/diagnosa.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NutritionStat {
  label: string;
  value: string;
  unit: string;
  subtext: string;
  colorScheme: "blue" | "orange" | "purple" | "emerald";
}

const colorMap: Record<
  string,
  { bg: string; border: string; label: string; value: string; sub: string }
> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    label: "text-blue-600",
    value: "text-blue-800",
    sub: "text-blue-500",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    label: "text-orange-600",
    value: "text-orange-800",
    sub: "text-orange-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-100",
    label: "text-purple-600",
    value: "text-purple-800",
    sub: "text-purple-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    label: "text-emerald-600",
    value: "text-emerald-700",
    sub: "text-emerald-500",
  },
};

function StatCard({ stat }: { stat: NutritionStat }) {
  const c = colorMap[stat.colorScheme];
  return (
    <div className={cn("p-3 rounded-2xl border", c.bg, c.border)}>
      <div className={cn("text-xs font-bold mb-1", c.label)}>{stat.label}</div>
      <div
        className={cn(
          "text-2xl font-[var(--font-display)] font-bold",
          c.value
        )}
      >
        {stat.value} <span className="text-sm">{stat.unit}</span>
      </div>
      <div className={cn("text-[10px] mt-1", c.sub)}>{stat.subtext}</div>
    </div>
  );
}

function getAgeText(tanggalLahir: string): string {
  const birth = new Date(tanggalLahir);
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years > 0 && remainingMonths > 0) {
    return `${years} Tahun ${remainingMonths} Bulan`;
  }
  if (years > 0) return `${years} Tahun`;
  return `${months} Bulan`;
}

function getStatusColor(status?: string) {
  if (!status) return "text-gray-500";
  switch (status) {
    case "normal":
      return "text-emerald-600";
    case "berisiko":
      return "text-yellow-600";
    case "stunting":
      return "text-red-600";
    case "severely_stunted":
      return "text-red-800";
    default:
      return "text-gray-500";
  }
}

function getStatusLabel(status?: string) {
  switch (status) {
    case "normal":
      return "Normal";
    case "berisiko":
      return "Berisiko";
    case "stunting":
      return "Stunting";
    case "severely_stunted":
      return "Stunting Parah";
    default:
      return "Belum Diagnosa";
  }
}

export default function ChildProfileCard() {
  const { selectedAnak, selectedAnakId } = useAnak();
  const [latestGrowth, setLatestGrowth] =
    useState<PertumbuhanResponse | null>(null);
  const [latestDiagnosa, setLatestDiagnosa] =
    useState<DiagnosaResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;

    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [growth, diagnosa] = await Promise.allSettled([
          pertumbuhanService.getLatestGrowth(selectedAnakId),
          diagnosaService.getLatest(selectedAnakId),
        ]);

        if (!cancelled) {
          setLatestGrowth(
            growth.status === "fulfilled" ? growth.value : null
          );
          setLatestDiagnosa(
            diagnosa.status === "fulfilled" ? diagnosa.value : null
          );
        }
      } catch (err) {
        console.error("ChildProfileCard fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [selectedAnakId]);

  // Loading state
  if (loading || !selectedAnak) {
    return (
      <Card className="rounded-3xl border-gray-100 mb-8 shadow-sm">
        <CardContent className="p-10 flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 size={32} className="animate-spin" />
              <span className="text-sm">Memuat data anak...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Baby size={48} />
              <span className="text-sm">
                Belum ada anak terdaftar. Tambahkan anak pertama!
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Build nutrition stats from latest growth data
  const stats: NutritionStat[] = [];
  if (latestGrowth) {
    stats.push({
      label: "Tinggi Badan",
      value: String(latestGrowth.tinggi_badan_cm ?? "-"),
      unit: "cm",
      subtext: latestDiagnosa?.z_score_tinggi_badan
        ? `Z-Score: ${parseFloat(latestDiagnosa.z_score_tinggi_badan).toFixed(1)} SD`
        : "Belum ada data",
      colorScheme: "blue",
    });
    stats.push({
      label: "Berat Badan",
      value: String(latestGrowth.berat_badan_kg ?? "-"),
      unit: "kg",
      subtext: latestDiagnosa?.z_score_berat_badan
        ? `Z-Score: ${parseFloat(latestDiagnosa.z_score_berat_badan).toFixed(1)} SD`
        : "Belum ada data",
      colorScheme: "orange",
    });
    if (latestGrowth.lingkar_kepala_cm) {
      stats.push({
        label: "Lingkar Kepala",
        value: String(latestGrowth.lingkar_kepala_cm),
        unit: "cm",
        subtext: "Normal",
        colorScheme: "purple",
      });
    }
  }

  const statusStunting = latestDiagnosa?.status_stunting;

  return (
    <Card className="rounded-3xl border-gray-100 mb-8 relative overflow-hidden group shadow-sm">
      <CardContent className="p-6 bg-white text-gray-800">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          {/* Left: Child photo */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse" />
              {selectedAnak.foto_profil ? (
                <img
                  src={selectedAnak.foto_profil}
                  alt={`Foto ${selectedAnak.nama_anak}`}
                  className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : (
                <div className="w-44 h-44 rounded-full bg-primary/10 border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Baby size={64} className="text-primary/50" />
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-100">
                <span
                  className={cn(
                    "w-3 h-3 rounded-full",
                    statusStunting === "normal"
                      ? "bg-emerald-500"
                      : statusStunting === "berisiko"
                      ? "bg-yellow-500"
                      : statusStunting
                      ? "bg-red-500"
                      : "bg-gray-400"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-bold",
                    getStatusColor(statusStunting)
                  )}
                >
                  {getStatusLabel(statusStunting)}
                </span>
              </div>
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-2xl mt-4 text-gray-800">
              {selectedAnak.nama_anak}
            </h2>
            <p className="text-gray-500 text-sm">
              {getAgeText(selectedAnak.tanggal_lahir)} •{" "}
              {selectedAnak.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
            </p>
          </div>

          {/* Right: Nutrition status */}
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-[var(--font-display)] font-semibold text-xl text-gray-800">
                Status Gizi Terkini
              </h3>
              <Link href="/pertumbuhan">
                <Button
                  variant="link"
                  className="text-primary hover:text-emerald-600 hover:no-underline font-semibold flex items-center gap-1 p-0 h-auto"
                >
                  Lihat Grafik <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

            {latestDiagnosa?.rekomendasi_tindakan ? (
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {latestDiagnosa.rekomendasi_tindakan}
              </p>
            ) : (
              <p className="text-gray-400 text-sm mb-6 italic">
                Belum ada rekomendasi. Lakukan diagnosa terlebih dahulu.
              </p>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}

              {/* Input Data card */}
              <Link href="/pertumbuhan">
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between cursor-pointer hover:bg-emerald-100 transition-colors h-full">
                  <div className="text-xs text-emerald-600 font-bold mb-1">
                    Input Data
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mt-auto">
                    <span className="bg-white rounded-full p-1 shadow-sm">
                      <Plus size={14} />
                    </span>
                    Ukur Baru
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex gap-2 mt-6 flex-wrap">
              {["#CegahStunting", "#GiziSeimbang", "#AnakSehat"].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
