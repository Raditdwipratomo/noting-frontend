"use client";

import { useState } from "react";
import { Clock as Schedule, CheckCircle as Verified, Heart as Favorite, ImagePlus, Loader2 } from "lucide-react";

import { giziService } from "@/lib/api/services/gizi.service";
import { DetailMakananHarian } from "@/lib/types/gizi.types";
import { useAnak } from "@/contexts/AnakContext";
import { cn } from "@/lib/utils";

interface RecipeHeaderProps {
  detailMakanan: DetailMakananHarian;
  onImageUpdated: (newUrl: string) => void;
}

export default function RecipeHeader({ detailMakanan, onImageUpdated }: RecipeHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { selectedAnak } = useAnak();
  const resep = detailMakanan.resep_makanan;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedAnak) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar (Maksimal 5MB)");
      return;
    }

    try {
      setIsUploading(true);
      const res = await giziService.uploadFoodImage(selectedAnak.anak_id, detailMakanan.id_detail, file);
      alert("Gambar berhasil diupload!");
      onImageUpdated(res.gambar_url);
    } catch (error: any) {
      alert(error.message || "Gagal mengupload gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:5000";
  const displayImage = detailMakanan.gambar_url 
    ? (detailMakanan.gambar_url.startsWith('http') ? detailMakanan.gambar_url : API_URL + detailMakanan.gambar_url)
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuAj6FEjEZJb4rWi8BLt4aZ0sMZzuS8W_pqiWi1VZgvLhE3KuvfnQQ5jZFSkU6M9yeg5MuQlD4NAQiWkYpo3jeQyGYHPpgp9T80YN0t43ixe9z3iJKX2FIZLJySloDozELx7DOsVScQdsQtIq-QL1eO_Rk2eQVd_ENnoLUwBCC9oXOFmgD4t43NtjfgCq7-jd9mipDEiXzCFPT1WDV9wNgICTcs0zZE2oJr8zZPiNsonyOa4ry0MX6X8kez8PoeEJuRumx8J1SbjJGs"; // Placeholder dari resep.html

  return (
    <div className="w-full lg:w-[65%] flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <Schedule fontSize="small" />
              {resep?.waktu_persiapan && resep?.waktu_memasak 
                ? `${resep.waktu_persiapan + resep.waktu_memasak} Mnt` 
                : "30 Mnt"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
              <Verified fontSize="small" />
              Mudah
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            {detailMakanan.nama_makanan}
          </h1>
          <p className="text-primary text-lg max-w-2xl font-medium">
            Resep sajian sehat spesifik untuk {detailMakanan.waktu_makan.replace("_", " ")} untuk mendukung pertumbuhan si kecil.
          </p>
        </div>

        {/* Image Container */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-sm relative group bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 z-10"></div>
          
          <img 
            alt={detailMakanan.nama_makanan} 
            src={displayImage}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Favorit Icon */}
          <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur text-slate-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-20">
            <Favorite className="text-red-500" />
          </button>

          {/* Upload Button */}
          <div className="absolute top-6 right-6 z-20">
            <input 
              type="file" 
              id="upload-food-image" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            <label 
              htmlFor="upload-food-image" 
              className={cn(
                "flex items-center gap-2 bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full shadow-lg transition-transform cursor-pointer border hover:scale-105",
                isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              {isUploading ? <Loader2 className="animate-spin" fontSize="small" /> : <ImagePlus fontSize="small" className="text-primary" />}
              <span className="text-sm font-bold">{isUploading ? 'Mengunggah...' : 'Ubah Foto AI'}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
