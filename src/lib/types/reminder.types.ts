// ============================================
// REMINDER API RESPONSE TYPES
// ============================================

export interface ReminderResponse {
  id_reminder: number;
  anak_id: number;
  reminder_type: string;
  reference_id?: number | null;
  judul: string;
  waktu_reminder: string; // ISO 8601 or "HH:MM:SS"
  is_recurring: boolean;
  recurring_pattern?: "harian" | "mingguan" | "bulanan" | "tahunan" | null;
  is_active: boolean;
  is_done: boolean;
  pesan_custom?: string | null;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

/**
 * Request body for creating a new reminder.
 */
export interface CreateReminderRequest {
  reminder_type: string;
  reference_id?: number;
  judul: string;
  waktu_reminder: string; // ISO 8601 or "HH:MM:SS"
  is_recurring?: boolean;
  recurring_pattern?: "harian" | "mingguan" | "bulanan" | "tahunan";
  is_active?: boolean;
  pesan_custom?: string;
  metadata?: any;
}

/**
 * Request body for updating an existing reminder.
 */
export interface UpdateReminderRequest {
  reminder_type?: string;
  reference_id?: number;
  judul?: string;
  waktu_reminder?: string;
  is_recurring?: boolean;
  recurring_pattern?: "harian" | "mingguan" | "bulanan" | "tahunan";
  is_active?: boolean;
  is_done?: boolean;
  pesan_custom?: string;
  metadata?: any;
}
