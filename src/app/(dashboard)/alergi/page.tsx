"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AllergyItems, { AllergySeverity } from "@/components/alergi/AllergyItems";
import AllergySummary from "@/components/alergi/AllergySummary";
import { Plus, Fish, Egg, Milk } from "lucide-react";
import { Button } from "@/components/ui/button";

const allergyList = [
  {
    title: "Udang & Seafood",
    severity: "Berat" as AllergySeverity,
    reaction: "Sesak napas, bengkak pada wajah.",
    notes: "Hindari kontak silang alat makan di restoran seafood.",
    lastUpdated: "2 hari yang lalu",
    icon: <Fish className="w-7 h-7" />,
    colorTheme: "red" as const,
  },
  {
    title: "Telur Ayam",
    severity: "Sedang" as AllergySeverity,
    reaction: "Ruam merah gatal pada kulit sekitar mulut.",
    notes: "Muncul sekitar 30 menit setelah konsumsi.",
    lastUpdated: "1 minggu yang lalu",
    icon: <Egg className="w-7 h-7" />,
    colorTheme: "amber" as const,
  },
  {
    title: "Susu Sapi (Laktosa)",
    severity: "Ringan" as AllergySeverity,
    reaction: "Kembung dan diare ringan.",
    notes: "Gunakan susu bebas laktosa atau susu kedelai sebagai alternatif.",
    lastUpdated: "1 bulan yang lalu",
    icon: <Milk className="w-7 h-7" />,
    colorTheme: "blue" as const,
  },
];

export default function AlergiPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <DashboardHeader activePage="/alergi" />

      <main className="flex-grow w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-[65%] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Daftar Alergi
                </h1>
                <p className="text-slate-500 mt-1 text-sm">
                  Kelola daftar alergi dan intoleransi makanan si kecil.
                </p>
              </div>
              <Button className="flex items-center justify-center gap-2 px-5 py-6 rounded-xl font-bold shadow-sm group hover:scale-[1.02] hover:bg-teal-600 transition-all">
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Tambah Alergi</span>
              </Button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant="outline"
                className="rounded-lg text-sm font-medium border-primary text-primary hover:bg-primary/5"
              >
                Semua
              </Button>
              <Button
                variant="outline"
                className="rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Makanan
              </Button>
              <Button
                variant="outline"
                className="rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Obat-obatan
              </Button>
              <Button
                variant="outline"
                className="rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Lingkungan
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {allergyList.map((item, i) => (
                <AllergyItems key={i} {...item} />
              ))}
            </div>
          </section>

          <section className="w-full lg:w-[35%] flex flex-col gap-6">
            <AllergySummary />
          </section>
        </div>
      </main>
    </div>
  );
}
