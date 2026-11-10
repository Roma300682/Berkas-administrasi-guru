import React from 'react';
import { AppState, Semester } from '../types';
import { DocHeader } from './DocHeader';
import { generateWaktuHtml } from '../utils/docExport';

interface WaktuTabProps {
  state: AppState;
  isDocView: boolean;
  onToggleView: (v: 'edit' | 'doc') => void;
  onCopyDoc: () => void;
  onChangeMonth: (id: string, field: string, val: any) => void;
  onToggleWeekOff: (monthId: string, weekIdx: number) => void;
  onAddMonth: (sem: Semester) => void;
  onDeleteMonth: (id: string) => void;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

export const WaktuTab: React.FC<WaktuTabProps> = ({
  state,
  isDocView,
  onToggleView,
  onCopyDoc,
  onChangeMonth,
  onToggleWeekOff,
  onAddMonth,
  onDeleteMonth,
  onChangeProfile,
  showToast
}) => {
  const p = state.profil;
  const jp = Number(p.jp) || 0;

  const getBulanSem = (sem: Semester) => state.bulan.filter(b => b.sem === sem);
  const mgEf = (b: { n: number; off: number[] }) => b.n - b.off.length;

  const jpAvail = (sem: Semester) => {
    return getBulanSem(sem).reduce((acc, b) => acc + mgEf(b) * jp, 0);
  };

  const jpTotal = (sem: Semester) => {
    const uIds = state.unit.filter(u => u.sem === sem).map(u => u.id);
    const tps = state.tp.filter(t => uIds.includes(t.unitId));
    return tps.reduce((acc, t) => acc + (Number(t.jp) || 0), 0);
  };

  const dots = (s?: string) => (s ? s : '…………………');

  const renderEdit = () => (
    <div className="flex flex-col gap-6">
      {[1, 2].map(s => {
        const sem = s as Semester;
        const bs = getBulanSem(sem);
        const totalWeeks = bs.reduce((a, b) => a + b.n, 0);
        const totalOff = bs.reduce((a, b) => a + b.off.length, 0);
        const totalEf = totalWeeks - totalOff;
        const totalJp = totalEf * jp;

        return (
          <section
            key={sem}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Semester {sem} ({sem === 1 ? 'Ganjil' : 'Genap'})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono m-0">
                {totalWeeks} minggu · {totalOff} tidak efektif · {totalEf} efektif · {totalJp} JP
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {bs.map(b => {
                const effectiveWeeks = mgEf(b);
                const effectiveJp = effectiveWeeks * jp;

                return (
                  <div
                    key={b.id}
                    className="flex flex-col gap-3 p-3.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-lg"
                  >
                    <div className="flex flex-wrap items-end gap-3">
                      <label className="flex flex-col gap-1 flex-1 min-w-[140px] text-xs font-medium text-slate-600 dark:text-slate-400">
                        Bulan
                        <input
                          type="text"
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm"
                          value={b.nama}
                          onChange={e => onChangeMonth(b.id, 'nama', e.target.value)}
                        />
                      </label>
                      <label className="flex flex-col gap-1 w-28 text-xs font-medium text-slate-600 dark:text-slate-400">
                        Jumlah minggu
                        <input
                          type="number"
                          min="1"
                          max="6"
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-sm"
                          value={b.n}
                          onChange={e => onChangeMonth(b.id, 'n', Math.max(1, Math.min(6, Number(e.target.value))))}
                        />
                      </label>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-mono pb-1">
                        <b>{effectiveWeeks}</b> minggu efektif<br />
                        <span className="font-bold text-slate-900 dark:text-slate-100">{effectiveJp} JP</span>
                      </div>
                      <button
                        onClick={() => onDeleteMonth(b.id)}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md text-xs font-medium transition-colors ml-auto"
                      >
                        Hapus
                      </button>
                    </div>

                    {/* Weekly Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Array.from({ length: b.n }).map((_, i) => {
                        const isOff = b.off.includes(i);
                        return (
                          <button
                            key={i}
                            onClick={() => onToggleWeekOff(b.id, i)}
                            title={`Minggu ke-${i + 1}${isOff ? ' (tidak efektif)' : ''}`}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
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
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 text-xs"
                      placeholder="Keterangan minggu tidak efektif (libur, asesmen, kegiatan sekolah)"
                      value={b.ket}
                      onChange={e => onChangeMonth(b.id, 'ket', e.target.value)}
                    />
                  </div>
                );
              })}
            </div>

            <div>
              <button
                onClick={() => onAddMonth(sem)}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-slate-700"
              >
                + Tambah Bulan Semester {sem}
              </button>
            </div>
          </section>
        );
      })}
      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
        * Klik nomor minggu untuk menandainya tidak efektif. Minggu efektif dikalikan JP per minggu (diatur di Beranda) menjadi batas JP semester.
      </p>
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
        title="Analisis Waktu"
        lead="Hitung minggu dan JP efektif tiap semester. Hasilnya menjadi batas JP untuk Program Tahunan dan Program Semester."
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
