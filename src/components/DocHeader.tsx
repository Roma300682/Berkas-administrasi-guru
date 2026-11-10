import React from 'react';
import { AppState } from '../types';
import {
  downloadDocForTab,
  downloadAllModulWord,
  downloadAllLkpdWord,
  triggerDocDownload,
} from '../utils/docExport';

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
  showToast,
}) => {
  const handleDownloadWord = () => {
    if (state) {
      const filename = downloadDocForTab(state, tab);
      showToast?.(`Berhasil mengunduh ${filename}`);
      return;
    }

    // Fallback DOM extraction if state is not passed
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
      `${title.replace(/[^a-zA-Z0-9]+/g, '_')}.doc`,
      title,
      tab === 'promes' || tab === 'kktp'
    );
    showToast?.(`Berhasil mengunduh dokumen ${title}.doc`);
  };

  const handleDownloadAllUnits = () => {
    if (!state) return;
    if (tab === 'modul') {
      const fn = downloadAllModulWord(state);
      showToast?.(`Berhasil mengunduh semua Modul Ajar (${fn})`);
    } else if (tab === 'lkpd') {
      const fn = downloadAllLkpdWord(state);
      showToast?.(`Berhasil mengunduh semua LKPD (${fn})`);
    }
  };

  return (
    <div className="flex flex-col gap-4 no-print">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-3xl text-sm lg:text-base">
          {lead}
        </p>
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
              Bentuk Dokumen
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleDownloadWord}
          className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs lg:text-sm font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>📥</span>
          <span>Unduh Dokumen (.doc)</span>
        </button>

        {state && state.unit.length > 1 && (tab === 'modul' || tab === 'lkpd') && (
          <button
            type="button"
            onClick={handleDownloadAllUnits}
            className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs lg:text-sm font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>📚</span>
            <span>
              Unduh Semua {tab === 'modul' ? 'Modul' : 'LKPD'} ({state.unit.length} Unit)
            </span>
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
              <span>Cetak / PDF</span>
            </button>
          </>
        )}

        {extra}
      </div>
    </div>
  );
};
