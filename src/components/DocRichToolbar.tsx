import React from 'react';
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  SeparatorHorizontal,
  RotateCcw,
} from 'lucide-react';

interface DocRichToolbarProps {
  editorRef: React.RefObject<HTMLElement | null>;
  onAfterCommand?: () => void;
  onResetToAuto?: () => void;
  isCustom?: boolean;
}

export const DocRichToolbar: React.FC<DocRichToolbarProps> = ({
  editorRef,
  onAfterCommand,
  onResetToAuto,
  isCustom,
}) => {
  const exec = (cmd: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    try {
      document.execCommand(cmd, false, value);
    } catch {
      // Ignore unsupported execCommand edge cases
    }
    onAfterCommand?.();
  };

  const insertPageBreak = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    try {
      document.execCommand(
        'insertHTML',
        false,
        '<br clear="all" style="page-break-before:always" /><p style="margin:6pt 0">...</p>'
      );
    } catch {
      // ignore
    }
    onAfterCommand?.();
  };

  const btnClass =
    'p-1.5 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center';

  return (
    <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-800/95 border border-slate-300 dark:border-slate-700 rounded-xl shadow-xs no-print">
      <div className="flex items-center gap-0.5 pr-2 border-r border-slate-300 dark:border-slate-700">
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('undo')}
          className={btnClass}
          title="Urungkan (Ctrl+Z)"
          aria-label="Urungkan"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('redo')}
          className={btnClass}
          title="Ulangi (Ctrl+Y)"
          aria-label="Ulangi"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-0.5 px-2 border-r border-slate-300 dark:border-slate-700">
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('bold')}
          className={btnClass}
          title="Tebal (Ctrl+B)"
          aria-label="Tebal"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('italic')}
          className={btnClass}
          title="Miring (Ctrl+I)"
          aria-label="Miring"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('underline')}
          className={btnClass}
          title="Garis Bawah (Ctrl+U)"
          aria-label="Garis Bawah"
        >
          <Underline className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-0.5 px-2 border-r border-slate-300 dark:border-slate-700">
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('justifyLeft')}
          className={btnClass}
          title="Rata Kiri"
          aria-label="Rata Kiri"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('justifyCenter')}
          className={btnClass}
          title="Rata Tengah"
          aria-label="Rata Tengah"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('justifyRight')}
          className={btnClass}
          title="Rata Kanan"
          aria-label="Rata Kanan"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('justifyFull')}
          className={btnClass}
          title="Rata Kiri-Kanan"
          aria-label="Rata Kiri-Kanan"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-0.5 px-2 border-r border-slate-300 dark:border-slate-700">
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('insertUnorderedList')}
          className={btnClass}
          title="Daftar Poin"
          aria-label="Daftar Poin"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => exec('insertOrderedList')}
          className={btnClass}
          title="Daftar Bernomor"
          aria-label="Daftar Bernomor"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 px-2 border-r border-slate-300 dark:border-slate-700">
        <select
          aria-label="Ukuran Teks"
          defaultValue=""
          onChange={e => {
            if (e.target.value) {
              exec('fontSize', e.target.value);
              e.target.value = '';
            }
          }}
          className="px-2 py-1 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <option value="" disabled>
            Ukuran Huruf
          </option>
          <option value="2">Kecil (10pt)</option>
          <option value="3">Normal (11–12pt)</option>
          <option value="4">Sedang (14pt)</option>
          <option value="5">Judul (18pt)</option>
        </select>

        <button
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={insertPageBreak}
          className="px-2 py-1 rounded-md text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer whitespace-nowrap"
          title="Sisipkan Pemisah Halaman Baru (Page Break)"
        >
          <SeparatorHorizontal className="w-3.5 h-3.5" />
          <span>Halaman Baru</span>
        </button>
      </div>

      {onResetToAuto && (
        <button
          type="button"
          onClick={onResetToAuto}
          className={`ml-auto px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            isCustom
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-200'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700'
          }`}
          title="Muat ulang isi dokumen otomatis dari data form aplikasi"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset ke Data Otomatis</span>
        </button>
      )}
    </div>
  );
};
