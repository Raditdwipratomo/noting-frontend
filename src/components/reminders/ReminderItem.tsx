import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { ReminderResponse } from "@/lib/types/reminder.types";

interface ReminderItemProps {
  reminder: ReminderResponse;
  onEdit: (reminder: ReminderResponse) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function ReminderItem({
  reminder,
  onEdit,
  onDelete,
  onToggle,
}: ReminderItemProps) {
  const dateObj = new Date(reminder.waktu_reminder);
  const timeFormatted = format(dateObj, "hh:mm a", { locale: id });

  let Icon = "notifications";
  let iconBgColor = "bg-slate-100 dark:bg-slate-800";
  let iconTextColor = "text-slate-600";
  let badgeText = reminder.judul;
  let badgeColor = "bg-slate-100 dark:bg-slate-800 text-slate-500";

  switch (reminder.reminder_type.toLowerCase()) {
    case "makan":
      Icon = "restaurant";
      iconBgColor = "bg-green-100 dark:bg-green-900/30";
      iconTextColor = "text-green-600";
      badgeColor = "bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-200";
      break;
    case "imunisasi":
      Icon = "vaccines";
      iconBgColor = "bg-blue-100 dark:bg-blue-900/30";
      iconTextColor = "text-blue-600";
      badgeColor = "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-200";
      break;
    case "vitamin":
      Icon = "medication";
      iconBgColor = "bg-yellow-100 dark:bg-yellow-900/30";
      iconTextColor = "text-yellow-600";
      badgeColor = "bg-yellow-50 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-200";
      break;
    case "obat":
      Icon = "local_pharmacy";
      iconBgColor = "bg-red-100 dark:bg-red-900/30";
      iconTextColor = "text-red-600";
      badgeColor = "bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-200";
      break;
    case "minum":
    case "susu":
      Icon = "local_drink";
      iconBgColor = "bg-orange-100 dark:bg-orange-900/30";
      iconTextColor = "text-orange-600";
      badgeColor = "bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-200";
      break;
  }

  return (
    <div className="group relative bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div
          className={`h-16 w-16 flex items-center justify-center ${iconBgColor} ${iconTextColor} rounded-full shrink-0`}
        >
          <span className="material-symbols-outlined text-3xl">{Icon}</span>
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`text-2xl font-black ${
                reminder.is_active
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400 dark:text-slate-600 line-through"
              }`}
            >
              {timeFormatted}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeColor}`}
            >
              {reminder.reminder_type}
            </span>
            {!reminder.is_active && (
              <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Nonaktif
              </span>
            )}
            {reminder.is_recurring && (
              <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">repeat</span>
                {reminder.recurring_pattern}
              </span>
            )}
          </div>
          <h4
            className={`font-bold text-lg mb-0.5 ${
              !reminder.is_active ? "text-slate-400" : ""
            }`}
          >
            {badgeText}
          </h4>
          {reminder.pesan_custom && (
            <p className="text-slate-600 dark:text-slate-400 italic">
              "{reminder.pesan_custom}"
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 sm:border-l border-slate-200 dark:border-slate-800 sm:pl-6 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={reminder.is_active}
              onChange={() => onToggle(reminder.id_reminder)}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(reminder)}
              className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
              title="Edit Reminder"
            >
              <span className="material-symbols-outlined">edit_square</span>
            </button>
            <button
              onClick={() => onDelete(reminder.id_reminder)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Hapus Reminder"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
