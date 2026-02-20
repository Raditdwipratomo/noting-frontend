"use client";

import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { activeChild } from "@/lib/data/dashboard-data";
import { diagnosisStatus, zScoreStats } from "@/lib/data/pertumbuhan-data";
import type { ZScoreStat } from "@/lib/data/pertumbuhan-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

function ZScoreCard({ stat }: { stat: ZScoreStat }) {
  const c = statusColorMap[stat.statusColor];
  return (
    <Card className="bg-gray-50 border-gray-100 text-center shadow-none">
      <CardContent className="p-3">
        <div className="text-xs text-gray-500 font-bold mb-1">{stat.label}</div>
        <div className={cn("text-xl font-[var(--font-display)] font-bold", c.value)}>
          {stat.value}
        </div>
        <Badge
          variant="outline"
          className={cn("text-[10px] px-2 py-0.5 mt-1 border", c.badge)}
        >
          {stat.status}
        </Badge>
      </CardContent>
    </Card>
  );
}

export default function DiagnosisCard() {
  return (
    <Card className="rounded-3xl bg-white text-gray-800 border-gray-100 mb-8 relative overflow-hidden shadow-sm">
      <CardContent className="p-6 md:p-8">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          {/* Child photo */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center shrink-0">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
                 <Avatar className="w-full h-full">
                    <AvatarImage src={activeChild.photo} alt={`Foto ${activeChild.name}`} className="object-cover" />
                    <AvatarFallback>{activeChild.name.charAt(0)}</AvatarFallback>
                 </Avatar>
              </div>
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-2xl mt-4 text-gray-800">
              {activeChild.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {activeChild.age} • {activeChild.gender}
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
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-bold text-lg border-amber-200 flex items-center gap-2 hover:bg-amber-200/50"
                >
                  <AlertTriangle size={20} />
                  {diagnosisStatus.label}
                </Badge>
                <span className="text-sm text-gray-500">
                  Diupdate: {diagnosisStatus.updatedAt}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {diagnosisStatus.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {zScoreStats.map((stat) => (
                <ZScoreCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
