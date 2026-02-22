/* ===================== */
/* Enums / Unions        */
/* ===================== */

export type TingkatKeparahan = "ringan" | "sedang" | "berat";

/* ===================== */
/* Alergi                */
/* ===================== */

export interface AlergiResponse {
  id: number;
  anak_id: number;
  nama_alergen: string;
  tingkat_keparahan: TingkatKeparahan;
  deskripsi?: string | null;
  tanggal_ditemukan?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAlergiRequest {
  nama_alergen: string;
  tingkat_keparahan: TingkatKeparahan;
  deskripsi?: string;
  tanggal_ditemukan?: string;
}

export type UpdateAlergiRequest = Partial<CreateAlergiRequest>;

/* ===================== */
/* Summary               */
/* ===================== */

export interface AlergiSummaryResponse {
  total: number;
  by_severity: Partial<Record<TingkatKeparahan, number>>;
  list: string[];
  severe_allergies: string[];
}
