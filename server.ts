import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

import { generateStandardCurriculum } from './src/serverCurriculum.ts';
import { generateContextualSoal } from './src/utils/soalGenerator.ts';

// Track Gemini quota status to avoid repeated 429 attempts
let quotaCooldownUntil = 0;

// API endpoint for AI CP-ATP Generation referencing kurikulum.kemendikdasmen.go.id standards
app.post('/api/generate-cp-atp', async (req, res) => {
  try {
    const { mapel, fase, kelas, topik } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // If API key is configured and not in cooldown, attempt Gemini generation
    if (apiKey && apiKey.trim().length > 10 && Date.now() > quotaCooldownUntil) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const tier = (fase === 'A' || fase === 'B' || fase === 'C') ? 'SD/MI'
                   : fase === 'D' ? 'SMP/MTs'
                   : 'SMA/SMK/MA';

        const prompt = `Anda adalah pakar perancang kurikulum nasional pada Inspirasi Ruang GTK Kemendikdasmen di Indonesia.
Rancang draf resmi Capaian Pembelajaran (CP), Alur Tujuan Pembelajaran (ATP), dan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) yang SPESIFIK dan EKSKLUSIF untuk:

Mata Pelajaran: ${mapel || 'Mata Pelajaran Umum'}
Fase: ${fase || 'E'} (Jenjang ${tier}, Kelas ${kelas || 'X'})
${topik ? `Fokus / Topik Khusus Tambahan: ${topik}` : ''}

PEDOMAN SPESIFIKASI MATA PELAJARAN (PEMBARUAN INSPIRASI RUANG GTK KEMENDIKDASMEN):
1. Elemen CP WAJIB menggunakan elemen resmi Kurikulum Merdeka yang khusus untuk mata pelajaran ${mapel || 'tersebut'} sesuai standar Pembaruan Inspirasi Ruang GTK Kemendikdasmen:
   - Jika Akuntansi dan Keuangan Lembaga (AKL) SMK:
     * Dasar-Dasar Akuntansi dan Keuangan Lembaga (Fase E - X): 7 Elemen (Proses Bisnis AKL, Perkembangan Teknologi Fintech & Cloud Accounting, Profil Profesi Teknisi Akuntansi KKNI II & Kewirausahaan, Lingkup Kerja & Etika Profesi Akuntan, K3LH & Budaya Kerja 5R, Prinsip Dasar Akuntansi & Perbankan Dasar, Aplikasi Pengolah Angka / Spreadsheet).
     * Konsentrasi Keahlian Akuntansi dan Keuangan Lembaga (Fase F - XI/XII): 5 Elemen Inti Terpadu (Akuntansi Perusahaan Jasa Dagang Manufaktur SAK EP & SAK EMKM, Akuntansi Keuangan, Akuntansi Lembaga/Instansi Pemerintah SIPD RI & Siskeudes, Komputer Akuntansi Cloud/MYOB, Perpajakan Coretax DJP & TER PPh 21).
     * Praktikum Akuntansi Perusahaan Jasa, Dagang & Manufaktur: Dokumen Sumber, Jurnal Khusus, Buku Pembantu, Kartu Persediaan, Worksheet, Laporan Keuangan berbasis SAK Entitas Privat (SAK EP) & SAK EMKM, Biaya Produksi & HPP Pesanan/Proses.
     * Akuntansi Keuangan: Kas Kecil/Bank, Rekonsiliasi Bank, Piutang & Cadangan Kerugian, Piutang Wesel, Persediaan FIFO/Average SAK EP, Aset Tetap & Depresiasi, Utang Obligasi, Ekuitas PT/CV/Koperasi.
     * Praktikum Akuntansi Lembaga / Instansi Pemerintah: SAP Akrual PP 71/2010 & Permendagri 77/2020, Struktur APBD & APBDes, Jurnal Finansial LO & Anggaran LRA, Laporan Keuangan SKPD/PPKD di SIPD RI, Siskeudes 2.0.
     * Komputer Akuntansi: Setup Database Cloud Accounting (Accurate Online / Jurnal) & MYOB, COA, Master Data Pelanggan/Pemasok/Barang/Aset, Transaksi Pembelian/Penjualan/Manufaktur, Rekonsiliasi Bank, Laporan Digital & Backup.
     * Administrasi Perpajakan: KUP & Integrasi NIK-NPWP 16 Digit, Sistem Coretax DJP (SIAP), PPh Pasal 21 Tarif Efektif Rata-rata (TER PP 58/2023 & PMK 168/2023), PPh Unifikasi (22/23/4 ayat 2), PPh Final UMKM 0,5%, Rekonsiliasi Fiskal PPh Badan Pasal 31E, PPN & e-Faktur Coretax.
     * Projek Kreatif dan Kewirausahaan (PKK) Akuntansi: Peluang Usaha Jasa Pembukuan/Pajak UMKM (Teaching Factory), BMC, HPP & BEP, Pemasaran Digital & QRIS, Pembukuan SIAPIK BI / SAK EMKM, Evaluasi Usaha.
     * Layanan Perbankan: 6 Elemen (Ekonomi Bisnis & Regulasi BI-OJK-LPS, Kas Teller 3D/UV & Kliring, Customer Service KYC/APU-PPT & Digital Banking BI-FAST/QRIS, Analisis Kredit 5C & SLIK OJK, Akuntansi Bank, Core Banking & Pajak Bunga Bank).
     * Layanan Perbankan Syariah: 6 Elemen (Fiqih Muamalah & DPS DSN-MUI, Teller & CS Islami + ZISWAF, Simpanan Wadiah & Mudharabah Nisbah, Pembiayaan Murabahah/Salam/Istishna/Musyarakah/Ijarah, Akuntansi Syariah PSAK 401-410 eks PSAK 101-112, Komputerisasi Laporan Bank Syariah).
   - JANGAN mencampuradukkan materi atau istilah dari mata pelajaran lain.
2. Setiap kalimat Tujuan Pembelajaran (TP) diawali kode TP Inspirasi Ruang GTK (contoh: "[TP E.1.1] menganalisis...", "[TP F.PA.1.1] menyusun...") dan kata kerja operasional aktif.
3. Distribusikan ke Semester 1 dan Semester 2 secara seimbang, lengkap dengan alokasi JP per TP (8-24 JP).
4. Sediakan rubrik KKTP 4 tingkat (Perlu Bimbingan, Cukup, Baik, Sangat Baik) yang kontekstual dengan materi ${mapel || 'tersebut'}, beserta teknik penilaiannya (tes tertulis, unjuk kerja praktik, observasi, portofolio).

Berikan hasil dalam format JSON murni (tanpa markdown code block) dengan struktur:
{
  "cp": [
    { "elemen": "Nama Elemen Resmi Mapel", "teks": "Deskripsi Capaian Pembelajaran fase ${fase || 'E'}..." }
  ],
  "units": [
    {
      "nama": "Nama Lingkup Materi / Bab",
      "sem": 1 atau 2,
      "elemen": "Nama Elemen yang bersesuaian",
      "tps": [
        {
          "teks": "Kalimat tujuan pembelajaran aktif",
          "jp": 8,
          "ind": "Indikator ketercapaian...",
          "r1": "Deskripsi perlu bimbingan...",
          "r2": "Deskripsi cukup...",
          "r3": "Deskripsi baik...",
          "r4": "Deskripsi sangat baik...",
          "teknik": "Teknik penilaian spesifik"
        }
      ]
    }
  ]
}`;

        // Attempt generation using gemini-3.8-flash
        const modelName = 'gemini-3.8-flash';
        const geminiCall = ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            responseMimeType: 'application/json',
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 5500)
        );

        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        const text = response.text || '{}';
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleaned);
        if (data && Array.isArray(data.cp) && Array.isArray(data.units)) {
          return res.json({ ...data, isFallback: false });
        }
      } catch (geminiError: any) {
        const errStr = String(geminiError?.message || geminiError || '');
        if (errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED') || errStr.includes('Quota')) {
          quotaCooldownUntil = Date.now() + 10 * 60 * 1000;
        }
      }
    }

    // Always succeed seamlessly with authentic Kurikulum Merdeka standards
    const standardData = generateStandardCurriculum(mapel, fase, kelas, topik);
    return res.json(standardData);
  } catch (_error: any) {
    const standardData = generateStandardCurriculum('Akuntansi', 'F', 'XI', '');
    return res.json(standardData);
  }
});

