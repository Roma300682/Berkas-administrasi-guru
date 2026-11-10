import React, { useRef } from 'react';
import { AppState } from '../types';
import {
  PRESET_LOGOS,
  resizeImageFileToDataUrl,
  svgDataUrlToPngDataUrl,
} from '../utils/logoPresets';
import { docKop } from '../utils/docExport';

interface KopEditorProps {
  state: AppState;
  onChangeProfile: (key: string, value: any) => void;
  showToast?: (msg: string) => void;
  compact?: boolean;
}

export const KopEditor: React.FC<KopEditorProps> = ({
  state,
  onChangeProfile,
  showToast,
  compact = false,
}) => {
  const p = state.profil;
  const pakaiKop = p.pakaiKop !== false;
  const leftInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);

  const handleUploadLogo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetKey: 'logoKiri' | 'logoKanan',
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const pngDataUrl = await resizeImageFileToDataUrl(file, 220);
      onChangeProfile(targetKey, pngDataUrl);
      showToast?.(`${label} berhasil diunggah dan dipasang pada Kop Dokumen!`);
    } catch {
      showToast?.(`Gagal memuat gambar ${label}. Pastikan format PNG/JPG/SVG.`);
    } finally {
      e.target.value = '';
    }
  };

  const handleApplyPreset = async (
    svgUrl: string,
    targetKey: 'logoKiri' | 'logoKanan',
    label: string
  ) => {
    const pngUrl = await svgDataUrlToPngDataUrl(svgUrl, 180);
    onChangeProfile(targetKey, pngUrl);
    showToast?.(`${label} diterapkan pada Kop Dokumen.`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>🏫</span>
            <span>Kop Surat Dokumen & Logo Sekolah</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Unggah logo sekolah/instansi dan sesuaikan identitas kop surat. Otomatis tampil di semua 7 dokumen & file unduhan Word (.doc).
          </p>
        </div>

        <label className="inline-flex items-center gap-2 cursor-pointer select-none bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg">
          <input
            type="checkbox"
            checked={pakaiKop}
            onChange={e => onChangeProfile('pakaiKop', e.target.checked)}
            className="w-4 h-4 accent-emerald-700 rounded cursor-pointer"
          />
          <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
            Tampilkan Kop Surat di Dokumen
          </span>
        </label>
      </div>

      {pakaiKop && (
        <>
          {/* Live Interactive Kop Surat Preview */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pratinjau Kop Surat Dokumen (Klik logo untuk mengganti)
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                ✓ Siap cetak & ekspor Word (.doc)
              </span>
            </div>
            <div className="bg-[#f4f1ea] dark:bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-300 dark:border-slate-800 overflow-x-auto">
              <div className="bg-white text-slate-900 px-6 py-4 rounded shadow-xs min-w-[560px] max-w-3xl mx-auto font-serif">
                <div
                  onClick={() => leftInputRef.current?.click()}
                  title="Klik untuk mengunggah/mengganti logo sekolah"
                  className="cursor-pointer hover:opacity-95 transition-opacity"
                  dangerouslySetInnerHTML={{ __html: docKop(state) }}
                />
              </div>
            </div>
          </div>

          {/* Upload Logo Kiri & Logo Kanan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Logo Kiri */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  🖼️ Logo Utama / Kiri (Sekolah / Pemprov / Yayasan)
                </span>
                {p.logoKiri && (
                  <button
                    type="button"
                    onClick={() => {
                      onChangeProfile('logoKiri', '');
                      showToast?.('Logo kiri dihapus.');
                    }}
                    className="text-[11px] text-red-600 hover:underline cursor-pointer font-medium"
                  >
                    Hapus Logo
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={() => leftInputRef.current?.click()}
                  className="w-16 h-16 rounded-lg bg-white border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-emerald-500 transition-colors"
                  title="Klik untuk unggah logo"
                >
                  {p.logoKiri ? (
                    <img
                      src={p.logoKiri}
                      alt="Logo Kiri"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 text-center px-1">
                      Kosong
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <input
                    ref={leftInputRef}
                    type="file"
                    accept="image/*"
                    onChange={e => handleUploadLogo(e, 'logoKiri', 'Logo Kiri Sekolah')}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => leftInputRef.current?.click()}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer w-fit flex items-center gap-1.5"
                  >
                    <span>📤</span>
                    <span>Unggah Logo Sekolah (PNG/JPG)</span>
                  </button>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-slate-500">Preset:</span>
                    {PRESET_LOGOS.map(pr => (
                      <button
                        key={pr.id}
                        type="button"
                        onClick={() => handleApplyPreset(pr.url, 'logoKiri', pr.label)}
                        className="px-2 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded hover:border-emerald-500 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Kanan */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  🖼️ Logo Kanan (Opsional — Logo Sekolah / Jurusan)
                </span>
                {p.logoKanan && (
                  <button
                    type="button"
                    onClick={() => {
                      onChangeProfile('logoKanan', '');
                      showToast?.('Logo kanan dihapus.');
                    }}
                    className="text-[11px] text-red-600 hover:underline cursor-pointer font-medium"
                  >
                    Hapus Logo
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={() => rightInputRef.current?.click()}
                  className="w-16 h-16 rounded-lg bg-white border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-emerald-500 transition-colors"
                  title="Klik untuk unggah logo kanan"
                >
                  {p.logoKanan ? (
                    <img
                      src={p.logoKanan}
                      alt="Logo Kanan"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 text-center px-1">
                      Opsional
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <input
                    ref={rightInputRef}
                    type="file"
                    accept="image/*"
                    onChange={e => handleUploadLogo(e, 'logoKanan', 'Logo Kanan Sekolah')}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => rightInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer w-fit flex items-center gap-1.5"
                  >
                    <span>📤</span>
                    <span>Unggah Logo Kanan (PNG/JPG)</span>
                  </button>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-slate-500">Preset:</span>
                    {PRESET_LOGOS.map(pr => (
                      <button
                        key={pr.id}
                        type="button"
                        onClick={() => handleApplyPreset(pr.url, 'logoKanan', pr.label)}
                        className="px-2 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded hover:border-emerald-500 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teks Kop Surat Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Baris 1 Kop (Instansi / Pemprov / Yayasan)
              <input
                type="text"
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                value={p.kopBaris1 ?? ''}
                onChange={e => onChangeProfile('kopBaris1', e.target.value)}
                placeholder="mis. PEMERINTAH PROVINSI JAWA BARAT / YAYASAN ..."
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Baris 2 Kop (Dinas Pendidikan / Cabang Dinas)
              <input
                type="text"
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                value={p.kopBaris2 ?? ''}
                onChange={e => onChangeProfile('kopBaris2', e.target.value)}
                placeholder="mis. DINAS PENDIDIKAN"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Nama Satuan Pendidikan / Sekolah (Judul Utama Kop)
              <input
                type="text"
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-bold"
                value={p.sekolah}
                onChange={e => onChangeProfile('sekolah', e.target.value)}
                placeholder="mis. SMK NEGERI 1 NUSANTARA"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Bidang / Program Keahlian / Status Akreditasi
              <input
                type="text"
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                value={p.kopBidang ?? ''}
                onChange={e => onChangeProfile('kopBidang', e.target.value)}
                placeholder="mis. BIDANG KEAHLIAN BISNIS DAN MANAJEMEN — TERAKREDITASI A"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Alamat Lengkap Sekolah
              <input
                type="text"
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                value={p.kopAlamat ?? ''}
                onChange={e => onChangeProfile('kopAlamat', e.target.value)}
                placeholder="mis. Jl. Pendidikan No. 10, Telp. (021) 5551234, Kode Pos 10110"
              />
            </label>
            <div className="grid grid-cols-[1fr_110px] gap-2">
              <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Website / Email / NPSN
                <input
                  type="text"
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                  value={p.kopKontak ?? ''}
                  onChange={e => onChangeProfile('kopKontak', e.target.value)}
                  placeholder="mis. Laman: www.sekolah.sch.id | NPSN: 20100123"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Ukuran Logo (px)
                <input
                  type="number"
                  min={45}
                  max={110}
                  className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm"
                  value={p.ukuranLogo || 72}
                  onChange={e => onChangeProfile('ukuranLogo', Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
