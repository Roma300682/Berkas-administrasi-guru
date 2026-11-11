import { AppState, Semester, TpItem, UnitItem } from '../types';
import { generateContextualSoal } from './soalGenerator';

const esc = (s: any): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const dots = (s?: string): string => (s && s.trim() ? esc(s.trim()) : '………………………………');

const nl = (s?: string): string =>
  String(s || '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => `<p style="margin:0 0 3.5pt;text-align:justify;line-height:1.4">${esc(l)}</p>`)
    .join('');

const lines = (s?: string): string[] =>
  String(s || '')
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean);

function getOrderedTps(state: AppState, sem?: Semester): TpItem[] {
  const sems: Semester[] = sem ? [sem] : [1, 2];
  return sems.flatMap(s => {
    const us = state.unit.filter(u => u.sem === s);
    return us.flatMap(u => state.tp.filter(t => t.unitId === u.id));
  });
}

function getNoMap(state: AppState): Record<string, number> {
  const map: Record<string, number> = {};
  let n = 0;
  ([1, 2] as Semester[]).forEach(s => {
    state.unit
      .filter(u => u.sem === s)
      .forEach(u => {
        state.tp
          .filter(t => t.unitId === u.id)
          .forEach(t => {
            n++;
            map[t.id] = n;
          });
      });
  });
  return map;
}

function jpAvail(state: AppState, sem: Semester): number {
  const jp = Number(state.profil.jp) || 0;
  return state.bulan
    .filter(b => b.sem === sem)
    .reduce((acc, b) => acc + (b.n - b.off.length) * jp, 0);
}

function jpTotal(state: AppState, sem: Semester): number {
  const uIds = state.unit.filter(u => u.sem === sem).map(u => u.id);
  return state.tp
    .filter(t => uIds.includes(t.unitId))
    .reduce((acc, t) => acc + (Number(t.jp) || 0), 0);
}

export function docKop(state: AppState): string {
  const p = state.profil;
  if (p.pakaiKop === false) return '';

  const size = Math.max(40, Math.min(110, Number(p.ukuranLogo) || 70));
  const hasLeft = Boolean(p.logoKiri);
  const hasRight = Boolean(p.logoKanan);
  const baris1 = p.kopBaris1 ?? 'PEMERINTAH PROVINSI DAERAH KHUSUS';
  const baris2 = p.kopBaris2 ?? 'DINAS PENDIDIKAN';
  const sekolah = p.sekolah || 'NAMA SATUAN PENDIDIKAN / SEKOLAH';
  const bidang = p.kopBidang ?? '';
  const alamat = p.kopAlamat ?? '';
  const kontak = p.kopKontak ?? '';

  const leftCell = hasLeft
    ? `<td style="width:14%;vertical-align:middle;text-align:center;border:none;padding:0 6pt 6pt 0">
         <img src="${p.logoKiri}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;object-fit:contain;display:inline-block" alt="Logo Kiri" />
       </td>`
    : hasRight
    ? `<td style="width:14%;border:none;padding:0"></td>`
    : '';

  const rightCell = hasRight
    ? `<td style="width:14%;vertical-align:middle;text-align:center;border:none;padding:0 0 6pt 6pt">
         <img src="${p.logoKanan}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;object-fit:contain;display:inline-block" alt="Logo Kanan" />
       </td>`
    : hasLeft
    ? `<td style="width:14%;border:none;padding:0"></td>`
    : '';

  const centerWidth = hasLeft || hasRight ? 'width:72%;' : 'width:100%;';

  return `<table class="kop-table" style="width:100%;border-collapse:collapse;border:none;border-bottom:3pt double #000000;mso-border-bottom-alt:double #000000 3.0pt;margin:0 0 12pt 0;padding-bottom:6pt">
    <tbody>
      <tr>
        ${leftCell}
        <td style="${centerWidth}vertical-align:middle;text-align:center;border:none;padding:0 4pt 6pt 4pt;line-height:1.22">
          ${baris1 ? `<div style="font-size:11pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.03em;margin:0;color:#000000">${esc(baris1)}</div>` : ''}
          ${baris2 ? `<div style="font-size:11.5pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.03em;margin:1pt 0;color:#000000">${esc(baris2)}</div>` : ''}
          <div style="font-size:13.5pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;margin:2pt 0;color:#000000">${esc(sekolah)}</div>
          ${bidang ? `<div style="font-size:9pt;font-weight:bold;text-transform:uppercase;margin:1pt 0;color:#111111">${esc(bidang)}</div>` : ''}
          ${alamat ? `<div style="font-size:9pt;margin:1pt 0;color:#111111">${esc(alamat)}</div>` : ''}
          ${kontak ? `<div style="font-size:8.5pt;font-style:italic;margin:1pt 0 0;color:#222222">${esc(kontak)}</div>` : ''}
        </td>
        ${rightCell}
      </tr>
    </tbody>
  </table>`;
}

function docIdent(state: AppState, extra?: [string, string][]): string {
  const p = state.profil;
  const rows: [string, string][] = [
    ['Satuan Pendidikan', dots(p.sekolah)],
    ['Mata Pelajaran', dots(p.mapel)],
    ['Fase / Kelas', `Fase ${dots(p.fase)} / Kelas ${dots(p.kelas)}`],
    ['Tahun Pelajaran', dots(p.ta)],
    ['Nama Guru', dots(p.guru)],
    ...(extra || []),
  ];
  const half = Math.ceil(rows.length / 2);
  let trs = '';
  for (let i = 0; i < half; i++) {
    const a = rows[i];
    const b = rows[i + half];
    trs += `<tr>
      <td style="border:none;padding:1.5pt 4pt 1.5pt 0;width:19%;font-weight:bold;color:#111111;vertical-align:top">${a[0]}</td>
      <td style="border:none;padding:1.5pt 2pt;width:2%;vertical-align:top">:</td>
      <td style="border:none;padding:1.5pt 10pt 1.5pt 0;width:29%;color:#000000;vertical-align:top">${a[1]}</td>
      ${
        b
          ? `<td style="border:none;padding:1.5pt 4pt 1.5pt 8pt;width:19%;font-weight:bold;color:#111111;vertical-align:top">${b[0]}</td>
             <td style="border:none;padding:1.5pt 2pt;width:2%;vertical-align:top">:</td>
             <td style="border:none;padding:1.5pt 0;width:29%;color:#000000;vertical-align:top">${b[1]}</td>`
          : '<td colspan="3" style="border:none"></td>'
      }
    </tr>`;
  }
  return `<table class="idt" style="width:100%;border-collapse:collapse;margin:6pt 0 10pt;font-size:10.5pt;border:none">${trs}</table>`;
}

function docSign(state: AppState): string {
  const p = state.profil;
  return `<table class="sign" style="width:100%;border-collapse:collapse;margin-top:20pt;font-size:10.5pt;border:none;page-break-inside:avoid">
    <tr>
      <td style="width:45%;vertical-align:top;text-align:left;border:none;padding:2pt 0 2pt 12pt">
        Mengetahui,<br/>
        Kepala Sekolah<br/><br/><br/><br/>
        <b><u>${dots(p.kepsek)}</u></b><br/>
        NIP. ${p.nipKs ? esc(p.nipKs) : '………………………………'}
      </td>
      <td style="width:10%;border:none"></td>
      <td style="width:45%;vertical-align:top;text-align:left;border:none;padding:2pt 0 2pt 24pt">
        ${p.kota ? esc(p.kota) : '………………'}, ${p.tgl ? esc(p.tgl) : '…………………………'}<br/>
        Guru Mata Pelajaran<br/><br/><br/><br/>
        <b><u>${dots(p.guru)}</u></b><br/>
        NIP. ${p.nip ? esc(p.nip) : '………………………………'}
      </td>
    </tr>
  </table>`;
}

