import React, { useState, useEffect } from "react";
import {format} from "date-fns"
import type { 
  ReminderResponse,
  CreateReminderRequest,
  UpdateReminderRequest
} from "@/lib/types/reminder.types";
import { reminderService } from "@/lib/api/services/reminder.service";
import { useAnak } from "@/contexts/AnakContext";
import { Loader2 } from "lucide-react";

interface ReminderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reminderToEdit: ReminderResponse | null;
}

export default function ReminderFormModal({
  isOpen,
  onClose,
  onSuccess,
  reminderToEdit,
}: ReminderFormModalProps) {
  const { selectedAnakId } = useAnak();
  const [loading, setLoading] = useState(false);

  // Form State
  const [category, setCategory] = useState("makan");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [judul, setJudul] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Reset form when modal opens/closes or reminderToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (reminderToEdit) {
        setCategory(reminderToEdit.reminder_type.toLowerCase());
        const dateObj = new Date(reminderToEdit.waktu_reminder);
        setDate(format(dateObj, "yyyy-MM-dd"));
        setTime(format(dateObj, "HH:mm"));
        setJudul(reminderToEdit.judul);
        setCustomMessage(reminderToEdit.pesan_custom || "");
        setIsActive(reminderToEdit.is_active);
      } else {
        // Defaults for new reminder
        setCategory("makan");
        setDate(format(new Date(), "yyyy-MM-dd"));
        setTime("07:00");
        setJudul("");
        setCustomMessage("");
        setIsActive(true);
      }
    }
  }, [isOpen, reminderToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnakId) return;

    // Combine date and time
    const combinedDateTime = new Date(`${date}T${time}:00`).toISOString();

    setLoading(true);
    try {
      if (reminderToEdit) {
        const payload: UpdateReminderRequest = {
          reminder_type: category,
          judul: judul,
          waktu_reminder: combinedDateTime,
          pesan_custom: customMessage,
          is_active: isActive,
        };
        await reminderService.update(selectedAnakId, reminderToEdit.id_reminder, payload);
      } else {
        const payload: CreateReminderRequest = {
          reminder_type: category,
          judul: judul,
          waktu_reminder: combinedDateTime,
          pesan_custom: customMessage,
          is_active: isActive,
          is_recurring: false, // Defaulting to false for simple custom reminders from UI
        };
        await reminderService.create(selectedAnakId, payload);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save reminder:", error);
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm"
      role="dialog"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {reminderToEdit ? "Edit Pengingat" : "Tambah Pengingat Baru"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <label
                className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                htmlFor="category"
              >
                Kategori
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow text-slate-700 dark:text-slate-200"
                  required
                >
                  <option value="makan">Makan</option>
                  <option value="minum">Minum / Susu</option>
                  <option value="imunisasi">Imunisasi</option>
                  <option value="vitamin">Vitamin</option>
                  <option value="obat">Obat</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <span className="material-symbols-outlined text-xl">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                  htmlFor="date"
                >
                  Tanggal
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-700 dark:text-slate-200"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                  htmlFor="time"
                >
                  Waktu Pengingat
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-700 dark:text-slate-200"
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                htmlFor="activity-name"
              >
                Nama Aktivitas
              </label>
              <input
                id="activity-name"
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                placeholder="Contoh: Imunisasi Polio atau Susu Pagi"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                htmlFor="custom-message"
              >
                Pesan Custom (Opsional)
              </label>
              <textarea
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 resize-none"
                placeholder="Tulis pesan penyemangat untuk Bunda..."
                rows={3}
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Aktifkan Pengingat
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-5 py-3 rounded-xl font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-primary text-background-dark hover:brightness-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-75"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Simpan Pengingat"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
