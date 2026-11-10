import { AppState, Semester, TpItem, UnitItem } from '../types';

const esc = (s: any): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const dots = (s?: string): string => (s && s.trim() ? esc(s.trim()) : '…………………');

const nl = (s?: string): string =>
  String(s || '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => `<p style="margin:0 0 4pt">${esc(l)}</p>`)
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

  const size = Math.max(40, Math.min(120, Number(p.ukuranLogo) || 72));
  const hasLeft = Boolean(p.logoKiri);
  const hasRight = Boolean(p.logoKanan);
  const baris1 = p.kopBaris1 ?? 'PEMERINTAH PROVINSI DAERAH KHUSUS';
  const baris2 = p.kopBaris2 ?? 'DINAS PENDIDIKAN';
  const sekolah = p.sekolah || 'NAMA SATUAN PENDIDIKAN / SEKOLAH';
  const bidang = p.kopBidang ?? '';
  const alamat = p.kopAlamat ?? '';
  const kontak = p.kopKontak ?? '';

  const leftCell = hasLeft
    ? `<td style="width:${size + 16}px;vertical-align:middle;text-align:center;border:none;padding:0 8pt 6pt 0">
         <img src="${p.logoKiri}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;object-fit:contain;display:inline-block" alt="Logo Kiri" />
       </td>`
    : hasRight
    ? `<td style="width:${size + 16}px;border:none;padding:0"></td>`
    : '';

  const rightCell = hasRight
    ? `<td style="width:${size + 16}px;vertical-align:middle;text-align:center;border:none;padding:0 0 6pt 8pt">
         <img src="${p.logoKanan}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;object-fit:contain;display:inline-block" alt="Logo Kanan" />
       </td>`
    : hasLeft
    ? `<td style="width:${size + 16}px;border:none;padding:0"></td>`
    : '';

  return `<table class="kop-table" style="width:100%;border-collapse:collapse;border:none;border-bottom:3pt double #111111;margin:0 0 12pt 0;padding-bottom:6pt">
    <tbody>
      <tr>
        ${leftCell}
        <td style="vertical-align:middle;text-align:center;border:none;padding:0 4pt 6pt 4pt;line-height:1.25">
          ${baris1 ? `<div style="font-size:11pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.03em;margin:0">${esc(baris1)}</div>` : ''}
          ${baris2 ? `<div style="font-size:11.5pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.03em;margin:1pt 0">${esc(baris2)}</div>` : ''}
          <div style="font-size:14pt;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;margin:2pt 0;color:#000000">${esc(sekolah)}</div>
          ${bidang ? `<div style="font-size:9.5pt;font-weight:bold;text-transform:uppercase;margin:1pt 0;color:#111111">${esc(bidang)}</div>` : ''}
          ${alamat ? `<div style="font-size:9pt;margin:1pt 0;color:#222222">${esc(alamat)}</div>` : ''}
          ${kontak ? `<div style="font-size:8.5pt;font-style:italic;margin:1pt 0 0;color:#333333">${esc(kontak)}</div>` : ''}
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
    ['Fase / Kelas', `${dots(p.fase)} / ${dots(p.kelas)}`],
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
      <td style="border:none;padding:2pt 6pt 2pt 0;width:130pt;color:#333333">${a[0]}</td>
      <td style="border:none;padding:2pt 10pt 2pt 0">: ${a[1]}</td>
      ${
        b
          ? `<td style="border:none;padding:2pt 6pt 2pt 12pt;width:120pt;color:#333333">${b[0]}</td>
             <td style="border:none;padding:2pt 0">: ${b[1]}</td>`
          : '<td style="border:none"></td><td style="border:none"></td>'
      }
    </tr>`;
  }
  return `<table class="idt" style="width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:11pt;border:none">${trs}</table>`;
}

function docSign(state: AppState): string {
  const p = state.profil;
  return `<table class="sign" style="width:100%;border-collapse:collapse;margin-top:24pt;font-size:11pt;border:none">
    <tr>
      <td style="width:50%;vertical-align:top;border:none;padding:2pt 4pt">
        Mengetahui,<br/>Kepala Sekolah<br/><br/><br/><br/>
        <b><u>${dots(p.kepsek)}</u></b><br/>
        NIP. ${p.nipKs ? esc(p.nipKs) : '…………………'}
      </td>
      <td style="width:50%;vertical-align:top;text-align:right;border:none;padding:2pt 4pt">
        ${p.kota ? esc(p.kota) : '…………'}, ${p.tgl ? esc(p.tgl) : '…………………'}<br/>
        Guru Mata Pelajaran<br/><br/><br/><br/>
        <b><u>${dots(p.guru)}</u></b><br/>
        NIP. ${p.nip ? esc(p.nip) : '…………………'}
      </td>
    </tr>
  </table>`;
}

