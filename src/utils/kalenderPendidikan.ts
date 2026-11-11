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
    label: 'Libur Semester / Hari Raya',
    bg: 'bg-amber-100 dark:bg-amber-950/70',
    text: 'text-amber-900 dark:text-amber-200',
    border: 'border-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500',
    defaultWeekOff: true,
  },
  asesmen: {
    label: 'Asesmen (ASTS / ASAS / UKK)',
    bg: 'bg-blue-100 dark:bg-blue-950/70',
    text: 'text-blue-800 dark:text-blue-200',
    border: 'border-blue-300 dark:border-blue-800',
    dot: 'bg-blue-600',
    defaultWeekOff: true,
  },
  kegiatan: {
    label: 'MPLS / Rapor / Kegiatan Sekolah',
    bg: 'bg-purple-100 dark:bg-purple-950/70',
    text: 'text-purple-800 dark:text-purple-200',
    border: 'border-purple-300 dark:border-purple-800',
    dot: 'bg-purple-600',
    defaultWeekOff: true,
  },
};

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

/**
 * Generates standard Indonesian National Holidays & Academic Calendar (Kaldik) events for a given Tahun Pelajaran.
 */
export function getDefaultKaldikEvents(ta?: string): KaldikEvent[] {
  const { startYear, endYear } = parseTahunAjaran(ta);

  // Preset tanggal hari besar keagamaan/nasional sesuai tahun berjalan
  const presetsByYear: Record<number, Array<{ date: string; title: string; cat: KaldikEvent['cat']; markWeekOff?: boolean }>> = {
    2025: [
      { date: '2025-07-14', title: 'Hari Pertama Masuk Sekolah & MPLS', cat: 'kegiatan', markWeekOff: true },
      { date: '2025-08-17', title: 'HUT Kemerdekaan RI ke-80', cat: 'libur-nasional' },
      { date: '2025-09-05', title: 'Maulid Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2025-10-06', title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2025-12-01', title: 'Asesmen Sumatif Akhir Semester (ASAS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2025-12-19', title: 'Pembagian Rapor Semester Ganjil', cat: 'kegiatan' },
      { date: '2025-12-22', title: 'Libur Semester Ganjil', cat: 'libur-semester', markWeekOff: true },
      { date: '2025-12-25', title: 'Hari Raya Natal & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
    ],
    2026: [
      // Semester Genap 2025/2026 (Jan-Jun 2026)
      { date: '2026-01-01', title: 'Tahun Baru Masehi & Libur Semester', cat: 'libur-nasional', markWeekOff: true },
      { date: '2026-01-16', title: 'Isra Mikraj Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2026-02-17', title: 'Tahun Baru Imlek 2577 Kongzili', cat: 'libur-nasional' },
      { date: '2026-03-16', title: 'Libur Sekitar Hari Raya Idul Fitri 1447 H', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-03-19', title: 'Hari Suci Nyepi Tahun Baru Saka 1948', cat: 'libur-nasional', markWeekOff: true },
      { date: '2026-03-20', title: 'Hari Raya Idul Fitri 1447 H & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
      { date: '2026-04-03', title: 'Wafat Yesus Kristus (Jumat Agung)', cat: 'libur-nasional' },
      { date: '2026-05-01', title: 'Hari Buruh Internasional', cat: 'libur-nasional' },
      { date: '2026-05-11', title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap', cat: 'asesmen', markWeekOff: true },
      { date: '2026-05-14', title: 'Kenaikan Yesus Kristus', cat: 'libur-nasional' },
      { date: '2026-05-27', title: 'Hari Raya Idul Adha 1447 H', cat: 'libur-nasional' },
      { date: '2026-05-31', title: 'Hari Raya Waisak 2570 BE', cat: 'libur-nasional' },
      { date: '2026-06-01', title: 'Hari Lahir Pancasila', cat: 'libur-nasional' },
      { date: '2026-06-08', title: 'Asesmen Sumatif Akhir Tahun (ASAT) / Kenaikan Kelas', cat: 'asesmen', markWeekOff: true },
      { date: '2026-06-16', title: 'Tahun Baru Islam 1448 H', cat: 'libur-nasional' },
      { date: '2026-06-19', title: 'Pembagian Rapor Semester Genap', cat: 'kegiatan' },
      { date: '2026-06-22', title: 'Libur Akhir Tahun Pelajaran', cat: 'libur-semester', markWeekOff: true },

      // Semester Ganjil 2026/2027 (Jul-Des 2026)
      { date: '2026-07-13', title: 'Hari Pertama Masuk Sekolah & MPLS', cat: 'kegiatan', markWeekOff: true },
      { date: '2026-08-17', title: 'HUT Kemerdekaan Republik Indonesia', cat: 'libur-nasional' },
      { date: '2026-08-25', title: 'Maulid Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2026-10-05', title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2026-12-07', title: 'Asesmen Sumatif Akhir Semester (ASAS) Ganjil', cat: 'asesmen', markWeekOff: true },
      { date: '2026-12-18', title: 'Pembagian Rapor Semester Ganjil', cat: 'kegiatan' },
      { date: '2026-12-21', title: 'Libur Semester Ganjil', cat: 'libur-semester', markWeekOff: true },
      { date: '2026-12-25', title: 'Hari Raya Natal & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
    ],
    2027: [
      // Semester Genap 2026/2027 (Jan-Jun 2027)
      { date: '2027-01-01', title: 'Tahun Baru Masehi & Libur Semester', cat: 'libur-nasional', markWeekOff: true },
      { date: '2027-01-05', title: 'Isra Mikraj Nabi Muhammad SAW', cat: 'libur-nasional' },
      { date: '2027-02-06', title: 'Tahun Baru Imlek 2578 Kongzili', cat: 'libur-nasional' },
      { date: '2027-03-08', title: 'Libur Awal Ramadan & Hari Raya Idul Fitri 1448 H', cat: 'libur-semester', markWeekOff: true },
      { date: '2027-03-10', title: 'Hari Raya Idul Fitri 1448 H & Cuti Bersama', cat: 'libur-nasional', markWeekOff: true },
      { date: '2027-03-15', title: 'Cuti Bersama & Libur Idul Fitri 1448 H', cat: 'libur-semester', markWeekOff: true },
      { date: '2027-03-26', title: 'Wafat Yesus Kristus', cat: 'libur-nasional' },
      { date: '2027-03-28', title: 'Hari Suci Nyepi Tahun Baru Saka 1949', cat: 'libur-nasional' },
      { date: '2027-05-01', title: 'Hari Buruh Internasional', cat: 'libur-nasional' },
      { date: '2027-05-06', title: 'Kenaikan Yesus Kristus', cat: 'libur-nasional' },
      { date: '2027-05-10', title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap', cat: 'asesmen', markWeekOff: true },
      { date: '2027-05-17', title: 'Hari Raya Idul Adha 1448 H', cat: 'libur-nasional' },
      { date: '2027-05-20', title: 'Hari Raya Waisak 2571 BE', cat: 'libur-nasional' },
      { date: '2027-06-01', title: 'Hari Lahir Pancasila', cat: 'libur-nasional' },
      { date: '2027-06-06', title: 'Tahun Baru Islam 1449 H', cat: 'libur-nasional' },
      { date: '2027-06-07', title: 'Asesmen Sumatif Akhir Tahun (ASAT) / Kenaikan Kelas', cat: 'asesmen', markWeekOff: true },
      { date: '2027-06-18', title: 'Pembagian Rapor Semester Genap', cat: 'kegiatan' },
      { date: '2027-06-21', title: 'Libur Akhir Tahun Pelajaran / Kenaikan Kelas', cat: 'libur-semester', markWeekOff: true },
    ],
  };

  const out: KaldikEvent[] = [];

  // Semester 1: July - Dec of startYear
  const s1Source = presetsByYear[startYear] || [
    { date: `${startYear}-07-13`, title: 'Hari Pertama Masuk Sekolah & MPLS', cat: 'kegiatan' as const, markWeekOff: true },
    { date: `${startYear}-08-17`, title: 'HUT Kemerdekaan RI', cat: 'libur-nasional' as const },
    { date: `${startYear}-10-05`, title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil', cat: 'asesmen' as const, markWeekOff: true },
    { date: `${startYear}-12-07`, title: 'Asesmen Sumatif Akhir Semester (ASAS) Ganjil', cat: 'asesmen' as const, markWeekOff: true },
    { date: `${startYear}-12-21`, title: 'Libur Semester Ganjil & Hari Raya Natal', cat: 'libur-semester' as const, markWeekOff: true },
  ];

  s1Source
    .filter(ev => {
      const m = Number(ev.date.split('-')[1]);
      return m >= 7 && m <= 12;
    })
    .forEach((ev, idx) => {
      out.push({
        id: `kaldik-s1-${idx}`,
        date: ev.date,
        title: ev.title,
        cat: ev.cat,
        markWeekOff: ev.markWeekOff,
      });
    });

  // Semester 2: Jan - Jun of endYear
  const s2Source = presetsByYear[endYear] || [
    { date: `${endYear}-01-01`, title: 'Tahun Baru Masehi & Libur Semester', cat: 'libur-nasional' as const, markWeekOff: true },
    { date: `${endYear}-03-10`, title: 'Libur Hari Raya & Cuti Bersama', cat: 'libur-semester' as const, markWeekOff: true },
    { date: `${endYear}-03-17`, title: 'Libur Sekitar Hari Raya', cat: 'libur-semester' as const, markWeekOff: true },
    { date: `${endYear}-05-01`, title: 'Hari Buruh Internasional', cat: 'libur-nasional' as const },
    { date: `${endYear}-05-11`, title: 'Asesmen Sumatif Tengah Semester (ASTS) Genap', cat: 'asesmen' as const, markWeekOff: true },
    { date: `${endYear}-06-01`, title: 'Hari Lahir Pancasila', cat: 'libur-nasional' as const },
    { date: `${endYear}-06-08`, title: 'Asesmen Sumatif Akhir Tahun (ASAT)', cat: 'asesmen' as const, markWeekOff: true },
    { date: `${endYear}-06-21`, title: 'Libur Akhir Tahun Pelajaran / Kenaikan Kelas', cat: 'libur-semester' as const, markWeekOff: true },
  ];

  s2Source
    .filter(ev => {
      const m = Number(ev.date.split('-')[1]);
      return m >= 1 && m <= 6;
    })
    .forEach((ev, idx) => {
      out.push({
        id: `kaldik-s2-${idx}`,
        date: ev.date,
        title: ev.title,
        cat: ev.cat,
        markWeekOff: ev.markWeekOff,
      });
    });

  return out;
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
