import { GoogleGenAI } from '@google/genai';
import { generateStandardCurriculum } from '../src/serverCurriculum';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (_) {
        body = {};
      }
    }
    const { mapel, fase, kelas, topik } = body || {};
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

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

        const modelName = 'gemini-3.1-flash-lite';
        const geminiCall = ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 4500)
        );

        const response: any = await Promise.race([geminiCall, timeoutPromise]);
        const text = response.text || '{}';
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleaned);
        if (data && Array.isArray(data.cp) && Array.isArray(data.units)) {
          return res.status(200).json({ ...data, isFallback: false });
        }
      } catch (_e) {
        // Fallback to standard BSKAP curriculum datasets
      }
    }

    const standardData = generateStandardCurriculum(mapel, fase, kelas, topik);
    return res.status(200).json(standardData);
  } catch (_err) {
    const standardData = generateStandardCurriculum('Akuntansi', 'F', 'XI', '');
    return res.status(200).json(standardData);
  }
}