const thStyle = 'border:1px solid #2a2a2a;padding:5pt 6pt;background:#E6ECE8;font-weight:bold;text-align:center;vertical-align:middle';
const tdStyle = 'border:1px solid #2a2a2a;padding:4pt 6pt;vertical-align:top';
const tdCenter = 'border:1px solid #2a2a2a;padding:4pt 6pt;vertical-align:top;text-align:center';
const tdRight = 'border:1px solid #2a2a2a;padding:4pt 6pt;vertical-align:top;text-align:right';
const grpStyle = 'border:1px solid #2a2a2a;padding:5pt 6pt;background:#DDE8E2;font-weight:bold';
const totStyle = 'border:1px solid #2a2a2a;padding:5pt 6pt;background:#F0F3F1;font-weight:bold';

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
          return `<tr>
            <td style="${tdCenter}">${i + 1}</td>
            <td style="${tdStyle}">${esc(b.nama)}</td>
            <td style="${tdCenter}">${b.n}</td>
            <td style="${tdCenter}">${b.off.length}</td>
            <td style="${tdCenter}">${ef}</td>
            <td style="${tdCenter}">${ef * jp}</td>
            <td style="${tdStyle}">${esc(b.ket)}</td>
          </tr>`;
        })
        .join('');

      return `<h3 style="font-size:11pt;margin:12pt 0 4pt;text-transform:uppercase">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'})</h3>
      <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:10pt">
        <thead>
          <tr>
            <th style="${thStyle};width:28pt">No</th>
            <th style="${thStyle}">Bulan</th>
            <th style="${thStyle};width:65pt">Jml Minggu</th>
            <th style="${thStyle};width:75pt">Tidak Efektif</th>
            <th style="${thStyle};width:65pt">Efektif</th>
            <th style="${thStyle};width:65pt">JP Efektif</th>
            <th style="${thStyle}">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr class="tot">
            <td colspan="2" style="${totStyle};text-align:center">Jumlah</td>
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
      return `<tr>
        <td style="${tdCenter}">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'})</td>
        <td style="${tdCenter}">${av} JP</td>
        <td style="${tdCenter}">${tot} JP</td>
        <td style="${tdCenter}">${av - tot} JP</td>
      </tr>`;
    })
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">ANALISIS ALOKASI WAKTU</h2>
    <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${jp} JP`]])}
    ${semTables}
    <h3 style="font-size:11pt;margin:12pt 0 4pt;text-transform:uppercase">Rekapitulasi Kebutuhan JP</h3>
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 8pt;font-size:10pt">
      <thead>
        <tr>
          <th style="${thStyle}">Semester</th>
          <th style="${thStyle}">JP Efektif</th>
          <th style="${thStyle}">JP Materi</th>
          <th style="${thStyle}">Sisa JP</th>
        </tr>
      </thead>
      <tbody>
        ${rekapRows}
      </tbody>
    </table>
    <p style="font-size:10pt;color:#444444;margin:4pt 0">* JP efektif = minggu efektif × ${jp} JP per minggu. Sisa JP dipakai untuk asesmen, remedial, dan kegiatan sekolah.</p>
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

  const bodyRows = rows
    .map((r, i) => {
      const cs = cpSpan(i);
      const us = uSpan(i);
      const cp = state.cp.find(c => c.id === r.u.cpId);
      return `<tr>
        ${
          cs
            ? `<td rowspan="${cs}" style="${tdStyle};font-weight:bold;width:110pt">${esc(cp ? cp.elemen : '')}</td>
               <td rowspan="${cs}" style="${tdStyle};width:180pt">${esc(cp ? cp.teks : '')}</td>`
            : ''
        }
        ${us ? `<td rowspan="${us}" style="${tdStyle};width:110pt">${esc(r.u.nama)}</td>` : ''}
        <td style="${tdStyle}">${noMap[r.t.id] || '–'}. ${esc(r.t.teks)}</td>
        <td style="${tdCenter};width:38pt">${Number(r.t.jp) || 0}</td>
        <td style="${tdCenter};width:36pt">${r.s}</td>
      </tr>`;
    })
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">CAPAIAN PEMBELAJARAN DAN ALUR TUJUAN PEMBELAJARAN</h2>
    <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:10.5pt">
      <thead>
        <tr>
          <th style="${thStyle};width:110pt">Elemen</th>
          <th style="${thStyle};width:180pt">Capaian Pembelajaran</th>
          <th style="${thStyle};width:110pt">Lingkup Materi</th>
          <th style="${thStyle}">Alur Tujuan Pembelajaran</th>
          <th style="${thStyle};width:38pt">JP</th>
          <th style="${thStyle};width:36pt">Smt</th>
        </tr>
      </thead>
      <tbody>
        ${bodyRows || `<tr><td colspan="6" style="${tdCenter}">Belum ada tujuan pembelajaran.</td></tr>`}
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
            return `<tr>
              <td style="${tdCenter}">–</td>
              <td style="${tdStyle}">${esc(u.nama)}</td>
              <td style="${tdStyle}"></td>
              <td style="${tdCenter}">0 JP</td>
            </tr>`;
          }
          return ts
            .map((t, i) => {
              n++;
              return `<tr>
                <td style="${tdCenter}">${n}</td>
                ${i === 0 ? `<td rowspan="${ts.length}" style="${tdStyle};font-weight:500">${esc(u.nama)}</td>` : ''}
                <td style="${tdStyle}">${esc(t.teks)}</td>
                <td style="${tdCenter}">${Number(t.jp) || 0} JP</td>
              </tr>`;
            })
            .join('');
        })
        .join('');

      return `<tr class="grp">
        <td colspan="4" style="${grpStyle}">Semester ${s} (${s === 1 ? 'Ganjil' : 'Genap'})</td>
      </tr>
      ${unitRows}
      <tr class="tot">
        <td colspan="3" style="${totStyle};text-align:right">Jumlah JP Semester ${s}</td>
        <td style="${totStyle};text-align:center">${jpTotal(state, s)} JP</td>
      </tr>`;
    })
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">PROGRAM TAHUNAN</h2>
    <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:10.5pt">
      <thead>
        <tr>
          <th style="${thStyle};width:28pt">No</th>
          <th style="${thStyle};width:140pt">Lingkup Materi</th>
          <th style="${thStyle}">Tujuan Pembelajaran</th>
          <th style="${thStyle};width:70pt">Alokasi Waktu</th>
        </tr>
      </thead>
      <tbody>
        ${semBlocks}
        <tr class="tot">
          <td colspan="3" style="${totStyle};text-align:right">Jumlah JP Satu Tahun</td>
          <td style="${totStyle};text-align:center">${jpTotal(state, 1) + jpTotal(state, 2)} JP</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:10pt;color:#444444;margin:4pt 0">* JP efektif: Semester 1 = ${jpAvail(state, 1)} JP, Semester 2 = ${jpAvail(state, 2)} JP (dari Analisis Waktu). Selisihnya dipakai untuk asesmen, remedial, dan kegiatan sekolah.</p>
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
        .map(b => `${esc(b.nama)}${b.ket ? ` (${esc(b.ket)})` : ''}: minggu ${b.off.map(i => i + 1).join(', ')}`)
        .join('; ');

      const monthHeaders = bs
        .map(b => `<th colspan="${b.n}" style="${thStyle};font-size:9.5pt">${esc(b.nama)}</th>`)
        .join('');
      const weekHeaders = bs
        .map(b =>
          Array.from(
            { length: b.n },
            (_, i) => `<th style="${thStyle};width:16pt;font-size:8.5pt;padding:2pt">${i + 1}</th>`
          ).join('')
        )
        .join('');

      const bodyRows = us
        .map(u => {
          const ts = state.tp.filter(t => t.unitId === u.id);
          if (!ts.length) return '';
          const groupRow = `<tr class="grp">
            <td colspan="${3 + totalWeekCols}" style="${grpStyle};font-size:9.5pt">${esc(u.nama)}</td>
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
                      return `<td class="pc off" style="border:1px solid #2a2a2a;background:#d4d4d4;color:#444444;font-weight:bold;text-align:center;font-size:8.5pt;padding:2pt">L</td>`;
                    }
                    if (isOn) {
                      return `<td class="pc on" style="border:1px solid #2a2a2a;background:#0E6B5A;color:#ffffff;font-weight:bold;text-align:center;font-size:9pt;padding:2pt">✓</td>`;
                    }
                    return `<td class="pc" style="border:1px solid #2a2a2a;text-align:center;font-size:8.5pt;padding:2pt"></td>`;
                  }).join('')
                )
                .join('');

              return `<tr>
                <td style="${tdCenter};font-size:9.5pt">${noMap[t.id] || '–'}</td>
                <td style="${tdStyle};font-size:9.5pt">${esc(t.teks)}</td>
                <td style="${tdCenter};font-size:9.5pt">${Number(t.jp) || 0}</td>
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
        <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">PROGRAM SEMESTER ${s}</h2>
        <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">Semester ${s === 1 ? 'Ganjil' : 'Genap'} Tahun Pelajaran ${dots(p.ta)}</p>
        ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:9.5pt">
          <thead>
            <tr>
              <th rowspan="2" style="${thStyle};width:24pt">No</th>
              <th rowspan="2" style="${thStyle}">Tujuan Pembelajaran</th>
              <th rowspan="2" style="${thStyle};width:28pt">JP</th>
              ${monthHeaders}
            </tr>
            <tr>${weekHeaders}</tr>
          </thead>
          <tbody>
            ${
              bodyRows
                ? `${bodyRows}
                   <tr class="tot">
                     <td colspan="3" style="${totStyle};text-align:right;font-size:9.5pt">Jumlah JP</td>
                     <td colspan="${totalWeekCols}" style="${totStyle};text-align:center;font-size:9.5pt">${semTotalJp} JP</td>
                   </tr>`
                : `<tr><td colspan="${3 + totalWeekCols}" style="${tdCenter}">Belum ada tujuan pembelajaran pada semester ini.</td></tr>`
            }
          </tbody>
        </table>
        <p style="font-size:9.5pt;color:#444444;margin:4pt 0"><i>✓ = minggu pembelajaran. L = minggu tidak efektif.${
          inactiveKet ? ` Minggu tidak efektif — ${inactiveKet}.` : ''
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
      t => `<tr>
        <td style="${tdCenter}">${noMap[t.id] || '–'}</td>
        <td style="${tdStyle}">${esc(t.teks)}</td>
        <td style="${tdStyle}">${esc(t.ind)}</td>
        <td style="${tdStyle};font-size:9.5pt">${esc(t.r1)}</td>
        <td style="${tdStyle};font-size:9.5pt">${esc(t.r2)}</td>
        <td style="${tdStyle};font-size:9.5pt">${esc(t.r3)}</td>
        <td style="${tdStyle};font-size:9.5pt">${esc(t.r4)}</td>
        <td style="${tdStyle}">${esc(t.teknik)}</td>
      </tr>`
    )
    .join('');

  return `<div class="doc-section">
    ${docKop(state)}
    <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)</h2>
    <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">Tahun Pelajaran ${dots(p.ta)}</p>
    ${docIdent(state, [['Alokasi per Minggu', `${Number(p.jp) || 4} JP`]])}
    <table class="dtbl" style="width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:10pt">
      <thead>
        <tr>
          <th rowspan="2" style="${thStyle};width:24pt">No</th>
          <th rowspan="2" style="${thStyle};width:130pt">Tujuan Pembelajaran</th>
          <th rowspan="2" style="${thStyle};width:110pt">Kriteria Ketercapaian</th>
          <th colspan="4" style="${thStyle}">Rubrik / Interval Nilai</th>
          <th rowspan="2" style="${thStyle};width:80pt">Teknik Asesmen</th>
        </tr>
        <tr>
          ${lv.map(l => `<th style="${thStyle};font-size:9pt">${l[0]}<br/>(${l[1]})</th>`).join('')}
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
        <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">MODUL AJAR</h2>
        <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">${esc(u.nama)} · Semester ${u.sem} · Tahun Pelajaran ${dots(p.ta)}</p>
        ${docIdent(state, [['Alokasi Waktu', `${uJp} JP × ${Number(p.menit) || 40} menit`]])}

        <h3 style="font-size:11pt;margin:12pt 0 4pt;text-transform:uppercase;border-bottom:1px solid #cccccc;padding-bottom:2pt">A. Informasi Umum</h3>
        ${m.awal ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Kompetensi Awal</h4>${nl(m.awal)}` : ''}
        ${
          m.dimensi && m.dimensi.length
            ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Dimensi Profil Lulusan</h4><ul style="margin:0 0 6pt 18pt;padding:0">${m.dimensi
                .map(d => `<li style="margin-bottom:2pt">${esc(d)}</li>`)
                .join('')}</ul>`
            : ''
        }
        ${m.sarana ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Sarana dan Prasarana</h4>${nl(m.sarana)}` : ''}
        ${m.target ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Target Peserta Didik</h4>${nl(m.target)}` : ''}
        ${m.model ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Model dan Pendekatan Pembelajaran</h4>${nl(m.model)}` : ''}

        <h3 style="font-size:11pt;margin:12pt 0 4pt;text-transform:uppercase;border-bottom:1px solid #cccccc;padding-bottom:2pt">B. Komponen Inti</h3>
        <h4 style="font-size:10.5pt;margin:6pt 0 2pt">Tujuan Pembelajaran</h4>
        <ol style="margin:0 0 6pt 18pt;padding:0">
          ${ts.map(t => `<li style="margin-bottom:2pt">${esc(t.teks)}</li>`).join('')}
        </ol>
        ${m.pemahaman ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Pemahaman Bermakna</h4>${nl(m.pemahaman)}` : ''}
        ${m.pemantik ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Pertanyaan Pemantik</h4>${nl(m.pemantik)}` : ''}
        <h4 style="font-size:10.5pt;margin:6pt 0 2pt">Kegiatan Pembelajaran</h4>
        ${m.pendahuluan ? `<p style="margin:4pt 0 2pt"><b><i>Pendahuluan</i></b></p>${nl(m.pendahuluan)}` : ''}
        ${m.memahami ? `<p style="margin:4pt 0 2pt"><b><i>Inti — Memahami</i></b></p>${nl(m.memahami)}` : ''}
        ${m.mengaplikasi ? `<p style="margin:4pt 0 2pt"><b><i>Inti — Mengaplikasi</i></b></p>${nl(m.mengaplikasi)}` : ''}
        ${m.merefleksi ? `<p style="margin:4pt 0 2pt"><b><i>Inti — Merefleksi</i></b></p>${nl(m.merefleksi)}` : ''}
        ${m.penutup ? `<p style="margin:4pt 0 2pt"><b><i>Penutup</i></b></p>${nl(m.penutup)}` : ''}

        <h3 style="font-size:11pt;margin:12pt 0 4pt;text-transform:uppercase;border-bottom:1px solid #cccccc;padding-bottom:2pt">C. Asesmen dan Tindak Lanjut</h3>
        ${m.diagnostik ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Asesmen Diagnostik</h4>${nl(m.diagnostik)}` : ''}
        ${m.formatif ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Asesmen Formatif</h4>${nl(m.formatif)}` : ''}
        ${m.sumatif ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Asesmen Sumatif</h4>${nl(m.sumatif)}` : ''}
        <h4 style="font-size:10.5pt;margin:6pt 0 4pt">Kriteria Ketercapaian (KKTP)</h4>
        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:4pt 0 10pt;font-size:9.5pt">
          <thead>
            <tr>
              <th style="${thStyle}">Tujuan Pembelajaran</th>
              ${lv.map(l => `<th style="${thStyle};width:90pt">${l[0]}<br/>(${l[1]})</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${ts
              .map(
                t => `<tr>
                  <td style="${tdStyle}">${esc(t.teks)}</td>
                  <td style="${tdStyle}">${esc(t.r1)}</td>
                  <td style="${tdStyle}">${esc(t.r2)}</td>
                  <td style="${tdStyle}">${esc(t.r3)}</td>
                  <td style="${tdStyle}">${esc(t.r4)}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
        ${m.remedial ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Remedial</h4>${nl(m.remedial)}` : ''}
        ${m.pengayaan ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Pengayaan</h4>${nl(m.pengayaan)}` : ''}

        <h3 style="font-size:11pt;margin:12pt 0 4pt;text-transform:uppercase;border-bottom:1px solid #cccccc;padding-bottom:2pt">D. Refleksi dan Lampiran</h3>
        ${m.refGuru ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Refleksi Guru</h4>${nl(m.refGuru)}` : ''}
        ${m.refSiswa ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Refleksi Peserta Didik</h4>${nl(m.refSiswa)}` : ''}
        ${m.pustaka ? `<h4 style="font-size:10.5pt;margin:6pt 0 2pt">Daftar Pustaka</h4>${nl(m.pustaka)}` : ''}
        <h4 style="font-size:10.5pt;margin:6pt 0 2pt">Lampiran</h4>
        <p style="margin:0 0 6pt">LKPD: ${esc(state.lkpd[u.id]?.judul || `LKPD ${u.nama}`)}</p>

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
      () => `<div class="ans-line" style="border-bottom:1px dotted #555555;height:18pt;margin-bottom:4pt">&nbsp;</div>`
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
        <h2 style="text-align:center;font-size:13pt;margin:0 0 2pt;text-transform:uppercase;letter-spacing:0.04em">LEMBAR KERJA PESERTA DIDIK (LKPD)</h2>
        <p class="sub" style="text-align:center;font-size:11pt;margin:0 0 12pt;color:#444444">${esc(l.judul || `LKPD ${u.nama}`)} · Tahun Pelajaran ${dots(p.ta)}</p>
        ${docIdent(state, [['Unit / Semester', `${esc(u.nama)} / Semester ${u.sem}`]])}

        <table class="dtbl" style="width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:10.5pt">
          <tbody>
            <tr>
              <td style="${tdStyle};width:130pt;font-weight:bold">Nama Kelompok</td>
              <td style="${tdStyle}"></td>
            </tr>
            <tr>
              <td style="${tdStyle};font-weight:bold">Anggota</td>
              <td style="${tdStyle};height:36pt"></td>
            </tr>
            <tr>
              <td style="${tdStyle};font-weight:bold">Kelas / Tanggal</td>
              <td style="${tdStyle}"></td>
            </tr>
          </tbody>
        </table>

        ${l.tujuan ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">Tujuan Pembelajaran</h4>${nl(l.tujuan)}` : ''}
        ${l.petunjuk ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">Petunjuk Belajar</h4>${nl(l.petunjuk)}` : ''}
        ${l.alat ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">Alat dan Bahan</h4>${nl(l.alat)}` : ''}
        ${l.kegiatan ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">Langkah Kegiatan</h4>${nl(l.kegiatan)}` : ''}

        <h4 style="font-size:10.5pt;margin:8pt 0 4pt">Tugas</h4>
        ${
          tgs.length
            ? tgs.map(t => `<p style="margin:6pt 0 2pt"><b>${esc(t)}</b></p>${ansLines(br)}`).join('')
            : `<p style="color:#666666"><i>Belum ada tugas.</i></p>`
        }

        ${
          l.kesimpulan
            ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">Kesimpulan</h4><p style="margin:0 0 4pt">${esc(
                l.kesimpulan
              )}</p>${ansLines(Math.min(br, 3))}`
            : ''
        }

        ${
          l.refleksi
            ? `<h4 style="font-size:10.5pt;margin:8pt 0 2pt">Refleksi</h4><p style="margin:0 0 4pt">${esc(
                l.refleksi
              )}</p><p style="margin:4pt 0">☐ Aku sudah paham &nbsp;&nbsp;&nbsp; ☐ Aku masih perlu latihan &nbsp;&nbsp;&nbsp; ☐ Aku belum paham</p>`
            : ''
        }

        <h4 style="font-size:10.5pt;margin:10pt 0 4pt">Penilaian Guru</h4>
        <p style="margin:0 0 8pt">
          ${lv.map(x => `${x[0]} (${x[1]}) ☐`).join(' &nbsp;&nbsp;&nbsp; ')}
        </p>

        ${docSign(state)}
      </div>`;
    })
    .join('\n');
}

export function generateAllDocsHtml(state: AppState): string {
  const pageBreak = '<br clear="all" style="page-break-before:always;mso-break-type:section-break" />';
  const sections: string[] = [
    generateWaktuHtml(state), // Both Sem 1 & Sem 2
    generateCpatpHtml(state),
    generateProtaHtml(state),
    generatePromesHtml(state), // Both Sem 1 & Sem 2
    generateKktpHtml(state),
  ];

  // Include all units for Modul Ajar
  state.unit.forEach(u => {
    sections.push(generateModulHtml(state, u.id));
  });

  // Include all units for LKPD
  state.unit.forEach(u => {
    sections.push(generateLkpdHtml(state, u.id));
  });

  return sections.join(`\n${pageBreak}\n`);
}

export function getTabDocHtml(state: AppState, tab: string): { html: string; filename: string; landscape?: boolean } {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const suffix = `${mapelSlug}_Kelas_${kelasSlug}`;

  switch (tab) {
    case 'waktu':
      return {
        html: generateWaktuHtml(state),
        filename: `1_Analisis_Alokasi_Waktu_${suffix}.doc`,
      };
    case 'cpatp':
      return {
        html: generateCpatpHtml(state),
        filename: `2_CP_dan_ATP_${suffix}.doc`,
      };
    case 'prota':
      return {
        html: generateProtaHtml(state),
        filename: `3_Program_Tahunan_${suffix}.doc`,
      };
    case 'promes':
      return {
        html: generatePromesHtml(state, state.ui.sem),
        filename: `4_Program_Semester_Smt${state.ui.sem}_${suffix}.doc`,
        landscape: true,
      };
    case 'kktp':
      return {
        html: generateKktpHtml(state),
        filename: `5_KKTP_${suffix}.doc`,
        landscape: true,
      };
    case 'modul': {
      const u = state.unit.find(x => x.id === state.ui.unit) || state.unit[0];
      const uSlug = u ? u.nama.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 30) : 'Unit';
      return {
        html: generateModulHtml(state, u?.id),
        filename: `6_Modul_Ajar_${uSlug}_${suffix}.doc`,
      };
    }
    case 'lkpd': {
      const u = state.unit.find(x => x.id === state.ui.unitL) || state.unit[0];
      const uSlug = u ? u.nama.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 30) : 'Unit';
      return {
        html: generateLkpdHtml(state, u?.id),
        filename: `7_LKPD_${uSlug}_${suffix}.doc`,
      };
    }
    default:
      return {
        html: generateAllDocsHtml(state),
        filename: `Berkas_Ajar_Lengkap_7_Dokumen_${suffix}.doc`,
      };
  }
}

