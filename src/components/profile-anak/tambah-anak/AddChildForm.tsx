"use client";

import { useState } from "react";
import { CreateAnakRequest } from "@/lib/types/anak.types";
import { Contact, Activity, ArrowRight, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import PhotoUpload from "./PhotoUpload";

interface AddChildFormProps {
  onSubmit: (data: CreateAnakRequest, photoFile: File | null) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function AddChildForm({ onSubmit, isSubmitting, onCancel }: AddChildFormProps) {
  const [formData, setFormData] = useState<Partial<CreateAnakRequest>>({
    nama_anak: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    berat_badan_kg: undefined,
    tinggi_badan_cm: undefined,
    lingkar_lengan_atas_cm: undefined,
    lingkar_kepala_cm: undefined,
    catatan: "",
    status_aktif: true,
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_anak || !formData.jenis_kelamin || !formData.tanggal_lahir) {
      alert("Mohon lengkapi data wajib (Nama, Jenis Kelamin, Tanggal Lahir).");
      return;
    }
    
    const requestData: CreateAnakRequest = {
      nama_anak: formData.nama_anak,
      jenis_kelamin: formData.jenis_kelamin,
      tanggal_lahir: formData.tanggal_lahir,
      berat_badan_kg: Number(formData.berat_badan_kg) || 0,
      tinggi_badan_cm: Number(formData.tinggi_badan_cm) || 0,
      lingkar_lengan_atas_cm: Number(formData.lingkar_lengan_atas_cm) || 0,
      lingkar_kepala_cm: Number(formData.lingkar_kepala_cm) || 0,
      catatan: formData.catatan || "",
      status_aktif: formData.status_aktif ?? true,
    };

    onSubmit(requestData, photo);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Photo Upload Area */}
        <div className="lg:col-span-4">
           <PhotoUpload onPhotoSelected={(f) => setPhoto(f)} />
        </div>

        {/* Form Fields Area */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Identitas Utama */}
          <section>
            <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2.5">
              <span className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                <Contact className="size-5" />
              </span>
              Identitas Utama
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="childName">
                  Nama Lengkap Anak <span className="text-red-500">*</span>
                </label>
                <input 
                  id="childName" 
                  type="text" 
                  required
                  value={formData.nama_anak}
                  onChange={(e) => setFormData({ ...formData, nama_anak: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary py-3.5 px-4 shadow-sm transition-shadow hover:border-slate-300" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="gender" 
                        className="peer sr-only" 
                        required
                        checked={formData.jenis_kelamin === "L"}
                        onChange={() => setFormData({ ...formData, jenis_kelamin: "L" })}
                      />
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-sm font-medium text-slate-600 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all group-hover:border-slate-300">
                         Laki-laki
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="gender" 
                        className="peer sr-only" 
                        required
                        checked={formData.jenis_kelamin === "P"}
                        onChange={() => setFormData({ ...formData, jenis_kelamin: "P" })}
                      />
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-sm font-medium text-slate-600 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all group-hover:border-slate-300">
                         Perempuan
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="birthDate">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="birthDate" 
                    type="date" 
                    required
                    value={formData.tanggal_lahir}
                    onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                    className="w-full rounded-xl border-slate-200 bg-white text-slate-900 focus:border-primary focus:ring-primary py-3.5 px-4 shadow-sm transition-shadow hover:border-slate-300"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Data Pertumbuhan Awal */}
          <section>
            <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2.5">
              <span className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                <Activity className="size-5" />
              </span>
              Data Pertumbuhan Awal
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="weight">Berat Badan</label>
                <div className="relative group">
                  <input 
                    id="weight" 
                    type="number" 
                    step="0.1" 
                    placeholder="0.0"
                    value={formData.berat_badan_kg || ""}
                    onChange={(e) => setFormData({ ...formData, berat_badan_kg: parseFloat(e.target.value) })}
                    className="w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary py-3.5 pl-4 pr-12 shadow-sm transition-shadow hover:border-slate-300" 
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-semibold text-slate-400 group-focus-within:text-primary">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="height">Tinggi Badan</label>
                <div className="relative group">
                  <input 
                    id="height" 
                    type="number" 
                    step="0.1" 
                    placeholder="0.0"
                    value={formData.tinggi_badan_cm || ""}
                    onChange={(e) => setFormData({ ...formData, tinggi_badan_cm: parseFloat(e.target.value) })}
                    className="w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary py-3.5 pl-4 pr-12 shadow-sm transition-shadow hover:border-slate-300" 
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-semibold text-slate-400 group-focus-within:text-primary">cm</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="arm">Lingkar Lengan</label>
                <div className="relative group">
                  <input 
                    id="arm" 
                    type="number" 
                    step="0.1" 
                    placeholder="0.0"
                    value={formData.lingkar_lengan_atas_cm || ""}
                    onChange={(e) => setFormData({ ...formData, lingkar_lengan_atas_cm: parseFloat(e.target.value) })}
                    className="w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary py-3.5 pl-4 pr-12 shadow-sm transition-shadow hover:border-slate-300" 
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-semibold text-slate-400 group-focus-within:text-primary">cm</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="head">Lingkar Kepala</label>
                <div className="relative group">
                  <input 
                    id="head" 
                    type="number" 
                    step="0.1" 
                    placeholder="0.0"
                    value={formData.lingkar_kepala_cm || ""}
                    onChange={(e) => setFormData({ ...formData, lingkar_kepala_cm: parseFloat(e.target.value) })}
                    className="w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary py-3.5 pl-4 pr-12 shadow-sm transition-shadow hover:border-slate-300" 
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-semibold text-slate-400 group-focus-within:text-primary">cm</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="notes">Catatan Tambahan (Opsional)</label>
              <textarea 
                id="notes" 
                rows={3} 
                placeholder="Tulis catatan kesehatan atau kondisi khusus anak..."
                value={formData.catatan}
                onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                className="w-full rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary py-3 px-4 shadow-sm resize-none transition-shadow hover:border-slate-300"
              ></textarea>
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-5 rounded-xl border border-slate-100">
               <div>
                  <span className="block text-sm font-bold text-slate-800">Status Aktif</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Aktifkan untuk mulai memantau tumbuh kembang</span>
               </div>
               <Switch 
                 checked={formData.status_aktif} 
                 onCheckedChange={(c) => setFormData({ ...formData, status_aktif: c })}
               />
            </div>
          </section>

        </div>
      </div>

      {/* Footer Area with Buttons */}
      <div className="bg-slate-50 px-8 md:px-12 py-6 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-end items-center gap-4">
          <button 
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-3.5 rounded-full text-slate-500 font-medium text-sm hover:text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
              Batalkan
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3.5 bg-primary hover:bg-emerald-500 text-white font-bold rounded-full shadow-lg shadow-primary/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <span>Simpan & Analisis</span>
                <ArrowRight className="size-5" />
              </>
            )}
          </button>
      </div>

    </form>
  );
}