const thStyle =
  'border:1px solid #1a1a1a;padding:4.5pt 6pt;background:#E6ECE8;font-weight:bold;text-align:center;vertical-align:middle;color:#000000';
const tdStyle = 'border:1px solid #1a1a1a;padding:4pt 6pt;vertical-align:top;color:#000000';
const tdJustify =
  'border:1px solid #1a1a1a;padding:4pt 6pt;vertical-align:top;text-align:justify;line-height:1.35;color:#000000';
const tdCenter = 'border:1px solid #1a1a1a;padding:4pt 5pt;vertical-align:middle;text-align:center;color:#000000';
const grpStyle = 'border:1px solid #1a1a1a;padding:4.5pt 6pt;background:#DDE8E2;font-weight:bold;color:#000000';
const totStyle = 'border:1px solid #1a1a1a;padding:4.5pt 6pt;background:#F0F3F1;font-weight:bold;color:#000000';

export function generateWaktuHtml(state: AppState): string {
  const p = state.profil;
  const jp = Number(p.jp) || 0;

  const semTables = ([1, 2] as Semester[])
    .map(s => {
      const bs = state.bulan.filter(b => b.sem === s);
      const totAll = bs.reduce((acc, b) => acc + b.n, 0);
      const totOff = bs.reduce((acc, b) => acc + b.off.length, 0);
      const totEf = totAll - totOff;
      const totJp = totEf * jp;

      const rows = bs
        .map((b, i) => {
          const ef = b.n - b.off.length;
          return `<tr style="page-break-inside:avoid">
            <td style="${tdCenter}">${i + 1}</td>
            <td style="${tdStyle}">${esc(b.nama)}</td>
            <td style="${tdCenter}">${b.n}</td>
            <td style="${tdCenter}">${b.off.length}</td>
            <td style="${tdCenter}">${ef}</td>
            <td style="${tdCenter}">${ef * jp}</td>
            <td style="${tdStyle}">${esc(b.ket || '-')}</td>
          </tr>`;
        })
        .join('');

      return `<h3 style="font-size:11pt;margin:10pt 0 4pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'})</h3>
      <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:10pt">
        <thead>
          <tr>
            <th style="${thStyle};width:6%">No</th>
            <th style="${thStyle};width:18%">Bulan</th>
            <th style="${thStyle};width:13%">Jml Minggu</th>
            <th style="${thStyle};width:14%">Tidak Efektif</th>
            <th style="${thStyle};width:13%">Minggu Efektif</th>
            <th style="${thStyle};width:12%">JP Efektif</th>
            <th style="${thStyle};width:24%">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr class="tot" style="page-break-inside:avoid">
            <td colspan="2" style="${totStyle};text-align:center">Jumlah Semester ${s}</td>
            <td style="${totStyle};text-align:center">${totAll}</td>
            <td style="${totStyle};text-align:center">${totOff}</td>
            <td style="${totStyle};text-align:center">${totEf}</td>
            <td style="${totStyle};text-align:center">${totJp}</td>
            <td style="${totStyle}"></td>
          </tr>
        </tbody>
      </table>`;
    })
    .join('');

  const rekapRows = ([1, 2] as Semester[])
    .map(s => {
      const av = jpAvail(state, s);
      const tot = jpTotal(state, s);
      return `<tr style="page-break-inside:avoid">
        <td style="${tdCenter}">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'})</td>
        <td style="${tdCenter}">${av} JP</td>
        <td style="${tdCenter}">${tot} JP</td>
        <td style="${tdCenter}">${av - tot} JP</td>
      </tr>`;
    })
    .join('');

  const kaldikEvents = [...(state.kaldik || [])].sort((a, b) => a.date.localeCompare(b.date));
  const monthNamesId = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const formatIdDate = (iso: string) => {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const mIdx = Number(parts[1]) - 1;
    return `${Number(parts[2])} ${monthNamesId[mIdx] || parts[1]} ${parts[0]}`;
  };
  const catLabelMap: Record<string, string> = {
    'libur-nasional': 'Libur Nasional / Cuti Bersama',
    'libur-semester': 'Libur Semester / Ramadan & Idul Fitri (Kaldik Jabar)',
    asesmen: 'Asesmen (ASTS / PSAS / PSAT / UKK / ANBK Jabar)',
    kegiatan: 'Kegiatan Akademik / MPLS / SmartTren / Rapor Disdik Jabar',
  };

  const kaldikSection =
    state.cetakKaldik !== false && kaldikEvents.length > 0
      ? `<h3 style="font-size:11pt;margin:10pt 0 4pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">Daftar Agenda Kalender Pendidikan Provinsi Jawa Barat (Disdik Jabar) &amp; Hari Libur</h3>
      <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 8pt;font-size:9.5pt">
        <thead>
          <tr>
            <th style="${thStyle};width:6%">No</th>
            <th style="${thStyle};width:22%">Tanggal</th>
            <th style="${thStyle};width:38%">Uraian Agenda Kaldik Jawa Barat / Hari Libur</th>
            <th style="${thStyle};width:20%">Kategori</th>
            <th style="${thStyle};width:14%">Status Minggu</th>
          </tr>
        </thead>
        <tbody>
          ${kaldikEvents
            .map(
              (ev, idx) => `<tr style="page-break-inside:avoid">
                <td style="${tdCenter}">${idx + 1}</td>
                <td style="${tdStyle}">${esc(formatIdDate(ev.date))}</td>
                <td style="${tdStyle};font-weight:bold">${esc(ev.title)}</td>
                <td style="${tdStyle}">${esc(catLabelMap[ev.cat] || ev.cat)}</td>
                <td style="${tdCenter}">${ev.markWeekOff ? 'Tidak Efektif' : 'Efektif'}</td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>`
      : '';

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">KALENDER PENDIDIKAN DAN ANALISIS ALOKASI WAKTU</h2>
    <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">Acuan: Pedoman Kalender Pendidikan Dinas Pendidikan Provinsi Jawa Barat · Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${jp} JP × ${Number(p.menit) || 45} menit`]])}
    ${semTables}
    <h3 style="font-size:11pt;margin:10pt 0 4pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">Rekapitulasi Kebutuhan Jam Pelajaran (JP)</h3>
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 8pt;font-size:10pt">
      <thead>
        <tr>
          <th style="${thStyle};width:34%">Semester</th>
          <th style="${thStyle};width:22%">JP Efektif Tersedia</th>
          <th style="${thStyle};width:22%">JP Materi (ATP/Prota)</th>
          <th style="${thStyle};width:22%">Cadangan / Asesmen</th>
        </tr>
      </thead>
      <tbody>
        ${rekapRows}
        <tr class="tot" style="page-break-inside:avoid">
          <td style="${totStyle};text-align:center">Total Satu Tahun Pelajaran</td>
          <td style="${totStyle};text-align:center">${jpAvail(state, 1) + jpAvail(state, 2)} JP</td>
          <td style="${totStyle};text-align:center">${jpTotal(state, 1) + jpTotal(state, 2)} JP</td>
          <td style="${totStyle};text-align:center">${jpAvail(state, 1) + jpAvail(state, 2) - (jpTotal(state, 1) + jpTotal(state, 2))} JP</td>
        </tr>
      </tbody>
    </table>
    ${kaldikSection}
    <p style="font-size:9.5pt;color:#333333;margin:4pt 0;text-align:left">* Keterangan: JP efektif = minggu efektif × ${jp} JP per minggu. Sisa JP digunakan untuk asesmen formatif/sumatif, remedial, dan cadangan kegiatan sekolah.</p>
    ${docSign(state)}
  </div>`;
}

export function generateCpatpHtml(state: AppState): string {
  const p = state.profil;
  const noMap = getNoMap(state);
  const rows: { t: TpItem; u: UnitItem; s: Semester }[] = [];

  ([1, 2] as Semester[]).forEach(s => {
    getOrderedTps(state, s).forEach(t => {
      const u = state.unit.find(x => x.id === t.unitId);
      if (u) rows.push({ t, u, s });
    });
  });

  const cpSpan = (i: number): number => {
    const id = rows[i].u.cpId || '';
    if (i > 0 && (rows[i - 1].u.cpId || '') === id) return 0;
    let k = 1;
    while (i + k < rows.length && (rows[i + k].u.cpId || '') === id) k++;
    return k;
  };

  const uSpan = (i: number): number => {
    const id = rows[i].u.id;
    if (i > 0 && rows[i - 1].u.id === id) return 0;
    let k = 1;
    while (i + k < rows.length && rows[i + k].u.id === id) k++;
    return k;
  };

  const totalJpAll = rows.reduce((acc, r) => acc + (Number(r.t.jp) || 0), 0);

  const bodyRows = rows
    .map((r, i) => {
      const cs = cpSpan(i);
      const us = uSpan(i);
      const cp = state.cp.find(c => c.id === r.u.cpId);
      return `<tr style="page-break-inside:avoid">
        ${
          cs
            ? `<td rowspan="${cs}" style="${tdStyle};font-weight:bold;width:15%">${esc(cp ? cp.elemen : '')}</td>
               <td rowspan="${cs}" style="${tdJustify};width:28%">${esc(cp ? cp.teks : '')}</td>`
            : ''
        }
        ${us ? `<td rowspan="${us}" style="${tdStyle};font-weight:bold;width:17%">${esc(r.u.nama)}</td>` : ''}
        <td style="${tdJustify};width:30%"><b>${noMap[r.t.id] || '–'}.</b> ${esc(r.t.teks)}</td>
        <td style="${tdCenter};width:5%">${Number(r.t.jp) || 0}</td>
        <td style="${tdCenter};width:5%">${r.s}</td>
      </tr>`;
    })
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">CAPAIAN PEMBELAJARAN DAN ALUR TUJUAN PEMBELAJARAN (CP &amp; ATP)</h2>
    <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">Sesuai Inspirasi Ruang GTK Kemendikdasmen · Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:6pt 0 12pt;font-size:9.5pt">
      <thead>
        <tr>
          <th style="${thStyle};width:15%">Elemen</th>
          <th style="${thStyle};width:28%">Capaian Pembelajaran (CP)</th>
          <th style="${thStyle};width:17%">Lingkup Materi / Unit</th>
          <th style="${thStyle};width:30%">Alur Tujuan Pembelajaran (ATP)</th>
          <th style="${thStyle};width:5%">JP</th>
          <th style="${thStyle};width:5%">Smt</th>
        </tr>
      </thead>
      <tbody>
        ${
          bodyRows
            ? `${bodyRows}
               <tr class="tot" style="page-break-inside:avoid">
                 <td colspan="4" style="${totStyle};text-align:right">Total Alokasi Waktu Pembelajaran (Semester 1 &amp; 2)</td>
                 <td style="${totStyle};text-align:center">${totalJpAll} JP</td>
                 <td style="${totStyle};text-align:center">1 &amp; 2</td>
               </tr>`
            : `<tr><td colspan="6" style="${tdCenter}">Belum ada tujuan pembelajaran.</td></tr>`
        }
      </tbody>
    </table>
    ${docSign(state)}
  </div>`;
}