export function wrapWordDocument(bodyHtml: string, title: string, landscape = false): string {
  const pageSize = landscape ? '29.7cm 21cm' : '21cm 29.7cm';
  const pageOrient = landscape ? 'landscape' : 'portrait';
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
    @page WordSection1 {
      size: ${pageSize};
      mso-page-orientation: ${pageOrient};
      margin: 2cm 2cm 2cm 2.5cm;
    }
    div.WordSection1 { page: WordSection1; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #111111;
    }
    h2 { font-size: 13pt; margin: 0 0 2pt; text-align: center; text-transform: uppercase; }
    h3 { font-size: 11pt; margin: 12pt 0 4pt; text-transform: uppercase; }
    h4 { font-size: 10.5pt; margin: 6pt 0 2pt; }
    p { margin: 0 0 4pt; }
    table { border-collapse: collapse; width: 100%; }
  </style>
</head>
<body>
  <div class="WordSection1">
    ${bodyHtml}
  </div>
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
  const filename = `Berkas_Ajar_Lengkap_7_Dokumen_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  const html = generateAllDocsHtml(state);
  triggerDocDownload(html, filename, `Perangkat Ajar Lengkap - ${state.profil.mapel}`, false);
  return filename;
}

export function downloadAllModulWord(state: AppState): string {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const pageBreak = '<br clear="all" style="page-break-before:always;mso-break-type:section-break" />';
  const html = state.unit.map(u => generateModulHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const filename = `6_Semua_Modul_Ajar_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  triggerDocDownload(html, filename, `Semua Modul Ajar - ${state.profil.mapel}`, false);
  return filename;
}

export function downloadAllLkpdWord(state: AppState): string {
  const mapelSlug = (state.profil.mapel || 'Mapel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const kelasSlug = (state.profil.kelas || 'Kelas').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  const pageBreak = '<br clear="all" style="page-break-before:always;mso-break-type:section-break" />';
  const html = state.unit.map(u => generateLkpdHtml(state, u.id)).join(`\n${pageBreak}\n`);
  const filename = `7_Semua_LKPD_${mapelSlug}_Kelas_${kelasSlug}.doc`;
  triggerDocDownload(html, filename, `Semua LKPD - ${state.profil.mapel}`, false);
  return filename;
}

export async function copyCleanDocToClipboard(state: AppState, tab: string): Promise<boolean> {
  const { html } = getTabDocHtml(state, tab);
  const wrapped = `<div style="font-family:'Times New Roman',Times,serif;font-size:12pt;color:#111;line-height:1.45">${html}</div>`;
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
