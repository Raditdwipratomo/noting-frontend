"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { giziService } from "@/lib/api/services/gizi.service";
import { useAnak } from "@/contexts/AnakContext";
import { DetailMakananHarian } from "@/lib/types/gizi.types";
import { Loader2, ArrowLeft } from "lucide-react";

import RecipeHeader from "@/components/rencana-makan/resep/RecipeHeader";
import RecipeIngredients from "@/components/rencana-makan/resep/RecipeIngredients";
import RecipeInstructions from "@/components/rencana-makan/resep/RecipeInstructions";
import RecipeNutrition from "@/components/rencana-makan/resep/RecipeNutrition";

export default function RecipeDetailPage() {
  const { detailId } = useParams();
  const router = useRouter();
  const { selectedAnak } = useAnak();
  
  const [detail, setDetail] = useState<DetailMakananHarian | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedAnak || !detailId) return;
      try {
        setLoading(true);
        const data = await giziService.getDetailMakanan(selectedAnak.anak_id, Number(detailId));
        setDetail(data);
      } catch (error: any) {
        alert(error.message || "Gagal memuat resep makanan");
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [selectedAnak, detailId]);

  if (loading || !selectedAnak) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[500px]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="text-center py-20 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-800">Resep tidak ditemukan</h2>
        <button 
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 bg-primary text-slate-900 font-bold rounded-full"
        >
          Kembali
        </button>
      </div>
    );
  }

  const handleImageUpdated = (newUrl: string) => {
    setDetail(prev => prev ? { ...prev, gambar_url: newUrl } : null);
  };

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 relative">
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm w-fit"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Jadwal
      </button>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          <RecipeHeader detailMakanan={detail} onImageUpdated={handleImageUpdated} />
          
          <div className="grid md:grid-cols-2 gap-10 mt-2">
            <RecipeIngredients bahanBahan={detail.resep_makanan?.bahan_bahan} />
            <RecipeInstructions langkahPembuatan={detail.resep_makanan?.langkah_pembuatan} />
          </div>
        </div>

        <RecipeNutrition 
          nutrisi={detail.nutrisi_makanan} 
          targetKalori={detail.target_kalori} 
        />
      </div>
    </main>
  );
}
