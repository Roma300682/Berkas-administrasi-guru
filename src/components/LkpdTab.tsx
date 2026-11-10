import React from 'react';
import { AppState } from '../types';
import { DocHeader } from './DocHeader';
import { generateLkpdHtml } from '../utils/docExport';

interface LkpdTabProps {
  state: AppState;
  isDocView: boolean;
  onToggleView: (v: 'edit' | 'doc') => void;
  onCopyDoc: () => void;
  onSelectUnitL: (unitId: string) => void;
  onChangeLkpd: (unitId: string, field: string, val: any) => void;
  onGenLkpd: (unitId: string) => void;
  onTabSelect: (tabId: string) => void;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

export const LkpdTab: React.FC<LkpdTabProps> = ({
  state,
  isDocView,
  onToggleView,
  onCopyDoc,
  onSelectUnitL,
  onChangeLkpd,
  onGenLkpd,
  onTabSelect,
  onChangeProfile,
  showToast
}) => {
  const p = state.profil;
  const dots = (s?: string) => (s ? s : '…………………');

  if (state.unit.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <DocHeader
          title="LKPD"
          lead="Lembar kerja peserta didik per unit."
          tab="lkpd"
          isDocView={isDocView}
          onToggleView={onToggleView}
          onCopy={onCopyDoc}
          state={state}
          onChangeProfile={onChangeProfile}
          showToast={showToast}
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

  let currentUnit = state.unit.find(u => u.id === state.ui.unitL);
  if (!currentUnit) {
    currentUnit = state.unit[0];
  }
  const uId = currentUnit.id;
  const lkpdData = state.lkpd[uId] || {};

  const unitTps = state.tp.filter(t => t.unitId === uId);

  const LKPD_FIELDS = [
    { k: 'judul', l: 'Judul LKPD', t: 'in' },
    { k: 'petunjuk', l: 'Petunjuk belajar', h: 5 },
    { k: 'tujuan', l: 'Tujuan pembelajaran', h: 3 },
    { k: 'alat', l: 'Alat dan bahan', h: 2 },
    { k: 'kegiatan', l: 'Langkah kegiatan', h: 4 },
    { k: 'tugas', l: 'Tugas (satu baris untuk satu tugas)', h: 6 },
    { k: 'baris', l: 'Baris jawaban per tugas', t: 'num' },
    { k: 'kesimpulan', l: 'Pertanyaan kesimpulan', h: 2 },
    { k: 'refleksi', l: 'Pengantar refleksi', h: 2 }
  ];

  const nl = (s?: string) =>
    String(s || '')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .map((l, i) => <p key={i} className="mb-1">{l}</p>);

  const lines = (s?: string) =>
    String(s || '')
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);

  const lv = [
    ['Perlu Bimbingan', `0–${Number(p.b1) || 60}`],
    ['Cukup', `${(Number(p.b1) || 60) + 1}–${Number(p.b2) || 75}`],
    ['Baik', `${(Number(p.b2) || 75) + 1}–${Number(p.b3) || 90}`],
    ['Sangat Baik', `${(Number(p.b3) || 90) + 1}–100`]
  ];

  const renderEdit = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex flex-wrap gap-2">
          {state.unit.map((u, i) => (
            <button
              key={u.id}
              onClick={() => onSelectUnitL(u.id)}
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
          onClick={() => onGenLkpd(uId)}
          className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors"
        >
          Isi Kerangka LKPD
        </button>
      </div>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col gap-4">
        {LKPD_FIELDS.map(f => {
          if (f.t === 'in') {
            return (
              <label key={f.k} className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                {f.l}
                <input
                  type="text"
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                  value={(lkpdData as any)[f.k] || ''}
                  onChange={e => onChangeLkpd(uId, f.k, e.target.value)}
                />
              </label>
            );
          }
          if (f.t === 'num') {
            return (
              <label key={f.k} className="flex flex-col gap-1 w-40 text-xs font-medium text-slate-600 dark:text-slate-400">
                {f.l}
                <input
                  type="number"
                  min="1"
                  max="12"
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                  value={(lkpdData as any)[f.k] || 3}
                  onChange={e => onChangeLkpd(uId, f.k, Number(e.target.value))}
                />
              </label>
            );
          }
          return (
            <label key={f.k} className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {f.l}
              <textarea
                rows={f.h || 3}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm resize-y"
                value={(lkpdData as any)[f.k] || ''}
                onChange={e => onChangeLkpd(uId, f.k, e.target.value)}
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
            onClick={() => onSelectUnitL(u.id)}
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
          dangerouslySetInnerHTML={{ __html: generateLkpdHtml(state, uId) }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="LKPD"
        lead="Lembar kerja untuk setiap unit. Tujuan dan tugas diturunkan dari tujuan pembelajaran unit, lalu dapat Anda tulis ulang sesuai kegiatan kelas."
        tab="lkpd"
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
