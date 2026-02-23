import type { ReminderResponse } from "@/lib/types/reminder.types";
import ReminderItem from "./ReminderItem";

interface ReminderListProps {
  reminders: ReminderResponse[];
  onEdit: (reminder: ReminderResponse) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  loading?: boolean;
}

export default function ReminderList({
  reminders,
  onEdit,
  onDelete,
  onToggle,
  loading = false,
}: ReminderListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
        <span className="material-symbols-outlined text-6xl">
          notifications_paused
        </span>
        <h2 className="text-xl font-bold text-slate-600 dark:text-slate-300">
          Belum Ada Pengingat
        </h2>
        <p className="text-sm text-center max-w-md">
          Tambahkan pengingat untuk jadwal makan, imunisasi, atau vitamin si
          kecil agar tidak terlewat.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <ReminderItem
          key={reminder.id_reminder}
          reminder={reminder}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
