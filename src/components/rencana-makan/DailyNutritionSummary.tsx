import React from "react";
import { RekomendasiHarian } from "@/lib/types/gizi.types";

interface DailyNutritionSummaryProps {
  rekomendasi: RekomendasiHarian;
}

export default function DailyNutritionSummary({
  rekomendasi,
}: DailyNutritionSummaryProps) {
  const items = rekomendasi.detail_makanan_harian;

  // Calculate target totals from per-meal targets
  const targetKalori = items.reduce((sum, item) => sum + (item.target_kalori || 0), 0);

  // Calculate total available nutrition from all meals
  const totalNutrisi = items.reduce(
    (acc, item) => {
      if (item.nutrisi_makanan) {
        acc.protein += Number(item.nutrisi_makanan.protein_gram) || 0;
        acc.lemak += Number(item.nutrisi_makanan.lemak_gram) || 0;
        acc.karbo += Number(item.nutrisi_makanan.karbohidrat_gram) || 0;
        acc.kalori += Number(item.nutrisi_makanan.kalori_total) || 0;
      }
      return acc;
    },
    { protein: 0, lemak: 0, karbo: 0, kalori: 0 },
  );

  // Calculate consumed intake
  const currentIntake = items.reduce(
    (acc, item) => {
      if (item.status_konsumsi && item.nutrisi_makanan) {
        acc.protein += Number(item.nutrisi_makanan.protein_gram) || 0;
        acc.lemak += Number(item.nutrisi_makanan.lemak_gram) || 0;
        acc.karbo += Number(item.nutrisi_makanan.karbohidrat_gram) || 0;
        acc.kalori += Number(item.nutrisi_makanan.kalori_total) || 0;
      }
      return acc;
    },
    { protein: 0, lemak: 0, karbo: 0, kalori: 0 },
  );

  const completedMeals = items.filter((item) => item.status_konsumsi).length;
  const totalMeals = items.length;

  const calculatePercentage = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const progressPercentage = calculatePercentage(completedMeals, totalMeals);

  // Circumference for the SVG circle (r=42, 2 * pi * 42 = ~264)
  const circleCircumference = 264;
  const progressOffset =
    circleCircumference - (progressPercentage / 100) * circleCircumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
      {/* Target Progress */}
      <div className="md:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="relative size-[160px] flex items-center justify-center mb-4">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-gray-100 stroke-current"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              strokeWidth="8"
            ></circle>
            <circle
              className="text-primary transition-all duration-500 ease-in-out stroke-current"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              strokeDasharray={circleCircumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              strokeWidth="8"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">
              {completedMeals}/{totalMeals}
            </span>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Porsi
            </span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {completedMeals === totalMeals
            ? "Semua Target Terpenuhi"
            : "Target Harian"}
        </h3>
        <p className="text-sm text-gray-500 px-4">
          {completedMeals === totalMeals
            ? "Bagus sekali Bunda! Semua jadwal makan hari ini sudah selesai."
            : "Sedikit lagi untuk mencapai target harian anak Bunda."}
        </p>
      </div>

      {/* Macros */}
      <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Protein */}
        <div className="bg-red-50 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/60 rounded-lg text-rose-500">
              <span className="material-symbols-outlined text-[20px]">
                egg_alt
              </span>
            </div>
            <span className="font-semibold text-rose-800">Protein</span>
          </div>
          <div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(currentIntake.protein)}
              </span>
              <span className="text-sm text-gray-600 font-medium mb-1">
                / {Math.round(totalNutrisi.protein)}g
              </span>
            </div>
            <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(currentIntake.protein, totalNutrisi.protein)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lemak */}
        <div className="bg-yellow-50 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/60 rounded-lg text-amber-500">
              <span className="material-symbols-outlined text-[20px]">
                water_drop
              </span>
            </div>
            <span className="font-semibold text-amber-800">Lemak</span>
          </div>
          <div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(currentIntake.lemak)}
              </span>
              <span className="text-sm text-gray-600 font-medium mb-1">
                / {Math.round(totalNutrisi.lemak)}g
              </span>
            </div>
            <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(currentIntake.lemak, totalNutrisi.lemak)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Karbo */}
        <div className="bg-blue-50 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/60 rounded-lg text-blue-500">
              <span className="material-symbols-outlined text-[20px]">
                bakery_dining
              </span>
            </div>
            <span className="font-semibold text-blue-800">Karbo</span>
          </div>
          <div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(currentIntake.karbo)}
              </span>
              <span className="text-sm text-gray-600 font-medium mb-1">
                / {Math.round(totalNutrisi.karbo)}g
              </span>
            </div>
            <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(currentIntake.karbo, totalNutrisi.karbo)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Kalori */}
        <div className="bg-green-50 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/60 rounded-lg text-emerald-500">
              <span className="material-symbols-outlined text-[20px]">
                bolt
              </span>
            </div>
            <span className="font-semibold text-emerald-800">Kalori</span>
          </div>
          <div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(currentIntake.kalori)}
              </span>
              <span className="text-sm text-gray-600 font-medium mb-1">
                / {targetKalori > 0 ? targetKalori : Math.round(totalNutrisi.kalori)}
              </span>
            </div>
            <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${calculatePercentage(
                    currentIntake.kalori,
                    targetKalori > 0 ? targetKalori : totalNutrisi.kalori,
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
