import React, { useState } from 'react';
import { AppState, KaldikEvent, Semester } from '../types';
import { DocHeader } from './DocHeader';
import { generateWaktuHtml } from '../utils/docExport';
import {
  buildMonthGrid,
  CATEGORY_META,
  MONTH_MAP,
  parseTahunAjaran,
} from '../utils/kalenderPendidikan';

interface WaktuTabProps {
  state: AppState;
  isDocView: boolean;
  onToggleView: (v: 'edit' | 'doc') => void;
  onCopyDoc: () => void;
  onChangeMonth: (id: string, field: string, val: any) => void;
  onToggleWeekOff: (monthId: string, weekIdx: number) => void;
  onAddMonth: (sem: Semester) => void;
  onDeleteMonth: (id: string) => void;
  onSyncKaldik: (newTa?: string, resetDefaultEvents?: boolean) => void;
  onAddKaldikEvent: (ev: Omit<KaldikEvent, 'id'>) => void;
  onDeleteKaldikEvent: (id: string) => void;
  onToggleKaldikEventWeekOff: (id: string) => void;
  onToggleCetakKaldik: (val: boolean) => void;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

const DAY_HEADERS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
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

export const WaktuTab: React.FC<WaktuTabProps> = ({
  state,
  isDocView,
  onToggleView,
  onCopyDoc,
  onChangeMonth,
  onToggleWeekOff,
  onAddMonth,
  onDeleteMonth,
  onSyncKaldik,
  onAddKaldikEvent,
  onDeleteKaldikEvent,
  onToggleKaldikEventWeekOff,
  onToggleCetakKaldik,
  onChangeProfile,
  showToast,
}) => {
  const p = state.profil;
  const jp = Number(p.jp) || 0;
  const { startYear, endYear } = parseTahunAjaran(p.ta);
  const kaldikEvents = state.kaldik || [];

  const [viewMode, setViewMode] = useState<'split' | 'calendar' | 'table'>('split');
  const [selectedDate, setSelectedDate] = useState<string>(`${startYear}-07-13`);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCat, setNewCat] = useState<KaldikEvent['cat']>('kegiatan');
  const [newMarkOff, setNewMarkOff] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const getBulanSem = (sem: Semester) => state.bulan.filter(b => b.sem === sem);
  const mgEf = (b: { n: number; off: number[] }) => Math.max(0, b.n - b.off.length);

  const formatShortDate = (iso: string) => {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const mIdx = Number(parts[1]) - 1;
    return `${Number(parts[2])} ${MONTH_NAMES_ID[mIdx]?.slice(0, 3) || parts[1]} ${parts[0]}`;
  };

  const handleOpenDateForm = (dateStr: string) => {
    setSelectedDate(dateStr);
    setNewTitle('');
    setNewCat('kegiatan');
    setNewMarkOff(true);
    setShowAddModal(true);
  };

