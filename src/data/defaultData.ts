import { AppState, MonthItem, Semester, UnitItem, TpItem, ModulItem, LkpdItem } from '../types';
import { LOGO_PENDIDIKAN_SVG } from '../utils/logoPresets';

export const DIMENSIONS = [
  'Keimanan dan Ketakwaan kepada Tuhan YME',
  'Kewargaan',
  'Penalaran Kritis',
  'Kreativitas',
  'Kolaborasi',
  'Kemandirian',
  'Kesehatan',
  'Komunikasi'
];

export const TABS = [
  { id: 'mulai', l: 'Beranda' },
  { id: 'waktu', l: 'Analisis Waktu', n: 1 },
  { id: 'cpatp', l: 'CP–ATP', n: 2 },
  { id: 'prota', l: 'Program Tahunan', n: 3 },
  { id: 'promes', l: 'Program Semester', n: 4 },
  { id: 'kktp', l: 'KKTP', n: 5 },
  { id: 'modul', l: 'Modul Ajar', n: 6 },
  { id: 'lkpd', l: 'LKPD', n: 7 },
];

export const uid = () => Math.random().toString(36).slice(2, 9);

export const mon = (sem: Semester, nama: string, n: number, off: number[] = [], ket = ''): MonthItem => ({
  id: uid(),
  sem,
  nama,
  n,
  off,
  ket
});

export const getMonths = (withSampleOff: boolean): MonthItem[] => [
  mon(1, 'Juli', 3, withSampleOff ? [0] : [], withSampleOff ? 'Masa Pengenalan Lingkungan Sekolah' : ''),
  mon(1, 'Agustus', 4),
  mon(1, 'September', 4),
  mon(1, 'Oktober', 4, withSampleOff ? [1] : [], withSampleOff ? 'Asesmen sumatif tengah semester' : ''),
  mon(1, 'November', 4),
  mon(1, 'Desember', 3, withSampleOff ? [1, 2] : [], withSampleOff ? 'Asesmen sumatif akhir semester dan libur semester' : ''),
  mon(2, 'Januari', 4, withSampleOff ? [0] : [], withSampleOff ? 'Libur semester' : ''),
  mon(2, 'Februari', 4),
  mon(2, 'Maret', 4, withSampleOff ? [1, 2] : [], withSampleOff ? 'Libur hari raya dan cuti bersama' : ''),
  mon(2, 'April', 4),
  mon(2, 'Mei', 4, withSampleOff ? [2] : [], withSampleOff ? 'Asesmen sumatif tengah semester' : ''),
  mon(2, 'Juni', 3, withSampleOff ? [1, 2] : [], withSampleOff ? 'Asesmen sumatif akhir tahun dan libur kenaikan kelas' : '')
];

export const blankState = (): AppState => ({
  v: 1,
  sample: false,
  ui: {
    tab: 'mulai',
    sem: 1,
    doc: {},
    unit: null,
    unitL: null,
  },
  profil: {
    guru: '',
    nip: '',
    sekolah: 'SMK NEGERI 1 NUSANTARA',
    mapel: '',
    fase: 'E',
    kelas: 'X',
    ta: '2026/2027',
    kepsek: '',
    nipKs: '',
    kota: '',
    tgl: '',
    jp: 4,
    menit: 45,
    b1: 60,
    b2: 75,
    b3: 90,
    pakaiKop: true,
    kopBaris1: 'PEMERINTAH PROVINSI DAERAH KHUSUS',
    kopBaris2: 'DINAS PENDIDIKAN',
    kopBidang: 'BIDANG KEAHLIAN BISNIS DAN MANAJEMEN — PROGRAM KEAHLIAN AKUNTANSI DAN KEUANGAN LEMBAGA',
    kopAlamat: 'Jl. Pendidikan Raya No. 10, Telp. (021) 5551234, Kode Pos 10110',
    kopKontak: 'Laman: www.smkn1nusantara.sch.id | Pos-el: info@smkn1nusantara.sch.id | NPSN: 20100123',
    logoKiri: LOGO_PENDIDIKAN_SVG,
    logoKanan: '',
    ukuranLogo: 72,
  },
  bulan: getMonths(false),
  cp: [],
  unit: [],
  tp: [],
  promes: {},
  modul: {},
  lkpd: {},
});

export const intiText = (s: string): string => {
  return String(s || '')
    .trim()
    .replace(/^peserta didik\s+(mampu|dapat)\s+/i, '')
    .replace(/^\[TP\s+[^\]]+\]\s*/i, '')
    .replace(/^peserta didik\s+(mampu|dapat)\s+/i, '')
    .replace(/[.\s]+$/, '');
};

