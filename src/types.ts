export type Semester = 1 | 2;

export interface Profile {
  guru: string;
  nip: string;
  sekolah: string;
  mapel: string;
  fase: string;
  kelas: string;
  ta: string;
  kepsek: string;
  nipKs: string;
  kota: string;
  tgl: string;
  jp: number;
  menit: number;
  b1: number;
  b2: number;
  b3: number;
  pakaiKop?: boolean;
  kopBaris1?: string;
  kopBaris2?: string;
  kopBidang?: string;
  kopAlamat?: string;
  kopKontak?: string;
  logoKiri?: string;
  logoKanan?: string;
  ukuranLogo?: number;
}

export interface MonthItem {
  id: string;
  sem: Semester;
  nama: string;
  n: number;
  off: number[]; // indices of ineffective weeks (0-indexed)
  ket: string;
}

export interface CpItem {
  id: string;
  elemen: string;
  teks: string;
}

export interface UnitItem {
  id: string;
  sem: Semester;
  nama: string;
  cpId: string;
}

export interface TpItem {
  id: string;
  unitId: string;
  teks: string;
  jp: number;
  ind: string;
  r1: string;
  r2: string;
  r3: string;
  r4: string;
  teknik: string;
}

export interface ModulItem {
  awal?: string;
  dimensi?: string[];
  sarana?: string;
  target?: string;
  model?: string;
  pemahaman?: string;
  pemantik?: string;
  pendahuluan?: string;
  memahami?: string;
  mengaplikasi?: string;
  merefleksi?: string;
  penutup?: string;
  diagnostik?: string;
  formatif?: string;
  sumatif?: string;
  remedial?: string;
  pengayaan?: string;
  refGuru?: string;
  refSiswa?: string;
  pustaka?: string;
}

export interface LkpdItem {
  judul?: string;
  petunjuk?: string;
  tujuan?: string;
  alat?: string;
  kegiatan?: string;
  tugas?: string;
  baris?: number;
  kesimpulan?: string;
  refleksi?: string;
}

export interface KaldikEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  cat: 'libur-nasional' | 'libur-semester' | 'asesmen' | 'kegiatan';
  markWeekOff?: boolean;
}

export interface SoalPgItem {
  id: string;
  tpKode: string;
  indikatorSoal: string;
  levelKognitif: string;
  tanya: string;
  opsi: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  kunci: 'A' | 'B' | 'C' | 'D' | 'E';
  pembahasan: string;
}

export interface SoalEssayItem {
  id: string;
  tpKode: string;
  indikatorSoal: string;
  levelKognitif: string;
  tanya: string;
  kunci: string;
  skor: number;
}

export interface SoalPkg {
  unitId: string;
  jenisUjian: string;
  waktuMenit: number;
  topikFokus: string;
  kesulitan: string;
  jmlPg: number;
  jmlEssay: number;
  petunjuk: string;
  cetakKisi?: boolean;
  cetakNaskah?: boolean;
  cetakKunci?: boolean;
  pg: SoalPgItem[];
  essay: SoalEssayItem[];
}

export interface AppState {
  v: number;
  sample: boolean;
  ui: {
    tab: string;
    sem: Semester;
    doc: Record<string, boolean>;
    unit: string | null;
    unitL: string | null;
    unitS?: string | null;
  };
  profil: Profile;
  bulan: MonthItem[];
  kaldik?: KaldikEvent[];
  cetakKaldik?: boolean;
  cp: CpItem[];
  unit: UnitItem[];
  tp: TpItem[];
  promes: Record<string, string[]>; // tpId -> array of "monthId:weekIndex"
  modul: Record<string, ModulItem>;
  lkpd: Record<string, LkpdItem>;
  soal?: Record<string, SoalPkg>;
}

