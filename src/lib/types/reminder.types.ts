// ============================================
// REMINDER API RESPONSE TYPES
// ============================================

import type { ReminderMakan } from "./database.types";

/**
 * Response shape for a single reminder from the API.
 * Maps to the backend ReminderMakanan model with related detail_makanan.
 */
export interface ReminderResponse extends ReminderMakan {
  detail_makanan?: {
    id_detail: number;
    waktu_makan: string;
    nama_makanan?: string;
  } | null;
}

/**
 * Request body for creating a new reminder.
 */
export interface CreateReminderRequest {
  id_detail_makanan?: number;
  waktu_reminder: string; // ISO 8601 or "HH:MM:SS"
  is_active?: boolean;
  pesan_custom?: string;
}

/**
 * Request body for updating an existing reminder.
 */
export interface UpdateReminderRequest {
  id_detail_makanan?: number;
  waktu_reminder?: string;
  is_active?: boolean;
  pesan_custom?: string;
}
