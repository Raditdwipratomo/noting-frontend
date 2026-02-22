"use client";

import { useEffect, useState } from "react";
import { useAnak } from "@/contexts/AnakContext";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import { PertumbuhanResponse } from "@/lib/types/pertumbuhan.types";

interface InputDataSidebarProps {
  refreshTrigger?: number;
}

export default function InputDataSidebar({ refreshTrigger = 0 }: InputDataSidebarProps) {
  const { selectedAnak } = useAnak();
  const [latestData, setLatestData] = useState<PertumbuhanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnak) {
      setLatestData(null);
      return;
    }

    const fetchLatestData = async () => {
      setIsLoading(true);
      try {
        const data = await pertumbuhanService.getLatestGrowth(selectedAnak.anak_id);
        setLatestData(data);
      } catch (error) {
        console.error("Failed to fetch latest growth data", error);
        setLatestData(null); // Clear or keep old?
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestData();
  }, [selectedAnak, refreshTrigger]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800 mb-1">
          Data Terakhir
        </h3>
        <p className="text-xs text-gray-500">
          {latestData?.tanggal_pencatatan
            ? `Pengukuran terakhir (${formatDate(latestData.tanggal_pencatatan)})`
            : "Belum ada data pengukuran"}
        </p>
      </div>

      <div className="space-y-4">
        {/* Berat Badan Card */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Berat Badan
              </p>
              <p className="text-2xl font-[var(--font-display)] font-bold text-gray-800">
                {latestData?.berat_badan_kg ? Number(latestData.berat_badan_kg).toFixed(1) : "-"} <span className="text-sm font-normal text-gray-500">kg</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
              <span className="material-symbols-outlined">monitor_weight</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            {latestData?.kategori ? (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">
                {latestData.kategori}
              </span>
            ) : (
              <span className="text-gray-400 italic">Tidak tersedia</span>
            )}
          </div>
        </div>

        {/* Tinggi Badan Card */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Tinggi Badan
              </p>
              <p className="text-2xl font-[var(--font-display)] font-bold text-gray-800">
                {latestData?.tinggi_badan_cm ? Number(latestData.tinggi_badan_cm).toFixed(1) : "-"} <span className="text-sm font-normal text-gray-500">cm</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shadow-sm">
              <span className="material-symbols-outlined">height</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            {latestData?.kategori ? (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">
                {latestData.kategori}
              </span>
            ) : (
              <span className="text-gray-400 italic">Tidak tersedia</span>
            )}
          </div>
        </div>

        {/* Lingkar Kepala Card */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Lingkar Kepala
              </p>
              <p className="text-2xl font-[var(--font-display)] font-bold text-gray-800">
                {latestData?.lingkar_kepala_cm ? Number(latestData.lingkar_kepala_cm).toFixed(1) : "-"} <span className="text-sm font-normal text-gray-500">cm</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 shadow-sm">
              <span className="material-symbols-outlined">face</span>
            </div>
          </div>
          {/* Note: Currently API response might not have Z-score for HC, let's keep it simple */}
        </div>

        {/* Lingkar Lengan Atas Card */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Lingkar Lengan Atas
              </p>
              <p className="text-2xl font-[var(--font-display)] font-bold text-gray-800">
                {latestData?.lingkar_lengan_atas_cm ? Number(latestData.lingkar_lengan_atas_cm).toFixed(1) : "-"} <span className="text-sm font-normal text-gray-500">cm</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 shadow-sm">
              <span className="material-symbols-outlined">straighten</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-yellow-600">lightbulb</span>
            <div>
              <h4 className="font-bold text-sm text-gray-800">Tips Pengukuran</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Pastikan anak tidak menggunakan sepatu saat mengukur tinggi badan dan pakaian seminimal mungkin saat menimbang berat badan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 text-center text-xs text-gray-400">
          Memuat data...
        </div>
      )}
    </>
  );
}
