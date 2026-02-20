"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Loader2, Baby, XCircle } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { diagnosaService } from "@/lib/api/services/diagnosa.service";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import type { DiagnosaResponseData } from "@/lib/types/diagnosa.types";
import type { PertumbuhanResponse } from "@/lib/types/pertumbuhan.types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ZScoreStat {
  label: string;
  value: string;
  status: string;
  statusColor: "amber" | "emerald" | "rose";
}

const statusColorMap = {
  amber: {
    value: "text-amber-600",
    badge: "text-amber-600 bg-amber-50 hover:bg-amber-100/80 border-amber-100",
  },
  emerald: {
    value: "text-emerald-600",
    badge: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100",
  },
  rose: {
    value: "text-rose-600",
    badge: "text-rose-600 bg-rose-50 hover:bg-rose-100/80 border-rose-100",
  },
};

function getAgeText(tanggalLahir: string): string {
  const birth = new Date(tanggalLahir);
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years > 0 && remainingMonths > 0) return `${years} Tahun ${remainingMonths} Bulan`;
  if (years > 0) return `${years} Tahun`;
  return `${months} Bulan`;
}

function getZScoreColor(zScore: number): "amber" | "emerald" | "rose" {
  if (zScore <= -3) return "rose";
  if (zScore <= -2) return "amber";
  return "emerald";
}

function getZScoreStatus(zScore: number, type: "tb" | "bb" | "bbtb"): string {
  if (type === "tb") {
    if (zScore <= -3) return "Sangat Pendek";
    if (zScore <= -2) return "Pendek";
    return "Normal";
  }
  if (type === "bb") {
    if (zScore <= -3) return "Gizi Buruk";
    if (zScore <= -2) return "Gizi Kurang";
    return "Normal";
  }
  // bbtb
  if (zScore <= -3) return "Sangat Kurus";
  if (zScore <= -2) return "Kurus";
  if (zScore >= 2) return "Gemuk";
  return "Gizi Baik";
}

function getStatusInfo(status?: string) {
  switch (status) {
    case "normal":
      return { label: "Normal", icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-100 border-emerald-200" };
    case "berisiko":
      return { label: "Berisiko Stunting", icon: AlertTriangle, color: "text-amber-700", bg: "bg-amber-100 border-amber-200" };
    case "stunting":
      return { label: "Stunting", icon: XCircle, color: "text-red-700", bg: "bg-red-100 border-red-200" };
    case "severely_stunted":
      return { label: "Stunting Parah", icon: XCircle, color: "text-red-900", bg: "bg-red-200 border-red-300" };
    default:
      return { label: "Belum Didiagnosa", icon: AlertTriangle, color: "text-gray-600", bg: "bg-gray-100 border-gray-200" };
  }
}

function ZScoreCard({ stat }: { stat: ZScoreStat }) {
  const c = statusColorMap[stat.statusColor];
  return (
    <Card className="bg-gray-50 border-gray-100 text-center shadow-none">
      <CardContent className="p-3">
        <div className="text-xs text-gray-500 font-bold mb-1">{stat.label}</div>
        <div className={cn("text-xl font-[var(--font-display)] font-bold", c.value)}>
          {stat.value}
        </div>
        <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 mt-1 border", c.badge)}>
          {stat.status}
        </Badge>
      </CardContent>
    </Card>
  );
}

export default function DiagnosisCard() {
  const { selectedAnak, selectedAnakId } = useAnak();
  const [diagnosa, setDiagnosa] = useState<DiagnosaResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await diagnosaService.getLatest(selectedAnakId);
        if (!cancelled) setDiagnosa(data);
      } catch {
        if (!cancelled) setDiagnosa(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [selectedAnakId]);

  if (loading) {
    return (
      <Card className="rounded-3xl border-gray-100 mb-8 shadow-sm">
        <CardContent className="p-10 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (!selectedAnak) {
    return (
      <Card className="rounded-3xl border-gray-100 mb-8 shadow-sm">
        <CardContent className="p-10 flex flex-col items-center justify-center text-gray-400 gap-3">
          <Baby size={48} />
          <span className="text-sm">Pilih anak untuk melihat diagnosa</span>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = getStatusInfo(diagnosa?.status_stunting);
  const StatusIcon = statusInfo.icon;

  // Build z-score stats
  const zScoreStats: ZScoreStat[] = [];
  if (diagnosa) {
    const zsTB = parseFloat(diagnosa.z_score_tinggi_badan);
    const zsBB = parseFloat(diagnosa.z_score_berat_badan);
    const zsBBTB = parseFloat(diagnosa.z_score_berat_tinggi);

    if (!isNaN(zsTB)) {
      zScoreStats.push({
        label: "TB/U",
        value: `${zsTB.toFixed(1)} SD`,
        status: getZScoreStatus(zsTB, "tb"),
        statusColor: getZScoreColor(zsTB),
      });
    }
    if (!isNaN(zsBB)) {
      zScoreStats.push({
        label: "BB/U",
        value: `${zsBB.toFixed(1)} SD`,
        status: getZScoreStatus(zsBB, "bb"),
        statusColor: getZScoreColor(zsBB),
      });
    }
    if (!isNaN(zsBBTB)) {
      zScoreStats.push({
        label: "BB/TB",
        value: `${zsBBTB.toFixed(1)} SD`,
        status: getZScoreStatus(zsBBTB, "bbtb"),
        statusColor: getZScoreColor(zsBBTB),
      });
    }
  }

  const updatedAt = diagnosa?.tanggal_diagnosa
    ? new Date(diagnosa.tanggal_diagnosa).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <Card className="rounded-3xl bg-white text-gray-800 border-gray-100 mb-8 relative overflow-hidden shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          {/* Child photo */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center shrink-0">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Avatar className="w-full h-full">
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {selectedAnak.nama_anak.charAt(0)}
                  </AvatarFallback>
                </Avatar>
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

          {/* Status & Z-Scores */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Status Saat Ini
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant="outline"
                  className={cn("px-4 py-2 rounded-xl font-bold text-lg flex items-center gap-2", statusInfo.bg, statusInfo.color)}
                >
                  <StatusIcon size={20} />
                  {statusInfo.label}
                </Badge>
                {updatedAt && (
                  <span className="text-sm text-gray-500">
                    Diupdate: {updatedAt}
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {diagnosa?.rekomendasi_tindakan ?? "Belum ada data diagnosa. Lakukan analisis stunting terlebih dahulu."}
              </p>
            </div>

            {zScoreStats.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {zScoreStats.map((stat) => (
                  <ZScoreCard key={stat.label} stat={stat} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Belum ada data z-score</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