  const handleSaveNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newTitle.trim()) {
      showToast?.('Isi tanggal dan nama agenda/libur terlebih dahulu.');
      return;
    }
    onAddKaldikEvent({
      date: selectedDate,
      title: newTitle.trim(),
      cat: newCat,
      markWeekOff: newMarkOff,
    });
    setNewTitle('');
    setShowAddModal(false);
    showToast?.('Agenda kalender pendidikan ditambahkan & disinkronkan ke Analisis Waktu.');
  };

  const sem1Weeks = getBulanSem(1).reduce((a, b) => a + b.n, 0);
  const sem1Off = getBulanSem(1).reduce((a, b) => a + b.off.length, 0);
  const sem1Ef = sem1Weeks - sem1Off;

  const sem2Weeks = getBulanSem(2).reduce((a, b) => a + b.n, 0);
  const sem2Off = getBulanSem(2).reduce((a, b) => a + b.off.length, 0);
  const sem2Ef = sem2Weeks - sem2Off;

  const renderEdit = () => (
    <div className="flex flex-col gap-6">
      {/* Banner Integrasi Kalender Pendidikan & Analisis Waktu */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white rounded-2xl p-5 shadow-lg border border-emerald-700/60 flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                📅 Kalender Pendidikan Terintegrasi
              </span>
              <span className="text-xs font-medium text-emerald-200 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
                Tahun Pelajaran {startYear}/{endYear}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mt-0.5">
              Kalender Pendidikan & Perhitungan Minggu Efektif Otomatis
            </h2>
            <p className="text-xs text-emerald-200/90 max-w-3xl m-0 leading-relaxed">
              Kalender di bawah terhubung langsung dengan <strong>Analisis Alokasi Waktu</strong> dan <strong>Program Semester (Promes)</strong>. Klik tombol <strong>Mg 1–Mg 5</strong> untuk menandai minggu efektif/tidak efektif, atau klik <strong>tanggal</strong> pada kalender untuk menambah agenda libur/asesmen sekolah.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 bg-emerald-950/90 border border-emerald-700 rounded-lg px-2.5 py-1.5 text-xs">
              <span className="text-emerald-300 font-semibold">Tahun Ajaran:</span>
              <select
                value={`${startYear}/${endYear}`}
                onChange={e => {
                  const nextTa = e.target.value;
                  onSyncKaldik(nextTa, true);
                  showToast?.(`Kalender Pendidikan & Analisis Waktu disinkronkan ke TA ${nextTa}!`);
                }}
                className="bg-transparent text-white font-bold focus:outline-hidden cursor-pointer"
              >
                {['2024/2025', '2025/2026', '2026/2027', '2027/2028'].map(taOpt => (
                  <option key={taOpt} value={taOpt} className="text-slate-900">
                    {taOpt}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                onSyncKaldik(`${startYear}/${endYear}`, false);
                showToast?.('Jumlah minggu, minggu tidak efektif, dan keterangan berhasil disinkronkan dari Kalender Pendidikan!');
              }}
              className="px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>🔄</span>
              <span>Hitung & Sinkronkan Minggu dari Kalender</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(prev => !prev)}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>➕</span>
              <span>Tambah Agenda / Libur</span>
            </button>
          </div>
        </div>

        {/* Statistik Ringkas Semester 1, 2, dan Total 1 Tahun */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-emerald-300 font-semibold">Semester 1 (Ganjil · Jul–Des {startYear})</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {sem1Ef} Minggu Efektif · <span className="text-emerald-300">{sem1Ef * jp} JP</span>
              </div>
              <div className="text-[10px] text-emerald-400">
                Total {sem1Weeks} minggu ({sem1Off} minggu tidak efektif)
              </div>
            </div>
            <span className="text-2xl">🗓️</span>
          </div>

          <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-emerald-300 font-semibold">Semester 2 (Genap · Jan–Jun {endYear})</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {sem2Ef} Minggu Efektif · <span className="text-emerald-300">{sem2Ef * jp} JP</span>
              </div>
              <div className="text-[10px] text-emerald-400">
                Total {sem2Weeks} minggu ({sem2Off} minggu tidak efektif)
              </div>
            </div>
            <span className="text-2xl">📆</span>
          </div>

          <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-amber-300 font-semibold">Total 1 Tahun Pelajaran ({p.ta})</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {sem1Ef + sem2Ef} Minggu Efektif · <span className="text-amber-300">{(sem1Ef + sem2Ef) * jp} JP</span>
              </div>
              <div className="text-[10px] text-emerald-400">
                {kaldikEvents.length} agenda & hari libur tercatat
              </div>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </div>

        {/* Form Tambah Agenda / Libur */}
        {showAddModal && (
          <form
            onSubmit={handleSaveNewEvent}
            className="bg-emerald-950/95 border border-emerald-600 rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">
                ➕ Tambah Agenda Kalender Pendidikan / Hari Libur Baru
              </span>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xs text-emerald-300 hover:text-white cursor-pointer"
              >
                ✕ Tutup
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <label className="flex flex-col gap-1 text-xs text-emerald-200">
                Tanggal
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 bg-emerald-900 border border-emerald-700 rounded-lg text-white text-xs"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-emerald-200 sm:col-span-2">
                Nama Agenda / Hari Libur / Kegiatan
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="mis. Workshop Kurikulum, UKK Akuntansi, Libur Khusus..."
                  className="px-3 py-1.5 bg-emerald-900 border border-emerald-700 rounded-lg text-white text-xs placeholder:text-emerald-500"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-emerald-200">
                Kategori Agenda
                <select
                  value={newCat}
                  onChange={e => {
                    const c = e.target.value as KaldikEvent['cat'];
                    setNewCat(c);
                    setNewMarkOff(CATEGORY_META[c].defaultWeekOff);
                  }}
                  className="px-3 py-1.5 bg-emerald-900 border border-emerald-700 rounded-lg text-white text-xs"
                >
                  <option value="kegiatan">MPLS / Rapor / Kegiatan Sekolah</option>
                  <option value="asesmen">Asesmen (ASTS / ASAS / UKK)</option>
                  <option value="libur-semester">Libur Semester / Hari Raya</option>
                  <option value="libur-nasional">Libur Nasional / Cuti Bersama</option>
                </select>
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <label className="flex items-center gap-2 text-xs text-emerald-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMarkOff}
                  onChange={e => setNewMarkOff(e.target.checked)}
                  className="rounded border-emerald-600"
                />
                <span>Tandai minggu pada tanggal ini sebagai <strong>Minggu Tidak Efektif</strong> di Analisis Waktu</span>
              </label>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
              >
                💾 Simpan & Sinkronkan ke Analisis Waktu
              </button>
            </div>
          </form>
        )}

        {/* Toolbar Filter Tampilan & Legenda Warna */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-emerald-300">Keterangan Warna:</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="text-[11px] text-emerald-100">Libur Nasional</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-[11px] text-emerald-100">Libur Semester / Raya</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <span className="text-[11px] text-emerald-100">Asesmen (ASTS/ASAS)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span className="text-[11px] text-emerald-100">MPLS / Kegiatan</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 text-[11px] text-emerald-200 cursor-pointer">
              <input
                type="checkbox"
                checked={state.cetakKaldik !== false}
                onChange={e => onToggleCetakKaldik(e.target.checked)}
                className="rounded border-emerald-600"
              />
              <span>Cetak Tabel Agenda Kaldik di Dokumen A4</span>
            </label>

            <div className="inline-flex bg-emerald-950/90 p-0.5 rounded-lg border border-emerald-700 text-[11px]">
              {[
                { id: 'split', l: '📅 Kalender + Analisis' },
                { id: 'calendar', l: '🗓️ Fokus Kalender' },
                { id: 'table', l: '📋 Fokus Tabel Minggu' },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setViewMode(m.id as any)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    viewMode === m.id
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {m.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Semester 1 & Semester 2 Calendar + Analisis Waktu */}
      {[1, 2].map(s => {
        const sem = s as Semester;
        const bs = getBulanSem(sem);
        const totalWeeks = bs.reduce((a, b) => a + b.n, 0);
        const totalOff = bs.reduce((a, b) => a + b.off.length, 0);
        const totalEf = totalWeeks - totalOff;
        const totalJp = totalEf * jp;
        const semYear = sem === 1 ? startYear : endYear;

        return (
          <section
            key={sem}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Semester {sem} ({sem === 1 ? 'Ganjil' : 'Genap'} · {semYear})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Klik tombol <b>Mg 1–Mg 5</b> untuk mengubah status minggu efektif, atau klik tanggal untuk menambah catatan kegiatan/libur.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {totalWeeks} minggu · {totalOff} tidak efektif · <b>{totalEf} efektif ({totalJp} JP)</b>
                </span>
              </div>
            </div>

            {/* Grid Kalender Bulanan Terintegrasi */}
            {viewMode !== 'table' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {bs.map(b => {
                  const key = b.nama.trim().toLowerCase();
                  const meta = MONTH_MAP[key];
                  const monthIdx = meta ? meta.monthIdx : 0;
                  const year = sem === 1 ? startYear : endYear;
                  const grid = buildMonthGrid(year, monthIdx);
                  const effectiveWeeks = mgEf(b);
                  const effectiveJp = effectiveWeeks * jp;

                  const pad2 = (n: number) => String(n).padStart(2, '0');
                  const monthPrefix = `${year}-${pad2(monthIdx + 1)}-`;
                  const monthEvents = kaldikEvents
                    .filter(ev => ev.date.startsWith(monthPrefix))
                    .sort((x, y) => x.date.localeCompare(y.date));

                  return (
                    <div
                      key={b.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        {/* Header Bulan */}
                        <div className="bg-slate-100 dark:bg-slate-800/90 px-3.5 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                              {b.nama} {year}
                            </span>
                            <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                              {b.n} minggu sekolah · {b.off.length} libur/asesmen
                            </span>
                          </div>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                              effectiveWeeks > 0
                                ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                            }`}
                          >
                            {effectiveWeeks} Mg Efektif ({effectiveJp} JP)
                          </span>
                        </div>

                        {/* Tabel Kalender Tanggal + Minggu Efektif */}
                        <div className="p-2.5">
                          <table className="w-full text-center border-collapse select-none">
                            <thead>
                              <tr className="text-[10px] font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                                <th className="py-1 px-1 text-left w-12">Minggu</th>
                                {DAY_HEADERS.map((d, idx) => (
                                  <th
                                    key={d}
                                    className={`py-1 px-0.5 ${idx === 6 ? 'text-red-500 dark:text-red-400' : ''}`}
                                  >
                                    {d}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="text-xs">
                              {grid.weeks.map(w => {
                                const sIdx = w.schoolWeekIndex;
                                const isSchoolWeek = sIdx !== null && sIdx < b.n;
                                const isWeekOff = isSchoolWeek && b.off.includes(sIdx!);

                                return (
                                  <tr
                                    key={w.weekRowIndex}
                                    className={`border-b border-slate-100/80 dark:border-slate-800/60 last:border-0 transition-colors ${
                                      isWeekOff
                                        ? 'bg-amber-50/70 dark:bg-amber-950/25'
                                        : isSchoolWeek
                                        ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                                        : 'opacity-55'
                                    }`}
                                  >
                                    <td className="py-1 pr-1 text-left align-middle">
                                      {isSchoolWeek ? (
                                        <button
                                          type="button"
                                          onClick={() => onToggleWeekOff(b.id, sIdx!)}
                                          title={
                                            isWeekOff
                                              ? `Minggu ke-${sIdx! + 1}: Tidak Efektif (Klik untuk ubah ke Efektif)`
                                              : `Minggu ke-${sIdx! + 1}: Efektif (Klik untuk tandai Tidak Efektif)`
                                          }
                                          className={`w-full px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer flex items-center justify-between gap-0.5 ${
                                            isWeekOff
                                              ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                                              : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700'
                                          }`}
                                        >
                                          <span>Mg {sIdx! + 1}</span>
                                          <span>{isWeekOff ? '✕' : '✓'}</span>
                                        </button>
                                      ) : (
                                        <span className="text-[9px] text-slate-400 pl-1">–</span>
                                      )}
                                    </td>

                                    {w.days.map((cell, cIdx) => {
                                      if (!cell.day || !cell.dateStr) {
                                        return <td key={cIdx} className="py-1 px-0.5"></td>;
                                      }
                                      const dayEvents = monthEvents.filter(e => e.date === cell.dateStr);
                                      const topEv = dayEvents[0];
                                      const catStyle = topEv ? CATEGORY_META[topEv.cat] : null;

                                      return (
                                        <td key={cIdx} className="py-1 px-0.5 align-middle">
                                          <button
                                            type="button"
                                            onClick={() => handleOpenDateForm(cell.dateStr!)}
                                            title={
                                              dayEvents.length
                                                ? `${cell.day} ${b.nama} ${year}: ${dayEvents.map(x => x.title).join(', ')} (Klik untuk tambah agenda)`
                                                : `Klik untuk tambah agenda/libur pada ${cell.day} ${b.nama} ${year}`
                                            }
                                            className={`w-6 h-6 mx-auto rounded-md flex flex-col items-center justify-center text-[11px] font-medium transition-all cursor-pointer relative ${
                                              catStyle
                                                ? `${catStyle.bg} ${catStyle.text} border ${catStyle.border} font-bold shadow-2xs`
                                                : cell.isSunday
                                                ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-semibold'
                                                : isWeekOff
                                                ? 'text-amber-800 dark:text-amber-300 hover:bg-amber-100/70'
                                                : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                                            }`}
                                          >
                                            <span>{cell.day}</span>
                                            {topEv && (
                                              <span
                                                className={`w-1 h-1 rounded-full ${catStyle?.dot || 'bg-emerald-500'} absolute bottom-0.5`}
                                              />
                                            )}
                                          </button>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Daftar Agenda / Hari Libur di Bulan Ini */}
                        {monthEvents.length > 0 && (
                          <div className="px-3 pb-2 flex flex-col gap-1">
                            {monthEvents.map(ev => {
                              const st = CATEGORY_META[ev.cat];
                              return (
                                <div
                                  key={ev.id}
                                  className={`px-2 py-1 rounded-md border text-[10px] flex items-center justify-between gap-1.5 ${st.bg} ${st.text} ${st.border}`}
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="font-mono font-bold shrink-0">
                                      {Number(ev.date.split('-')[2])} {b.nama.slice(0, 3)}:
                                    </span>
                                    <span className="truncate font-medium" title={ev.title}>
                                      {ev.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => onToggleKaldikEventWeekOff(ev.id)}
                                      title="Klik untuk mengubah apakah agenda ini menjadikan minggu tidak efektif"
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold border cursor-pointer ${
                                        ev.markWeekOff
                                          ? 'bg-amber-600 text-white border-amber-700'
                                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                                      }`}
                                    >
                                      {ev.markWeekOff ? 'Mg Libur' : 'Mg Efektif'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => onDeleteKaldikEvent(ev.id)}
                                      title="Hapus agenda ini"
                                      className="px-1 text-red-600 dark:text-red-300 hover:font-bold cursor-pointer"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Footer Pengaturan Minggu & Keterangan Bulan */}
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {Array.from({ length: b.n }).map((_, i) => {
                              const isOff = b.off.includes(i);
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => onToggleWeekOff(b.id, i)}
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                                    isOff
                                      ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-400 text-amber-800 dark:text-amber-300 line-through'
                                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-600'
                                  }`}
                                >
                                  Mg {i + 1}
                                </button>
                              );
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
                            <span>Jml Mg:</span>
                            <input
                              type="number"
                              min="1"
                              max="6"
                              value={b.n}
                              onChange={e =>
                                onChangeMonth(b.id, 'n', Math.max(1, Math.min(6, Number(e.target.value))))
                              }
                              className="w-11 px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-center font-bold text-slate-900 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          value={b.ket}
                          onChange={e => onChangeMonth(b.id, 'ket', e.target.value)}
                          placeholder="Keterangan minggu tidak efektif / agenda bulan ini..."
                          className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-[11px] text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tabel Rincian Analisis Minggu per Bulan (Mode Split atau Tabel) */}
            {viewMode !== 'calendar' && (
              <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Tabel Pengaturan Minggu & Keterangan · Semester {sem}
                  </h4>
                  <button
                    type="button"
                    onClick={() => onAddMonth(sem)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer"
                  >
                    + Tambah Bulan Semester {sem}
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {bs.map(b => {
                    const effectiveWeeks = mgEf(b);
                    const effectiveJp = effectiveWeeks * jp;

                    return (
                      <div
                        key={b.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 rounded-lg"
                      >
                        <div className="flex items-center gap-2 min-w-[160px]">
                          <input
                            type="text"
                            className="w-28 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-xs font-bold"
                            value={b.nama}
                            onChange={e => onChangeMonth(b.id, 'nama', e.target.value)}
                          />
                          <input
                            type="number"
                            min="1"
                            max="6"
                            title="Jumlah minggu"
                            className="w-14 px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-xs text-center"
                            value={b.n}
                            onChange={e =>
                              onChangeMonth(b.id, 'n', Math.max(1, Math.min(6, Number(e.target.value))))
                            }
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {Array.from({ length: b.n }).map((_, i) => {
                            const isOff = b.off.includes(i);
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => onToggleWeekOff(b.id, i)}
                                title={`Minggu ke-${i + 1}${isOff ? ' (tidak efektif)' : ' (efektif)'}`}
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                                  isOff
                                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 line-through'
                                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-600'
                                }`}
                              >
                                Mg {i + 1}
                              </button>
                            );
                          })}
                        </div>

                        <input
                          type="text"
                          className="flex-1 min-w-[200px] px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-xs"
                          placeholder="Keterangan minggu tidak efektif (otomatis terisi dari kalender atau ketik manual)"
                          value={b.ket}
                          onChange={e => onChangeMonth(b.id, 'ket', e.target.value)}
                        />

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <div className="text-xs font-mono text-right">
                            <span className="text-slate-500">{effectiveWeeks} mg · </span>
                            <b className="text-emerald-700 dark:text-emerald-400">{effectiveJp} JP</b>
                          </div>
                          <button
                            type="button"
                            onClick={() => onDeleteMonth(b.id)}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded text-xs font-medium transition-colors cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* Daftar Lengkap Agenda Kalender Pendidikan */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Daftar Agenda Kalender Pendidikan & Hari Libur ({kaldikEvents.length} Agenda)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              Agenda dengan status <b>Minggu Tidak Efektif</b> otomatis mengurangi minggu efektif pada bulan terkait di Analisis Alokasi Waktu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            + Tambah Agenda Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
          {[...kaldikEvents]
            .sort((a, b) => a.date.localeCompare(b.date))
            .map(ev => {
              const st = CATEGORY_META[ev.cat];
              return (
                <div
                  key={ev.id}
                  className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${st.bg} ${st.text} ${st.border}`}
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-bold opacity-80">
                      {formatShortDate(ev.date)} · {st.label}
                    </div>
                    <div className="text-xs font-bold truncate" title={ev.title}>
                      {ev.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleKaldikEventWeekOff(ev.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer ${
                        ev.markWeekOff
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {ev.markWeekOff ? 'Tidak Efektif' : 'Efektif'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteKaldikEvent(ev.id)}
                      className="p-1 text-red-600 hover:bg-red-200/50 rounded text-xs cursor-pointer"
                      title="Hapus"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );

  const renderDoc = () => (
    <div className="docwrap">
      <article
        className="doc-paper font-serif"
        dangerouslySetInnerHTML={{ __html: generateWaktuHtml(state) }}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="Kalender Pendidikan & Analisis Waktu"
        lead="Kalender Pendidikan interaktif yang terintegrasi otomatis dengan perhitungan minggu efektif, JP semester, Program Tahunan, dan Program Semester."
        tab="waktu"
        isDocView={isDocView}
        onToggleView={onToggleView}
        onCopy={onCopyDoc}
        state={state}
        onChangeProfile={onChangeProfile}
        showToast={showToast}
      />
      {isDocView ? renderDoc() : renderEdit()}
    </div>
  );
};
