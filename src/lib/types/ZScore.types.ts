export interface ZScoreStandarLengkap {
  median: string;
  minus_2sd: string;
  minus_3sd: string;
  plus_2sd: string;
  plus_3sd: string;
}

export interface ZScoreStandarLila {
  median: string;
  minus_2sd: string;
  minus_3sd: string;
}

export interface ZScoreItem<TStandar> {
  zScore: number | null;
  standar: TStandar;
  kategori: string;
}

export interface DetailZScore {
  usia_bulan: number;
  jenis_kelamin: "L" | "P";
  tinggi_badan: ZScoreItem<ZScoreStandarLengkap>;
  berat_badan: ZScoreItem<ZScoreStandarLengkap>;
  lila: ZScoreItem<ZScoreStandarLila>;
}
