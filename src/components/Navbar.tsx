import React, { useEffect, useState } from 'react';
import { Sun, Moon, Download, Home, Check } from 'lucide-react';
import { TABS } from '../data/defaultData';
import { AppState } from '../types';
import { getTabStatus } from '../utils/tabStatus';
import { downloadAllDocsWord } from '../utils/docExport';

interface NavbarProps {
  state: AppState;
  onSelectTab: (tabId: string) => void;
  showToast?: (msg: string) => void;
}

const THEME_KEY = 'berkas-ajar-theme';

export const Navbar: React.FC<NavbarProps> = ({ state, onSelectTab, showToast }) => {
  const p = state.profil;
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  const brandSub =
    [
      p.mapel,
      p.fase ? `Fase ${p.fase}` : '',
      p.kelas ? `Kelas ${p.kelas}` : '',
      p.ta ? `TP ${p.ta}` : '',
    ]
      .filter(Boolean)
      .join(' · ') || 'Perangkat ajar Kurikulum Merdeka';

  const completedCount = TABS.filter(t => getTabStatus(state, t.id) === 2).length;
  const pct = Math.round((completedCount / TABS.length) * 100);

  return (
    <aside className="side lg:sticky lg:top-4 flex flex-col gap-4 min-w-0 no-print">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h1 className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              Berkas Ajar Guru
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-snug">
              {brandSub}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsDark(d => !d)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label={isDark ? 'Mode Terang' : 'Mode Gelap'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400">
            <span>Kesiapan Berkas</span>
            <span className="font-mono tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">
              {completedCount}/{TABS.length} ({pct}%)
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-700 dark:bg-emerald-500 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="nav flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {TABS.map(t => {
          const s = getTabStatus(state, t.id);
          const current = state.ui.tab === t.id;
          const isEdited = Boolean(
            t.id !== 'mulai' &&
              Object.keys(state.customDocs || {}).some(
                k => k === t.id || k.startsWith(`${t.id}:`)
              )
          );

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTab(t.id)}
              aria-current={current ? 'page' : undefined}
              className={`navbtn flex items-center gap-2.5 text-left px-3 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                current
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800'
              }`}
            >
              <span
                className={`step w-5 h-5 rounded-md border flex items-center justify-center text-[11px] font-mono font-bold shrink-0 ${
                  current
                    ? 'bg-emerald-800/80 border-emerald-500 text-white'
                    : s === 2
                    ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-slate-950'
                    : s === 1
                    ? 'border-amber-500 text-amber-700 dark:text-amber-400'
                    : 'border-slate-300 text-slate-500 dark:border-slate-600 dark:text-slate-400'
                }`}
              >
                {t.n ? (s === 2 && !current ? <Check className="w-3 h-3" /> : t.n) : <Home className="w-3 h-3" />}
              </span>
              <span className="truncate flex-1">{t.l}</span>
              {isEdited && (
                <span
                  className={`text-[10px] font-semibold shrink-0 ${
                    current ? 'text-amber-200' : 'text-amber-600 dark:text-amber-400'
                  }`}
                  title="Dokumen memiliki hasil edit manual"
                >
                  Edit
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="hidden lg:block pt-2 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            const fn = downloadAllDocsWord(state);
            showToast?.(`Berhasil mengunduh paket lengkap 8 dokumen: ${fn}`);
          }}
          className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Semua 8 Berkas (.doc)</span>
        </button>
      </div>
    </aside>
  );
};
