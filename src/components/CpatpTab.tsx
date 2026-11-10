import React, { useState } from 'react';
import { AppState, Semester, CpItem, UnitItem, TpItem } from '../types';
import { DocHeader } from './DocHeader';
import { AKL_SUBJECTS_CATALOG } from '../curriculumAkl';
import { generateStandardCurriculum } from '../serverCurriculum';
import { generateCpatpHtml } from '../utils/docExport';

interface CpatpTabProps {
  state: AppState;
  isDocView: boolean;
  onToggleView: (v: 'edit' | 'doc') => void;
  onCopyDoc: () => void;
  onChangeCp: (id: string, field: string, val: string) => void;
  onAddCp: () => void;
  onDeleteCp: (id: string) => void;
  onChangeUnit: (id: string, field: string, val: any) => void;
  onAddUnit: (sem: Semester) => void;
  onDeleteUnit: (id: string) => void;
  onMoveUnit: (id: string, dir: number) => void;
  onChangeTp: (id: string, field: string, val: any) => void;
  onAddTp: (unitId: string) => void;
  onDeleteTp: (id: string) => void;
  onMoveTp: (id: string, dir: number) => void;
  onApplyAiData: (data: any) => void;
  onChangeProfile?: (key: string, value: any) => void;
  showToast: (msg: string) => void;
}

