export interface CurriculumUnit {
  nama: string;
  sem: number;
  elemen: string;
  tps: Array<{
    teks: string;
    jp: number;
    ind: string;
    r1: string;
    r2: string;
    r3: string;
    r4: string;
    teknik: string;
  }>;
}

export interface CurriculumResponse {
  cp: Array<{ elemen: string; teks: string }>;
  units: CurriculumUnit[];
  isFallback?: boolean;
}

export interface AklSubjectMeta {
  id: string;
  nama: string;
  shortName: string;
  fase: string;
  kelas: string;
  tingkat: 'Kelas X' | 'Kelas XI' | 'Kelas XII' | 'Kelas XI & XII';
  kategori: 'Fase E (Dasar Kejuruan)' | 'Fase F (Konsentrasi Keahlian)' | 'Fase F (Mata Pelajaran Pilihan)';
  deskripsi: string;
  icon: string;
  tag: string;
}

export const AKL_SUBJECTS_CATALOG: AklSubjectMeta[] = [
  // Fase E
  {
    id: 'dasar-akl',
    nama: 'Dasar-Dasar Akuntansi dan Keuangan Lembaga',
    shortName: 'Dasar-Dasar AKL',
    fase: 'E',
    kelas: 'X',
    tingkat: 'Kelas X',
    kategori: 'Fase E (Dasar Kejuruan)',
    deskripsi: 'Fondasi kejuruan AKL: Proses bisnis, perkembangan teknologi/fintech, profil profesi & technopreneur, K3LH, prinsip dasar akuntansi, dan spreadsheet keuangan (7 Elemen BSKAP 046/H/KR/2025).',
    icon: '📊',
    tag: 'Fase E · Dasar Kejuruan'
  },
  // Fase F Konsentrasi Keahlian
  {
    id: 'konsentrasi-akl',
    nama: 'Konsentrasi Keahlian Akuntansi dan Keuangan Lembaga',
    shortName: 'Konsentrasi AKL (Inti)',
    fase: 'F',
    kelas: 'XI',
    tingkat: 'Kelas XI & XII',
    kategori: 'Fase F (Konsentrasi Keahlian)',
    deskripsi: 'Paket keahlian inti komprehensif: Akuntansi Jasa Dagang Manufaktur, Akuntansi Keuangan, Akuntansi Lembaga Pemerintah, Komputer Akuntansi, dan Perpajakan.',
    icon: '💼',
    tag: 'Fase F · Konsentrasi Inti'
  },
  {
    id: 'praktikum-jasa-dagang-manufaktur',
    nama: 'Praktikum Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
    shortName: 'Praktikum Jasa, Dagang & Manufaktur',
    fase: 'F',
    kelas: 'XI',
    tingkat: 'Kelas XI & XII',
    kategori: 'Fase F (Konsentrasi Keahlian)',
    deskripsi: 'Siklus lengkap bukti transaksi, jurnal khusus, kartu persediaan, worksheet, laporan keuangan SAK EMKM/ETAP, hingga harga pokok pesanan dan proses manufaktur.',
    icon: '🏭',
    tag: 'Fase F · Praktikum Akuntansi'
  },
  {
    id: 'akuntansi-keuangan',
    nama: 'Akuntansi Keuangan',
    shortName: 'Akuntansi Keuangan',
    fase: 'F',
    kelas: 'XI',
    tingkat: 'Kelas XI & XII',
    kategori: 'Fase F (Konsentrasi Keahlian)',
    deskripsi: 'Pengelolaan pos-pos neraca: Kas kecil & bank, piutang & wesel, kartu persediaan (FIFO/Average), aset tetap & depresiasi, utang lancar/obligasi, serta ekuitas PT & Koperasi.',
    icon: '💰',
    tag: 'Fase F · Keuangan Lembaga'
  },
  {
    id: 'akuntansi-lembaga-pemerintah',
    nama: 'Praktikum Akuntansi Lembaga / Instansi Pemerintah',
    shortName: 'Akuntansi Lembaga / Pemda',
    fase: 'F',
    kelas: 'XII',
    tingkat: 'Kelas XI & XII',
    kategori: 'Fase F (Konsentrasi Keahlian)',
    deskripsi: 'Standar Akuntansi Pemerintahan (SAP Akrual PP 71/2010), tata kelola APBD & APBDes, jurnal finansial (LO), jurnal anggaran (LRA), dan laporan keuangan SKPD/PPKD.',
    icon: '🏛️',
    tag: 'Fase F · Sektor Publik & Pemda'
  },
  {
    id: 'komputer-akuntansi',
    nama: 'Komputer Akuntansi',
    shortName: 'Komputer Akuntansi (MYOB/Accurate)',
    fase: 'F',
    kelas: 'XI',
    tingkat: 'Kelas XI & XII',
    kategori: 'Fase F (Konsentrasi Keahlian)',
    deskripsi: 'Pengoperasian software akuntansi industri: Setup bagan akun, master data mitra & inventori, pemrosesan transaksi terkomputerisasi, rekonsiliasi, hingga laporan keuangan digital.',
    icon: '💻',
    tag: 'Fase F · Software Industri'
  },
  {
    id: 'perpajakan',
    nama: 'Administrasi Perpajakan',
    shortName: 'Perpajakan',
    fase: 'F',
    kelas: 'XII',
    tingkat: 'Kelas XI & XII',
    kategori: 'Fase F (Konsentrasi Keahlian)',
    deskripsi: 'Ketentuan Umum Perpajakan (KUP), PPh 21 tarif efektif (TER), PPh Badan, PPh Final PP 55, PPN 11%/12%, e-Faktur, e-Bupot Unifikasi, dan pelaporan SPT via DJP Online.',
    icon: '🧾',
    tag: 'Fase F · Perpajakan Indonesia'
  },
  // Fase F Mata Pelajaran Pilihan
  {
    id: 'layanan-perbankan',
    nama: 'Layanan Perbankan',
    shortName: 'Layanan Perbankan (Pilihan XI)',
    fase: 'F',
    kelas: 'XI',
    tingkat: 'Kelas XI',
    kategori: 'Fase F (Mata Pelajaran Pilihan)',
    deskripsi: 'Ekonomi bisnis, pengelolaan kas teller 3D, customer service & KYC, akuntansi simpanan/kredit/kliring, core banking, serta perpajakan bunga bank (BSKAP 046/H/KR/2025).',
    icon: '🏦',
    tag: 'Fase F · Mapel Pilihan XI'
  },
  {
    id: 'layanan-perbankan-syariah',
    nama: 'Layanan Perbankan Syariah',
    shortName: 'Layanan Perbankan Syariah (Pilihan XII)',
    fase: 'F',
    kelas: 'XII',
    tingkat: 'Kelas XII',
    kategori: 'Fase F (Mata Pelajaran Pilihan)',
    deskripsi: 'Fiqih muamalah, DPS & fatwa DSN-MUI, teller islami, penghimpunan Wadiah & Mudharabah, pembiayaan Murabahah/Musyarakah/Ijarah, PSAK Syariah 101-112, dan ZISWAF.',
    icon: '🌙',
    tag: 'Fase F · Mapel Pilihan XII'
  }
];

// 1. Dasar-Dasar Akuntansi dan Keuangan Lembaga (Fase E - Kelas X SMK)
export function generateDasarAklCurriculum(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Proses Bisnis di Bidang Akuntansi dan Keuangan Lembaga',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami tahapan proses bisnis di bidang akuntansi dan keuangan lembaga secara menyeluruh pada perusahaan jasa, perusahaan dagang, dan perusahaan manufaktur.'
      },
      {
        elemen: 'Perkembangan Teknologi dan Isu Global Finansial',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami perkembangan teknologi di industri dan dunia kerja serta isu-isu global di bidang akuntansi, digitalisasi keuangan (fintech), sistem pembayaran digital, dan artificial intelligence dalam akuntansi.'
      },
      {
        elemen: 'Profil Entrepreneur dan Peluang Kerja (Job Profile)',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami profil pekerjaan/profesi (job profile) akuntan, jenjang karir teknisi akuntansi, peluang wirausaha (technopreneur) di bidang akuntansi, serta kesiapan memasuki dunia kerja.'
      },
      {
        elemen: 'Lingkup Kerja, Etika Profesi, dan K3LH',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami lingkup kerja akuntansi, etika profesi Ikatan Akuntan Indonesia (IAI), integritas, serta penerapan Keselamatan dan Kesehatan Kerja Lingkungan Hidup (K3LH) dan budaya kerja industri 5S/5R.'
      },
      {
        elemen: 'Prinsip Dasar Akuntansi dan Perbankan Dasar',
        teks: 'Pada akhir Fase E, peserta didik mampu memahami prinsip-prinsip akuntansi, asumsi dasar akuntansi, persamaan dasar akuntansi, analisis bukti transaksi keuangan, konsep debit-kredit, serta prinsip-prinsip operasional perbankan dasar.'
      },
      {
        elemen: 'Penggunaan Aplikasi Pengolah Angka (Spreadsheet)',
        teks: 'Pada akhir Fase E, peserta didik mampu mengoperasikan aplikasi pengolah angka (spreadsheet), mengolah data menggunakan fungsi matematika, statistik, logika, dan finansial, serta membuat format tabel laporan keuangan terotomatisasi.'
      }
    ],
    units: [
      {
        nama: topik ? `Proses Bisnis, K3LH, Etika & ${topik}` : 'Proses Bisnis, Etika Profesi, dan K3LH Bidang Akuntansi',
        sem: 1,
        elemen: 'Proses Bisnis di Bidang Akuntansi dan Keuangan Lembaga',
        tps: [
          {
            teks: 'menjelaskan alur proses bisnis bidang akuntansi pada entitas perusahaan jasa, dagang, dan manufaktur',
            jp: 8,
            ind: 'Peserta didik dapat menguraikan siklus transaksi operasional dari pengadaan hingga pelaporan keuangan.',
            r1: 'Belum mampu membedakan alur transaksi perusahaan dagang dan manufaktur.',
            r2: 'Dapat menjelaskan alur bisnis dengan bantuan diagram alur siklus.',
            r3: 'Mampu menjelaskan proses bisnis akuntansi secara runtut, logis, dan mandiri.',
            r4: 'Mampu mengaitkan proses bisnis akuntansi dengan studi kasus nyata di dunia usaha dan dunia industri (DUDI).',
            teknik: 'Tes tertulis dan presentasi kelompok'
          },
          {
            teks: 'menerapkan prinsip etika profesi akuntan (integritas, objektivitas) dan SOP K3LH di tempat kerja',
            jp: 8,
            ind: 'Peserta didik dapat menerapkan prinsip kerahasiaan data, integritas kerja, serta ergonomi duduk di meja komputer.',
            r1: 'Belum memahami prinsip kerahasiaan dan pentingnya integritas dalam pembukuan.',
            r2: 'Dapat menyebutkan kode etik akuntan dengan panduan teks buku.',
            r3: 'Mampu menunjukkan perilaku kerja beretika dan menerapkan standar K3LH secara mandiri dan disiplin.',
            r4: 'Mampu menganalisis dilema etika profesi akuntansi (pencegahan manipulasi laporan keuangan).',
            teknik: 'Observasi sikap dan studi kasus etika'
          }
        ]
      },
      {
        nama: 'Perkembangan Fintech, Karir Akuntan, dan Spreadsheet',
        sem: 1,
        elemen: 'Penggunaan Aplikasi Pengolah Angka (Spreadsheet)',
        tps: [
          {
            teks: 'menganalisis perkembangan teknologi finansial (Fintech), e-money, dan peluang karir teknisi akuntansi junior',
            jp: 8,
            ind: 'Peserta didik dapat menjelaskan evolusi pencatatan manual ke cloud accounting serta merancang profil karir masa depan.',
            r1: 'Belum memahami peran teknologi digital dalam otomasi akuntansi.',
            r2: 'Dapat menyebutkan jenis-jenis dompet digital dan software akuntansi.',
            r3: 'Mampu menganalisis peluang karir dan transformasi digital akuntansi secara mandiri.',
            r4: 'Mampu merumuskan rencana pengembangan diri (roadmap karir) sebagai calon teknisi akuntansi profesional.',
            teknik: 'Portofolio karir dan diskusi'
          },
          {
            teks: 'mengoperasikan aplikasi spreadsheet dengan rumus formula (SUM, AVERAGE, IF, VLOOKUP, HLOOKUP) untuk data keuangan',
            jp: 16,
            ind: 'Peserta didik dapat membuat tabel daftar gaji, rekapitulasi penjualan, dan laporan keuangan sederhana berbasis formula spreadsheet.',
            r1: 'Sering keliru menuliskan sintaks formula logika IF bertingkat dan VLOOKUP.',
            r2: 'Dapat menggunakan fungsi penjumlahan dan rata-rata dengan bantuan rumus acuan.',
            r3: 'Mampu mengoperasikan formula spreadsheet secara tepat, rapi, dan mandiri.',
            r4: 'Mampu merancang lembar kerja akuntansi interaktif dengan validasi data dan formula terotomatisasi penuh.',
            teknik: 'Praktik komputer spreadsheet'
          }
        ]
      },
      {
        nama: 'Persamaan Dasar Akuntansi dan Analisis Bukti Transaksi',
        sem: 2,
        elemen: 'Prinsip Dasar Akuntansi dan Perbankan Dasar',
        tps: [
          {
            teks: 'menganalisis bukti transaksi keuangan (kuitansi, faktur, nota debit/kredit, cek) dan prinsip perbankan dasar',
            jp: 12,
            ind: 'Peserta didik dapat memverifikasi keabsahan dokumen transaksi dan mengidentifikasi rekening giro/tabungan perbankan dasar.',
            r1: 'Belum mampu membedakan bukti transaksi penerimaan dan pengeluaran kas.',
            r2: 'Dapat mengidentifikasi bukti transaksi dengan contoh dokumen acuan.',
            r3: 'Mampu menganalisis bukti transaksi secara teliti, tepat akun, dan mandiri.',
            r4: 'Mampu mendeteksi ketidaksesuaian nominal bukti transaksi dan merancang SOP verifikasi dokumen keuangan.',
            teknik: 'Analisis dokumen transaksi'
          },
          {
            teks: 'menerapkan persamaan dasar akuntansi (Aset = Liabilitas + Ekuitas) dan konsep mekanisme debit-kredit',
            jp: 16,
            ind: 'Peserta didik dapat mencatat transaksi keuangan ke dalam tabel persamaan dasar akuntansi secara seimbang.',
            r1: 'Tabel persamaan belum balance; tertukar memposisikan akun penambah/pengurang modal.',
            r2: 'Dapat menyusun persamaan akuntansi transaksi sederhana dengan bimbingan.',
            r3: 'Mampu menyusun persamaan dasar akuntansi secara benar, seimbang, dan mandiri.',
            r4: 'Mampu menyusun laporan keuangan sederhana (laba rugi dan neraca) langsung dari tabel persamaan dasar akuntansi.',
            teknik: 'Latihan soal persamaan akuntansi'
          }
        ]
      },
      {
        nama: 'Siklus Akuntansi Perusahaan Jasa (Jurnal, Buku Besar, Neraca Saldo)',
        sem: 2,
        elemen: 'Prinsip Dasar Akuntansi dan Perbankan Dasar',
        tps: [
          {
            teks: 'mencatat transaksi ke jurnal umum perusahaan jasa secara kronologis dan sesuai standar akuntansi',
            jp: 16,
            ind: 'Peserta didik dapat membuat jurnal umum yang balance dengan penempatan nama akun yang tepat.',
            r1: 'Posisi akun debit dan kredit masih sering terbalik.',
            r2: 'Dapat mencatat transaksi rutin dengan bantuan bagan akun standar.',
            r3: 'Mampu menyusun jurnal umum secara kronologis, rapi, balance, dan mandiri.',
            r4: 'Mampu menjurnal transaksi kompleks (pembelian aset sebagian tunai dan kredit) tanpa kesalahan.',
            teknik: 'Praktik jurnal umum jasa'
          },
          {
            teks: 'melakukan posting ke buku besar bentuk 4 kolom dan menyusun neraca saldo perusahaan jasa',
            jp: 16,
            ind: 'Peserta didik dapat memindahkan mutasi jurnal ke akun buku besar yang bersangkutan dan membuat neraca saldo.',
            r1: 'Posting buku besar belum lengkap dan neraca saldo tidak seimbang.',
            r2: 'Dapat melakukan posting dengan bantuan panduan nomor referensi akun.',
            r3: 'Mampu menyelesaikan posting buku besar dan menyusun neraca saldo dengan benar dan mandiri.',
            r4: 'Mampu merekonsiliasi selisih neraca saldo dan menyajikan dasar laporan keuangan secara profesional.',
            teknik: 'Uji kompetensi posting dan neraca saldo'
          }
        ]
      }
    ]
  };
}

