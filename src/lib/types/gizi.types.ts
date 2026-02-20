// lib/types/gizi.types.ts

/* ===================== */
/* Enums / Unions        */
/* ===================== */

export type StatusKonsumsi = "dikonsumsi" | "tidak_dikonsumsi" | "sebagian";
export type StatusRekomendasi = "belum_dimulai" | "sedang_berjalan" | "selesai";

/* ===================== */
/* Detail Makanan        */
/* ===================== */

export interface DetailMakananHarian {
  id_detail_makanan: number;
  id_rekomendasi_harian: number;
  nama_makanan: string;
  porsi: string;
  kalori: number;
  protein_g: number;
  karbohidrat_g: number;
  lemak_g: number;
  status_konsumsi: boolean;
  waktu_makan: string;
  catatan?: string | null;
}

/* ===================== */
/* Rekomendasi Harian    */
/* ===================== */

export interface RekomendasiHarian {
  id_rekomendasi_harian: number;
  id_rencana: number;
  anak_id: number;
  hari_ke: number;
  tanggal: string;
  progress_harian: number;
  status: StatusRekomendasi;
  detail_makanan_harian: DetailMakananHarian[];
}

/* ===================== */
/* Rencana Gizi          */
/* ===================== */

export interface KebutuhanNutrisi {
  protein_g: number;
  karbohidrat_g: number;
  lemak_g: number;
  serat_g: number;
  kalsium_mg: number;
  zat_besi_mg: number;
}

export interface MenuHarian {
  hari_ke: number;
  tanggal: string;
  sarapan: string[];
  makan_siang: string[];
  makan_malam: string[];
  snack: string[];
  total_kalori: number;
}

export interface RencanaGiziResponse {
  rencana_id: number;
  minggu_ke: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  kebutuhan_kalori: number;
  kebutuhan_nutrisi: KebutuhanNutrisi;
  catatan_khusus: string[];
  menu_mingguan: MenuHarian[];
}

export interface RencanaGiziDetailResponse {
  id_rencana: number;
  anak_id: number;
  minggu_ke: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  rekomendasi_harian: RekomendasiHarian[];
}

/* ===================== */
/* History & Pagination  */
/* ===================== */

export interface RencanaGiziPagination {
  total: number;
  limit: number;
  offset: number;
}

export interface RencanaGiziHistoryResponse {
  data: RencanaGiziDetailResponse[];
  pagination: RencanaGiziPagination;
}

/* ===================== */
/* Progress              */
/* ===================== */

export interface DailyProgress {
  hari_ke: number;
  tanggal: string;
  progress: string;
  percentage: number;
  status: StatusRekomendasi;
}

export interface GiziProgressResponse {
  rencana_id: number;
  minggu_ke: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  overall_progress: string;
  overall_percentage: number;
  daily_progress: DailyProgress[];
}

/* ===================== */
/* Update Status         */
/* ===================== */

export interface UpdateMakananStatusRequest {
  status_konsumsi: boolean;
}

export interface UpdateMakananStatusResponse {
  detail_id: string;
  status_konsumsi: boolean;
  daily_progress: string;
}
