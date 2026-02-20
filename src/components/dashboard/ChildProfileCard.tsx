"use client";

import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import type { NutritionStat } from "../../lib/data/dashboard-data";
import { activeChild, nutritionStats } from "../../lib/data/dashboard-data";

const colorMap = {
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
    <div className={`${c.bg} p-3 rounded-2xl border ${c.border}`}>
      <div className={`text-xs ${c.label} font-bold mb-1`}>{stat.label}</div>
      <div
        className={`text-2xl font-[var(--font-display)] font-bold ${c.value}`}
      >
        {stat.value} <span className="text-sm">{stat.unit}</span>
      </div>
      <div className={`text-[10px] ${c.sub} mt-1`}>{stat.subtext}</div>
    </div>
  );
}

export default function ChildProfileCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left: Child photo */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse" />
            <Image
              src={activeChild.photo}
              alt={`Foto ${activeChild.name}`}
              width={176}
              height={176}
              className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-100">
              <span className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-sm font-bold text-emerald-600">
                {activeChild.status}
              </span>
            </div>
          </div>
          <h2 className="font-[var(--font-display)] font-bold text-2xl mt-4 text-gray-800">
            {activeChild.name}
          </h2>
          <p className="text-gray-500 text-sm">
            {activeChild.age} • {activeChild.gender}
          </p>
        </div>

        {/* Right: Nutrition status */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-[var(--font-display)] font-semibold text-xl text-gray-800">
              Status Gizi Terkini
            </h3>
            <button className="text-primary hover:text-emerald-600 text-sm font-semibold flex items-center gap-1">
              Lihat Grafik <ArrowRight size={14} />
            </button>
          </div>

          <p
            className="text-gray-600 text-sm mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: activeChild.summary }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {nutritionStats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}

            {/* Input Data card */}
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between cursor-pointer hover:bg-emerald-100 transition-colors">
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
          </div>

          <div className="flex gap-2 mt-6 flex-wrap">
            {["#CegahStunting", "#GiziSeimbang", "#AnakSehat"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-gray-100 text-xs text-gray-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
