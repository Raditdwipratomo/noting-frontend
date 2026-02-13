// ============================================
// DATABASE TYPES: APLIKASI PENCEGAHAN STUNTING
// ============================================

// ============================================
// ENUM TYPES
// ============================================

export enum JenisKelamin {
  LAKI_LAKI = "L",
  PEREMPUAN = "P",
}

export enum StatusStunting {
  NORMAL = "normal",
  BERISIKO = "berisiko",
  STUNTING = "stunting",
  SEVERELY_STUNTED = "severely_stunted",
}

export enum StatusRekomendasi {
  BELUM_DIMULAI = "belum_dimulai",
  SEDANG_BERJALAN = "sedang_berjalan",
  SELESAI = "selesai",
}

export enum WaktuMakan {
  SUSU_PAGI = "susu_pagi",
  MAKAN_PAGI = "makan_pagi",
  SNACK_PAGI = "snack_pagi",
  MAKAN_SIANG = "makan_siang",
  SNACK_SORE = "snack_sore",
  MAKAN_MALAM = "makan_malam",
  SUSU_MALAM = "susu_malam",
}

export enum TipeNotifikasi {
  PUSH = "push",
  EMAIL = "email",
  WHATSAPP = "whatsapp",
  SMS = "sms",
}

export enum TingkatKeparahan {
  RINGAN = "ringan",
  SEDANG = "sedang",
  BERAT = "berat",
}

export enum KategoriPertumbuhan {
  SANGAT_BURUK = "sangat buruk",
  BURUK = "buruk",
  NORMAL = "normal",
  BAIK = "baik",
  SANGAT_BAIK = "sangat baik",
}

// ============================================
// BASE ENTITY TYPES
// ============================================

export interface BaseEntity {
  created_at: Date;
  updated_at: Date;
}

// ============================================
// USER TYPES
// ============================================

export interface User extends BaseEntity {
  user_id: number;
  username: string;
  email: string;
  password: string;
  nama_lengkap: string;
  no_telepon: string | null;
  alamat: string | null;
}

export interface UserCreateInput {
  username: string;
  email: string;
  password: string;
  nama_lengkap: string;
  no_telepon?: string;
  alamat?: string;
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  password?: string;
  nama_lengkap?: string;
  no_telepon?: string;
  alamat?: string;
}

export interface UserResponse extends Omit<User, "password"> {}

// ============================================
// ANAK TYPES
// ============================================

export interface Anak extends BaseEntity {
  anak_id: number;
  user_id: number;
  nama_anak: string;
  jenis_kelamin: JenisKelamin;
  tanggal_lahir: Date;
  foto_profil: string | null;
  status_aktif: boolean;
}

export interface AnakCreateInput {
  user_id: number;
  nama_anak: string;
  jenis_kelamin: JenisKelamin;
  tanggal_lahir: Date | string;
  foto_profil?: string;
  status_aktif?: boolean;
}

export interface AnakUpdateInput {
  nama_anak?: string;
  jenis_kelamin?: JenisKelamin;
  tanggal_lahir?: Date | string;
  foto_profil?: string;
  status_aktif?: boolean;
}

export interface AnakWithUser extends Anak {
  user: UserResponse;
}

export interface AnakWithAge extends Anak {
  usia_bulan: number;
  usia_tahun: number;
}

// ============================================
// PERTUMBUHAN ANAK TYPES
// ============================================

export interface PertumbuhanAnak extends BaseEntity {
  id_pertumbuhan: number;
  anak_id: number;
  tanggal_pencatatan: Date;
  berat_badan_kg: number;
  tinggi_badan_cm: number;
  lingkar_lengan_atas_cm: number | null;
  lingkar_kepala_cm: number | null;
  kategori: KategoriPertumbuhan | null;
  catatan: string | null;
}

export interface PertumbuhanAnakCreateInput {
  anak_id: number;
  tanggal_pencatatan: Date | string;
  berat_badan_kg: number;
  tinggi_badan_cm: number;
  lingkar_lengan_atas_cm?: number;
  lingkar_kepala_cm?: number;
  kategori?: KategoriPertumbuhan;
  catatan?: string;
}

