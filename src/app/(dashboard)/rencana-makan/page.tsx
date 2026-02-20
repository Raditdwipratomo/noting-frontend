"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WeeklyOverview from "@/components/rencana-makan/WeeklyOverview";
import DailyPlanCard from "@/components/rencana-makan/DailyPlanCard";
import WeeklySummary from "@/components/rencana-makan/WeeklySummary";
import { DailyPlanStatus } from "@/components/rencana-makan/DailyPlanCard";

const dailyPlans = [
  {
    dayName: "Hari 1 - Senin",
    dayNumber: "14",
    dayShort: "Sen",
    status: "Selesai" as DailyPlanStatus,
    progressText: "7/7 Selesai",
    progressPercentage: 100,
  },
  {
    dayName: "Hari 2 - Selasa",
    dayNumber: "15",
    dayShort: "Sel",
    status: "Aktif" as DailyPlanStatus,
    progressText: "5/7 Sedang Berjalan",
    progressPercentage: 71,
    isToday: true,
  },
  {
    dayName: "Hari 3 - Rabu",
    dayNumber: "16",
    dayShort: "Rab",
    status: "Belum Dimulai" as DailyPlanStatus,
    progressText: "0/7 Selesai",
    progressPercentage: 0,
  },
  {
    dayName: "Hari 4 - Kamis",
    dayNumber: "17",
    dayShort: "Kam",
    status: "Belum Dimulai" as DailyPlanStatus,
    progressText: "0/7 Selesai",
    progressPercentage: 0,
  },
  {
    dayName: "Hari 5 - Jumat",
    dayNumber: "18",
    dayShort: "Jum",
    status: "Belum Dimulai" as DailyPlanStatus,
    progressText: "0/7 Selesai",
    progressPercentage: 0,
  },
  {
    dayName: "Hari 6 - Sabtu",
    dayNumber: "19",
    dayShort: "Sab",
    status: "Belum Dimulai" as DailyPlanStatus,
    progressText: "0/7 Selesai",
    progressPercentage: 0,
  },
  {
    dayName: "Hari 7 - Minggu",
    dayNumber: "20",
    dayShort: "Min",
    status: "Belum Dimulai" as DailyPlanStatus,
    progressText: "0/7 Selesai",
    progressPercentage: 0,
  },
];

export default function RencanaMakanPage() {
  return (
    <div className="w-full max-w-screen bg-white shadow-2xl overflow-hidden border border-gray-200 min-h-screen flex flex-col">
      <DashboardHeader activePage="/rencana-makan" />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-screen mx-auto px-6 py-10">
          <WeeklyOverview />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Daily Plan List */}
            <div className="lg:w-[65%] space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    calendar_view_day
                  </span>
                  Ikhtisar Mingguan
                </h2>
                <span className="text-sm font-medium text-slate-500">
                  24 dari 49 Menu Selesai
                </span>
              </div>
              <div className="space-y-4">
                {dailyPlans.map((plan, i) => (
                  <DailyPlanCard key={i} {...plan} />
                ))}
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:w-[35%] space-y-6">
              <WeeklySummary />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full px-6 py-12 border-t border-slate-100 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined filled">
                child_care
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-600">
              NutriStunting
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 NutriStunting. Membantu cegah stunting untuk masa depan
            Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}
