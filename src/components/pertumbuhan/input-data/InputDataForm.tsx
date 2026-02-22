"use client";

import { useState, useEffect } from "react";
import { useAnak } from "@/contexts/AnakContext";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import { CreateGrowthRequest } from "@/lib/types/pertumbuhan.types";

interface InputDataFormProps {
  onSuccess?: () => void;
}

export default function InputDataForm({ onSuccess }: InputDataFormProps) {
  const { selectedAnak } = useAnak();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [weight, setWeight] = useState(12.8);
  const [height, setHeight] = useState(89.5);
  const [head, setHead] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hitungUmur = (tglLahir: string) => {
    const start = new Date(tglLahir);
    const end = new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    return `${diffMonths} Bulan`;
  };

  const anakName = selectedAnak?.nama_anak || "Pilih Anak";
  const anakAge = selectedAnak?.tanggal_lahir ? hitungUmur(selectedAnak.tanggal_lahir) : "-";
  const avatarUrl = selectedAnak?.foto_profil || "https://lh3.googleusercontent.com/aida-public/AB6AXuD5B_5UA_fCPTmxCcd_oF64OuVlBch11g7ACe3KAqPpvqWxBQKPoBmZgAAa4rDMz16j4eR93MGsHeUUzwHFvWqP4kykgy924erKNYGT8zmU8e5HrcUdddAnrD0GibDioDpc1nwGTvdYweo00IpazV9ZOtlg-2qOOz-cWACydNkUY-cVUnM7GtNS0lBl615xEGERU9jXwlW6YIbke2DsJuiM2M5oBstpTFpOHw5L2K_ZhudS-OP2InJqb6-Z9x3rBliFlz1_HG61D3U";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnak) {
      setError("Silakan pilih anak terlebih dahulu.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const requestData: CreateGrowthRequest = {
        berat_badan_kg: Number(weight),
        tinggi_badan_cm: Number(height),
        lingkar_kepala_cm: head ? Number(head) : 0,
        lingkar_lengan_atas_cm: 0,
        catatan: `Tanggal pengukuran: ${date}`,
      };

      await pertumbuhanService.createGrowth(selectedAnak.anak_id, requestData);
      setSuccess(true);
      if (onSuccess) onSuccess();
      // Reset form or redirect
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan data pertumbuhan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
      {/* Child Information */}
      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
        <div className="flex items-center gap-3">
          <img
            alt={anakName}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
            src={avatarUrl}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(anakName)}&background=14B8A6&color=fff`;
            }}
          />
          <div>
            <h3 className="font-[var(--font-display)] font-bold text-gray-800">{anakName}</h3>
            <p className="text-xs text-gray-500">{anakAge}</p>
          </div>
        </div>
        <button className="text-sm font-semibold text-primary hover:text-emerald-700" type="button">
          Ganti Anak
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 rounded-xl bg-green-50 text-green-600 text-sm border border-green-200">
          Data pertumbuhan berhasil disimpan!
        </div>
      )}

      {/* Date Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="date">
          Tanggal Pengukuran
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">
            calendar_today
          </span>
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Weight Input */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="block text-sm font-bold text-gray-700" htmlFor="weight">
            Berat Badan (kg)
          </label>
          <div className="bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
            <span className="text-orange-600 font-bold text-lg">{weight}</span>{" "}
            <span className="text-xs text-orange-500">kg</span>
          </div>
        </div>
        <div className="relative">
          <input
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
            max="25"
            min="5"
            step="0.1"
            type="range"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5 kg</span>
            <span>15 kg</span>
            <span>25 kg</span>
          </div>
        </div>
      </div>

      {/* Height Input */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="block text-sm font-bold text-gray-700" htmlFor="height">
            Tinggi Badan (cm)
          </label>
          <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
            <span className="text-blue-600 font-bold text-lg">{height}</span>{" "}
            <span className="text-xs text-blue-500">cm</span>
          </div>
        </div>
        <div className="relative">
          <input
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
            max="120"
            min="60"
            step="0.5"
            type="range"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>60 cm</span>
            <span>90 cm</span>
            <span>120 cm</span>
          </div>
        </div>
      </div>

      {/* Head Circumference Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="head">
          Lingkar Kepala (cm)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">
            face
          </span>
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            id="head"
            placeholder="Contoh: 48.5"
            step="0.1"
            type="number"
            value={head}
            onChange={(e) => setHead(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
          disabled={isLoading || !selectedAnak}
        >
          {isLoading ? (
            <span className="animate-pulse">Menyimpan...</span>
          ) : (
            <>
              <span className="material-symbols-outlined">analytics</span>
              Simpan &amp; Analisis
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          Data akan diproses menggunakan standar WHO Child Growth Standards
        </p>
      </div>
    </form>
  );
}