// 2. Layanan Perbankan Syariah (Fase F - Kelas XII SMK)
export function generateLayananPerbankanSyariah(fase: string, kelas: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Fiqih Muamalah dan Regulasi Bank Syariah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami landasan hukum fiqih muamalah perbankan syariah, larangan riba, gharar, maysir, tadlis, dan risywah, fatwa Dewan Syariah Nasional MUI (DSN-MUI), tata kelola dan peran Dewan Pengawas Syariah (DPS), serta regulasi perbankan syariah oleh Otoritas Jasa Keuangan (OJK).`
      },
      {
        elemen: 'Pengelolaan Kas Teller dan Customer Service Syariah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menerapkan SOP kas teller syariah, verifikasi uang rupiah dan valas, rekonsiliasi kas harian, Islamic Service Excellence, prosedur KYC/CDD pembukaan rekening syariah, penanganan komplain nasabah, serta pengelolaan dana kebajikan sosial (Qardhul Hasan) dan ZISWAF.`
      },
      {
        elemen: 'Penghimpunan Dana Syariah (Wadiah dan Mudharabah)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memproses pembukaan, mutasi, dan penutupan rekening tabungan dan giro syariah dengan akad Wadiah Yad Dhamanah, penempatan deposito syariah akad Mudharabah Mutlaqah dan Muqayyadah, serta perhitungan distribusi bagi hasil berbasis nisbah (revenue sharing).`
      },
      {
        elemen: 'Pembiayaan Syariah (Murabahah, Salam, Istishna, Musyarakah, Ijarah)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu menganalisis analisis kelayakan pembiayaan syariah, simulasi pembiayaan jual beli (Murabahah, Salam, Istishna'), pembiayaan kemitraan bagi hasil (Mudharabah dan Musyarakah), pembiayaan sewa beli (Ijarah dan IMBT), penjaminan (Rahn/Kafalah), dan administrasi akad pembiayaan.`
      },
      {
        elemen: 'Akuntansi Perbankan Syariah (PSAK 101–112)',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mencatat transaksi perbankan syariah ke dalam jurnal umum dan buku besar syariah berbasis standar PSAK 101–112, mencatat transaksi dana syirkah temporer, margin murabahah tangguhan, amortisasi, serta menyusun laporan keuangan bank syariah.`
      },
      {
        elemen: 'Komputer Akuntansi dan Pelaporan Keuangan Syariah',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengoperasikan aplikasi spreadsheet dan software komputer akuntansi/core banking syariah untuk pemrosesan transaksi harian, neraca saldo, rekonsiliasi, serta penyajian laporan posisi keuangan dan laporan sumber & penyaluran dana kebajikan.`
      }
    ],
    units: [
      {
        nama: topik ? `Fiqih Muamalah, Tata Kelola Syariah & ${topik}` : 'Prinsip Fiqih Muamalah dan Regulasi Perbankan Syariah',
        sem: 1,
        elemen: 'Fiqih Muamalah dan Regulasi Bank Syariah',
        tps: [
          {
            teks: 'membedakan konsep bunga bank konvensional dengan prinsip bagi hasil syariah serta larangan riba, maysir, dan gharar',
            jp: 6,
            ind: 'Peserta didik dapat menjelaskan perbedaan fundamental sistem bunga dan bagi hasil serta dalil larangan transaksi ribawi.',
            r1: 'Belum memahami perbedaan mendasar antara bunga dan bagi hasil dalam transaksi perbankan.',
            r2: 'Dapat menyebutkan larangan riba dan gharar dengan bimbingan dalil acuan.',
            r3: 'Mampu menganalisis perbedaan sistem bunga dan nisbah bagi hasil secara mandiri, logis, dan tepat.',
            r4: 'Mampu menyusun perbandingan komparatif keadilan ekonomi sistem bagi hasil syariah terhadap stabilitas moneter.',
            teknik: 'Tes tertulis dan diskusi komparasi'
          },
          {
            teks: 'menganalisis peran Dewan Pengawas Syariah (DPS) dan kepatuhan syariah (sharia compliance) dalam operasional bank syariah',
            jp: 8,
            ind: 'Peserta didik dapat menguraikan fungsi pengawasan DPS dan fatwa DSN-MUI dalam keabsahan produk bank syariah.',
            r1: 'Belum memahami fungsi pengawasan DPS pada produk bank syariah.',
            r2: 'Dapat menyebutkan peran DPS dengan bantuan teks peraturan OJK.',
            r3: 'Mampu menjelaskan mekanisme audit kepatuhan syariah dan implementasi fatwa DSN-MUI secara mandiri.',
            r4: 'Mampu menganalisis studi kasus ketidakpatuhan syariah (sharia non-compliance risk) dan dampaknya bagi reputasi bank.',
            teknik: 'Studi kasus tata kelola syariah'
          }
        ]
      },
      {
        nama: 'Produk Penghimpunan Dana Wadiah dan Deposito Mudharabah',
        sem: 1,
        elemen: 'Penghimpunan Dana Syariah (Wadiah dan Mudharabah)',
        tps: [
          {
            teks: 'menerapkan administrasi pembukaan rekening tabungan dan giro syariah dengan akad Wadiah Yad Dhamanah',
            jp: 8,
            ind: 'Peserta didik dapat mengisi slip pembukaan rekening, verifikasi data nasabah (KYC), dan menjelaskan akad titipan bergaransi.',
            r1: 'Belum menguasai rukun dan ketentuan akad Wadiah Yad Dhamanah.',
            r2: 'Dapat memproses berkas pembukaan tabungan syariah dengan template panduan.',
            r3: 'Mampu melayani pembukaan rekening tabungan dan giro wadiah secara mandiri, santun, dan sesuai SOP bank syariah.',
            r4: 'Mampu mengedukasi nasabah mengenai fitur kartu debit syariah, bebas biaya riba, dan pemberian bonus (athaya) sukarela.',
            teknik: 'Simulasi CS pembukaan rekening syariah'
          },
          {
            teks: 'mengelola penempatan deposito syariah akad Mudharabah serta menghitung nisbah bagi hasil (revenue sharing)',
            jp: 8,
            ind: 'Peserta didik dapat menghitung bagi hasil deposito syariah berdasarkan saldo rata-rata, persentase nisbah, dan pendapatan bank.',
            r1: 'Keliru menghitung pembagian nisbah dan salah memasukkan angka pendapatan bank.',
            r2: 'Mampu menghitung bagi hasil nasabah dengan rumus panduan acuan guru.',
            r3: 'Mampu menghitung distribusi bagi hasil deposito syariah dengan tepat, teliti, dan mandiri.',
            r4: 'Mampu membandingkan simulasi return investasi bagi hasil deposito syariah berbagai tenor (1, 3, 6, 12 bulan).',
            teknik: 'Perhitungan nisbah dan tes tertulis'
          }
        ]
      },
      {
        nama: 'Skema Pembiayaan Jual Beli: Murabahah, Salam, dan Istishna',
        sem: 1,
        elemen: 'Pembiayaan Syariah (Murabahah, Salam, Istishna, Musyarakah, Ijarah)',
        tps: [
          {
            teks: 'menyusun simulasi akad pembiayaan Murabahah, menghitung harga pokok barang, margin keuntungan, dan angsuran bulanan',
            jp: 10,
            ind: 'Peserta didik dapat membuat tabel angsuran Murabahah dengan transparansi harga beli dan margin keuntungan yang disepakati.',
            r1: 'Belum memahami prinsip transparansi harga beli dan margin dalam jual beli Murabahah.',
            r2: 'Dapat menghitung margin pembiayaan dengan rumus bantuan bertahap.',
            r3: 'Mampu menyusun simulasi pembiayaan Murabahah lengkap dengan jadwal angsuran secara tepat dan mandiri.',
            r4: 'Mampu merancang draf perjanjian akad Murabahah bil Wakalah untuk pembiayaan konsumtif/modal kerja mikro.',
            teknik: 'Simulasi akad murabahah dan uji hitung'
          },
          {
            teks: 'menganalisis skema dan alur pembiayaan pesanan pertanian (Salam) dan konstruksi/manufaktur (Istishna)',
            jp: 8,
            ind: 'Peserta didik dapat membedakan spesifikasi barang pesanan, alur pembayaran di muka (Salam), dan pembayaran bertahap (Istishna).',
            r1: 'Sering tertukar antara karakteristik akad Salam dan Istishna.',
            r2: 'Dapat menjelaskan skema akad Salam dengan bantuan diagram alur transaksi.',
            r3: 'Mampu menganalisis alur pembiayaan Salam dan Istishna paralel secara mandiri dan akurat.',
            r4: 'Mampu menyusun skema solusi pembiayaan rantai pasok pertanian dan perumahan berbasis akad pesanan syariah.',
            teknik: 'Analisis skema pembiayaan dan portofolio'
          }
        ]
      },
      {
        nama: 'Pembiayaan Bagi Hasil (Mudharabah, Musyarakah) dan Sewa (Ijarah)',
        sem: 2,
        elemen: 'Pembiayaan Syariah (Murabahah, Salam, Istishna, Musyarakah, Ijarah)',
        tps: [
          {
            teks: 'menganalisis skema pembiayaan kemitraan Musyarakah dan Mudharabah serta perhitungan bagi hasil untung-rugi',
            jp: 8,
            ind: 'Peserta didik dapat membedakan peran shahibul maal dan mudharib serta menghitung rasio laba usaha mitra.',
            r1: 'Belum memahami pembagian risiko kerugian (loss sharing) dalam akad kemitraan syariah.',
            r2: 'Dapat menghitung bagi hasil kemitraan sederhana dengan panduan rasio modal.',
            r3: 'Mampu menganalisis kelayakan usaha mitra dan menyusun pembagian bagi hasil Musyarakah secara adil dan mandiri.',
            r4: 'Mampu mengevaluasi mitigasi risiko moral hazard dalam pembiayaan bagi hasil sektor UMKM.',
            teknik: 'Studi kasus bagi hasil dan tes tertulis'
          },
          {
            teks: 'memproses simulasi akad sewa beli Ijarah Muntahiya Bittamlik (IMBT) dan pembiayaan multijasa syariah',
            jp: 8,
            ind: 'Peserta didik dapat menguraikan manfaat sewa guna usaha syariah dan perpindahan kepemilikan aset di akhir periode sewa.',
            r1: 'Belum memahami mekanisme pengalihan kepemilikan pada akad IMBT (hibah atau jual).',
            r2: 'Dapat menjelaskan alur sewa Ijarah dengan bantuan bagan skema.',
            r3: 'Mampu menyusun perhitungan ujrah (biaya sewa) dan jadwal pembayaran IMBT secara mandiri dan teliti.',
            r4: 'Mampu merancang skema pembiayaan sewa multijasa syariah untuk biaya pendidikan atau porsi ibadah haji.',
            teknik: 'Praktik simulasi akad sewa'
          }
        ]
      },
      {
        nama: 'Operasional Pelayanan Prima Islami dan Kas Teller Syariah',
        sem: 2,
        elemen: 'Pengelolaan Kas Teller dan Customer Service Syariah',
        tps: [
          {
            teks: 'mempraktikkan Islamic Service Excellence, etika muamalah perbankan, dan prosedur KYC pembukaan rekening syariah',
            jp: 6,
            ind: 'Peserta didik dapat menunjukkan salam pembuka islami, mendengarkan aktif, dan menjelaskan akad syariah secara ramah.',
            r1: 'Gaya komunikasi masih kaku dan belum menguasai penjelasan akad syariah secara lugas.',
            r2: 'Dapat melayani nasabah sesuai skenario dialog standar yang disediakan.',
            r3: 'Mampu mempraktikkan pelayanan nasabah beretika islami (shiddiq, amanah, fathanah, tabligh) secara luwes dan mandiri.',
            r4: 'Mampu menangani komplain nasabah secara tenang, amanah, dan memberikan solusi syariah yang memuaskan.',
            teknik: 'Role play pelayanan prima islami'
          },
          {
            teks: 'melaksanakan transaksi kas teller syariah, transfer kliring syariah, dan penghimpunan dana ZISWAF/Qardh',
            jp: 8,
            ind: 'Peserta didik dapat melayani setoran tunai, penarikan, transfer antar-bank syariah, dan penerimaan titipan zakat/infaq.',
            r1: 'Masih lambat dalam penghitungan uang fisik dan penginputan nominal slip setoran teller.',
            r2: 'Dapat menyelesaikan transaksi kas teller dengan bimbingan kepala kasir.',
            r3: 'Mampu melaksanakan transaksi kas teller syariah secara cepat, teliti, zero error, dan mandiri.',
            r4: 'Mampu mengelola pelaporan dana kebajikan sosial (Qardhul Hasan) dan penyaluran dana ZISWAF secara transparan.',
            teknik: 'Simulasi transaksi teller syariah'
          }
        ]
      },
      {
        nama: 'Akuntansi Transaksi Syariah (PSAK 101–112) dan Komputerisasi Laporan Keuangan',
        sem: 2,
        elemen: 'Akuntansi Perbankan Syariah (PSAK 101–112)',
        tps: [
          {
            teks: 'menjurnal transaksi penghimpunan dana Wadiah/Mudharabah dan penyaluran pembiayaan Murabahah sesuai standar PSAK Syariah',
            jp: 10,
            ind: 'Peserta didik dapat mencatat mutasi rekening dana syariah dan piutang murabahah ke dalam jurnal umum perbankan syariah.',
            r1: 'Masih keliru menempatkan akun dana syirkah temporer dan pendapatan margin ditangguhkan.',
            r2: 'Dapat menjurnal transaksi simpanan wadiah dengan bantuan daftar akun bank syariah.',
            r3: 'Mampu menjurnal transaksi penghimpunan dan pembiayaan syariah secara tepat akun, balance, dan mandiri.',
            r4: 'Mampu mengoreksi jurnal penyesuaian amortisasi margin dan rekonsiliasi bagi hasil bulanan.',
            teknik: 'Praktik pembukuan akuntansi syariah'
          },
          {
            teks: 'mengoperasikan aplikasi spreadsheet/komputer akuntansi untuk menyusun laporan posisi keuangan dan dana kebajikan bank syariah',
            jp: 8,
            ind: 'Peserta didik dapat menyajikan komponen neraca syariah (aset, liabilitas, dana syirkah temporer, ekuitas) dan laporan dana kebajikan.',
            r1: 'Komponen dana syirkah temporer belum dipisahkan dari liabilitas murni.',
            r2: 'Dapat menyusun neraca bank syariah dengan template laporan keuangan PSAK 101.',
            r3: 'Mampu menyajikan laporan keuangan bank syariah lengkap dan seimbang secara mandiri.',
            r4: 'Mampu menganalisis rasio keuangan bank syariah (NPF, FDR, CAR, ROA) dan tingkat kesehatan bank syariah.',
            teknik: 'Penyusunan laporan keuangan syariah terkomputerisasi'
          }
        ]
      }
    ]
  };
}

// 3. Layanan Perbankan (Fase F - Kelas XI SMK)
export function generateLayananPerbankan(fase: string, kelas: string, topik: string): CurriculumResponse {
  const f = fase === 'E' ? 'F' : fase;
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Ekonomi Bisnis dan Administrasi Umum',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami masalah-masalah ekonomi, model dan pelaku ekonomi, perilaku konsumen dan produsen, pasar dan terbentuknya harga pasar, penerapan ilmu ekonomi dalam kegiatan usaha, serta administrasi dan fungsi-fungsi manajemen operasional perbankan.`
      },
      {
        elemen: 'Pengelolaan Kas Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami dan mengelola kas kecil (petty cash), kas bank, operasional penerimaan dan pengeluaran kas teller, pemeriksaan keaslian fisik uang rupiah dan valuta asing (3D), transaksi warkat kliring (cek dan bilyet giro), serta rekonsiliasi kas bank harian.`
      },
      {
        elemen: 'Layanan Lembaga Perbankan dan Keuangan Mikro',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami sistem perbankan di Indonesia, jenis lembaga keuangan bank dan bukan bank, pemasaran produk simpanan (tabungan, giro, deposito), pelayanan nasabah (Customer Service dan KYC/CDD), penggunaan instrumen perbankan digital (ATM, mobile/internet banking, QRIS), analisis kredit perbankan prinsip 5C, pengikatan agunan, serta jasa safe deposit box.`
      },
      {
        elemen: 'Akuntansi Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami siklus akuntansi perbankan, melakukan pencatatan transaksi produk simpanan dana masyarakat, penyaluran kredit, kliring, transaksi antar-kantor, neraca saldo, jurnal penyesuaian, hingga penyusunan laporan keuangan perbankan.`
      },
      {
        elemen: 'Komputer Akuntansi Layanan Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu mengoperasikan program spreadsheet dan aplikasi komputer akuntansi/core banking layanan perbankan untuk mengentri data nasabah, memproses transaksi keuangan simpanan dan pinjaman, serta menyajikan laporan keuangan perbankan secara terkomputerisasi.`
      },
      {
        elemen: 'Perpajakan Perbankan',
        teks: `Pada akhir Fase ${f}, peserta didik mampu memahami ketentuan umum dan tata cara perpajakan (KUP), jenis-jenis pajak terkait transaksi perbankan (PPh Pasal 4 ayat 2 atas bunga simpanan dan diskonto, PPh Pasal 21, PPh Pasal 23, PPN), perhitungan pajak terutang, pemotongan, penyetoran, serta penyusunan laporan SPT masa pajak perbankan.`
      }
    ],
    units: [
      {
        nama: topik ? `Ekonomi Bisnis, Administrasi Bank & ${topik}` : 'Ekonomi Bisnis dan Prinsip Manajemen Lembaga Perbankan',
        sem: 1,
        elemen: 'Ekonomi Bisnis dan Administrasi Umum',
        tps: [
          {
            teks: 'menganalisis masalah ekonomi, peran bank sebagai lembaga intermediasi keuangan, dan fungsi manajemen bank',
            jp: 6,
            ind: 'Peserta didik dapat menguraikan fungsi intermediasi perbankan dalam memobilisasi dana masyarakat serta struktur organisasi bank.',
            r1: 'Belum mampu menjelaskan fungsi intermediasi perbankan.',
            r2: 'Dapat menyebutkan fungsi bank dengan bantuan diagram alur perbankan.',
            r3: 'Mampu menganalisis peran bank dalam stabilitas moneter dan fungsi manajemen operasional bank secara mandiri.',
            r4: 'Mampu mengevaluasi dampak suku bunga acuan Bank Indonesia (BI-Rate) terhadap likuiditas perbankan nasional.',
            teknik: 'Tes tertulis dan diskusi kelas'
          },
          {
            teks: 'menerapkan tata kelola administrasi perbankan dan kearsipan dokumen transaksi nasabah',
            jp: 6,
            ind: 'Peserta didik dapat mengelola warkat arsip nasabah, pembukuan agenda, dan prosedur retensi dokumen bank.',
            r1: 'Pengarsipan dokumen nasabah masih belum teratur sesuai nomor rekening.',
            r2: 'Dapat menyusun arsip dokumen nasabah dengan panduan buku agenda.',
            r3: 'Mampu mengelola tata naskah administrasi perbankan dan filling arsip secara rapi, aman, dan mandiri.',
            r4: 'Mampu merancang prosedur digitalisasi arsip dokumen perbankan dan mitigasi risiko kehilangan data nasabah.',
            teknik: 'Praktik kearsipan dokumen bank'
          }
        ]
      },
      {
        nama: 'Pengelolaan Kas Kecil (Petty Cash) dan Kas Operasional Teller',
        sem: 1,
        elemen: 'Pengelolaan Kas Perbankan',
        tps: [
          {
            teks: 'menerapkan pengelolaan dana kas kecil bank dengan sistem dana tetap (imprest fund system) dan dana berfluktuasi',
            jp: 8,
            ind: 'Peserta didik dapat membuat bukti pengeluaran kas kecil, mutasi pengisian kembali kas kecil, dan jurnal penyesuaian.',
            r1: 'Belum menguasai pencatatan jurnal pembentukan dan pengisian kas kecil.',
            r2: 'Dapat mencatat mutasi kas kecil sistem imprest dengan panduan tabel bantuan.',
            r3: 'Mampu mengelola kas kecil bank secara mandiri, balance, dan menyajikan berita acara penghitungan fisik kas.',
            r4: 'Mampu menganalisis selisih kas (cash shortage/overage) dan merumuskan SOP pengendalian internal kas bank.',
            teknik: 'Praktik pembukuan kas kecil'
          },
          {
            teks: 'memverifikasi keaslian uang rupiah dan valas dengan teknik 3D (Dilihat, Diraba, Diterawang) dan lampu ultraviolet',
            jp: 8,
            ind: 'Peserta didik dapat mendeteksi fitur pengaman uang kertas rupiah tahun emisi terbaru (benang pengaman, watermark, rectoverso).',
            r1: 'Kesulitan mengenali unsur pengaman uang rupiah cetak asli dan palsu.',
            r2: 'Dapat mengidentifikasi uang palsu menggunakan lampu UV dengan bantuan poster pedoman BI.',
            r3: 'Mampu memverifikasi keaslian uang tunai secara cepat, presisi, dan mandiri.',
            r4: 'Mampu membuat berita acara temuan uang palsu sesuai regulasi Bank Indonesia dan SOP teller perbankan.',
            teknik: 'Uji praktik verifikasi fisik uang'
          }
        ]
      },
      {
        nama: 'Layanan Nasabah (Customer Service), KYC, dan Produk Simpanan',
        sem: 1,
        elemen: 'Layanan Lembaga Perbankan dan Keuangan Mikro',
        tps: [
          {
            teks: 'mempraktikkan standar pelayanan prima (Service Excellence) dan prosedur Know Your Customer (KYC/CDD) perbankan',
            jp: 8,
            ind: 'Peserta didik dapat melakukan greeting, verifikasi identitas nasabah, serta pengisian formulir pembukaan rekening tabungan/giro.',
            r1: 'Komunikasi dan etiket pelayanan nasabah masih kaku dan belum runut.',
            r2: 'Dapat melayani nasabah sesuai skrip dialog standar yang diberikan.',
            r3: 'Mampu mempraktikkan service excellence dan prosedur verifikasi KYC secara luwes, santun, dan mandiri.',
            r4: 'Mampu menangani komplain nasabah secara tenang, solutif, serta menerapkan prinsip antipencucian uang (APU-PPT).',
            teknik: 'Role play simulasi customer service'
          },
          {
            teks: 'mengelola administrasi produk simpanan tabungan, giro warkat kliring, dan sertifikat deposito berjangka',
            jp: 8,
            ind: 'Peserta didik dapat menghitung bunga tabungan (saldo rata-rata/terendah), diskonto deposito, dan penatausahaan warkat cek/bilyet giro.',
            r1: 'Keliru menghitung bunga tabungan dan pemotongan pajak bunga simpanan.',
            r2: 'Dapat menghitung bunga deposito dengan rumus bantuan acuan.',
            r3: 'Mampu menghitung bunga simpanan, pajak PPh Final 20%, dan mengadministrasikan mutasi rekening nasabah secara mandiri.',
            r4: 'Mampu membandingkan karakteristik dan yield berbagai produk penghimpunan dana bank untuk segmen ritel vs korporasi.',
            teknik: 'Uji hitung finansial dan studi kasus'
          }
        ]
      },
      {
        nama: 'Siklus Akuntansi Transaksi Perbankan dan Analisis Kredit 5C',
        sem: 2,
        elemen: 'Akuntansi Perbankan',
        tps: [
          {
            teks: 'mencatat transaksi operasional penghimpunan dana dan penyaluran kredit ke sistem akuntansi perbankan',
            jp: 10,
            ind: 'Peserta didik dapat menjurnal transaksi setoran, penarikan, transfer kliring BI-FAST/RTGS, dan realisasi pinjaman kredit.',
            r1: 'Penempatan debit/kredit akun perbankan (kewajiban vs aset bank) masih terbalik.',
            r2: 'Dapat mencatat transaksi kas perbankan dengan daftar bagan akun bank yang disediakan.',
            r3: 'Mampu menjurnal transaksi perbankan harian secara tepat, sistematis, balance, dan mandiri.',
            r4: 'Mampu menyusun neraca percobaan (trial balance) perbankan dan jurnal penyesuaian bunga accrual akhir bulan.',
            teknik: 'Praktik siklus akuntansi perbankan'
          },
          {
            teks: 'menganalisis kelayakan kredit nasabah dengan prinsip 5C (Character, Capacity, Capital, Collateral, Condition)',
            jp: 8,
            ind: 'Peserta didik dapat menyusun laporan analisis kredit, memeriksa riwayat SLIK OJK, dan menaksir nilai agunan/jaminan.',
            r1: 'Belum memahami indikator penilaian kelayakan kredit prinsip 5C.',
            r2: 'Dapat mengisi formulir analisis kredit dengan panduan lembar kerja.',
            r3: 'Mampu menganalisis kelayakan kredit nasabah dan menghitung Debt Service Ratio (DSR) secara objektif dan mandiri.',
            r4: 'Mampu merumuskan keputusan persetujuan kredit mikro beserta skema mitigasi risiko kredit macet (NPL).',
            teknik: 'Analisis studi kasus kredit perbankan'
          }
        ]
      },
      {
        nama: 'Komputer Akuntansi Layanan Perbankan dan Ketentuan Perpajakan Bank',
        sem: 2,
        elemen: 'Komputer Akuntansi Layanan Perbankan',
        tps: [
          {
            teks: 'mengoperasikan program spreadsheet dan aplikasi komputer akuntansi untuk pemrosesan data transaksi bank terkomputerisasi',
            jp: 10,
            ind: 'Peserta didik dapat mengentri master data nasabah, memproses transaksi simpanan/pinjaman, dan mencetak rekening koran pada aplikasi.',
            r1: 'Masih canggung mengoperasikan menu entri transaksi pada aplikasi komputer akuntansi perbankan.',
            r2: 'Dapat mengentri data nasabah dan mutasi dengan panduan SOP komputer perbankan.',
            r3: 'Mampu mengoperasikan software perbankan untuk membukukan transaksi harian hingga menghasilkan neraca bank secara mandiri.',
            r4: 'Mampu merekonsiliasi transaksi antar-kantor dan menyelesaikan troubleshooting ketidaksesuaian saldo sistem.',
            teknik: 'Praktik komputer akuntansi perbankan'
          },
          {
            teks: 'menghitung dan menyusun laporan pemotongan PPh Pasal 4 ayat (2) atas bunga simpanan dan perpajakan perbankan',
            jp: 8,
            ind: 'Peserta didik dapat menghitung PPh final 20% bunga tabungan/deposito nasabah dan mengisi formulir SPT Masa PPh terkait.',
            r1: 'Belum menguasai ketentuan batasan saldo kena pajak bunga simpanan perbankan.',
            r2: 'Dapat menghitung potongan pajak bunga tabungan dengan rumus acuan.',
            r3: 'Mampu menghitung pajak bunga bank, menyusun daftar bukti potong, dan mengisi SPT Masa PPh secara mandiri dan akurat.',
            r4: 'Mampu menganalisis kewajiban perpajakan perbankan sebagai pemungut/pemotong pajak (withholding tax agent).',
            teknik: 'Praktik pengisian SPT dan penugasan'
          }
        ]
      }
    ]
  };
}

