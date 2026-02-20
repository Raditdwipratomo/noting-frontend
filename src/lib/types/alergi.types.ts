// lib/types/alergi.types.ts

/* ===================== */
/* Enums / Unions        */
/* ===================== */

export type TingkatKeparahan = "ringan" | "sedang" | "berat";

export type JenisAlergi =
  | "makanan"
  | "obat"
  | "lingkungan"
  | "serangga"
  | "lainnya";

/* ===================== */
/* Alergi                */
/* ===================== */

export interface AlergiResponse {
  id_alergi: number;
  anak_id: number;
  nama_alergi: string;
  jenis_alergi: JenisAlergi;
  tingkat_keparahan: TingkatKeparahan;
  gejala: string;
  catatan?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAlergiRequest {
  nama_alergi: string;
  jenis_alergi: JenisAlergi;
  tingkat_keparahan: TingkatKeparahan;
  gejala: string;
  catatan?: string;
}

export type UpdateAlergiRequest = Partial<CreateAlergiRequest>;

/* ===================== */
/* Summary               */
/* ===================== */

export interface AlergiSummaryResponse {
  total_alergi: number;
  by_jenis: Partial<Record<JenisAlergi, number>>;
  by_tingkat_keparahan: Partial<Record<TingkatKeparahan, number>>;
  alergi_berat: AlergiResponse[];
}