export function generateProtaHtml(state: AppState): string {
  const p = state.profil;
  let n = 0;

  const semBlocks = ([1, 2] as Semester[])
    .map(s => {
      const us = state.unit.filter(u => u.sem === s);
      const unitRows = us
        .map(u => {
          const ts = state.tp.filter(t => t.unitId === u.id);
          if (!ts.length) {
            return `<tr style="page-break-inside:avoid">
              <td style="${tdCenter}">–</td>
              <td style="${tdStyle}">${esc(u.nama)}</td>
              <td style="${tdStyle}"></td>
              <td style="${tdCenter}">0 JP</td>
            </tr>`;
          }
          return ts
            .map((t, i) => {
              n++;
              return `<tr style="page-break-inside:avoid">
                <td style="${tdCenter}">${n}</td>
                ${i === 0 ? `<td rowspan="${ts.length}" style="${tdStyle};font-weight:bold">${esc(u.nama)}</td>` : ''}
                <td style="${tdJustify}">${esc(t.teks)}</td>
                <td style="${tdCenter}">${Number(t.jp) || 0} JP</td>
              </tr>`;
            })
            .join('');
        })
        .join('');

      return `<tr class="grp" style="page-break-inside:avoid">
        <td colspan="4" style="${grpStyle}">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'})</td>
      </tr>
      ${unitRows}
      <tr class="tot" style="page-break-inside:avoid">
        <td colspan="3" style="${totStyle};text-align:right">Jumlah JP Semester ${s}</td>
        <td style="${totStyle};text-align:center">${jpTotal(state, s)} JP</td>
      </tr>`;
    })
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">PROGRAM TAHUNAN (PROTA)</h2>
    <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:6pt 0 10pt;font-size:10pt">
      <thead>
        <tr>
          <th style="${thStyle};width:6%">No</th>
          <th style="${thStyle};width:26%">Lingkup Materi / Unit</th>
          <th style="${thStyle};width:55%">Tujuan Pembelajaran</th>
          <th style="${thStyle};width:13%">Alokasi Waktu</th>
        </tr>
      </thead>
      <tbody>
        ${semBlocks}
        <tr class="tot" style="page-break-inside:avoid">
          <td colspan="3" style="${totStyle};text-align:right">Jumlah JP Satu Tahun Pelajaran</td>
          <td style="${totStyle};text-align:center">${jpTotal(state, 1) + jpTotal(state, 2)} JP</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:9.5pt;color:#333333;margin:4pt 0;text-align:left">* JP efektif: Semester 1 = ${jpAvail(state, 1)} JP, Semester 2 = ${jpAvail(state, 2)} JP (berdasarkan Analisis Alokasi Waktu). Selisih jam digunakan untuk asesmen, remedial, dan cadangan kegiatan sekolah.</p>
    ${docSign(state)}
  </div>`;
}

export function generatePromesHtml(state: AppState, semParam?: Semester): string {
  const p = state.profil;
  const noMap = getNoMap(state);
  const sems: Semester[] = semParam ? [semParam] : [1, 2];

  return sems
    .map((s, idx) => {
      const bs = state.bulan.filter(b => b.sem === s);
      const us = state.unit.filter(u => u.sem === s);
      const totalWeekCols = bs.reduce((a, b) => a + b.n, 0);
      const semTotalJp = jpTotal(state, s);

      const inactiveKet = bs
        .filter(b => b.off.length > 0)
        .map(b => `${esc(b.nama)}${b.ket ? ` (${esc(b.ket)})` : ''}: minggu ke-${b.off.map(i => i + 1).join(', ')}`)
        .join('; ');

      const monthHeaders = bs
        .map(b => `<th colspan="${b.n}" style="${thStyle};font-size:9pt;padding:3pt 2pt">${esc(b.nama)}</th>`)
        .join('');
      const weekHeaders = bs
        .map(b =>
          Array.from(
            { length: b.n },
            (_, i) => `<th style="${thStyle};width:15pt;font-size:8pt;padding:2pt 1pt">${i + 1}</th>`
          ).join('')
        )
        .join('');

      const bodyRows = us
        .map(u => {
          const ts = state.tp.filter(t => t.unitId === u.id);
          if (!ts.length) return '';
          const groupRow = `<tr class="grp" style="page-break-inside:avoid">
            <td colspan="${3 + totalWeekCols}" style="${grpStyle};font-size:9pt">${esc(u.nama)}</td>
          </tr>`;

          const tpRows = ts
            .map(t => {
              const cells = bs
                .map(b =>
                  Array.from({ length: b.n }, (_, i) => {
                    const isOff = b.off.includes(i);
                    const key = `${b.id}:${i}`;
                    const isOn = (state.promes[t.id] || []).includes(key);
                    if (isOff) {
                      return `<td class="pc off" style="border:1px solid #1a1a1a;background:#d6d6d6;color:#333333;font-weight:bold;text-align:center;vertical-align:middle;font-size:8pt;padding:2pt 1pt">L</td>`;
                    }
                    if (isOn) {
                      return `<td class="pc on" style="border:1px solid #1a1a1a;background:#0E6B5A;color:#ffffff;font-weight:bold;text-align:center;vertical-align:middle;font-size:8.5pt;padding:2pt 1pt">✓</td>`;
                    }
                    return `<td class="pc" style="border:1px solid #1a1a1a;text-align:center;vertical-align:middle;font-size:8pt;padding:2pt 1pt"></td>`;
                  }).join('')
                )
                .join('');

              return `<tr style="page-break-inside:avoid">
                <td style="${tdCenter};font-size:9pt">${noMap[t.id] || '–'}</td>
                <td style="${tdJustify};font-size:9pt">${esc(t.teks)}</td>
                <td style="${tdCenter};font-size:9pt">${Number(t.jp) || 0}</td>
                ${cells}
              </tr>`;
            })
            .join('');

          return groupRow + tpRows;
        })
        .join('');

      const breakBefore = idx > 0 ? '<br clear="all" style="page-break-before:always" />' : '';
      return `${breakBefore}
      <div class="doc-section">
        ${docKop(state)}
        <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">PROGRAM SEMESTER (PROMES)</h2>
        <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'}) · Tahun Pelajaran ${dots(p.ta)}</p>
        ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:6pt 0 10pt;font-size:9pt">
          <thead>
            <tr>
              <th rowspan="2" style="${thStyle};width:4%">No</th>
              <th rowspan="2" style="${thStyle};width:38%">Tujuan Pembelajaran</th>
              <th rowspan="2" style="${thStyle};width:5%">JP</th>
              ${monthHeaders}
            </tr>
            <tr>${weekHeaders}</tr>
          </thead>
          <tbody>
            ${
              bodyRows
                ? `${bodyRows}
                   <tr class="tot" style="page-break-inside:avoid">
                     <td colspan="2" style="${totStyle};text-align:right;font-size:9pt">Jumlah JP Semester ${s}</td>
                     <td style="${totStyle};text-align:center;font-size:9pt">${semTotalJp}</td>
                     <td colspan="${totalWeekCols}" style="${totStyle};text-align:left;font-size:8.5pt;padding-left:8pt">Total Alokasi: ${semTotalJp} JP (Efektif Tersedia: ${jpAvail(state, s)} JP)</td>
                   </tr>`
                : `<tr><td colspan="${3 + totalWeekCols}" style="${tdCenter}">Belum ada tujuan pembelajaran pada semester ini.</td></tr>`
            }
          </tbody>
        </table>
        <p style="font-size:9pt;color:#333333;margin:4pt 0;text-align:left"><i>Keterangan: ✓ = Minggu efektif pelaksanaan pembelajaran; L = Minggu tidak efektif / libur / asesmen.${
          inactiveKet ? ` Rincian minggu tidak efektif: ${inactiveKet}.` : ''
        }</i></p>
        ${docSign(state)}
      </div>`;
    })
    .join('\n');
}

export function generateKktpHtml(state: AppState): string {
  const p = state.profil;
  const noMap = getNoMap(state);
  const allTps = getOrderedTps(state);
  const b1 = Number(p.b1) || 60;
  const b2 = Number(p.b2) || 75;
  const b3 = Number(p.b3) || 90;
  const lv = [
    ['Perlu Bimbingan', `0–${b1}`],
    ['Cukup', `${b1 + 1}–${b2}`],
    ['Baik', `${b2 + 1}–${b3}`],
    ['Sangat Baik', `${b3 + 1}–100`],
  ];

  const rows = allTps
    .map(
      t => `<tr style="page-break-inside:avoid">
        <td style="${tdCenter};font-size:9pt">${noMap[t.id] || '–'}</td>
        <td style="${tdJustify};font-size:9pt">${esc(t.teks)}</td>
        <td style="${tdJustify};font-size:9pt">${esc(t.ind)}</td>
        <td style="${tdJustify};font-size:8.5pt">${esc(t.r1)}</td>
        <td style="${tdJustify};font-size:8.5pt">${esc(t.r2)}</td>
        <td style="${tdJustify};font-size:8.5pt">${esc(t.r3)}</td>
        <td style="${tdJustify};font-size:8.5pt">${esc(t.r4)}</td>
        <td style="${tdStyle};font-size:9pt">${esc(t.teknik)}</td>
      </tr>`
    )
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)</h2>
    <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:6pt 0 12pt;font-size:9pt">
      <thead>
        <tr>
          <th rowspan="2" style="${thStyle};width:4%">No</th>
          <th rowspan="2" style="${thStyle};width:18%">Tujuan Pembelajaran</th>
          <th rowspan="2" style="${thStyle};width:16%">Indikator Ketercapaian</th>
          <th colspan="4" style="${thStyle};width:52%">Rubrik Deskripsi Kriteria / Interval Nilai</th>
          <th rowspan="2" style="${thStyle};width:10%">Teknik Asesmen</th>
        </tr>
        <tr>
          ${lv.map(l => `<th style="${thStyle};width:13%;font-size:8.5pt">${l[0]}<br/>(${l[1]})</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows || `<tr><td colspan="8" style="${tdCenter}">Belum ada data KKTP.</td></tr>`}
      </tbody>
    </table>
    ${docSign(state)}
  </div>`;
}

export function generateModulHtml(state: AppState, unitIdParam?: string): string {
  const p = state.profil;
  const units = unitIdParam
    ? state.unit.filter(u => u.id === unitIdParam)
    : state.unit.length
    ? [state.unit.find(u => u.id === state.ui.unit) || state.unit[0]]
    : [];

  if (!units.length) {
    return `<p>Belum ada unit pembelajaran.</p>`;
  }

  const b1 = Number(p.b1) || 60;
  const b2 = Number(p.b2) || 75;
  const b3 = Number(p.b3) || 90;
  const lv = [
    ['Perlu Bimbingan', `0–${b1}`],
    ['Cukup', `${b1 + 1}–${b2}`],
    ['Baik', `${b2 + 1}–${b3}`],
    ['Sangat Baik', `${b3 + 1}–100`],
  ];

  return units
    .map((u, idx) => {
      const m = state.modul[u.id] || {};
      const ts = state.tp.filter(t => t.unitId === u.id);
      const uJp = ts.reduce((a, t) => a + (Number(t.jp) || 0), 0);
      const breakBefore = idx > 0 ? '<br clear="all" style="page-break-before:always" />' : '';

      return `${breakBefore}
      <div class="doc-section">
        ${docKop(state)}
        <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">MODUL AJAR KURIKULUM MERDEKA</h2>
        <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">Unit: ${esc(u.nama)} · Semester ${u.sem} · Tahun Pelajaran ${dots(p.ta)}</p>
        ${docIdent(state, [['Alokasi Waktu', `${uJp} JP (${uJp} × ${Number(p.menit) || 45} menit)`]])}

        <h3 style="font-size:11pt;margin:10pt 0 5pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">A. Informasi Umum</h3>
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:10pt">
          <tbody>
            ${m.awal ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};width:26%;font-weight:bold;background:#F6F8F7">Kompetensi Awal</td><td style="${tdJustify};width:74%">${nl(m.awal)}</td></tr>` : ''}
            ${
              m.dimensi && m.dimensi.length
                ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};width:26%;font-weight:bold;background:#F6F8F7">Dimensi Profil Lulusan</td><td style="${tdStyle};width:74%"><ul style="margin:0 0 0 16pt;padding:0">${m.dimensi
                    .map(d => `<li style="margin-bottom:1.5pt">${esc(d)}</li>`)
                    .join('')}</ul></td></tr>`
                : ''
            }
            ${m.sarana ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};width:26%;font-weight:bold;background:#F6F8F7">Sarana dan Prasarana</td><td style="${tdJustify};width:74%">${nl(m.sarana)}</td></tr>` : ''}
            ${m.target ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};width:26%;font-weight:bold;background:#F6F8F7">Target Peserta Didik</td><td style="${tdJustify};width:74%">${nl(m.target)}</td></tr>` : ''}
            ${m.model ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};width:26%;font-weight:bold;background:#F6F8F7">Model &amp; Pendekatan Pembelajaran</td><td style="${tdJustify};width:74%">${nl(m.model)}</td></tr>` : ''}
          </tbody>
        </table>

        <h3 style="font-size:11pt;margin:10pt 0 5pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">B. Komponen Inti Pembelajaran</h3>
        <h4 style="font-size:10.5pt;margin:6pt 0 2pt">1. Tujuan Pembelajaran</h4>
        <ol style="margin:0 0 6pt 18pt;padding:0">
          ${ts.map(t => `<li style="margin-bottom:2pt;text-align:justify">${esc(t.teks)} (${Number(t.jp) || 0} JP)</li>`).join('')}
        </ol>
        ${m.pemahaman ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">2. Pemahaman Bermakna</h4>${nl(m.pemahaman)}` : ''}
        ${m.pemantik ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">3. Pertanyaan Pemantik</h4>${nl(m.pemantik)}` : ''}

        <h4 style="font-size:10.5pt;margin:8pt 0 4pt">4. Langkah-Langkah Kegiatan Pembelajaran (Pembelajaran Mendalam / Deep Learning)</h4>
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:10pt">
          <thead>
            <tr>
              <th style="${thStyle};width:24%">Tahap Kegiatan</th>
              <th style="${thStyle};width:76%">Deskripsi Aktivitas Pembelajaran (Berkesadaran, Bermakna, Menggembirakan)</th>
            </tr>
          </thead>
          <tbody>
            ${m.pendahuluan ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};font-weight:bold;background:#F6F8F7">Pendahuluan</td><td style="${tdJustify}">${nl(m.pendahuluan)}</td></tr>` : ''}
            ${m.memahami ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};font-weight:bold;background:#F6F8F7">Kegiatan Inti:<br/>1. Memahami</td><td style="${tdJustify}">${nl(m.memahami)}</td></tr>` : ''}
            ${m.mengaplikasi ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};font-weight:bold;background:#F6F8F7">Kegiatan Inti:<br/>2. Mengaplikasi</td><td style="${tdJustify}">${nl(m.mengaplikasi)}</td></tr>` : ''}
            ${m.merefleksi ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};font-weight:bold;background:#F6F8F7">Kegiatan Inti:<br/>3. Merefleksi</td><td style="${tdJustify}">${nl(m.merefleksi)}</td></tr>` : ''}
            ${m.penutup ? `<tr style="page-break-inside:avoid"><td style="${tdStyle};font-weight:bold;background:#F6F8F7">Penutup</td><td style="${tdJustify}">${nl(m.penutup)}</td></tr>` : ''}
          </tbody>
        </table>

        <h3 style="font-size:11pt;margin:10pt 0 5pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">C. Asesmen dan Tindak Lanjut</h3>
        ${m.diagnostik ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Asesmen Diagnostik (Awal)</h4>${nl(m.diagnostik)}` : ''}
        ${m.formatif ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Asesmen Formatif (Proses)</h4>${nl(m.formatif)}` : ''}
        ${m.sumatif ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Asesmen Sumatif (Akhir Lingkup Materi)</h4>${nl(m.sumatif)}` : ''}
        <h4 style="font-size:10.5pt;margin:6pt 0 4pt">Rubrik Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</h4>
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:9pt">
          <thead>
            <tr>
              <th style="${thStyle};width:24%">Tujuan Pembelajaran</th>
              ${lv.map(l => `<th style="${thStyle};width:19%">${l[0]}<br/>(${l[1]})</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${ts
              .map(
                t => `<tr style="page-break-inside:avoid">
                  <td style="${tdJustify}">${esc(t.teks)}</td>
                  <td style="${tdJustify}">${esc(t.r1)}</td>
                  <td style="${tdJustify}">${esc(t.r2)}</td>
                  <td style="${tdJustify}">${esc(t.r3)}</td>
                  <td style="${tdJustify}">${esc(t.r4)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
        ${m.remedial ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Program Remedial</h4>${nl(m.remedial)}` : ''}
        ${m.pengayaan ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Program Pengayaan</h4>${nl(m.pengayaan)}` : ''}

        <h3 style="font-size:11pt;margin:10pt 0 5pt;text-transform:uppercase;border-bottom:1pt solid #888888;padding-bottom:2pt">D. Refleksi dan Lampiran</h3>
        ${m.refGuru ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Refleksi Guru</h4>${nl(m.refGuru)}` : ''}
        ${m.refSiswa ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Refleksi Peserta Didik</h4>${nl(m.refSiswa)}` : ''}
        ${m.pustaka ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Bahan Bacaan &amp; Daftar Pustaka</h4>${nl(m.pustaka)}` : ''}
        <h4 style="font-size:10.5pt;margin:6pt 0 2pt">Lampiran Instrumen Kerja</h4>
        <p style="margin:0 0 6pt;text-align:justify">Lembar Kerja Peserta Didik (LKPD): <b>${esc(state.lkpd[u.id]?.judul || `LKPD ${u.nama}`)}</b></p>

        ${docSign(state)}
      </div>`;
    })
    .join('\n');
}

export function generateLkpdHtml(state: AppState, unitIdParam?: string): string {
  const p = state.profil;
  const units = unitIdParam
    ? state.unit.filter(u => u.id === unitIdParam)
    : state.unit.length
    ? [state.unit.find(u => u.id === state.ui.unitL) || state.unit[0]]
    : [];

  if (!units.length) {
    return `<p>Belum ada unit LKPD.</p>`;
  }

  const b1 = Number(p.b1) || 60;
  const b2 = Number(p.b2) || 75;
  const b3 = Number(p.b3) || 90;
  const lv = [
    ['Perlu Bimbingan', `0–${b1}`],
    ['Cukup', `${b1 + 1}–${b2}`],
    ['Baik', `${b2 + 1}–${b3}`],
    ['Sangat Baik', `${b3 + 1}–100`],
  ];

  const ansLines = (count: number) =>
    Array.from(
      { length: count },
      () => `<div class="ans-line" style="border-bottom:1px dotted #444444;height:18pt;margin-bottom:3pt">&nbsp;</div>`
    ).join('');

  return units
    .map((u, idx) => {
      const l = state.lkpd[u.id] || {};
      const br = Math.max(1, Number(l.baris) || 3);
      const tgs = lines(l.tugas);
      const breakBefore = idx > 0 ? '<br clear="all" style="page-break-before:always" />' : '';

      return `${breakBefore}
      <div class="doc-section">
        ${docKop(state)}
        <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
        <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">${esc(l.judul || `LKPD ${u.nama}`)} · Tahun Pelajaran ${dots(p.ta)}</p>
        ${docIdent(state, [['Unit / Semester', `${esc(u.nama)} / Semester ${u.sem}`]])}

        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:6pt 0 10pt;font-size:10pt">
          <tbody>
            <tr style="page-break-inside:avoid">
              <td style="${tdStyle};width:24%;font-weight:bold;background:#F6F8F7">Nama Kelompok / Siswa</td>
              <td style="${tdStyle};width:76%"></td>
            </tr>
            <tr style="page-break-inside:avoid">
              <td style="${tdStyle};width:24%;font-weight:bold;background:#F6F8F7">Anggota Kelompok</td>
              <td style="${tdStyle};width:76%;height:34pt"></td>
            </tr>
            <tr style="page-break-inside:avoid">
              <td style="${tdStyle};width:24%;font-weight:bold;background:#F6F8F7">Kelas / Hari, Tanggal</td>
              <td style="${tdStyle};width:76%"></td>
            </tr>
          </tbody>
        </table>

        ${l.tujuan ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">A. Tujuan Pembelajaran</h4>${nl(l.tujuan)}` : ''}
        ${l.petunjuk ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">B. Petunjuk Pengerjaan</h4>${nl(l.petunjuk)}` : ''}
        ${l.alat ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">C. Alat, Bahan, dan Dokumen Sumber</h4>${nl(l.alat)}` : ''}
        ${l.kegiatan ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">D. Langkah Kegiatan</h4>${nl(l.kegiatan)}` : ''}

        <h4 style="font-size:10.5pt;margin:8pt 0 4pt">E. Tugas dan Analisis Kasus</h4>
        ${
          tgs.length
            ? tgs.map(t => `<p style="margin:6pt 0 2pt;text-align:justify"><b>${esc(t)}</b></p>${ansLines(br)}`).join('')
            : `<p style="color:#666666"><i>Belum ada tugas.</i></p>`
        }

        ${
          l.kesimpulan
            ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">F. Kesimpulan Kelompok</h4><p style="margin:0 0 4pt;text-align:justify">${esc(
                l.kesimpulan
              )}</p>${ansLines(Math.min(br, 3))}`
            : ''
        }

        ${
          l.refleksi
            ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">G. Refleksi Belajar Siswa</h4><p style="margin:0 0 4pt;text-align:justify">${esc(
                l.refleksi
              )}</p><p style="margin:4pt 0;text-align:left">☐ Aku sudah sangat paham &nbsp;&nbsp;&nbsp;&nbsp; ☐ Aku cukup paham, perlu latihan &nbsp;&nbsp;&nbsp;&nbsp; ☐ Aku masih perlu bimbingan</p>`
            : ''
        }

        <h4 style="font-size:10.5pt;margin:10pt 0 4pt">H. Penilaian dan Umpan Balik Guru</h4>
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:9.5pt">
          <tbody>
            <tr style="page-break-inside:avoid">
              <td style="${tdStyle};width:24%;font-weight:bold;background:#F6F8F7">Kategori Capaian</td>
              <td style="${tdStyle};width:76%">${lv.map(x => `☐ ${x[0]} (${x[1]})`).join(' &nbsp;&nbsp;&nbsp; ')}</td>
            </tr>
            <tr style="page-break-inside:avoid">
              <td style="${tdStyle};width:24%;font-weight:bold;background:#F6F8F7">Nilai &amp; Catatan Guru</td>
              <td style="${tdStyle};width:76%;height:28pt"></td>
            </tr>
          </tbody>
        </table>

        ${docSign(state)}
      </div>`;
    })
    .join('\n');
}

export function generateSoalHtml(state: AppState, unitIdParam?: string): string {
  const p = state.profil;
  const units = unitIdParam ? state.unit.filter(u => u.id === unitIdParam) : state.unit;
  if (!units.length) {
    return `<div class="doc-section">${docKop(state)}<h2>SOAL UJIAN &amp; KISI-KISI</h2><p>Belum ada unit pembelajaran.</p></div>`;
  }

  return units
    .map((u, idx) => {
      const tps = state.tp.filter(t => t.unitId === u.id);
      const pkg =
        state.soal?.[u.id] ||
        generateContextualSoal(p.mapel, p.kelas, u, tps);

      const cetakKisi = pkg.cetakKisi !== false;
      const cetakNaskah = pkg.cetakNaskah !== false;
      const cetakKunci = pkg.cetakKunci !== false;

      const pgItems = pkg.pg || [];
      const essayItems = pkg.essay || [];

      const kisiRowsPg = pgItems
        .map(
          (item, i) => `<tr style="page-break-inside:avoid">
            <td style="${tdCenter}">${i + 1}</td>
            <td style="${tdCenter}">${esc(item.tpKode || `TP.${i + 1}`)}</td>
            <td style="${tdStyle}">${esc(pkg.topikFokus || u.nama)}</td>
            <td style="${tdJustify}">${esc(item.indikatorSoal)}</td>
            <td style="${tdCenter}">${esc(item.levelKognitif)}</td>
            <td style="${tdCenter}">Pilihan Ganda</td>
            <td style="${tdCenter}">PG No. ${i + 1}</td>
          </tr>`
        )
        .join('');

      const kisiRowsEssay = essayItems
        .map(
          (item, i) => `<tr style="page-break-inside:avoid">
            <td style="${tdCenter}">${pgItems.length + i + 1}</td>
            <td style="${tdCenter}">${esc(item.tpKode || `TP.${i + 1}`)}</td>
            <td style="${tdStyle}">${esc(pkg.topikFokus || u.nama)}</td>
            <td style="${tdJustify}">${esc(item.indikatorSoal)}</td>
            <td style="${tdCenter}">${esc(item.levelKognitif)}</td>
            <td style="${tdCenter}">Uraian / Kasus</td>
            <td style="${tdCenter}">Uraian No. ${i + 1}</td>
          </tr>`
        )
        .join('');

      const kisiBlock = cetakKisi
        ? `<h3 style="font-size:11pt;margin:10pt 0 4pt;text-transform:uppercase;border-bottom:1pt solid #000;padding-bottom:2pt">I. KISI-KISI PENULISAN SOAL UJIAN</h3>
           <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 12pt;font-size:9.5pt">
             <thead>
               <tr>
                 <th style="${thStyle};width:5%">No</th>
                 <th style="${thStyle};width:10%">Kode TP</th>
                 <th style="${thStyle};width:20%">Topik / Materi Pokok</th>
                 <th style="${thStyle};width:35%">Indikator Soal</th>
                 <th style="${thStyle};width:12%">Level Kognitif</th>
                 <th style="${thStyle};width:10%">Bentuk</th>
                 <th style="${thStyle};width:8%">Nomor</th>
               </tr>
             </thead>
             <tbody>
               ${kisiRowsPg}${kisiRowsEssay || (!kisiRowsPg ? `<tr><td colspan="7" style="${tdCenter}">Belum ada butir soal.</td></tr>` : '')}
             </tbody>
           </table>`
        : '';

      const pgNaskahHtml = pgItems
        .map(
          (item, i) => `<div style="margin:0 0 8pt;page-break-inside:avoid">
            <table style="width:100%;border:none;border-collapse:collapse">
              <tr>
                <td style="width:22pt;vertical-align:top;padding:1pt 0;border:none;font-weight:bold;font-size:10.5pt">${i + 1}.</td>
                <td style="vertical-align:top;padding:1pt 0;border:none;text-align:justify;font-size:10.5pt">
                  <div style="margin-bottom:3pt">${nl(item.tanya)}</div>
                  <table style="width:100%;border:none;border-collapse:collapse;font-size:10pt">
                    ${(['A', 'B', 'C', 'D', 'E'] as const)
                      .map(
                        optKey => `<tr>
                          <td style="width:18pt;vertical-align:top;padding:1pt 0;border:none;font-weight:bold">${optKey}.</td>
                          <td style="vertical-align:top;padding:1pt 0;border:none;text-align:justify">${esc(item.opsi?.[optKey] || '')}</td>
                        </tr>`
                      )
                      .join('')}
                  </table>
                </td>
              </tr>
            </table>
          </div>`
        )
        .join('');

      const essayNaskahHtml = essayItems
        .map(
          (item, i) => `<div style="margin:0 0 10pt;page-break-inside:avoid">
            <table style="width:100%;border:none;border-collapse:collapse">
              <tr>
                <td style="width:22pt;vertical-align:top;padding:1pt 0;border:none;font-weight:bold;font-size:10.5pt">${i + 1}.</td>
                <td style="vertical-align:top;padding:1pt 0;border:none;text-align:justify;font-size:10.5pt">
                  <div>${nl(item.tanya)}</div>
                  <p style="font-size:9.5pt;color:#333;margin:2pt 0 0;font-style:italic">(Bobot Skor Maksimal: ${Number(item.skor) || 20} Poin)</p>
                </td>
              </tr>
            </table>
          </div>`
        )
        .join('');

      const naskahBlock = cetakNaskah
        ? `${cetakKisi ? '<br clear="all" style="page-break-before:always" />' : ''}
           ${cetakKisi ? docKop(state) : ''}
           <h3 style="font-size:11.5pt;margin:6pt 0 2pt;text-align:center;text-transform:uppercase">NASKAH SOAL ${esc(pkg.jenisUjian || 'ASESMEN SUMATIF')}</h3>
           <p style="text-align:center;font-size:10pt;margin:0 0 8pt;color:#222">Topik Pembahasan: <b>${esc(pkg.topikFokus || u.nama)}</b> · Waktu: ${Number(pkg.waktuMenit) || 90} Menit</p>
           <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:10pt">
             <tbody>
               <tr>
                 <td style="${tdStyle};width:18%;font-weight:bold;background:#F6F8F7">Nama Peserta Didik</td>
                 <td style="${tdStyle};width:32%">……………………………………………………</td>
                 <td style="${tdStyle};width:18%;font-weight:bold;background:#F6F8F7">Hari / Tanggal</td>
                 <td style="${tdStyle};width:32%">……………………………………………………</td>
               </tr>
               <tr>
                 <td style="${tdStyle};font-weight:bold;background:#F6F8F7">Kelas / No. Absen</td>
                 <td style="${tdStyle}">${dots(p.kelas)} / ………………………………</td>
                 <td style="${tdStyle};font-weight:bold;background:#F6F8F7">Mata Pelajaran</td>
                 <td style="${tdStyle}">${dots(p.mapel)}</td>
               </tr>
             </tbody>
           </table>
           ${
             pkg.petunjuk
               ? `<div style="border:1pt solid #000;padding:6pt 8pt;margin:0 0 10pt;background:#FAFAFA">
                    <p style="font-weight:bold;margin:0 0 3pt;font-size:10pt">PETUNJUK PENGERJAAN:</p>
                    ${nl(pkg.petunjuk)}
                  </div>`
               : ''
           }
           ${
             pgItems.length > 0
               ? `<h4 style="font-size:10.5pt;margin:8pt 0 6pt;text-transform:uppercase">BAGIAN A. PILIHAN GANDA (${pgItems.length} Butir Soal)</h4>
                  <p style="margin:0 0 6pt;font-style:italic;font-size:10pt">Pilihlah satu jawaban yang paling tepat (A, B, C, D, atau E)!</p>
                  ${pgNaskahHtml}`
               : ''
           }
           ${
             essayItems.length > 0
               ? `<h4 style="font-size:10.5pt;margin:12pt 0 6pt;text-transform:uppercase">BAGIAN B. URAIAN / STUDI KASUS (${essayItems.length} Butir Soal)</h4>
                  <p style="margin:0 0 6pt;font-style:italic;font-size:10pt">Jawablah pertanyaan di bawah ini secara jelas, sistematis, dan tepat!</p>
                  ${essayNaskahHtml}`
               : ''
           }`
        : '';

      const kunciPgRows = pgItems
        .map(
          (item, i) => `<tr style="page-break-inside:avoid">
            <td style="${tdCenter}">${i + 1}</td>
            <td style="${tdCenter};font-weight:bold">${esc(item.kunci)}</td>
            <td style="${tdJustify}">${esc(item.pembahasan)}</td>
          </tr>`
        )
        .join('');

      const kunciEssayRows = essayItems
        .map(
          (item, i) => `<tr style="page-break-inside:avoid">
            <td style="${tdCenter}">${i + 1}</td>
            <td style="${tdJustify}">${nl(item.kunci)}</td>
            <td style="${tdCenter};font-weight:bold">${Number(item.skor) || 20}</td>
          </tr>`
        )
        .join('');

      const totalEssaySkor = essayItems.reduce((a, b) => a + (Number(b.skor) || 0), 0);

      const kunciBlock = cetakKunci
        ? `${cetakKisi || cetakNaskah ? '<br clear="all" style="page-break-before:always" />' : ''}
           <h3 style="font-size:11pt;margin:8pt 0 4pt;text-transform:uppercase;border-bottom:1pt solid #000;padding-bottom:2pt">KUNCI JAWABAN, PEMBAHASAN, DAN PEDOMAN PENSKORAN</h3>
           ${
             pgItems.length > 0
               ? `<h4 style="font-size:10.5pt;margin:6pt 0 4pt">A. Kunci Jawaban &amp; Pembahasan Pilihan Ganda</h4>
                  <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:9.5pt">
                    <thead>
                      <tr>
                        <th style="${thStyle};width:8%">No</th>
                        <th style="${thStyle};width:12%">Kunci</th>
                        <th style="${thStyle};width:80%">Pembahasan &amp; Rasional Jawaban</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${kunciPgRows}
                    </tbody>
                  </table>`
               : ''
           }
           ${
             essayItems.length > 0
               ? `<h4 style="font-size:10.5pt;margin:8pt 0 4pt">B. Kunci Jawaban &amp; Rubrik Penskoran Uraian / Studi Kasus</h4>
                  <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:9.5pt">
                    <thead>
                      <tr>
                        <th style="${thStyle};width:8%">No</th>
                        <th style="${thStyle};width:77%">Pedoman Jawaban / Langkah Penyelesaian</th>
                        <th style="${thStyle};width:15%">Skor Maks</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${kunciEssayRows}
                      <tr class="tot">
                        <td colspan="2" style="${totStyle};text-align:right">Total Skor Maksimal Uraian</td>
                        <td style="${totStyle};text-align:center">${totalEssaySkor}</td>
                      </tr>
                    </tbody>
                  </table>`
               : ''
           }
           <p style="font-size:9.5pt;margin:4pt 0 10pt"><b>Rumus Nilai Akhir:</b> Nilai Pilihan Ganda (Bobot 60%) + Nilai Uraian/Kasus (Bobot 40%) = Nilai Total (Skala 0–100).</p>`
        : '';

      return `<div class="doc-section" style="${idx > 0 ? 'page-break-before:always' : ''}">
        ${docKop(state)}
        <h2 style="text-align:center;font-size:12.5pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.03em">INSTRUMEN SOAL UJIAN, KISI-KISI, DAN KUNCI JAWABAN</h2>
        <p class="sub" style="text-align:center;font-size:10.5pt;margin:0 0 10pt;color:#222222">${esc(pkg.jenisUjian || 'Asesmen Sumatif')} · Topik: ${esc(pkg.topikFokus || u.nama)}</p>
        ${docIdent(state, [
          ['Unit / Lingkup Materi', u.nama],
          ['Fokus Topik Bahasan', pkg.topikFokus || u.nama],
          ['Jenis Evaluasi', pkg.jenisUjian || 'Asesmen Sumatif Lingkup Materi'],
          ['Alokasi Waktu Ujian', `${Number(pkg.waktuMenit) || 90} Menit (${pgItems.length} PG & ${essayItems.length} Uraian)`],
        ])}
        ${kisiBlock}
        ${naskahBlock}
        ${kunciBlock}
        ${docSign(state)}
      </div>`;
    })
    .join('\n');
}

export function generateAllDocsHtml(state: AppState): string {
  const breakToLandscape = '<br clear="all" style="page-break-before:always;mso-break-type:section-break" />';
  const breakToPortrait = '<br clear="all" style="page-break-before:always;mso-break-type:section-break" />';
  const pageBreak = '<br clear="all" style="page-break-before:always" />';

  const portraitModul = state.unit.map(u => generateModulHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const portraitLkpd = state.unit.map(u => generateLkpdHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const portraitSoal = state.unit.map(u => generateSoalHtml(state, u.id)).join(`\n${pageBreak}\n`);

  return [
    `<div class="SectionPortrait">${generateWaktuHtml(state)}</div>`,
    breakToLandscape,
    `<div class="SectionLandscape">${generateCpatpHtml(state)}</div>`,
    breakToPortrait,
    `<div class="SectionPortrait">${generateProtaHtml(state)}</div>`,
    breakToLandscape,
    `<div class="SectionLandscape">${generatePromesHtml(state)}${pageBreak}${generateKktpHtml(state)}</div>`,
    breakToPortrait,
    `<div class="SectionPortrait">${portraitModul}${pageBreak}${portraitLkpd}${pageBreak}${portraitSoal}</div>`,
  ].join('\n');
}

export function getTabDocHtml(state: AppState, tab: string): { html: string; filename: string; landscape?: boolean } {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const suffix = `${mapelSlug}_Kelas_${kelasSlug}`;

  switch (tab) {
    case 'waktu':
      return {
        html: generateWaktuHtml(state),
        filename: `1_Analisis_Alokasi_Waktu_A4_${suffix}.doc`,
        landscape: false,
      };
    case 'cpatp':
      return {
        html: generateCpatpHtml(state),
        filename: `2_CP_dan_ATP_A4_${suffix}.doc`,
        landscape: true,
      };
    case 'prota':
      return {
        html: generateProtaHtml(state),
        filename: `3_Program_Tahunan_A4_${suffix}.doc`,
        landscape: false,
      };
    case 'promes':
      return {
        html: generatePromesHtml(state, state.ui.sem),
        filename: `4_Program_Semester_Smt${state.ui.sem}_A4_${suffix}.doc`,
        landscape: true,
      };
    case 'kktp':
      return {
        html: generateKktpHtml(state),
        filename: `5_KKTP_A4_${suffix}.doc`,
        landscape: true,
      };
    case 'modul': {
      const u = state.unit.find(x => x.id === state.ui.unit) || state.unit[0];
      const uSlug = u ? u.nama.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 30) : 'Unit';
      return {
        html: generateModulHtml(state, u?.id),
        filename: `6_Modul_Ajar_A4_${uSlug}_${suffix}.doc`,
        landscape: false,
      };
    }
    case 'lkpd': {
      const u = state.unit.find(x => x.id === state.ui.unitL) || state.unit[0];
      const uSlug = u ? u.nama.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 30) : 'Unit';
      return {
        html: generateLkpdHtml(state, u?.id),
        filename: `7_LKPD_A4_${uSlug}_${suffix}.doc`,
        landscape: false,
      };
    }
    case 'soal': {
      const u = state.unit.find(x => x.id === state.ui.unitS) || state.unit[0];
      const uSlug = u ? u.nama.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 30) : 'Unit';
      return {
        html: generateSoalHtml(state, u?.id),
        filename: `8_Soal_Ujian_Kisi_Kunci_A4_${uSlug}_${suffix}.doc`,
        landscape: false,
      };
    }
    default:
      return {
        html: generateAllDocsHtml(state),
        filename: `Berkas_Ajar_Lengkap_8_Dokumen_A4_${suffix}.doc`,
        landscape: false,
      };
  }
}

export function wrapWordDocument(bodyHtml: string, title: string, landscape = false): string {
  const hasMultiSections = bodyHtml.includes('SectionPortrait') || bodyHtml.includes('SectionLandscape');
  const defaultSectionClass = landscape ? 'SectionLandscape' : 'SectionPortrait';

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    /* Standar Resmi Kertas A4 (21.0 cm x 29.7 cm) */
    @page SectionPortrait {
      size: 21.0cm 29.7cm;
      mso-page-orientation: portrait;
      margin: 2.0cm 2.0cm 2.0cm 2.5cm;
      mso-header-margin: 1.2cm;
      mso-footer-margin: 1.2cm;
      mso-paper-source: 0;
    }
    div.SectionPortrait {
      page: SectionPortrait;
    }

    /* Standar Resmi Kertas A4 Landscape (29.7 cm x 21.0 cm) untuk Tabel Lebar */
    @page SectionLandscape {
      size: 29.7cm 21.0cm;
      mso-page-orientation: landscape;
      margin: 1.5cm 1.8cm 1.5cm 1.8cm;
      mso-header-margin: 1.0cm;
      mso-footer-margin: 1.0cm;
      mso-paper-source: 0;
    }
    div.SectionLandscape {
      page: SectionLandscape;
    }

    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #000000;
      margin: 0;
      padding: 0;
    }
    h2 {
      font-size: 12.5pt;
      font-weight: bold;
      margin: 0 0 2pt;
      text-align: center;
      text-transform: uppercase;
    }
    h3 {
      font-size: 11pt;
      font-weight: bold;
      margin: 10pt 0 4pt;
      text-transform: uppercase;
    }
    h4 {
      font-size: 10.5pt;
      font-weight: bold;
      margin: 6pt 0 2pt;
    }
    p {
      margin: 0 0 3.5pt;
      text-align: justify;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    thead {
      display: table-header-group;
    }
    tr {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  ${hasMultiSections ? bodyHtml : `<div class="${defaultSectionClass}">${bodyHtml}</div>`}
</body>
</html>`;
}

export function triggerDocDownload(bodyHtml: string, filename: string, title: string, landscape = false): void {
  const fullHtml = wrapWordDocument(bodyHtml, title, landscape);
  const blob = new Blob(['\ufeff', fullHtml], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadDocForTab(state: AppState, tab: string): string {
  const { html, filename, landscape } = getTabDocHtml(state, tab);
  triggerDocDownload(html, filename, filename.replace(/\.doc$/, ''), landscape);
  return filename;
}

export function downloadAllDocsWord(state: AppState): string {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const filename = `Berkas_Ajar_Lengkap_8_Dokumen_A4_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  const html = generateAllDocsHtml(state);
  triggerDocDownload(html, filename, `Perangkat Ajar Lengkap A4 - ${state.profil.mapel}`, false);
  return filename;
}

export function downloadAllModulWord(state: AppState): string {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const pageBreak = '<br clear="all" style="page-break-before:always" />';
  const html = state.unit.map(u => generateModulHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const filename = `6_Semua_Modul_Ajar_A4_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  triggerDocDownload(html, filename, `Semua Modul Ajar A4 - ${state.profil.mapel}`, false);
  return filename;
}

export function downloadAllLkpdWord(state: AppState): string {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const pageBreak = '<br clear="all" style="page-break-before:always" />';
  const html = state.unit.map(u => generateLkpdHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const filename = `7_Semua_LKPD_A4_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  triggerDocDownload(html, filename, `Semua LKPD A4 - ${state.profil.mapel}`, false);
  return filename;
}

export function downloadAllSoalWord(state: AppState): string {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const pageBreak = '<br clear="all" style="page-break-before:always" />';
  const html = state.unit.map(u => generateSoalHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const filename = `8_Semua_Soal_Ujian_A4_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  triggerDocDownload(html, filename, `Semua Soal Ujian A4 - ${state.profil.mapel}`, false);
  return filename;
}

export async function copyCleanDocToClipboard(state: AppState, tab: string): Promise<boolean> {
  const { html } = getTabDocHtml(state, tab);
  const wrapped = `<div style="font-family:'Times New Roman',Times,serif;font-size:11pt;color:#000;line-height:1.4">${html}</div>`;
  try {
    if (window.ClipboardItem && navigator.clipboard?.write) {
      const htmlBlob = new Blob([wrapped], { type: 'text/html' });
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const textBlob = new Blob([tempDiv.innerText || ''], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ]);
      return true;
    }
  } catch {
    // Fallback below
  }
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    await navigator.clipboard.writeText(tempDiv.innerText || '');
    return true;
  } catch {
    return false;
  }
}