// 4. Praktikum Akuntansi Lembaga / Instansi Pemerintah (Fase F - XI/XII SMK)
export function generateAkuntansiLembagaPemerintah(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Tata Kelola dan Regulasi Keuangan Sektor Publik',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami tata kelola keuangan negara dan daerah, asas pengelolaan APBD dan APBDes, struktur kelembagaan pengelola keuangan daerah (PPKD dan SKPD), serta kode etik dan akuntabilitas bendahara instansi pemerintah.`
      },
      {
        elemen: 'Standar Akuntansi Pemerintahan (SAP Berbasis Akrual)',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami konsep dan kerangka konseptual Standar Akuntansi Pemerintahan (SAP) berbasis akrual sesuai Peraturan Pemerintah Nomor 71 Tahun 2010, struktur bagan akun standar (BAS) pemerintah daerah, serta persamaan dasar akuntansi pemerintahan.`
      },
      {
        elemen: 'Pencatatan Transaksi Finansial dan Transaksi Anggaran',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu melakukan pencatatan transaksi keuangan daerah dengan sistem pembukuan berpasangan (double entry), membedakan jurnal finansial (Laporan Operasional) dan jurnal anggaran (Laporan Realisasi Anggaran), transaksi kas dan non-kas, serta mekanisme uang persediaan (SP2D UP, GU, TU, LS).`
      },
      {
        elemen: 'Penyusunan Laporan Keuangan Pemerintah Daerah dan Akuntansi Desa',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menyusun laporan keuangan pemerintah daerah (LRA, LP-SAL, LO, LPE, Neraca, LAK, dan CaLK) serta menyelenggarakan penatausahaan dan pembukuan keuangan desa berbasis aplikasi Sistem Keuangan Desa (Siskeudes).`
      }
    ],
    units: [
      {
        nama: topik ? `Regulasi, SAP Akrual & ${topik}` : 'Regulasi Keuangan Daerah dan Standar Akuntansi Pemerintahan',
        sem: 1,
        elemen: 'Standar Akuntansi Pemerintahan (SAP Berbasis Akrual)',
        tps: [
          {
            teks: 'menganalisis struktur APBD, siklus pengelolaan keuangan daerah, dan kerangka konseptual SAP Akrual PP 71/2010',
            jp: 8,
            ind: 'Peserta didik dapat menguraikan komponen pendapatan daerah, belanja daerah, dan pembiayaan daerah serta fungsi SKPD dan BUD.',
            r1: 'Belum memahami perbedaan belanja daerah dan pembiayaan daerah.',
            r2: 'Dapat mengidentifikasi struktur APBD dengan bagan alur keuangan daerah.',
            r3: 'Mampu menganalisis alur penyusunan APBD dan penerapan SAP akrual di lingkungan pemerintah daerah secara mandiri.',
            r4: 'Mampu mengevaluasi prinsip transparansi fiskal dan pencegahan korupsi dalam pengelolaan keuangan daerah.',
            teknik: 'Tes tertulis dan analisis dokumen APBD'
          },
          {
            teks: 'menerapkan persamaan dasar akuntansi pemerintah (Aset = Kewajiban + Ekuitas + Pendapatan LO - Beban)',
            jp: 10,
            ind: 'Peserta didik dapat memetakan transaksi keuangan daerah ke dalam persamaan akuntansi pemerintah dan bagan akun standar.',
            r1: 'Persamaan akuntansi pemerintah belum seimbang; tertukar antara beban LO dan belanja LRA.',
            r2: 'Dapat memasukkan transaksi sederhana ke tabel persamaan dengan asistensi guru.',
            r3: 'Mampu menyusun tabel persamaan akuntansi SKPD dan PPKD secara seimbang, teliti, dan mandiri.',
            r4: 'Mampu menghubungkan transaksi timbal balik (rekening koran PPKD/SKPD) pada struktur Home Office - Branch Office pemerintah daerah.',
            teknik: 'Lembar kerja persamaan akuntansi pemda'
          }
        ]
      },
      {
        nama: 'Pencatatan Transaksi Pendapatan, Belanja, dan Mekanisme SP2D',
        sem: 1,
        elemen: 'Pencatatan Transaksi Finansial dan Transaksi Anggaran',
        tps: [
          {
            teks: 'menjurnal transaksi pengeluaran kas dengan mekanisme Uang Persediaan (UP), Ganti Uang (GU), Tambah Uang (TU), dan Langsung (LS)',
            jp: 14,
            ind: 'Peserta didik dapat membuat jurnal finansial dan jurnal anggaran saat penerbitan SP2D UP/GU/TU/LS pada SKPD.',
            r1: 'Masih keliru kapan harus membuat jurnal anggaran (LRA) dan kapan hanya jurnal finansial (LO).',
            r2: 'Dapat mencatat jurnal SP2D LS gaji dengan bantuan format akun.',
            r3: 'Mampu menjurnal transaksi UP, GU, TU, dan LS dengan tepat kode rekening, debit-kredit, dan mandiri.',
            r4: 'Mampu menyusun Surat Pertanggungjawaban (SPJ) fungsional dan administratif bendahara pengeluaran SKPD.',
            teknik: 'Praktik pembukuan bendahara SKPD'
          },
          {
            teks: 'menjurnal transaksi penerimaan pendapatan daerah (PAD, transfer pusat, dan lain-lain pendapatan sah)',
            jp: 12,
            ind: 'Peserta didik dapat mencatat Surat Ketetapan Pajak Daerah (SKP-Daerah), penyetoran kas ke Kas Daerah, dan pengakuan pendapatan LO vs LRA.',
            r1: 'Belum memahami pengakuan pendapatan berbasis akrual (LO) saat penetapan vs saat penerimaan kas (LRA).',
            r2: 'Dapat mencatat penyetoran retribusi daerah dengan format jurnal acuan.',
            r3: 'Mampu membuat jurnal pendapatan LO dan pendapatan LRA secara tepat dan mandiri.',
            r4: 'Mampu mengoreksi jurnal penyesuaian pendapatan diterima di muka dan piutang pajak daerah akhir tahun anggaran.',
            teknik: 'Simulasi pembukuan bendahara penerimaan'
          }
        ]
      },
      {
        nama: 'Penyusunan Laporan Keuangan Pemerintah Daerah (LRA, LO, Neraca)',
        sem: 2,
        elemen: 'Penyusunan Laporan Keuangan Pemerintah Daerah dan Akuntansi Desa',
        tps: [
          {
            teks: 'menyusun Laporan Realisasi Anggaran (LRA) dan Laporan Operasional (LO) SKPD pemerintah daerah',
            jp: 14,
            ind: 'Peserta didik dapat menghitung surplus/defisit LRA, SiLPA, serta surplus/defisit operasional LO.',
            r1: 'Masih mencampuradukkan pos belanja modal di LRA ke dalam laporan beban LO.',
            r2: 'Dapat menyusun format LRA SKPD dengan template standar SAP.',
            r3: 'Mampu menyusun LRA dan LO SKPD secara tepat, teliti, balance, dan mandiri.',
            r4: 'Mampu menyusun Laporan Perubahan Ekuitas (LPE) dan menghubungkan surplus/defisit LO ke ekuitas akhir neraca.',
            teknik: 'Portofolio laporan keuangan pemda'
          },
          {
            teks: 'menyusun Neraca Pemerintah Daerah dan Catatan atas Laporan Keuangan (CaLK)',
            jp: 12,
            ind: 'Peserta didik dapat mengelompokkan aset lancar, aset tetap pemerintah, dana cadangan, kewajiban jangka pendek, dan ekuitas pemda.',
            r1: 'Saldo aset dan total pasiva pemerintah daerah belum seimbang.',
            r2: 'Dapat mengisi neraca pemda dengan neraca lajur bantuan.',
            r3: 'Mampu menyusun Neraca Pemerintah Daerah dan membuat deskripsi pengungkapan CaLK secara mandiri.',
            r4: 'Mampu menganalisis kemandirian keuangan daerah dan rasio efisiensi belanja APBD dari laporan keuangan audited.',
            teknik: 'Uji kompetensi neraca daerah'
          }
        ]
      },
      {
        nama: 'Akuntansi Keuangan Desa Berbasis Siskeudes',
        sem: 2,
        elemen: 'Penyusunan Laporan Keuangan Pemerintah Daerah dan Akuntansi Desa',
        tps: [
          {
            teks: 'menerapkan pembukuan keuangan desa (Buku Kas Umum, Buku Pembantu Bank, Buku Pembantu Pajak) dan aplikasi Siskeudes',
            jp: 12,
            ind: 'Peserta didik dapat mencatat mutasi penerimaan Dana Desa (DD), Alokasi Dana Desa (ADD), dan pengeluaran kegiatan desa.',
            r1: 'Pencatatan kas desa belum sinkron antara Buku Kas Umum dan Buku Bank.',
            r2: 'Dapat mencatat transaksi kas desa dengan formulir manual Permendagri 20/2018.',
            r3: 'Mampu membukukan seluruh transaksi desa dan mengoperasikan modul penatausahaan Siskeudes secara mandiri.',
            r4: 'Mampu menyusun Laporan Pertanggungjawaban Realisasi APBDes akhir tahun dan laporan kekayaan milik desa.',
            teknik: 'Praktik komputer akuntansi desa (Siskeudes)'
          }
        ]
      }
    ]
  };
}

// 5. Praktikum Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur (Fase F - XI/XII SMK)
export function generatePraktikumJasaDagangManufaktur(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Akuntansi Perusahaan Jasa',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis dokumen transaksi keuangan, melakukan pencatatan transaksi ke dalam jurnal umum, posting ke buku besar, menyusun neraca saldo, membuat jurnal penyesuaian, menyusun kertas kerja (worksheet), menyusun laporan keuangan (Laba Rugi, Perubahan Ekuitas, Neraca, Arus Kas), serta membuat jurnal penutup dan neraca saldo setelah penutupan pada perusahaan jasa.`
      },
      {
        elemen: 'Akuntansi Perusahaan Dagang',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis dokumen transaksi perdagangan, mencatat ke dalam jurnal khusus (pembelian, penjualan, penerimaan kas, pengeluaran kas) dan jurnal umum, mengelola buku besar pembantu piutang dan utang, mencatat kartu persediaan barang dagang (FIFO, LIFO, Moving Average), menyusun neraca lajur, dan menyajikan laporan keuangan perusahaan dagang sesuai standar SAK EMKM / SAK ETAP.`
      },
      {
        elemen: 'Akuntansi Perusahaan Manufaktur',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami karakteristik dan siklus akuntansi perusahaan industri manufaktur, mengklasifikasi biaya produksi (biaya bahan baku langsung, tenaga kerja langsung, dan overhead pabrik), menghitung harga pokok produksi dengan metode harga pokok pesanan (job order costing) dan metode harga pokok proses (process costing), serta menyusun laporan harga pokok produksi dan laporan keuangan perusahaan manufaktur.`
      }
    ],
    units: [
      {
        nama: topik ? `Siklus Akuntansi Perusahaan Jasa & ${topik}` : 'Siklus Lengkap Akuntansi Perusahaan Jasa',
        sem: 1,
        elemen: 'Akuntansi Perusahaan Jasa',
        tps: [
          {
            teks: 'menganalisis dokumen sumber dan dokumen pendukung transaksi keuangan pada perusahaan jasa',
            jp: 8,
            ind: 'Peserta didik dapat mengidentifikasi keabsahan kuitansi, nota kontan, bukti kas masuk, bukti kas keluar, dan memo internal.',
            r1: 'Belum mampu membedakan dokumen transaksi internal dan eksternal.',
            r2: 'Dapat mengidentifikasi bukti transaksi jasa dengan panduan lembar kerja.',
            r3: 'Mampu menganalisis pengaruh bukti transaksi terhadap akun riil dan nominal secara mandiri dan akurat.',
            r4: 'Mampu memvalidasi keabsahan dokumen transaksi kompleks serta mendeteksi anomali pada berkas transaksi jasa.',
            teknik: 'Analisis dokumen transaksi dan tes tertulis'
          },
          {
            teks: 'mencatat transaksi ke jurnal umum, posting buku besar, dan menyusun neraca saldo perusahaan jasa',
            jp: 12,
            ind: 'Peserta didik dapat menyusun jurnal umum yang balance, memindahkan mutasi ke buku besar bentuk 4 kolom, dan membuat neraca saldo.',
            r1: 'Jurnal umum belum balance dan terjadi kesalahan penempatan debit kredit akun.',
            r2: 'Dapat mencatat jurnal dan posting dengan bantuan format buku besar.',
            r3: 'Mampu menjurnal secara kronologis, posting buku besar, dan menyusun neraca saldo dengan teliti dan mandiri.',
            r4: 'Mampu menganalisis selisih neraca saldo dan melakukan koreksi jurnal penyesuaian secara sistematis.',
            teknik: 'Praktik siklus akuntansi jasa'
          },
          {
            teks: 'menyusun jurnal penyesuaian, kertas kerja (worksheet), dan laporan keuangan perusahaan jasa',
            jp: 12,
            ind: 'Peserta didik dapat menghitung beban perlengkapan, penyusutan aset tetap, beban terutang, pendapatan diterima di muka, dan menyajikan laporan laba rugi serta neraca.',
            r1: 'Kesulitan menghitung penyesuaian pos akrual dan deferral.',
            r2: 'Dapat menyusun kertas kerja 10 kolom dengan pendampingan formula saldo.',
            r3: 'Mampu menyusun kertas kerja lengkap dan laporan keuangan perusahaan jasa yang seimbang secara mandiri.',
            r4: 'Mampu mengevaluasi kinerja keuangan perusahaan jasa berdasarkan laporan keuangan yang disusun.',
            teknik: 'Portofolio laporan keuangan jasa'
          }
        ]
      },
      {
        nama: 'Siklus Akuntansi Perusahaan Dagang dengan Jurnal Khusus',
        sem: 1,
        elemen: 'Akuntansi Perusahaan Dagang',
        tps: [
          {
            teks: 'mencatat transaksi pembelian, penjualan, penerimaan kas, dan pengeluaran kas ke dalam jurnal khusus perusahaan dagang',
            jp: 14,
            ind: 'Peserta didik dapat mengidentifikasi syarat pembayaran (2/10, n/30), syarat penyerahan (FOB shipping point/destination), dan merekapitulasi jurnal khusus.',
            r1: 'Sering tertukar mencatat transaksi kredit ke jurnal kas atau sebaliknya.',
            r2: 'Dapat mengelompokkan transaksi ke 4 jurnal khusus dengan bantuan daftar akun.',
            r3: 'Mampu mencatat seluruh transaksi dagang ke jurnal khusus dan merekapitulasinya secara tepat, rapi, dan mandiri.',
            r4: 'Mampu merancang format jurnal khusus terintegrasi yang mempercepat proses rekapitulasi buku besar.',
            teknik: 'Praktik jurnal khusus dagang'
          },
          {
            teks: 'mengelola buku besar pembantu piutang dan utang serta menyusun daftar saldo piutang dan utang',
            jp: 10,
            ind: 'Peserta didik dapat memposting mutasi faktur dan pelunasan ke kartu piutang/utang pelanggan dan pemasok.',
            r1: 'Saldo buku pembantu tidak cocok dengan akun kontrol di buku besar umum.',
            r2: 'Dapat memposting ke buku pembantu dengan bimbingan pencocokan faktur.',
            r3: 'Mampu memutakhirkan buku besar pembantu dan menyusun daftar saldo yang sesuai akun kontrol secara mandiri.',
            r4: 'Mampu menyusun analisis umur piutang (aging schedule of accounts receivable) untuk mengukur likuiditas tagihan.',
            teknik: 'Penyusunan kartu pembantu dan daftar saldo'
          }
        ]
      },
      {
        nama: 'Kartu Persediaan Barang Dagang dan Laporan Keuangan Dagang',
        sem: 2,
        elemen: 'Akuntansi Perusahaan Dagang',
        tps: [
          {
            teks: 'mengelola kartu persediaan barang dagang metode perpetual (FIFO dan Moving Average)',
            jp: 12,
            ind: 'Peserta didik dapat menghitung harga pokok penjualan (HPP) dan nilai persediaan akhir pada setiap transaksi mutasi barang.',
            r1: 'Masih keliru menghitung harga pokok keluar pada metode rata-rata bergerak.',
            r2: 'Dapat menghitung nilai persediaan metode FIFO dengan tabel kartu stok bantuan.',
            r3: 'Mampu mengelola kartu persediaan sistem perpetual FIFO dan Moving Average secara akurat dan mandiri.',
            r4: 'Mampu membandingkan dampak metode persediaan FIFO vs Average terhadap besaran laba kotor perusahaan.',
            teknik: 'Uji praktik kartu persediaan'
          },
          {
            teks: 'menyusun jurnal penyesuaian persediaan, kertas kerja, dan laporan keuangan perusahaan dagang',
            jp: 14,
            ind: 'Peserta didik dapat membuat penyesuaian persediaan pendekatan Ikhtisar Laba/Rugi dan pendekatan HPP, serta menyusun laporan keuangan lengkap.',
            r1: 'Kesulitan menutup saldo persediaan awal dan mengakui persediaan akhir.',
            r2: 'Dapat menyusun neraca lajur dagang dengan template formula.',
            r3: 'Mampu menyusun neraca lajur dan laporan keuangan perusahaan dagang (Laba Rugi bertahap, Neraca, Arus Kas) secara mandiri.',
            r4: 'Mampu menyusun jurnal penutup, jurnal pembalik, dan neraca saldo setelah penutupan perusahaan dagang secara sempurna.',
            teknik: 'Portofolio siklus dagang lengkap'
          }
        ]
      },
      {
        nama: 'Akuntansi Biaya dan Harga Pokok Produksi Manufaktur',
        sem: 2,
        elemen: 'Akuntansi Perusahaan Manufaktur',
        tps: [
          {
            teks: 'mengklasifikasi biaya produksi (BBB, BTKL, BOP) dan mencatat transaksi pemakaian bahan baku serta biaya tenaga kerja',
            jp: 12,
            ind: 'Peserta didik dapat membedakan biaya utama (prime cost), biaya konversi, dan biaya periodik pada proses industri pabrik.',
            r1: 'Masih tertukar antara biaya overhead pabrik dan beban operasional administrasi.',
            r2: 'Dapat mengelompokkan elemen biaya manufaktur dengan panduan daftar akun biaya.',
            r3: 'Mampu mencatat perolehan bahan baku, bukti permintaan bahan, dan daftar upah pabrik secara tepat dan mandiri.',
            r4: 'Mampu menghitung tarif BOP yang ditentukan di muka dan menganalisis selisih pembebanan BOP (over/underapplied).',
            teknik: 'Praktik akuntansi biaya manufaktur'
          },
          {
            teks: 'menghitung harga pokok produksi metode harga pokok pesanan (Job Order Costing) dan metode harga pokok proses (Process Costing)',
            jp: 14,
            ind: 'Peserta didik dapat mengisi kartu harga pokok pesanan dan menyusun laporan biaya produksi per departemen dengan unit ekuivalen.',
            r1: 'Kesulitan menghitung unit ekuivalen pada barang dalam proses akhir.',
            r2: 'Dapat menghitung harga pokok pesanan sederhana dengan rumus panduan.',
            r3: 'Mampu menyusun kartu harga pokok pesanan dan laporan biaya produksi metode proses secara tepat dan mandiri.',
            r4: 'Mampu menyajikan laporan harga pokok produksi manufaktur dan menganalisis efisiensi biaya produksi antar-periode.',
            teknik: 'Studi kasus manufaktur dan tes tertulis'
          }
        ]
      }
    ]
  };
}