export interface PertumbuhanAnakUpdateInput {
  tanggal_pencatatan?: Date | string;
  berat_badan_kg?: number;
  tinggi_badan_cm?: number;
  lingkar_lengan_atas_cm?: number;
  lingkar_kepala_cm?: number;
  kategori?: KategoriPertumbuhan;
  catatan?: string;
}

export interface PertumbuhanAnakWithAnak extends PertumbuhanAnak {
  anak: Anak;
}

// ============================================
// STANDAR WHO TYPES
// ============================================

export interface StandarWHO {
  id: number;
  jenis_kelamin: JenisKelamin;
  usia_bulan: number;

  // Standar Tinggi Badan (TB/U)
  tb_minus_3sd: number | null;
  tb_minus_2sd: number | null;
  tb_median: number | null;
  tb_plus_2sd: number | null;
  tb_plus_3sd: number | null;

  // Standar Berat Badan (BB/U)
  bb_minus_3sd: number | null;
  bb_minus_2sd: number | null;
  bb_median: number | null;
  bb_plus_2sd: number | null;
  bb_plus_3sd: number | null;

  // Standar Lingkar Kepala (LK/U)
  lk_minus_3sd: number | null;
  lk_minus_2sd: number | null;
  lk_median: number | null;
  lk_plus_2sd: number | null;
  lk_plus_3sd: number | null;

  // Standar Lingkar Lengan Atas (LILA/U)
  lila_minus_3sd: number | null;
  lila_minus_2sd: number | null;
  lila_median: number | null;
  lila_plus_2sd: number | null;
  lila_plus_3sd: number | null;
}

export interface StandarWHOQuery {
  jenis_kelamin: JenisKelamin;
  usia_bulan: number;
}

// ============================================
// Z-SCORE CALCULATION TYPES
// ============================================

export interface ZScoreResult {
  value: number;
  status: string;
  kategori: string;
}

export interface ZScoreCalculation {
  z_score_tinggi_badan: ZScoreResult;
  z_score_berat_badan: ZScoreResult;
  z_score_berat_tinggi: ZScoreResult | null;
  z_score_lingkar_kepala: ZScoreResult | null;
  z_score_lingkar_lengan: ZScoreResult | null;
}

// ============================================
// RIWAYAT DIAGNOSA TYPES
// ============================================

export interface RiwayatDiagnosa {
  id_diagnosa: number;
  anak_id: number;
  pertumbuhan_id: number;
  tanggal_diagnosa: Date;
  status_stunting: StatusStunting;
  z_score_tinggi_badan: number | null;
  z_score_berat_badan: number | null;
  z_score_berat_tinggi: number | null;
  rekomendasi_tindakan: string | null;
  catatan: string | null;
  created_at: Date;
}

export interface RiwayatDiagnosaCreateInput {
  anak_id: number;
  pertumbuhan_id: number;
  tanggal_diagnosa: Date | string;
  status_stunting: StatusStunting;
  z_score_tinggi_badan?: number;
  z_score_berat_badan?: number;
  z_score_berat_tinggi?: number;
  rekomendasi_tindakan?: string;
  catatan?: string;
}

export interface RiwayatDiagnosaWithDetails extends RiwayatDiagnosa {
  anak: Anak;
  pertumbuhan: PertumbuhanAnak;
}

// ============================================
// RENCANA GIZI MINGGUAN TYPES
// ============================================

export interface RencanaGiziMingguan extends BaseEntity {
  id_rencana: number;
  anak_id: number;
  minggu_ke: number;
  tanggal_mulai: Date;
  tanggal_selesai: Date;
  progress: number;
  is_completed: boolean;
}

export interface RencanaGiziMingguanCreateInput {
  anak_id: number;
  minggu_ke: number;
  tanggal_mulai: Date | string;
  tanggal_selesai: Date | string;
  progress?: number;
  is_completed?: boolean;
}

export interface RencanaGiziMingguanUpdateInput {
  minggu_ke?: number;
  tanggal_mulai?: Date | string;
  tanggal_selesai?: Date | string;
  progress?: number;
  is_completed?: boolean;
}

export interface RencanaGiziMingguanWithDetails extends RencanaGiziMingguan {
  anak: Anak;
  rekomendasi_harian: RekomendasiHarian[];
}

