// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================

import { z } from "zod";
import {
  JenisKelamin,
  StatusStunting,
  StatusRekomendasi,
  WaktuMakan,
  TipeNotifikasi,
  TingkatKeparahan,
  KategoriPertumbuhan,
} from "./database.types";

// ============================================
// BASE SCHEMAS
// ============================================

export const paginationSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
});

export const dateRangeSchema = z.object({
  start_date: z.string().datetime().or(z.date()).optional(),
  end_date: z.string().datetime().or(z.date()).optional(),
});

// ============================================
// USER SCHEMAS
// ============================================

export const userCreateSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email().max(100),
  password: z.string().min(8).max(255),
  nama_lengkap: z.string().min(1).max(100),
  no_telepon: z.string().max(20).optional(),
  alamat: z.string().optional(),
});

export const userUpdateSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().max(100).optional(),
  password: z.string().min(8).max(255).optional(),
  nama_lengkap: z.string().min(1).max(100).optional(),
  no_telepon: z.string().max(20).optional(),
  alamat: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ============================================
// ANAK SCHEMAS
// ============================================

export const anakCreateSchema = z.object({
  user_id: z.number().int().positive(),
  nama_anak: z.string().min(1).max(100),
  jenis_kelamin: z.nativeEnum(JenisKelamin),
  tanggal_lahir: z.string().datetime().or(z.date()),
  foto_profil: z.string().url().optional(),
  status_aktif: z.boolean().optional().default(true),
});

export const anakUpdateSchema = z.object({
  nama_anak: z.string().min(1).max(100).optional(),
  jenis_kelamin: z.nativeEnum(JenisKelamin).optional(),
  tanggal_lahir: z.string().datetime().or(z.date()).optional(),
  foto_profil: z.string().url().optional(),
  status_aktif: z.boolean().optional(),
});

// ============================================
// PERTUMBUHAN ANAK SCHEMAS
// ============================================

export const pertumbuhanAnakCreateSchema = z.object({
  anak_id: z.number().int().positive(),
  tanggal_pencatatan: z.string().datetime().or(z.date()),
  berat_badan_kg: z.number().positive().max(999.99),
  tinggi_badan_cm: z.number().positive().max(999.99),
  lingkar_lengan_atas_cm: z.number().positive().max(99.99).optional(),
  lingkar_kepala_cm: z.number().positive().max(99.99).optional(),
  kategori: z.nativeEnum(KategoriPertumbuhan).optional(),
  catatan: z.string().optional(),
});

export const pertumbuhanAnakUpdateSchema = z.object({
  tanggal_pencatatan: z.string().datetime().or(z.date()).optional(),
  berat_badan_kg: z.number().positive().max(999.99).optional(),
  tinggi_badan_cm: z.number().positive().max(999.99).optional(),
  lingkar_lengan_atas_cm: z.number().positive().max(99.99).optional(),
  lingkar_kepala_cm: z.number().positive().max(99.99).optional(),
  kategori: z.nativeEnum(KategoriPertumbuhan).optional(),
  catatan: z.string().optional(),
});

export const pertumbuhanFilterSchema = paginationSchema
  .merge(dateRangeSchema)
  .extend({
    anak_id: z.number().int().positive().optional(),
    kategori: z.nativeEnum(KategoriPertumbuhan).optional(),
  });

// ============================================
// RIWAYAT DIAGNOSA SCHEMAS
// ============================================

export const riwayatDiagnosaCreateSchema = z.object({
  anak_id: z.number().int().positive(),
  pertumbuhan_id: z.number().int().positive(),
  tanggal_diagnosa: z.string().datetime().or(z.date()),
  status_stunting: z.nativeEnum(StatusStunting),
  z_score_tinggi_badan: z.number().optional(),
  z_score_berat_badan: z.number().optional(),
  z_score_berat_tinggi: z.number().optional(),
  rekomendasi_tindakan: z.string().optional(),
  catatan: z.string().optional(),
});

export const riwayatDiagnosaFilterSchema = paginationSchema
  .merge(dateRangeSchema)
  .extend({
    anak_id: z.number().int().positive().optional(),
    status_stunting: z.nativeEnum(StatusStunting).optional(),
  });

// ============================================
// RENCANA GIZI SCHEMAS
// ============================================

export const rencanaGiziCreateSchema = z.object({
  anak_id: z.number().int().positive(),
  minggu_ke: z.number().int().positive(),
  tanggal_mulai: z.string().datetime().or(z.date()),
  tanggal_selesai: z.string().datetime().or(z.date()),
  progress: z.number().int().min(0).max(100).optional().default(0),
  is_completed: z.boolean().optional().default(false),
});

