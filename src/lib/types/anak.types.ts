import { PertumbuhanResponse } from "./pertumbuhan.types";

export interface GetAnakResponse {
  anak_id: number;
  user_id: number;
  nama_anak: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  foto_profil: string | null;
  status_aktif: boolean;
  created_at: string;
  updated_at: string;
}

export type GetAllAnakResponse = GetAnakResponse[];

export interface CreateAnakRequest {
  nama_anak: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  foto_profil?: string | null;
  status_aktif: boolean;
  berat_badan_kg: number;
  tinggi_badan_cm: number;
  lingkar_lengan_atas_cm: number;
  lingkar_kepala_cm: number;
  catatan: string;
}

export interface CreateAnakResponse {
  anak: GetAnakResponse;
  pertumbuhan: PertumbuhanResponse;
}
