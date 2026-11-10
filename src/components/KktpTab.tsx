import React from 'react';
import { AppState, Semester, TpItem } from '../types';
import { DocHeader } from './DocHeader';
import { generateKktpHtml } from '../utils/docExport';

interface KktpTabProps {
  state: AppState;
  isDocView: boolean;
  onToggleView: (v: 'edit' | 'doc') => void;
  onCopyDoc: () => void;
  onChangeProfile: (key: string, val: any) => void;
  onChangeTp: (id: string, field: string, val: any) => void;
  onGenKktp: (id: string) => void;
  onGenAllKktp: () => void;
  onTabSelect: (tabId: string) => void;
  showToast?: (msg: string) => void;
}

export const KktpTab: React.FC<KktpTabProps> = ({
  state,
  isDocView,
  onToggleView,
  onCopyDoc,
  onChangeProfile,
  onChangeTp,
  onGenKktp,
  onGenAllKktp,
  onTabSelect,
  showToast
}) => {
  const p = state.profil;
  const dots = (s?: string) => (s ? s : '…………………');

  const orderedTps = [1, 2].flatMap(s => {
    const us = state.unit.filter(u => u.sem === (s as Semester));
    return us.flatMap(u => state.tp.filter(t => t.unitId === u.id));
  });

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

  const b1 = Number(p.b1) || 60;
  const b2 = Number(p.b2) || 75;
  const b3 = Number(p.b3) || 90;

  const lv = [
    ['Perlu Bimbingan', `0–${b1}`],
    ['Cukup', `${b1 + 1}–${b2}`],
    ['Baik', `${b2 + 1}–${b3}`],
    ['Sangat Baik', `${b3 + 1}–100`]
  ];

  if (orderedTps.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <DocHeader
          title="KKTP"
          lead="Kriteria ketercapaian untuk setiap tujuan pembelajaran, dalam bentuk rubrik empat tingkat."
          tab="kktp"
          isDocView={isDocView}
          onToggleView={onToggleView}
          onCopy={onCopyDoc}
          state={state}
          onChangeProfile={onChangeProfile}
          showToast={showToast}
        />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center flex flex-col items-center gap-4">
          <p className="text-slate-600 dark:text-slate-400 m-0">
            Belum ada tujuan pembelajaran. KKTP disusun untuk setiap TP.
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

  const renderEdit = () => (
    <div className="flex flex-col gap-6">
      {/* Interval values */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Interval Nilai</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Batas atas tiap tingkat. Tingkat Sangat Baik berakhir di 100.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1 w-32 text-xs font-medium text-slate-600 dark:text-slate-400">
            Perlu Bb s.d.
            <input
              type="number"
              min="0"
              max="99"
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
              value={p.b1}
              onChange={e => onChangeProfile('b1', Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 w-32 text-xs font-medium text-slate-600 dark:text-slate-400">
            Cukup s.d.
            <input
              type="number"
              min="0"
              max="99"
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
              value={p.b2}
              onChange={e => onChangeProfile('b2', Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 w-32 text-xs font-medium text-slate-600 dark:text-slate-400">
            Baik s.d.
            <input
              type="number"
              min="0"
              max="99"
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
              value={p.b3}
              onChange={e => onChangeProfile('b3', Number(e.target.value))}
            />
          </label>
          <button
            onClick={onGenAllKktp}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors ml-auto"
          >
            Isi Kerangka Semua TP yang Kosong
          </button>
        </div>
      </section>

      {/* TPs KKTP Cards */}
      <div className="flex flex-col gap-4">
        {orderedTps.map(t => {
          const u = state.unit.find(x => x.id === t.unitId);
          return (
            <div
              key={t.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <b className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  TP {getNo(t.id)}
                </b>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {u ? u.nama : ''}
                </span>
                <button
                  onClick={() => onGenKktp(t.id)}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium border border-slate-300 dark:border-slate-700 ml-auto"
                >
                  Isi Kerangka
                </button>
              </div>

              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 m-0">{t.teks}</p>

              <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Kriteria ketercapaian
                <textarea
                  rows={2}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm resize-y"
                  value={t.ind}
                  onChange={e => onChangeTp(t.id, 'ind', e.target.value)}
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {lv[0][0]} ({lv[0][1]})
                  <textarea
                    rows={2}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs resize-y"
                    value={t.r1}
                    onChange={e => onChangeTp(t.id, 'r1', e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {lv[1][0]} ({lv[1][1]})
                  <textarea
                    rows={2}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs resize-y"
                    value={t.r2}
                    onChange={e => onChangeTp(t.id, 'r2', e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {lv[2][0]} ({lv[2][1]})
                  <textarea
                    rows={2}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs resize-y"
                    value={t.r3}
                    onChange={e => onChangeTp(t.id, 'r3', e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {lv[3][0]} ({lv[3][1]})
                  <textarea
                    rows={2}
                    className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-xs resize-y"
                    value={t.r4}
                    onChange={e => onChangeTp(t.id, 'r4', e.target.value)}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Teknik asesmen
                <input
                  type="text"
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                  value={t.teknik}
                  onChange={e => onChangeTp(t.id, 'teknik', e.target.value)}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDoc = () => (
    <div className="docwrap">
      <article
        className="doc-paper wide font-serif"
        dangerouslySetInnerHTML={{ __html: generateKktpHtml(state) }}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="KKTP"
        lead="Kriteria ketercapaian untuk setiap tujuan pembelajaran, dalam bentuk rubrik empat tingkat. Tujuan pembelajaran diambil dari CP–ATP."
        tab="kktp"
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
