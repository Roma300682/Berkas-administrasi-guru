import React, { useState } from 'react';
import { AppState } from '../types';
import {
  downloadDocForTab,
  downloadAllModulWord,
  downloadAllLkpdWord,
  downloadAllSoalWord,
  triggerDocDownload,
} from '../utils/docExport';
import { KopEditor } from './KopEditor';

interface DocHeaderProps {
  title: string;
  lead: string;
  tab: string;
  isDocView: boolean;
  onToggleView: (view: 'edit' | 'doc') => void;
  onCopy: () => void;
  noToggle?: boolean;
  extra?: React.ReactNode;
  state?: AppState;
  onChangeProfile?: (key: string, val: any) => void;
  showToast?: (msg: string) => void;
}

export const DocHeader: React.FC<DocHeaderProps> = ({
  title,
  lead,
  tab,
  isDocView,
  onToggleView,
  onCopy,
  noToggle,
  extra,
  state,
  onChangeProfile,
  showToast,
}) => {
  const [showKopEditor, setShowKopEditor] = useState(false);

  const handleDownloadWord = () => {
    if (state) {
      const filename = downloadDocForTab(state, tab);
      showToast?.(`Berhasil mengunduh ${filename}`);
      return;
    }

    const docEl =
      document.querySelector('article.doc-paper') ||
      document.querySelector('article.font-serif');
    if (!docEl) return;

    const clone = docEl.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('button').forEach(b => {
      const span = document.createElement('span');
      span.textContent = b.textContent || '';
      b.replaceWith(span);
    });
    triggerDocDownload(
      clone.innerHTML,
      `${title.replace(/[^a-zA-Z0-9]+/g, '_')}_A4.doc`,
      title,
      tab === 'cpatp' || tab === 'promes' || tab === 'kktp'
    );
    showToast?.(`Berhasil mengunduh dokumen ${title} (Format A4).doc`);
  };

  const handleDownloadAllUnits = () => {
    if (!state) return;
    if (tab === 'modul') {
      const fn = downloadAllModulWord(state);
      showToast?.(`Berhasil mengunduh semua Modul Ajar Format A4 (${fn})`);
    } else if (tab === 'lkpd') {
      const fn = downloadAllLkpdWord(state);
      showToast?.(`Berhasil mengunduh semua LKPD Format A4 (${fn})`);
    } else if (tab === 'soal') {
      const fn = downloadAllSoalWord(state);
      showToast?.(`Berhasil mengunduh semua Soal Ujian Format A4 (${fn})`);
    }
  };

  const isLandscapeDoc = tab === 'cpatp' || tab === 'promes' || tab === 'kktp';

  return (
    <div className="flex flex-col gap-4 no-print">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-3xl text-sm lg:text-base">
            {lead}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
          <span>📄</span>
          <span>
            Format Kertas A4 ({isLandscapeDoc ? 'Landscape 29,7 × 21 cm' : 'Portrait 21 × 29,7 cm'})
          </span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {!noToggle && (
          <div className="inline-flex border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
            <button
              type="button"
              onClick={() => onToggleView('edit')}
              aria-pressed={!isDocView}
              className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                !isDocView
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Isi Data
            </button>
            <button
              type="button"
              onClick={() => onToggleView('doc')}
              aria-pressed={isDocView}
              className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                isDocView
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Bentuk Dokumen (A4)
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleDownloadWord}
          className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs lg:text-sm font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>📥</span>
          <span>Unduh Dokumen A4 (.doc)</span>
        </button>

        {state && state.unit.length > 1 && (tab === 'modul' || tab === 'lkpd' || tab === 'soal') && (
          <button
            type="button"
            onClick={handleDownloadAllUnits}
            className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs lg:text-sm font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>📚</span>
            <span>
              Unduh Semua {tab === 'modul' ? 'Modul' : tab === 'lkpd' ? 'LKPD' : 'Soal Ujian'} A4 ({state.unit.length} Unit)
            </span>
          </button>
        )}

        {state && onChangeProfile && (
          <button
            type="button"
            onClick={() => setShowKopEditor(prev => !prev)}
            className={`px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors border flex items-center gap-1.5 cursor-pointer ${
              showKopEditor
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            <span>🏫</span>
            <span>{showKopEditor ? 'Tutup Pengaturan Kop' : 'Edit Kop & Logo Sekolah'}</span>
          </button>
        )}

        {(isDocView || noToggle) && (
          <>
            <button
              type="button"
              onClick={onCopy}
              className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>📋</span>
              <span>Salin ke Word</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>🖨️</span>
              <span>Cetak / PDF (A4)</span>
            </button>
          </>
        )}

        {extra}
      </div>

      {showKopEditor && state && onChangeProfile && (
        <KopEditor
          state={state}
          onChangeProfile={onChangeProfile}
          showToast={showToast}
          compact
        />
      )}
    </div>
  );
};