// ============================================
// REKOMENDASI HARIAN TYPES
// ============================================

export interface RekomendasiHarian extends BaseEntity {
  id_rekomendasi_harian: number;
  id_rencana: number;
  anak_id: number;
  hari_ke: number;
  tanggal: Date;
  progress_harian: number;
  jumlah_makanan_total: number;
  status: StatusRekomendasi;
}

export interface RekomendasiHarianCreateInput {
  id_rencana: number;
  anak_id: number;
  hari_ke: number;
  tanggal: Date | string;
  progress_harian?: number;
  jumlah_makanan_total?: number;
  status?: StatusRekomendasi;
}

export interface RekomendasiHarianUpdateInput {
  tanggal?: Date | string;
  progress_harian?: number;
  jumlah_makanan_total?: number;
  status?: StatusRekomendasi;
}

export interface RekomendasiHarianWithDetails extends RekomendasiHarian {
  rencana_gizi: RencanaGiziMingguan;
  anak: Anak;
  detail_makanan: DetailMakananHarian[];
}

// ============================================
// DETAIL MAKANAN HARIAN TYPES
// ============================================

export interface DetailMakananHarian extends BaseEntity {
  id_detail: number;
  id_rekomendasi_harian: number;
  urutan_makanan: number;
  waktu_makan: WaktuMakan;
  status_konsumsi: boolean;
}

export interface DetailMakananHarianCreateInput {
  id_rekomendasi_harian: number;
  urutan_makanan: number;
  waktu_makan: WaktuMakan;
  status_konsumsi?: boolean;
}

export interface DetailMakananHarianUpdateInput {
  urutan_makanan?: number;
  waktu_makan?: WaktuMakan;
  status_konsumsi?: boolean;
}

export interface DetailMakananHarianWithNutrisi extends DetailMakananHarian {
  nutrisi: NutrisiMakanan | null;
}

// ============================================
// NUTRISI MAKANAN TYPES
// ============================================

export interface NutrisiMakanan {
  id_nutrisi: number;
  id_detail_makanan: number;
  protein_gram: number | null;
  lemak_gram: number | null;
  karbohidrat_gram: number | null;
  kalsium_mg: number | null;
  zat_besi_mg: number | null;
  zinc_mg: number | null;
  vitamin_a_iu: number | null;
  vitamin_d_iu: number | null;
  vitamin_c_mg: number | null;
  kalori_total: number | null;
  catatan: string | null;
}

export interface NutrisiMakananCreateInput {
  id_detail_makanan: number;
  protein_gram?: number;
  lemak_gram?: number;
  karbohidrat_gram?: number;
  kalsium_mg?: number;
  zat_besi_mg?: number;
  zinc_mg?: number;
  vitamin_a_iu?: number;
  vitamin_d_iu?: number;
  vitamin_c_mg?: number;
  kalori_total?: number;
  catatan?: string;
}

export interface NutrisiMakananUpdateInput {
  protein_gram?: number;
  lemak_gram?: number;
  karbohidrat_gram?: number;
  kalsium_mg?: number;
  zat_besi_mg?: number;
  zinc_mg?: number;
  vitamin_a_iu?: number;
  vitamin_d_iu?: number;
  vitamin_c_mg?: number;
  kalori_total?: number;
  catatan?: string;
}

export interface NutrisiSummary {
  total_protein: number;
  total_lemak: number;
  total_karbohidrat: number;
  total_kalsium: number;
  total_zat_besi: number;
  total_zinc: number;
  total_vitamin_a: number;
  total_vitamin_d: number;
  total_vitamin_c: number;
  total_kalori: number;
}

// ============================================
// REMINDER MAKAN TYPES
// ============================================

export interface ReminderMakan extends BaseEntity {
  id: number;
  anak_id: number;
  id_detail_makanan: number | null;
  waktu_reminder: string; // TIME format "HH:MM:SS"
  is_active: boolean;
  tipe_notifikasi: TipeNotifikasi;
  pesan_custom: string | null;
}

export interface ReminderMakanCreateInput {
  anak_id: number;
  id_detail_makanan?: number;
  waktu_reminder: string;
  is_active?: boolean;
  tipe_notifikasi?: TipeNotifikasi;
  pesan_custom?: string;
}