// 6. Komputer Akuntansi (Fase F - XI/XII SMK)
export function generateKomputerAkuntansi(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Setup Data Awal Perusahaan dan Bagan Akun',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu membuat data file baru perusahaan, mengatur periode akuntansi, mengimpor/membuat daftar akun (chart of accounts), menetapkan tipe akun, dan mengatur akun-akun penghubung (linked accounts) pada aplikasi komputer akuntansi (seperti MYOB, Accurate, atau spreadsheet akuntansi).`
      },
      {
        elemen: 'Pengaturan Pajak dan Data Master Kartu Pembantu',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengatur kode pajak (PPN/VAT), termin dan syarat pembayaran, serta membuat kartu pembantu piutang (customer card), kartu pembantu utang (supplier card), dan kartu persediaan barang dagang (item card).`
      },
      {
        elemen: 'Entri Saldo Awal Neraca dan Kartu Pembantu',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengentri saldo awal neraca (opening balance) hingga historical balancing bernilai nol (0), mengentri saldo awal piutang dagang, saldo awal utang dagang, serta saldo awal dan kuantitas persediaan barang dagang.`
      },
      {
        elemen: 'Pemrosesan Transaksi Pembelian, Penjualan, dan Kas',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengentri transaksi pembelian tunai/kredit, retur pembelian, pembayaran utang dengan diskon, transaksi penjualan tunai/kredit, retur penjualan, penerimaan piutang dagang, serta penerimaan dan pengeluaran kas/bank/kas kecil secara terkomputerisasi.`
      },
      {
        elemen: 'Pemrosesan Penyesuaian, Audit Laporan Keuangan, dan Backup File',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengentri transaksi jurnal penyesuaian akhir periode, melakukan rekonsiliasi akun kas bank, memeriksa kebenaran laporan audit trail, mencetak laporan keuangan digital (Laba Rugi, Neraca, Arus Kas), serta melakukan backup data perusahaan secara aman.`
      }
    ],
    units: [
      {
        nama: topik ? `Setup Data Perusahaan & ${topik}` : 'Setup Data Awal dan Bagan Akun Komputer Akuntansi',
        sem: 1,
        elemen: 'Setup Data Awal Perusahaan dan Bagan Akun',
        tps: [
          {
            teks: 'membuat file data perusahaan baru, mengatur periode akuntansi, dan mengkonfigurasi linked accounts',
            jp: 8,
            ind: 'Peserta didik dapat memasukkan profil entitas, menentukan 12/13 bulan periode fiskal, dan menghubungkan akun buku besar secara tepat.',
            r1: 'Masih keliru mengatur bulan konversi dan periode akuntansi sehingga tahun transaksi terkunci salah.',
            r2: 'Dapat membuat file baru dengan panduan modul step-by-step.',
            r3: 'Mampu membuat file perusahaan baru dan mengatur linked accounts secara tepat, cepat, dan mandiri.',
            r4: 'Mampu mengoreksi struktur klasifikasi akun header-detail dan memodifikasi bagan akun sesuai karakteristik entitas.',
            teknik: 'Uji praktik komputer akuntansi'
          },
          {
            teks: 'mengimpor dan mengedit daftar bagan akun (Chart of Accounts) dari lembar kerja spreadsheet',
            jp: 8,
            ind: 'Peserta didik dapat membuat format file teks/CSV impor akun, mencocokkan field akun, dan mengeliminasi duplikasi akun.',
            r1: 'Gagal mengimpor daftar akun karena format kolom tidak sesuai spesifikasi software.',
            r2: 'Dapat mengimpor akun dengan file template siap pakai dari guru.',
            r3: 'Mampu menyiapkan data impor akun, memvalidasi tipe akun, dan menghapus akun default yang tidak terpakai secara mandiri.',
            r4: 'Mampu merancang bagan akun komprehensif untuk perusahaan dagang multi-cabang.',
            teknik: 'Praktik impor data akun'
          }
        ]
      },
      {
        nama: 'Setup Pajak, Kartu Pelanggan, Pemasok, dan Saldo Awal',
        sem: 1,
        elemen: 'Pengaturan Pajak dan Data Master Kartu Pembantu',
        tps: [
          {
            teks: 'mengatur tarif pajak PPN/VAT, termin pembayaran, serta membuat kartu pembantu customer dan supplier',
            jp: 10,
            ind: 'Peserta didik dapat mengatur kode pajak Masukan/Keluaran, batas kredit, syarat diskon pembayaran, dan kontak mitra bisnis.',
            r1: 'Tarif pajak belum terhubung ke akun PPN Masukan dan PPN Keluaran yang tepat.',
            r2: 'Dapat membuat kartu pelanggan dengan data acuan soal.',
            r3: 'Mampu mengatur kode pajak dan kartu pembantu relasi bisnis secara akurat dan mandiri.',
            r4: 'Mampu mengonfigurasi klasifikasi termin pembayaran kompleks (COD, EOM, n/30, 2/10 n/30) dan denda keterlambatan.',
            teknik: 'Unjuk kerja setup master data'
          },
          {
            teks: 'mengentri saldo awal neraca (historical balancing = 0), saldo piutang, utang, dan kartu persediaan barang',
            jp: 10,
            ind: 'Peserta didik dapat memasukkan neraca saldo awal sampai selisih nol dan memasukkan saldo pembantu sampai out of balance nol.',
            r1: 'Historical balancing masih menunjukkan angka selisih (belum nol).',
            r2: 'Dapat menyelesaikan entri saldo awal dengan bantuan bimbingan letak akun kontra.',
            r3: 'Mampu mengentri seluruh saldo awal akun dan saldo pembantu secara presisi hingga nol secara mandiri.',
            r4: 'Mampu mendeteksi dan memperbaiki kekeliruan input saldo awal debit-kredit tanpa mengulang pembuatan file.',
            teknik: 'Verifikasi saldo nol dan unjuk kerja'
          }
        ]
      },
      {
        nama: 'Pemrosesan Transaksi Pembelian, Penjualan, dan Kas Bank',
        sem: 2,
        elemen: 'Pemrosesan Transaksi Pembelian, Penjualan, dan Kas',
        tps: [
          {
            teks: 'memproses transaksi pembelian barang dagang, biaya angkut, retur pembelian, dan pembayaran utang',
            jp: 14,
            ind: 'Peserta didik dapat mengentri Purchase Order, Bill, Debit Note retur, dan Pay Bills pada modul software akuntansi.',
            r1: 'Salah memilih layout modul pembelian dan keliru menerapkan akun retur.',
            r2: 'Dapat mengentri faktur pembelian dengan bimbingan menu transaksi.',
            r3: 'Mampu memproses siklus transaksi pembelian dan pembayaran utang secara tepat waktu, tepat akun, dan mandiri.',
            r4: 'Mampu menangani transaksi diskon pelunasan lebih awal dan potongan utang dengan denda.',
            teknik: 'Praktik transaksi komputer pembelian'
          },
          {
            teks: 'memproses transaksi penjualan barang dagang, retur penjualan, dan penerimaan pelunasan piutang pelanggan',
            jp: 14,
            ind: 'Peserta didik dapat mengentri Sales Invoice, Credit Note retur penjualan, dan Receive Payments pada modul software akuntansi.',
            r1: 'Retur penjualan belum dialokasikan ke faktur asal (apply to sale).',
            r2: 'Dapat mengentri faktur penjualan tunai dan kredit dengan panduan modul.',
            r3: 'Mampu memproses seluruh transaksi penjualan dan penerimaan piutang secara teliti, balance, dan mandiri.',
            r4: 'Mampu menganalisis batas limit kredit pelanggan dan menolak transaksi penjualan jika melebihi plafon piutang.',
            teknik: 'Praktik transaksi komputer penjualan'
          }
        ]
      },
      {
        nama: 'Transaksi Penyesuaian, Pelaporan Keuangan, dan Backup File',
        sem: 2,
        elemen: 'Pemrosesan Penyesuaian, Audit Laporan Keuangan, dan Backup File',
        tps: [
          {
            teks: 'mengentri transaksi jurnal penyesuaian akhir periode dan merekonsiliasi saldo rekening kas bank',
            jp: 10,
            ind: 'Peserta didik dapat mengentri Record Journal Entry untuk penyusutan, beban dibayar di muka, dan rekonsiliasi bank otomatis.',
            r1: 'Masih keliru menjurnal akun penyesuaian penyusutan aset tetap.',
            r2: 'Dapat melakukan rekonsiliasi kas bank dengan panduan rekening koran di layar.',
            r3: 'Mampu menyelesaikan entri penyesuaian dan rekonsiliasi bank sampai status reconciled secara mandiri.',
            r4: 'Mampu melakukan closing period dan menganalisis audit trail report untuk menjamin integritas data akuntansi.',
            teknik: 'Uji kompetensi penyesuaian & rekonsiliasi'
          },
          {
            teks: 'menyajikan, mengekspor laporan keuangan digital (Neraca, Laba Rugi, Arus Kas) dan membuat backup data',
            jp: 8,
            ind: 'Peserta didik dapat mencetak laporan keuangan ke format PDF/Excel, memeriksa balance neraca, dan membuat file backup (.myo / .gbk).',
            r1: 'Belum menguasai prosedur backup dan penyimpanan file arsip terkompresi.',
            r2: 'Dapat mengekspor laporan laba rugi dengan bimbingan menu report.',
            r3: 'Mampu menyajikan laporan keuangan lengkap dan membuat backup data secara mandiri dan aman.',
            r4: 'Mampu menyajikan visualisasi ringkasan rasio profitabilitas dan likuiditas dari dashboard komputer akuntansi.',
            teknik: 'Portofolio laporan digital dan backup data'
          }
        ]
      }
    ]
  };
}

