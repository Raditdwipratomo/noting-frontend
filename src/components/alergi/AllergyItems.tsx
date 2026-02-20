"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AllergySeverity = "Berat" | "Sedang" | "Ringan";

interface AllergyItemProps {
  title: string;
  severity: AllergySeverity;
  reaction: string;
  notes: string;
  lastUpdated: string;
  icon: React.ReactNode;
  colorTheme: "red" | "amber" | "blue";
}

export default function AllergyItems({
  title,
  severity,
  reaction,
  notes,
  lastUpdated,
  icon,
  colorTheme,
}: AllergyItemProps) {
  const themes = {
    red: {
      bg: "bg-red-50 text-red-500",
      badge: "bg-red-100 text-red-700 border-red-200",
      dot: "bg-red-600",
    },
    amber: {
      bg: "bg-amber-50 text-amber-500",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      dot: "bg-amber-600",
    },
    blue: {
      bg: "bg-blue-50 text-blue-500",
      badge: "bg-blue-100 text-blue-700 border-blue-200",
      dot: "bg-blue-600",
    },
  };

  const theme = themes[colorTheme];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5">
      <div className="shrink-0">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center",
            theme.bg
          )}
        >
          {icon}
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <Badge
              variant="outline"
              className={cn("gap-1.5 px-2.5 py-0.5", theme.badge)}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", theme.dot)}></span>
              {severity}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-primary rounded-md p-1 hover:bg-slate-50 h-8 w-8"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-red-500 rounded-md p-1 hover:bg-slate-50 h-8 w-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          <p>
            <span className="font-medium text-slate-900">Reaksi:</span>{" "}
            {reaction}
          </p>
          <p className="text-slate-500 italic">"{notes}"</p>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Terakhir diperbarui: {lastUpdated}
        </div>
      </div>
    </div>
  );
}