// API endpoint for AI Exam Question & Blueprint (Kisi-Kisi) Generation tailored to Topic & TP
app.post('/api/generate-soal', async (req, res) => {
  const {
    mapel = 'Akuntansi dan Keuangan Lembaga',
    fase = 'E',
    kelas = 'X',
    unitNama = 'Materi Pokok',
    topikFokus = '',
    jenisUjian = 'Asesmen Sumatif Lingkup Materi',
    kesulitan = 'Proporsional (L1 Dasar, L2 Aplikasi, L3 HOTS)',
    waktuMenit = 90,
    jmlPg = 5,
    jmlEssay = 2,
    tps = [],
  } = req.body || {};

  const targetPg = Math.max(1, Math.min(25, Number(jmlPg) || 5));
  const targetEssay = Math.max(1, Math.min(10, Number(jmlEssay) || 2));
  const fokus = (topikFokus && String(topikFokus).trim()) || unitNama;

  const fallbackUnit = { id: 'unit-ai', sem: 1 as const, nama: unitNama, cpId: '' };
  const fallbackTps = Array.isArray(tps)
    ? tps.map((teks: string, i: number) => ({
        id: `tp-${i}`,
        unitId: 'unit-ai',
        teks: String(teks),
        jp: 4,
        ind: '',
        r1: '',
        r2: '',
        r3: '',
        r4: '',
        teknik: '',
      }))
    : [];

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (apiKey && apiKey.trim().length > 10 && Date.now() > quotaCooldownUntil) {
    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey.trim(),
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Anda adalah pakar penyusun soal asesmen Kurikulum Merdeka pada Inspirasi Ruang GTK Kemendikdasmen.
Susun paket instrumen evaluasi lengkap berupa Kisi-Kisi, Soal Pilihan Ganda (5 opsi A, B, C, D, E), Soal Uraian/Studi Kasus, serta Kunci Jawaban dan Pembahasan yang SPESIFIK untuk:

Mata Pelajaran: ${mapel}
Fase / Kelas: Fase ${fase} / Kelas ${kelas}
Unit / Lingkup Materi: ${unitNama}
Fokus Topik Pembahasan Spesifik: ${fokus}
Jenis Evaluasi: ${jenisUjian}
Sebaran Level Kognitif: ${kesulitan}
Daftar Tujuan Pembelajaran (TP):
${fallbackTps.length > 0 ? fallbackTps.map((t, idx) => `${idx + 1}. ${t.teks}`).join('\n') : `1. Menguasai konsep dan aplikasi ${fokus}`}

KETENTUAN PENYUSUNAN SOAL:
1. Buat tepat ${targetPg} butir soal Pilihan Ganda (opsi A, B, C, D, E) dan tepat ${targetEssay} butir soal Uraian/Studi Kasus.
2. Soal WAJIB kontekstual, menggunakan kasus nyata/angka transaksi/skenario dunia kerja yang akurat sesuai topik "${fokus}".
3. Setiap butir soal harus dilengkapi:
   - tpKode (misal "TP.1", "TP E.6.1", dst.)
   - indikatorSoal (kalimat indikator kisi-kisi standar: "Disajikan ..., peserta didik dapat ...")
   - levelKognitif ("L1 (C2 - Pemahaman)", "L2 (C3 - Aplikasi)", atau "L3 / HOTS (C4 - Analisis)")
   - tanya (pokok soal lengkap dan jelas)
   - opsi (objek dengan kunci "A", "B", "C", "D", "E" tanpa awalan huruf di dalam teksnya)
   - kunci ("A", "B", "C", "D", atau "E")
   - pembahasan (penjelasan langkah perhitungan/alasan jawaban tepat)

Kembalikan HANYA JSON murni dengan struktur:
{
  "pg": [
    {
      "tpKode": "TP.1",
      "indikatorSoal": "Disajikan data transaksi ..., peserta didik dapat ...",
      "levelKognitif": "L2 (C3 - Aplikasi)",
      "tanya": "Pertanyaan pilihan ganda...",
      "opsi": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "kunci": "A",
      "pembahasan": "Penjelasan perhitungan/rasional..."
    }
  ],
  "essay": [
    {
      "tpKode": "TP.1",
      "indikatorSoal": "Disajikan studi kasus ..., peserta didik dapat ...",
      "levelKognitif": "L3 / HOTS (C4 - Analisis Kasus)",
      "tanya": "Pertanyaan studi kasus uraian...",
      "kunci": "Langkah penyelesaian dan kunci jawaban lengkap...",
      "skor": 50
    }
  ]
}`;

      const geminiCall = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 7500)
      );

      const response: any = await Promise.race([geminiCall, timeoutPromise]);
      const text = response.text || '{}';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (parsed && Array.isArray(parsed.pg) && parsed.pg.length > 0 && Array.isArray(parsed.essay)) {
        const basePkg = generateContextualSoal(mapel, kelas, fallbackUnit, fallbackTps, {
          topikFokus: fokus,
          jenisUjian,
          kesulitan,
          jmlPg: targetPg,
          jmlEssay: targetEssay,
          waktuMenit: Number(waktuMenit) || 90,
        });

        basePkg.pg = parsed.pg.slice(0, targetPg).map((item: any, i: number) => ({
          id: `pg-ai-${i}-${Date.now()}`,
          tpKode: item.tpKode || `TP.${i + 1}`,
          indikatorSoal: item.indikatorSoal || `Disajikan kasus tentang ${fokus}, peserta didik dapat menentukan jawaban dengan tepat.`,
          levelKognitif: item.levelKognitif || 'L2 (C3 - Aplikasi)',
          tanya: item.tanya || '',
          opsi: {
            A: item.opsi?.A || 'Pilihan A',
            B: item.opsi?.B || 'Pilihan B',
            C: item.opsi?.C || 'Pilihan C',
            D: item.opsi?.D || 'Pilihan D',
            E: item.opsi?.E || 'Pilihan E',
          },
          kunci: (['A', 'B', 'C', 'D', 'E'].includes(item.kunci) ? item.kunci : 'A') as 'A' | 'B' | 'C' | 'D' | 'E',
          pembahasan: item.pembahasan || '',
        }));

        basePkg.essay = parsed.essay.slice(0, targetEssay).map((item: any, i: number) => ({
          id: `es-ai-${i}-${Date.now()}`,
          tpKode: item.tpKode || `TP.${i + 1}`,
          indikatorSoal: item.indikatorSoal || `Disajikan studi kasus tentang ${fokus}, peserta didik dapat menguraikan penyelesaiannya.`,
          levelKognitif: item.levelKognitif || 'L3 / HOTS (C4 - Analisis Kasus)',
          tanya: item.tanya || '',
          kunci: item.kunci || '',
          skor: Number(item.skor) || Math.round(100 / Math.max(1, targetEssay)),
        }));

        return res.json({ pkg: basePkg, source: 'ai' });
      }
    } catch (err: any) {
      const errStr = String(err?.message || err || '');
      if (errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED') || errStr.includes('Quota')) {
        quotaCooldownUntil = Date.now() + 10 * 60 * 1000;
      }
    }
  }

  const pkg = generateContextualSoal(mapel, kelas, fallbackUnit, fallbackTps, {
    topikFokus: fokus,
    jenisUjian,
    kesulitan,
    jmlPg: targetPg,
    jmlEssay: targetEssay,
    waktuMenit: Number(waktuMenit) || 90,
  });

  return res.json({ pkg, source: 'contextual' });
});


function getPort(): number {
  const portIdx = process.argv.indexOf('--port');
  if (portIdx !== -1 && process.argv[portIdx + 1]) {
    const p = Number(process.argv[portIdx + 1]);
    if (!isNaN(p) && p > 0) return p;
  }
  if (process.env.NODE_ENV === 'production' && process.env.PORT) {
    return Number(process.env.PORT) || 3000;
  }
  return 3000;
}

async function startServer() {
  const PORT = getPort();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
