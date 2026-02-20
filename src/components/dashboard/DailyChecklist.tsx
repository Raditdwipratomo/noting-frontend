"use client";

import {
  Check,
  Pencil,
  Sunrise,
  Sun,
  Moon,
  PlusCircle,
  Megaphone,
  ArrowUp,
} from "lucide-react";
import {
  checklistItems,
  calorieProgress,
  posyanduReminder,
} from "@/lib/data/dashboard-data";

const timeIcons: Record<string, React.ElementType> = {
  pagi: Sunrise,
  siang: Sun,
  malam: Moon,
};

const timeIconColors: Record<string, string> = {
  pagi: "text-orange-400",
  siang: "text-yellow-500",
  malam: "text-blue-400",
};

const timeLabels: Record<string, string> = {
  pagi: "Pagi",
  siang: "Siang",
  malam: "Malam",
};

function CalorieRing() {
  const circumference = 2 * Math.PI * 40; // r=40
  const offset = circumference * (1 - calorieProgress.percentage / 100);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10" />
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-gray-700"
              cx="48"
              cy="48"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle
              className="text-secondary"
              cx="48"
              cy="48"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="8"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">
              {calorieProgress.percentage}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-300 mb-1">Kebutuhan Kalori</p>
          <p className="font-bold text-lg leading-tight mb-2">
            {calorieProgress.message}
          </p>
          <p className="text-xs text-gray-400">
            Sisa {calorieProgress.remaining} kkal lagi untuk hari ini.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChecklistItemCard({
  item,
}: {
  item: (typeof checklistItems)[number];
}) {
  const TimeIcon = timeIcons[item.timeOfDay];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <TimeIcon size={14} className={timeIconColors[item.timeOfDay]} />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {timeLabels[item.timeOfDay]}
        </span>
      </div>

      {item.isCompleted ? (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-3 group hover:border-primary/30 transition-colors">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-0.5">
            <Check size={14} />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-bold text-gray-800 line-through decoration-gray-400">
              {item.title}
            </h5>
            <p className="text-xs text-gray-500">{item.timeDetail}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-gray-400 hover:text-primary">
              <Pencil size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3 group hover:border-primary transition-colors shadow-sm">
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer hover:border-primary hover:bg-primary/10" />
          <div className="flex-1">
            <h5 className="text-sm font-bold text-gray-800">{item.title}</h5>
            <p className="text-xs text-gray-500">{item.timeDetail}</p>
            {item.tags && (
              <div className="mt-2 flex gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] rounded font-bold"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-teal-600 transition-colors">
            <Check size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function DailyChecklist() {
  return (
    <div className="w-full lg:w-[380px] bg-white border-l border-gray-200 p-6 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
          Ceklis Harian
        </h3>
        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-lg">
          Hari Ini
        </span>
      </div>

      {/* Calorie Progress */}
      <CalorieRing />

      {/* Checklist Items */}
      <div className="space-y-6">
        {checklistItems.map((item) => (
          <ChecklistItemCard key={item.id} item={item} />
        ))}

        {/* Malam placeholder */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Moon size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Malam
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 border-dashed flex gap-3 items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary">
            <PlusCircle size={20} />
            <span className="text-sm font-medium">Catat Makan Malam</span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-auto pt-6">
        {/* Posyandu Reminder */}
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0 text-yellow-600">
              <Megaphone size={20} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-800">
                {posyanduReminder.title}
              </h5>
              <p className="text-xs text-gray-600 mt-1">
                {posyanduReminder.description}
              </p>
            </div>
          </div>
        </div>

        {/* Note Input */}
        <div className="mt-4 relative">
          <input
            type="text"
            className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary placeholder-gray-400"
            placeholder="Tambah catatan hari ini..."
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
