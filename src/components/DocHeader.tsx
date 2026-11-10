import React from 'react';

interface DocHeaderProps {
  title: string;
  lead: string;
  tab: string;
  isDocView: boolean;
  onToggleView: (view: 'edit' | 'doc') => void;
  onCopy: () => void;
  noToggle?: boolean;
  extra?: React.ReactNode;
}

export const DocHeader: React.FC<DocHeaderProps> = ({
  title,
  lead,
  tab,
  isDocView,
  onToggleView,
  onCopy,
  noToggle,
  extra
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-3xl text-sm lg:text-base">{lead}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {!noToggle && (
          <div className="inline-flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
            <button
              onClick={() => onToggleView('edit')}
              aria-pressed={!isDocView}
              className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors ${
                !isDocView
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Isi Data
            </button>
            <button
              onClick={() => onToggleView('doc')}
              aria-pressed={isDocView}
              className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors ${
                isDocView
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Dokumen
            </button>
          </div>
        )}

        {(isDocView || noToggle) && (
          <button
            onClick={() => {
              // Create a downloadable HTML blob formatted for Word (.doc)
              const docElement = document.querySelector('.docwrap') || document.querySelector('.card') || document.body;
              const htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:"Times New Roman",Times,serif;font-size:12pt;line-height:1.5;color:#000;margin:20px;}table{border-collapse:collapse;width:100%;margin-bottom:15px;}th,td{border:1px solid #000;padding:5px 8px;vertical-align:top;text-align:left;}th{background:#f0f0f0;text-align:center;}h1,h2,h3,h4{margin:10px 0 5px;}</style></head><body>${docElement.innerHTML}</body></html>`;
              const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs lg:text-sm font-medium transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            📥 Unduh Dokumen (Word)
          </button>
        )}

        {(isDocView || noToggle) && (
          <button
            onClick={onCopy}
            className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            📋 Salin Teks
          </button>
        )}

        {(isDocView || noToggle) && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Unduh file .doc langsung ke komputer atau salin teks.
          </span>
        )}

        {extra}
      </div>
    </div>
  );
};
