"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AllergyItems from "@/components/alergi/AllergyItems";
import AllergySummary from "@/components/alergi/AllergySummary";
import AlergiFormModal from "@/components/alergi/AlergiFormModal";
import { Plus, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnak } from "@/contexts/AnakContext";
import { alergiService } from "@/lib/api/services/alergi.service";
import type { AlergiResponse, AlergiSummaryResponse } from "@/lib/types/alergi.types";

export default function AlergiPage() {
  const { selectedAnakId } = useAnak();
  const [allergyList, setAllergyList] = useState<AlergiResponse[]>([]);
  const [summary, setSummary] = useState<AlergiSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Modal actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alergiToEdit, setAlergiToEdit] = useState<AlergiResponse | null>(null);

  const fetchData = useCallback(async () => {
    if (!selectedAnakId) return;
    setLoading(true);
    try {
      const [list, sum] = await Promise.allSettled([
        alergiService.getAll(selectedAnakId),
        alergiService.getSummary(selectedAnakId),
      ]);
      setAllergyList(list.status === "fulfilled" ? list.value : []);
      setSummary(sum.status === "fulfilled" ? sum.value : null);
    } catch (err) {
      console.error("AlergiPage fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedAnakId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: number) => {
    if (!selectedAnakId) return;
    if (!window.confirm("Apakah anda yakin ingin menghapus alergi ini?")) return;

    try {
      await alergiService.delete(selectedAnakId, id);
      await fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleOpenAdd = () => {
    setAlergiToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (alergi: AlergiResponse) => {
    setAlergiToEdit(alergi);
    setIsModalOpen(true);
  };



  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <DashboardHeader activePage="/alergi" />

      <main className="flex-grow w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-30">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-[65%] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Daftar Alergi
                </h1>
                <p className="text-slate-500 mt-1 text-sm">
                  Kelola daftar alergi dan intoleransi makanan si kecil.
                </p>
              </div>
              <Button 
                onClick={handleOpenAdd}
                className="flex items-center justify-center gap-2 px-5 py-6 rounded-xl font-bold shadow-sm group hover:scale-[1.02] hover:bg-teal-600 transition-all"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Tambah Alergi</span>
              </Button>
            </div>



            {loading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 size={32} className="animate-spin text-gray-400" />
              </div>
            )}

            {!loading && allergyList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
                <ShieldAlert size={48} />
                <span className="text-sm">
                  Belum ada data alergi. Tambahkan alergi pertama!
                </span>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {allergyList.map((item) => (
                <AllergyItems
                  key={item.id}
                  alergi={item}
                  onEdit={() => handleOpenEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          </section>

          <section className="w-full lg:w-[35%] flex flex-col gap-6">
            <AllergySummary summary={summary} loading={loading} />
          </section>
        </div>
      </main>

      <AlergiFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        alergiToEdit={alergiToEdit}
      />
    </div>
  );
}
