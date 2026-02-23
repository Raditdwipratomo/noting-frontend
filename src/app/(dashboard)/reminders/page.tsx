"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ReminderList from "@/components/reminders/ReminderList";
import ReminderSummary from "@/components/reminders/ReminderSummary";
import ReminderFormModal from "@/components/reminders/ReminderFormModal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnak } from "@/contexts/AnakContext";
import { reminderService } from "@/lib/api/services/reminder.service";
import type { ReminderResponse } from "@/lib/types/reminder.types";

export default function RemindersPage() {
  const { selectedAnakId } = useAnak();
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState<ReminderResponse | null>(null);

  const fetchReminders = useCallback(async () => {
    if (!selectedAnakId) return;
    setLoading(true);
    try {
      const data = await reminderService.getByAnakId(selectedAnakId);
      setReminders(data);
    } catch (err) {
      console.error("Failed to fetch reminders:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedAnakId]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const handleDelete = async (id: number) => {
    if (!selectedAnakId) return;
    if (!window.confirm("Apakah Anda yakin ingin menghapus pengingat ini?")) return;
    try {
      await reminderService.delete(selectedAnakId, id);
      await fetchReminders();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggle = async (id: number) => {
    if (!selectedAnakId) return;
    try {
      await reminderService.toggleActive(selectedAnakId, id);
      await fetchReminders();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleOpenAdd = () => {
    setReminderToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (reminder: ReminderResponse) => {
    setReminderToEdit(reminder);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <DashboardHeader activePage="/reminders" />

      <main className="flex-grow w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-30">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <nav className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <span>Pengaturan</span>
              <span className="text-xs">›</span>
              <span className="text-primary font-medium">
                Reminder &amp; Jadwal
              </span>
            </nav>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Reminder &amp; Jadwal
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl text-sm">
              Kelola jadwal makan, imunisasi, dan vitamin si kecil untuk
              memastikan kesehatan dan pertumbuhan yang optimal.
            </p>
          </div>
          <Button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-8 py-6 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Pengingat</span>
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Reminder List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                Daftar Pengingat Aktif
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                  {reminders.filter((r) => r.is_active).length} Jadwal
                </span>
              </h3>
            </div>
            <ReminderList
              reminders={reminders}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
              loading={loading}
            />
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-4">
            <ReminderSummary reminders={reminders} />
          </div>
        </div>
      </main>

      <ReminderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchReminders}
        reminderToEdit={reminderToEdit}
      />
    </div>
  );
}
