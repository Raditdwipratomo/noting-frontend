"use client";

import { cn } from "@/lib/utils";
import {
  Droplet,
  Utensils,
  Cookie,
  Coffee,
  IceCream,
  UtensilsCrossed,
  Moon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export type DailyPlanStatus = "Selesai" | "Aktif" | "Belum Dimulai";

interface DailyPlanCardProps {
  dayName: string;
  dayNumber: string;
  dayShort: string;
  status: DailyPlanStatus;
  progressText: string;
  progressPercentage: number;
  isToday?: boolean;
  hariKe: number;
}

export default function DailyPlanCard({
  dayName,
  dayNumber,
  dayShort,
  status,
  progressText,
  progressPercentage,
  isToday = false,
  hariKe,
}: DailyPlanCardProps) {
  // Styles based on status
  const cardStyle = isToday
    ? "border-2 border-primary ring-4 ring-primary/5 cursor-pointer relative overflow-hidden"
    : "border border-slate-100 hover:border-primary transition-all cursor-pointer group";

  const calendarBoxStyle = isToday
    ? "bg-primary/10 border border-primary/20 text-primary"
    : "bg-slate-50 border border-slate-100 text-slate-700";

  const dateShortStyle = isToday ? "text-primary" : "text-slate-400";

  const badgeVariant =
    status === "Selesai"
      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
      : status === "Aktif"
      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
      : "bg-slate-100 text-slate-500 hover:bg-slate-200";

  const iconClasses =
    status === "Belum Dimulai"
      ? "text-slate-400 opacity-40"
      : "text-emerald-500 fill-emerald-500";

  const progressBgClass =
    status === "Selesai"
      ? "bg-emerald-500"
      : status === "Aktif"
      ? "bg-primary"
      : "bg-slate-300";

  return (
    <Link href={`/rencana-makan/hari/${hariKe}`}>
    <Card className={cn("shadow-sm outline-none bg-white text-gray-800", cardStyle)}>
      <CardContent className="p-5">
        {isToday && (
          <div className="absolute right-0 top-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            HARI INI
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex flex-col items-center justify-center",
                calendarBoxStyle
              )}
            >
              <span className={cn("text-[10px] font-bold uppercase", dateShortStyle)}>
                {dayShort}
              </span>
              <span className="text-lg font-bold leading-none">{dayNumber}</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{dayName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={cn("text-xs font-bold", badgeVariant)}>
                  {status}
                </Badge>
                <div className="flex gap-1">
                  <Droplet className={cn("w-4 h-4", iconClasses)} />
                  <Utensils className={cn("w-4 h-4", iconClasses)} />
                  <Cookie className={cn("w-4 h-4", iconClasses)} />
                  <Coffee className={cn("w-4 h-4", iconClasses)} />
                  <IceCream className={cn("w-4 h-4", iconClasses)} />
                  <UtensilsCrossed className={cn("w-4 h-4", status === "Belum Dimulai" ? iconClasses : status === "Aktif" ? "text-slate-300" : iconClasses)} />
                  <Moon className={cn("w-4 h-4", status === "Belum Dimulai" ? iconClasses : status === "Aktif" ? "text-slate-300" : iconClasses)} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 min-w-[120px]">
            <div className="flex justify-between w-full text-[10px] font-bold text-slate-500 mb-1">
              <span>Progres</span>
              <span>{progressText}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full", progressBgClass)}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