export const CpatpTab: React.FC<CpatpTabProps> = ({
  state,
  isDocView,
  onToggleView,
  onCopyDoc,
  onChangeCp,
  onAddCp,
  onDeleteCp,
  onChangeUnit,
  onAddUnit,
  onDeleteUnit,
  onMoveUnit,
  onChangeTp,
  onAddTp,
  onDeleteTp,
  onMoveTp,
  onApplyAiData,
  onChangeProfile,
  showToast
}) => {
  const p = state.profil;
  const dots = (s?: string) => (s ? s : '…………………');

  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aklFilter, setAklFilter] = useState<'semua' | 'fase-e' | 'konsentrasi' | 'pilihan'>('semua');

  const handleAiGenerate = async (
    targetMapel?: string,
    targetFase?: string,
    targetKelas?: string
  ) => {
    const activeMapel = targetMapel || p.mapel || 'Akuntansi';
    const activeFase = targetFase || p.fase || 'E';
    const activeKelas = targetKelas || p.kelas || 'X';

    if (onChangeProfile && targetMapel) {
      onChangeProfile('mapel', targetMapel);
      if (targetFase) onChangeProfile('fase', targetFase);
      if (targetKelas) onChangeProfile('kelas', targetKelas);
    }

    setIsGenerating(true);
    let applied = false;

    // 1. Coba hubungi server endpoint (AI backend / Vercel Serverless)
    try {
      const res = await fetch('/api/generate-cp-atp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mapel: activeMapel,
          fase: activeFase,
          kelas: activeKelas,
          topik: aiTopic
        })
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && Array.isArray(data.cp) && Array.isArray(data.units)) {
          onApplyAiData(data);
          applied = true;
          if (data.isFallback) {
            showToast(`CP & ATP ${activeMapel} berhasil disusun sesuai Keputusan BSKAP No. 046/H/KR/2025!`);
          } else {
            showToast(`CP & ATP ${activeMapel} berhasil digenerate oleh AI sesuai BSKAP Kemendikdasmen!`);
          }
          return;
        }
      }
    } catch (_netErr) {
      // Jika server tidak dapat dihubungi atau 500, lanjutkan ke fallback client-side otomatis
    }

    // 2. Fallback tangguh di sisi klien: Menyusun kurikulum standar BSKAP No. 046/H/KR/2025 secara offline/langsung
    try {
      const fallbackData = generateStandardCurriculum(activeMapel, activeFase, activeKelas, aiTopic);
      if (fallbackData && Array.isArray(fallbackData.cp) && Array.isArray(fallbackData.units)) {
        onApplyAiData(fallbackData);
        applied = true;
        showToast(`CP & ATP ${activeMapel} berhasil disusun sesuai Keputusan BSKAP No. 046/H/KR/2025!`);
        return;
      }
    } catch (clientErr: any) {
      if (!applied) {
        showToast(clientErr?.message || 'Terjadi kesalahan saat menyusun berkas ajar.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Compute number map for TPs
  const NOMAP: Record<string, number> = {};
  let count = 0;
  [1, 2].forEach(s => {
    state.unit
      .filter(u => u.sem === s)
      .forEach(u => {
        state.tp
          .filter(t => t.unitId === u.id)
          .forEach(t => {
            count++;
            NOMAP[t.id] = count;
          });
      });
  });

  const getNo = (id: string) => NOMAP[id] || '–';

  const orderedTps = (sem: Semester) => {
    const us = state.unit.filter(u => u.sem === sem);
    const out: TpItem[] = [];
    us.forEach(u => {
      state.tp.filter(t => t.unitId === u.id).forEach(t => out.push(t));
    });
    return out;
  };

  const unitTps = (uId: string) => state.tp.filter(t => t.unitId === uId);
  const unitJp = (uId: string) => unitTps(uId).reduce((a, t) => a + (Number(t.jp) || 0), 0);

  const renderEdit = () => (
    <div className="flex flex-col gap-6">
      {/* AI Kurikulum Kemendikdasmen Generator Card */}
      <section className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-6 shadow-xl flex flex-col gap-4 border border-emerald-700/50">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-600/60">
              ✨ Analisis AI Khusus Mata Pelajaran
            </span>
            <span className="text-xs font-semibold text-emerald-200 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-700/50">
              Mata Pelajaran: <span className="text-white font-bold">{p.mapel || 'Belum diisi (isi di Data Induk)'}</span> · Fase {p.fase || 'E'} {p.kelas ? `(Kelas ${p.kelas})` : ''}
            </span>
          </div>
          <h2 className="text-xl font-bold">
            Generate CP, ATP, KKTP & Prota Khusus {p.mapel || 'Mata Pelajaran Anda'}
          </h2>
          <p className="text-xs text-emerald-200/90 max-w-2xl m-0 leading-relaxed">
            Analisis kurikulum berfokus penuh dan spesifik pada mata pelajaran <strong>{p.mapel || 'pilihan Anda'}</strong> sesuai standar resmi Kemendikdasmen & BSNP. AI menyusun Capaian Pembelajaran (CP) per elemen resmi, Alur Tujuan Pembelajaran (ATP) per Semester lengkap dengan alokasi JP, rubrik kriteria KKTP 4 tingkat, serta sinkronisasi otomatis ke Promes, Modul Ajar, dan LKPD.
          </p>
        </div>

        {/* Katalog Lengkap Mapel Akuntansi & Keuangan Lembaga (AKL) */}
        <div className="bg-emerald-950/80 border border-emerald-700/70 rounded-xl p-3.5 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/80 pb-2.5">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span>📚 Jurusan Akuntansi & Keuangan Lembaga (AKL) — Keputusan BSKAP No. 046/H/KR/2025</span>
              </span>
              <span className="text-[11px] text-emerald-400/90">
                Pilih mata pelajaran untuk otomatis menyusun CP, ATP per semester, JP, KKTP rubrik 4 tingkat, dan Prota:
              </span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-900/60 p-1 rounded-lg border border-emerald-700/60 self-start sm:self-auto text-[10px]">
              <span className="text-emerald-300 font-semibold px-1.5">Filter:</span>
              {[
                { id: 'semua', l: 'Semua (9 Mapel)' },
                { id: 'fase-e', l: 'Fase E (X)' },
                { id: 'konsentrasi', l: 'Konsentrasi (XI-XII)' },
                { id: 'pilihan', l: 'Mapel Pilihan' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setAklFilter(f.id as any)}
                  className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                    aklFilter === f.id
                      ? 'bg-emerald-400 text-slate-950 font-bold'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-800/80'
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {AKL_SUBJECTS_CATALOG.filter(s => {
              if (aklFilter === 'fase-e') return s.fase === 'E';
              if (aklFilter === 'konsentrasi') return s.kategori.includes('Konsentrasi');
              if (aklFilter === 'pilihan') return s.kategori.includes('Pilihan');
              return true;
            }).map(s => {
              const isSelected = p.mapel === s.nama;
              return (
                <div
                  key={s.id}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-emerald-900/90 border-emerald-400 ring-2 ring-emerald-400/50 shadow-md'
                      : 'bg-emerald-950/60 border-emerald-800/80 hover:border-emerald-600 hover:bg-emerald-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-base shrink-0">{s.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate" title={s.nama}>
                          {s.shortName}
                        </div>
                        <div className="text-[10px] text-emerald-300 font-medium">
                          {s.tag}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-emerald-200/80 line-clamp-2 m-0 leading-tight">
                    {s.deskripsi}
                  </p>

                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={() => handleAiGenerate(s.nama, s.fase, s.kelas)}
                    className={`w-full py-1.5 px-2 text-xs rounded-lg font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                      isSelected
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black'
                        : 'bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600/80'
                    }`}
                  >
                    {isGenerating && p.mapel === s.nama ? (
                      <span>⏳ Sedang menyusun...</span>
                    ) : (
                      <span>⚡ Generate CP–ATP {s.shortName}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-3 pt-2">
          <label className="flex flex-col gap-1 flex-1 min-w-[220px] text-xs font-medium text-emerald-200">
            Fokus / Topik Tambahan Khusus (Opsional)
            <input
              type="text"
              className="px-3.5 py-2 bg-emerald-950/80 border border-emerald-700 rounded-lg text-white text-sm placeholder:text-emerald-500/80 focus:outline-hidden focus:border-emerald-400"
              value={aiTopic}
              onChange={e => setAiTopic(e.target.value)}
              placeholder={
                p.mapel?.toLowerCase().includes('matematik')
                  ? 'mis. Eksponen, SPLTV, Trigonometri'
                  : p.mapel?.toLowerCase().includes('indonesia')
                  ? 'mis. Teks LHO, Anekdot, Negosiasi'
                  : p.mapel?.toLowerCase().includes('inggris')
                  ? 'mis. Descriptive text, Procedure, Exposition'
                  : p.mapel?.toLowerCase().includes('akuntansi')
                  ? 'mis. Siklus Akuntansi Jasa dan Dagang'
                  : p.mapel?.toLowerCase().includes('informatika')
                  ? 'mis. Algoritma Pemrograman, Jaringan Komputer'
                  : 'mis. Pendalaman materi semester 1 & 2'
              }
            />
          </label>
          <button
            onClick={() => handleAiGenerate()}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-sm transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sedang Menyusun Kurikulum {p.mapel || ''}...</span>
              </>
            ) : (
              <span>🚀 Susun CP–ATP {p.mapel ? p.mapel : 'Mapel Ini'}</span>
            )}
          </button>
        </div>
      </section>

      {/* CP Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Capaian Pembelajaran (CP)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Salin CP resmi mata pelajaran dan fase Anda per elemen dari dokumen Capaian Pembelajaran Kemendikdasmen.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {state.cp.map(c => (
            <div
              key={c.id}
              className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_auto] gap-3 items-start pt-3 border-t border-slate-100 dark:border-slate-800 first:border-0 first:pt-0"
            >
              <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Elemen
                <input
                  type="text"
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                  value={c.elemen}
                  onChange={e => onChangeCp(c.id, 'elemen', e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Capaian pembelajaran
                <textarea
                  rows={3}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm resize-y"
                  value={c.teks}
                  onChange={e => onChangeCp(c.id, 'teks', e.target.value)}
                />
              </label>
              <button
                onClick={() => onDeleteCp(c.id)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg text-xs font-medium transition-colors md:mt-5"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={onAddCp}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-slate-700"
          >
            + Tambah Elemen CP
          </button>
        </div>
      </section>

      {/* ATP Semesters */}
      {[1, 2].map(s => {
        const sem = s as Semester;
        const us = state.unit.filter(u => u.sem === sem);
        const semJp = orderedTps(sem).reduce((a, t) => a + (Number(t.jp) || 0), 0);

        return (
          <section
            key={sem}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Alur Tujuan Pembelajaran · Semester {sem}
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {semJp} JP materi
              </span>
            </div>

            {us.length === 0 ? (
              <p className="text-sm text-slate-500 italic">Belum ada unit di semester ini.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {us.map(u => {
                  const tps = unitTps(u.id);
                  const uJp = unitJp(u.id);

                  return (
                    <div
                      key={u.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col gap-3.5"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="flex flex-col gap-1 flex-[2_1_220px] text-xs font-medium text-slate-600 dark:text-slate-400">
                          Lingkup materi / unit
                          <input
                            type="text"
                            className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm font-medium"
                            value={u.nama}
                            onChange={e => onChangeUnit(u.id, 'nama', e.target.value)}
                          />
                        </label>
                        <label className="flex flex-col gap-1 flex-[1_1_150px] text-xs font-medium text-slate-600 dark:text-slate-400">
                          Elemen
                          <select
                            className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm"
                            value={u.cpId}
                            onChange={e => onChangeUnit(u.id, 'cpId', e.target.value)}
                          >
                            <option value="">—</option>
                            {state.cp.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.elemen}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="flex flex-col gap-1 w-24 text-xs font-medium text-slate-600 dark:text-slate-400">
                          Semester
                          <select
                            className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm"
                            value={u.sem}
                            onChange={e => onChangeUnit(u.id, 'sem', Number(e.target.value))}
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                          </select>
                        </label>
                      </div>

                      {/* TP rows */}
                      <div className="flex flex-col gap-2 pt-1">
                        {tps.map(t => (
                          <div key={t.id} className="flex flex-wrap items-start gap-2.5">
                            <span className="text-xs font-bold text-slate-500 pt-2 w-10 shrink-0">
                              TP {getNo(t.id)}
                            </span>
                            <textarea
                              rows={2}
                              className="flex-1 min-w-[220px] px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm resize-y"
                              value={t.teks}
                              onChange={e => onChangeTp(t.id, 'teks', e.target.value)}
                              placeholder="Tujuan pembelajaran..."
                            />
                            <label className="flex flex-col gap-1 w-20 text-xs font-medium text-slate-600 dark:text-slate-400">
                              JP
                              <input
                                type="number"
                                min="0"
                                className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm"
                                value={t.jp}
                                onChange={e => onChangeTp(t.id, 'jp', Number(e.target.value))}
                              />
                            </label>
                            <div className="flex items-center gap-1 pt-5">
                              <button
                                onClick={() => onMoveTp(t.id, -1)}
                                title="Naikkan"
                                className="px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-100"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => onMoveTp(t.id, 1)}
                                title="Turunkan"
                                className="px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-100"
                              >
                                ↓
                              </button>
                              <button
                                onClick={() => onDeleteTp(t.id)}
                                className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                        <button
                          onClick={() => onAddTp(u.id)}
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md text-xs font-medium border border-slate-300 dark:border-slate-700"
                        >
                          + Tambah TP
                        </button>
                        <span className="text-xs text-slate-500 font-mono">{uJp} JP di unit ini</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onMoveUnit(u.id, -1)}
                            className="px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded"
                          >
                            ↑ Unit
                          </button>
                          <button
                            onClick={() => onMoveUnit(u.id, 1)}
                            className="px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded"
                          >
                            ↓ Unit
                          </button>
                          <button
                            onClick={() => onDeleteUnit(u.id)}
                            className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                          >
                            Hapus Unit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div>
              <button
                onClick={() => onAddUnit(sem)}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-slate-700"
              >
                + Tambah Unit Semester {sem}
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );

  const renderDoc = () => (
    <div className="docwrap">
      <article
        className="doc-paper wide font-serif"
        dangerouslySetInnerHTML={{ __html: generateCpatpHtml(state) }}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="CP dan ATP"
        lead="Tuliskan capaian pembelajaran per elemen, lalu susun alur tujuan pembelajaran (ATP) per semester. Semua berkas lain membaca data ini."
        tab="cpatp"
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
