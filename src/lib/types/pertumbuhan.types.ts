import { DiagnosaAnalyze } from "./diagnosa.types";

export interface PertumbuhanResponse {
  id_pertumbuhan: number;
  anak_id: number;
  tanggal_pencatatan: string;
  berat_badan_kg: string;
  tinggi_badan_cm: string;
  lingkar_lengan_atas_cm: string;
  lingkar_kepala_cm: string;
  kategori: string;
  catatan: string;
  created_at: string;
  updated_at: string;
}

export interface DetailPertumbuhanResponse extends PertumbuhanResponse {
  anak: {
    anak_id: number;
    nama_anak: string;
    jenis_kelamin: "L" | "P";
    tanggal_lahir: string;
  };
}

export type ListPertumbuhanResponse = PertumbuhanResponse[];

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
}

export interface GetPertumbuhanResponse {
  data: ListPertumbuhanResponse;
  pagination: Pagination;
}

export interface DatasetsChart {
  berat_badan: number[];
  tinggi_badan: number[];
  lingkar_kepala: number[];
  lingkar_lengan_atas: number[];
}

interface Metadata {
  nama_anak: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  total_records: number;
}

export interface GrowthChartData {
  labels: string[];
  datasets: DatasetsChart;
  metadata: Metadata;
}

interface StatisticsRecord {
  tanggal: string;
  berat: string;
  tinggi: string;
}

export interface GrowthStatisticsResponse {
  total_records: number;
  first_record: StatisticsRecord;
  lastRecord: StatisticsRecord;
  total_growth: {
    berat: string;
    tinggi: string;
  };
}

export interface CreateGrowthResponse {
  pertumbuhan: PertumbuhanResponse;
  diagnosa: DiagnosaAnalyze;
}

export interface CreateGrowthRequest {
  berat_badan_kg: number;
  tinggi_badan_cm: number;
  lingkar_lengan_atas_cm: number;
  lingkar_kepala_cm: number;
  catatan: string;
}


