import React from 'react';
import { AppState, UnitItem, TpItem } from '../types';
import { DocHeader } from './DocHeader';
import { DIMENSIONS } from '../data/defaultData';
import { generateModulHtml } from '../utils/docExport';

interface ModulTabProps {
  state: AppState;
  isDocView: boolean;
  onToggleView: (v: 'edit' | 'doc') => void;
  onCopyDoc: () => void;
  onSelectUnit: (unitId: string) => void;
  onChangeModul: (unitId: string, field: string, val: any) => void;
  onToggleDimensi: (unitId: string, dim: string) => void;
  onGenModul: (unitId: string) => void;
  onTabSelect: (tabId: string) => void;
}

export const ModulTab: React.FC<ModulTabProps> = ({
  state,
  isDocView,
  onToggleView,
  onCopyDoc,
  onSelectUnit,
  onChangeModul,
  onToggleDimensi,
  onGenModul,
  onTabSelect
}) => {
  const p = state.profil;
  const dots = (s?: string) => (s ? s : '…………………');

  if (state.unit.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <DocHeader
          title="Modul Ajar"
          lead="Satu modul untuk setiap unit pembelajaran."
          tab="modul"
          isDocView={isDocView}
          onToggleView={onToggleView}
          onCopy={onCopyDoc}
        />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center flex flex-col items-center gap-4">
          <p className="text-slate-600 dark:text-slate-400 m-0">
            Belum ada unit. Susun alur tujuan pembelajaran di CP–ATP terlebih dahulu.
          </p>
          <button
            onClick={() => onTabSelect('cpatp')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Buka CP–ATP
          </button>
        </div>
      </div>
    );
  }

  let currentUnit = state.unit.find(u => u.id === state.ui.unit);
  if (!currentUnit) {
    currentUnit = state.unit[0];
  }
  const uId = currentUnit.id;
  const modulData = state.modul[uId] || {};

  const unitTps = state.tp.filter(t => t.unitId === uId);
  const unitJp = unitTps.reduce((a, t) => a + (Number(t.jp) || 0), 0);

  const MODUL_FIELDS = [
    { g: 'A. Informasi Umum' },
    { k: 'awal', l: 'Kompetensi awal', h: 3 },
    { k: 'dimensi', l: 'Dimensi Profil Lulusan' },
    { k: 'sarana', l: 'Sarana dan prasarana', h: 2 },
    { k: 'target', l: 'Target peserta didik', h: 2 },
    { k: 'model', l: 'Model dan pendekatan pembelajaran', h: 2 },
    { g: 'B. Komponen Inti' },
    { k: 'pemahaman', l: 'Pemahaman bermakna', h: 3 },
    { k: 'pemantik', l: 'Pertanyaan pemantik', h: 3 },
    { k: 'pendahuluan', l: 'Kegiatan pendahuluan', h: 5 },
    { k: 'memahami', l: 'Kegiatan inti: memahami', h: 4 },
    { k: 'mengaplikasi', l: 'Kegiatan inti: mengaplikasi', h: 4 },
    { k: 'merefleksi', l: 'Kegiatan inti: merefleksi', h: 4 },
    { k: 'penutup', l: 'Kegiatan penutup', h: 4 },
    { g: 'C. Asesmen dan Tindak Lanjut' },
    { k: 'diagnostik', l: 'Asesmen diagnostik', h: 2 },
    { k: 'formatif', l: 'Asesmen formatif', h: 3 },
    { k: 'sumatif', l: 'Asesmen sumatif', h: 3 },
    { k: 'remedial', l: 'Remedial', h: 3 },
    { k: 'pengayaan', l: 'Pengayaan', h: 3 },
    { g: 'D. Refleksi dan Pustaka' },
    { k: 'refGuru', l: 'Refleksi guru', h: 4 },
    { k: 'refSiswa', l: 'Refleksi peserta didik', h: 4 },
    { k: 'pustaka', l: 'Daftar pustaka', h: 2 }
  ];

  const nl = (s?: string) =>
    String(s || '')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .map((l, i) => <p key={i} className="mb-1">{l}</p>);

  const lv = [
    ['Perlu Bimbingan', `0–${Number(p.b1) || 60}`],
    ['Cukup', `${(Number(p.b1) || 60) + 1}–${Number(p.b2) || 75}`],
    ['Baik', `${(Number(p.b2) || 75) + 1}–${Number(p.b3) || 90}`],
    ['Sangat Baik', `${(Number(p.b3) || 90) + 1}–100`]
  ];

  const renderEdit = () => (
    <div className="flex flex-col gap-6">
      {/* Unit picker & generator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex flex-wrap gap-2">
          {state.unit.map((u, i) => (
            <button
              key={u.id}
              onClick={() => onSelectUnit(u.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                u.id === uId
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {u.nama || `Unit ${i + 1}`} <span className="opacity-75 ml-1">S{u.sem}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => onGenModul(uId)}
          className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors"
        >
          Isi Kerangka Modul
        </button>
      </div>

      {/* Module form */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col gap-4">
        {MODUL_FIELDS.map((f, i) => {
          if (f.g) {
            return (
              <h3
                key={i}
                className="text-base font-bold text-slate-900 dark:text-slate-100 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 first:mt-0 first:pt-0 first:border-0"
              >
                {f.g}
              </h3>
            );
          }
          if (!f.k) return null;
          if (f.k === 'dimensi') {
            const curDim = modulData.dimensi || [];
            return (
              <div key={f.k} className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{f.l}</span>
                <div className="flex flex-wrap gap-1.5">
                  {DIMENSIONS.map(d => {
                    const active = curDim.includes(d);
                    return (
                      <button
                        key={d}
                        onClick={() => onToggleDimensi(uId, d)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          active
                            ? 'bg-emerald-700 border-emerald-700 text-white'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <label key={f.k} className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {f.l}
              <textarea
                rows={f.h || 3}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm resize-y"
                value={(modulData as any)[f.k] || ''}
                onChange={e => onChangeModul(uId, f.k!, e.target.value)}
              />
            </label>
          );
        })}
      </section>
    </div>
  );

  const renderDoc = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs no-print">
        {state.unit.map((u, i) => (
          <button
            key={u.id}
            onClick={() => onSelectUnit(u.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
              u.id === uId
                ? 'bg-emerald-700 border-emerald-700 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {u.nama || `Unit ${i + 1}`} <span className="opacity-75 ml-1">S{u.sem}</span>
          </button>
        ))}
      </div>

      <div className="docwrap">
        <article
          className="doc-paper font-serif"
          dangerouslySetInnerHTML={{ __html: generateModulHtml(state, uId) }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="Modul Ajar"
        lead="Satu modul untuk setiap unit. Identitas, tujuan pembelajaran, alokasi waktu, dan rubrik KKTP diambil otomatis; bagian lain dapat dibuat dari kerangka lalu disesuaikan."
        tab="modul"
        isDocView={isDocView}
        onToggleView={onToggleView}
        onCopy={onCopyDoc}
        state={state}
      />
      {isDocView ? renderDoc() : renderEdit()}
    </div>
  );
};
