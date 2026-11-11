import { KaldikEvent, MonthItem, Semester } from '../types';

export const MONTH_MAP: Record<string, { monthIdx: number; sem: Semester }> = {
  juli: { monthIdx: 6, sem: 1 },
  agustus: { monthIdx: 7, sem: 1 },
  september: { monthIdx: 8, sem: 1 },
  oktober: { monthIdx: 9, sem: 1 },
  november: { monthIdx: 10, sem: 1 },
  desember: { monthIdx: 11, sem: 1 },
  januari: { monthIdx: 0, sem: 2 },
  februari: { monthIdx: 1, sem: 2 },
  maret: { monthIdx: 2, sem: 2 },
  april: { monthIdx: 3, sem: 2 },
  mei: { monthIdx: 4, sem: 2 },
  juni: { monthIdx: 5, sem: 2 },
};

export const CATEGORY_META: Record<
  KaldikEvent['cat'],
  { label: string; bg: string; text: string; border: string; dot: string; defaultWeekOff: boolean }
> = {
  'libur-nasional': {
    label: 'Libur Nasional / Cuti Bersama',
    bg: 'bg-red-100 dark:bg-red-950/70',
    text: 'text-red-800 dark:text-red-200',
    border: 'border-red-300 dark:border-red-800',
    dot: 'bg-red-600',
    defaultWeekOff: false,
  },
  'libur-semester': {
    label: 'Libur Semester / Ramadan & Idul Fitri (Kaldik Jabar)',
    bg: 'bg-amber-100 dark:bg-amber-950/70',
    text: 'text-amber-900 dark:text-amber-200',
    border: 'border-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500',
    defaultWeekOff: true,
  },
  asesmen: {
    label: 'Asesmen (ASTS / PSAS / PSAT / UKK / ANBK Jabar)',
    bg: 'bg-blue-100 dark:bg-blue-950/70',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-300 dark:border-blue-800',
    dot: 'bg-blue-600',
    defaultWeekOff: true,
  },
  kegiatan: {
    label: 'MPLS / SmartTren / Titimangsa Rapor Disdik Jabar',
    bg: 'bg-purple-100 dark:bg-purple-950/70',
    text: 'text-purple-800 dark:text-purple-200',
    border: 'border-purple-300 dark:border-purple-800',
    dot: 'bg-purple-600',
    defaultWeekOff: true,
  },
};

export function getCurrentDefaultTahunAjaran(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0=Jan..11=Dec
  // In Indonesia, new school year starts in July (month 6)
  if (m >= 6) {
    return `${y}/${y + 1}`;
  }
  return `${y - 1}/${y}`;
}

export function parseTahunAjaran(ta?: string): { startYear: number; endYear: number } {
  const match = String(ta || '').match(/(20\d{2})\s*[/\-]\s*(20\d{2})/);
  if (match) {
    const s = Number(match[1]);
    const e = Number(match[2]);
    if (e === s + 1) return { startYear: s, endYear: e };
  }
  const single = String(ta || '').match(/(20\d{2})/);
  if (single) {
    const s = Number(single[1]);
    return { startYear: s, endYear: s + 1 };
  }
  return { startYear: 2026, endYear: 2027 };
}

export interface CalendarDayCell {
  day: number | null; // 1..31 or null if padding from prev/next month
  dateStr: string | null; // YYYY-MM-DD
  dayOfWeek: number; // 0 = Mon .. 6 = Sun
  isSunday: boolean;
}

export interface CalendarWeekRow {
  weekRowIndex: number;
  schoolWeekIndex: number | null; // 0-indexed effective school week (null if < 3 days in this month)
  activeDaysCount: number; // Mon-Sat days in this month
  days: CalendarDayCell[];
}

