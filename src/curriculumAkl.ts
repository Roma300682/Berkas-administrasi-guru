import { CurriculumResponse } from './serverCurriculum';

export interface AklSubjectMeta {
  id: string;
  nama: string;
  shortName: string;
  fase: 'E' | 'F';
  kelas: string;
  kategori: 'Dasar Program Keahlian (Kelas X)' | 'Konsentrasi Keahlian AKL (Kelas XI & XII)' | 'Mata Pelajaran Pilihan AKL (Kelas XI & XII)';
  tingkat: 'Kelas X' | 'Kelas XI' | 'Kelas XII' | 'Kelas XI / XII';
  deskripsi: string;
  elemenCount: number;
  icon: string;
  kodeAtp: string;
  ruangGtkUpdate: string;
}

export const AKL_SUBJECTS_CATALOG: AklSubjectMeta[] = [
  {
    id: 'dasar-akl',
    nama: 'Dasar-Dasar Akuntansi dan Keuangan Lembaga',
    shortName: 'Dasar-Dasar AKL (Kelas X)',
    fase: 'E',
    kelas: 'X',
    kategori: 'Dasar Program Keahlian (Kelas X)',
    tingkat: 'Kelas X',
    deskripsi: 'Proses bisnis AKL, teknologi fintech & cloud accounting, profil profesi & etika akuntan, K3LH 5R, siklus dasar akuntansi jasa, perbankan dasar, dan paket pengolah angka (spreadsheet).',
    elemenCount: 7,
    icon: '📘',
    kodeAtp: 'ATP-E.AKL',
    ruangGtkUpdate: 'Inspirasi Ruang GTK: 7 Elemen Terintegrasi Siklus Jasa, Fintech & Spreadsheet'
  },
  {
    id: 'konsentrasi-akl',
    nama: 'Konsentrasi Keahlian Akuntansi dan Keuangan Lembaga',
    shortName: 'Konsentrasi Keahlian AKL (Inti)',
    fase: 'F',
    kelas: 'XI / XII',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'Paket lengkap 5 elemen terpadu Fase F: Akuntansi Perusahaan Jasa/Dagang/Manufaktur, Akuntansi Keuangan, Akuntansi Lembaga/Instansi Pemerintah, Komputer Akuntansi, dan Perpajakan.',
    elemenCount: 5,
    icon: '🏛️',
    kodeAtp: 'ATP-F.AKL',
    ruangGtkUpdate: 'Inspirasi Ruang GTK: 5 Elemen Inti Konsentrasi Keahlian AKL'
  },
  {
    id: 'praktikum-jdm',
    nama: 'Praktikum Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
    shortName: 'Praktikum Akuntansi Jasa, Dagang & Manufaktur',
    fase: 'F',
    kelas: 'XI',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'Dokumen sumber, jurnal khusus, buku besar pembantu, harga pokok produksi (job order & process costing), neraca lajur, dan laporan keuangan berbasis SAK Entitas Privat (SAK EP) & SAK EMKM.',
    elemenCount: 6,
    icon: '🏭',
    kodeAtp: 'ATP-F.PA',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Standar SAK Entitas Privat (SAK EP) & SAK EMKM'
  },
  {
    id: 'akuntansi-keuangan',
    nama: 'Akuntansi Keuangan',
    shortName: 'Akuntansi Keuangan',
    fase: 'F',
    kelas: 'XI',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'Pengelolaan kas kecil & kas bank, rekonsiliasi bank, piutang & cadangan kerugian, piutang wesel, persediaan FIFO/Average, aset tetap & penyusutan, utang jangka panjang/obligasi, dan ekuitas berbasis SAK EP.',
    elemenCount: 6,
    icon: '💼',
    kodeAtp: 'ATP-F.AK',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Pengukuran Aset, Liabilitas & Ekuitas SAK EP'
  },
  {
    id: 'akuntansi-lembaga',
    nama: 'Praktikum Akuntansi Lembaga / Instansi Pemerintah',
    shortName: 'Akuntansi Lembaga / Instansi Pemerintah',
    fase: 'F',
    kelas: 'XI',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'Standar Akuntansi Pemerintahan (SAP PP 71/2010 & Permendagri 77/2020), APBD/APBDes, akuntansi SKPD & PPKD, jurnal LRA & LO, neraca pemda, SIPD RI, dan aplikasi Siskeudes 2.0.',
    elemenCount: 6,
    icon: '🏢',
    kodeAtp: 'ATP-F.AL',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Integrasi SIPD RI Kemendagri & Siskeudes 2.0'
  },
  {
    id: 'komputer-akuntansi',
    nama: 'Komputer Akuntansi',
    shortName: 'Komputer Akuntansi (Cloud Accurate / MYOB)',
    fase: 'F',
    kelas: 'XI',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'Instalasi dan setup database awal, bagan akun (COA), kartu piutang/utang/persediaan, entri transaksi jasa, dagang & manufaktur, rekonsiliasi bank, dan pelaporan di Cloud Accounting (Accurate Online / Jurnal) & MYOB.',
    elemenCount: 6,
    icon: '💻',
    kodeAtp: 'ATP-F.KA',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Cloud Accounting (Accurate Online) & Otomasi'
  },
  {
    id: 'administrasi-pajak',
    nama: 'Administrasi Perpajakan',
    shortName: 'Administrasi Perpajakan (Coretax & TER)',
    fase: 'F',
    kelas: 'XI',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'KUP & NIK-NPWP 16 Digit, perhitungan PPh Pasal 21 metode Tarif Efektif Rata-rata (TER PP 58/2023), PPh Pasal 22/23/24/25, PPh Final UMKM 0,5%, rekonsiliasi fiskal PPh Badan, PPN, dan Coretax DJP.',
    elemenCount: 6,
    icon: '🧾',
    kodeAtp: 'ATP-F.PJ',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Coretax DJP (SIAP), PPh 21 TER & NIK-NPWP 16 Digit'
  },
  {
    id: 'pkk-akuntansi',
    nama: 'Projek Kreatif dan Kewirausahaan (PKK) Akuntansi',
    shortName: 'Projek Kreatif & Kewirausahaan (PKK) AKL',
    fase: 'F',
    kelas: 'XI / XII',
    kategori: 'Konsentrasi Keahlian AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI / XII',
    deskripsi: 'Peluang usaha jasa pembukuan digital & asistensi pajak UMKM (Teaching Factory / Tax Center SMK), penyusunan proposal bisnis & HPP, pemasaran digital, dan pelaporan keuangan usaha mandiri.',
    elemenCount: 5,
    icon: '🚀',
    kodeAtp: 'ATP-F.PKK',
    ruangGtkUpdate: 'Inspirasi Ruang GTK: Teaching Factory (TeFa) Jasa Akuntansi & Konsultan UMKM'
  },
  {
    id: 'layanan-perbankan',
    nama: 'Layanan Perbankan',
    shortName: 'Layanan Perbankan (Mapel Pilihan XI)',
    fase: 'F',
    kelas: 'XI',
    kategori: 'Mata Pelajaran Pilihan AKL (Kelas XI & XII)',
    tingkat: 'Kelas XI',
    deskripsi: 'Ekonomi bisnis & manajemen bank, pengelolaan kas kecil & teller 3D, Customer Service & KYC/APU-PPT, produk simpanan, BI-FAST/QRIS/RTGS, analisis kredit 5C & SLIK OJK, akuntansi bank, dan perpajakan bank.',
    elemenCount: 6,
    icon: '🏦',
    kodeAtp: 'ATP-F.LP',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Digital Banking, BI-FAST, QRIS & Analisis SLIK OJK'
  },
  {
    id: 'perbankan-syariah',
    nama: 'Layanan Perbankan Syariah',
    shortName: 'Layanan Perbankan Syariah (Mapel Pilihan XII)',
    fase: 'F',
    kelas: 'XII',
    kategori: 'Mata Pelajaran Pilihan AKL (Kelas XI & XII)',
    tingkat: 'Kelas XII',
    deskripsi: 'Fiqih muamalah & fatwa DSN-MUI, operasional teller & CS Islami, penghimpunan dana Wadiah & Mudharabah (nisbah), pembiayaan Murabahah/Salam/Istishna/Musyarakah/Ijarah, PSAK Syariah 401–410, dan ZISWAF.',
    elemenCount: 6,
    icon: '🕌',
    kodeAtp: 'ATP-F.LPS',
    ruangGtkUpdate: 'Pembaruan Ruang GTK: Penomoran Baru PSAK Syariah (401–410) & Bank Syariah Digital'
  }
];

export function getAklCurriculum(
  mapelInput: string,
  faseInput: string,
  kelasInput: string,
  topikInput: string
): CurriculumResponse | null {
  const mapel = (mapelInput || '').trim();
  const lower = mapel.toLowerCase();
  const fase = (faseInput || 'F').trim().toUpperCase();
  const kelas = (kelasInput || 'XI').trim().toUpperCase();
  const topik = (topikInput || '').trim();

  // 1. Layanan Perbankan Syariah
  if (
    lower.includes('syariah') ||
    (lower.includes('perbankan') && (lower.includes('syariah') || kelas.includes('XII') || kelas.includes('12')))
  ) {
    return generatePerbankanSyariah(fase, topik);
  }

  // 2. Layanan Perbankan (Konvensional)
  if (
    lower.includes('layanan perbankan') ||
    lower.includes('perbankan') ||
    (lower.includes('bank') && !lower.includes('darah') && !lower.includes('rekonsiliasi'))
  ) {
    return generateLayananPerbankan(fase, topik);
  }

  // 3. Administrasi Perpajakan
  if (lower.includes('pajak') || lower.includes('perpajakan') || lower.includes('coretax')) {
    return generateAdministrasiPerpajakan(fase, topik);
  }

  // 4. Komputer Akuntansi (MYOB / Accurate / Spreadsheet)
  if (
    lower.includes('komputer akuntansi') ||
    lower.includes('myob') ||
    lower.includes('accurate') ||
    lower.includes('aplikasi pengolah angka') ||
    lower.includes('spreadsheet')
  ) {
    return generateKomputerAkuntansi(fase, topik);
  }

  // 5. Praktikum Akuntansi Lembaga / Instansi Pemerintah
  if (
    lower.includes('lembaga') && (lower.includes('pemerintah') || lower.includes('instansi') || lower.includes('desa') || lower.includes('praktikum')) ||
    lower.includes('instansi pemerintah') ||
    lower.includes('akuntansi pemerintah') ||
    lower.includes('akuntansi desa') ||
    lower.includes('siskeudes') ||
    lower.includes('sipd')
  ) {
    return generateAkuntansiLembagaPemerintah(fase, topik);
  }

  // 6. Praktikum Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur
  if (
    lower.includes('praktikum akuntansi perusahaan') ||
    lower.includes('jasa, dagang') ||
    lower.includes('jasa dagang') ||
    lower.includes('manufaktur')
  ) {
    return generatePraktikumJasaDagangManufaktur(fase, topik);
  }

  // 7. Akuntansi Keuangan
  if (lower.includes('akuntansi keuangan') && !lower.includes('lembaga')) {
    return generateAkuntansiKeuangan(fase, topik);
  }

  // 8. Projek Kreatif dan Kewirausahaan (PKK) Akuntansi
  if (
    lower.includes('pkk') ||
    lower.includes('kewirausahaan') ||
    lower.includes('projek kreatif') ||
    lower.includes('produk kreatif')
  ) {
    return generatePkkAkuntansi(fase, topik);
  }

  // 9. Dasar-Dasar Akuntansi dan Keuangan Lembaga (Fase E / Kelas X)
  if (
    lower.includes('dasar-dasar') ||
    lower.includes('dasar akuntansi') ||
    ((lower.includes('akuntansi') || lower.includes('akl')) && (fase === 'E' || kelas === 'X' || kelas === '10'))
  ) {
    return generateDasarAkl(topik);
  }

  // 10. Konsentrasi Keahlian Akuntansi dan Keuangan Lembaga (Fase F / Kelas XI & XII)
  if (lower.includes('akuntansi') || lower.includes('akl') || lower.includes('keuangan lembaga')) {
    return generateKonsentrasiAkl(fase, topik);
  }

  return null;
}