export const rencanaGiziUpdateSchema = z.object({
  minggu_ke: z.number().int().positive().optional(),
  tanggal_mulai: z.string().datetime().or(z.date()).optional(),
  tanggal_selesai: z.string().datetime().or(z.date()).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  is_completed: z.boolean().optional(),
});

export const rencanaGiziFilterSchema = paginationSchema.extend({
  anak_id: z.number().int().positive().optional(),
  minggu_ke: z.number().int().positive().optional(),
  is_completed: z.boolean().optional(),
});

// ============================================
// REKOMENDASI HARIAN SCHEMAS
// ============================================

export const rekomendasiHarianCreateSchema = z.object({
  id_rencana: z.number().int().positive(),
  anak_id: z.number().int().positive(),
  hari_ke: z.number().int().positive(),
  tanggal: z.string().datetime().or(z.date()),
  progress_harian: z.number().int().min(0).max(100).optional().default(0),
  jumlah_makanan_total: z.number().int().positive().optional().default(7),
  status: z
    .nativeEnum(StatusRekomendasi)
    .optional()
    .default(StatusRekomendasi.BELUM_DIMULAI),
});

export const rekomendasiHarianUpdateSchema = z.object({
  tanggal: z.string().datetime().or(z.date()).optional(),
  progress_harian: z.number().int().min(0).max(100).optional(),
  jumlah_makanan_total: z.number().int().positive().optional(),
  status: z.nativeEnum(StatusRekomendasi).optional(),
});

export const rekomendasiHarianFilterSchema = paginationSchema
  .merge(dateRangeSchema)
  .extend({
    anak_id: z.number().int().positive().optional(),
    id_rencana: z.number().int().positive().optional(),
    status: z.nativeEnum(StatusRekomendasi).optional(),
  });

// ============================================
// DETAIL MAKANAN SCHEMAS
// ============================================

export const detailMakananCreateSchema = z.object({
  id_rekomendasi_harian: z.number().int().positive(),
  urutan_makanan: z.number().int().min(1).max(7),
  waktu_makan: z.nativeEnum(WaktuMakan),
  status_konsumsi: z.boolean().optional().default(false),
});

export const detailMakananUpdateSchema = z.object({
  urutan_makanan: z.number().int().min(1).max(7).optional(),
  waktu_makan: z.nativeEnum(WaktuMakan).optional(),
  status_konsumsi: z.boolean().optional(),
});

// ============================================
// NUTRISI MAKANAN SCHEMAS
// ============================================

export const nutrisiMakananCreateSchema = z.object({
  id_detail_makanan: z.number().int().positive(),
  protein_gram: z.number().nonnegative().max(999.99).optional(),
  lemak_gram: z.number().nonnegative().max(999.99).optional(),
  karbohidrat_gram: z.number().nonnegative().max(999.99).optional(),
  kalsium_mg: z.number().nonnegative().max(9999.99).optional(),
  zat_besi_mg: z.number().nonnegative().max(999.99).optional(),
  zinc_mg: z.number().nonnegative().max(999.99).optional(),
  vitamin_a_iu: z.number().nonnegative().max(9999.99).optional(),
  vitamin_d_iu: z.number().nonnegative().max(9999.99).optional(),
  vitamin_c_mg: z.number().nonnegative().max(999.99).optional(),
  kalori_total: z.number().int().nonnegative().optional(),
  catatan: z.string().optional(),
});

export const nutrisiMakananUpdateSchema = z.object({
  protein_gram: z.number().nonnegative().max(999.99).optional(),
  lemak_gram: z.number().nonnegative().max(999.99).optional(),
  karbohidrat_gram: z.number().nonnegative().max(999.99).optional(),
  kalsium_mg: z.number().nonnegative().max(9999.99).optional(),
  zat_besi_mg: z.number().nonnegative().max(999.99).optional(),
  zinc_mg: z.number().nonnegative().max(999.99).optional(),
  vitamin_a_iu: z.number().nonnegative().max(9999.99).optional(),
  vitamin_d_iu: z.number().nonnegative().max(9999.99).optional(),
  vitamin_c_mg: z.number().nonnegative().max(999.99).optional(),
  kalori_total: z.number().int().nonnegative().optional(),
  catatan: z.string().optional(),
});

// ============================================
// REMINDER MAKAN SCHEMAS
// ============================================