export interface CalendarMonthGrid {
  year: number;
  monthIdx: number; // 0..11
  daysInMonth: number;
  schoolWeeksCount: number;
  weeks: CalendarWeekRow[];
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Helper to find the N-th weekday (1=Mon..5=Fri, 6=Sat, 0=Sun) of a given month (0..11)
 */
function getNthWeekdayOfMonth(year: number, monthIdx: number, jsWeekday: number, nth: number): string {
  const firstDay = new Date(year, monthIdx, 1).getDay();
  const diff = (jsWeekday - firstDay + 7) % 7;
  const day = 1 + diff + (nth - 1) * 7;
  const maxDay = new Date(year, monthIdx + 1, 0).getDate();
  const clamped = Math.min(day, maxDay);
  return `${year}-${pad2(monthIdx + 1)}-${pad2(clamped)}`;
}

const MONTH_NAMES_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function formatIndoDate(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const mIdx = Number(parts[1]) - 1;
  return `${Number(parts[2])} ${MONTH_NAMES_ID[mIdx] || parts[1]} ${parts[0]}`;
}

/**
 * Builds a Monday-first calendar grid for a given year & month (0..11).
 * A row counts as an official school week (Minggu ke-1, ke-2, ...) if it has >= 3 active school days (Mon–Sat) in that month.
 */
export function buildMonthGrid(year: number, monthIdx: number): CalendarMonthGrid {
  const firstDayJs = new Date(year, monthIdx, 1).getDay(); // 0=Sun..6=Sat
  const startOffset = (firstDayJs + 6) % 7; // 0=Mon..6=Sun
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  const rawRows: CalendarWeekRow[] = [];

  let schoolWeekCounter = 0;

  for (let r = 0; r < totalCells / 7; r++) {
    const days: CalendarDayCell[] = [];
    let activeDaysCount = 0;

    for (let c = 0; c < 7; c++) {
      const cellIdx = r * 7 + c;
      const dayNum = cellIdx - startOffset + 1;
      const isValid = dayNum >= 1 && dayNum <= daysInMonth;
      const isSunday = c === 6;

      if (isValid && !isSunday) {
        activeDaysCount++;
      }

      days.push({
        day: isValid ? dayNum : null,
        dateStr: isValid ? `${year}-${pad2(monthIdx + 1)}-${pad2(dayNum)}` : null,
        dayOfWeek: c,
        isSunday,
      });
    }

    const isSchoolWeek = activeDaysCount >= 3;
    const assignedIdx = isSchoolWeek ? schoolWeekCounter++ : null;

    rawRows.push({
      weekRowIndex: r,
      schoolWeekIndex: assignedIdx,
      activeDaysCount,
      days,
    });
  }

  return {
    year,
    monthIdx,
    daysInMonth,
    schoolWeeksCount: schoolWeekCounter,
    weeks: rawRows,
  };
}

export interface JabarMilestoneSummary {
  hpmsGanjil: string;
  mpls: string;
  astsGanjil: string;
  psasGanjil: string;
  raporGanjil: string;
  liburGanjil: string;
  hpmsGenap: string;
  smartTrenRamadan: string;
  ukkPsaj: string;
  psatGenap: string;
  raporGenap: string;
  liburAkhirTahun: string;
}

export function getJabarMilestoneSummary(ta?: string): JabarMilestoneSummary {
  const { startYear, endYear } = parseTahunAjaran(ta);
  const events = getDefaultKaldikEvents(`${startYear}/${endYear}`);

  const findEv = (kw: string, fallback: string) => {
    const found = events.find(e => e.title.toLowerCase().includes(kw.toLowerCase()));
    return found ? `${formatIndoDate(found.date)} (${found.title})` : fallback;
  };

  const hpms1 = events.find(e => e.title.includes('HPMS') || e.title.includes('MPLS'));
  const psas = events.find(e => e.title.includes('PSAS'));
  const rapor1 = events.find(e => e.title.includes('Rapor Semester 1'));
  const smartTren = events.find(e => e.title.includes('SmartTren') || e.title.includes('Awal Ramadan'));
  const ukk = events.find(e => e.title.includes('UKK'));
  const psat = events.find(e => e.title.includes('PSAT'));
  const rapor2 = events.find(e => e.title.includes('Rapor Semester 2'));

  return {
    hpmsGanjil: hpms1 ? formatIndoDate(hpms1.date) : `13 Juli ${startYear}`,
    mpls: hpms1 ? `${formatIndoDate(hpms1.date)} — MPLS & Masa Orientasi Kepramukaan Jabar` : `Minggu ke-3 Juli ${startYear}`,
    astsGanjil: findEv('ASTS', `Minggu ke-4 September ${startYear}`),
    psasGanjil: psas ? `${formatIndoDate(psas.date)} (PSAS / ASAS Ganjil)` : `Minggu ke-1 Desember ${startYear}`,
    raporGanjil: rapor1 ? `${formatIndoDate(rapor1.date)} (Titimangsa Rapor Smt 1 Disdik Jabar)` : `Jumat Minggu ke-3 Desember ${startYear}`,
    liburGanjil: `Akhir Desember ${startYear} – Awal Januari ${endYear}`,
    hpmsGenap: findEv('Semester 2 (Genap)', `Minggu ke-1 Januari ${endYear}`),
    smartTrenRamadan: smartTren ? `${formatIndoDate(smartTren.date)} (SmartTren Ramadan Disdik Jabar)` : `Bulan Ramadan ${endYear}`,
    ukkPsaj: ukk ? `${formatIndoDate(ukk.date)} (UKK SMK & PSAJ Jawa Barat)` : `April ${endYear}`,
    psatGenap: psat ? `${formatIndoDate(psat.date)} (PSAT / ASAT Kenaikan Kelas)` : `Juni ${endYear}`,
    raporGenap: rapor2 ? `${formatIndoDate(rapor2.date)} (Titimangsa Rapor Smt 2 Disdik Jabar)` : `Jumat Minggu ke-4 Juni ${endYear}`,
    liburAkhirTahun: `Akhir Juni – Pertengahan Juli ${endYear} (SPMB/PPDB Jabar)`,
  };
}

/**
 * Generates dynamic Kalender Pendidikan Provinsi Jawa Barat events for ANY year if not in static table.
 */
function buildDynamicJabarEventsForYear(
  year: number
): Array<{ date: string; title: string; cat: KaldikEvent['cat']; markWeekOff?: boolean }> {
  // Semester Genap (Jan - Jun of `year`)
  const hpmsGenap = getNthWeekdayOfMonth(year, 0, 1, 1) === `${year}-01-01`
    ? getNthWeekdayOfMonth(year, 0, 1, 2)
    : getNthWeekdayOfMonth(year, 0, 1, 1);
  const ukkDate = getNthWeekdayOfMonth(year, 3, 1, 1); // 1st Monday of April
  const astsGenap = getNthWeekdayOfMonth(year, 4, 1, 2); // 2nd Monday of May
  const psatGenap = getNthWeekdayOfMonth(year, 5, 1, 2); // 2nd Monday of June
  const olahNilaiGenap = getNthWeekdayOfMonth(year, 5, 1, 3); // 3rd Monday of June
  const raporGenap = getNthWeekdayOfMonth(year, 5, 5, 4); // 4th Friday of June
  const liburAkhirTahun = getNthWeekdayOfMonth(year, 5, 1, 4); // 4th Monday of June

  // Semester Ganjil (Jul - Dec of `year`)
  const liburAwalJuli = getNthWeekdayOfMonth(year, 6, 1, 1); // 1st Monday of July (Libur Akhir Tahun & SPMB Jabar)
  const spmbJuli = getNthWeekdayOfMonth(year, 6, 1, 2); // 2nd Monday of July
  const hpmsGanjil = getNthWeekdayOfMonth(year, 6, 1, 3); // 3rd Monday of July
  const anbkAgustus = getNthWeekdayOfMonth(year, 7, 1, 3); // 3rd Monday of August
  const astsGanjil = getNthWeekdayOfMonth(year, 8, 1, 4); // 4th Monday of September
  const psasGanjil = getNthWeekdayOfMonth(year, 11, 1, 1); // 1st Monday of December
  const olahNilaiGanjil = getNthWeekdayOfMonth(year, 11, 1, 3); // 3rd Monday of December
  const raporGanjil = getNthWeekdayOfMonth(year, 11, 5, 3); // 3rd Friday of December
  const liburGanjil = getNthWeekdayOfMonth(year, 11, 1, 4); // 4th Monday of December

  return [
    // Jan - Jun
    { date: `${year}-01-01`, title: 'Tahun Baru Masehi & Libur Semester 1 Kaldik Jabar', cat: 'libur-nasional', markWeekOff: true },
    { date: hpmsGenap, title: 'Hari Pertama Masuk Sekolah Semester 2 (Genap) Jabar', cat: 'kegiatan' },
    { date: getNthWeekdayOfMonth(year, 1, 1, 2), title: 'Kegiatan SmartTren Ramadan / Penumbuhan Budi Pekerti Jabar', cat: 'kegiatan' },
    { date: getNthWeekdayOfMonth(year, 2, 1, 1), title: 'Libur Sekitar Hari Raya Idul Fitri (Disdik Jabar)', cat: 'libur-semester', markWeekOff: true },
    { date: getNthWeekdayOfMonth(year, 2, 1, 2), title: 'Hari Raya Idul Fitri & Cuti Bersama (Kaldik Jabar)', cat: 'libur-nasional', markWeekOff: true },
    { date: ukkDate, title: 'Uji Kompetensi Keahlian (UKK) SMK & PSAJ Jawa Barat', cat: 'asesmen', markWeekOff: true },
    { date: `${year}-05-01`, title: 'Hari Buruh Internasional', cat: 'libur-nasional' },
    { date: astsGenap, title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap', cat: 'asesmen', markWeekOff: true },
    { date: `${year}-06-01`, title: 'Hari Lahir Pancasila', cat: 'libur-nasional' },
    { date: psatGenap, title: 'Penilaian Sumatif Akhir Tahun (PSAT / ASAT) Kenaikan Kelas', cat: 'asesmen', markWeekOff: true },
    { date: olahNilaiGenap, title: 'Pengolahan Nilai Rapor & PORSENI Semester 2 Jabar', cat: 'kegiatan', markWeekOff: true },
    { date: raporGenap, title: 'Titimangsa & Pembagian Rapor Semester 2 (Disdik Jabar)', cat: 'kegiatan', markWeekOff: true },
    { date: liburAkhirTahun, title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },

    // Jul - Dec
    { date: liburAwalJuli, title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },
    { date: spmbJuli, title: 'Daftar Ulang SPMB/PPDB & Persiapan Tahun Ajaran Baru Jabar', cat: 'libur-semester', markWeekOff: true },
    { date: hpmsGanjil, title: 'Hari Pertama Masuk Sekolah (HPMS), MPLS & Kepramukaan Jabar', cat: 'kegiatan', markWeekOff: true },
    { date: `${year}-08-17`, title: 'HUT Kemerdekaan Republik Indonesia', cat: 'libur-nasional' },
    { date: anbkAgustus, title: 'Pelaksanaan ANBK SMK/SMA Sederajat Provinsi Jawa Barat', cat: 'asesmen' },
    { date: astsGanjil, title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil Kaldik Jabar', cat: 'asesmen', markWeekOff: true },
    { date: psasGanjil, title: 'Penilaian Sumatif Akhir Semester (PSAS / ASAS) Ganjil', cat: 'asesmen', markWeekOff: true },
    { date: olahNilaiGanjil, title: 'Pengolahan Nilai Rapor & PORSENI Semester 1 Jabar', cat: 'kegiatan', markWeekOff: true },
    { date: raporGanjil, title: 'Titimangsa & Pembagian Rapor Semester 1 (Disdik Jabar)', cat: 'kegiatan', markWeekOff: true },
    { date: liburGanjil, title: 'Libur Semester 1 (Ganjil) Kaldik Provinsi Jawa Barat', cat: 'libur-semester', markWeekOff: true },
    { date: `${year}-12-25`, title: 'Hari Raya Natal & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
  ];
}

/**
 * Generates official Kalender Pendidikan Provinsi Jawa Barat (Dinas Pendidikan Provinsi Jawa Barat) events for a given Tahun Pelajaran.
 */
export function getDefaultKaldikEvents(ta?: string): KaldikEvent[] {
  const { startYear, endYear } = parseTahunAjaran(ta);

  // Pedoman Kalender Pendidikan Dinas Pendidikan Provinsi Jawa Barat (SMA/SMK/SLB & Satuan Pendidikan Jabar)
  const presetsByYear: Record<
    number,
    Array<{ date: string; title: string; cat: KaldikEvent['cat']; markWeekOff?: boolean }>
  > = {
    2024: [
      { date: '2024-07-01', title: 'Libur Akhir Tahun Pelajaran & PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },
      { date: '2024-07-08', title: 'Daftar Ulang PPDB & Persiapan Tahun Ajaran Baru Jabar', cat: 'libur-semester', markWeekOff: true },
      { date: '2024-07-15', title: 'Hari Pertama Masuk Sekolah (HPMS) & MPLS Disdik Jabar', cat: 'kegiatan', markWeekOff: true },
      { date: '2024-08-17', title: 'HUT Kemerdekaan Republik Indonesia', cat: 'libur-nasional' },
      { date: '2024-08-19', title: 'Pelaksanaan ANBK SMK/SMA Provinsi Jawa Barat', cat: 'asesmen' },
      { date: '2024-09-16', title: 'Libur Maulid Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2024-09-23', title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2024-12-02', title: 'Penilaian Sumatif Akhir Semester (PSAS / ASAS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2024-12-16', title: 'Jeda Semester & Pengolahan Nilai Rapor Ganjil', cat: 'kegiatan', markWeekOff: true },
      { date: '2024-12-20', title: 'Titimangsa & Pembagian Rapor Semester 1 (Disdik Jabar)', cat: 'kegiatan', markWeekOff: true },
      { date: '2024-12-23', title: 'Libur Semester 1 (Ganjil) Kaldik Jawa Barat', cat: 'libur-semester', markWeekOff: true },
      { date: '2024-12-25', title: 'Hari Raya Natal & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
    ],
    2025: [
      // Semester Genap 2024/2025 (Jan-Jun 2025) - Kaldik Jabar
      { date: '2025-01-01', title: 'Tahun Baru Masehi & Libur Semester 1 Kaldik Jabar', cat: 'libur-nasional', markWeekOff: true },
      { date: '2025-01-06', title: 'Hari Pertama Masuk Sekolah Semester 2 (Genap) Jabar', cat: 'kegiatan' },
      { date: '2025-01-27', title: 'Libur Isra Mikraj Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2025-01-29', title: 'Libur Tahun Baru Imlek 2576 Kongzili', cat: 'libur-nasional' },
      { date: '2025-03-03', title: 'Libur Awal Ramadan 1446 H & SmartTren Ramadan Disdik Jabar', cat: 'kegiatan', markWeekOff: true },
      { date: '2025-03-24', title: 'Libur Sekitar Hari Raya Idul Fitri 1446 H (Kaldik Jabar)', cat: 'libur-semester', markWeekOff: true },
      { date: '2025-03-29', title: 'Hari Suci Nyepi Tahun Baru Saka 1947', cat: 'libur-nasional', markWeekOff: true },
      { date: '2025-03-31', title: 'Hari Raya Idul Fitri 1446 H & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
      { date: '2025-04-14', title: 'Uji Kompetensi Keahlian (UKK) SMK & PSAJ Jawa Barat', cat: 'asesmen', markWeekOff: true },
      { date: '2025-04-18', title: 'Wafat Yesus Kristus (Jumat Agung)', cat: 'libur-nasional' },
      { date: '2025-05-01', title: 'Hari Buruh Internasional', cat: 'libur-nasional' },
      { date: '2025-05-12', title: 'Hari Raya Waisak 2569 BE', cat: 'libur-nasional' },
      { date: '2025-05-29', title: 'Kenaikan Yesus Kristus', cat: 'libur-nasional' },
      { date: '2025-06-01', title: 'Hari Lahir Pancasila', cat: 'libur-nasional' },
      { date: '2025-06-06', title: 'Hari Raya Idul Adha 1446 H', cat: 'libur-nasional' },
      { date: '2025-06-09', title: 'Penilaian Sumatif Akhir Tahun (PSAT / ASAT) Kenaikan Kelas', cat: 'asesmen', markWeekOff: true },
      { date: '2025-06-20', title: 'Titimangsa & Pembagian Rapor Semester 2 (Disdik Jabar)', cat: 'kegiatan' },
      { date: '2025-06-23', title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },

      // Semester Ganjil 2025/2026 (Jul-Des 2025) - Kaldik Jabar
      { date: '2025-07-01', title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },
      { date: '2025-07-07', title: 'Daftar Ulang SPMB/PPDB & Persiapan Tahun Ajaran Baru Jabar', cat: 'libur-semester', markWeekOff: true },
      { date: '2025-07-14', title: 'Hari Pertama Masuk Sekolah (HPMS), MPLS & Kepramukaan Jabar', cat: 'kegiatan', markWeekOff: true },
      { date: '2025-08-17', title: 'HUT Kemerdekaan RI ke-80', cat: 'libur-nasional' },
      { date: '2025-08-18', title: 'Pelaksanaan ANBK SMK/SMA Sederajat Provinsi Jawa Barat', cat: 'asesmen' },
      { date: '2025-09-05', title: 'Libur Maulid Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2025-09-22', title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil Kaldik Jabar', cat: 'asesmen', markWeekOff: true },
      { date: '2025-12-01', title: 'Penilaian Sumatif Akhir Semester (PSAS / ASAS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2025-12-15', title: 'Pengolahan Nilai & PORSENI / Classmeeting Semester 1', cat: 'kegiatan', markWeekOff: true },
      { date: '2025-12-19', title: 'Titimangsa & Pembagian Rapor Semester 1 (Disdik Jabar)', cat: 'kegiatan', markWeekOff: true },
      { date: '2025-12-22', title: 'Libur Semester 1 (Ganjil) Kaldik Provinsi Jawa Barat', cat: 'libur-semester', markWeekOff: true },
      { date: '2025-12-25', title: 'Hari Raya Natal & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
    ],
    2026: [
      // Semester Genap 2025/2026 (Jan-Jun 2026) - Kaldik Jabar
      { date: '2026-01-01', title: 'Tahun Baru Masehi & Libur Semester 1 Kaldik Jabar', cat: 'libur-nasional', markWeekOff: true },
      { date: '2026-01-05', title: 'Hari Pertama Masuk Sekolah Semester 2 (Genap) Jabar', cat: 'kegiatan' },
      { date: '2026-01-16', title: 'Libur Isra Mikraj Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2026-02-17', title: 'Tahun Baru Imlek 2577 Kongzili', cat: 'libur-nasional' },
      { date: '2026-02-18', title: 'Prakiraan Libur Awal Ramadan 1447 H (Kaldik Jabar)', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-02-23', title: 'Kegiatan SmartTren Ramadan / Penumbuhan Budi Pekerti Jabar', cat: 'kegiatan' },
      { date: '2026-03-16', title: 'Libur Sekitar Hari Raya Idul Fitri 1447 H (Disdik Jabar)', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-03-19', title: 'Hari Suci Nyepi Tahun Baru Saka 1948', cat: 'libur-nasional', markWeekOff: true },
      { date: '2026-03-20', title: 'Hari Raya Idul Fitri 1447 H & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
      { date: '2026-03-23', title: 'Cuti Bersama & Libur Hari Raya Idul Fitri 1447 H', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-04-03', title: 'Wafat Yesus Kristus (Jumat Agung)', cat: 'libur-nasional' },
      { date: '2026-04-06', title: 'Uji Kompetensi Keahlian (UKK) SMK & PSAJ Jawa Barat', cat: 'asesmen', markWeekOff: true },
      { date: '2026-05-01', title: 'Hari Buruh Internasional', cat: 'libur-nasional' },
      { date: '2026-05-11', title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap', cat: 'asesmen', markWeekOff: true },
      { date: '2026-05-14', title: 'Kenaikan Yesus Kristus', cat: 'libur-nasional' },
      { date: '2026-05-27', title: 'Hari Raya Idul Adha 1447 H', cat: 'libur-nasional' },
      { date: '2026-05-31', title: 'Hari Raya Waisak 2570 BE', cat: 'libur-nasional' },
      { date: '2026-06-01', title: 'Hari Lahir Pancasila', cat: 'libur-nasional' },
      { date: '2026-06-08', title: 'Penilaian Sumatif Akhir Tahun (PSAT / ASAT) Kenaikan Kelas', cat: 'asesmen', markWeekOff: true },
      { date: '2026-06-16', title: 'Tahun Baru Islam 1448 H', cat: 'libur-nasional' },
      { date: '2026-06-26', title: 'Titimangsa & Pembagian Rapor Semester 2 (Disdik Jabar)', cat: 'kegiatan' },
      { date: '2026-06-29', title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },

      // Semester Ganjil 2026/2027 (Jul-Des 2026) - Kaldik Jabar
      { date: '2026-07-01', title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-07-06', title: 'Daftar Ulang SPMB/PPDB & Persiapan Tahun Ajaran Baru Jabar', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-07-13', title: 'Hari Pertama Masuk Sekolah (HPMS), MPLS & Kepramukaan Jabar', cat: 'kegiatan', markWeekOff: true },
      { date: '2026-08-17', title: 'HUT Kemerdekaan Republik Indonesia', cat: 'libur-nasional' },
      { date: '2026-08-19', title: 'Pelaksanaan ANBK SMK/SMA Sederajat Provinsi Jawa Barat', cat: 'asesmen' },
      { date: '2026-08-25', title: 'Libur Maulid Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2026-09-21', title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil Kaldik Jabar', cat: 'asesmen', markWeekOff: true },
      { date: '2026-12-01', title: 'Penilaian Sumatif Akhir Semester (PSAS / ASAS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2026-12-14', title: 'Pengolahan Nilai Rapor & PORSENI Semester 1 Jabar', cat: 'kegiatan', markWeekOff: true },
      { date: '2026-12-18', title: 'Titimangsa & Pembagian Rapor Semester 1 (Disdik Jabar)', cat: 'kegiatan', markWeekOff: true },
      { date: '2026-12-21', title: 'Libur Semester 1 (Ganjil) Kaldik Provinsi Jawa Barat', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-12-25', title: 'Hari Raya Natal & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
    ],
    2027: [
      // Semester Genap 2026/2027 (Jan-Jun 2027) - Kaldik Jabar
      { date: '2027-01-01', title: 'Tahun Baru Masehi & Libur Semester 1 Kaldik Jabar', cat: 'libur-nasional', markWeekOff: true },
      { date: '2027-01-04', title: 'Hari Pertama Masuk Sekolah Semester 2 (Genap) Jabar', cat: 'kegiatan' },
      { date: '2027-01-05', title: 'Libur Isra Mikraj Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2027-02-06', title: 'Tahun Baru Imlek 2578 Kongzili', cat: 'libur-nasional' },
      { date: '2027-02-08', title: 'Prakiraan Libur Awal Ramadan 1448 H (Kaldik Jabar)', cat: 'libur-semester', markWeekOff: true },
      { date: '2027-02-15', title: 'Kegiatan SmartTren Ramadan / Penumbuhan Budi Pekerti Jabar', cat: 'kegiatan' },
      { date: '2027-03-08', title: 'Libur Sekitar Hari Raya Idul Fitri 1448 H (Disdik Jabar)', cat: 'libur-semester', markWeekOff: true },
      { date: '2027-03-10', title: 'Hari Raya Idul Fitri 1448 H & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
      { date: '2027-03-15', title: 'Cuti Bersama & Libur Hari Raya Idul Fitri 1448 H', cat: 'libur-semester', markWeekOff: true },
      { date: '2027-03-26', title: 'Wafat Yesus Kristus (Jumat Agung)', cat: 'libur-nasional' },
      { date: '2027-03-28', title: 'Hari Suci Nyepi Tahun Baru Saka 1949', cat: 'libur-nasional' },
      { date: '2027-04-05', title: 'Uji Kompetensi Keahlian (UKK) SMK & PSAJ Jawa Barat', cat: 'asesmen', markWeekOff: true },
      { date: '2027-05-01', title: 'Hari Buruh Internasional', cat: 'libur-nasional' },
      { date: '2027-05-06', title: 'Kenaikan Yesus Kristus', cat: 'libur-nasional' },
      { date: '2027-05-10', title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap', cat: 'asesmen', markWeekOff: true },
      { date: '2027-05-17', title: 'Hari Raya Idul Adha 1448 H', cat: 'libur-nasional' },
      { date: '2027-05-20', title: 'Hari Raya Waisak 2571 BE', cat: 'libur-nasional' },
      { date: '2027-06-01', title: 'Hari Lahir Pancasila', cat: 'libur-nasional' },
      { date: '2027-06-06', title: 'Tahun Baru Islam 1449 H', cat: 'libur-nasional' },
      { date: '2027-06-07', title: 'Penilaian Sumatif Akhir Tahun (PSAT / ASAT) Kenaikan Kelas', cat: 'asesmen', markWeekOff: true },
      { date: '2027-06-14', title: 'Pengolahan Nilai Rapor & PORSENI Semester 2 Jabar', cat: 'kegiatan', markWeekOff: true },
      { date: '2027-06-25', title: 'Titimangsa & Pembagian Rapor Semester 2 (Disdik Jabar)', cat: 'kegiatan', markWeekOff: true },
      { date: '2027-06-28', title: 'Libur Akhir Tahun Pelajaran & SPMB/PPDB Jawa Barat', cat: 'libur-semester', markWeekOff: true },

      // Semester Ganjil 2027/2028 (Jul-Des 2027) - Kaldik Jabar
      ...buildDynamicJabarEventsForYear(2027).filter(ev => Number(ev.date.split('-')[1]) >= 7),
    ],
  };

  const out: KaldikEvent[] = [];

  // Semester 1: July - Dec of startYear (auto-generated for any year if not in static table)
  const s1Source = presetsByYear[startYear] || buildDynamicJabarEventsForYear(startYear);

  s1Source
    .filter(ev => {
      const m = Number(ev.date.split('-')[1]);
      return m >= 7 && m <= 12;
    })
    .forEach((ev, idx) => {
      out.push({
        id: `kaldik-jabar-${startYear}-s1-${idx}`,
        date: ev.date,
        title: ev.title,
        cat: ev.cat,
        markWeekOff: ev.markWeekOff,
      });
    });

  // Semester 2: Jan - Jun of endYear (auto-generated for any year if not in static table)
  const s2Source = presetsByYear[endYear] || buildDynamicJabarEventsForYear(endYear);

  s2Source
    .filter(ev => {
      const m = Number(ev.date.split('-')[1]);
      return m >= 1 && m <= 6;
    })
    .forEach((ev, idx) => {
      out.push({
        id: `kaldik-jabar-${endYear}-s2-${idx}`,
        date: ev.date,
        title: ev.title,
        cat: ev.cat,
        markWeekOff: ev.markWeekOff,
      });
    });

  return out;
}

/**
 * Checks whether an existing kaldik array needs automatic update to match Jabar Kaldik & current Tahun Ajaran.
 */
export function needsJabarKaldikAutoUpdate(events: KaldikEvent[] | undefined, ta?: string): boolean {
  if (!events || !Array.isArray(events) || events.length === 0) return true;
  const { startYear, endYear } = parseTahunAjaran(ta);
  // Check if events are from older non-Jabar version or from a different Tahun Pelajaran
  const hasJabarTag = events.some(e => e.id.startsWith('kaldik-jabar-') || e.title.includes('Jabar') || e.title.includes('Jawa Barat'));
  if (!hasJabarTag) return true;
  const hasStartYear = events.some(e => e.date.startsWith(`${startYear}-`));
  const hasEndYear = events.some(e => e.date.startsWith(`${endYear}-`));
  return !hasStartYear || !hasEndYear;
}

/**
 * Synchronizes MonthItem[] (Analisis Waktu) with the real calendar grid and KaldikEvent[] for a given Tahun Pelajaran.
 */
export function syncCalendarToBulan(
  bulanList: MonthItem[],
  ta: string,
  events: KaldikEvent[],
  preserveManualOff = false
): MonthItem[] {
  const { startYear, endYear } = parseTahunAjaran(ta);

  return bulanList.map(b => {
    const key = b.nama.trim().toLowerCase();
    const meta = MONTH_MAP[key];
    if (!meta) return b;

    const year = meta.sem === 1 ? startYear : endYear;
    const grid = buildMonthGrid(year, meta.monthIdx);
    const n = Math.max(1, grid.schoolWeeksCount);

    const monthPrefix = `${year}-${pad2(meta.monthIdx + 1)}-`;
    const monthEvents = events.filter(e => e.date.startsWith(monthPrefix));

    const offSet = new Set<number>(preserveManualOff ? b.off.filter(idx => idx < n) : []);
    const ketParts: string[] = [];

    grid.weeks.forEach(w => {
      if (w.schoolWeekIndex === null) return;
      const weekDates = w.days.map(d => d.dateStr).filter(Boolean) as string[];
      const weekEvents = monthEvents.filter(e => weekDates.includes(e.date));

      weekEvents.forEach(ev => {
        if (!ketParts.includes(ev.title)) {
          ketParts.push(ev.title);
        }
        if (ev.markWeekOff) {
          offSet.add(w.schoolWeekIndex!);
        }
      });
    });

    // Also include non-weekOff national holidays in ket if not already listed
    monthEvents.forEach(ev => {
      if (!ketParts.includes(ev.title)) {
        ketParts.push(ev.title);
      }
    });

    const off = Array.from(offSet).sort((a, b) => a - b);
    const ket = ketParts.length > 0 ? ketParts.join('; ') : preserveManualOff ? b.ket : '';

    return {
      ...b,
      n,
      off,
      ket,
    };
  });
}
