"use client";

import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { activeChild } from "@/lib/data/dashboard-data";
import { diagnosisStatus, zScoreStats } from "@/lib/data/pertumbuhan-data";
import type { ZScoreStat } from "@/lib/data/pertumbuhan-data";

const statusColorMap = {
  amber: {
    value: "text-amber-600",
    badge: "text-amber-600 bg-amber-50",
  },
  emerald: {
    value: "text-emerald-600",
    badge: "text-emerald-600 bg-emerald-50",
  },
  rose: {
    value: "text-rose-600",
    badge: "text-rose-600 bg-rose-50",
  },
};

function ZScoreCard({ stat }: { stat: ZScoreStat }) {
  const c = statusColorMap[stat.statusColor];
  return (
    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
      <div className="text-xs text-gray-500 font-bold mb-1">{stat.label}</div>
      <div
        className={`text-xl font-[var(--font-display)] font-bold ${c.value}`}
      >
        {stat.value}
      </div>
      <div
        className={`text-[10px] ${c.badge} rounded-full px-2 py-0.5 inline-block mt-1`}
      >
        {stat.status}
      </div>
    </div>
  );
}

export default function DiagnosisCard() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Child photo */}
        <div className="w-full md:w-auto flex flex-col items-center justify-center shrink-0">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse" />
            <Image
              src={activeChild.photo}
              alt={`Foto ${activeChild.name}`}
              width={144}
              height={144}
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
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
              <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-bold text-lg border border-amber-200 flex items-center gap-2">
                <AlertTriangle size={20} />
                {diagnosisStatus.label}
              </span>
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
    </div>
  );
}