// 7. Administrasi Perpajakan (Fase F - XI/XII SMK)
export function generateAdministrasiPerpajakan(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Ketentuan Umum dan Tata Cara Perpajakan (KUP)',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami konsep dasar perpajakan di Indonesia, fungsi dan asas pemungutan pajak, hak dan kewajiban wajib pajak, tata cara pendaftaran NPWP (termasuk integrasi NIK sebagai NPWP), pengukuhan Pengusaha Kena Pajak (PKP), sistem pemungutan pajak (Official, Self, Withholding), serta sanksi administrasi dan pidana perpajakan.`
      },
      {
        elemen: 'Pajak Penghasilan (PPh) Orang Pribadi dan PPh Pasal 21',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami subjek dan objek PPh, menghitung Penghasilan Tidak Kena Pajak (PTKP), tarif progresif PPh Pasal 17, skema Tarif Efektif Rata-Rata (TER) PPh Pasal 21 bulanan dan tahunan bagi pegawai tetap, pegawai tidak tetap, dan bukan pegawai, serta penyusunan bukti pemotongan PPh Pasal 21.`
      },
      {
        elemen: 'Pajak Penghasilan Badan dan Pemotongan/Pemungutan (PPh 22, 23, 24, 25, 4(2))',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menghitung PPh Pasal 22 transaksi instansi/impor, PPh Pasal 23 atas dividen/bunga/royalti/jasa, PPh Pasal 24 kredit pajak luar negeri, angsuran PPh Pasal 25, PPh Final Pasal 4 ayat (2) atas sewa tanah/bangunan dan UMKM PP 55/2022, serta rekonsiliasi fiskal positif dan negatif dalam penghitungan PPh Badan terutang.`
      },
      {
        elemen: 'Pajak Pertambahan Nilai (PPN) dan PPnBM',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami mekanisme PPN di Indonesia, penyerahan Barang/Jasa Kena Pajak (BKP/JKP), Dasar Pengenaan Pajak (DPP), penghitungan Pajak Masukan dan Pajak Keluaran dengan tarif PPN 11%/12%, serta pemungutan Pajak Penjualan atas Barang Mewah (PPnBM).`
      },
      {
        elemen: 'Aplikasi Perpajakan Elektronik dan Pelaporan SPT',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengoperasikan aplikasi perpajakan digital Ditjen Pajak (e-Faktur, e-Bupot Unifikasi, e-Billing, e-Filing / DJP Online) untuk pembuatan faktur pajak elektronik, pembuatan kode billing pembayaran pajak, serta pengisian dan pelaporan SPT Masa dan SPT Tahunan PPh Orang Pribadi (1770/1770S) dan Badan (1771).`
      }
    ],
    units: [
      {
        nama: topik ? `KUP, Pendaftaran Pajak & ${topik}` : 'Ketentuan Umum Perpajakan dan Nomor Pokok Wajib Pajak',
        sem: 1,
        elemen: 'Ketentuan Umum dan Tata Cara Perpajakan (KUP)',
        tps: [
          {
            teks: 'menganalisis hak dan kewajiban Wajib Pajak, tata cara integrasi NIK menjadi NPWP, dan pengukuhan PKP',
            jp: 8,
            ind: 'Peserta didik dapat menguraikan syarat pendaftaran NPWP orang pribadi dan badan serta hak keberatan/banding pajak.',
            r1: 'Belum memahami sanksi keterlambatan pelaporan SPT dan pembayaran pajak.',
            r2: 'Dapat mengisi formulir pendaftaran NPWP secara manual dengan contoh panduan.',
            r3: 'Mampu menganalisis hak kewajiban wajib pajak dan menyimulasikan pendaftaran NPWP online secara mandiri.',
            r4: 'Mampu mengevaluasi pentingnya kepatuhan pajak sukarela (tax compliance) bagi pembiayaan APBN pembangunan nasional.',
            teknik: 'Studi kasus perpajakan dan tes tertulis'
          },
          {
            teks: 'menghitung sanksi administrasi bunga, denda, dan kenaikan berdasarkan Undang-Undang Harmonisasi Peraturan Perpajakan (UU HPP)',
            jp: 8,
            ind: 'Peserta didik dapat menghitung sanksi bunga pasal 19 KUP berdasarkan suku bunga acuan per bulan.',
            r1: 'Sering keliru menerapkan tarif bunga sanksi KUP yang dinamis.',
            r2: 'Dapat menghitung denda keterlambatan SPT Masa dengan tabel bantuan.',
            r3: 'Mampu menghitung besaran sanksi administrasi pajak secara akurat, teliti, dan mandiri.',
            r4: 'Mampu menyusun surat permohonan pengurangan atau penghapusan sanksi administrasi perpajakan.',
            teknik: 'Latihan hitung sanksi pajak'
          }
        ]
      },
      {
        nama: 'Penghitungan dan Pemotongan PPh Pasal 21 (Skema TER)',
        sem: 1,
        elemen: 'Pajak Penghasilan (PPh) Orang Pribadi dan PPh Pasal 21',
        tps: [
          {
            teks: 'menghitung pemotongan PPh Pasal 21 bulanan bagi pegawai tetap menggunakan Tarif Efektif Rata-Rata (TER Kategori A, B, C)',
            jp: 12,
            ind: 'Peserta didik dapat menentukan PTKP berdasarkan status tanggungan (TK/0 s.d K/3), menentukan tabel TER, dan menghitung potongan PPh 21 Masa.',
            r1: 'Salah menentukan kategori TER (A/B/C) berdasarkan status PTKP pegawai.',
            r2: 'Dapat menghitung PPh 21 masa bulanan dengan tabel TER yang disediakan.',
            r3: 'Mampu menghitung potongan PPh 21 bulanan seluruh kategori pegawai secara tepat, cepat, dan mandiri.',
            r4: 'Mampu menghitung rekonsiliasi PPh Pasal 21 Masa Desember (tarif Pasal 17 dikurangi akumulasi potongan bulanan).',
            teknik: 'Praktik hitung PPh 21 dan lembar kerja'
          },
          {
            teks: 'menghitung PPh Pasal 21 pegawai tidak tetap, tenaga ahli, dan membuat Bukti Pemotongan 1721-A1',
            jp: 10,
            ind: 'Peserta didik dapat menghitung PPh 21 upah harian/borongan, honorarium dokter/pengacara, dan mengisi formulir 1721-A1.',
            r1: 'Belum memahami batas upah harian tidak kena potong pajak.',
            r2: 'Dapat mengisi formulir bukti potong 1721-A1 dengan bantuan data gaji.',
            r3: 'Mampu menghitung PPh 21 bukan pegawai dan menyusun bukti potong resmi secara mandiri.',
            r4: 'Mampu menganalisis efisiensi tax planning pemberian tunjangan PPh 21 vs metode gross-up bagi perusahaan.',
            teknik: 'Penyusunan bukti potong 1721-A1'
          }
        ]
      },
      {
        nama: 'Pemotongan PPh Pasal 22, 23, 24, 4(2) dan PPN 11%/12%',
        sem: 2,
        elemen: 'Pajak Penghasilan Badan dan Pemotongan/Pemungutan (PPh 22, 23, 24, 25, 4(2))',
        tps: [
          {
            teks: 'menghitung pemotongan PPh Pasal 22, Pasal 23, dan PPh Final Pasal 4 ayat (2) atas transaksi bisnis',
            jp: 12,
            ind: 'Peserta didik dapat menghitung PPh 22 pengadaan barang instansi pemerintah, PPh 23 sewa aset dan jasa teknik (2%), serta PPh final sewa gedung (10%).',
            r1: 'Masih tertukar tarif PPh 23 bagi wajib pajak yang memiliki NPWP dan tidak memiliki NPWP (100% lebih tinggi).',
            r2: 'Dapat menghitung potongan PPh 23 jasa dengan rumus acuan.',
            r3: 'Mampu menghitung seluruh pemotongan PPh withholding tax secara tepat, teliti, dan mandiri.',
            r4: 'Mampu menyusun daftar bukti potong e-Bupot Unifikasi dan membuat kode billing setor pajak.',
            teknik: 'Uji praktik pemotongan pajak'
          },
          {
            teks: 'menghitung PPN Masukan, PPN Keluaran, dan PPN Terutang (Kurang/Lebih Bayar)',
            jp: 12,
            ind: 'Peserta didik dapat menghitung DPP, PPN 11%/12%, mengkreditkan Pajak Masukan, dan menentukan status lebih/kurang bayar pada SPT Masa PPN 1111.',
            r1: 'Keliru membedakan Pajak Masukan yang dapat dikreditkan dan yang tidak dapat dikreditkan.',
            r2: 'Dapat menghitung PPN keluaran transaksi penjualan barang kena pajak.',
            r3: 'Mampu menghitung kompensasi PPN lebih bayar dan PPN terutang secara tepat dan mandiri.',
            r4: 'Mampu menganalisis mekanisme pengembalian kelebihan pembayaran pajak (restitusi PPN) bagi eksportir.',
            teknik: 'Penyelesaian kasus PPN'
          }
        ]
      },
      {
        nama: 'Rekonsiliasi Fiskal, e-Faktur, dan Pelaporan SPT Tahunan',
        sem: 2,
        elemen: 'Aplikasi Perpajakan Elektronik dan Pelaporan SPT',
        tps: [
          {
            teks: 'melakukan rekonsiliasi fiskal positif dan negatif serta menghitung PPh Terutang Badan (Fasilitas Pasal 31E)',
            jp: 14,
            ind: 'Peserta didik dapat mengoreksi beban natura, sumbangan, sanksi pajak, pendapatan bunga bank, dan menghitung laba fiskal.',
            r1: 'Masih tertukar pengaruh koreksi fiskal positif vs negatif terhadap laba kena pajak.',
            r2: 'Dapat mengidentifikasi pos beda tetap dan beda waktu dengan bimbingan pedoman UU PPh.',
            r3: 'Mampu menyusun kertas kerja rekonsiliasi fiskal dan menghitung PPh Badan terutang secara mandiri dan akurat.',
            r4: 'Mampu mengisi formulir Lampiran Khusus dan Formulir Induk SPT Tahunan PPh Badan 1771.',
            teknik: 'Studi kasus rekonsiliasi fiskal badan'
          },
          {
            teks: 'mengoperasikan aplikasi e-Faktur, e-Billing, dan pelaporan SPT via DJP Online',
            jp: 10,
            ind: 'Peserta didik dapat mengunggah faktur pajak elektronik, mendapatkan approval DJP, membuat kode billing, dan submit SPT di e-Filing.',
            r1: 'Masih kesulitan memahami kode status approval faktur pajak elektronik.',
            r2: 'Dapat membuat kode billing setoran pajak pada menu DJP Online.',
            r3: 'Mampu menyelesaikan alur administrasi perpajakan digital dari faktur sampai Bukti Penerimaan Elektronik (BPE) secara mandiri.',
            r4: 'Mampu menyusun portofolio kepatuhan pajak perusahaan dagang tahunan secara utuh dan siap audit.',
            teknik: 'Simulasi aplikasi e-Faktur dan e-Filing'
          }
        ]
      }
    ]
  };
}

