"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { alergiService } from "@/lib/api/services/alergi.service";
import type {
  AlergiResponse,
  JenisAlergi,
  TingkatKeparahan,
  CreateAlergiRequest,
} from "@/lib/types/alergi.types";

interface AlergiFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  alergiToEdit?: AlergiResponse | null;
}

export default function AlergiFormModal({
  isOpen,
  onClose,
  onSuccess,
  alergiToEdit,
}: AlergiFormModalProps) {
  const { selectedAnakId } = useAnak();
  const [loading, setLoading] = useState(false);

  // Form State
  const [namaAlergi, setNamaAlergi] = useState("");
  const [jenisAlergi, setJenisAlergi] = useState<JenisAlergi | "">("");
  const [tingkatKeparahan, setTingkatKeparahan] = useState<TingkatKeparahan | "">("");
  const [gejala, setGejala] = useState("");
  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (alergiToEdit) {
        setNamaAlergi(alergiToEdit.nama_alergi);
        setJenisAlergi(alergiToEdit.jenis_alergi);
        setTingkatKeparahan(alergiToEdit.tingkat_keparahan);
        setGejala(alergiToEdit.gejala);
        setCatatan(alergiToEdit.catatan || "");
      } else {
        // Reset form
        setNamaAlergi("");
        setJenisAlergi("");
        setTingkatKeparahan("");
        setGejala("");
        setCatatan("");
      }
    }
  }, [isOpen, alergiToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnakId) return;

    if (!namaAlergi || !jenisAlergi || !tingkatKeparahan || !gejala) {
      alert("Mohon lengkapi semua field yang wajib");
      return;
    }

    setLoading(true);
    try {
      const payload: CreateAlergiRequest = {
        nama_alergi: namaAlergi,
        jenis_alergi: jenisAlergi as JenisAlergi,
        tingkat_keparahan: tingkatKeparahan as TingkatKeparahan,
        gejala,
        catatan,
      };

      if (alergiToEdit) {
        await alergiService.update(selectedAnakId, alergiToEdit.id_alergi, payload);
      } else {
        await alergiService.create(selectedAnakId, payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save alergi:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[425px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {alergiToEdit ? "Edit Alergi" : "Tambah Alergi"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <label htmlFor="nama_alergi" className="text-sm font-medium leading-none">
              Nama Alergen <span className="text-red-500">*</span>
            </label>
            <input
              id="nama_alergi"
              className={inputClass}
              placeholder="Contoh: Susu Sapi, Kacang, Paracetamol"
              value={namaAlergi}
              onChange={(e) => setNamaAlergi(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="jenis_alergi" className="text-sm font-medium leading-none">
              Jenis Alergi <span className="text-red-500">*</span>
            </label>
            <select
              id="jenis_alergi"
              className={inputClass}
              value={jenisAlergi}
              onChange={(e) => setJenisAlergi(e.target.value as JenisAlergi)}
              disabled={loading}
              required
            >
              <option value="" disabled>Pilih jenis alergi</option>
              <option value="makanan">Makanan</option>
              <option value="obat">Obat-obatan</option>
              <option value="lingkungan">Lingkungan</option>
              <option value="serangga">Serangga</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tingkat_keparahan" className="text-sm font-medium leading-none">
              Tingkat Keparahan <span className="text-red-500">*</span>
            </label>
            <select
              id="tingkat_keparahan"
              className={inputClass}
              value={tingkatKeparahan}
              onChange={(e) => setTingkatKeparahan(e.target.value as TingkatKeparahan)}
              disabled={loading}
              required
            >
              <option value="" disabled>Pilih tingkat keparahan</option>
              <option value="ringan">Ringan</option>
              <option value="sedang">Sedang</option>
              <option value="berat">Berat</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="gejala" className="text-sm font-medium leading-none">
              Reaksi / Gejala <span className="text-red-500">*</span>
            </label>
            <textarea
              id="gejala"
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Contoh: Gatal-gatal, ruam merah, muntah"
              value={gejala}
              onChange={(e) => setGejala(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="catatan" className="text-sm font-medium leading-none">
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="catatan"
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tambahkan catatan khusus jika ada"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              disabled={loading}
            />
          </div>

          <SheetFooter className="pt-4 flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {alergiToEdit ? "Simpan Perubahan" : "Simpan Alergi"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
