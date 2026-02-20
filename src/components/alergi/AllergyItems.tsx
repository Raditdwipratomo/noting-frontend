"use client";

import { Trash2 } from "lucide-react";
import type { AlergiResponse } from "@/lib/types/alergi.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const severityConfig = {
  berat: { label: "Berat", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
  sedang: { label: "Sedang", color: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  ringan: { label: "Ringan", color: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
};

interface AllergyItemsProps {
  alergi: AlergiResponse;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AllergyItems({ alergi, onEdit, onDelete }: AllergyItemsProps) {
  const severity = severityConfig[alergi.tingkat_keparahan] ?? severityConfig.ringan;
  const updatedAgo = getTimeAgo(alergi.updated_at);

  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-lg text-slate-900">
                {alergi.nama_alergi}
              </h3>
              <Badge
                variant="outline"
                className={cn("text-xs font-bold rounded-full px-3", severity.color)}
              >
                {severity.label}
              </Badge>
            </div>

            <p className="text-sm text-slate-600 mb-2">
              <strong>Gejala:</strong> {alergi.gejala || "Tidak ada informasi"}
            </p>

            {alergi.catatan && (
              <p className="text-sm text-slate-500 italic">
                {alergi.catatan}
              </p>
            )}

            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <span>Jenis: {alergi.jenis_alergi}</span>
              <span>Diupdate: {updatedAgo}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 h-8"
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 h-8"
              >
                Hapus
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  return `${Math.floor(diffDays / 30)} bulan yang lalu`;
}
