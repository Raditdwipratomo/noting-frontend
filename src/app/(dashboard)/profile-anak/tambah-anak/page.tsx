"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateAnakRequest } from "@/lib/types/anak.types";
import { anakService } from "@/lib/api/services/anak.service";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AddChildForm from "@/components/profile-anak/tambah-anak/AddChildForm";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function TambahAnakPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CreateAnakRequest, photoFile: File | null) => {
    setIsSubmitting(true);
    try {
      // In a real scenario with cloud storage, we would first upload the photoFile,
      // get the URL, and attach it to data.foto_profil. For now, we submit the raw data.
      await anakService.createAnak(data);
      alert("Data anak berhasil disimpan dan dianalisis!");
      router.push("/profile-anak");
    } catch (error: any) {
      alert(error.message || "Gagal menyimpan data anak.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="bg-[#FDFDFD] font-display text-slate-800 min-h-screen flex flex-col">
      <DashboardHeader activePage="/profile-anak" />

      <main className="flex-grow flex items-start justify-center py-12 px-4 overflow-y-auto">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          <div className="bg-white px-8 md:px-12 py-8 border-b border-slate-50">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Tambah Anak Baru</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-lg leading-relaxed">
                  Lengkapi data identitas dan pengukuran awal untuk mendapatkan rekomendasi nutrisi yang tepat bagi buah hati Anda.
                </p>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100 self-start md:self-auto">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-100">
                  <div className="size-6 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">1</div>
                  <span className="text-xs font-semibold text-slate-900">Identitas</span>
                </div>
                <div className="w-8 h-px bg-slate-200"></div>
                <div className="flex items-center gap-2 px-3 py-1.5 opacity-60 grayscale">
                  <div className="size-6 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs">2</div>
                  <span className="text-xs font-medium text-slate-500">Data Awal</span>
                </div>
              </div>
            </div>
          </div>

          <AddChildForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            onCancel={handleCancel}
          />

        </div>
      </main>
    </div>
  );
}
