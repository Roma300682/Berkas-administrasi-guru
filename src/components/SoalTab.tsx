import React, { useState } from 'react';
import { AppState, SoalEssayItem, SoalPgItem, SoalPkg } from '../types';
import { DocHeader } from './DocHeader';
import { generateSoalHtml } from '../utils/docExport';
import { generateContextualSoal } from '../utils/soalGenerator';

interface SoalTabProps {
  state: AppState;
  onToggleView: (view: 'edit' | 'doc') => void;
  onCopy: () => void;
  onSelectUnit: (unitId: string) => void;
  onUpdateSoalPkg: (unitId: string, pkg: SoalPkg) => void;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 9);

export const SoalTab: React.FC<SoalTabProps> = ({
  state,
  onToggleView,
  onCopy,
  onSelectUnit,
  onUpdateSoalPkg,
  onChangeProfile,
  showToast,
}) => {
  const isDocView = !!state.ui.doc['soal'];
  const units = state.unit;
  const currentUnitId = state.ui.unitS || units[0]?.id || '';
  const currentUnit = units.find(u => u.id === currentUnitId);
  const unitTps = state.tp.filter(t => t.unitId === currentUnitId);

  const pkg: SoalPkg | null = currentUnit
    ? state.soal?.[currentUnit.id] ||
      generateContextualSoal(state.profil.mapel, state.profil.kelas, currentUnit, unitTps)
    : null;

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'pg' | 'essay' | 'kisi'>('pg');

  const handleFieldChange = <K extends keyof SoalPkg>(key: K, val: SoalPkg[K]) => {
    if (!currentUnit || !pkg) return;
    onUpdateSoalPkg(currentUnit.id, {
      ...pkg,
      [key]: val,
    });
  };

  const handleGenerateAiSoal = async () => {
    if (!currentUnit || !pkg) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-soal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mapel: state.profil.mapel,
          fase: state.profil.fase,
          kelas: state.profil.kelas,
          unitNama: currentUnit.nama,
          topikFokus: pkg.topikFokus || currentUnit.nama,
          jenisUjian: pkg.jenisUjian,
          kesulitan: pkg.kesulitan,
          waktuMenit: pkg.waktuMenit,
          jmlPg: pkg.jmlPg,
          jmlEssay: pkg.jmlEssay,
          tps: unitTps.map(t => t.teks),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.pkg && Array.isArray(data.pkg.pg) && Array.isArray(data.pkg.essay)) {
          onUpdateSoalPkg(currentUnit.id, {
            ...pkg,
            ...data.pkg,
            unitId: currentUnit.id,
            cetakKisi: pkg.cetakKisi ?? true,
            cetakNaskah: pkg.cetakNaskah ?? true,
            cetakKunci: pkg.cetakKunci ?? true,
          });
          showToast?.(
            data.source === 'ai'
              ? `Berhasil menyusun ${data.pkg.pg.length} soal PG & ${data.pkg.essay.length} soal Uraian dengan AI sesuai topik "${pkg.topikFokus || currentUnit.nama}"`
              : `Berhasil menyusun soal kontekstual sesuai topik "${pkg.topikFokus || currentUnit.nama}"`
          );
          setIsGenerating(false);
          return;
        }
      }

      // Fallback contextual generator if offline or non-OK
      const generated = generateContextualSoal(
        state.profil.mapel,
        state.profil.kelas,
        currentUnit,
        unitTps,
        {
          topikFokus: pkg.topikFokus || currentUnit.nama,
          jenisUjian: pkg.jenisUjian,
          kesulitan: pkg.kesulitan,
          jmlPg: pkg.jmlPg,
          jmlEssay: pkg.jmlEssay,
          waktuMenit: pkg.waktuMenit,
        }
      );
      onUpdateSoalPkg(currentUnit.id, {
        ...generated,
        cetakKisi: pkg.cetakKisi ?? true,
        cetakNaskah: pkg.cetakNaskah ?? true,
        cetakKunci: pkg.cetakKunci ?? true,
      });
      showToast?.(`Soal ujian & kisi-kisi berhasil disusun sesuai topik "${pkg.topikFokus || currentUnit.nama}"`);
    } catch {
      const generated = generateContextualSoal(
        state.profil.mapel,
        state.profil.kelas,
        currentUnit,
        unitTps,
        {
          topikFokus: pkg.topikFokus || currentUnit.nama,
          jenisUjian: pkg.jenisUjian,
          kesulitan: pkg.kesulitan,
          jmlPg: pkg.jmlPg,
          jmlEssay: pkg.jmlEssay,
          waktuMenit: pkg.waktuMenit,
        }
      );
      onUpdateSoalPkg(currentUnit.id, {
        ...generated,
        cetakKisi: pkg.cetakKisi ?? true,
        cetakNaskah: pkg.cetakNaskah ?? true,
        cetakKunci: pkg.cetakKunci ?? true,
      });
      showToast?.(`Soal ujian & kisi-kisi berhasil disusun sesuai topik "${pkg.topikFokus || currentUnit.nama}"`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdatePg = (idx: number, patch: Partial<SoalPgItem>) => {
    if (!currentUnit || !pkg) return;
    const nextPg = pkg.pg.map((item, i) => (i === idx ? { ...item, ...patch } : item));
    onUpdateSoalPkg(currentUnit.id, { ...pkg, pg: nextPg, jmlPg: nextPg.length });
  };

  const handleUpdatePgOpsi = (idx: number, optKey: 'A' | 'B' | 'C' | 'D' | 'E', val: string) => {
    if (!currentUnit || !pkg) return;
    const nextPg = pkg.pg.map((item, i) =>
      i === idx ? { ...item, opsi: { ...item.opsi, [optKey]: val } } : item
    );
    onUpdateSoalPkg(currentUnit.id, { ...pkg, pg: nextPg });
  };

  const handleAddPg = () => {
    if (!currentUnit || !pkg) return;
    const newNo = pkg.pg.length + 1;
    const newItem: SoalPgItem = {
      id: uid(),
      tpKode: `TP.${newNo}`,
      indikatorSoal: `Disajikan permasalahan tentang ${pkg.topikFokus || currentUnit.nama}, peserta didik dapat menentukan jawaban yang tepat.`,
      levelKognitif: 'L2 (C3 - Aplikasi)',
      tanya: `Butir pertanyaan pilihan ganda nomor ${newNo} terkait ${pkg.topikFokus || currentUnit.nama} ....`,
      opsi: {
        A: 'Pilihan jawaban A',
        B: 'Pilihan jawaban B',
        C: 'Pilihan jawaban C',
        D: 'Pilihan jawaban D',
        E: 'Pilihan jawaban E',
      },
      kunci: 'A',
      pembahasan: 'Pembahasan singkat mengenai alasan jawaban yang tepat.',
    };
    const nextPg = [...pkg.pg, newItem];
    onUpdateSoalPkg(currentUnit.id, { ...pkg, pg: nextPg, jmlPg: nextPg.length });
  };

  const handleDeletePg = (idx: number) => {
    if (!currentUnit || !pkg) return;
    const nextPg = pkg.pg.filter((_, i) => i !== idx);
    onUpdateSoalPkg(currentUnit.id, { ...pkg, pg: nextPg, jmlPg: nextPg.length });
  };

  const handleUpdateEssay = (idx: number, patch: Partial<SoalEssayItem>) => {
    if (!currentUnit || !pkg) return;
    const nextEssay = pkg.essay.map((item, i) => (i === idx ? { ...item, ...patch } : item));
    onUpdateSoalPkg(currentUnit.id, { ...pkg, essay: nextEssay, jmlEssay: nextEssay.length });
  };

  const handleAddEssay = () => {
    if (!currentUnit || !pkg) return;
    const newNo = pkg.essay.length + 1;
    const newItem: SoalEssayItem = {
      id: uid(),
      tpKode: `TP.${newNo}`,
      indikatorSoal: `Disajikan studi kasus tentang ${pkg.topikFokus || currentUnit.nama}, peserta didik dapat menguraikan penyelesaiannya secara tepat.`,
      levelKognitif: 'L3 / HOTS (C4 - Analisis)',
      tanya: `Jelaskan langkah analisis dan penyelesaian studi kasus ${pkg.topikFokus || currentUnit.nama} berikut secara sistematis!`,
      kunci: 'Pedoman jawaban dan langkah penyelesaian lengkap.',
      skor: 25,
    };
    const nextEssay = [...pkg.essay, newItem];
    onUpdateSoalPkg(currentUnit.id, { ...pkg, essay: nextEssay, jmlEssay: nextEssay.length });
  };

  const handleDeleteEssay = (idx: number) => {
    if (!currentUnit || !pkg) return;
    const nextEssay = pkg.essay.filter((_, i) => i !== idx);
    onUpdateSoalPkg(currentUnit.id, { ...pkg, essay: nextEssay, jmlEssay: nextEssay.length });
  };

  return (
    <div className="space-y-6">
      <DocHeader
        title="8. Pembuatan Soal Ujian, Kisi-Kisi & Kunci Jawaban (AI)"
        lead="Susun instrumen evaluasi lengkap (Kisi-Kisi Penulisan Soal, Naskah Pilihan Ganda A–E, Soal Uraian/Studi Kasus, dan Kunci Jawaban & Pembahasan) berbantuan AI yang selaras dengan Topik Pembahasan dan Tujuan Pembelajaran (TP)."
        tab="soal"
        isDocView={isDocView}
        onToggleView={onToggleView}
        onCopy={onCopy}
        state={state}
        onChangeProfile={onChangeProfile}
        showToast={showToast}
      />

      {units.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center text-slate-500">
          Belum ada unit pembelajaran. Tambahkan unit dan Tujuan Pembelajaran pada menu <b>2. CP–ATP</b> terlebih dahulu.
        </div>
      ) : !isDocView && currentUnit && pkg ? (
        <div className="space-y-6 no-print">
          {/* Unit Selector & AI Generator Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex-1 min-w-[260px]">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Pilih Unit / Lingkup Materi Pembahasan
                </label>
                <select
                  value={currentUnit.id}
                  onChange={e => onSelectUnit(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {units.map((u, idx) => (
                    <option key={u.id} value={u.id}>
                      Unit {idx + 1} (Smt {u.sem}): {u.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateAiSoal}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white rounded-lg text-xs lg:text-sm font-semibold transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>{isGenerating ? '⏳' : '✨'}</span>
                  <span>
                    {isGenerating
                      ? 'Sedang Menyusun Soal sesuai Topik...'
                      : 'Susun Soal & Kisi-Kisi dengan AI'}
                  </span>
                </button>
              </div>
            </div>

            {/* Konfigurasi Topik & Parameter Ujian */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Fokus Topik Pembahasan / Studi Kasus Spesifik
                </label>
                <input
                  type="text"
                  value={pkg.topikFokus}
                  onChange={e => handleFieldChange('topikFokus', e.target.value)}
                  placeholder="Contoh: Jurnal Umum & Persamaan Dasar Akuntansi / Rekonsiliasi Bank / PPh 21 TER"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  AI akan menyesuaikan skenario soal, angka transaksi, kisi-kisi, dan pembahasan dengan topik pembahasan di atas serta daftar TP pada unit ini.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jenis Evaluasi / Ujian
                </label>
                <select
                  value={pkg.jenisUjian}
                  onChange={e => handleFieldChange('jenisUjian', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Asesmen Sumatif Lingkup Materi">Asesmen Sumatif Lingkup Materi (Ulangan Harian)</option>
                  <option value="Asesmen Sumatif Tengah Semester (ASTS)">Asesmen Sumatif Tengah Semester (ASTS / PTS)</option>
                  <option value="Asesmen Sumatif Akhir Semester (ASAS)">Asesmen Sumatif Akhir Semester (ASAS / PAS)</option>
                  <option value="Asesmen Sumatif Akhir Tahun (ASAT)">Asesmen Sumatif Akhir Tahun (ASAT / PAT)</option>
                  <option value="Uji Kompetensi Keahlian (UKK) Teori & Kasus">Uji Kompetensi Keahlian (UKK) Teori & Studi Kasus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sebaran Level Kognitif (Taksonomi Bloom)
                </label>
                <select
                  value={pkg.kesulitan}
                  onChange={e => handleFieldChange('kesulitan', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Proporsional (L1 Dasar, L2 Aplikasi, L3 HOTS)">Proporsional (L1 Pemahaman, L2 Aplikasi, L3 HOTS)</option>
                  <option value="Fokus HOTS & Analisis Kasus (L2 & L3)">Fokus HOTS & Analisis Studi Kasus (Dominan C4–C5)</option>
                  <option value="Pemahaman Konsep & Prosedur Dasar (L1 & L2)">Pemahaman Konsep & Prosedur Dasar (Dominan C2–C3)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2.5 md:col-span-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Jumlah Soal PG
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={pkg.jmlPg}
                    onChange={e => handleFieldChange('jmlPg', Math.max(1, Math.min(25, Number(e.target.value) || 5)))}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Jumlah Soal Uraian
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={pkg.jmlEssay}
                    onChange={e => handleFieldChange('jmlEssay', Math.max(1, Math.min(10, Number(e.target.value) || 2)))}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Waktu (Menit)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={240}
                    step={15}
                    value={pkg.waktuMenit}
                    onChange={e => handleFieldChange('waktuMenit', Math.max(15, Number(e.target.value) || 90))}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Referensi TP Unit Ini */}
            <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-lg p-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 mb-1.5">
                Acuan Tujuan Pembelajaran (TP) pada Unit Ini ({unitTps.length} TP):
              </div>
              {unitTps.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                  {unitTps.map(t => (
                    <li key={t.id}>{t.teks}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">Belum ada TP pada unit ini.</p>
              )}
            </div>

            {/* Opsi Komponen Dokumen A4 */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Bagian yang Dicetak pada Kertas A4:
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pkg.cetakKisi !== false}
                    onChange={e => handleFieldChange('cetakKisi', e.target.checked)}
                    className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>I. Kisi-Kisi Penulisan Soal</span>
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pkg.cetakNaskah !== false}
                    onChange={e => handleFieldChange('cetakNaskah', e.target.checked)}
                    className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>II. Naskah Soal (PG & Uraian)</span>
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pkg.cetakKunci !== false}
                    onChange={e => handleFieldChange('cetakKunci', e.target.checked)}
                    className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>III. Kunci Jawaban, Pembahasan & Skor</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sub-Navigasi Editor */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveSubTab('pg')}
                className={`px-3.5 py-1.5 rounded-md text-xs lg:text-sm font-semibold transition-colors cursor-pointer ${
                  activeSubTab === 'pg'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Pilihan Ganda ({pkg.pg.length} Soal)
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('essay')}
                className={`px-3.5 py-1.5 rounded-md text-xs lg:text-sm font-semibold transition-colors cursor-pointer ${
                  activeSubTab === 'essay'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Uraian / Studi Kasus ({pkg.essay.length} Soal)
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('kisi')}
                className={`px-3.5 py-1.5 rounded-md text-xs lg:text-sm font-semibold transition-colors cursor-pointer ${
                  activeSubTab === 'kisi'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Tabel Kisi-Kisi & Petunjuk ({pkg.pg.length + pkg.essay.length} Indikator)
              </button>
            </div>

            {activeSubTab === 'pg' && (
              <button
                type="button"
                onClick={handleAddPg}
                className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                + Tambah Soal Pilihan Ganda
              </button>
            )}
            {activeSubTab === 'essay' && (
              <button
                type="button"
                onClick={handleAddEssay}
                className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                + Tambah Soal Uraian / Kasus
              </button>
            )}
          </div>

          {/* Editor Pilihan Ganda */}
          {activeSubTab === 'pg' && (
            <div className="space-y-4">
              {pkg.pg.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white text-xs font-bold">
                        PG No. {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={item.tpKode}
                        onChange={e => handleUpdatePg(idx, { tpKode: e.target.value })}
                        placeholder="Kode TP"
                        className="w-24 px-2 py-1 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
                      />
                      <select
                        value={item.levelKognitif}
                        onChange={e => handleUpdatePg(idx, { levelKognitif: e.target.value })}
                        className="px-2.5 py-1 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
                      >
                        <option value="L1 (C2 - Pemahaman)">L1 (C2 - Pemahaman)</option>
                        <option value="L2 (C3 - Aplikasi)">L2 (C3 - Aplikasi)</option>
                        <option value="L3 / HOTS (C4 - Analisis)">L3 / HOTS (C4 - Analisis)</option>
                        <option value="L3 / HOTS (C5 - Evaluasi)">L3 / HOTS (C5 - Evaluasi)</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePg(idx)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 cursor-pointer"
                    >
                      Hapus Butir
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Indikator Soal (Kisi-Kisi)
                    </label>
                    <input
                      type="text"
                      value={item.indikatorSoal}
                      onChange={e => handleUpdatePg(idx, { indikatorSoal: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Pokok Pertanyaan / Stimulus Kasus
                    </label>
                    <textarea
                      rows={3}
                      value={item.tanya}
                      onChange={e => handleUpdatePg(idx, { tanya: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {(['A', 'B', 'C', 'D', 'E'] as const).map(optKey => (
                      <div key={optKey} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdatePg(idx, { kunci: optKey })}
                          title="Klik untuk jadikan Kunci Jawaban"
                          className={`w-7 h-7 rounded-md text-xs font-bold flex items-center justify-center shrink-0 cursor-pointer border ${
                            item.kunci === optKey
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {optKey}
                        </button>
                        <input
                          type="text"
                          value={item.opsi?.[optKey] || ''}
                          onChange={e => handleUpdatePgOpsi(idx, optKey, e.target.value)}
                          className="flex-1 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Kunci Jawaban
                      </label>
                      <select
                        value={item.kunci}
                        onChange={e =>
                          handleUpdatePg(idx, {
                            kunci: e.target.value as 'A' | 'B' | 'C' | 'D' | 'E',
                          })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200"
                      >
                        {(['A', 'B', 'C', 'D', 'E'] as const).map(k => (
                          <option key={k} value={k}>
                            Kunci: Pilihan {k}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Pembahasan / Rasional Jawaban
                      </label>
                      <input
                        type="text"
                        value={item.pembahasan}
                        onChange={e => handleUpdatePg(idx, { pembahasan: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Editor Uraian / Studi Kasus */}
          {activeSubTab === 'essay' && (
            <div className="space-y-4">
              {pkg.essay.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-teal-700 text-white text-xs font-bold">
                        Uraian No. {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={item.tpKode}
                        onChange={e => handleUpdateEssay(idx, { tpKode: e.target.value })}
                        placeholder="Kode TP"
                        className="w-24 px-2 py-1 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
                      />
                      <select
                        value={item.levelKognitif}
                        onChange={e => handleUpdateEssay(idx, { levelKognitif: e.target.value })}
                        className="px-2.5 py-1 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
                      >
                        <option value="L2 (C3 - Aplikasi Prosedur)">L2 (C3 - Aplikasi Prosedur)</option>
                        <option value="L3 / HOTS (C4 - Analisis Kasus)">L3 / HOTS (C4 - Analisis Kasus)</option>
                        <option value="L3 / HOTS (C5 - Evaluasi)">L3 / HOTS (C5 - Evaluasi)</option>
                      </select>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-slate-500 font-medium">Bobot Skor:</span>
                        <input
                          type="number"
                          min={5}
                          max={100}
                          value={item.skor}
                          onChange={e => handleUpdateEssay(idx, { skor: Number(e.target.value) || 20 })}
                          className="w-16 px-2 py-1 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteEssay(idx)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 cursor-pointer"
                    >
                      Hapus Butir
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Indikator Soal (Kisi-Kisi)
                    </label>
                    <input
                      type="text"
                      value={item.indikatorSoal}
                      onChange={e => handleUpdateEssay(idx, { indikatorSoal: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Pertanyaan Uraian / Skenario Studi Kasus
                    </label>
                    <textarea
                      rows={4}
                      value={item.tanya}
                      onChange={e => handleUpdateEssay(idx, { tanya: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Pedoman Jawaban & Langkah Penyelesaian (Rubrik Penskoran)
                    </label>
                    <textarea
                      rows={3}
                      value={item.kunci}
                      onChange={e => handleUpdateEssay(idx, { kunci: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ringkasan Kisi-Kisi & Petunjuk */}
          {activeSubTab === 'kisi' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Petunjuk Pengerjaan Soal Ujian
                </label>
                <textarea
                  rows={4}
                  value={pkg.petunjuk}
                  onChange={e => handleFieldChange('petunjuk', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-800">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                      <th className="border border-slate-200 dark:border-slate-700 px-2.5 py-2 text-center w-10">No</th>
                      <th className="border border-slate-200 dark:border-slate-700 px-2.5 py-2 text-center w-24">Kode TP</th>
                      <th className="border border-slate-200 dark:border-slate-700 px-2.5 py-2 text-left">Indikator Penulisan Soal</th>
                      <th className="border border-slate-200 dark:border-slate-700 px-2.5 py-2 text-center w-36">Level Kognitif</th>
                      <th className="border border-slate-200 dark:border-slate-700 px-2.5 py-2 text-center w-28">Bentuk & Nomor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.pg.map((item, i) => (
                      <tr key={`k-pg-${i}`} className="border-b border-slate-200 dark:border-slate-800">
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center">{i + 1}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center font-semibold">{item.tpKode}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5">{item.indikatorSoal}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center">{item.levelKognitif}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center">PG No. {i + 1}</td>
                      </tr>
                    ))}
                    {pkg.essay.map((item, i) => (
                      <tr key={`k-es-${i}`} className="border-b border-slate-200 dark:border-slate-800 bg-teal-50/20 dark:bg-teal-950/10">
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center">{pkg.pg.length + i + 1}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center font-semibold">{item.tpKode}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5">{item.indikatorSoal}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center">{item.levelKognitif}</td>
                        <td className="border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-center">Uraian No. {i + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Tampilan Dokumen A4 */}
      {units.length > 0 && (
        <div className={isDocView ? 'block' : 'hidden print:block'}>
          {currentUnit && (
            <div className="mb-4 no-print flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Pratinjau Dokumen A4 Unit:{' '}
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  {currentUnit.nama}
                </span>
              </div>
              <select
                value={currentUnit.id}
                onChange={e => onSelectUnit(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold"
              >
                {units.map((u, idx) => (
                  <option key={u.id} value={u.id}>
                    Unit {idx + 1}: {u.nama}
                  </option>
                ))}
              </select>
            </div>
          )}
          <article
            className="doc-paper doc-portrait mx-auto"
            dangerouslySetInnerHTML={{
              __html: generateSoalHtml(state, currentUnit?.id),
            }}
          />
        </div>
      )}
    </div>
  );
};