// ============================================================================
// 1. DASAR-DASAR AKUNTANSI DAN KEUANGAN LEMBAGA (FASE E - KELAS X)
// Inspirasi Ruang GTK Kemendikdasmen & Keputusan Kepala BSKAP No. 046/H/KR/2025
// ============================================================================
function generateDasarAkl(topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Proses Bisnis di Bidang Akuntansi dan Keuangan Lembaga',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami tahapan proses akuntansi secara menyeluruh baik akuntansi pada perusahaan jasa, perusahaan dagang, dan perusahaan manufaktur antara lain menerapkan prinsip praktik profesional dalam bekerja, menerapkan praktik-praktik kesehatan dan keselamatan di tempat kerja, memproses entry jurnal, memproses buku besar, menyusun laporan keuangan, serta mengoperasikan paket program pengolah angka/spreadsheet.'
      },
      {
        elemen: 'Perkembangan Teknologi di Industri dan Dunia Kerja serta Isu-Isu Global di Bidang Akuntansi dan Keuangan Lembaga',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami perkembangan standar akuntansi mulai dari pembukuan secara manual sampai kepada penggunaan teknologi sebagai alat bantu, serta mengikuti perkembangan aplikasi komputer akuntansi yang banyak digunakan di dunia industri dan dunia kerja (cloud accounting, fintech, e-commerce, dan keamanan data finansial).'
      },
      {
        elemen: 'Profil Pekerjaan/Profesi (Job Profile) dan Peluang Usaha di Bidang Akuntansi dan Keuangan Lembaga',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami profesi akuntansi lulusan SMK untuk mendapatkan gambaran pekerjaan pada Tingkat Kualifikasi II KKNI Teknisi Akuntansi Yunior serta meningkat menjadi Tingkat Kualifikasi IV KKNI Teknisi Akuntansi Madya sehingga terinspirasi untuk membangun visi dan passion, serta melakukan pembelajaran berbasis projek nyata sebagai simulasi projek kewirausahaan.'
      },
      {
        elemen: 'Lingkup Kerja pada Bidang Akuntansi dan Keuangan Lembaga serta Etika Profesi',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami siklus akuntansi pada perusahaan jasa, dagang, dan manufaktur secara mendasar, serta menerapkan pedoman, prosedur, dan aturan berkaitan dengan industri jasa keuangan dan profesi-profesi yang ada dalam industri jasa keuangan beserta kode etik profesi akuntan Indonesia.'
      },
      {
        elemen: 'Keselamatan dan Kesehatan Kerja Lingkungan Hidup (K3LH) dan Budaya Kerja Industri',
        teks: 'Pada akhir Fase E, peserta didik mampu menerapkan merawat peralatan kerja, menerapkan perilaku kerja aman di area kerja, mengidentifikasi bahaya dan keadaan darurat, serta menerapkan budaya kerja industri (Ringkas, Rapi, Resik, Rawat, Rajin / 5R) dan ergonomi kerja perkantoran akuntansi.'
      },
      {
        elemen: 'Prinsip-Prinsip dan Konsep Akuntansi Dasar dan Perbankan Dasar',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami pengertian akuntansi, tujuan pencatatan akuntansi, pihak-pihak yang membutuhkan informasi akuntansi, prinsip-prinsip akuntansi, serta konsep akuntansi dasar dan perbankan dasar (sejarah uang, fungsi bank, simpanan tabungan, giro, dan deposito).'
      },
      {
        elemen: 'Penggunaan Aplikasi Pengolah Angka (Spreadsheet)',
        teks: 'Pada akhir Fase E, peserta didik mampu mengoperasikan paket program pengolah angka (spreadsheet), mengolah data berdasarkan karakter, mengolah data berdasarkan rumus umum, rumus statistik, rumus finansial, fungsi logika, fungsi pembacaan tabel (VLOOKUP/HLOOKUP/XLOOKUP), serta menyusun siklus laporan keuangan otomatis pada spreadsheet.'
      }
    ],
    units: [
      {
        nama: topik ? `Proses Bisnis, K3LH 5R & ${topik}` : 'Proses Bisnis dan Budaya Kerja Industri (K3LH & 5R) Akuntansi',
        sem: 1,
        elemen: 'Proses Bisnis di Bidang Akuntansi dan Keuangan Lembaga',
        tps: [
          {
            teks: '[TP E.1.1] menganalisis karakteristik proses bisnis perusahaan jasa, dagang, dan manufaktur serta alur siklus akuntansi secara menyeluruh',
            jp: 12,
            ind: 'Peserta didik dapat membedakan karakteristik operasional dan alur transaksi pada perusahaan jasa, dagang, dan manufaktur sesuai Inspirasi ATP Ruang GTK.',
            r1: 'Belum mampu membedakan proses bisnis perusahaan jasa, dagang, dan manufaktur.',
            r2: 'Dapat menyebutkan ciri perusahaan jasa dan dagang dengan bantuan bagan alur.',
            r3: 'Mampu menganalisis proses bisnis dan karakteristik ketiga jenis perusahaan secara mandiri dan tepat.',
            r4: 'Mampu memetakan alur dokumen bisnis riil UMKM di lingkungan sekitar ke dalam klasifikasi usaha jasa, dagang, dan manufaktur.',
            teknik: 'Observasi, tes tertulis, dan studi kasus UMKM'
          },
          {
            teks: '[TP E.5.1] menerapkan prosedur K3LH perkantoran, ergonomi kerja komputer, dan budaya kerja industri 5R (Ringkas, Rapi, Resik, Rawat, Rajin)',
            jp: 8,
            ind: 'Peserta didik dapat mempraktikkan posisi duduk ergonomis, penataan meja kerja 5R, dan pencegahan bahaya kelistrikan/kelelahan mata.',
            r1: 'Belum memahami prinsip ergonomi kerja dan penataan berkas keuangan 5R.',
            r2: 'Dapat menerapkan sebagian prinsip 5R di meja praktik dengan pengingat guru.',
            r3: 'Mampu menerapkan K3LH perkantoran dan budaya kerja 5R secara konsisten, tertib, dan mandiri.',
            r4: 'Mampu menyusun daftar periksa (audit checklist) K3LH dan 5R untuk laboratorium akuntansi sekolah.',
            teknik: 'Observasi unjuk kerja dan daftar periksa K3LH'
          }
        ]
      },
      {
        nama: 'Perkembangan Teknologi Finansial (Fintech), Profesi Teknisi Akuntansi KKNI, dan Etika Profesi',
        sem: 1,
        elemen: 'Perkembangan Teknologi di Industri dan Dunia Kerja serta Isu-Isu Global di Bidang Akuntansi dan Keuangan Lembaga',
        tps: [
          {
            teks: '[TP E.2.1] menganalisis perkembangan teknologi akuntansi dari manual menuju Cloud Accounting, Fintech, QRIS, dan keamanan data siber finansial',
            jp: 10,
            ind: 'Peserta didik dapat mengidentifikasi pemanfaatan aplikasi cloud accounting, pembayaran digital, dan otomasi pembukuan di dunia kerja.',
            r1: 'Belum memahami perbedaan pembukuan manual dan sistem akuntansi berbasis cloud.',
            r2: 'Dapat menyebutkan contoh aplikasi akuntansi dan fintech dengan bantuan materi ajar.',
            r3: 'Mampu menganalisis dampak transformasi digital, cloud accounting, dan keamanan siber pada profesi akuntansi secara mandiri.',
            r4: 'Mampu mengevaluasi studi kasus ancaman kebocoran data finansial dan merumuskan langkah proteksi keamanan informasi.',
            teknik: 'Penugasan riset digital dan presentasi kelompok'
          },
          {
            teks: '[TP E.3.1] memetakan profil profesi Teknisi Akuntansi Yunior (KKNI Level II), peluang wirausaha jasa pembukuan, dan menerapkan kode etik profesi akuntan',
            jp: 10,
            ind: 'Peserta didik dapat menguraikan unit kompetensi KKNI Level II serta menerapkan prinsip integritas, objektivitas, dan kerahasiaan akuntan.',
            r1: 'Belum memahami standar kompetensi KKNI Level II dan prinsip dasar etika profesi akuntan.',
            r2: 'Dapat menyebutkan jenis-jenis profesi akuntan dan kode etik dasar dengan panduan modul.',
            r3: 'Mampu menganalisis peluang karir akuntansi dan memecahkan dilema etika profesi akuntan secara mandiri.',
            r4: 'Mampu menyusun rencana pengembangan diri (career roadmap) menuju sertifikasi kompetensi Teknisi Akuntansi Yunior.',
            teknik: 'Studi kasus dilema etika dan portofolio karir'
          }
        ]
      },
      {
        nama: 'Prinsip Dasar Akuntansi, Persamaan Dasar Akuntansi, dan Siklus Akuntansi Perusahaan Jasa',
        sem: 1,
        elemen: 'Prinsip-Prinsip dan Konsep Akuntansi Dasar dan Perbankan Dasar',
        tps: [
          {
            teks: '[TP E.6.1] menerapkan konsep persamaan dasar akuntansi (Aset = Liabilitas + Ekuitas) dan mekanisme debit-kredit dari bukti transaksi',
            jp: 16,
            ind: 'Peserta didik dapat menganalisis bukti transaksi (kuitansi, nota, faktur, memo) dan mencatatnya ke dalam tabel persamaan dasar akuntansi.',
            r1: 'Masih keliru menentukan saldo normal akun dan keseimbangan persamaan dasar akuntansi.',
            r2: 'Dapat mencatat transaksi ke tabel persamaan dasar akuntansi dengan bimbingan guru.',
            r3: 'Mampu menganalisis bukti transaksi dan menyusun persamaan dasar akuntansi secara tepat, seimbang (balance), dan mandiri.',
            r4: 'Mampu menyusun draf laporan laba rugi, perubahan ekuitas, dan posisi keuangan langsung dari tabel persamaan dasar akuntansi.',
            teknik: 'Tes praktik lembar kerja dan unjuk kerja'
          },
          {
            teks: '[TP E.4.1] memproses siklus akuntansi perusahaan jasa mulai dari jurnal umum, posting buku besar, neraca saldo, jurnal penyesuaian, neraca lajur, hingga laporan keuangan',
            jp: 24,
            ind: 'Peserta didik dapat menyusun siklus akuntansi lengkap perusahaan jasa hingga laporan keuangan dan jurnal penutup sesuai SAK EMKM.',
            r1: 'Kesulitan menyusun ayat jurnal penyesuaian dan memindahkan saldo ke neraca lajur 10 kolom.',
            r2: 'Dapat menyelesaikan jurnal umum dan buku besar dengan panduan bagan akun (Chart of Accounts).',
            r3: 'Mampu menyelesaikan seluruh tahapan siklus akuntansi perusahaan jasa hingga laporan keuangan secara akurat dan mandiri.',
            r4: 'Mampu mengaudit ketidaksesuaian neraca saldo dan menyusun jurnal koreksi secara sistematis.',
            teknik: 'Uji kompetensi praktik siklus akuntansi jasa'
          }
        ]
      },
      {
        nama: 'Perbankan Dasar: Sejarah Uang, Fungsi Bank, dan Produk Simpanan & Pinjaman',
        sem: 2,
        elemen: 'Prinsip-Prinsip dan Konsep Akuntansi Dasar dan Perbankan Dasar',
        tps: [
          {
            teks: '[TP E.6.2] menganalisis sejarah uang, jenis lembaga keuangan bank & non-bank, serta prosedur layanan simpanan (tabungan, giro, deposito) dan kredit dasar',
            jp: 16,
            ind: 'Peserta didik dapat membedakan fungsi Bank Sentral, Bank Umum, dan BPR serta menghitung bunga tabungan dan deposito sederhana.',
            r1: 'Belum memahami perbedaan mekanisme giro, tabungan, dan deposito berjangka.',
            r2: 'Dapat menjelaskan jenis-jenis bank dan menghitung bunga tunggal dengan rumus panduan.',
            r3: 'Mampu menganalisis produk perbankan dasar dan menghitung bunga simpanan/pinjaman secara mandiri dan tepat.',
            r4: 'Mampu mensimulasikan pengisian formulir pembukaan rekening, slip setoran, bilyet giro, dan cek sesuai standar perbankan.',
            teknik: 'Simulasi dokumen perbankan dan tes tertulis'
          }
        ]
      },
      {
        nama: 'Aplikasi Pengolah Angka (Spreadsheet) untuk Otomasi Siklus Akuntansi',
        sem: 2,
        elemen: 'Penggunaan Aplikasi Pengolah Angka (Spreadsheet)',
        tps: [
          {
            teks: '[TP E.7.1] mengoperasikan rumus matematika, statistik (SUM, AVERAGE, COUNTIF, SUMIF), fungsi logika (IF bertingkat, AND, OR), dan pembacaan tabel (VLOOKUP, HLOOKUP, XLOOKUP)',
            jp: 20,
            ind: 'Peserta didik dapat menerapkan formula SUMIF, IF, dan VLOOKUP/XLOOKUP untuk pengolahan data tabel keuangan pada spreadsheet.',
            r1: 'Masih mengalami error (#N/A, #VALUE!, #REF!) saat menuliskan sintaks rumus VLOOKUP dan IF.',
            r2: 'Dapat menuliskan rumus fungsi logika dan lookup dengan panduan modul langkah demi langkah.',
            r3: 'Mampu mengolah data tabel keuangan menggunakan kombinasi rumus IF, SUMIF, dan VLOOKUP secara tepat dan mandiri.',
            r4: 'Mampu mengoptimalkan rumus dinamis dan validasi data (Data Validation) untuk mencegah kesalahan input pengguna.',
            teknik: 'Praktik laboratorium komputer (Spreadsheet)'
          },
          {
            teks: '[TP E.7.2] merancang aplikasi siklus akuntansi perusahaan jasa terotomatisasi (Daftar Akun, Jurnal Umum, Buku Besar, Neraca Lajur, dan Laporan Keuangan) di Spreadsheet',
            jp: 20,
            ind: 'Peserta didik dapat membangun workbook spreadsheet yang saling terhubung dari jurnal umum hingga laporan laba rugi dan neraca otomatis.',
            r1: 'Belum mampu menghubungkan rumus antar-sheet dari Jurnal Umum ke Buku Besar dan Neraca Lajur.',
            r2: 'Dapat membuat format tabel jurnal dan neraca lajur dengan template rumus terbimbing.',
            r3: 'Mampu membangun sistem siklus akuntansi otomatis di spreadsheet hingga menghasilkan laporan keuangan yang balance secara mandiri.',
            r4: 'Mampu menambahkan fitur dashboard grafik kinerja keuangan dan rumus penyusutan aset tetap (SLN, SYD, DB).',
            teknik: 'Penilaian proyek aplikasi akuntansi spreadsheet'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 2. KONSENTRASI KEAHLIAN AKUNTANSI DAN KEUANGAN LEMBAGA (FASE F - XI & XII)
// Paket Inti 5 Elemen Terpadu sesuai Keputusan Kepala BSKAP No. 046/H/KR/2025
// ============================================================================
function generateKonsentrasiAkl(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis dokumen sumber dan dokumen pendukung pada perusahaan (entitas) Wajib Pajak Orang Pribadi dan Badan, baik yang telah menjadi Pengusaha Kena Pajak (PKP) maupun non-PKP, serta menerapkan proses pencatatan transaksi ke dalam jurnal umum atau khusus, pencatatan ke dalam buku pembantu piutang, buku pembantu utang, dan buku pembantu persediaan, posting ke dalam buku besar, penyusunan neraca saldo, pencatatan jurnal penyesuaian, penyusunan neraca lajur (worksheet), penyusunan laporan laba/rugi, laporan perubahan ekuitas, laporan posisi keuangan, laporan arus kas, dan catatan atas laporan keuangan berdasarkan SAK Entitas Privat (SAK EP) & SAK EMKM, serta penyusunan jurnal penutup dan neraca saldo setelah penutupan untuk perusahaan jasa, dagang, dan manufaktur (harga pokok pesanan dan proses).`
      },
      {
        elemen: 'Akuntansi Keuangan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengelola kartu piutang, kartu utang, dan kartu persediaan, serta memproses dokumen dana kas kecil dan dokumen dana kas di bank, rekonsiliasi bank, mengelola kartu aset tetap, menyajikan laporan harga pokok produk, menerapkan pencatatan utang wesel jangka panjang, penerbitan utang obligasi, serta menganalisis berbagai jenis modal perusahaan (Perseorangan, Persekutuan, CV, PT, dan Koperasi) sesuai SAK Entitas Privat (SAK EP).`
      },
      {
        elemen: 'Akuntansi Lembaga / Instansi Pemerintah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan standar akuntansi yang digunakan lembaga atau instansi pemerintah (PP Nomor 71 Tahun 2010 & Permendagri Nomor 77 Tahun 2020) meliputi struktur APBD/APBDes, klasifikasi akun, pencatatan komitmen anggaran (LRA) dan basis akrual (LO), jurnal penyesuaian, laporan keuangan pemerintah daerah (SKPD & PPKD) melalui SIPD RI, serta pengelolaan keuangan desa dengan Siskeudes 2.0.`
      },
      {
        elemen: 'Komputer Akuntansi',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengoperasikan program komputer akuntansi (Cloud Accounting Accurate Online / Jurnal / MYOB) untuk mendukung pekerjaannya, meliputi penginstalasian dan setup database awal, penyusunan daftar akun (Chart of Accounts), pengentrian saldo awal, kartu piutang, utang, persediaan, dan aset tetap, pencatatan transaksi pembelian, penjualan, kas/bank, dan penyesuaian, serta pencetakan laporan keuangan dan backup data.`
      },
      {
        elemen: 'Perpajakan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami ketentuan umum dan tata cara perpajakan (KUP) termasuk integrasi NIK sebagai NPWP 16 digit, jenis-jenis pajak, menghitung PPh Orang Pribadi (metode Tarif Efektif Rata-rata / TER PPh Pasal 21), PPh Badan, PPh Pasal 22/23/24/25, PPh Final UMKM, PPN dan PPnBM, serta menerapkan pengisian e-Bupot, e-Faktur, dan pelaporan SPT Masa/Tahunan melalui sistem Coretax DJP (SIAP).`
      }
    ],
    units: [
      {
        nama: topik ? `Siklus Akuntansi Jasa, Dagang & ${topik}` : 'Siklus Akuntansi Perusahaan Jasa dan Dagang (SAK EP & SAK EMKM)',
        sem: 1,
        elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        tps: [
          {
            teks: '[TP F.AKL.1.1] menganalisis dokumen sumber dan mencatat transaksi perusahaan dagang PKP/non-PKP ke dalam jurnal khusus serta buku besar pembantu piutang, utang, dan persediaan',
            jp: 16,
            ind: 'Peserta didik dapat memverifikasi faktur pajak/komersial dan mengentri transaksi ke jurnal penerimaan kas, pengeluaran kas, pembelian, penjualan, dan jurnal umum.',
            r1: 'Masih keliru membedakan transaksi yang masuk ke jurnal khusus dan buku besar pembantu.',
            r2: 'Dapat mencatat transaksi ke jurnal khusus dengan bantuan tabel rekapitulasi.',
            r3: 'Mampu mencatat transaksi perusahaan dagang ke jurnal khusus dan buku pembantu secara tepat dan mandiri.',
            r4: 'Mampu merekonsiliasi kesesuaian saldo buku besar utama dengan daftar saldo buku besar pembantu piutang dan utang.',
            teknik: 'Unjuk kerja praktik pembukuan dan tes tertulis'
          },
          {
            teks: '[TP F.AKL.1.2] menyusun neraca lajur (worksheet), laporan keuangan lengkap (Laba Rugi, Perubahan Ekuitas, Posisi Keuangan, Arus Kas) berbasis SAK EP / SAK EMKM, dan jurnal penutup',
            jp: 16,
            ind: 'Peserta didik dapat menghitung HPP dagang, menyusun jurnal penyesuaian, dan menyajikan laporan keuangan yang seimbang.',
            r1: 'Belum tepat menghitung HPP dan penyesuaian persediaan barang dagang.',
            r2: 'Dapat menyusun laporan laba rugi dan neraca dengan panduan format laporan.',
            r3: 'Mampu menyusun laporan keuangan perusahaan dagang lengkap beserta arus kas dan jurnal penutup secara mandiri.',
            r4: 'Mampu menganalisis rasio likuiditas dan profitabilitas dari laporan keuangan yang telah disusun.',
            teknik: 'Uji kompetensi laporan keuangan'
          }
        ]
      },
      {
        nama: 'Akuntansi Keuangan: Pengelolaan Kas, Piutang, Persediaan, dan Aset Tetap (SAK EP)',
        sem: 1,
        elemen: 'Akuntansi Keuangan',
        tps: [
          {
            teks: '[TP F.AKL.2.1] mengelola dana kas kecil (imprest & fluktuasi), menyusun laporan rekonsiliasi bank, serta menghitung cadangan kerugian piutang dan wesel',
            jp: 14,
            ind: 'Peserta didik dapat menyusun rekonsiliasi bank 2 kolom/4 kolom, membuat jurnal penyesuaian kas bank, dan menghitung penghapusan piutang.',
            r1: 'Sering terbalik menempatkan deposit in transit dan outstanding check pada rekonsiliasi bank.',
            r2: 'Dapat menyusun rekonsiliasi bank dengan lembar kerja terstruktur.',
            r3: 'Mampu mengelola kas kecil, rekonsiliasi bank, dan administrasi kartu piutang secara akurat dan mandiri.',
            r4: 'Mampu menganalisis umur piutang (aging schedule) untuk menentukan taksiran cadangan kerugian piutang.',
            teknik: 'Praktik lembar kerja akuntansi keuangan'
          },
          {
            teks: '[TP F.AKL.2.2] mengelola kartu persediaan (FIFO & Average) serta menghitung harga perolehan, penyusutan, dan penghentian aset tetap berwujud',
            jp: 14,
            ind: 'Peserta didik dapat mengisi kartu persediaan perpetual/periodik dan menyusun tabel depresiasi aset tetap.',
            r1: 'Masih keliru menghitung HPP pada metode rata-rata bergerak (moving average).',
            r2: 'Dapat mengisi kartu persediaan FIFO dengan bimbingan guru.',
            r3: 'Mampu mengelola kartu persediaan dan kartu aset tetap beserta jurnal penyusutannya secara mandiri.',
            r4: 'Mampu menganalisis dampak pemilihan metode penilaian persediaan dan penyusutan terhadap laba bersih perusahaan.',
            teknik: 'Tes tertulis dan unjuk kerja kartu aset/persediaan'
          }
        ]
      },
      {
        nama: 'Akuntansi Perusahaan Manufaktur: Biaya Produksi dan Harga Pokok Pesanan/Proses',
        sem: 2,
        elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        tps: [
          {
            teks: '[TP F.AKL.1.3] menghitung biaya bahan baku, biaya tenaga kerja langsung, dan BOP serta menyusun Laporan Harga Pokok Produksi (Cost of Goods Manufactured)',
            jp: 16,
            ind: 'Peserta didik dapat menjurnal pemakaian bahan baku, distribusi gaji/upah pabrik, pembebanan BOP, dan menyusun laporan HPP manufaktur.',
            r1: 'Belum dapat memisahkan biaya produksi langsung dan biaya overhead pabrik (BOP).',
            r2: 'Dapat menyusun laporan harga pokok produksi dengan format tabel terbimbing.',
            r3: 'Mampu mencatat siklus akuntansi biaya manufaktur dan menyusun laporan harga pokok produksi secara tepat dan mandiri.',
            r4: 'Mampu menghitung harga pokok per unit dengan metode Job Order Costing dan Process Costing.',
            teknik: 'Praktik studi kasus perusahaan manufaktur'
          }
        ]
      },
      {
        nama: 'Akuntansi Instansi Pemerintah (SAP, SIPD RI & Siskeudes) dan Komputer Akuntansi',
        sem: 2,
        elemen: 'Akuntansi Lembaga / Instansi Pemerintah',
        tps: [
          {
            teks: '[TP F.AKL.3.1] mencatat transaksi anggaran (LRA) dan finansial akrual (LO) pada SKPD/PPKD serta menyusun laporan keuangan pemerintah daerah dan desa (SIPD RI & Siskeudes)',
            jp: 14,
            ind: 'Peserta didik dapat membuat jurnal pasangan (jurnal LO/Neraca dan jurnal LRA) serta menyusun LRA, LO, LPE, dan Neraca Pemda.',
            r1: 'Masih bingung membedakan kapan transaksi memerlukan jurnal LRA dan jurnal LO.',
            r2: 'Dapat mencatat transaksi UP, GU, TU, dan LS dengan tabel panduan akun SAP.',
            r3: 'Mampu menjurnal transaksi akuntansi pemerintah daerah/desa dan menyusun laporan keuangan SKPD secara mandiri.',
            r4: 'Mampu mensimulasikan penginputan APBDes dan penatausahaan keuangan desa menggunakan struktur Siskeudes.',
            teknik: 'Praktik pembukuan pemda/desa'
          },
          {
            teks: '[TP F.AKL.4.1] mengoperasikan aplikasi Komputer Akuntansi (Accurate Online / MYOB) untuk menyelesaikan siklus akuntansi perusahaan dagang/jasa hingga laporan keuangan',
            jp: 16,
            ind: 'Peserta didik dapat membuat database baru, impor daftar akun, entri saldo awal, input transaksi pembelian/penjualan/kas, dan mencetak laporan.',
            r1: 'Kesulitan melakukan setup linked accounts dan kode pajak PPN pada aplikasi.',
            r2: 'Dapat mengentri transaksi dengan panduan modul praktikum komputer akuntansi.',
            r3: 'Mampu mengoperasikan aplikasi komputer akuntansi dari setup awal hingga pelaporan keuangan secara cepat, tepat, dan mandiri.',
            r4: 'Mampu mengekspor laporan keuangan ke PDF/Excel serta melakukan audit trail atas kesalahan input transaksi.',
            teknik: 'Uji praktik laboratorium komputer akuntansi'
          }
        ]
      },
      {
        nama: 'Administrasi Perpajakan: PPh Pasal 21 TER, PPh Badan, PPN, dan Coretax DJP',
        sem: 2,
        elemen: 'Perpajakan',
        tps: [
          {
            teks: '[TP F.AKL.5.1] menghitung PPh Pasal 21 menggunakan Tarif Efektif Rata-rata (TER PP 58/2023), PPh Pasal 22/23/4 ayat (2), PPN, dan menyusun SPT melalui Coretax DJP',
            jp: 14,
            ind: 'Peserta didik dapat menentukan kategori TER (A/B/C), menghitung potongan PPh 21 masa dan masa pajak terakhir, serta mengisi bukti potong dan SPT.',
            r1: 'Belum tepat menentukan status PTKP dan kategori tabel Tarif Efektif Rata-rata (TER).',
            r2: 'Dapat menghitung PPh 21 bulanan dengan melihat tabel referensi TER.',
            r3: 'Mampu menghitung PPh 21 TER, PPh unifikasi, PPN, dan menyusun SPT perpajakan secara akurat dan mandiri.',
            r4: 'Mampu menyusun rekonsiliasi fiskal laporan keuangan komersial menjadi laba fiskal untuk perhitungan PPh Badan.',
            teknik: 'Praktik perhitungan pajak dan simulasi Coretax DJP'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 3. PRAKTIKUM AKUNTANSI PERUSAHAAN JASA, DAGANG, DAN MANUFAKTUR (FASE F)
// Pembaruan Inspirasi Ruang GTK: SAK Entitas Privat (SAK EP) & SAK EMKM
// ============================================================================
function generatePraktikumJasaDagangManufaktur(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Dokumen Sumber dan Siklus Akuntansi Perusahaan Jasa',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis dokumen sumber dan dokumen pendukung perusahaan jasa, mencatat ke jurnal umum, memposting ke buku besar, menyusun neraca saldo, jurnal penyesuaian, neraca lajur, serta menyajikan laporan keuangan perusahaan jasa sesuai SAK EMKM dan SAK Entitas Privat (SAK EP).`
      },
      {
        elemen: 'Pencatatan Transaksi Perusahaan Dagang (Jurnal Khusus & Buku Pembantu)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis transaksi pembelian dan penjualan barang dagang (tunai dan kredit, PKP dan non-PKP), mencatat ke dalam Jurnal Khusus (Pembelian, Pengeluaran Kas, Penjualan, Penerimaan Kas, dan Jurnal Umum), serta mengelola Buku Besar Pembantu Piutang, Buku Besar Pembantu Utang, dan Kartu Persediaan.`
      },
      {
        elemen: 'Pengikhtisaran dan Pelaporan Keuangan Perusahaan Dagang (SAK EP & SAK EMKM)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memposting rekapitulasi jurnal khusus ke buku besar utama, menyusun daftar saldo piutang/utang, mencatat jurnal penyesuaian (metode ikhtisar laba rugi dan HPP), menyusun neraca lajur, laporan laba rugi, laporan perubahan ekuitas, laporan posisi keuangan, laporan arus kas, dan jurnal penutup perusahaan dagang.`
      },
      {
        elemen: 'Akuntansi Biaya dan Dokumen Transaksi Perusahaan Manufaktur',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengklasifikasikan biaya produksi (Biaya Bahan Baku, Biaya Tenaga Kerja Langsung, dan Biaya Overhead Pabrik), menganalisis dokumen permintaan dan pemakaian bahan baku, kartu jam kerja pabrik, serta mencatat transaksi ke jurnal khusus perusahaan manufaktur.`
      },
      {
        elemen: 'Perhitungan Harga Pokok Pesanan (Job Order Costing) dan Harga Pokok Proses (Process Costing)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menghitung dan membebankan biaya produksi berdasarkan metode Harga Pokok Pesanan (Job Order Cost Sheet) dan metode Harga Pokok Proses (Laporan Biaya Produksi departemen), termasuk perlakuan selisih BOP dan produk dalam proses.`
      },
      {
        elemen: 'Laporan Harga Pokok Produksi dan Laporan Keuangan Perusahaan Manufaktur',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menyusun jurnal penyesuaian persediaan bahan baku, barang dalam proses (WIP), dan barang jadi, menyelesaikan neraca lajur manufaktur, serta menyajikan Laporan Harga Pokok Produksi, Laporan Laba Rugi, dan Laporan Posisi Keuangan perusahaan manufaktur berbasis SAK EP.`
      }
    ],
    units: [
      {
        nama: topik ? `Praktikum Siklus Lengkap Perusahaan Jasa & ${topik}` : 'Praktikum Siklus Akuntansi Lengkap Perusahaan Jasa',
        sem: 1,
        elemen: 'Dokumen Sumber dan Siklus Akuntansi Perusahaan Jasa',
        tps: [
          {
            teks: '[TP F.PA.1.1] memverifikasi bukti transaksi perusahaan jasa dan memproses jurnal umum, buku besar, hingga neraca saldo',
            jp: 12,
            ind: 'Peserta didik dapat mengidentifikasi keabsahan bukti kas masuk/keluar, faktur jasa, dan memo, lalu menjurnal dan memposting dengan tepat.',
            r1: 'Masih keliru mengidentifikasi akun yang didebit dan dikredit dari bukti transaksi.',
            r2: 'Dapat menjurnal transaksi rutin dengan panduan daftar akun (COA).',
            r3: 'Mampu memproses bukti transaksi perusahaan jasa ke jurnal umum dan buku besar secara teliti dan mandiri.',
            r4: 'Mampu menemukan dan mengoreksi kesalahan pencatatan (error of commission/omission) sebelum penyusunan neraca saldo.',
            teknik: 'Praktik dokumen sumber dan buku jurnal'
          },
          {
            teks: '[TP F.PA.1.2] menyusun jurnal penyesuaian, neraca lajur, laporan keuangan perusahaan jasa (SAK EMKM/SAK EP), jurnal penutup, dan neraca saldo setelah penutupan',
            jp: 14,
            ind: 'Peserta didik dapat menyelesaikan kertas kerja 10 kolom dan menyajikan laporan keuangan perusahaan jasa secara lengkap.',
            r1: 'Kesulitan menghitung penyesuaian beban dibayar di muka dan pendapatan diterima di muka (pendekatan neraca vs laba rugi).',
            r2: 'Dapat menyusun ayat jurnal penyesuaian dengan panduan rumus perhitungan.',
            r3: 'Mampu menyusun laporan keuangan perusahaan jasa, jurnal penutup, dan jurnal pembalik secara akurat dan mandiri.',
            r4: 'Mampu memberikan interpretasi tertulis atas kinerja laba bersih dan posisi likuiditas perusahaan jasa.',
            teknik: 'Uji praktik komprehensif siklus jasa'
          }
        ]
      },
      {
        nama: 'Praktikum Pencatatan Perusahaan Dagang: Jurnal Khusus dan Buku Besar Pembantu',
        sem: 1,
        elemen: 'Pencatatan Transaksi Perusahaan Dagang (Jurnal Khusus & Buku Pembantu)',
        tps: [
          {
            teks: '[TP F.PA.2.1] mencatat transaksi perusahaan dagang ber-PKP ke dalam 5 Jurnal Khusus (Pembelian, Pengeluaran Kas, Penjualan, Penerimaan Kas, Umum)',
            jp: 16,
            ind: 'Peserta didik dapat menganalisis syarat pembayaran (2/10, n/30), potongan pembelian/penjualan, retur, dan PPN Keluaran/Masukan pada jurnal khusus.',
            r1: 'Sering salah menghitung potongan tunai saat pelunasan piutang/utang dalam masa potongan.',
            r2: 'Dapat menginput transaksi ke jurnal khusus dengan bantuan petunjuk kolom.',
            r3: 'Mampu mencatat seluruh transaksi perusahaan dagang ke dalam jurnal khusus dan menyusun rekapitulasi secara tepat dan mandiri.',
            r4: 'Mampu merancang kontrol keseimbangan debit-kredit pada tabel rekapitulasi seluruh jurnal khusus.',
            teknik: 'Praktik buku jurnal khusus perusahaan dagang'
          },
          {
            teks: '[TP F.PA.2.2] memproses mutasi Buku Besar Pembantu Piutang, Buku Besar Pembantu Utang, Kartu Persediaan, dan memposting ke Buku Besar Utama',
            jp: 14,
            ind: 'Peserta didik dapat memperbarui saldo tiap pelanggan/pemasok setiap terjadi transaksi kredit dan menyusun daftar saldo piutang/utang.',
            r1: 'Saldo daftar piutang/utang belum cocok dengan saldo akun kontrol Piutang Dagang dan Utang Dagang di Buku Besar.',
            r2: 'Dapat memposting mutasi ke buku pembantu dengan bimbingan bertahap.',
            r3: 'Mampu mengelola buku besar pembantu dan buku besar utama hingga menghasilkan neraca saldo yang cocok secara mandiri.',
            r4: 'Mampu menelusuri selisih antara buku besar utama dan buku pembantu serta membuat berita acara rekonsiliasi internal.',
            teknik: 'Penilaian portofolio buku besar dan kartu pembantu'
          }
        ]
      },
      {
        nama: 'Praktikum Laporan Keuangan Perusahaan Dagang (SAK Entitas Privat & SAK EMKM)',
        sem: 1,
        elemen: 'Pengikhtisaran dan Pelaporan Keuangan Perusahaan Dagang (SAK EP & SAK EMKM)',
        tps: [
          {
            teks: '[TP F.PA.3.1] menyusun jurnal penyesuaian perusahaan dagang (metode Ikhtisar Laba Rugi & HPP), neraca lajur, dan laporan keuangan lengkap beserta Arus Kas',
            jp: 16,
            ind: 'Peserta didik dapat menyusun Laporan Laba Rugi (multiple-step), Laporan Perubahan Ekuitas, Laporan Posisi Keuangan, dan Laporan Arus Kas (metode langsung/tidak langsung).',
            r1: 'Masih keliru menyusun laporan arus kas dari aktivitas operasi, investasi, dan pendanaan.',
            r2: 'Dapat menyusun laporan laba rugi dan neraca dari neraca lajur dengan format acuan.',
            r3: 'Mampu menyusun paket lengkap laporan keuangan perusahaan dagang berbasis SAK EP beserta arus kas dan jurnal penutup secara mandiri.',
            r4: 'Mampu menyusun Catatan atas Laporan Keuangan (CaLK) yang menjelaskan kebijakan akuntansi perusahaan dagang.',
            teknik: 'Uji kompetensi laporan keuangan dagang'
          }
        ]
      },
      {
        nama: 'Praktikum Akuntansi Biaya Manufaktur: Harga Pokok Pesanan & Harga Pokok Proses',
        sem: 2,
        elemen: 'Perhitungan Harga Pokok Pesanan (Job Order Costing) dan Harga Pokok Proses (Process Costing)',
        tps: [
          {
            teks: '[TP F.PA.4.1] mencatat transaksi pemakaian bahan baku, distribusi gaji dan upah pabrik, serta pembebanan BOP ke dalam jurnal perusahaan manufaktur',
            jp: 16,
            ind: 'Peserta didik dapat menjurnal pembelian bahan, pemakaian bahan baku/penolong, pencatatan waktu kerja langsung, dan pembebanan BOP ditentukan di muka.',
            r1: 'Belum mampu membedakan pencatatan BOP sesungguhnya dan BOP yang dibebankan.',
            r2: 'Dapat menjurnal biaya bahan baku dan tenaga kerja dengan panduan alur akun.',
            r3: 'Mampu mencatat seluruh transaksi biaya produksi ke dalam jurnal dan buku besar manufaktur secara tepat dan mandiri.',
            r4: 'Mampu menganalisis selisih BOP (under-applied / over-applied overhead) dan menutupnya ke akun Harga Pokok Penjualan.',
            teknik: 'Praktik jurnal akuntansi manufaktur'
          },
          {
            teks: '[TP F.PA.5.1] menyusun Kartu Harga Pokok Pesanan (Job Order Cost Sheet) dan Laporan Biaya Produksi metode Harga Pokok Proses (Process Costing)',
            jp: 16,
            ind: 'Peserta didik dapat menghitung unit ekuivalen produksi dan menyusun laporan biaya produksi 1 atau 2 departemen.',
            r1: 'Kesulitan menghitung unit ekuivalen berdasarkan tingkat penyelesaian (persentase penyelesaian BDP akhir).',
            r2: 'Dapat menghitung unit ekuivalen dengan rumus panduan.',
            r3: 'Mampu menyusun Kartu Harga Pokok Pesanan dan Laporan Biaya Produksi metode proses secara akurat dan mandiri.',
            r4: 'Mampu mengevaluasi efisiensi biaya produksi per unit produk dan memberikan rekomendasi pengendalian biaya pabrik.',
            teknik: 'Tes tertulis dan studi kasus biaya produksi'
          }
        ]
      },
      {
        nama: 'Praktikum Penyusunan Laporan Harga Pokok Produksi dan Laporan Keuangan Manufaktur',
        sem: 2,
        elemen: 'Laporan Harga Pokok Produksi dan Laporan Keuangan Perusahaan Manufaktur',
        tps: [
          {
            teks: '[TP F.PA.6.1] menyusun neraca lajur manufaktur, Laporan Harga Pokok Produksi (COGM), Laporan Laba Rugi, dan Neraca Perusahaan Manufaktur berbasis SAK EP',
            jp: 18,
            ind: 'Peserta didik dapat menyesuaikan 3 jenis persediaan (Bahan Baku, BDP, Barang Jadi) dan menyajikan laporan keuangan manufaktur lengkap.',
            r1: 'Masih tertukar menempatkan persediaan awal dan akhir BDP pada Laporan Harga Pokok Produksi.',
            r2: 'Dapat menyusun Laporan Harga Pokok Produksi dengan template kertas kerja.',
            r3: 'Mampu menyajikan Laporan Harga Pokok Produksi dan Laporan Keuangan perusahaan manufaktur lengkap secara mandiri dan balance.',
            r4: 'Mampu menyelesaikan simulasi paket Uji Kompetensi Keahlian (UKK) Akuntansi Manufaktur sesuai standar industri.',
            teknik: 'Simulasi UKK Praktikum Akuntansi Manufaktur'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 4. AKUNTANSI KEUANGAN (FASE F - KELAS XI & XII)
// Pembaruan Inspirasi Ruang GTK: Pengukuran Pos Keuangan berbasis SAK EP
// ============================================================================
function generateAkuntansiKeuangan(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Pengelolaan Kas Kecil (Petty Cash) dan Kas Bank',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengelola administrasi dana kas kecil dengan metode dana tetap (imprest fund system) dan metode fluktuasi (fluctuating fund system), melakukan pemeriksaan fisik kas (cash opname), menganalisis perbedaan saldo kas menurut catatan perusahaan dan rekening koran bank, serta menyusun laporan rekonsiliasi bank dan jurnal penyesuaiannya.`
      },
      {
        elemen: 'Pengelolaan Piutang Usaha dan Piutang Wesel',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengelola kartu piutang, melakukan konfirmasi saldo piutang, menganalisis penghapusan piutang tak tertagih (metode langsung dan metode cadangan), menyusun daftar umur piutang (aging schedule), serta mencatat transaksi piutang wesel (wesel tagih berbunga dan tanpa bunga) beserta pendiskontoan wesel.`
      },
      {
        elemen: 'Pengelolaan Persediaan Barang Dagang',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan pencatatan persediaan sistem periodik (fisik) dan sistem perpetual dengan metode Masuk Pertama Keluar Pertama (MPKP/FIFO) dan Rata-rata Tertimbang/Bergerak (Weighted/Moving Average) sesuai SAK Entitas Privat (SAK EP), serta melaksanakan perhitungan fisik persediaan (stock opname).`
      },
      {
        elemen: 'Pengelolaan Aset Tetap Berwujud dan Tidak Berwujud',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menghitung harga perolehan aset tetap (pembelian tunai, kredit, gabungan, pertukaran, hibah), menghitung dan mencatat beban penyusutan aset tetap (metode garis lurus, saldo menurun ganda, jumlah angka tahun, satuan jam kerja, satuan hasil produksi), pengeluaran masa manfaat aset, penghentian/penjualan aset tetap, deplesi aset sumber daya alam, dan amortisasi aset tak berwujud.`
      },
      {
        elemen: 'Pengelolaan Utang Jangka Pendek, Utang Wesel, dan Utang Obligasi',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengelola kartu utang usaha, mencatat utang wesel jangka pendek dan jangka panjang, utang beban, pendapatan diterima di muka, serta mencatat penerbitan utang obligasi (pada nilai nominal, agio/premium, dan disagio/diskonto), pembayaran bunga, amortisasi agio/disagio, dan pelunasan obligasi.`
      },
      {
        elemen: 'Akuntansi Ekuitas / Modal Perusahaan (Perseorangan, Firma, CV, PT, dan Koperasi)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mencatat transaksi pembentukan dan pembagian laba-rugi pada perusahaan perseorangan, persekutuan (Firma/CV), akuntansi modal saham Perseroan Terbatas (penerbitan saham biasa/preferen, agio/disagio saham, treasury stock, pembagian dividen kas/saham), serta akuntansi ekuitas dan Sisa Hasil Usaha (SHU) Koperasi.`
      }
    ],
    units: [
      {
        nama: topik ? `Kas Kecil, Rekonsiliasi Bank & ${topik}` : 'Pengelolaan Dana Kas Kecil (Petty Cash) dan Rekonsiliasi Bank',
        sem: 1,
        elemen: 'Pengelolaan Kas Kecil (Petty Cash) dan Kas Bank',
        tps: [
          {
            teks: '[TP F.AK.1.1] mengelola administrasi dana kas kecil metode Imprest dan Fluktuasi serta melaksanakan perhitungan fisik kas (Cash Opname)',
            jp: 12,
            ind: 'Peserta didik dapat menyusun buku kas kecil, bukti pengeluaran kas kecil, jurnal pengisian kembali, dan berita acara cash opname.',
            r1: 'Masih tertukar saat menjurnal pengeluaran kas kecil antara sistem dana tetap dan dana tidak tetap.',
            r2: 'Dapat mencatat buku kas kecil dan jurnal pembentukan dengan panduan format.',
            r3: 'Mampu mengelola kas kecil kedua metode dan menyelesaikan berita acara pemeriksaan fisik kas (termasuk selisih kas) secara mandiri.',
            r4: 'Mampu merancang sistem pengendalian internal (internal control) kas kecil untuk mencegah kecurangan (fraud).',
            teknik: 'Praktik dokumen kas kecil dan simulasi cash opname'
          },
          {
            teks: '[TP F.AK.1.2] menganalisis rekening koran bank, menyusun laporan rekonsiliasi bank (2 kolom, 4 kolom, 8 kolom), dan mencatat jurnal penyesuaian kas bank',
            jp: 12,
            ind: 'Peserta didik dapat mengidentifikasi setoran dalam perjalanan, cek beredar, cek kosong (NSF), jasa giro, dan biaya admin bank untuk mencari saldo kas yang benar.',
            r1: 'Belum tepat menentukan item yang menambah atau mengurangi saldo kas menurut perusahaan vs menurut bank.',
            r2: 'Dapat menyusun laporan rekonsiliasi bank 2 kolom dengan panduan daftar pos rekonsiliasi.',
            r3: 'Mampu menyusun laporan rekonsiliasi bank dan membuat jurnal penyesuaian kas dengan tepat dan mandiri.',
            r4: 'Mampu menyusun rekonsiliasi bank 4 kolom (proof of cash) untuk menguji mutasi penerimaan dan pengeluaran kas selama satu bulan.',
            teknik: 'Tes tertulis dan lembar kerja rekonsiliasi bank'
          }
        ]
      },
      {
        nama: 'Pengelolaan Piutang Usaha, Cadangan Kerugian Piutang, dan Piutang Wesel',
        sem: 1,
        elemen: 'Pengelolaan Piutang Usaha dan Piutang Wesel',
        tps: [
          {
            teks: '[TP F.AK.2.1] mengelola kartu piutang, menyusun daftar umur piutang (aging schedule), dan mencatat penghapusan piutang metode langsung & cadangan',
            jp: 14,
            ind: 'Peserta didik dapat menghitung taksiran kerugian piutang (pendekatan % penjualan dan % analisa umur piutang) serta menjurnal penerimaan kembali piutang yang telah dihapus.',
            r1: 'Masih keliru memperhitungkan saldo awal akun Cadangan Kerugian Piutang saat menggunakan pendekatan neraca.',
            r2: 'Dapat menghitung cadangan piutang dengan tabel umur piutang yang sudah disiapkan.',
            r3: 'Mampu menyusun aging schedule, menghitung cadangan kerugian piutang, dan menjurnal penghapusan piutang secara akurat dan mandiri.',
            r4: 'Mampu mengevaluasi kebijakan kredit perusahaan berdasarkan rasio perputaran piutang (receivable turnover).',
            teknik: 'Praktik analisis umur piutang dan tes tertulis'
          },
          {
            teks: '[TP F.AK.2.2] menghitung nilai jatuh tempo, bunga, dan diskonto piutang wesel serta mencatat transaksi pendiskontoan wesel tagih',
            jp: 10,
            ind: 'Peserta didik dapat menentukan tanggal jatuh tempo wesel (harian dan bulanan), menghitung diskonto bank, dan menjurnal penerimaan kas hasil pendiskontoan wesel.',
            r1: 'Kesulitan menghitung jumlah hari diskonto dari tanggal pendiskontoan hingga tanggal jatuh tempo.',
            r2: 'Dapat menghitung bunga wesel dan nilai jatuh tempo dengan rumus panduan.',
            r3: 'Mampu menghitung dan menjurnal transaksi piutang wesel berbunga maupun tidak berbunga serta pendiskontoannya secara mandiri.',
            r4: 'Mampu mencatat penyelesaian wesel tagih yang didiskontokan apabila saat jatuh tempo debitur gagal bayar (wanprestasi).',
            teknik: 'Uji hitung wesel dan praktik penjurnalan'
          }
        ]
      },
      {
        nama: 'Penilaian Persediaan Barang Dagang (FIFO & Average SAK EP) dan Stock Opname',
        sem: 1,
        elemen: 'Pengelolaan Persediaan Barang Dagang',
        tps: [
          {
            teks: '[TP F.AK.3.1] menghitung nilai persediaan akhir dan HPP dengan sistem periodik dan perpetual (metode FIFO/MPKP dan Average) berbasis SAK EP',
            jp: 16,
            ind: 'Peserta didik dapat menyusun kartu persediaan barang dagang, memperlakukan retur pembelian/penjualan pada kartu persediaan, dan menjurnal transaksi.',
            r1: 'Sering keliru menentukan harga pokok per unit saat terjadi retur penjualan pada kartu persediaan perpetual.',
            r2: 'Dapat mengisi kartu persediaan metode FIFO dengan bimbingan guru.',
            r3: 'Mampu menyusun kartu persediaan sistem perpetual & periodik serta menghitung HPP dan laba kotor secara tepat dan mandiri.',
            r4: 'Mampu menerapkan penilaian persediaan berdasarkan nilai realisasi neto terendah (Lower of Cost or Net Realizable Value / LCNRV) sesuai SAK EP.',
            teknik: 'Praktik kartu persediaan dan berita acara stock opname'
          }
        ]
      },
      {
        nama: 'Akuntansi Aset Tetap: Perolehan, Penyusutan, Pengeluaran Modal/Pendapatan, dan Penghentian',
        sem: 2,
        elemen: 'Pengelolaan Aset Tetap Berwujud dan Tidak Berwujud',
        tps: [
          {
            teks: '[TP F.AK.4.1] menghitung harga perolehan aset tetap (tunai, angsuran, gabungan, pertukaran) dan menyusun tabel penyusutan berbagai metode',
            jp: 16,
            ind: 'Peserta didik dapat menghitung dan menjurnal beban penyusutan dengan metode garis lurus, jumlah angka tahun, saldo menurun ganda, dan unit produksi.',
            r1: 'Belum tepat menghitung penyusutan tahun pertama jika aset tetap diperoleh pada pertengahan tahun berjalan.',
            r2: 'Dapat menyusun tabel penyusutan metode garis lurus dan jumlah angka tahun dengan panduan rumus.',
            r3: 'Mampu mengelola daftar aset tetap, menghitung penyusutan lintas periode, dan mencatat jurnal penyesuaian secara mandiri.',
            r4: 'Mampu menganalisis laba/rugi pertukaran aset tetap sejenis dan tidak sejenis yang memiliki substansi komersial.',
            teknik: 'Praktik kartu aset tetap dan tes tertulis'
          },
          {
            teks: '[TP F.AK.4.2] mencatat pengeluaran selama masa pakai aset tetap (capital vs revenue expenditure), penjualan/penghentian aset tetap, deplesi, dan amortisasi',
            jp: 12,
            ind: 'Peserta didik dapat menghitung akumulasi penyusutan sampai tanggal penjualan/penyingkiran aset serta menjurnal laba atau rugi pelepasan aset.',
            r1: 'Lupa memperbarui beban penyusutan berjalan sebelum menghitung nilai buku saat penjualan aset.',
            r2: 'Dapat menghitung nilai buku aset tetap dengan bimbingan langkah kerja.',
            r3: 'Mampu mencatat transaksi perbaikan besar (overhaul), penghentian aset tetap, deplesi tambang, dan amortisasi hak paten/goodwill secara mandiri.',
            r4: 'Mampu menyusun rekomendasi keputusan manajemen terkait penggantian mesin lama dengan mesin baru berdasarkan analisis nilai buku.',
            teknik: 'Studi kasus manajemen aset tetap'
          }
        ]
      },
      {
        nama: 'Akuntansi Liabilitas Jangka Panjang (Utang Obligasi) dan Ekuitas (CV, PT, dan Koperasi)',
        sem: 2,
        elemen: 'Pengelolaan Utang Jangka Pendek, Utang Wesel, dan Utang Obligasi',
        tps: [
          {
            teks: '[TP F.AK.5.1] mencatat penerbitan utang obligasi (kurs pari, agio, disagio), pembayaran bunga, amortisasi agio/disagio, dan pelunasan obligasi',
            jp: 14,
            ind: 'Peserta didik dapat menghitung bunga berjalan saat obligasi diterbitkan di antara tanggal pembayaran bunga dan menjurnal amortisasi agio/disagio.',
            r1: 'Masih keliru membedakan perlakuan jurnal amortisasi agio obligasi dan disagio obligasi terhadap beban bunga.',
            r2: 'Dapat mencatat penerbitan obligasi pada nilai nominal dan kurs dengan panduan contoh.',
            r3: 'Mampu menghitung dan menjurnal siklus utang obligasi dari penerbitan hingga pelunasan secara akurat dan mandiri.',
            r4: 'Mampu menyusun tabel amortisasi obligasi menggunakan metode suku bunga efektif (effective interest method) sesuai SAK EP.',
            teknik: 'Tes tertulis dan lembar kerja obligasi'
          },
          {
            teks: '[TP F.AK.6.1] mencatat transaksi ekuitas Perseroan Terbatas (modal saham, agio saham, dividen), pembagian laba CV, dan Sisa Hasil Usaha (SHU) Koperasi',
            jp: 14,
            ind: 'Peserta didik dapat menjurnal emisi saham, pembelian kembali saham (treasury stock), pengumuman/pembayaran dividen, dan alokasi SHU anggota koperasi.',
            r1: 'Belum memahami perbedaan pencatatan dividen kas dan dividen saham terhadap posisi laba ditahan.',
            r2: 'Dapat menghitung pembagian laba CV dan SHU koperasi dengan rumus panduan.',
            r3: 'Mampu mencatat akuntansi modal saham PT, persekutuan CV, dan pembagian SHU koperasi secara tepat dan mandiri.',
            r4: 'Mampu menyusun Laporan Perubahan Ekuitas korporasi yang memuat modal saham, tambahan modal disetor, saham treasuri, dan saldo laba.',
            teknik: 'Uji kompetensi akuntansi ekuitas'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 5. PRAKTIKUM AKUNTANSI LEMBAGA / INSTANSI PEMERINTAH (FASE F - XI & XII)
// Pembaruan Inspirasi Ruang GTK: SIPD RI Kemendagri, SAP PP 71/2010 & Siskeudes 2.0
// ============================================================================
function generateAkuntansiLembagaPemerintah(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Konsep Dasar Akuntansi Pemerintah, Regulasi SAP, dan Struktur APBD/APBDes',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami karakteristik keuangan negara/daerah, kerangka konseptual Standar Akuntansi Pemerintahan (PP Nomor 71 Tahun 2010 & Permendagri Nomor 77 Tahun 2020), struktur APBD dan APBDes, kodefikasi akun standar pemerintah (Bagan Akun Standar / BAS), serta hubungan entitas akuntansi (SKPD) dan entitas pelaporan (PPKD/BUD) pada ekosistem SIPD RI.`
      },
      {
        elemen: 'Akuntansi Pendapatan dan Belanja Satuan Kerja Perangkat Daerah (SKPD)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis dokumen pelaksanaan anggaran (DPA, SPD, SPP, SPM, SP2D) dan mencatat transaksi pendapatan daerah (PAD) serta belanja daerah (mekanisme Uang Persediaan/UP, Ganti Uang/GU, Tambah Uang/TU, dan Pembayaran Langsung/LS) ke dalam Jurnal Finansial (LO/Neraca) dan Jurnal Pelaksanaan Anggaran (LRA).`
      },
      {
        elemen: 'Akuntansi Pejabat Pengelola Keuangan Daerah (PPKD) dan Pembiayaan Daerah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mencatat transaksi pendapatan dana perimbangan/transfer, belanja bagi hasil/bantuan keuangan, transaksi penerimaan dan pengeluaran pembiayaan daerah (SiLPA, pinjaman daerah, penyertaan modal), serta mekanisme akun resiprokal (RK-PPKD dan RK-SKPD).`
      },
      {
        elemen: 'Akuntansi Aset, Kewajiban, dan Koreksi Kesalahan Pemerintah Daerah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mencatat transaksi perolehan, konstruksi dalam pengerjaan, penyusutan, dan penghapusan aset tetap pemerintah daerah, pencatatan persediaan pemda, pengakuan kewajiban jangka pendek/panjang, serta koreksi kesalahan pencatatan tahun berjalan dan tahun sebelumnya.`
      },
      {
        elemen: 'Penyusunan Laporan Keuangan Pemerintah Daerah (LRA, LO, LPE, Neraca, LPSAL, LAK)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menyusun jurnal penyesuaian akhir tahun, kertas kerja (worksheet) SKPD dan PPKD, jurnal penutup LRA dan LO, serta menyajikan Laporan Realisasi Anggaran (LRA), Laporan Operasional (LO), Laporan Perubahan Ekuitas (LPE), Neraca Pemerintah Daerah, dan penginputan melalui SIPD RI.`
      },
      {
        elemen: 'Pengelolaan dan Praktikum Akuntansi Keuangan Desa (Permendagri 20/2018 & Siskeudes 2.0)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami struktur APBDes (Pendapatan Desa, Belanja Desa 5 Bidang, Pembiayaan Desa), penatausahaan keuangan oleh Kaur Keuangan/Bendahara Desa, pemungutan pajak belanja desa, serta mengoperasikan alur pembukuan dan pelaporan keuangan desa menggunakan sistem Siskeudes 2.0.`
      }
    ],
    units: [
      {
        nama: topik ? `Konsep SAP, BAS, Struktur APBD & ${topik}` : 'Kerangka Konseptual SAP (PP 71/2010), Bagan Akun Standar, dan Struktur APBD',
        sem: 1,
        elemen: 'Konsep Dasar Akuntansi Pemerintah, Regulasi SAP, dan Struktur APBD/APBDes',
        tps: [
          {
            teks: '[TP F.AL.1.1] menganalisis prinsip Standar Akuntansi Pemerintahan (SAP) berbasis akrual (LO) dan kas menuju akrual (LRA) serta struktur APBD',
            jp: 12,
            ind: 'Peserta didik dapat membedakan basis akrual pada Laporan Operasional/Neraca dengan basis kas pada Laporan Realisasi Anggaran.',
            r1: 'Belum memahami mengapa satu transaksi kas pemerintah memerlukan dua jurnal sekaligus (Jurnal LO dan Jurnal LRA).',
            r2: 'Dapat menyebutkan komponen Pendapatan, Belanja, dan Pembiayaan APBD dengan bantuan bagan.',
            r3: 'Mampu menganalisis struktur APBD, kodefikasi Bagan Akun Standar (BAS), dan mekanisme hubungan RK-PPKD dan RK-SKPD secara mandiri.',
            r4: 'Mampu menganalisis postur APBD daerah setempat serta mengevaluasi proporsi PAD terhadap dana transfer pusat.',
            teknik: 'Tes tertulis dan analisis dokumen APBD'
          }
        ]
      },
      {
        nama: 'Praktikum Akuntansi Pendapatan dan Belanja SKPD (Mekanisme UP, GU, TU, dan LS)',
        sem: 1,
        elemen: 'Akuntansi Pendapatan dan Belanja Satuan Kerja Perangkat Daerah (SKPD)',
        tps: [
          {
            teks: '[TP F.AL.2.1] menganalisis dokumen SPP, SPM, dan SP2D serta menjurnal transaksi Pendapatan Asli Daerah (PAD) pada SKPD',
            jp: 14,
            ind: 'Peserta didik dapat mencatat penerimaan pajak/retribusi daerah baik melalui bendahara penerimaan maupun setor langsung ke Kas Daerah.',
            r1: 'Masih keliru menggunakan akun Perubahan SAL pada saat menjurnal realisasi anggaran (LRA).',
            r2: 'Dapat menjurnal transaksi pendapatan SKPD dengan panduan tabel jurnal standar.',
            r3: 'Mampu mencatat transaksi pendapatan SKPD (penetapan SKP-Daerah dan penerimaan tunai) ke dalam Jurnal LO dan Jurnal LRA secara tepat dan mandiri.',
            r4: 'Mampu menyusun pembukuan Bendahara Penerimaan SKPD beserta Surat Tanda Setoran (STS) ke Rekening Kas Umum Daerah.',
            teknik: 'Praktik pembukuan SKPD dan dokumen SP2D'
          },
          {
            teks: '[TP F.AL.2.2] mencatat transaksi Belanja Operasi dan Belanja Modal SKPD melalui mekanisme Uang Persediaan (UP/GU/TU) dan Pembayaran Langsung (LS)',
            jp: 16,
            ind: 'Peserta didik dapat membuat jurnal finansial, jurnal anggaran, dan jurnal pengakuan aset tetap atas belanja modal LS.',
            r1: 'Lupa membuat jurnal pengakuan Aset Tetap bersamaan dengan realisasi Belanja Modal.',
            r2: 'Dapat mencatat pencairan SP2D-UP dan SP2D-LS dengan bimbingan guru.',
            r3: 'Mampu mencatat seluruh siklus belanja SKPD (UP, GU, TU, LS Gaji, dan LS Barang/Modal) secara akurat dan mandiri.',
            r4: 'Mampu memverifikasi pemotongan dan penyetoran pajak (PFK: PPN, PPh 21, PPh 22, PPh 23) oleh Bendahara Pengeluaran SKPD.',
            teknik: 'Uji praktik penjurnalan transaksi SKPD'
          }
        ]
      },
      {
        nama: 'Praktikum Akuntansi PPKD, Pembiayaan Daerah, dan Akuntansi Aset Tetap Pemda',
        sem: 1,
        elemen: 'Akuntansi Pejabat Pengelola Keuangan Daerah (PPKD) dan Pembiayaan Daerah',
        tps: [
          {
            teks: '[TP F.AL.3.1] mencatat transaksi PPKD (Dana Perimbangan/Transfer, Belanja Bantuan/Hibah, Pembiayaan Daerah) serta transaksi Aset Tetap Pemda',
            jp: 14,
            ind: 'Peserta didik dapat menjurnal penerimaan DAU/DAK, pencairan SP2D untuk SKPD pada buku PPKD, serta penyusutan dan konstruksi aset daerah.',
            r1: 'Masih tertukar antara pencatatan di buku SKPD (akun RK-PPKD) dan pencatatan di buku PPKD (akun RK-SKPD).',
            r2: 'Dapat menjurnal transaksi PPKD dengan bantuan skema hubungan timbal balik (resiprokal).',
            r3: 'Mampu mencatat transaksi akuntansi PPKD dan pengelolaan aset tetap pemerintah daerah secara tepat dan mandiri.',
            r4: 'Mampu menyusun jurnal konsolidasi penggabungan laporan keuangan SKPD dan PPKD menjadi Laporan Keuangan Pemda.',
            teknik: 'Praktik pembukuan PPKD dan konsolidasi'
          }
        ]
      },
      {
        nama: 'Penyusunan Laporan Keuangan Pemerintah Daerah (LRA, LO, LPE, dan Neraca) & SIPD RI',
        sem: 2,
        elemen: 'Penyusunan Laporan Keuangan Pemerintah Daerah (LRA, LO, LPE, Neraca, LPSAL, LAK)',
        tps: [
          {
            teks: '[TP F.AL.5.1] menyusun jurnal penyesuaian pemda, kertas kerja SKPD, serta menyajikan LRA, LO, Laporan Perubahan Ekuitas (LPE), dan Neraca sesuai alur SIPD RI',
            jp: 18,
            ind: 'Peserta didik dapat menyelesaikan worksheet SKPD dan menyusun 4 laporan keuangan pokok SKPD serta jurnal penutup LRA & LO.',
            r1: 'Belum dapat menghubungkan surplus/defisit-LO ke Laporan Perubahan Ekuitas dan Ekuitas di Neraca.',
            r2: 'Dapat menyusun LRA dan LO dengan format laporan standar SAP.',
            r3: 'Mampu menyajikan paket lengkap Laporan Keuangan SKPD (LRA, LO, LPE, Neraca) secara seimbang (balance) dan mandiri.',
            r4: 'Mampu mengevaluasi capaian realisasi anggaran terhadap pagu DPA serta mengidentifikasi penyebab terjadinya SiLPA.',
            teknik: 'Uji kompetensi laporan keuangan pemerintah daerah'
          }
        ]
      },
      {
        nama: 'Praktikum Pengelolaan dan Akuntansi Keuangan Desa (APBDes & Siskeudes 2.0)',
        sem: 2,
        elemen: 'Pengelolaan dan Praktikum Akuntansi Keuangan Desa (Permendagri 20/2018 & Siskeudes 2.0)',
        tps: [
          {
            teks: '[TP F.AL.6.1] menyusun dokumen penganggaran APBDes serta memproses penatausahaan Buku Kas Umum (BKU), Buku Pembantu Bank, dan Buku Pembantu Pajak Desa',
            jp: 16,
            ind: 'Peserta didik dapat mengklasifikasikan Pendapatan Desa (PADes, Dana Desa, ADD) dan 5 Bidang Belanja Desa serta mengisi BKU dan Buku Pajak Desa.',
            r1: 'Masih keliru mengklasifikasikan belanja desa ke dalam 5 bidang penyelenggaraan pemerintahan dan pembangunan desa.',
            r2: 'Dapat mengisi Buku Kas Umum Desa dengan panduan contoh transaksi.',
            r3: 'Mampu melaksanakan penatausahaan keuangan desa (SPP Desa, kuitansi, BKU, Buku Bank, Buku Pajak) secara tertib dan mandiri.',
            r4: 'Mampu menghitung kewajiban pemungutan PPN dan PPh Pasal 22/23 atas belanja pengadaan barang/jasa desa.',
            teknik: 'Praktik pembukuan bendahara desa'
          },
          {
            teks: '[TP F.AL.6.2] menyajikan Laporan Realisasi Pelaksanaan APBDes dan Laporan Kekayaan Milik Desa berbasis struktur aplikasi Siskeudes 2.0',
            jp: 14,
            ind: 'Peserta didik dapat menginput parameter data desa, penganggaran, penatausahaan, dan mencetak laporan keuangan desa.',
            r1: 'Belum memahami alur modul Penganggaran dan Penatausahaan pada sistem Siskeudes.',
            r2: 'Dapat mengikuti alur input transaksi desa dengan modul panduan Siskeudes.',
            r3: 'Mampu menyusun Laporan Realisasi APBDes dan Laporan Kekayaan Milik Desa secara akurat dan mandiri.',
            r4: 'Mampu merancang infografis transparansi APBDes (baliho informasi publik desa) yang akuntabel bagi masyarakat desa.',
            teknik: 'Proyek simulasi Siskeudes dan laporan APBDes'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 6. KOMPUTER AKUNTANSI (FASE F - KELAS XI & XII)
// Pembaruan Inspirasi Ruang GTK: Cloud Accounting (Accurate Online) & MYOB
// ============================================================================
function generateKomputerAkuntansi(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Setup Database Awal dan Konfigurasi Sistem Komputer Akuntansi (Cloud & Desktop)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menginstalasi dan menyiapkan data awal perusahaan baru pada aplikasi komputer akuntansi berbasis Cloud (Accurate Online / Jurnal.id) maupun Desktop (MYOB Accounting), mengatur periode akuntansi, mata uang, preferensi fitur perusahaan, serta mengonfigurasi kode pajak (PPN) dan akun keterkaitan (linked accounts).`
      },
      {
        elemen: 'Pengelolaan Bagan Akun (Chart of Accounts) dan Master Data Kartu',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menyusun, mengimpor, menghapus, dan mengedit daftar akun (Chart of Accounts), mengisi saldo awal neraca saldo, membuat kartu pelanggan (customer), kartu pemasok (vendor/supplier), kartu pegawai, serta memasukkan saldo awal piutang usaha dan saldo awal utang usaha.`
      },
      {
        elemen: 'Pengelolaan Kartu Persediaan Barang/Jasa dan Daftar Aset Tetap',
        teks: `Pada akhir Fase ${f}, peserta didik mampu membuat daftar barang dan jasa (item list), mengatur metode penilaian persediaan (Average / FIFO), mengisi kuantitas dan nilai saldo awal persediaan, serta mendaftarkan kategori aset tetap, aset tetap pajak, dan daftar aset tetap perusahaan.`
      },
      {
        elemen: 'Entri Transaksi Siklus Pembelian, Penjualan, dan Kas/Bank pada Perusahaan Jasa & Dagang',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengentri dokumen transaksi pembelian tunai/kredit, retur pembelian, pelunasan utang, penjualan tunai/kredit, retur penjualan, penerimaan pelunasan piutang, transaksi penerimaan kas/bank, pengeluaran kas/bank, dan kas kecil ke dalam modul komputer akuntansi.`
      },
      {
        elemen: 'Komputerisasi Akuntansi Perusahaan Manufaktur',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menyiapkan database perusahaan manufaktur, menyusun formula produk / Bill of Material (BOM), mengentri perintah kerja (work order), pengeluaran bahan baku, penyelesaian barang jadi (finished goods), dan pengalokasian biaya produksi pada aplikasi komputer akuntansi.`
      },
      {
        elemen: 'Rekonsiliasi Bank, Penyesuaian Akhir Periode, Pelaporan Keuangan, dan Backup Data',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memproses rekonsiliasi bank otomatis, mengentri jurnal penyesuaian akhir periode (proses akhir bulan / penyusutan otomatis), memeriksa kebenaran jurnal (audit trail), menampilkan dan mengekspor laporan keuangan (Laba Rugi, Neraca, Arus Kas), serta membuat file cadangan (backup data).`
      }
    ],
    units: [
      {
        nama: topik ? `Setup Database, COA, Master Data & ${topik}` : 'Setup Database Awal, Bagan Akun (COA), dan Master Data pada Cloud Accounting / MYOB',
        sem: 1,
        elemen: 'Setup Database Awal dan Konfigurasi Sistem Komputer Akuntansi (Cloud & Desktop)',
        tps: [
          {
            teks: '[TP F.KA.1.1] menyiapkan database perusahaan baru, periode akuntansi, kode pajak PPN, dan Linked Accounts pada Accurate Online / MYOB',
            jp: 12,
            ind: 'Peserta didik dapat membuat file database perusahaan tepat sesuai tahun fiskal dan mengatur linked accounts (akun kas, piutang, utang, potongan, PPN).',
            r1: 'Keliru memasukkan bulan konversi (conversion month) sehingga transaksi tidak dapat diinput pada bulan berjalan.',
            r2: 'Dapat membuat database awal dengan mengikuti panduan langkah kerja modul.',
            r3: 'Mampu melakukan setup database awal, konfigurasi pajak, dan linked accounts secara tepat dan mandiri.',
            r4: 'Mampu mengimpor seluruh master data (COA, Pelanggan, Pemasok, Barang) sekaligus dari file Excel ke dalam aplikasi.',
            teknik: 'Praktik laboratorium komputer akuntansi'
          },
          {
            teks: '[TP F.KA.2.1] menyusun daftar akun (Chart of Accounts), mengisi saldo awal akun, serta membuat kartu piutang, kartu utang, dan kartu persediaan',
            jp: 14,
            ind: 'Peserta didik dapat mengentri saldo awal neraca hingga Historical Balancing / Opening Balance Equity bernilai Rp 0.',
            r1: 'Saldo Historical Balancing / Opening Balance Equity belum bernilai Rp 0 karena kesalahan tanda minus pada akun kontra.',
            r2: 'Dapat menginput daftar akun dan saldo awal dengan bimbingan guru.',
            r3: 'Mampu menyusun COA, saldo awal neraca, kartu piutang, utang, dan persediaan hingga seimbang (saldo selisih Rp 0) secara mandiri.',
            r4: 'Mampu mendiagnosis penyebab selisih saldo awal antara buku besar dengan rincian kartu pembantu.',
            teknik: 'Uji praktik setup master data'
          }
        ]
      },
      {
        nama: 'Entri Transaksi Siklus Perusahaan Jasa dan Dagang Terkomputerisasi',
        sem: 1,
        elemen: 'Entri Transaksi Siklus Pembelian, Penjualan, dan Kas/Bank pada Perusahaan Jasa & Dagang',
        tps: [
          {
            teks: '[TP F.KA.4.1] mengentri transaksi siklus pembelian (pesanan, faktur pembelian, retur debet, dan pembayaran utang) serta transaksi kas keluar',
            jp: 16,
            ind: 'Peserta didik dapat menginput faktur pembelian kredit ber-PPN, memproses retur pembelian (Register/Apply to Purchase), dan pelunasan utang.',
            r1: 'Lupa mengaktifkan/mematikan opsi Tax Inclusive sehingga nilai PPN Masukan tidak sesuai dokumen faktur.',
            r2: 'Dapat mengentri faktur pembelian dan pengeluaran kas dengan petunjuk modul.',
            r3: 'Mampu mengentri seluruh variasi transaksi pembelian, retur, pelunasan utang, dan kas keluar secara cepat, tepat, dan mandiri.',
            r4: 'Mampu memperbaiki atau menghapus transaksi yang salah diinput serta memverifikasi jurnal yang terbentuk (Ctrl+R).',
            teknik: 'Praktik entri transaksi komputer akuntansi'
          },
          {
            teks: '[TP F.KA.4.2] mengentri transaksi siklus penjualan (faktur penjualan, penjualan tunai, retur kredit, penerimaan piutang) dan penerimaan kas/bank',
            jp: 16,
            ind: 'Peserta didik dapat menginput faktur penjualan, memproses potongan penjualan, retur penjualan (Apply to Sale), dan pelunasan piutang pelanggan.',
            r1: 'Masih keliru menginput denda keterlambatan (finance charge) atau potongan pelunasan piutang.',
            r2: 'Dapat mengentri transaksi penjualan dan penerimaan piutang dengan bimbingan.',
            r3: 'Mampu mengentri seluruh transaksi penjualan tunai/kredit, retur, dan penerimaan kas/bank secara akurat dan mandiri.',
            r4: 'Mampu mencetak faktur penjualan dan kuitansi digital langsung dari aplikasi komputer akuntansi.',
            teknik: 'Uji praktik entri transaksi dagang'
          }
        ]
      },
      {
        nama: 'Rekonsiliasi Bank, Jurnal Penyesuaian, Laporan Keuangan Digital, dan Backup Data',
        sem: 2,
        elemen: 'Rekonsiliasi Bank, Penyesuaian Akhir Periode, Pelaporan Keuangan, dan Backup Data',
        tps: [
          {
            teks: '[TP F.KA.6.1] memproses rekonsiliasi bank (Reconcile Accounts), mengentri jurnal penyesuaian akhir periode (Period End), dan mencetak laporan keuangan',
            jp: 16,
            ind: 'Peserta didik dapat melakukan rekonsiliasi bank hingga Out of Balance Rp 0, menginput penyesuaian di Record Journal Entry, dan mengekspor Laporan Laba Rugi, Neraca, dan Arus Kas.',
            r1: 'Nilai Out of Balance pada menu Reconcile Accounts belum nol saat mencocokkan rekening koran.',
            r2: 'Dapat menginput jurnal penyesuaian dan menampilkan laporan keuangan dengan panduan guru.',
            r3: 'Mampu menyelesaikan rekonsiliasi bank, penyesuaian akhir periode, ekspor laporan keuangan PDF/Excel, dan backup file (.zip) secara mandiri.',
            r4: 'Mampu melakukan proses tutup buku akhir tahun (Start a New Financial Year) dan mengamankan arsip database.',
            teknik: 'Simulasi UKK Komputer Akuntansi Perusahaan Dagang'
          }
        ]
      },
      {
        nama: 'Komputerisasi Akuntansi Perusahaan Manufaktur (Bill of Material & Proses Produksi)',
        sem: 2,
        elemen: 'Komputerisasi Akuntansi Perusahaan Manufaktur',
        tps: [
          {
            teks: '[TP F.KA.5.1] menyusun standar biaya produksi (Bill of Material / BOM), mengentri perintah kerja (Work Order), pengambilan bahan baku, dan penyelesaian produk jadi',
            jp: 18,
            ind: 'Peserta didik dapat mengoperasikan modul manufaktur/inventory assembly untuk memproses konversi bahan baku menjadi barang jadi serta menyajikan laporan HPP.',
            r1: 'Belum memahami cara menghubungkan kuantitas bahan baku dan biaya konversi ke dalam formula Bill of Material (BOM).',
            r2: 'Dapat menyusun Bill of Material dan menginput penyelesaian barang jadi dengan panduan modul.',
            r3: 'Mampu memproses siklus transaksi perusahaan manufaktur pada aplikasi komputer akuntansi hingga menghasilkan Laporan Keuangan secara mandiri.',
            r4: 'Mampu menganalisis laporan selisih biaya standar dan biaya aktual produksi pada sistem komputer akuntansi.',
            teknik: 'Proyek komputer akuntansi manufaktur'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 7. ADMINISTRASI PERPAJAKAN (FASE F - KELAS XI & XII)
// Pembaruan Inspirasi Ruang GTK: Coretax DJP (SIAP), TER PPh 21 & NIK-NPWP 16 Digit
// ============================================================================
function generateAdministrasiPerpajakan(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Ketentuan Umum dan Tata Cara Perpajakan (KUP) serta Sistem Coretax DJP',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami hak dan kewajiban Wajib Pajak, pendaftaran dan pemadanan NIK sebagai NPWP 16 digit, pengukuhan Pengusaha Kena Pajak (PKP), tata cara pembayaran/deposit pajak, pelaporan SPT, ketetapan pajak (SKPKB, SKPKBT, SKPLB, SKPN), serta alur administrasi pada Sistem Inti Administrasi Perpajakan (Coretax DJP / SIAP).`
      },
      {
        elemen: 'Pajak Penghasilan (PPh) Pasal 21/26 dan Metode Tarif Efektif Rata-rata (TER)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengidentifikasi subjek dan objek PPh Pasal 21/26, menentukan status PTKP dan kategori Tarif Efektif Rata-rata (TER A, TER B, TER C sesuai PP Nomor 58 Tahun 2023 & PMK Nomor 168 Tahun 2023), menghitung PPh Pasal 21 masa Januari–November dengan tarif TER dan masa pajak Desember dengan tarif Pasal 17 UU HPP, serta membuat bukti potong e-Bupot 21/26 dan SPT Masa PPh 21.`
      },
      {
        elemen: 'PPh Pemotongan/Pemungutan Unifikasi (Pasal 22, 23, 24, 26, dan Pasal 4 Ayat 2) serta PPh Final UMKM',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menghitung, memotong/memungut, menyetor, dan melaporkan PPh Pasal 22 (impor dan bendahara), PPh Pasal 23 (dividen, bunga, royalti, sewa, dan jasa), PPh Pasal 4 ayat (2) bersifat final, kredit pajak luar negeri PPh Pasal 24, angsuran PPh Pasal 25, serta PPh Final UMKM 0,5% (PP Nomor 55 Tahun 2022) termasuk batas omzet tidak kena pajak Rp500 juta bagi WP OP.`
      },
      {
        elemen: 'Rekonsiliasi Fiskal dan SPT Tahunan PPh Wajib Pajak Orang Pribadi (1770/1770S/1770SS)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis penghasilan neto dalam negeri (pekerjaan bebas, usaha, pekerjaan), penghasilan final dan non-objek pajak, daftar harta dan kewajiban, serta mengisi dan melaporkan SPT Tahunan PPh Wajib Pajak Orang Pribadi melalui portal Coretax DJP / DJP Online.`
      },
      {
        elemen: 'Rekonsiliasi Fiskal dan SPT Tahunan PPh Wajib Pajak Badan (Formulir 1771)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengidentifikasi beda tetap (permanent difference) dan beda waktu (temporary difference), menyusun kertas kerja rekonsiliasi fiskal dari laporan laba rugi komersial menjadi laba/rugi fiskal, menghitung PPh Badan terutang (tarif umum 22% dan fasilitas pengurangan tarif 50% Pasal 31E), menghitung kredit pajak dan angsuran PPh Pasal 25, serta mengisi SPT Tahunan PPh Badan.`
      },
      {
        elemen: 'Pajak Pertambahan Nilai (PPN), PPnBM, e-Faktur, dan SPT Masa PPN',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami mekanisme pengkreditan Pajak Masukan terhadap Pajak Keluaran sesuai UU HPP, menghitung PPN dan PPnBM dengan DPP Nilai Lain, menerbitkan Faktur Pajak elektronik (e-Faktur di Coretax DJP) beserta kode transaksi (01 s.d. 09), nota retur, serta menyusun dan melaporkan SPT Masa PPN.`
      }
    ],
    units: [
      {
        nama: topik ? `KUP, NIK-NPWP 16 Digit, Coretax DJP & ${topik}` : 'Ketentuan Umum Perpajakan (KUP), Integrasi NIK-NPWP 16 Digit, dan Sistem Coretax DJP',
        sem: 1,
        elemen: 'Ketentuan Umum dan Tata Cara Perpajakan (KUP) serta Sistem Coretax DJP',
        tps: [
          {
            teks: '[TP F.PJ.1.1] menganalisis sistem pemungutan pajak, alur pendaftaran NIK sebagai NPWP 16 digit, pengukuhan PKP, dan fitur portal Coretax DJP (SIAP)',
            jp: 10,
            ind: 'Peserta didik dapat memproses simulasi pemadanan NIK-NPWP, pembuatan kode billing/deposit pajak, dan memahami batas waktu setor serta lapor pajak.',
            r1: 'Belum hafal batas waktu penyetoran dan pelaporan SPT Masa maupun SPT Tahunan.',
            r2: 'Dapat menyebutkan jenis-jenis pajak pusat dan daerah serta fungsi NPWP dengan bantuan tabel.',
            r3: 'Mampu menganalisis ketentuan KUP, menghitung sanksi bunga/denda administrasi pajak, dan mensimulasikan alur Coretax DJP secara mandiri.',
            r4: 'Mampu menganalisis kasus pemeriksaan pajak (SKPKB/SKPLB) dan prosedur pengajuan keberatan atau banding pajak.',
            teknik: 'Tes tertulis dan simulasi portal Coretax DJP'
          }
        ]
      },
      {
        nama: 'Perhitungan dan Pelaporan PPh Pasal 21/26 Metode Tarif Efektif Rata-rata (TER PP 58/2023)',
        sem: 1,
        elemen: 'Pajak Penghasilan (PPh) Pasal 21/26 dan Metode Tarif Efektif Rata-rata (TER)',
        tps: [
          {
            teks: '[TP F.PJ.2.1] menghitung PPh Pasal 21 pegawai tetap masa Januari–November menggunakan Tabel TER (A, B, C) dan masa Desember dengan tarif Pasal 17 UU HPP',
            jp: 16,
            ind: 'Peserta didik dapat memetakan status PTKP ke kategori TER A/B/C, menghitung potongan PPh 21 bulanan, dan menghitung kurang/lebih potong pada bulan Desember.',
            r1: 'Masih keliru mengelompokkan status PTKP (TK/0, K/0, K/1, dst.) ke dalam Kategori TER A, B, atau C.',
            r2: 'Dapat menghitung PPh 21 masa Januari–November dengan tabel TER yang disediakan.',
            r3: 'Mampu menghitung PPh 21 pegawai tetap (masa Januari–November dengan TER dan rekalkulasi Desember Pasal 17) secara akurat dan mandiri.',
            r4: 'Mampu menghitung PPh Pasal 21 bagi pegawai tidak tetap, bukan pegawai, dewan komisaris, dan peserta kegiatan.',
            teknik: 'Praktik kertas kerja PPh 21 TER dan tes hitung'
          },
          {
            teks: '[TP F.PJ.2.2] menyusun Bukti Pemotongan PPh Pasal 21 bulanan dan Formulir 1721-A1/BPA1 serta SPT Masa PPh Pasal 21/26 melalui e-Bupot / Coretax DJP',
            jp: 12,
            ind: 'Peserta didik dapat mengisi bukti potong bulanan, bukti potong tahunan 1721-A1, dan rekapitulasi SPT Masa PPh 21.',
            r1: 'Belum tepat memindahkan rincian penghasilan bruto dan pengurang (biaya jabatan & iuran pensiun) ke formulir 1721-A1.',
            r2: 'Dapat mengisi formulir bukti potong 1721-A1 dengan panduan contoh pengisian.',
            r3: 'Mampu menyusun bukti potong e-Bupot 21/26 dan SPT Masa PPh Pasal 21 secara lengkap, tepat, dan mandiri.',
            r4: 'Mampu merekonsiliasi total beban gaji di laporan laba rugi dengan dasar pengenaan pajak pada SPT Masa PPh 21.',
            teknik: 'Praktik pengisian e-Bupot 21/26 dan SPT Masa'
          }
        ]
      },
      {
        nama: 'PPh Pemotongan/Pemungutan Unifikasi (PPh 22, 23, 4 Ayat 2) dan PPh Final UMKM (PP 55/2022)',
        sem: 1,
        elemen: 'PPh Pemotongan/Pemungutan Unifikasi (Pasal 22, 23, 24, 26, dan Pasal 4 Ayat 2) serta PPh Final UMKM',
        tps: [
          {
            teks: '[TP F.PJ.3.1] menghitung PPh Pasal 22 (impor/bendahara), PPh Pasal 23 (dividen, royalti, sewa, jasa), PPh Pasal 4 ayat (2), dan PPh Final UMKM 0,5% serta mengisi e-Bupot Unifikasi',
            jp: 16,
            ind: 'Peserta didik dapat menghitung PPh unifikasi, menerapkan batas omzet bebas pajak Rp500 juta bagi UMKM OP, dan membuat bukti potong unifikasi.',
            r1: 'Sering tertukar antara objek sewa tanah/bangunan (PPh Pasal 4 ayat 2 tarif 10%) dengan sewa harta selain tanah/bangunan (PPh Pasal 23 tarif 2%).',
            r2: 'Dapat menghitung PPh 22, 23, dan PPh Final UMKM dengan bantuan tabel tarif pajak.',
            r3: 'Mampu menghitung seluruh jenis PPh Unifikasi & PPh Final UMKM serta menyusun SPT Masa PPh Unifikasi secara mandiri.',
            r4: 'Mampu menganalisis dampak perpajakan jika transaksi dilakukan dengan lawan transaksi yang belum memiliki NPWP.',
            teknik: 'Studi kasus transaksi unifikasi dan tes tertulis'
          }
        ]
      },
      {
        nama: 'Rekonsiliasi Fiskal dan Pelaporan SPT Tahunan PPh WP Orang Pribadi & WP Badan',
        sem: 2,
        elemen: 'Rekonsiliasi Fiskal dan SPT Tahunan PPh Wajib Pajak Badan (Formulir 1771)',
        tps: [
          {
            teks: '[TP F.PJ.4.1] mengisi dan melaporkan SPT Tahunan PPh Wajib Pajak Orang Pribadi (1770, 1770S, 1770SS) untuk karyawan dan usahawan/pekerja bebas',
            jp: 14,
            ind: 'Peserta didik dapat menghitung PPh terutang WP OP (pencatatan NPPN maupun pembukuan), mengkreditkan bukti potong, dan mengisi lampiran harta/utang.',
            r1: 'Masih keliru memilih jenis formulir SPT (1770, 1770S, atau 1770SS) sesuai sumber penghasilan Wajib Pajak.',
            r2: 'Dapat mengisi SPT 1770S berdasarkan bukti potong 1721-A1 dengan bimbingan guru.',
            r3: 'Mampu menyusun SPT Tahunan PPh WP OP (1770 dan 1770S) secara lengkap, akurat, dan mandiri.',
            r4: 'Mampu menghitung PPh terutang gabungan suami-istri dengan status perpajakan Pisah Harta (PH) atau Memilih Terpisah (MT).',
            teknik: 'Praktik pengisian SPT Tahunan OP'
          },
          {
            teks: '[TP F.PJ.5.1] menyusun Kertas Kerja Rekonsiliasi Fiskal (koreksi fiskal positif & negatif), menghitung PPh Badan Pasal 31E, angsuran PPh 25, dan mengisi SPT 1771',
            jp: 18,
            ind: 'Peserta didik dapat mengidentifikasi biaya yang boleh dan tidak boleh dikurangkan (deductible vs non-deductible expense) serta menghitung PPh Badan Kurang/Lebih Bayar (Pasal 29/28A).',
            r1: 'Masih terbalik menentukan apakah suatu koreksi biaya mengakibatkan koreksi fiskal positif atau koreksi fiskal negatif.',
            r2: 'Dapat menyusun tabel rekonsiliasi fiskal dengan daftar pedoman koreksi fiskal.',
            r3: 'Mampu menyusun rekonsiliasi fiskal, menghitung PPh Badan Pasal 31E & angsuran PPh Pasal 25, serta mengisi SPT 1771 beserta lampirannya secara mandiri.',
            r4: 'Mampu menyelesaikan paket soal Uji Kompetensi Keahlian (UKK) Perpajakan Badan secara komprehensif.',
            teknik: 'Uji praktik Rekonsiliasi Fiskal dan SPT 1771'
          }
        ]
      },
      {
        nama: 'Administrasi PPN, PPnBM, Penerbitan e-Faktur Coretax, dan SPT Masa PPN',
        sem: 2,
        elemen: 'Pajak Pertambahan Nilai (PPN), PPnBM, e-Faktur, dan SPT Masa PPN',
        tps: [
          {
            teks: '[TP F.PJ.6.1] menganalisis kode transaksi Faktur Pajak (01–09), menghitung PPN Keluaran dan PPN Masukan (termasuk DPP Nilai Lain), serta menyusun SPT Masa PPN',
            jp: 16,
            ind: 'Peserta didik dapat menentukan kode faktur pajak (01, 02, 03, 04, 07, 08), memproses Faktur Pajak & Nota Retur, dan menghitung PPN Kurang Bayar / Lebih Bayar (kompensasi/restitusi).',
            r1: 'Masih keliru menentukan kode faktur pajak saat penyerahan BKP/JKP kepada Pemungut PPN (Bendahara Pemerintah / BUMN).',
            r2: 'Dapat menghitung PPN Keluaran dan PPN Masukan serta mengisi lampiran A dan B SPT PPN dengan panduan.',
            r3: 'Mampu mengadministrasikan e-Faktur di sistem Coretax dan menyusun SPT Masa PPN secara tepat dan mandiri.',
            r4: 'Mampu mengidentifikasi Faktur Pajak Masukan yang tidak dapat dikreditkan sesuai ketentuan Undang-Undang PPN & UU HPP.',
            teknik: 'Praktik simulasi e-Faktur dan SPT Masa PPN'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 8. PROJEK KREATIF DAN KEWIRAUSAHAAN (PKK) AKUNTANSI (FASE F - XI & XII)
// Inspirasi Ruang GTK Kemendikdasmen: Teaching Factory (TeFa) Jasa Akuntansi & UMKM
// ============================================================================
function generatePkkAkuntansi(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Peluang Usaha dan Perencanaan Bisnis Jasa Akuntansi / Keuangan & Produk UMKM',
        teks: `Pada akhir Fase ${f}, peserta didik mampu membaca peluang usaha dengan mengidentifikasi potensi di bidang layanan jasa pembukuan digital, asistensi perpajakan UMKM (Tax Center SMK / Teaching Factory), maupun usaha produk kreatif, menganalisis SWOT, menyusun Business Model Canvas (BMC), serta merancang proposal usaha yang layak.`
      },
      {
        elemen: 'Desain Layanan Jasa Keuangan / Produksi dan Perhitungan Harga Pokok (HPP & BEP)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menyusun Standar Operasional Prosedur (SOP) layanan jasa pembukuan/keuangan atau alur produksi barang, menghitung kebutuhan modal kerja, menghitung Harga Pokok Produksi / Harga Pokok Jasa, menentukan harga jual, serta menganalisis titik impas (Break Even Point / BEP) dan Return on Investment (ROI).`
      },
      {
        elemen: 'Pemasaran Digital, Pelayanan Pelanggan, dan Pengelolaan Transaksi E-Commerce / QRIS',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan strategi bauran pemasaran (marketing mix) dan pemasaran digital (media sosial, marketplace, Google Business), mempraktikkan negosiasi dan pelayanan prima kepada klien/pelanggan, serta mengelola sistem pembayaran digital (QRIS, e-wallet, virtual account, dan payment gateway).`
      },
      {
        elemen: 'Pembukuan Digital, Pelaporan Keuangan Usaha, dan Kepatuhan Pajak UMKM',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengelola administrasi bukti transaksi usaha, melakukan pembukuan harian menggunakan aplikasi akuntansi mobile/cloud (SIAPIK BI / BukuWarung / Accurate Lite / Spreadsheet), menyusun laporan laba rugi dan posisi keuangan sesuai SAK EMKM, serta menghitung pajak UMKM.`
      },
      {
        elemen: 'Evaluasi Kinerja Usaha, Hak Kekayaan Intelektual (HKI), dan Pengembangan Bisnis',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami perlindungan Hak Kekayaan Intelektual (merek usaha dan legalitas NIB OSS), mengevaluasi rasio profitabilitas dan arus kas usaha projek kewirausahaan, serta menyusun laporan pertanggungjawaban dan rencana pengembangan usaha berkelanjutan.`
      }
    ],
    units: [
      {
        nama: topik ? `Peluang Usaha Jasa Akuntansi, BMC & ${topik}` : 'Analisis Peluang Usaha Jasa Akuntansi/UMKM dan Penyusunan Business Model Canvas (BMC)',
        sem: 1,
        elemen: 'Peluang Usaha dan Perencanaan Bisnis Jasa Akuntansi / Keuangan & Produk UMKM',
        tps: [
          {
            teks: '[TP F.PKK.1.1] menganalisis peluang usaha jasa pembukuan/perpajakan UMKM (Teaching Factory) dan menyusun Business Model Canvas (BMC) serta analisis SWOT',
            jp: 12,
            ind: 'Peserta didik dapat memetakan 9 blok Business Model Canvas (BMC) dan menyusun proposal bisnis kreatif berbasis kompetensi akuntansi.',
            r1: 'Belum mampu merumuskan Value Proposition (keunggulan nilai) usaha yang membedakan dengan pesaing.',
            r2: 'Dapat mengisi 9 blok BMC dengan bantuan template dan contoh usaha.',
            r3: 'Mampu menganalisis peluang usaha dengan SWOT dan menyusun BMC serta proposal bisnis secara logis, kreatif, dan mandiri.',
            r4: 'Mampu mempresentasikan (pitching) proposal bisnis di hadapan tim penilai/mitra UMKM dengan meyakinkan.',
            teknik: 'Penilaian proyek BMC dan business pitching'
          }
        ]
      },
      {
        nama: 'Perencanaan Operasional, Perhitungan HPP, Penentuan Harga Jual, dan Analisis BEP',
        sem: 1,
        elemen: 'Desain Layanan Jasa Keuangan / Produksi dan Perhitungan Harga Pokok (HPP & BEP)',
        tps: [
          {
            teks: '[TP F.PKK.2.1] menyusun SOP layanan/produksi serta menghitung kebutuhan modal, HPP, harga jual (cost-plus pricing), BEP, dan proyeksi ROI',
            jp: 14,
            ind: 'Peserta didik dapat memisahkan biaya tetap (fixed cost) dan biaya variabel (variable cost) serta menghitung BEP dalam unit dan rupiah.',
            r1: 'Masih keliru memisahkan komponen biaya tetap dan biaya variabel saat menghitung titik impas (BEP).',
            r2: 'Dapat menghitung HPP dan BEP dengan menggunakan tabel rumus panduan.',
            r3: 'Mampu menyusun anggaran biaya, menghitung HPP, menetapkan harga jual yang kompetitif, dan menganalisis BEP secara mandiri.',
            r4: 'Mampu membuat simulasi analisis sensitivitas laba usaha pada berbagai skenario target volume penjualan.',
            teknik: 'Praktik perhitungan kelayakan finansial usaha'
          }
        ]
      },
      {
        nama: 'Eksekusi Usaha: Pemasaran Digital, Pelayanan Klien, dan Transaksi QRIS',
        sem: 1,
        elemen: 'Pemasaran Digital, Pelayanan Pelanggan, dan Pengelolaan Transaksi E-Commerce / QRIS',
        tps: [
          {
            teks: '[TP F.PKK.3.1] mempraktikkan pemasaran digital, layanan konsultasi/penjualan, dan pengelolaan transaksi pembayaran non-tunai (QRIS & e-commerce)',
            jp: 16,
            ind: 'Peserta didik dapat membuat konten promosi digital, melayani pesanan pelanggan/klien UMKM, dan merekap mutasi penerimaan pembayaran.',
            r1: 'Belum konsisten mendokumentasikan bukti transaksi penjualan dan mutasi pembayaran digital.',
            r2: 'Dapat menjalankan kegiatan pemasaran dan penjualan kelompok dengan arahan guru.',
            r3: 'Mampu menjalankan operasional pemasaran digital, pelayanan pelanggan, dan pencatatan transaksi QRIS secara aktif dan mandiri.',
            r4: 'Mampu menjalin kemitraan nyata dengan pelaku UMKM sekitar sekolah untuk layanan pendampingan pembukuan sederhana.',
            teknik: 'Observasi unjuk kerja proyek kewirausahaan'
          }
        ]
      },
      {
        nama: 'Pembukuan Digital Usaha (SIAPIK BI / Spreadsheet) dan Laporan Keuangan SAK EMKM',
        sem: 2,
        elemen: 'Pembukuan Digital, Pelaporan Keuangan Usaha, dan Kepatuhan Pajak UMKM',
        tps: [
          {
            teks: '[TP F.PKK.4.1] mencatat transaksi usaha projek menggunakan aplikasi akuntansi (SIAPIK BI / Spreadsheet) dan menyusun Laporan Keuangan sesuai SAK EMKM',
            jp: 16,
            ind: 'Peserta didik dapat menyajikan Laporan Laba Rugi, Laporan Posisi Keuangan, dan Catatan atas Laporan Keuangan dari usaha yang dijalankan.',
            r1: 'Masih mencampuradukkan uang pribadi anggota kelompok dengan kas usaha projek.',
            r2: 'Dapat mencatat kas masuk dan keluar usaha dengan template buku kas.',
            r3: 'Mampu menyelenggarakan pembukuan tertib menggunakan aplikasi digital dan menyusun laporan keuangan usaha berbasis SAK EMKM secara mandiri.',
            r4: 'Mampu membantu 1 pelaku UMKM binaan dalam menyusun laporan keuangan SAK EMKM untuk syarat pengajuan pembiayaan KUR.',
            teknik: 'Penilaian portofolio laporan keuangan usaha'
          }
        ]
      },
      {
        nama: 'Legalitas Usaha (NIB & HKI), Evaluasi Rasio Keuangan, dan Laporan Akhir Projek',
        sem: 2,
        elemen: 'Evaluasi Kinerja Usaha, Hak Kekayaan Intelektual (HKI), dan Pengembangan Bisnis',
        tps: [
          {
            teks: '[TP F.PKK.5.1] memahami prosedur perizinan NIB OSS & HKI serta mengevaluasi rasio profitabilitas (GPM, NPM, ROI) dan menyusun laporan pertanggungjawaban usaha',
            jp: 14,
            ind: 'Peserta didik dapat menghitung rasio margin laba usaha, mengevaluasi kendala operasional, dan mempresentasikan laporan akhir projek.',
            r1: 'Laporan akhir usaha belum disertai analisis perbandingan antara target anggaran dan realisasi laba.',
            r2: 'Dapat menyusun laporan hasil usaha dengan format kerangka laporan.',
            r3: 'Mampu mengevaluasi kinerja finansial usaha secara komprehensif dan menyajikan laporan pertanggungjawaban projek secara mandiri.',
            r4: 'Mampu merumuskan strategi pengembangan usaha (scaling up) dan inovasi layanan baru berdasarkan hasil evaluasi.',
            teknik: 'Sidang presentasi laporan akhir projek PKK'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 9. LAYANAN PERBANKAN (MAPEL PILIHAN FASE F - KELAS XI)
// Pembaruan Inspirasi Ruang GTK: Digital Banking, BI-FAST, QRIS & SLIK OJK
// ============================================================================
function generateLayananPerbankan(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Ekonomi Bisnis dan Administrasi Umum Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami masalah-masalah ekonomi, model dan pelaku ekonomi, perilaku konsumen dan produsen, terbentuknya harga pasar, peran Bank Sentral (BI), OJK, dan LPS dalam stabilitas sistem keuangan, serta menerapkan administrasi dan fungsi-fungsi manajemen operasional perbankan.`
      },
      {
        elemen: 'Pengelolaan Kas Kecil dan Operasional Kas Teller Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengelola kas kecil (petty cash) kantor bank, kas operasional teller, melayani transaksi setoran dan penarikan tunai, melakukan pemeriksaan keaslian fisik uang kertas rupiah dan valuta asing (metode 3D & sinar UV), memproses warkat kliring (cek dan bilyet giro), serta menyusun rekonsiliasi kas teller harian.`
      },
      {
        elemen: 'Layanan Lembaga Perbankan, Digital Banking (BI-FAST & QRIS), dan Analisis Kredit 5C',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan standar pelayanan prima (Service Excellence), prosedur Know Your Customer (KYC) / Customer Due Diligence (CDD) & APU-PPT dalam pembukaan rekening simpanan (tabungan, giro, deposito), mengoperasikan layanan perbankan digital (Mobile Banking, BI-FAST, QRIS, RTGS), melakukan analisis kelayakan kredit prinsip 5C dan pengecekan SLIK OJK, pengikatan agunan, serta layanan safe deposit box.`
      },
      {
        elemen: 'Akuntansi Perbankan (Pencatatan Simpanan, Kliring, Transfer, dan Kredit)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami siklus akuntansi perbankan (PAPI), mencatat transaksi penghimpunan dana masyarakat (tabungan, giro, deposito), transaksi lalu lintas pembayaran (kliring, BI-FAST, RTGS), transaksi antar-kantor (RAK), penyaluran kredit dan pencadangan CKPN, hingga penyusunan laporan keuangan bank.`
      },
      {
        elemen: 'Komputer Akuntansi dan Core Banking Layanan Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengoperasikan program spreadsheet dan aplikasi komputer akuntansi / simulasi Mini Core Banking untuk mengentri data CIF nasabah, memproses mutasi simpanan dan angsuran pinjaman (anuitas, flat, efektif), serta menyajikan neraca dan laporan laba rugi bank secara terkomputerisasi.`
      },
      {
        elemen: 'Perpajakan Jasa Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami dan menghitung kewajiban perpajakan di sektor perbankan meliputi PPh Final Pasal 4 ayat (2) atas bunga tabungan, bunga deposito, dan diskonto SBI, PPh Pasal 21 pegawai bank, PPh Pasal 23/26, dan PPN atas jasa perbankan tertentu, serta menyusun bukti potong dan SPT Masa.`
      }
    ],
    units: [
      {
        nama: topik ? `Arsitektur Perbankan, OJK, LPS & ${topik}` : 'Sistem Moneter, Regulasi BI-OJK-LPS, dan Manajemen Operasional Bank',
        sem: 1,
        elemen: 'Ekonomi Bisnis dan Administrasi Umum Perbankan',
        tps: [
          {
            teks: '[TP F.LP.1.1] menganalisis fungsi intermediasi perbankan, peran BI, OJK, dan LPS (penjaminan simpanan), serta tata kelola administrasi bank',
            jp: 10,
            ind: 'Peserta didik dapat menjelaskan syarat penjaminan simpanan LPS (3T) serta mengelola tata naskah dan arsip dokumen rekening nasabah.',
            r1: 'Belum memahami perbedaan kewenangan pengaturan dan pengawasan antara Bank Indonesia, OJK, dan LPS.',
            r2: 'Dapat menyebutkan fungsi bank dan syarat penjaminan LPS dengan bantuan modul.',
            r3: 'Mampu menganalisis peran lembaga perbankan, syarat penjaminan LPS, dan tata kelola administrasi bank secara mandiri.',
            r4: 'Mampu mengevaluasi dampak perubahan suku bunga acuan (BI-Rate) terhadap suku bunga simpanan dan kredit perbankan.',
            teknik: 'Tes tertulis dan analisis studi kasus moneter'
          }
        ]
      },
      {
        nama: 'Operasional Kas Teller, Deteksi Uang 3D/UV, Kliring, dan Transfer BI-FAST / RTGS',
        sem: 1,
        elemen: 'Pengelolaan Kas Kecil dan Operasional Kas Teller Perbankan',
        tps: [
          {
            teks: '[TP F.LP.2.1] mempraktikkan SOP layanan kas teller (setoran/penarikan tunai), verifikasi keaslian uang rupiah/valas (3D & UV), dan penutupan kas teller harian',
            jp: 14,
            ind: 'Peserta didik dapat menghitung uang tunai dengan cepat dan akurat, memverifikasi ciri keaslian uang rupiah, dan menyusun laporan mutasi kas teller.',
            r1: 'Masih terdapat selisih hitung uang fisik dan belum lancar mengoperasikan alat deteksi UV/mesin hitung uang.',
            r2: 'Dapat melayani transaksi setoran dan penarikan tunai dengan panduan slip dan pendampingan.',
            r3: 'Mampu melayani transaksi kas teller sesuai SOP dengan ramah, cepat, teliti (zero discrepancy), dan mandiri.',
            r4: 'Mampu menangani prosedur penemuan uang yang diragukan keasliannya serta transaksi pertukaran valuta asing (banknotes) dengan kurs beli/jual.',
            teknik: 'Simulasi unjuk kerja teller bank mini'
          },
          {
            teks: '[TP F.LP.2.2] memverifikasi keabsahan warkat kliring (cek dan bilyet giro) serta memproses transfer dana melalui BI-FAST, SKNBI, QRIS, dan RTGS',
            jp: 12,
            ind: 'Peserta didik dapat memeriksa syarat formal cek/bilyet giro, mengidentifikasi alasan tolakan kliring, dan memilih jalur transfer (BI-FAST vs RTGS).',
            r1: 'Belum dapat membedakan batasan nominal, biaya, dan waktu penyelesaian antara BI-FAST, SKNBI, dan BI-RTGS.',
            r2: 'Dapat memeriksa warkat cek dan bilyet giro dengan daftar periksa (checklist).',
            r3: 'Mampu memverifikasi warkat kliring dan memproses transaksi transfer dana BI-FAST serta RTGS secara tepat dan mandiri.',
            r4: 'Mampu menganalisis mekanisme sanksi penarikan cek/bilyet giro kosong dan Daftar Hitam Nasional (DHN) Bank Indonesia.',
            teknik: 'Praktik verifikasi warkat dan simulasi transfer'
          }
        ]
      },
      {
        nama: 'Layanan Customer Service (KYC & APU-PPT), Produk Simpanan, dan Analisis Kredit 5C & SLIK OJK',
        sem: 1,
        elemen: 'Layanan Lembaga Perbankan, Digital Banking (BI-FAST & QRIS), dan Analisis Kredit 5C',
        tps: [
          {
            teks: '[TP F.LP.3.1] mempraktikkan Service Excellence Customer Service, prosedur KYC/CDD & APU-PPT dalam pembukaan rekening tabungan, giro, dan deposito',
            jp: 14,
            ind: 'Peserta didik dapat melayani pembukaan rekening baru, pengisian CIF, aktivasi Mobile Banking/QRIS, dan penanganan keluhan nasabah.',
            r1: 'Tahapan verifikasi identitas nasabah (KYC) dan penjelasan fitur/biaya produk belum disampaikan secara lengkap.',
            r2: 'Dapat melayani nasabah dengan bantuan lembar dialog skenario Customer Service.',
            r3: 'Mampu mempraktikkan layanan Customer Service secara profesional, komunikatif, dan patuh prosedur KYC/APU-PPT secara mandiri.',
            r4: 'Mampu mengidentifikasi profil transaksi mencurigakan (red flag APU-PPT) dan menerapkan perlindungan konsumen jasa keuangan.',
            teknik: 'Role play Customer Service perbankan'
          },
          {
            teks: '[TP F.LP.3.2] menganalisis kelayakan permohonan kredit menggunakan prinsip 5C, pembacaan informasi debitur SLIK OJK, dan perhitungan tabel angsuran kredit',
            jp: 14,
            ind: 'Peserta didik dapat membaca status kolektibilitas SLIK OJK (Kol 1 s.d. Kol 5) serta menyusun jadwal angsuran kredit metode flat, efektif, dan anuitas.',
            r1: 'Belum memahami arti tingkat kolektibilitas kredit (Lancar, DPK, Kurang Lancar, Diragukan, Macet) pada laporan SLIK OJK.',
            r2: 'Dapat menghitung angsuran kredit bunga flat dengan panduan rumus.',
            r3: 'Mampu menyusun analisis kelayakan kredit 5C, membaca SLIK OJK, dan membuat tabel angsuran kredit (flat, efektif, anuitas) secara mandiri.',
            r4: 'Mampu menyusun nota rekomendasi kredit (Credit Proposal Memo) lengkap dengan analisis rasio kemampuan bayar (Repayment Capacity).',
            teknik: 'Studi kasus analisis kredit dan praktik spreadsheet'
          }
        ]
      },
      {
        nama: 'Akuntansi Perbankan, Simulasi Core Banking, dan Perpajakan Jasa Perbankan',
        sem: 2,
        elemen: 'Akuntansi Perbankan (Pencatatan Simpanan, Kliring, Transfer, dan Kredit)',
        tps: [
          {
            teks: '[TP F.LP.4.1] menjurnal transaksi penghimpunan dana, kliring, RAK antar-cabang, dan penyaluran kredit ke dalam sistem Akuntansi Perbankan hingga Laporan Keuangan Bank',
            jp: 18,
            ind: 'Peserta didik dapat mencatat mutasi rekening simpanan nasabah (liabilitas bank) dan kredit yang diberikan (aset bank) serta menyusun Neraca dan Laba Rugi Bank.',
            r1: 'Masih terbalik menjurnal setoran dan penarikan tabungan karena menyamakan sudut pandang bank dengan sudut pandang nasabah.',
            r2: 'Dapat menjurnal transaksi simpanan dan kredit dengan panduan bagan akun bank.',
            r3: 'Mampu mencatat transaksi operasional bank ke jurnal perbankan dan menyusun laporan keuangan bank secara tepat dan mandiri.',
            r4: 'Mampu menghitung rasio kesehatan bank meliputi LDR (Loan to Deposit Ratio), NPL, BOPO, dan CAR.',
            teknik: 'Praktik pembukuan akuntansi perbankan'
          },
          {
            teks: '[TP F.LP.5.1] mengoperasikan aplikasi Core Banking / Spreadsheet Perbankan serta menghitung PPh Final Pasal 4 ayat (2) atas bunga simpanan dan perpajakan bank',
            jp: 16,
            ind: 'Peserta didik dapat mengentri mutasi harian pada aplikasi bank mini serta menghitung potongan pajak bunga tabungan/deposito 20% (di atas Rp7.500.000).',
            r1: 'Masih memotong pajak bunga 20% atas saldo tabungan/deposito yang nilai pokoknya tidak melebihi Rp7.500.000.',
            r2: 'Dapat menghitung bunga bersih deposito setelah pajak dengan rumus panduan.',
            r3: 'Mampu mengoperasikan sistem komputer akuntansi perbankan dan menghitung serta melaporkan pajak bunga simpanan secara akurat dan mandiri.',
            r4: 'Mampu merancang otomasi buku tabungan, bilyet deposito, dan bukti potong PPh Pasal 4 ayat (2) pada aplikasi Bank Mini SMK.',
            teknik: 'Praktik komputer perbankan dan perhitungan pajak'
          }
        ]
      }
    ]
  };
}

// ============================================================================
// 10. LAYANAN PERBANKAN SYARIAH (MAPEL PILIHAN FASE F - KELAS XII)
// Pembaruan Inspirasi Ruang GTK: Penomoran Baru PSAK Syariah (401–410 eks 101–112)
// ============================================================================
function generatePerbankanSyariah(fase: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Fiqih Muamalah, Regulasi Bank Syariah, dan Tata Kelola Syariah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami landasan hukum fiqih muamalah ekonomi Islam, larangan transaksi yang mengandung unsur riba, maysir, gharar, tadlis, dan dharar, kedudukan fatwa Dewan Syariah Nasional MUI (DSN-MUI), peran pengawasan Dewan Pengawas Syariah (DPS), serta regulasi perbankan syariah oleh OJK dan Bank Indonesia.`
      },
      {
        elemen: 'Operasional Kas Teller Syariah, Islamic Customer Service, dan Dana Kebajikan (ZISWAF)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan standar Islamic Service Excellence (akhlak pelayanan shiddiq, amanah, fathanah, tabligh), prosedur KYC/CDD pembukaan rekening syariah, operasional kas teller syariah, transaksi perbankan digital syariah, serta pengelolaan dana kebajikan (Qardhul Hasan) dan penghimpunan/penyaluran ZISWAF (Zakat, Infaq, Shadaqah, dan Wakaf Uang).`
      },
      {
        elemen: 'Produk Penghimpunan Dana Bank Syariah (Akad Wadiah dan Mudharabah)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memproses administrasi pembukaan, mutasi, dan penutupan rekening tabungan dan giro syariah berbasis akad Wadiah Yad Dhamanah, penempatan deposito dan tabungan investasi berbasis akad Mudharabah Mutlaqah dan Mudharabah Muqayyadah, serta menghitung distribusi bagi hasil (nisbah) dengan metode Revenue Sharing dan Profit Sharing.`
      },
      {
        elemen: 'Produk Pembiayaan Bank Syariah (Murabahah, Salam, Istishna, Mudharabah, Musyarakah, Ijarah)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis kelayakan pembiayaan syariah (5C + 1S Sharia Compliance), mensimulasikan pembiayaan jual beli (Murabahah, Salam, Istishna'), pembiayaan kerja sama bagi hasil (Mudharabah, Musyarakah, dan Musyarakah Mutanaqishah / MMQ), pembiayaan sewa (Ijarah dan Ijarah Muntahiya Bittamlik / IMBT), serta jasa perbankan syariah (Wakalah, Kafalah, Hawalah, Rahn, dan Sharf).`
      },
      {
        elemen: 'Akuntansi Perbankan Syariah (PSAK Syariah 401–410 / eks PSAK 101–112)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan Kerangka Dasar Penyusunan dan Penyajian Laporan Keuangan Syariah (KDPPLKS) serta standar akuntansi transaksi syariah berdasarkan penomoran baru SAK Indonesia (PSAK 401 Penyajian Laporan Keuangan Syariah eks PSAK 101, PSAK 402 Murabahah eks PSAK 102, PSAK 403 Salam, PSAK 404 Istishna, PSAK 405 Mudharabah, PSAK 406 Musyarakah, PSAK 407 Ijarah, dan PSAK 409 ZIS), mencatat jurnal umum, buku besar, dana syirkah temporer, dan penyesuaian margin/bagi hasil.`
      },
      {
        elemen: 'Komputer Akuntansi dan Pelaporan Keuangan Bank Syariah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengoperasikan aplikasi spreadsheet dan software komputer akuntansi perbankan syariah untuk memproses transaksi penghimpunan dana dan pembiayaan, serta menyajikan Laporan Posisi Keuangan Syariah, Laporan Laba Rugi, Laporan Rekonsiliasi Pendapatan dan Bagi Hasil, Laporan Sumber dan Penggunaan Dana Zakat, serta Laporan Sumber dan Penggunaan Dana Kebajikan.`
      }
    ],
    units: [
      {
        nama: topik ? `Fiqih Muamalah, Fatwa DSN-MUI & ${topik}` : 'Prinsip Fiqih Muamalah, Larangan Riba-Maysir-Gharar, dan Peran DPS / DSN-MUI',
        sem: 1,
        elemen: 'Fiqih Muamalah, Regulasi Bank Syariah, dan Tata Kelola Syariah',
        tps: [
          {
            teks: '[TP F.LPS.1.1] menganalisis perbedaan fundamental sistem bunga konvensional dengan prinsip bagi hasil syariah serta identifikasi unsur Riba, Maysir, Gharar, dan Zalim',
            jp: 10,
            ind: 'Peserta didik dapat membedakan skema bunga dan bagi hasil serta mengidentifikasi bentuk-bentuk transaksi yang dilarang dalam muamalah keuangan.',
            r1: 'Belum mampu menjelaskan perbedaan mendasar antara penetapan bunga di muka dengan nisbah bagi hasil.',
            r2: 'Dapat menyebutkan pengertian riba, maysir, dan gharar beserta contohnya dengan panduan modul.',
            r3: 'Mampu menganalisis perbedaan operasional bank syariah dan bank konvensional serta mengidentifikasi transaksi MAGHRIB (Maysir, Gharar, Riba) secara mandiri.',
            r4: 'Mampu menelaah kesesuaian suatu produk keuangan digital modern terhadap fatwa Dewan Syariah Nasional MUI (DSN-MUI).',
            teknik: 'Tes tertulis dan analisis studi kasus muamalah'
          },
          {
            teks: '[TP F.LPS.2.1] mempraktikkan layanan Islamic Customer Service, operasional Teller Syariah, serta pengelolaan dana kebajikan (Qardhul Hasan) dan ZISWAF',
            jp: 12,
            ind: 'Peserta didik dapat menunjukkan etika pelayanan islami, menjelaskan rukun akad kepada nasabah, dan melayani transaksi kas serta penerimaan zakat/wakaf.',
            r1: 'Penjelasan pilihan akad (Wadiah vs Mudharabah) kepada calon nasabah masih belum tepat.',
            r2: 'Dapat mempraktikkan pelayanan pembukaan rekening syariah dengan panduan skenario ijab kabul.',
            r3: 'Mampu mempraktikkan layanan CS dan Teller Syariah beserta penjelasan akad secara fasih, santun, amanah, dan mandiri.',
            r4: 'Mampu merancang program penghimpunan dan penyaluran dana ZISWAF produktif serta Qardhul Hasan bagi pelaku usaha ultra mikro.',
            teknik: 'Role play pelayanan bank mini syariah'
          }
        ]
      },
      {
        nama: 'Penghimpunan Dana Syariah (Wadiah & Mudharabah) dan Perhitungan Distribusi Bagi Hasil',
        sem: 1,
        elemen: 'Produk Penghimpunan Dana Bank Syariah (Akad Wadiah dan Mudharabah)',
        tps: [
          {
            teks: '[TP F.LPS.3.1] mengelola administrasi tabungan/giro akad Wadiah Yad Dhamanah dan deposito investasi akad Mudharabah serta menghitung distribusi bagi hasil (Revenue Sharing)',
            jp: 16,
            ind: 'Peserta didik dapat menghitung saldo rata-rata harian (SRRH), porsi bagi hasil nasabah berdasarkan nisbah, Equivalent Rate, dan potongan pajak bagi hasil.',
            r1: 'Masih keliru menerapkan rumus distribusi bagi hasil berdasarkan Saldo Rata-Rata Harian (SRRH) dan nisbah yang disepakati.',
            r2: 'Dapat menghitung bagi hasil deposito mudharabah dengan tabel rumus terbimbing.',
            r3: 'Mampu mengelola administrasi simpanan syariah dan menghitung tabel distribusi hasil usaha (nisbah revenue sharing) secara akurat dan mandiri.',
            r4: 'Mampu membandingkan simulasi bagi hasil metode Revenue Sharing dengan metode Profit & Loss Sharing.',
            teknik: 'Praktik perhitungan distribusi bagi hasil (nisbah)'
          }
        ]
      },
      {
        nama: 'Pembiayaan Jual Beli (Murabahah, Salam, Istishna), Bagi Hasil (Musyarakah/MMQ), dan Sewa (Ijarah/IMBT)',
        sem: 1,
        elemen: 'Produk Pembiayaan Bank Syariah (Murabahah, Salam, Istishna, Mudharabah, Musyarakah, Ijarah)',
        tps: [
          {
            teks: '[TP F.LPS.4.1] menyusun simulasi pembiayaan jual beli Murabahah (termasuk Murabahah bil Wakalah), Salam, dan Istishna beserta jadwal angsuran',
            jp: 16,
            ind: 'Peserta didik dapat menghitung harga perolehan, margin keuntungan yang disepakati, diskon pemasok, uang muka (urbun), dan jadwal angsuran piutang murabahah.',
            r1: 'Belum memahami ketentuan bahwa margin murabahah yang telah disepakati dalam akad tidak boleh berubah naik selama masa pembiayaan.',
            r2: 'Dapat menghitung harga jual murabahah dan angsuran bulanan dengan rumus panduan.',
            r3: 'Mampu menyusun simulasi akad dan perhitungan pembiayaan Murabahah, Salam, dan Istishna secara tepat dan mandiri.',
            r4: 'Mampu menganalisis perlakuan akuntansi dan syariah atas potongan pelunasan dipercepat (muqasah) dan denda keterlambatan (ta’zir untuk dana sosial).',
            teknik: 'Simulasi akad pembiayaan dan uji hitung'
          },
          {
            teks: '[TP F.LPS.4.2] menganalisis skema pembiayaan kemitraan (Mudharabah, Musyarakah, MMQ), pembiayaan sewa (Ijarah & IMBT), serta jasa Rahn dan Wakalah',
            jp: 14,
            ind: 'Peserta didik dapat menghitung pembagian hasil usaha kemitraan Musyarakah, angsuran kepemilikan bertahap MMQ, dan biaya ujrah Ijarah/gadai emas (Rahn).',
            r1: 'Masih tertukar antara ketentuan pembagian keuntungan (sesuai nisbah) dan pembagian kerugian (sesuai porsi modal) pada akad Musyarakah.',
            r2: 'Dapat menghitung bagi hasil Musyarakah dan ujrah Ijarah dengan bantuan lembar kerja.',
            r3: 'Mampu menganalisis kelayakan 5C+1S dan menghitung skema pembiayaan Mudharabah, Musyarakah, IMBT, dan Rahn secara mandiri.',
            r4: 'Mampu merancang skema pembiayaan kepemilikan rumah syariah (KPR Syariah) dengan perbandingan akad Murabahah vs Musyarakah Mutanaqishah (MMQ).',
            teknik: 'Studi kasus pembiayaan syariah dan tes tertulis'
          }
        ]
      },
      {
        nama: 'Akuntansi Transaksi Perbankan Syariah (PSAK 401–410 eks PSAK 101–112) & Laporan Keuangan Syariah',
        sem: 2,
        elemen: 'Akuntansi Perbankan Syariah (PSAK Syariah 401–410 / eks PSAK 101–112)',
        tps: [
          {
            teks: '[TP F.LPS.5.1] mencatat jurnal transaksi penghimpunan dana Wadiah & Dana Syirkah Temporer (Mudharabah) serta transaksi pembiayaan sesuai PSAK Syariah 401–410 (eks PSAK 101–112)',
            jp: 18,
            ind: 'Peserta didik dapat menjurnal perolehan aset murabahah, pengakuan piutang murabahah, margin murabahah tangguhan (PSAK 402/102), dan investasi mudharabah/musyarakah (PSAK 405/406).',
            r1: 'Masih keliru mengklasifikasikan akun Dana Syirkah Temporer ke dalam kelompok Liabilitas biasa pada neraca bank syariah.',
            r2: 'Dapat menjurnal transaksi murabahah dan simpanan syariah dengan daftar akun standar bank syariah.',
            r3: 'Mampu mencatat jurnal transaksi perbankan syariah sesuai PSAK 401–410 (eks PSAK 101–112) secara akurat dan mandiri.',
            r4: 'Mampu menghitung dan menjurnal amortisasi margin murabahah tangguhan serta penyisihan penghapusan aset produktif (PPAP) syariah.',
            teknik: 'Praktik penjurnalan akuntansi bank syariah'
          },
          {
            teks: '[TP F.LPS.6.1] mengoperasikan aplikasi spreadsheet/komputer akuntansi syariah untuk menyajikan Laporan Keuangan Bank Syariah lengkap sesuai PSAK 401 (eks PSAK 101)',
            jp: 16,
            ind: 'Peserta didik dapat menyusun Laporan Posisi Keuangan (Aset = Liabilitas + Dana Syirkah Temporer + Ekuitas), Laporan Laba Rugi, Laporan Dana Zakat, dan Laporan Dana Kebajikan.',
            r1: 'Struktur Laporan Posisi Keuangan belum memisahkan kelompok Dana Syirkah Temporer dari Liabilitas dan Ekuitas.',
            r2: 'Dapat menyusun Laporan Posisi Keuangan dan Laba Rugi Syariah dengan template PSAK 401 (eks PSAK 101).',
            r3: 'Mampu menyajikan paket lengkap Laporan Keuangan Bank Syariah termasuk Laporan Dana Zakat dan Dana Kebajikan secara seimbang dan mandiri.',
            r4: 'Mampu menganalisis rasio kinerja keuangan bank syariah meliputi NPF (Non-Performing Financing), FDR (Financing to Deposit Ratio), dan ROA.',
            teknik: 'Proyek penyusunan laporan keuangan bank syariah terkomputerisasi'
          }
        ]
      }
    ]
  };
}
