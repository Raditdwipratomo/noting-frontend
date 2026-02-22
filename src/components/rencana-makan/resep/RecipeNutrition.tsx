"use client";

import { Utensils as LocalDining, Info as InfoOutlined } from "lucide-react";
import { NutrisiMakananData } from "@/lib/types/gizi.types";

interface RecipeNutritionProps {
  nutrisi?: NutrisiMakananData | null;
  targetKalori?: number;
  catatanKhusus?: string;
}

export default function RecipeNutrition({ nutrisi, targetKalori, catatanKhusus }: RecipeNutritionProps) {
  if (!nutrisi) return null;

  return (
    <div className="w-full lg:w-[35%] flex flex-col gap-6">
      <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-[#e7f3f0]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Nutrisi per Porsi</h3>
          <div className="p-2 bg-green-50 rounded-full">
            <LocalDining className="text-green-600" fontSize="small" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <span className="text-5xl font-black text-slate-900 tracking-tighter">
            {nutrisi.kalori_total || targetKalori || 0}
          </span>
          <span className="text-slate-500 font-medium ml-1">kkal</span>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Protein</span>
              <span className="text-primary">{nutrisi.protein_gram}g</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${Math.min((nutrisi.protein_gram / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Karbohidrat</span>
              <span className="text-blue-400">{nutrisi.karbohidrat_gram}g</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div 
                className="bg-blue-400 h-2.5 rounded-full" 
                style={{ width: `${Math.min((nutrisi.karbohidrat_gram / 150) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Lemak</span>
              <span className="text-yellow-400">{nutrisi.lemak_gram}g</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div 
                className="bg-yellow-400 h-2.5 rounded-full" 
                style={{ width: `${Math.min((nutrisi.lemak_gram / 40) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 rounded-[2rem] p-6 lg:p-8 border border-primary/20 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full"></div>
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-primary rounded-full text-white shadow-sm">
            <InfoOutlined fontSize="small" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Catatan Masak</h3>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed relative z-10 font-medium">
          {catatanKhusus || "Pastikan tekstur makanan disesuaikan dengan kemampuan mengunyah anak berdasarkan usianya."}
        </p>
      </div>

      {/* Resep Serupa - Placeholder for now */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Kandungan Mikro</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm border border-transparent hover:border-primary/30 transition-all cursor-pointer group">
            <span className="font-bold text-slate-700 text-sm">Kalsium</span>
            <span className="text-sm text-slate-500 font-medium">{nutrisi.kalsium_mg || 0} mg</span>
          </div>
          <div className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm border border-transparent hover:border-primary/30 transition-all cursor-pointer group">
            <span className="font-bold text-slate-700 text-sm">Zat Besi</span>
            <span className="text-sm text-slate-500 font-medium">{nutrisi.zat_besi_mg || 0} mg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