export interface ReminderMakanUpdateInput {
  id_detail_makanan?: number;
  waktu_reminder?: string;
  is_active?: boolean;
  tipe_notifikasi?: TipeNotifikasi;
  pesan_custom?: string;
}

export interface ReminderMakanWithDetails extends ReminderMakan {
  anak: Anak;
  detail_makanan: DetailMakananHarian | null;
}

// ============================================
// ALERGI ANAK TYPES
// ============================================

export interface AlergiAnak {
  id: number;
  anak_id: number;
  nama_alergen: string;
  tingkat_keparahan: TingkatKeparahan;
  deskripsi: string | null;
  tanggal_ditemukan: Date | null;
  created_at: Date;
}

export interface AlergiAnakCreateInput {
  anak_id: number;
  nama_alergen: string;
  tingkat_keparahan?: TingkatKeparahan;
  deskripsi?: string;
  tanggal_ditemukan?: Date | string;
}

export interface AlergiAnakUpdateInput {
  nama_alergen?: string;
  tingkat_keparahan?: TingkatKeparahan;
  deskripsi?: string;
  tanggal_ditemukan?: Date | string;
}

export interface AlergiAnakWithAnak extends AlergiAnak {
  anak: Anak;
}

// ============================================
// QUERY & FILTER TYPES
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface DateRangeFilter {
  start_date?: Date | string;
  end_date?: Date | string;
}

export interface PertumbuhanFilter extends PaginationParams, DateRangeFilter {
  anak_id?: number;
  kategori?: KategoriPertumbuhan;
}

export interface RiwayatDiagnosaFilter
  extends PaginationParams, DateRangeFilter {
  anak_id?: number;
  status_stunting?: StatusStunting;
}

export interface RencanaGiziFilter extends PaginationParams {
  anak_id?: number;
  minggu_ke?: number;
  is_completed?: boolean;
}

export interface RekomendasiHarianFilter
  extends PaginationParams, DateRangeFilter {
  anak_id?: number;
  id_rencana?: number;
  status?: StatusRekomendasi;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// ============================================
// STATISTICS & ANALYTICS TYPES
// ============================================

export interface PertumbuhanStats {
  total_pencatatan: number;
  rata_rata_berat_badan: number;
  rata_rata_tinggi_badan: number;
  pertumbuhan_berat_badan: number; // persentase
  pertumbuhan_tinggi_badan: number; // persentase
  latest_kategori: KategoriPertumbuhan | null;
}

export interface DiagnosaStats {
  total_diagnosa: number;
  status_terakhir: StatusStunting;
  jumlah_normal: number;
  jumlah_berisiko: number;
  jumlah_stunting: number;
  jumlah_severely_stunted: number;
}

export interface NutrisiStats {
  minggu_ini: NutrisiSummary;
  bulan_ini: NutrisiSummary;
  rata_rata_harian: NutrisiSummary;
}

export interface ProgressStats {
  total_hari: number;
  hari_selesai: number;
  persentase_kepatuhan: number;
  streak_hari_berturut: number;
}

export interface DashboardStats {
  anak: Anak;
  pertumbuhan: PertumbuhanStats;
  diagnosa: DiagnosaStats;
  nutrisi: NutrisiStats;
  progress: ProgressStats;
}

// ============================================
// CHART DATA TYPES
// ============================================

export interface ChartDataPoint {
  tanggal: Date | string;
  value: number;
  label?: string;
}

export interface GrowthChartData {
  tinggi_badan: ChartDataPoint[];
  berat_badan: ChartDataPoint[];
  standar_who: {
    tb_minus_2sd: ChartDataPoint[];
    tb_median: ChartDataPoint[];
    tb_plus_2sd: ChartDataPoint[];
    bb_minus_2sd: ChartDataPoint[];
    bb_median: ChartDataPoint[];
    bb_plus_2sd: ChartDataPoint[];
  };
}

export interface NutrisiChartData {
  labels: string[];
  protein: number[];
  lemak: number[];
  karbohidrat: number[];
  kalori: number[];
}

// ============================================
// UTILITY TYPES
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
