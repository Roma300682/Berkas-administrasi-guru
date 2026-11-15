import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Save, RotateCcw, Copy, Printer, CheckCircle2, FileEdit } from 'lucide-react';
import { AppState } from '../types';
import {
  copyHtmlToClipboard,
  getDocScopeInfo,
  triggerDocDownload,
} from '../utils/docExport';
import { DocRichToolbar } from './DocRichToolbar';

interface DocEditorModalProps {
  isOpen: boolean;
  state: AppState;
  tab: string;
  onClose: () => void;
  onSaveCustomDoc: (scopeKey: string, html: string) => void;
  onResetCustomDoc: (scopeKey: string) => void;
  showToast?: (msg: string) => void;
}

export const DocEditorModal: React.FC<DocEditorModalProps> = ({
  isOpen,
  state,
  tab,
  onClose,
  onSaveCustomDoc,
  onResetCustomDoc,
  showToast,
}) => {
  const editorRef = useRef<HTMLElement>(null);
  const info = getDocScopeInfo(state, tab);

  const [filename, setFilename] = useState(info.filename);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Sync editor DOM content when modal opens or tab/scope changes
  useEffect(() => {
    if (!isOpen) return;
    const latest = getDocScopeInfo(state, tab);
    setFilename(latest.filename);
    setHasUnsaved(false);
    if (editorRef.current) {
      editorRef.current.innerHTML = latest.activeHtml;
    }
  }, [isOpen, tab, info.scopeKey]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const readEditorHtml = (): string => {
    return editorRef.current ? editorRef.current.innerHTML : info.activeHtml;
  };

  const handleSaveOnly = () => {
    const html = readEditorHtml();
    onSaveCustomDoc(info.scopeKey, html);
    setHasUnsaved(false);
    showToast?.('Perubahan dokumen berhasil disimpan. Hasil edit akan dipakai saat unduh & cetak.');
  };

  const handleSaveAndDownload = () => {
    const html = readEditorHtml();
    onSaveCustomDoc(info.scopeKey, html);
    setHasUnsaved(false);
    const cleanName = (filename.trim() || info.filename).replace(/[/\\?%*:|"<>]/g, '_');
    const finalName = cleanName.endsWith('.doc') ? cleanName : `${cleanName}.doc`;
    triggerDocDownload(html, finalName, info.title, info.landscape);
    showToast?.(`Berhasil menyimpan & mengunduh ${finalName}`);
  };

  const handleResetToAuto = () => {
    onResetCustomDoc(info.scopeKey);
    const latestGenerated = getDocScopeInfo(state, tab).generatedHtml;
    if (editorRef.current) {
      editorRef.current.innerHTML = latestGenerated;
    }
    setHasUnsaved(false);
    showToast?.('Dokumen dikembalikan ke format otomatis sesuai data terbaru.');
  };

  const handleCopyEdited = async () => {
    const html = readEditorHtml();
    const ok = await copyHtmlToClipboard(html);
    if (ok) {
      showToast?.('Isi dokumen hasil edit disalin ke clipboard (siap tempel ke Word/Docs).');
    } else {
      showToast?.('Gagal menyalin isi dokumen.');
    }
  };

  const handlePrintEdited = () => {
    const html = readEditorHtml();
    onSaveCustomDoc(info.scopeKey, html);
    setHasUnsaved(false);
    setTimeout(() => window.print(), 120);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 no-print"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit Dokumen: ${info.title}`}
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-[1220px] h-[94vh] flex flex-col overflow-hidden">
        {/* Top Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/90 dark:bg-slate-900">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <FileEdit className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                Edit Dokumen Sebelum Unduh
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                · {info.landscape ? 'A4 Landscape (29,7 × 21 cm)' : 'A4 Portrait (21 × 29,7 cm)'}
              </span>
              {(info.isCustom || hasUnsaved) && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <span aria-hidden="true">·</span>
                  <span>{hasUnsaved ? 'Perubahan belum disimpan' : 'Menggunakan hasil edit manual'}</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Klik langsung teks, sel tabel, nomor soal, atau tanda tangan di kertas A4 di bawah untuk mengedit sebelum mengunduh Word (.doc).
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup Editor"
            aria-label="Tutup Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sticky Toolbar & Filename Bar */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 flex-1 min-w-[260px]">
              <span className="whitespace-nowrap shrink-0 font-semibold">Nama File:</span>
              <input
                type="text"
                value={filename}
                onChange={e => setFilename(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleResetToAuto}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Otomatis</span>
              </button>

              <button
                type="button"
                onClick={handleCopyEdited}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </button>

              <button
                type="button"
                onClick={handlePrintEdited}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / PDF</span>
              </button>

              <button
                type="button"
                onClick={handleSaveOnly}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-emerald-600 text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {hasUnsaved ? <Save className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>Simpan Editan</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAndDownload}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Simpan &amp; Unduh (.doc)</span>
              </button>
            </div>
          </div>

          <DocRichToolbar
            editorRef={editorRef}
            onAfterCommand={() => setHasUnsaved(true)}
            onResetToAuto={handleResetToAuto}
            isCustom={info.isCustom || hasUnsaved}
          />
        </div>

        {/* Scrollable Editable A4 Paper Canvas */}
        <div className="flex-1 overflow-auto bg-[#dedad0] dark:bg-[#121715] p-4 sm:p-6">
          <div className="min-w-fit flex justify-center">
            <article
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={() => setHasUnsaved(true)}
              spellCheck={false}
              className={`doc-paper font-serif ${info.landscape ? 'wide' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
