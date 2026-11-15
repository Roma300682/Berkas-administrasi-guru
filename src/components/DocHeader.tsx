import React, { useState } from 'react';
import {
  FileEdit,
  Download,
  Layers,
  Building2,
  Copy,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { AppState } from '../types';
import {
  downloadDocForTab,
  downloadAllModulWord,
  downloadAllLkpdWord,
  downloadAllSoalWord,
  getDocScopeInfo,
  triggerDocDownload,
} from '../utils/docExport';
import { useDocActions } from '../context/DocActionContext';
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
  const { openDocEditor, resetCustomDoc } = useDocActions();

  const scopeInfo = state ? getDocScopeInfo(state, tab) : null;

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
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            Format Kertas A4 ({isLandscapeDoc ? 'Landscape 29,7 × 21 cm' : 'Portrait 21 × 29,7 cm'})
          </span>
          {scopeInfo?.isCustom && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                Diedit Manual (Aktif untuk Unduhan)
              </span>
            </>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-sm lg:text-[15px] leading-relaxed">
          {lead}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {!noToggle && (
          <div className="inline-flex border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onToggleView('edit')}
              aria-pressed={!isDocView}
              className={`px-3.5 py-1.5 rounded-md text-xs lg:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                !isDocView
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Isi Data
            </button>
            <button
              type="button"
              onClick={() => onToggleView('doc')}
              aria-pressed={isDocView}
              className={`px-3.5 py-1.5 rounded-md text-xs lg:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isDocView
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Pratinjau A4
            </button>
          </div>
        )}

        {state && (
          <button
            type="button"
            onClick={() => openDocEditor(tab)}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 rounded-lg text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <FileEdit className="w-4 h-4" />
            <span>Edit Dokumen Sebelum Unduh</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleDownloadWord}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs lg:text-sm font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Dokumen A4 (.doc)</span>
        </button>

        {state && state.unit.length > 1 && (tab === 'modul' || tab === 'lkpd' || tab === 'soal') && (
          <button
            type="button"
            onClick={handleDownloadAllUnits}
            className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs lg:text-sm font-semibold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Layers className="w-4 h-4" />
            <span>
              Unduh Semua {tab === 'modul' ? 'Modul' : tab === 'lkpd' ? 'LKPD' : 'Soal Ujian'} ({state.unit.length} Unit)
            </span>
          </button>
        )}

        {state && onChangeProfile && (
          <button
            type="button"
            onClick={() => setShowKopEditor(prev => !prev)}
            className={`px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors border flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              showKopEditor
                ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-200 dark:text-slate-900'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{showKopEditor ? 'Tutup Kop Sekolah' : 'Kop & Logo'}</span>
          </button>
        )}

        {(isDocView || noToggle) && (
          <>
            <button
              type="button"
              onClick={onCopy}
              className="px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Copy className="w-4 h-4" />
              <span>Salin ke Word</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
          </>
        )}

        {extra}
      </div>

      {scopeInfo?.isCustom && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-amber-900 dark:text-amber-200 m-0">
            <b>Mode Hasil Edit Manual aktif</b> untuk dokumen ini. Perubahan dari form data tidak otomatis menimpa teks yang sudah Anda edit.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openDocEditor(tab)}
              className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded-md text-xs font-semibold transition-colors cursor-pointer"
            >
              Edit Lagi
            </button>
            <button
              type="button"
              onClick={() => {
                resetCustomDoc(scopeInfo.scopeKey);
                showToast?.('Dokumen dikembalikan ke format otomatis dari data aplikasi.');
              }}
              className="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-amber-300 dark:border-amber-700 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembalikan ke Otomatis</span>
            </button>
          </div>
        </div>
      )}

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
