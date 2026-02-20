export interface DiagnosaResponseData {
  id_diagnosa: number;
  anak_id: number;
  pertumbuhan_id: number;
  tanggal_diagnosa: string;
  status_stunting: string;
  z_score_tinggi_badan: string;
  z_score_berat_badan: string;
  z_score_berat_tinggi: string;
  rekomendasi_tindakan: string;
  catatan: string;
  created_at: string;
  pertumbuhan: {
    berat_badan_kg: string;
    tinggi_badan_cm: string;
    lingkar_lengan_atas_cm: string;
  };
}

export interface DiagnosaSummaryReponse {
  total_diagnosa: number;
  status_counts: {
    normal: number;
  };
  latest_status: string;
  latest_date: string;
  trend: string | null;
  trend_description: string;
}

export interface DiagnosaAnalyzeResponse {
  diagnosa: DiagnosaAnalyze;
  pertumbuhan_analyzed: PertumbuhanAnalyzed;
}

export interface DiagnosaAnalyze {
  status_stunting: "normal" | "stunted" | "severely_stunted";
  z_score_tinggi_badan: number | null;
  z_score_berat_badan: number | null;
  z_score_lila: number | null;

  kategori_tinggi: KategoriTinggi;
  kategori_berat: KategoriBerat;
  kategori_lila: KategoriLila;

  tingkat_keparahan: "normal" | "ringan" | "sedang" | "berat";

  rekomendasi_tindakan: string[];
  rekomendasi_gizi: string[];
  catatan: string[];

  detail_zscore: DetailZScore;
}

/* ===================== */
/* Detail Z-Score */
/* ===================== */

export interface DetailZScore {
  usia_bulan: number;
  jenis_kelamin: "L" | "P";

  tinggi_badan: ZScoreDetailTinggi;
  berat_badan: ZScoreDetailBerat;
  lila: ZScoreDetailLila;
}

export interface ZScoreDetailTinggi {
  zScore: number | null;
  standar: StandarLengkap;
  kategori: KategoriTinggi;
}

export interface ZScoreDetailBerat {
  zScore: number | null;
  standar: StandarLengkap;
  kategori: KategoriBerat;
}

export interface ZScoreDetailLila {
  zScore: number | null;
  standar: StandarLila;
  kategori: KategoriLila;
}

/* ===================== */
/* Standar */
/* ===================== */

export interface StandarLengkap {
  median: string;
  minus_2sd: string;
  minus_3sd: string;
  plus_2sd: string;
  plus_3sd: string;
}

export interface StandarLila {
  median: string;
  minus_2sd: string;
  minus_3sd: string;
}

/* ===================== */
/* Pertumbuhan */
/* ===================== */

export interface PertumbuhanAnalyzed {
  tanggal: string; // ISO date (YYYY-MM-DD)
  berat_badan_kg: string;
  tinggi_badan_cm: string;
  lingkar_lengan_atas_cm: string;
  lingkar_kepala_cm: string;
}

/* ===================== */
/* Enum-like Unions */
/* ===================== */

export type KategoriTinggi =
  | "very_short"
  | "short"
  | "normal"
  | "tall"
  | "very_tall";

export type KategoriBerat =
  | "severely_underweight"
  | "underweight"
  | "normal"
  | "overweight"
  | "obese";

export type KategoriLila = "severely_low" | "low" | "normal" | "above_normal";