// 8. Akuntansi Keuangan (Fase F - XI/XII SMK)
export function generateAkuntansiKeuangan(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Pengelolaan Kas Kecil dan Kas Bank',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengelola dana kas kecil dengan sistem dana tetap (imprest fund system) dan dana tidak tetap (fluktuasi), melakukan pemeriksaan fisik kas (cash opname), serta menyusun rekonsiliasi bank (bentuk 2 kolom, 4 kolom, dan 8 kolom) beserta jurnal penyesuaiannya.`
      },
      {
        elemen: 'Pengelolaan Piutang dan Wesel Tagih',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengelola kartu piutang dagang, melakukan konfirmasi saldo piutang, menaksir kerugian piutang tak tertagih dengan metode langsung (direct write-off) dan metode cadangan (allowance method), serta mencatat transaksi penarikan, pendiskontoan, dan pelunasan wesel tagih (notes receivable).`
      },
      {
        elemen: 'Pengelolaan Persediaan Barang Dagang',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menerapkan metode pencatatan persediaan sistem fisik dan perpetual, metode penilaian persediaan (FIFO, LIFO, Moving Average), penaksiran nilai persediaan metode laba kotor dan metode harga eceran, serta penilaian persediaan berdasarkan nilai terendah antara harga pokok dan nilai realisasi bersih (LCNRV).`
      },
      {
        elemen: 'Pengelolaan Aset Tetap dan Aset Tak Berwujud',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menentukan harga perolehan aset tetap, menghitung penyusutan aset tetap dengan berbagai metode (garis lurus, saldo menurun ganda, jumlah angka tahun, satuan jam kerja/hasil produksi), mencatat pengeluaran modal dan pendapatan, mencatat pelepasan/pertukaran aset tetap, serta amortisasi aset tak berwujud.`
      },
      {
        elemen: 'Pengelolaan Utang dan Ekuitas Badan Usaha',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mencatat utang lancar (utang dagang, utang wesel, utang beban), utang jangka panjang (penerbitan obligasi, amortisasi agio/disagio obligasi, utang hipotek), serta pencatatan ekuitas perusahaan perseorangan, firma, CV, perseroan terbatas (PT mencakup modal saham dan dividen), serta sisa hasil usaha (SHU) koperasi.`
      }
    ],
    units: [
      {
        nama: topik ? `Pengelolaan Kas Kecil, Bank & ${topik}` : 'Pengelolaan Kas Kecil dan Rekonsiliasi Bank',
        sem: 1,
        elemen: 'Pengelolaan Kas Kecil dan Kas Bank',
        tps: [
          {
            teks: 'menerapkan pengelolaan dana kas kecil sistem dana tetap (imprest) dan sistem fluktuasi serta pencatatan selisih kas',
            jp: 10,
            ind: 'Peserta didik dapat membuat bukti pengeluaran, mencatat jurnal pembentukan, pengisian kembali, dan jurnal selisih kas kecil.',
            r1: 'Masih keliru menjurnal pengeluaran kas kecil pada sistem dana tetap.',
            r2: 'Dapat mencatat mutasi kas kecil sistem imprest dengan bantuan format tabel.',
            r3: 'Mampu mencatat transaksi kas kecil kedua sistem secara mandiri, rapi, dan seimbang.',
            r4: 'Mampu menganalisis efektivitas pengendalian internal kas kecil dan merancang formulir pengawasan kas.',
            teknik: 'Praktik pencatatan kas kecil'
          },
          {
            teks: 'menyusun rekonsiliasi bank dan membuat jurnal penyesuaian yang diperlukan',
            jp: 12,
            ind: 'Peserta didik dapat mengidentifikasi deposit in transit, outstanding check, jasa giro, biaya administrasi bank, notifikasi inkaso, dan koreksi kesalahan.',
            r1: 'Kesulitan membedakan pos yang menambah/mengurangi saldo kas perusahaan vs saldo rekening koran bank.',
            r2: 'Dapat menyusun rekonsiliasi bank 2 kolom dengan bimbingan pos penyesuaian.',
            r3: 'Mampu menyusun rekonsiliasi bank hingga saldo kas yang benar dan mencatat jurnal penyesuaian secara mandiri.',
            r4: 'Mampu menyusun rekonsiliasi bank bentuk 4 kolom (rekonsiliasi penerimaan dan pengeluaran kas).',
            teknik: 'Uji praktik rekonsiliasi bank'
          }
        ]
      },
      {
        nama: 'Pengelolaan Piutang Dagang dan Wesel Tagih',
        sem: 1,
        elemen: 'Pengelolaan Piutang dan Wesel Tagih',
        tps: [
          {
            teks: 'menaksir dan mencatat beban kerugian piutang tak tertagih dengan metode cadangan dan metode penghapusan langsung',
            jp: 10,
            ind: 'Peserta didik dapat menghitung cadangan piutang berdasarkan persentase penjualan dan analisis umur piutang (aging schedule).',
            r1: 'Belum memahami penyesuaian saldo cadangan piutang yang sudah ada sebelumnya.',
            r2: 'Dapat menghitung beban piutang metode persentase piutang dengan rumus acuan.',
            r3: 'Mampu menyusun tabel umur piutang, menghitung taksiran kerugian, dan menjurnal secara tepat dan mandiri.',
            r4: 'Mampu mencatat penerimaan kembali piutang yang telah dihapuskan pada periode berjalan dan periode berikutnya.',
            teknik: 'Studi kasus piutang tak tertagih'
          },
          {
            teks: 'mencatat transaksi penarikan, pendiskontoan, dan pelunasan wesel tagih berbunga dan tidak berbunga',
            jp: 10,
            ind: 'Peserta didik dapat menentukan tanggal jatuh tempo wesel, menghitung nilai jatuh tempo, dan menghitung diskonto wesel.',
            r1: 'Sering keliru menghitung hari diskonto dan bunga wesel berjangka.',
            r2: 'Dapat menghitung nilai jatuh tempo wesel berbunga dengan rumus bantuan.',
            r3: 'Mampu menghitung uang yang diterima saat pendiskontoan wesel dan mencatat jurnalnya secara mandiri.',
            r4: 'Mampu mencatat jurnal saat wesel tagih didiskontokan ditolak pembayarannya oleh pembuat wesel (dishonored notes).',
            teknik: 'Tes tertulis dan penyelesaian soal'
          }
        ]
      },
      {
        nama: 'Penilaian Persediaan Barang Dagang dan Aset Tetap',
        sem: 2,
        elemen: 'Pengelolaan Persediaan Barang Dagang',
        tps: [
          {
            teks: 'menerapkan penilaian persediaan barang dagang metode laba kotor, metode eceran, dan konsep LCNRV',
            jp: 12,
            ind: 'Peserta didik dapat menaksir nilai persediaan barang yang hilang/rusak dan menerapkan prinsip Lower of Cost or Net Realizable Value.',
            r1: 'Belum memahami hubungan persentase laba kotor atas penjualan vs atas harga pokok.',
            r2: 'Dapat menaksir persediaan dengan rumus laba kotor sederhana.',
            r3: 'Mampu menghitung estimasi persediaan dan penurunan nilai persediaan (impairment) secara tepat dan mandiri.',
            r4: 'Mampu mengevaluasi dampak pemilihan metode penilaian persediaan terhadap nilai aset lancar di laporan neraca.',
            teknik: 'Uji kompetensi perhitungan persediaan'
          },
          {
            teks: 'menghitung penyusutan aset tetap dengan berbagai metode dan mencatat penghentian/pertukaran aset tetap',
            jp: 14,
            ind: 'Peserta didik dapat menghitung beban depresiasi metode garis lurus, saldo menurun ganda, jumlah angka tahun, dan unit produksi serta laba/rugi pelepasan aset.',
            r1: 'Sering keliru menghitung tarif saldo menurun ganda dan penyusutan untuk periode fraksional/tahunan berjalan.',
            r2: 'Dapat menghitung beban penyusutan metode garis lurus dengan rumus standar.',
            r3: 'Mampu menghitung penyusutan ke-4 metode dan mencatat pertukaran aset tetap sejenis/tidak sejenis secara mandiri.',
            r4: 'Mampu membedakan pengeluaran modal (capital expenditure) dan pendapatan (revenue expenditure) serta implikasi perpajakannya.',
            teknik: 'Portofolio aset tetap dan tes tertulis'
          }
        ]
      },
      {
        nama: 'Utang Jangka Panjang, Obligasi, dan Ekuitas Perusahaan',
        sem: 2,
        elemen: 'Pengelolaan Utang dan Ekuitas Badan Usaha',
        tps: [
          {
            teks: 'mencatat penerbitan utang obligasi, amortisasi agio/disagio obligasi, dan pelunasan obligasi sebelum jatuh tempo',
            jp: 12,
            ind: 'Peserta didik dapat menghitung harga jual obligasi (nilai sekarang pokok dan bunga), amortisasi metode garis lurus, dan bunga berjalan.',
            r1: 'Belum memahami konsep agio dan disagio obligasi terkait suku bunga nominal vs pasar.',
            r2: 'Dapat mencatat penerbitan obligasi pada nilai nominal dengan bantuan panduan akun.',
            r3: 'Mampu menghitung amortisasi agio/disagio dan menjurnal pembayaran bunga berkala secara tepat dan mandiri.',
            r4: 'Mampu menghitung laba/rugi pelunasan obligasi sebelum jatuh tempo dan menyajikan utang obligasi di neraca.',
            teknik: 'Studi kasus obligasi dan tes'
          },
          {
            teks: 'mencatat transaksi ekuitas perseroan terbatas (modal saham, agio, dividen) dan pembagian SHU koperasi',
            jp: 12,
            ind: 'Peserta didik dapat menjurnal penerbitan saham di atas nilai pari, pembagian dividen kas dan saham, serta alokasi SHU anggota koperasi.',
            r1: 'Masih tertukar antara tanggal deklarasi, tanggal pencatatan, dan tanggal pembayaran dividen.',
            r2: 'Dapat mencatat penerbitan saham biasa secara tunai dengan bantuan format jurnal.',
            r3: 'Mampu mencatat siklus dividen PT dan menghitung pembagian SHU jasa modal dan jasa usaha koperasi secara mandiri.',
            r4: 'Mampu menyajikan struktur ekuitas perseroan terbatas (laba ditahan, saham treasuri, cadangan) pada laporan posisi keuangan.',
            teknik: 'Penyusunan laporan ekuitas dan tes'
          }
        ]
      }
    ]
  };
}

