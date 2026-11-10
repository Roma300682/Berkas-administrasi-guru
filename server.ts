import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

import { generateStandardCurriculum } from './src/serverCurriculum.ts';

// API endpoint for AI CP-ATP Generation referencing kurikulum.kemendikdasmen.go.id standards
app.post('/api/generate-cp-atp', async (req, res) => {
  try {
    const { mapel, fase, kelas, topik } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // If a valid Gemini API key is configured, attempt generation with timeout
    if (apiKey && apiKey.trim().length > 10) {
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

        const prompt = `Anda adalah pakar perancang kurikulum nasional (Kemendikdasmen / BSKAP / BSNP) di Indonesia.
Rancang draf resmi Capaian Pembelajaran (CP), Alur Tujuan Pembelajaran (ATP), dan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) yang SPESIFIK dan EKSKLUSIF untuk:

Mata Pelajaran: ${mapel || 'Mata Pelajaran Umum'}
Fase: ${fase || 'E'} (Jenjang ${tier}, Kelas ${kelas || 'X'})
${topik ? `Fokus / Topik Khusus Tambahan: ${topik}` : ''}

PEDOMAN SPESIFIKASI MATA PELAJARAN:
1. Elemen CP WAJIB menggunakan elemen resmi Kurikulum Merdeka yang khusus untuk mata pelajaran ${mapel || 'tersebut'} sesuai standar Keputusan Kepala BSKAP Nomor 046/H/KR/2025:
   - Jika Akuntansi dan Keuangan Lembaga (AKL) SMK:
     * Dasar-Dasar Akuntansi dan Keuangan Lembaga (Fase E - X): 7 Elemen (Proses Bisnis AKL, Perkembangan Teknologi & Isu Global, Profil Pekerjaan/Entrepreneur, Lingkup Kerja & Etika Profesi, K3LH Budaya Kerja, Prinsip Dasar Akuntansi & Perbankan, Spreadsheet).
     * Konsentrasi Keahlian Akuntansi (Fase F - XI/XII): 5 Elemen (Akuntansi Perusahaan Jasa Dagang Manufaktur, Akuntansi Keuangan, Akuntansi Lembaga/Instansi Pemerintah, Komputer Akuntansi, Perpajakan).
     * Praktikum Akuntansi Perusahaan Jasa, Dagang & Manufaktur: Jurnal Khusus, Buku Pembantu, Kartu Persediaan, Worksheet, Laporan Keuangan SAK EMKM, Biaya Produksi & HPP Pesanan/Proses.
     * Akuntansi Keuangan: Kas Kecil/Bank, Rekonsiliasi, Piutang & Cadangan, Wesel, Persediaan Perpetual FIFO/Average, Aset Tetap & Depresiasi, Utang Obligasi, Ekuitas PT & Koperasi.
     * Praktikum Akuntansi Lembaga / Instansi Pemerintah: SAP Akrual PP 71/2010, APBD & APBDes, Jurnal Finansial LO, Jurnal Anggaran LRA, LRA, LO, Neraca Pemda, Siskeudes.
     * Komputer Akuntansi: Setup Data Awal, Bagan Akun, Master Data Pelanggan/Pemasok, Saldo Awal Nol, Faktur Pembelian/Penjualan, Rekonsiliasi Bank, Laporan Digital & Backup.
     * Administrasi Perpajakan: KUP, PPh 21 TER (Tarif Efektif Rata-Rata), PPh Badan Pasal 31E, PPN 11%/12%, e-Faktur, e-Bupot Unifikasi, e-Billing, SPT Masa & Tahunan DJP Online.
     * Layanan Perbankan: 6 Elemen (Ekonomi Bisnis & Admin Umum, Kelola Kas Teller 3D, Customer Service & KYC, Akuntansi Bank & Kredit 5C, Core Banking Komputer, Pajak Bunga Bank).
     * Layanan Perbankan Syariah: 6 Elemen (Fiqih Muamalah & DPS DSN-MUI, Teller & CS Syariah, Wadiah & Mudharabah, Pembiayaan Murabahah/Musyarakah/Ijarah, PSAK 101-112, Komputerisasi Syariah & ZISWAF).
   - JANGAN mencampuradukkan materi atau istilah dari mata pelajaran lain.
2. Setiap kalimat Tujuan Pembelajaran (TP) harus spesifik ke materi ${mapel || 'tersebut'}, diawali kata kerja operasional aktif (misal: "menganalisis...", "menghitung...", "mempraktikkan...", "mengevaluasi...").
3. Distribusikan ke Semester 1 dan Semester 2 secara seimbang, lengkap dengan alokasi JP per TP (4-16 JP).
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

        const geminiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Batas waktu koneksi AI terlampaui')), 5000)
        );

        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        const text = response.text || '{}';
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleaned);
        if (data && Array.isArray(data.cp) && Array.isArray(data.units)) {
          return res.json({ ...data, isFallback: false });
        }
      } catch (geminiError: any) {
        console.warn('Gemini notice, serving standard Kurikulum Merdeka templates:', geminiError?.message || geminiError);
      }
    }

    // Always succeed with authentic Kurikulum Merdeka standards
    const standardData = generateStandardCurriculum(mapel, fase, kelas, topik);
    return res.json(standardData);
  } catch (error: any) {
    console.error('Error generating CP-ATP:', error);
    res.status(500).json({ error: error.message || 'Gagal menghasilkan CP-ATP' });
  }
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