export const genKktp = (t: TpItem) => {
  const x = intiText(t.teks);
  return {
    ind: `Peserta didik dapat ${x}.`,
    r1: `Belum dapat ${x}; masih memerlukan bimbingan intensif dari guru.`,
    r2: `Dapat ${x} sebagian, dengan bantuan guru atau teman.`,
    r3: `Dapat ${x} secara mandiri dan tepat.`,
    r4: `Dapat ${x} secara mandiri dan tepat, serta mampu menjelaskan atau menerapkannya pada situasi baru.`,
    teknik: 'Observasi, tes tertulis, dan unjuk kerja praktik'
  };
};

export const genModul = (u: UnitItem): ModulItem => {
  const nm = u.nama || 'materi ini';
  const lcNm = nm ? nm.charAt(0).toLowerCase() + nm.slice(1) : nm;
  return {
    awal: `Peserta didik telah mempelajari konsep dasar yang menjadi prasyarat ${lcNm} pada pembelajaran sebelumnya.`,
    dimensi: ['Penalaran Kritis', 'Kolaborasi', 'Kemandirian'],
    sarana: 'Buku teks Kurikulum Merdeka, LKPD, dokumen bukti transaksi/kasus nyata, papan tulis, alat tulis; komputer/spreadsheet dan proyektor bila tersedia.',
    target: 'Peserta didik reguler. Sediakan pendampingan tambahan (scaffolding) bagi yang masih kesulitan dan tantangan studi kasus lanjutan bagi yang cepat memahami.',
    model: 'Pembelajaran Mendalam (Deep Learning: Berkesadaran/Mindful, Bermakna/Meaningful, Menggembirakan/Joyful) berbasis Masalah/Projek (PBL/PjBL) sesuai Inspirasi Ruang GTK Kemendikdasmen.',
    pemahaman: `${nm} diterapkan secara nyata di dunia kerja dan industri. Dengan memahaminya secara bermakna, peserta didik mampu mengambil keputusan finansial/profesional dan menyelesaikan masalah secara akurat dan bertanggung jawab.`,
    pemantik: `1. Di mana kamu pernah menjumpai penerapan ${lcNm} dalam dunia usaha atau kehidupan sehari-hari?\n2. Mengapa ketelitian dan integritas sangat penting ketika kita memproses ${lcNm}?`,
    pendahuluan: '1. Guru memberi salam, mengecek kehadiran, mengajak berdoa, dan membangun kesiapan belajar yang berkesadaran (Mindful Learning).\n2. Guru menyampaikan tujuan pembelajaran serta mengaitkan manfaat materi dengan dunia kerja nyata (Meaningful Learning).\n3. Guru mengajukan pertanyaan pemantik dengan suasana interaktif yang menggembirakan (Joyful Learning).\n4. Guru melakukan asesmen diagnostik singkat untuk memetakan kesiapan belajar peserta didik.',
    memahami: '1. Peserta didik mengamati dokumen/studi kasus nyata yang disajikan guru secara berkesadaran (Mindful).\n2. Peserta didik mendiskusikan konsep kunci dan prosedur kerja dalam kelompok kecil secara bermakna (Meaningful).\n3. Guru memfasilitasi elaborasi dan penarikan kesimpulan konsep bersama peserta didik.',
    mengaplikasi: '1. Peserta didik mengerjakan LKPD dan simulasi praktik secara kolaboratif.\n2. Peserta didik menerapkan konsep pada penyelesaian masalah/dokumen transaksi kontekstual dunia kerja.\n3. Perwakilan kelompok mempresentasikan hasil kerja dengan suasana aktif dan menggembirakan (Joyful) serta menerima umpan balik.',
    merefleksi: '1. Peserta didik melakukan refleksi berkesadaran mengenai bagian yang sudah dikuasai dan yang masih perlu ditingkatkan.\n2. Peserta didik saling memberikan apresiasi dan umpan balik konstruktif atas hasil kerja rekan sejawat.\n3. Guru memberikan penguatan konsep dan konfirmasi akhir.',
    penutup: '1. Guru dan peserta didik menyimpulkan intisari pembelajaran hari ini.\n2. Guru menyampaikan informasi tindak lanjut dan agenda pertemuan berikutnya.\n3. Berdoa bersama dan salam penutup.',
    diagnostik: 'Pertanyaan pemantik lisan atau kuis singkat di awal pembelajaran untuk memetakan penguasaan prasyarat.',
    formatif: 'Observasi keaktifan diskusi, penilaian unjuk kerja LKPD, dan umpan balik langsung mengacu pada rubrik KKTP.',
    sumatif: 'Uji kompetensi praktik dan/atau tes tertulis di akhir lingkup materi mengacu pada kriteria KKTP.',
    remedial: 'Pendampingan terbimbing (coaching), penyederhanaan studi kasus, dan tutor sebaya bagi peserta didik pada kriteria Perlu Bimbingan/Cukup.',
    pengayaan: 'Studi kasus tingkat lanjut (analisis laporan/audit kasus industri) bagi peserta didik yang telah mencapai kriteria Sangat Baik.',
    refGuru: '1. Apakah pengalaman belajar Memahami, Mengaplikasi, dan Merefleksi berjalan optimal?\n2. Bagian mana dari strategi pembelajaran yang perlu ditingkatkan?\n3. Peserta didik mana yang memerlukan pendampingan khusus pada pertemuan berikutnya?',
    refSiswa: '1. Hal baru paling bermakna apa yang kamu kuasai pada pembelajaran hari ini?\n2. Bagian mana yang menurutmu masih menantang dan perlu latihan lagi?\n3. Bagaimana kamu akan menerapkan keterampilan ini di dunia kerja/kehidupan nyata?',
    pustaka: 'Panduan Inspirasi CP & ATP Ruang GTK Kemendikdasmen (Keputusan Kepala BSKAP Nomor 046/H/KR/2025), Buku Teks Utama Kemendikdasmen, serta Standar Akuntansi Keuangan (SAK EP / SAK EMKM) & Regulasi Perpajakan terbaru.'
  };
};

