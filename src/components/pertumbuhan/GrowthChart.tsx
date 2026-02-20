"use client";

import { TrendingUp } from "lucide-react";
import {
  growthDataPoints,
  chartZones,
  trendInsight,
} from "@/lib/data/pertumbuhan-data";
import { useState } from "react";

const tabs = ["TB/U", "BB/U"] as const;

export default function GrowthChart() {
  const [activeTab, setActiveTab] = useState<string>("TB/U");

  // Build SVG path
  const pathD = growthDataPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-[var(--font-display)] font-bold text-xl text-gray-800">
            Tren Pertumbuhan
          </h3>
          <p className="text-sm text-gray-500">
            Analisis Z-Score TB/U Berdasarkan Standar WHO
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  activeTab === tab
                    ? "bg-white shadow-sm text-primary"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full aspect-[16/7] min-h-[280px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        {/* Zone backgrounds */}
        <div className="absolute inset-0 flex flex-col">
          {chartZones.map((zone, i) => (
            <div
              key={i}
              className={`${zone.bgColor} ${i < chartZones.length - 1 ? `border-b ${zone.borderColor}` : ""} flex items-center justify-end px-4`}
              style={{ height: zone.height }}
            >
              <span
                className={`text-[10px] font-bold ${zone.labelColor} uppercase tracking-widest`}
              >
                {zone.label}
              </span>
            </div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-30">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full border-t border-gray-300 border-dashed"
            />
          ))}
        </div>

        {/* SVG Line + Points */}
        <svg
          className="absolute inset-0 w-full h-full p-8"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d={pathD}
            fill="none"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          {growthDataPoints.map((p, i) => {
            const isLast = i === growthDataPoints.length - 1;
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={isLast ? 2.5 : 2}
                fill={isLast ? "#F59E0B" : "white"}
                stroke={isLast ? "white" : "#F59E0B"}
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* Month labels */}
        <div className="absolute bottom-2 left-0 w-full flex justify-between px-8 text-[10px] font-bold text-gray-400 uppercase">
          {growthDataPoints.map((p) => (
            <span key={p.month}>{p.month}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs text-gray-600 font-medium">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-xs text-gray-600 font-medium">
            Resiko Stunting
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <span className="text-xs text-gray-600 font-medium">Stunting</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-6 h-0.5 bg-amber-500" />
          <span className="text-xs font-bold text-amber-600">
            Pertumbuhan Budi
          </span>
        </div>
      </div>

      {/* Trend insight */}
      <div className="flex items-start gap-4 mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <TrendingUp size={20} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-blue-700">
            {trendInsight.title}
          </h4>
          <p className="text-xs text-blue-600 mt-1">
            {trendInsight.description}
          </p>
        </div>
      </div>
    </div>
  );
}
