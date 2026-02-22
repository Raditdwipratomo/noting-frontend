// lib/types/gizi.types.ts

/* ===================== */
/* Enums / Unions        */
/* ===================== */

export type StatusKonsumsi = "dikonsumsi" | "tidak_dikonsumsi" | "sebagian";
export type StatusRekomendasi = "belum_dimulai" | "sedang_berjalan" | "selesai";

/* ===================== */
/* Detail Makanan        */
/* ===================== */

export interface ResepMakananData {
  id_resep: number;
  id_detail_makanan: number;
  waktu_persiapan: number;
  waktu_memasak: number;
  bahan_bahan: string[];
  langkah_pembuatan: string[];
  created_at: string;
  updated_at: string;
}

export interface NutrisiMakananData {
  id_nutrisi: number;
  id_detail_makanan: number;
  kalori_total: number;
  protein_gram: number;
  lemak_gram: number;
  karbohidrat_gram: number;
  kalsium_mg?: number;
  zat_besi_mg?: number;
  zinc_mg?: number;
  vitamin_a_iu?: number;
  vitamin_d_iu?: number;
  vitamin_c_mg?: number;
  catatan?: string | null;
}

export interface DetailMakananHarian {
  id_detail: number;
  id_rekomendasi_harian: number;
  urutan_makanan: number;
  waktu_makan: string;
  nama_makanan: string;
  porsi: string;
  target_kalori: number;
  status_konsumsi: boolean;
  nutrisi_makanan?: NutrisiMakananData | null;
  resep_makanan?: ResepMakananData | null;
  gambar_url?: string | null;
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
/* Kebutuhan Nutrisi AI  */
/* ===================== */

export interface KebutuhanNutrisiAI {
  protein_gram: number;
  lemak_persen: number;
  karbohidrat_persen: number;
  kalsium_mg: number;
  zat_besi_mg: number;
  zinc_mg: number;
  vitamin_a_mcg: number;
  vitamin_d_mcg: number;
  vitamin_c_mg: number;
}

/* ===================== */
/* Rencana Gizi          */
/* ===================== */

export interface RencanaGiziDetailResponse {
  id_rencana: number;
  anak_id: number;
  minggu_ke: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  is_completed: boolean;
  kebutuhan_kalori_harian: number | null;
  kebutuhan_nutrisi: KebutuhanNutrisiAI | null;
  catatan_khusus: string[] | null;
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
