import { DetailMakananHarian } from "@/lib/types/gizi.types";
import { giziService } from "@/lib/api/services/gizi.service";
import { useState } from "react";
import { Coffee, Apple, Utensils, CheckCircle, Lock, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DailyMealScheduleProps {
  anakId: number;
  meals: DetailMakananHarian[];
  onStatusUpdate: () => void;
}

export default function DailyMealSchedule({
  anakId,
  meals,
  onStatusUpdate,
}: DailyMealScheduleProps) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleMarkAsConsumed = async (detailId: number, currentStatus: boolean) => {
    try {
      setLoadingId(detailId);
      // Toggle the status
      await giziService.updateMakananStatus(anakId, detailId, {
        status_konsumsi: !currentStatus,
      });
      onStatusUpdate();
    } catch (error) {
      console.error("Gagal mengupdate status makanan:", error);
      // Optional: Add toast notification here for error
    } finally {
      setLoadingId(null);
    }
  };

  const getMealIcon = (nama: string) => {
    if (!nama) return <Utensils className="size-6" />;
    const lowerNama = nama.toLowerCase();
    if (lowerNama.includes("pagi") || lowerNama.includes("sarapan")) return <Coffee className="size-6" />;
    if (lowerNama.includes("snack") || lowerNama.includes("buah")) return <Apple className="size-6" />;
    return <Utensils className="size-6" />;
  };

  const getMealColor = (index: number) => {
    const colors = [
      { bg: "bg-blue-50 text-blue-500", dot: "bg-primary border-primary", border: "ring-primary/5" },
      { bg: "bg-orange-50 text-orange-500", dot: "bg-orange-400 border-orange-400", border: "ring-orange-500/5" },
      { bg: "bg-emerald-50 text-emerald-500", dot: "bg-emerald-400 border-emerald-400", border: "ring-emerald-500/5" },
      { bg: "bg-purple-50 text-purple-500", dot: "bg-purple-400 border-purple-400", border: "ring-purple-500/5" },
    ];
    return colors[index % colors.length];
  };

  console.log("meals", meals)

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
        Belum ada jadwal makan untuk hari ini.
      </div>
    );
  }

  // Sort meals by ID or time if needed. Assuming API returns them in logical order, but let's ensure it maps logically.
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Jadwal Makan Hari Ini</h2>
      
      <div className="space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200 before:-z-10 pl-2">
        {meals.map((meal, index) => {
          const isCompleted = meal.status_konsumsi;
          const isLocked = false; // Could be based on time if we wanted to lock future meals
          const isLoading = loadingId === meal.id_detail;
          const colors = getMealColor(index);

          return (
            <div 
              key={meal.id_detail} 
              className={cn(
                "relative flex gap-6 group transition-opacity",
                isLocked ? "opacity-70 hover:opacity-100" : ""
              )}
            >
              {/* Timeline Dot */}
              <div 
                className={cn(
                  "absolute left-0 top-0 mt-1 size-4 rounded-full border-4 border-white z-10 translate-x-[2px]",
                  isCompleted ? "bg-green-500 border-green-100" : "bg-gray-300",
                  !isCompleted && !isLocked && `border-white ${colors.dot}`
                )}
              ></div>

              {/* Card */}
              <div 
                className={cn(
                  "flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
                  !isCompleted && !isLocked && `ring-2 ${colors.border}`
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  {/* Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={cn("size-12 rounded-xl flex items-center justify-center shrink-0", colors.bg)}>
                      {getMealIcon(meal.nama_makanan)}
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                        {meal.waktu_makan.replace(/_/g, " ")}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                        {meal.nama_makanan}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{meal.porsi}</p>
                      {meal.target_kalori > 0 && (
                        <span className="text-[11px] font-medium text-gray-400">Target: {meal.target_kalori} kkal</span>
                      )}

                      {/* Macros Mini Breakdown */}
                      {meal.nutrisi_makanan && (
                      <div className="flex flex-wrap gap-3 mt-3">
                         <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                           {meal.nutrisi_makanan.kalori_total} kkal
                         </span>
                         <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                           Pro: {meal.nutrisi_makanan.protein_gram}g
                         </span>
                         <span className="text-xs font-semibold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                           Lem: {meal.nutrisi_makanan.lemak_gram}g
                         </span>
                         <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                           Kar: {meal.nutrisi_makanan.karbohidrat_gram}g
                         </span>
                      </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button or Status */}
                  <div className="flex-shrink-0 mt-4 md:mt-0 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <Link
                      href={`/rencana-makan/resep/${meal.id_detail}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
                    >
                      <ChefHat className="size-4" />
                      Lihat Resep
                    </Link>

                    {isCompleted ? (
                       <span className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                         <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                         Selesai
                       </span>
                    ) : isLocked ? (
                       <Lock className="text-gray-300 size-6 mx-4" />
                    ) : (
                      <button 
                        onClick={() => handleMarkAsConsumed(meal.id_detail, meal.status_konsumsi)}
                        disabled={isLoading}
                        className={cn(
                          "w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50",
                          "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20"
                        )}
                      >
                        <CheckCircle className="size-4" />
                        {isLoading ? "Menyimpan..." : "Tandai Sudah Dimakan"}
                      </button>
                    )}
                  </div>
                  
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
