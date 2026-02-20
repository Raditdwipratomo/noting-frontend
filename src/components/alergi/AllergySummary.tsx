"use client";

import { AlertCircle, Download, Lightbulb, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AllergySummary() {
  return (
    <div className="sticky top-28 flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-[#fbfdfc]">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="text-primary w-6 h-6" />
            Ringkasan Alergi
          </h2>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-slate-800">3</span>
              <span className="text-sm text-slate-500">Alergi Tercatat</span>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-bold text-red-500">1</span>
              <span className="text-sm text-slate-500">Tingkat Berat</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
              Pemicu Umum
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium"
              >
                Seafood
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium"
              >
                Protein Hewani
              </Badge>
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium"
              >
                Produk Susu
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full py-6 rounded-xl border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Unduh Kartu Alergi
          </Button>
        </div>
      </div>

      <div className="bg-primary/10 rounded-xl p-6 border border-primary/20 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-primary w-5 h-5" />
            <h3 className="font-bold text-primary">Tips Nutrisi</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Selalu cek label kemasan makanan untuk "Mungkin mengandung..." atau
            "Diproses di pabrik yang sama dengan..." untuk mencegah kontaminasi
            silang alergen.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mt-2">
        <HelpCircle className="w-4 h-4" />
        <span>
          Butuh konsultasi dokter?{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Hubungi kami
          </span>
        </span>
      </div>
    </div>
  );
}
