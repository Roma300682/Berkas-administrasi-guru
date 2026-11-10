import React from 'react';
import { AppState, Semester } from '../types';
import { DocHeader } from './DocHeader';
import { docKop } from '../utils/docExport';

interface PromesTabProps {
  state: AppState;
  onCopyDoc: () => void;
  onTabSelect: (tabId: string) => void;
  onSemSelect: (sem: Semester) => void;
  onAutoSebar: (sem: Semester) => void;
  onClearPromes: (sem: Semester) => void;
  onToggleCell: (tpId: string, cellKey: string) => void;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

export const PromesTab: React.FC<PromesTabProps> = ({
  state,
  onCopyDoc,
  onTabSelect,
  onSemSelect,
  onAutoSebar,
  onClearPromes,
  onToggleCell,
  onChangeProfile,
  showToast
}) => {
  const p = state.profil;
  const sem = state.ui.sem;
  const bs = state.bulan.filter(b => b.sem === sem);

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

  const orderedTps = state.unit
    .filter(u => u.sem === sem)
    .flatMap(u => state.tp.filter(t => t.unitId === u.id));

  const totalCols = bs.reduce((acc, b) => acc + b.n, 0);

  const jpTotal = state.unit
    .filter(u => u.sem === sem)
    .flatMap(u => state.tp.filter(t => t.unitId === u.id))
    .reduce((a, t) => a + (Number(t.jp) || 0), 0);

  const dots = (s?: string) => (s ? s : '…………………');

  // Slots count
  const allSlots: string[] = [];
  bs.forEach(b => {
    for (let w = 0; w < b.n; w++) {
      if (!b.off.includes(w)) allSlots.push(`${b.id}:${w}`);
    }
  });

  const usedSlotsObj: Record<string, boolean> = {};
  orderedTps.forEach(t => {
    const set = state.promes[t.id] || [];
    set.forEach(k => {
      usedSlotsObj[k] = true;
    });
  });
  const usedSlotsCount = Object.keys(usedSlotsObj).length;

  if (orderedTps.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <DocHeader
          title="Program Semester"
          lead="Letakkan setiap tujuan pembelajaran pada minggu efektif. Klik sel untuk menandai atau menghapus."
          tab="promes"
          isDocView={true}
          onToggleView={() => {}}
          onCopy={onCopyDoc}
          noToggle
          state={state}
          onChangeProfile={onChangeProfile}
          showToast={showToast}
          extra={
            <div className="inline-flex border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
              <button
                onClick={() => onSemSelect(1)}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                  sem === 1 ? 'bg-emerald-700 text-white' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Semester 1
              </button>
              <button
                onClick={() => onSemSelect(2)}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                  sem === 2 ? 'bg-emerald-700 text-white' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Semester 2
              </button>
            </div>
          }
        />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center flex flex-col items-center gap-4">
          <p className="text-slate-600 dark:text-slate-400 m-0">
            Belum ada tujuan pembelajaran di semester {sem}. Susun alurnya di CP–ATP.
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

  const renderDoc = () => {
    let lastU: string | null = null;
    const inactiveKet = bs
      .filter(b => b.off.length > 0)
      .map(b => `${b.nama}${b.ket ? ` (${b.ket})` : ''}: minggu ${b.off.map(i => i + 1).join(', ')}`)
      .join('; ');

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 no-print">
          <div className="inline-flex border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
            <button
              onClick={() => onSemSelect(1)}
              className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                sem === 1 ? 'bg-emerald-700 text-white' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Semester 1
            </button>
            <button
              onClick={() => onSemSelect(2)}
              className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                sem === 2 ? 'bg-emerald-700 text-white' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Semester 2
            </button>
          </div>
          <button
            onClick={() => onAutoSebar(sem)}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Sebar Otomatis
          </button>
          <button
            onClick={() => onClearPromes(sem)}
            className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer"
          >
            Kosongkan Jadwal
          </button>
          <span className="text-xs text-slate-500 font-mono ml-auto">
            {usedSlotsCount} dari {allSlots.length} minggu efektif terisi
          </span>
        </div>

        <div className="docwrap">
          <article className="doc-paper wide font-serif">
            <div dangerouslySetInnerHTML={{ __html: docKop(state) }} />
            <h2>PROGRAM SEMESTER {sem}</h2>
            <p className="sub">
              Semester {sem === 1 ? 'Ganjil' : 'Genap'} Tahun Pelajaran {dots(p.ta)}
            </p>

            <table className="idt">
              <tbody>
                <tr>
                  <td style={{ width: '130pt' }}>Satuan Pendidikan</td>
                  <td>: {dots(p.sekolah)}</td>
                  <td style={{ width: '120pt', paddingLeft: '12pt' }}>Tahun Pelajaran</td>
                  <td>: {dots(p.ta)}</td>
                </tr>
                <tr>
                  <td>Mata Pelajaran</td>
                  <td>: {dots(p.mapel)}</td>
                  <td style={{ paddingLeft: '12pt' }}>Nama Guru</td>
                  <td>: {dots(p.guru)}</td>
                </tr>
                <tr>
                  <td>Fase / Kelas</td>
                  <td>: {dots(p.fase)} / {dots(p.kelas)}</td>
                  <td style={{ paddingLeft: '12pt' }}>Alokasi per Minggu</td>
                  <td>: {Number(p.jp) || 4} JP</td>
                </tr>
              </tbody>
            </table>

            <table className="dtbl">
              <thead>
                <tr>
                  <th style={{ width: '28px' }} rowSpan={2}>
                    No
                  </th>
                  <th style={{ minWidth: '220px' }} rowSpan={2}>
                    Tujuan Pembelajaran
                  </th>
                  <th style={{ width: '36px' }} rowSpan={2}>
                    JP
                  </th>
                  {bs.map(b => (
                    <th key={b.id} colSpan={b.n}>
                      {b.nama}
                    </th>
                  ))}
                </tr>
                <tr>
                  {bs.map(b =>
                    Array.from({ length: b.n }).map((_, i) => (
                      <th key={`${b.id}-${i}`} style={{ width: '24px', padding: '2px' }}>
                        {i + 1}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {orderedTps.map(t => {
                  const u = state.unit.find(x => x.id === t.unitId);
                  const showGroup = u && u.id !== lastU;
                  if (u) lastU = u.id;
                  const set = state.promes[t.id] || [];

                  return (
                    <React.Fragment key={t.id}>
                      {showGroup && u && (
                        <tr className="grp">
                          <td colSpan={3 + totalCols}>{u.nama}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="c">{getNo(t.id)}</td>
                        <td>{t.teks}</td>
                        <td className="c">{t.jp}</td>
                        {bs.map(b =>
                          Array.from({ length: b.n }).map((_, i) => {
                            const key = `${b.id}:${i}`;
                            const isOff = b.off.includes(i);
                            const isOn = set.includes(key);

                            if (isOff) {
                              return (
                                <td
                                  key={key}
                                  className="c"
                                  style={{
                                    background: '#d4d4d4',
                                    color: '#555555',
                                    fontWeight: 700,
                                    padding: 0,
                                    verticalAlign: 'middle'
                                  }}
                                  title="Libur / Tidak Efektif"
                                >
                                  L
                                </td>
                              );
                            }

                            return (
                              <td
                                key={key}
                                onClick={() => onToggleCell(t.id, key)}
                                className="c cursor-pointer transition-colors"
                                style={{
                                  padding: 0,
                                  verticalAlign: 'middle',
                                  background: isOn ? '#0E6B5A' : undefined,
                                  color: isOn ? '#ffffff' : undefined
                                }}
                              >
                                <button
                                  type="button"
                                  className="w-full h-7 bg-transparent border-0 cursor-pointer font-bold text-xs flex items-center justify-center"
                                >
                                  {isOn ? '✓' : ''}
                                </button>
                              </td>
                            );
                          })
                        )}
                      </tr>
                    </React.Fragment>
                  );
                })}
                <tr className="tot">
                  <td className="r" colSpan={3}>
                    Jumlah JP
                  </td>
                  <td className="c" colSpan={totalCols}>
                    {jpTotal} JP
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: '9.5pt', color: '#444444' }}>
              <i>
                ✓ = minggu pembelajaran. L = minggu tidak efektif.
                {inactiveKet ? ` Minggu tidak efektif — ${inactiveKet}.` : ''}
              </i>
            </p>

            <table className="sign">
              <tbody>
                <tr>
                  <td>
                    Mengetahui,<br />
                    Kepala Sekolah<br /><br /><br /><br />
                    <b><u>{dots(p.kepsek)}</u></b><br />
                    NIP. {p.nipKs || '…………………'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {p.kota || '…………'}, {p.tgl || '…………………'}<br />
                    Guru Mata Pelajaran<br /><br /><br /><br />
                    <b><u>{dots(p.guru)}</u></b><br />
                    NIP. {p.nip || '…………………'}
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <DocHeader
        title="Program Semester"
        lead="Letakkan setiap tujuan pembelajaran pada minggu efektif. Klik sel untuk menandai atau menghapus. Minggu tidak efektif dari Analisis Waktu sudah diarsir."
        tab="promes"
        isDocView={true}
        onToggleView={() => {}}
        onCopy={onCopyDoc}
        noToggle
        state={state}
        onChangeProfile={onChangeProfile}
        showToast={showToast}
      />
      {renderDoc()}
    </div>
  );
};
