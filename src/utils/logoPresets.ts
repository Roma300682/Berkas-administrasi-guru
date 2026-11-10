// Preset SVG emblems & image upload/resizer utility for Kop Surat Sekolah

const svgToDataUrl = (svg: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

export const LOGO_PENDIDIKAN_SVG = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <polygon points="60,6 108,30 98,92 60,114 22,92 12,30" fill="#0E6B5A" stroke="#064E3B" stroke-width="4"/>
  <polygon points="60,13 101,34 92,88 60,107 28,88 19,34" fill="#F8FAFC" stroke="#D97706" stroke-width="2.5"/>
  <circle cx="60" cy="46" r="16" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <path d="M60 28 L64 40 L76 40 L66 47 L70 59 L60 52 L50 59 L54 47 L44 40 L56 40 Z" fill="#D97706"/>
  <path d="M34 74 Q47 68 60 74 Q73 68 86 74 L86 86 Q73 80 60 86 Q47 80 34 86 Z" fill="#0E6B5A"/>
  <line x1="60" y1="73" x2="60" y2="86" stroke="#ffffff" stroke-width="2"/>
  <text x="60" y="98" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#064E3B" text-anchor="middle">PENDIDIKAN</text>
</svg>
`);

export const LOGO_SMK_SVG = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <circle cx="60" cy="60" r="52" fill="#1E3A8A" stroke="#F59E0B" stroke-width="5"/>
  <circle cx="60" cy="60" r="42" fill="#ffffff" stroke="#1E3A8A" stroke-width="2"/>
  <path d="M60 22 L66 36 L82 36 L69 45 L74 60 L60 51 L46 60 L51 45 L38 36 L54 36 Z" fill="#F59E0B"/>
  <path d="M35 68 Q48 62 60 68 Q72 62 85 68 L85 82 Q72 76 60 82 Q48 76 35 82 Z" fill="#1E3A8A"/>
  <text x="60" y="94" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#1E3A8A" text-anchor="middle">SMK BISA</text>
</svg>
`);

export const LOGO_AKL_SVG = svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <polygon points="60,6 108,30 98,92 60,114 22,92 12,30" fill="#065F46" stroke="#F59E0B" stroke-width="4"/>
  <circle cx="60" cy="58" r="38" fill="#ECFDF5" stroke="#047857" stroke-width="2"/>
  <rect x="38" y="56" width="8" height="20" rx="2" fill="#059669"/>
  <rect x="50" y="46" width="8" height="30" rx="2" fill="#047857"/>
  <rect x="62" y="38" width="8" height="38" rx="2" fill="#D97706"/>
  <rect x="74" y="30" width="8" height="46" rx="2" fill="#065F46"/>
  <line x1="34" y1="76" x2="86" y2="76" stroke="#064E3B" stroke-width="2.5"/>
  <text x="60" y="88" font-family="Arial, sans-serif" font-size="8.5" font-weight="bold" fill="#064E3B" text-anchor="middle">AKUNTANSI</text>
</svg>
`);

export const PRESET_LOGOS = [
  { id: 'pendidikan', label: 'Logo Pendidikan', url: LOGO_PENDIDIKAN_SVG },
  { id: 'smk', label: 'Logo SMK / Vokasi', url: LOGO_SMK_SVG },
  { id: 'akl', label: 'Logo Akuntansi (AKL)', url: LOGO_AKL_SVG },
];

/**
 * Converts any uploaded image file (PNG, JPG, WEBP, SVG) into a resized PNG data URL
 * so it is lightweight for localStorage and 100% compatible with MS Word .doc export.
 */
export function resizeImageFileToDataUrl(file: File, maxDim = 220): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => reject(new Error('Format gambar tidak valid.'));
      img.onload = () => {
        let w = img.width || maxDim;
        let h = img.height || maxDim;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Converts a preset SVG Data URL into a PNG Data URL via canvas so Word .doc renders it cleanly.
 */
export function svgDataUrlToPngDataUrl(svgDataUrl: string, size = 160): Promise<string> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(svgDataUrl);
      }
    };
    img.onerror = () => resolve(svgDataUrl);
    img.src = svgDataUrl;
  });
}
