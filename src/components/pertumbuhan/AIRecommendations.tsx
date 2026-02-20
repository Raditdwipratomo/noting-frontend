"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { diagnosaService } from "@/lib/api/services/diagnosa.service";
import type { DiagnosaResponseData } from "@/lib/types/diagnosa.types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RecommendationItem {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  variant: "primary" | "default";
}

function buildRecommendations(diagnosa: DiagnosaResponseData | null): RecommendationItem[] {
  if (!diagnosa?.rekomendasi_tindakan) return [];

  // The backend returns a string with recommendations
  const text = diagnosa.rekomendasi_tindakan;
  const recommendations: RecommendationItem[] = [];

  // Split by numbered items or newlines to extract individual recommendations
  const lines = text
    .split(/\d+\.\s+|\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 10);

  lines.forEach((line, idx) => {
    recommendations.push({
      id: String(idx),
      icon: idx === 0 ? "egg_alt" : idx === 1 ? "bedtime" : "fitness_center",
      iconBg: idx % 2 === 0 ? "bg-primary" : "bg-secondary",
      title: line.length > 50 ? line.slice(0, 50) + "..." : line,
      description: line,
      variant: idx === 0 ? "primary" : "default",
    });
  });

  // If no lines extracted, show the full text as one recommendation
  if (recommendations.length === 0 && text.length > 5) {
    recommendations.push({
      id: "0",
      icon: "egg_alt",
      iconBg: "bg-primary",
      title: "Rekomendasi",
      description: text,
      variant: "primary",
    });
  }

  return recommendations.slice(0, 3); // Max 3 items
}

export default function AIRecommendations() {
  const { selectedAnakId } = useAnak();
  const [diagnosa, setDiagnosa] = useState<DiagnosaResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await diagnosaService.getLatest(selectedAnakId);
        if (!cancelled) setDiagnosa(data);
      } catch {
        if (!cancelled) setDiagnosa(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [selectedAnakId]);

  const recommendations = buildRecommendations(diagnosa);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={24} className="text-primary animate-pulse" />
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
          Rekomendasi AI
        </h3>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin text-gray-400" />
        </div>
      )}

      {!loading && recommendations.length === 0 && (
        <p className="text-gray-400 text-sm italic py-4">
          Belum ada rekomendasi. Lakukan diagnosa terlebih dahulu.
        </p>
      )}

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className={cn(
              "rounded-2xl border relative overflow-hidden transition-colors shadow-none",
              rec.variant === "primary"
                ? "bg-gradient-to-br from-primary/10 to-teal-50 border-primary/20 group hover:border-primary/50"
                : "bg-white border-gray-200 hover:border-gray-300"
            )}
          >
            <CardContent className="p-5">
              {rec.variant === "primary" && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10" />
              )}

              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    "material-symbols-outlined text-sm text-white rounded-full p-1",
                    rec.iconBg
                  )}
                >
                  {rec.icon}
                </span>
                {rec.title}
              </h4>

              <p className="text-sm text-gray-600">{rec.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