// 9. Konsentrasi Keahlian Akuntansi dan Keuangan Lembaga (Fase F - XI/XII SMK) - Paket Inti
export function generateKonsentrasiAkl(fase: string, kelas: string, topik: string): CurriculumResponse {
  return {
    isFallback: true,
    cp: [
      {
        elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami siklus akuntansi perusahaan jasa, dagang, dan manufaktur, menganalisis dokumen transaksi, menyusun jurnal khusus dan umum, mengelola kartu persediaan (FIFO, LIFO, Moving Average), menyusun kertas kerja, serta menyajikan laporan keuangan lengkap sesuai standar SAK EMKM / SAK ETAP.`
      },
      {
        elemen: 'Akuntansi Keuangan',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengelola dana kas kecil dan kas bank (rekonsiliasi bank), mengelola kartu piutang dan wesel tagih, menilai persediaan barang dagang, mengelola aset tetap dan depresiasi, mencatat utang lancar dan utang jangka panjang (obligasi), serta mencatat ekuitas berbagai bentuk badan usaha (PT, CV, Koperasi).`
      },
      {
        elemen: 'Akuntansi Lembaga / Instansi Pemerintah',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami standar akuntansi pemerintahan (SAP Akrual PP 71/2010), tata kelola keuangan daerah dan desa, melakukan pencatatan transaksi finansial (LO) dan transaksi anggaran (LRA), serta menyusun laporan keuangan pemerintah daerah (LRA, LO, Neraca, LPE, CaLK).`
      },
      {
        elemen: 'Komputer Akuntansi',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengoperasikan aplikasi komputer akuntansi (seperti MYOB, Accurate, atau spreadsheet) untuk membuat file perusahaan baru, setup bagan akun, kartu pembantu, mengentri transaksi pembelian, penjualan, penerimaan/pengeluaran kas, jurnal penyesuaian, serta menghasilkan laporan keuangan digital.`
      },
      {
        elemen: 'Perpajakan',
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami ketentuan umum perpajakan (KUP), menghitung PPh Pasal 21 skema TER, PPh Badan, PPh Final PP 55, PPN 11%/12%, mengoperasikan aplikasi e-Faktur dan e-Bupot Unifikasi, serta menyusun dan melaporkan SPT Masa dan SPT Tahunan via DJP Online.`
      }
    ],
    units: [
      {
        nama: topik ? `Siklus Akuntansi Dagang, Kas, Bank & ${topik}` : 'Siklus Akuntansi Perusahaan Dagang dan Pengelolaan Kas',
        sem: 1,
        elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        tps: [
          {
            teks: 'mencatat transaksi perdagangan ke dalam jurnal khusus, buku pembantu, dan kartu persediaan perpetual',
            jp: 14,
            ind: 'Peserta didik dapat menyusun jurnal khusus dagang, kartu stok FIFO/Average, dan merekapitulasi buku besar.',
            r1: 'Masih keliru mencatat mutasi kartu stok dan rekapitulasi jurnal khusus.',
            r2: 'Dapat mencatat transaksi dagang rutin dengan panduan daftar akun.',
            r3: 'Mampu menyelesaikan siklus jurnal khusus dan kartu persediaan secara tepat dan mandiri.',
            r4: 'Mampu menyusun neraca lajur dan laporan keuangan perusahaan dagang secara komprehensif.',
            teknik: 'Praktik siklus akuntansi dagang'
          },
          {
            teks: 'mengelola kas kecil (imprest/fluktuasi) dan menyusun rekonsiliasi kas bank beserta jurnal penyesuaian',
            jp: 10,
            ind: 'Peserta didik dapat menyelesaikan rekonsiliasi bank 2 kolom dan membuat jurnal penyesuaian rekening koran.',
            r1: 'Kesulitan menentukan pos penyesuaian kas perusahaan vs saldo bank.',
            r2: 'Dapat menyusun rekonsiliasi bank sederhana dengan template panduan.',
            r3: 'Mampu menyusun rekonsiliasi bank hingga saldo benar dan mencatat jurnal penyesuaian secara mandiri.',
            r4: 'Mampu menganalisis selisih kas dan merancang SOP verifikasi kas bank.',
            teknik: 'Praktik rekonsiliasi kas bank'
          }
        ]
      },
      {
        nama: 'Komputer Akuntansi Perusahaan Dagang dan PPh Pasal 21',
        sem: 1,
        elemen: 'Komputer Akuntansi',
        tps: [
          {
            teks: 'mengoperasikan software komputer akuntansi untuk setup data awal, master data kartu, dan entri transaksi dagang',
            jp: 14,
            ind: 'Peserta didik dapat membuat file baru, mengentri saldo awal neraca (balance nol), dan memproses faktur pembelian/penjualan.',
            r1: 'Saldo awal neraca pada komputer akuntansi masih belum seimbang.',
            r2: 'Dapat mengentri transaksi pembelian dan penjualan dengan petunjuk modul.',
            r3: 'Mampu memproses transaksi dagang terkomputerisasi sampai laporan laba rugi dan neraca secara mandiri.',
            r4: 'Mampu menyelesaikan audit trail report dan backup data perusahaan secara aman.',
            teknik: 'Unjuk kerja komputer akuntansi'
          },
          {
            teks: 'menghitung pemotongan PPh Pasal 21 skema Tarif Efektif Rata-Rata (TER) dan administrasi bukti potong pajak',
            jp: 10,
            ind: 'Peserta didik dapat menentukan kategori TER berdasarkan status PTKP dan menghitung PPh 21 bulanan karyawan.',
            r1: 'Salah menentukan kategori tarif TER (A, B, C) untuk wajib pajak kawin/tidak kawin.',
            r2: 'Dapat menghitung potongan PPh 21 dengan tabel acuan TER.',
            r3: 'Mampu menghitung PPh 21 dan mengisi bukti potong 1721-A1 secara mandiri dan akurat.',
            r4: 'Mampu menganalisis kewajiban pelaporan SPT Masa PPh 21 via e-Bupot unifikasi DJP Online.',
            teknik: 'Tes tertulis dan penyusunan bukti potong'
          }
        ]
      },
      {
        nama: 'Akuntansi Manufaktur, HPP, dan Aset Tetap',
        sem: 2,
        elemen: 'Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur',
        tps: [
          {
            teks: 'menghitung harga pokok produksi (HPP) manufaktur metode pesanan dan proses serta menyusun laporan biaya produksi',
            jp: 14,
            ind: 'Peserta didik dapat menghitung biaya bahan baku, biaya tenaga kerja, alokasi BOP, dan menyusun laporan harga pokok produksi.',
            r1: 'Kesulitan menghitung alokasi BOP dan unit ekuivalen barang dalam proses.',
            r2: 'Dapat menyusun kartu harga pokok pesanan dengan template panduan.',
            r3: 'Mampu menghitung HPP manufaktur dan menyajikan laporan biaya produksi secara tepat dan mandiri.',
            r4: 'Mampu menganalisis efisiensi biaya produksi standar terhadap biaya produksi riil.',
            teknik: 'Praktik akuntansi biaya manufaktur'
          },
          {
            teks: 'menghitung penyusutan aset tetap (garis lurus, saldo menurun ganda) dan mencatat pelepasan aset tetap',
            jp: 10,
            ind: 'Peserta didik dapat menghitung beban depresiasi tahunan dan mencatat laba/rugi penjualan aset tetap.',
            r1: 'Sering keliru menghitung penyusutan periode pecahan bulan berjalan.',
            r2: 'Dapat menghitung depresiasi garis lurus dengan rumus dasar.',
            r3: 'Mampu menghitung depresiasi multi-metode dan mencatat pelepasan aset tetap secara mandiri.',
            r4: 'Mampu membedakan pengeluaran modal dan pendapatan serta dampak pajaknya.',
            teknik: 'Studi kasus aset tetap'
          }
        ]
      },
      {
        nama: 'Akuntansi Lembaga Pemerintah dan Administrasi PPh Badan / PPN',
        sem: 2,
        elemen: 'Akuntansi Lembaga / Instansi Pemerintah',
        tps: [
          {
            teks: 'menerapkan pencatatan transaksi keuangan pemerintah daerah dengan jurnal finansial (LO) dan jurnal anggaran (LRA)',
            jp: 12,
            ind: 'Peserta didik dapat mencatat transaksi SP2D UP/GU/TU/LS pada SKPD dan menyusun format LRA pemerintah daerah.',
            r1: 'Masih tertukar antara pengakuan beban pada jurnal finansial dan belanja pada jurnal anggaran.',
            r2: 'Dapat mencatat jurnal SP2D belanja barang dengan bantuan format kode rekening.',
            r3: 'Mampu menyusun jurnal finansial dan anggaran SKPD pemda secara tepat dan mandiri.',
            r4: 'Mampu menyajikan Laporan Realisasi Anggaran (LRA) dan Neraca Daerah sesuai SAP PP 71/2010.',
            teknik: 'Praktik akuntansi instansi pemerintah'
          },
          {
            teks: 'melakukan rekonsiliasi fiskal positif/negatif, menghitung PPh Badan terutang, dan pelaporan SPT via DJP Online',
            jp: 12,
            ind: 'Peserta didik dapat mengoreksi pos beda tetap/waktu, menghitung PPh Badan fasilitas pasal 31E, dan menyusun faktur PPN 11%/12%.',
            r1: 'Koreksi fiskal positif dan negatif masih terbalik penempatannya.',
            r2: 'Dapat mengidentifikasi beban non-deductible dengan bantuan UU PPh.',
            r3: 'Mampu menyusun kertas kerja rekonsiliasi fiskal dan menghitung PPh Badan terutang secara mandiri dan akurat.',
            r4: 'Mampu menyimulasikan pembuatan faktur pajak e-Faktur dan pengisian SPT Tahunan 1771.',
            teknik: 'Portofolio rekonsiliasi fiskal dan SPT'
          }
        ]
      }
    ]
  };
}

// Router function that correctly prioritizes all subjects in AKL
export function getAklCurriculum(
  mapelInput: string,
  faseInput: string,
  kelasInput: string,
  topikInput: string
): CurriculumResponse | null {
  const mapel = (mapelInput || '').trim();
  const fase = (faseInput || 'F').trim().toUpperCase();
  const kelas = (kelasInput || 'XI').trim().toUpperCase();
  const topik = (topikInput || '').trim();
  const lm = mapel.toLowerCase();

  // 1. Dasar-Dasar Akuntansi dan Keuangan Lembaga (Fase E - Kelas X SMK)
  if (
    lm.includes('dasar') ||
    fase === 'E' ||
    kelas === 'X' ||
    kelas === '10' ||
    kelas.startsWith('X ') ||
    kelas.startsWith('10 ') ||
    kelas === 'KELAS X'
  ) {
    return generateDasarAklCurriculum(fase, kelas, topik);
  }

  // 2. Layanan Perbankan Syariah (Fase F - Kelas XII SMK)
  if (lm.includes('syariah')) {
    return generateLayananPerbankanSyariah(fase, kelas, topik);
  }

  // 3. Layanan Perbankan (Fase F - Kelas XI SMK)
  if (
    lm.includes('layanan perbankan') ||
    lm.includes('perbankan') ||
    (lm.includes('bank') && !lm.includes('darah') && !lm.includes('soal'))
  ) {
    return generateLayananPerbankan(fase, kelas, topik);
  }

  // 4. Praktikum Akuntansi Lembaga / Instansi Pemerintah (Fase F - XI/XII SMK)
  if (
    lm.includes('pemerintah') ||
    lm.includes('pemda') ||
    lm.includes('desa') ||
    lm.includes('sektor publik') ||
    lm.includes('skpd') ||
    (lm.includes('lembaga') && (lm.includes('praktikum') || lm.includes('instansi')))
  ) {
    return generateAkuntansiLembagaPemerintah(fase, kelas, topik);
  }

  // 5. Praktikum Akuntansi Perusahaan Jasa, Dagang, dan Manufaktur (Fase F - XI/XII SMK)
  if (
    lm.includes('manufaktur') ||
    lm.includes('jasa dagang') ||
    lm.includes('jasa, dagang') ||
    lm.includes('perusahaan jasa') ||
    lm.includes('praktikum akuntansi perusahaan')
  ) {
    return generatePraktikumJasaDagangManufaktur(fase, kelas, topik);
  }

  // 6. Komputer Akuntansi (Fase F - XI/XII SMK)
  if (
    lm.includes('komputer akuntansi') ||
    lm.includes('myob') ||
    lm.includes('accurate') ||
    lm.includes('spreadsheet akuntansi')
  ) {
    return generateKomputerAkuntansi(fase, kelas, topik);
  }

  // 7. Administrasi Perpajakan (Fase F - XI/XII SMK)
  if (
    lm.includes('pajak') ||
    lm.includes('perpajakan') ||
    lm.includes('pph') ||
    lm.includes('ppn') ||
    lm.includes('faktur pajak')
  ) {
    return generateAdministrasiPerpajakan(fase, kelas, topik);
  }

  // 8. Akuntansi Keuangan (Fase F - XI/XII SMK)
  if (
    lm === 'akuntansi keuangan' ||
    (lm.includes('akuntansi keuangan') && !lm.includes('konsentrasi') && !lm.includes('lembaga'))
  ) {
    return generateAkuntansiKeuangan(fase, kelas, topik);
  }

  // 9. Konsentrasi Keahlian Akuntansi dan Keuangan Lembaga (Fase F - XI/XII SMK)
  return generateKonsentrasiAkl(fase, kelas, topik);
}
