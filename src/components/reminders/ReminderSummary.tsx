import { format, isToday } from "date-fns";
import { id } from "date-fns/locale";
import type { ReminderResponse } from "@/lib/types/reminder.types";

interface ReminderSummaryProps {
  reminders: ReminderResponse[];
}

export default function ReminderSummary({ reminders }: ReminderSummaryProps) {
  // Sort reminders by time
  const sortedReminders = [...reminders].sort(
    (a, b) =>
      new Date(a.waktu_reminder).getTime() -
      new Date(b.waktu_reminder).getTime()
  );

  const doneReminders = sortedReminders.filter((r) => r.is_done);
  const upcomingReminders = sortedReminders.filter(
    (r) => !r.is_done && r.is_active
  );

  const getStatusLabel = (reminder: ReminderResponse) => {
    if (reminder.is_done) return "Selesai";
    const reminderDate = new Date(reminder.waktu_reminder);
    if (!isToday(reminderDate)) {
      return format(reminderDate, "dd MMM", { locale: id });
    }
    const now = new Date();
    if (reminderDate.getTime() <= now.getTime()) {
      return "Terlewat";
    }
    // If it's the closest next one
    if (upcomingReminders[0]?.id_reminder === reminder.id_reminder) {
      return "Segera";
    }
    return "Nanti";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "text-primary border-primary";
      case "Terlewat":
        return "text-red-500 border-red-500";
      case "Segera":
        return "text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900";
      default:
        return "text-slate-400 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800";
    }
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "makan":
        return "restaurant";
      case "imunisasi":
        return "vaccines";
      case "vitamin":
        return "medication";
      case "obat":
        return "local_pharmacy";
      case "minum":
      case "susu":
        return "local_drink";
      default:
        return "notifications";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-8 sticky top-28">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          event_note
        </span>
        Ringkasan Jadwal
      </h3>

      {sortedReminders.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-4">
          Belum ada jadwal hari ini.
        </p>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
          {sortedReminders.slice(0, 5).map((reminder) => {
            const status = getStatusLabel(reminder);
            const statusColor = getStatusColor(status);
            const timeFormat = format(new Date(reminder.waktu_reminder), "HH:mm");

            return (
              <div
                key={reminder.id_reminder}
                className="relative flex items-start gap-6 group"
              >
                <div
                  className={`absolute left-0 w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 transition-transform group-hover:scale-110 ${statusColor}`}
                >
                  <span className="material-symbols-outlined text-sm font-bold">
                    {reminder.is_done ? "check" : getIcon(reminder.reminder_type)}
                  </span>
                </div>
                <div className="pl-12">
                  <time
                    className={`block text-xs font-bold uppercase tracking-widest mb-1 ${
                      status === "Selesai"
                        ? "text-primary"
                        : "text-slate-500"
                    }`}
                  >
                    {status} • {timeFormat}
                  </time>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {reminder.judul}
                  </h4>
                  {reminder.pesan_custom && (
                    <p className="text-sm text-slate-500 line-clamp-1">
                      {reminder.pesan_custom}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 p-4 bg-primary/10 rounded-xl border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-primary">
            lightbulb
          </span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Tips Sehat
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Atur pengingat makan secara teratur untuk membantu anak membiasakan pola
          makan sehat dan menjaga asupan gizi yang optimal.
        </p>
      </div>
    </div>
  );
}