export const genLkpd = (u: UnitItem, tps: TpItem[]): LkpdItem => {
  const nm = u.nama || 'materi ini';
  const lcNm = nm ? nm.charAt(0).toLowerCase() + nm.slice(1) : nm;
  return {
    judul: `LKPD ${nm}`,
    petunjuk: '1. Tulis nama kelompok dan anggota pada tempat yang disediakan.\n2. Baca setiap petunjuk dan analisis dokumen/kasus dengan teliti.\n3. Diskusikan bersama anggota kelompok sebelum menuliskan penyelesaian.\n4. Tanyakan kepada guru jika ada instruksi yang belum jelas.\n5. Periksa kembali ketelitian perhitungan dan kerapian sebelum dikumpulkan.',
    tujuan: tps.map((t, i) => `${i + 1}. ${t.teks}`).join('\n'),
    alat: 'Alat tulis, kalkulator/spreadsheet, buku catatan, dan lembar dokumen sumber/studi kasus dari guru.',
    kegiatan: '1. Amati dokumen atau studi kasus nyata yang diberikan guru (Memahami).\n2. Diskusikan bersama kelompokmu: identifikasi data penting dan langkah penyelesaiannya.\n3. Kerjakan tugas praktik di bawah ini secara teliti dan sistematis (Mengaplikasi).',
    tugas: tps.map((t, i) => `Tugas ${i + 1}. Analisis dan tuliskan langkah penyelesaian secara lengkap untuk: ${intiText(t.teks)}.`).join('\n'),
    baris: 3,
    kesimpulan: `Tuliskan kesimpulan kelompokmu tentang konsep dan penerapan ${lcNm} (Merefleksi).`,
    refleksi: 'Beri tanda centang sesuai tingkat penguasaanmu setelah menyelesaikan LKPD ini.'
  };
};

