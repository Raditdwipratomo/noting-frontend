"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAnak } from "@/contexts/AnakContext";
import { giziService } from "@/lib/api/services/gizi.service";
import { RekomendasiHarian } from "@/lib/types/gizi.types";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DailyNutritionSummary from "@/components/rencana-makan/DailyNutritionSummary";
import DailyMealSchedule from "@/components/rencana-makan/DailyMealSchedule";
import Link from "next/link";
import { ChevronRight, Calendar, Loader2 } from "lucide-react";

export default function RencanaMakanHarianPage() {
  const { hariKe } = useParams();
  const { selectedAnakId } = useAnak();
  const [rekomendasi, setRekomendasi] = useState<RekomendasiHarian | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("rekomendasi", rekomendasi)

  const fetchRekomendasi = async () => {
    if (!selectedAnakId || !hariKe) return;
    setLoading(true);
    setError(null);
    try {
      const data = await giziService.getDailyRecommendation(
        selectedAnakId,
        Number(hariKe)
      );
      setRekomendasi(data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat rekomendasi harian");
      setRekomendasi(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRekomendasi();
  }, [selectedAnakId, hariKe]);

  // Use dummy target macros for now or fetch from active plan if required
  // Because RekomendasiHarian doesn't hold target macros directly, 
  // we could just hardcode defaults or pass it from progress if needed.
  // The API getDailyRecommendation only returns the meal details.
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Hari Ini";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full pt-20 max-w-screen bg-white shadow-2xl overflow-hidden border border-gray-200 min-h-screen flex flex-col">
      <DashboardHeader activePage="/rencana-makan" />

      <main className="flex-grow w-full bg-gray-50 overflow-y-auto hide-scroll">
        <div className="max-w-screen mx-auto px-6 py-8">
          
       

          <div className="mb-8">
            <h1 className="text-3xl font-[var(--font-display)] font-bold text-gray-900 mb-2">
              Rekomendasi Nutrisi Harian
            </h1>
            <p className="text-gray-500 flex items-center gap-2">
              <Calendar className="text-primary size-5" />
              {rekomendasi ? formatDate(rekomendasi.tanggal) : "Memuat..."}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="size-10 animate-spin text-primary mb-4" />
              <p className="text-gray-500">Memuat data rekomendasi nutrisi...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
              <p>{error}</p>
              <button 
                onClick={fetchRekomendasi} 
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-semibold transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : rekomendasi ? (
            <>
              <DailyNutritionSummary rekomendasi={rekomendasi} />
              <DailyMealSchedule 
                anakId={selectedAnakId!} 
                meals={rekomendasi.detail_makanan_harian} 
                onStatusUpdate={fetchRekomendasi}
              />
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Data tidak ditemukan.
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
