import React from 'react';
import { AppState, Semester } from '../types';
import { DocHeader } from './DocHeader';
import { generateProtaHtml } from '../utils/docExport';

interface ProtaTabProps {
  state: AppState;
  onCopyDoc: () => void;
  onTabSelect: (tabId: string) => void;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

export const ProtaTab: React.FC<ProtaTabProps> = ({
  state,
  onCopyDoc,
  onTabSelect,
  onChangeProfile,
  showToast
}) => {
  const p = state.profil;
  const jp = Number(p.jp) || 0;

  const jpAvail = (sem: Semester) => {
    const bs = state.bulan.filter(b => b.sem === sem);
    return bs.reduce((acc, b) => acc + (b.n - b.off.length) * jp, 0);
  };

  const jpTotal = (sem: Semester) => {
    const uIds = state.unit.filter(u => u.sem === sem).map(u => u.id);
    const tps = state.tp.filter(t => uIds.includes(t.unitId));
    return tps.reduce((acc, t) => acc + (Number(t.jp) || 0), 0);
  };

  if (state.tp.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <DocHeader
          title="Program Tahunan"
          lead="Disusun otomatis dari alur tujuan pembelajaran dan analisis waktu. Ubah isinya di CP–ATP."
          tab="prota"
          isDocView={false}
          onToggleView={() => {}}
          onCopy={onCopyDoc}
          noToggle
          state={state}
          onChangeProfile={onChangeProfile}
          showToast={showToast}
        />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center flex flex-col items-center gap-4">
          <p className="text-slate-600 dark:text-slate-400 m-0 max-w-lg">
            Belum ada tujuan pembelajaran. Susun alurnya di CP–ATP, lalu Program Tahunan terisi sendiri.
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

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="Program Tahunan"
        lead="Disusun otomatis dari alur tujuan pembelajaran dan analisis waktu. Ubah isinya di CP–ATP."
        tab="prota"
        isDocView={true}
        onToggleView={() => {}}
        onCopy={onCopyDoc}
        noToggle
        state={state}
        onChangeProfile={onChangeProfile}
        showToast={showToast}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 no-print">
        {[1, 2].map(s => {
          const sem = s as Semester;
          const av = jpAvail(sem);
          const tot = jpTotal(sem);
          const diff = av - tot;
          const pct = av ? Math.min(100, (tot / av) * 100) : tot ? 100 : 0;
          const isOver = tot > av;

          return (
            <div
              key={sem}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col gap-2"
            >
              <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                <span>Semester {sem}</span>
                <span>
                  {tot} JP materi dari {av} JP efektif
                </span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                <div
                  className={`h-full transition-all duration-300 ${
                    isOver ? 'bg-amber-600' : 'bg-emerald-700'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
                {diff >= 0
                  ? `Sisa ${diff} JP untuk asesmen, remedial, dan cadangan.`
                  : `Kelebihan ${-diff} JP. Kurangi materi atau tambah minggu efektif.`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="docwrap">
        <article
          className="doc-paper font-serif"
          dangerouslySetInnerHTML={{ __html: generateProtaHtml(state) }}
        />
      </div>
    </div>
  );
};
