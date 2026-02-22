"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnak } from "@/contexts/AnakContext";
import { alergiService } from "@/lib/api/services/alergi.service";
import type { AlergiResponse } from "@/lib/types/alergi.types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const severityConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  berat: { bg: "bg-red-50 border-red-100", text: "text-red-700", dot: "bg-red-500", label: "(Tinggi)" },
  sedang: { bg: "bg-orange-50 border-orange-100", text: "text-orange-700", dot: "bg-orange-500", label: "(Sedang)" },
  ringan: { bg: "bg-blue-50 border-blue-100", text: "text-blue-700", dot: "bg-blue-500", label: "(Rendah)" },
};

export default function AllergyList() {
  const { selectedAnakId } = useAnak();
  const [allergies, setAllergies] = useState<AlergiResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;
    let cancelled = false;

    const fetchAllergies = async () => {
      setLoading(true);
      try {
        const data = await alergiService.getAll(selectedAnakId);
        if (!cancelled) setAllergies(data);
      } catch (err) {
        console.error("AllergyList fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAllergies();
    return () => { cancelled = true; };
  }, [selectedAnakId]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-slate-800 flex items-center gap-2">
          <AlertCircle className="text-secondary w-5 h-5" />
          Daftar Alergi & Pantangan
        </h3>
        <Link href="/alergi">
          <Button variant="ghost" className="text-primary hover:text-teal-600 text-sm font-semibold hover:bg-transparent px-2">
            <Plus className="w-4 h-4 mr-1" />
            Kelola
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        {loading && (
          <div className="flex items-center gap-2 w-full py-2 justify-center">
            <Loader2 size={16} className="animate-spin text-gray-400" />
            <span className="text-sm text-gray-400">Memuat alergi...</span>
          </div>
        )}

        {!loading && allergies.length === 0 && (
          <div className="w-full text-center py-4 text-sm text-slate-400 italic border border-dashed rounded-xl">
            Tidak ada riwayat alergi yang tercatat.
          </div>
        )}

        {!loading &&
          allergies.map((alergi) => {
            const config = severityConfig[alergi.tingkat_keparahan] || severityConfig.ringan;
            return (
              <div
                key={alergi.id_alergi}
                className={cn("flex items-center gap-2 px-4 py-2 border rounded-xl", config.bg)}
              >
                <span className={cn("w-2 h-2 rounded-full", config.dot)}></span>
                <span className={cn("text-sm font-bold", config.text)}>
                  {alergi.nama_alergen}
                </span>
                <span className={cn("text-xs ml-1 opacity-70", config.text)}>
                  {config.label}
                </span>
              </div>
            );
          })}
        
        {/* Tambah link shortcut */}
        {!loading && (
          <Link href="/alergi">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-400 cursor-pointer hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">
              <span className="text-sm font-medium">Tambah...</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