export const reminderMakanCreateSchema = z.object({
  anak_id: z.number().int().positive(),
  id_detail_makanan: z.number().int().positive().optional(),
  waktu_reminder: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/), // HH:MM:SS format
  is_active: z.boolean().optional().default(true),
  tipe_notifikasi: z
    .nativeEnum(TipeNotifikasi)
    .optional()
    .default(TipeNotifikasi.PUSH),
  pesan_custom: z.string().optional(),
});

export const reminderMakanUpdateSchema = z.object({
  id_detail_makanan: z.number().int().positive().optional(),
  waktu_reminder: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .optional(),
  is_active: z.boolean().optional(),
  tipe_notifikasi: z.nativeEnum(TipeNotifikasi).optional(),
  pesan_custom: z.string().optional(),
});

// ============================================
// ALERGI ANAK SCHEMAS
// ============================================

export const alergiAnakCreateSchema = z.object({
  anak_id: z.number().int().positive(),
  nama_alergen: z.string().min(1).max(100),
  tingkat_keparahan: z
    .nativeEnum(TingkatKeparahan)
    .optional()
    .default(TingkatKeparahan.SEDANG),
  deskripsi: z.string().optional(),
  tanggal_ditemukan: z.string().datetime().or(z.date()).optional(),
});

export const alergiAnakUpdateSchema = z.object({
  nama_alergen: z.string().min(1).max(100).optional(),
  tingkat_keparahan: z.nativeEnum(TingkatKeparahan).optional(),
  deskripsi: z.string().optional(),
  tanggal_ditemukan: z.string().datetime().or(z.date()).optional(),
});

// ============================================
// STANDAR WHO SCHEMAS
// ============================================

export const standarWHOQuerySchema = z.object({
  jenis_kelamin: z.nativeEnum(JenisKelamin),
  usia_bulan: z.number().int().min(0).max(60),
});

// ============================================
// TYPE INFERENCE
// ============================================

export type UserCreateSchemaType = z.infer<typeof userCreateSchema>;
export type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export type AnakCreateSchemaType = z.infer<typeof anakCreateSchema>;
export type AnakUpdateSchemaType = z.infer<typeof anakUpdateSchema>;

export type PertumbuhanAnakCreateSchemaType = z.infer<
  typeof pertumbuhanAnakCreateSchema
>;
export type PertumbuhanAnakUpdateSchemaType = z.infer<
  typeof pertumbuhanAnakUpdateSchema
>;
export type PertumbuhanFilterSchemaType = z.infer<
  typeof pertumbuhanFilterSchema
>;

export type RiwayatDiagnosaCreateSchemaType = z.infer<
  typeof riwayatDiagnosaCreateSchema
>;
export type RiwayatDiagnosaFilterSchemaType = z.infer<
  typeof riwayatDiagnosaFilterSchema
>;

export type RencanaGiziCreateSchemaType = z.infer<
  typeof rencanaGiziCreateSchema
>;
export type RencanaGiziUpdateSchemaType = z.infer<
  typeof rencanaGiziUpdateSchema
>;
export type RencanaGiziFilterSchemaType = z.infer<
  typeof rencanaGiziFilterSchema
>;

export type RekomendasiHarianCreateSchemaType = z.infer<
  typeof rekomendasiHarianCreateSchema
>;
export type RekomendasiHarianUpdateSchemaType = z.infer<
  typeof rekomendasiHarianUpdateSchema
>;
export type RekomendasiHarianFilterSchemaType = z.infer<
  typeof rekomendasiHarianFilterSchema
>;

export type DetailMakananCreateSchemaType = z.infer<
  typeof detailMakananCreateSchema
>;
export type DetailMakananUpdateSchemaType = z.infer<
  typeof detailMakananUpdateSchema
>;

export type NutrisiMakananCreateSchemaType = z.infer<
  typeof nutrisiMakananCreateSchema
>;
export type NutrisiMakananUpdateSchemaType = z.infer<
  typeof nutrisiMakananUpdateSchema
>;

export type ReminderMakanCreateSchemaType = z.infer<
  typeof reminderMakanCreateSchema
>;
export type ReminderMakanUpdateSchemaType = z.infer<
  typeof reminderMakanUpdateSchema
>;

export type AlergiAnakCreateSchemaType = z.infer<typeof alergiAnakCreateSchema>;
export type AlergiAnakUpdateSchemaType = z.infer<typeof alergiAnakUpdateSchema>;

export type StandarWHOQuerySchemaType = z.infer<typeof standarWHOQuerySchema>;
