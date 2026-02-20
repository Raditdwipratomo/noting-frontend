"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Cake, User, Droplets } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
        <div className="relative w-40 h-40 shrink-0">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse"></div>
          <Avatar className="w-36 h-36 rounded-full border-4 border-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AvatarImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5B_5UA_fCPTmxCcd_oF64OuVlBch11g7ACe3KAqPpvqWxBQKPoBmZgAAa4rDMz16j4eR93MGsHeUUzwHFvWqP4kykgy924erKNYGT8zmU8e5HrcUdddAnrD0GibDioDpc1nwGTvdYweo00IpazV9ZOtlg-2qOOz-cWACydNkUY-cVUnM7GtNS0lBl615xEGERU9jXwlW6YIbke2DsJuiM2M5oBstpTFpOHw5L2K_ZhudS-OP2InJqb6-Z9x3rBliFlz1_HG61D3U"
              alt="Foto Budi"
              className="object-cover"
            />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-100">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-bold text-emerald-600">Normal</span>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h1 className="font-[var(--font-display)] font-bold text-3xl text-slate-800">
              Budi Santoso
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
              <Cake className="w-4 h-4" /> 12 Mei 2021 (2 Thn 4 Bln)
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> Laki-laki
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Droplets className="w-4 h-4" /> Golongan Darah O
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            Budi anak yang aktif dan ceria. Suka bermain bola dan memiliki nafsu
            makan yang baik. Tidak ada riwayat penyakit serius dalam 6 bulan
            terakhir.
          </p>
        </div>
      </div>
    </div>
  );
}
