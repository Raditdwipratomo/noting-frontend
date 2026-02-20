"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2, Cake, User, Droplets, Baby } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { cn } from "@/lib/utils";

function getAgeText(tanggalLahir: string): string {
  const birth = new Date(tanggalLahir);
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const birthStr = birth.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (years > 0 && remainingMonths > 0) {
    return `${birthStr} (${years} Thn ${remainingMonths} Bln)`;
  }
  if (years > 0) return `${birthStr} (${years} Tahun)`;
  return `${birthStr} (${months} Bulan)`;
}

export default function ProfileHeader() {
  const { selectedAnak } = useAnak();

  if (!selectedAnak) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex items-center justify-center text-slate-400">
        Memuat profil anak...
      </div>
    );
  }

  const {
    nama_anak,
    tanggal_lahir,
    jenis_kelamin,
    foto_profil,
    status_aktif,
  } = selectedAnak;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
        <div className="relative w-40 h-40 shrink-0">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse"></div>
          {foto_profil ? (
            <Avatar className="w-36 h-36 rounded-full border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AvatarImage
                src={foto_profil}
                alt={`Foto ${nama_anak}`}
                className="object-cover"
              />
              <AvatarFallback>{nama_anak.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-36 h-36 rounded-full bg-primary/10 border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <Baby size={48} className="text-primary/50" />
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-100">
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                status_aktif ? "bg-emerald-500" : "bg-amber-500"
              )}
            ></span>
            <span
              className={cn(
                "text-xs font-bold",
                status_aktif ? "text-emerald-600" : "text-amber-600"
              )}
            >
              {status_aktif ? "Aktif" : "Nonaktif"}
            </span>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h1 className="font-[var(--font-display)] font-bold text-3xl text-slate-800">
              {nama_anak}
            </h1>
            <Button
              variant="secondary"
              className="mt-3 md:mt-0 font-semibold rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profil
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Cake className="w-4 h-4" /> {getAgeText(tanggal_lahir)}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />{" "}
              {jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1 text-slate-400 italic">
              <Droplets className="w-4 h-4" /> Golongan darah belum diatur
            </span>
          </div>
          {/* Note: The bio text isn't in the DB schema, so we provide a generic positive default or hide it mostly. */}
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            Catatan kesehatan dan rekam medis {nama_anak} tersimpan dengan aman. 
            Pastikan untuk rutin mencatat pertumbuhan setiap bulan.
          </p>
        </div>
      </div>
    </div>
  );
}