export const seedSampleData = (): AppState => {
  const s = blankState();
  s.sample = true;
  s.profil.mapel = 'Dasar-Dasar Akuntansi dan Keuangan Lembaga';
  s.profil.fase = 'E';
  s.profil.kelas = 'X';
  s.bulan = getMonths(true);

  const cpList = [
    [
      'Proses Bisnis di Bidang Akuntansi dan Keuangan Lembaga',
      'Pada akhir Fase E, peserta didik mampu memahami tahapan proses akuntansi secara menyeluruh baik akuntansi pada perusahaan jasa, perusahaan dagang, dan perusahaan manufaktur antara lain menerapkan prinsip praktik profesional dalam bekerja, menerapkan praktik-praktik kesehatan dan keselamatan di tempat kerja, memproses entry jurnal, memproses buku besar, menyusun laporan keuangan, serta mengoperasikan paket program pengolah angka/spreadsheet.'
    ],
    [
      'Perkembangan Teknologi di Industri dan Dunia Kerja serta Isu-Isu Global di Bidang Akuntansi dan Keuangan Lembaga',
      'Pada akhir Fase E, peserta didik mampu memahami perkembangan standar akuntansi mulai dari pembukuan secara manual sampai kepada penggunaan teknologi sebagai alat bantu, serta mengikuti perkembangan aplikasi komputer akuntansi yang banyak digunakan di dunia industri dan dunia kerja (cloud accounting, fintech, e-commerce, dan keamanan data finansial).'
    ],
    [
      'Profil Pekerjaan/Profesi (Job Profile) dan Peluang Usaha di Bidang Akuntansi dan Keuangan Lembaga',
      'Pada akhir Fase E, peserta didik mampu memahami profesi akuntansi lulusan SMK untuk mendapatkan gambaran pekerjaan pada Tingkat Kualifikasi II KKNI Teknisi Akuntansi Yunior serta meningkat menjadi Tingkat Kualifikasi IV KKNI Teknisi Akuntansi Madya sehingga terinspirasi untuk membangun visi dan passion, serta melakukan pembelajaran berbasis projek nyata sebagai simulasi projek kewirausahaan.'
    ],
    [
      'Lingkup Kerja pada Bidang Akuntansi dan Keuangan Lembaga serta Etika Profesi',
      'Pada akhir Fase E, peserta didik mampu memahami siklus akuntansi pada perusahaan jasa, dagang, dan manufaktur secara mendasar, serta menerapkan pedoman, prosedur, dan aturan berkaitan dengan industri jasa keuangan dan profesi-profesi yang ada dalam industri jasa keuangan beserta kode etik profesi akuntan Indonesia.'
    ],
    [
      'Keselamatan dan Kesehatan Kerja Lingkungan Hidup (K3LH) dan Budaya Kerja Industri',
      'Pada akhir Fase E, peserta didik mampu menerapkan merawat peralatan kerja, menerapkan perilaku kerja aman di area kerja, mengidentifikasi bahaya dan keadaan darurat, serta menerapkan budaya kerja industri (Ringkas, Rapi, Resik, Rawat, Rajin / 5R) dan ergonomi kerja perkantoran akuntansi.'
    ],
    [
      'Prinsip-Prinsip dan Konsep Akuntansi Dasar dan Perbankan Dasar',
      'Pada akhir Fase E, peserta didik mampu memahami pengertian akuntansi, tujuan pencatatan akuntansi, pihak-pihak yang membutuhkan informasi akuntansi, prinsip-prinsip akuntansi, serta konsep akuntansi dasar dan perbankan dasar (sejarah uang, fungsi bank, simpanan tabungan, giro, dan deposito).'
    ],
    [
      'Penggunaan Aplikasi Pengolah Angka (Spreadsheet)',
      'Pada akhir Fase E, peserta didik mampu mengoperasikan paket program pengolah angka (spreadsheet), mengolah data berdasarkan karakter, mengolah data berdasarkan rumus umum, rumus statistik, rumus finansial, fungsi logika, fungsi pembacaan tabel (VLOOKUP/HLOOKUP/XLOOKUP), serta menyusun siklus laporan keuangan otomatis pada spreadsheet.'
    ]
  ];

  const E: Record<string, string> = {};
  cpList.forEach(c => {
    const o = { id: uid(), elemen: c[0], teks: c[1] };
    s.cp.push(o);
    E[c[0]] = o.id;
  });

  const addUnitWithTp = (sem: Semester, nama: string, el: string, tps: [string, number][]) => {
    const u: UnitItem = { id: uid(), sem, nama, cpId: E[el] };
    s.unit.push(u);
    tps.forEach(t => {
      const tpObj: TpItem = {
        id: uid(),
        unitId: u.id,
        teks: `Peserta didik mampu ${t[0]}`,
        jp: t[1],
        ind: '',
        r1: '',
        r2: '',
        r3: '',
        r4: '',
        teknik: ''
      };
      const k = genKktp(tpObj);
      tpObj.ind = k.ind;
      tpObj.r1 = k.r1;
      tpObj.r2 = k.r2;
      tpObj.r3 = k.r3;
      tpObj.r4 = k.r4;
      tpObj.teknik = k.teknik;
      s.tp.push(tpObj);
    });
    return u;
  };

  const u1 = addUnitWithTp(1, 'Proses Bisnis dan Budaya Kerja Industri (K3LH & 5R) Akuntansi', 'Proses Bisnis di Bidang Akuntansi dan Keuangan Lembaga', [
    ['[TP E.1.1] menganalisis karakteristik proses bisnis perusahaan jasa, dagang, dan manufaktur serta alur siklus akuntansi secara menyeluruh', 12],
    ['[TP E.5.1] menerapkan prosedur K3LH perkantoran, ergonomi kerja komputer, dan budaya kerja industri 5R (Ringkas, Rapi, Resik, Rawat, Rajin)', 8]
  ]);
  addUnitWithTp(1, 'Perkembangan Teknologi Finansial (Fintech), Profesi Teknisi Akuntansi KKNI, dan Etika Profesi', 'Perkembangan Teknologi di Industri dan Dunia Kerja serta Isu-Isu Global di Bidang Akuntansi dan Keuangan Lembaga', [
    ['[TP E.2.1] menganalisis perkembangan teknologi akuntansi dari manual menuju Cloud Accounting, Fintech, QRIS, dan keamanan data siber finansial', 10],
    ['[TP E.3.1] memetakan profil profesi Teknisi Akuntansi Yunior (KKNI Level II), peluang wirausaha jasa pembukuan, dan menerapkan kode etik profesi akuntan', 10]
  ]);
  addUnitWithTp(1, 'Prinsip Dasar Akuntansi, Persamaan Dasar Akuntansi, dan Siklus Akuntansi Perusahaan Jasa', 'Prinsip-Prinsip dan Konsep Akuntansi Dasar dan Perbankan Dasar', [
    ['[TP E.6.1] menerapkan konsep persamaan dasar akuntansi (Aset = Liabilitas + Ekuitas) dan mekanisme debit-kredit dari bukti transaksi', 16],
    ['[TP E.4.1] memproses siklus akuntansi perusahaan jasa mulai dari jurnal umum, posting buku besar, neraca saldo, jurnal penyesuaian, neraca lajur, hingga laporan keuangan', 20]
  ]);
  addUnitWithTp(2, 'Perbankan Dasar: Sejarah Uang, Fungsi Bank, dan Produk Simpanan & Pinjaman', 'Prinsip-Prinsip dan Konsep Akuntansi Dasar dan Perbankan Dasar', [
    ['[TP E.6.2] menganalisis sejarah uang, jenis lembaga keuangan bank & non-bank, serta prosedur layanan simpanan (tabungan, giro, deposito) dan kredit dasar', 16]
  ]);
  addUnitWithTp(2, 'Aplikasi Pengolah Angka (Spreadsheet) untuk Otomasi Siklus Akuntansi', 'Penggunaan Aplikasi Pengolah Angka (Spreadsheet)', [
    ['[TP E.7.1] mengoperasikan rumus matematika, statistik (SUM, AVERAGE, COUNTIF, SUMIF), fungsi logika (IF bertingkat, AND, OR), dan pembacaan tabel (VLOOKUP, HLOOKUP, XLOOKUP)', 20],
    ['[TP E.7.2] merancang aplikasi siklus akuntansi perusahaan jasa terotomatisasi (Daftar Akun, Jurnal Umum, Buku Besar, Neraca Lajur, dan Laporan Keuangan) di Spreadsheet', 20]
  ]);

  const autoSebarSem = (sem: Semester, state: AppState) => {
    const bs = state.bulan.filter(b => b.sem === sem);
    const sl: string[] = [];
    bs.forEach(b => {
      for (let w = 0; w < b.n; w++) {
        if (!b.off.includes(w)) sl.push(`${b.id}:${w}`);
      }
    });
    const jpWeek = Number(state.profil.jp) || 1;
    const tps = state.unit.filter(u => u.sem === sem).flatMap(u => state.tp.filter(t => t.unitId === u.id));
    let cur = 0;
    tps.forEach(t => {
      const j = Number(t.jp) || 0;
      const set: string[] = [];
      if (j > 0) {
        const a = Math.floor(cur / jpWeek);
        const b = Math.ceil((cur + j) / jpWeek) - 1;
        for (let i = a; i <= b; i++) {
          if (sl[i]) set.push(sl[i]);
        }
      }
      state.promes[t.id] = set;
      cur += j;
    });
  };

  autoSebarSem(1, s);
  autoSebarSem(2, s);

  s.unit.forEach(u => {
    s.modul[u.id] = genModul(u);
    s.lkpd[u.id] = genLkpd(u, s.tp.filter(t => t.unitId === u.id));
  });

  s.ui.unit = u1.id;
  s.ui.unitL = u1.id;

  return s;
};
