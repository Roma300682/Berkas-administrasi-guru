import { getAklCurriculum, AKL_SUBJECTS_CATALOG } from './curriculumAkl';

export { AKL_SUBJECTS_CATALOG };

export interface CurriculumResponse {
  cp: Array<{ elemen: string; teks: string }>;
  units: Array<{
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
  }>;
  isFallback?: boolean;
}

export function generateStandardCurriculum(
  mapelInput: string,
  faseInput: string,
  kelasInput: string,
  topikInput: string
): CurriculumResponse {
  const mapel = (mapelInput || 'Mata Pelajaran').trim();
  const fase = (faseInput || 'E').trim().toUpperCase();
  const kelas = (kelasInput || 'X').trim().toUpperCase();
  const topik = (topikInput || '').trim();
  const lowerMapel = mapel.toLowerCase();

  // 0. Akuntansi dan Keuangan Lembaga (AKL) - Semua 10 Mata Pelajaran Resmi Inspirasi Ruang GTK Kemendikdasmen & BSKAP No. 046/H/KR/2025
  const isAklRelated =
    lowerMapel.includes('akuntansi') ||
    lowerMapel.includes('keuangan') ||
    lowerMapel.includes('pajak') ||
    lowerMapel.includes('perpajakan') ||
    lowerMapel.includes('coretax') ||
    lowerMapel.includes('perbankan') ||
    lowerMapel.includes('syariah') ||
    lowerMapel.includes('manufaktur') ||
    lowerMapel.includes('jasa dagang') ||
    lowerMapel.includes('lembaga') ||
    lowerMapel.includes('sipd') ||
    lowerMapel.includes('siskeudes') ||
    lowerMapel.includes('komputer akuntansi') ||
    lowerMapel.includes('spreadsheet') ||
    lowerMapel.includes('myob') ||
    lowerMapel.includes('accurate') ||
    lowerMapel.includes('pkk') ||
    lowerMapel.includes('kewirausahaan') ||
    lowerMapel.includes('projek kreatif') ||
    lowerMapel.includes('akl');

  if (isAklRelated) {
    const aklResult = getAklCurriculum(mapel, fase, kelas, topik);
    if (aklResult) return aklResult;
  }

  // 0A. Mata Pelajaran Pilihan Akuntansi: Layanan Perbankan Syariah (Fase F, Kelas XII SMK)
  // Sesuai Keputusan Kepala BSKAP Nomor 046/H/KR/2025
  if (
    lowerMapel.includes('syariah') ||
    (lowerMapel.includes('perbankan') && (lowerMapel.includes('syariah') || kelas.includes('XII') || kelas.includes('12')))
  ) {
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

  // 0B. Mata Pelajaran Pilihan Akuntansi: Layanan Perbankan (Fase F, Kelas XI SMK)
  // Sesuai Keputusan Kepala BSKAP Nomor 046/H/KR/2025 (6 Elemen Resmi)
  if (
    lowerMapel.includes('layanan perbankan') ||
    lowerMapel.includes('perbankan') ||
    (lowerMapel.includes('bank') && !lowerMapel.includes('darah'))
  ) {
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
              teks: 'mengelola kas kecil (petty cash) operasional kantor bank dengan metode dana tetap (imprest fund system) dan dana berfluktuasi',
              jp: 8,
              ind: 'Peserta didik dapat menyusun bukti pengeluaran kas kecil, pencatatan mutasi, dan pengajuan pengisian kembali kas kecil.',
              r1: 'Sering keliru mencatat mutasi pengeluaran kas kecil antara metode imprest dan fluktuasi.',
              r2: 'Dapat membuat jurnal pembentukan kas kecil dengan bantuan format tabel.',
              r3: 'Mampu mengelola administrasi kas kecil bank dan menyusun berita acara rekonsiliasi kas kecil secara mandiri dan tertib.',
              r4: 'Mampu menganalisis efisiensi biaya operasional kantor bank berdasarkan histori mutasi kas kecil.',
              teknik: 'Praktik lembar kerja petty cash'
            },
            {
              teks: 'menerapkan SOP kas teller perbankan, pengujian keaslian uang kertas rupiah (metode 3D & UV) dan valuta asing',
              jp: 8,
              ind: 'Peserta didik dapat menghitung uang cepat (teknik 3 jari/mesin), verifikasi keaslian uang, dan melayani setoran/penarikan tunai.',
              r1: 'Belum mampu membedakan uang asli dan uang palsu pada spesimen uji.',
              r2: 'Dapat melayani setoran tunai dengan asistensi kepala kasir.',
              r3: 'Mampu memeriksa keaslian uang rupiah/valas dan melayani transaksi teller sesuai SOP secara cepat, teliti, dan mandiri.',
              r4: 'Mampu mengelola modal awal teller (cash in hand limit), penyetoran kas ke khasanah brankas, dan menjaga zero discrepancy.',
              teknik: 'Simulasi operasional teller dan uji fisik uang'
            }
          ]
        },
        {
          nama: 'Layanan Nasabah (Customer Service) dan Produk Simpanan Perbankan',
          sem: 1,
          elemen: 'Layanan Lembaga Perbankan dan Keuangan Mikro',
          tps: [
            {
              teks: 'menerapkan standar pelayanan prima (Service Excellence) dan prosedur KYC/CDD dalam pembukaan rekening dana',
              jp: 8,
              ind: 'Peserta didik dapat mempraktikkan 3S (Senyum, Sapa, Salam), verifikasi e-KTP, NPWP, dan form profil risiko nasabah.',
              r1: 'Gaya penyambutan nasabah masih kaku dan tahapan verifikasi data KYC terlewati.',
              r2: 'Dapat melayani pembukaan rekening tabungan dengan lembar skrip panduan.',
              r3: 'Mampu melayani pembukaan rekening tabungan dan giro secara ramah, profesional, dan patuh regulasi KYC secara mandiri.',
              r4: 'Mampu menerapkan Enhanced Due Diligence (EDD) untuk nasabah berisiko tinggi (PEP) dan pencegahan anti pencucian uang (APU-PPT).',
              teknik: 'Role play customer service'
            },
            {
              teks: 'mengadministrasikan produk deposito berjangka, penerbitan kartu debit/ATM, dan layanan safe deposit box',
              jp: 8,
              ind: 'Peserta didik dapat menghitung bunga tabungan/deposito, bilyet deposito ARO, serta prosedur sewa safe deposit box.',
              r1: 'Keliru menghitung pajak bunga 20% dan pembagian bunga bulanan.',
              r2: 'Dapat memproses perpanjangan bilyet deposito dengan pendampingan supervisor.',
              r3: 'Mampu memproses penempatan deposito berjangka dan administrasi safe deposit box secara tertib dan mandiri.',
              r4: 'Mampu mengedukasi nasabah mengenai perbandingan imbal hasil instrumen simpanan dan proteksi penjaminan LPS (Lembaga Penjamin Simpanan).',
              teknik: 'Simulasi produk simpanan dan tes hitung'
            }
          ]
        },
        {
          nama: 'Lalu Lintas Pembayaran, Warkat Kliring, dan Sistem Transfer',
          sem: 2,
          elemen: 'Pengelolaan Kas Perbankan',
          tps: [
            {
              teks: 'memverifikasi keabsahan warkat kliring (cek dan bilyet giro) serta memproses setoran kliring masuk dan keluar',
              jp: 8,
              ind: 'Peserta didik dapat memeriksa tanggal efektif, tanda tangan basah, nominal terbilang, dan alasan penolakan warkat kliring.',
              r1: 'Belum mampu membedakan fungsi cek tunai dan bilyet giro pemindahbukuan.',
              r2: 'Dapat memeriksa kelengkapan formal warkat cek dengan bimbingan daftar periksa (checklist).',
              r3: 'Mampu memverifikasi keabsahan warkat kliring dan memproses transaksi kliring penyerahan/pengembalian secara mandiri.',
              r4: 'Mampu mengidentifikasi warkat kliring palsu/kosong dan menerapkan sanksi Daftar Hitam Nasional (DHN) Bank Indonesia.',
              teknik: 'Analisis dokumen warkat dan tes tertulis'
            },
            {
              teks: 'memproses transaksi transfer dana sistem BI-FAST, SKNBI, dan Real Time Gross Settlement (RTGS)',
              jp: 8,
              ind: 'Peserta didik dapat memilih jalur transfer dana yang tepat berdasarkan nominal, kecepatan waktu, dan biaya transaksi.',
              r1: 'Keliru membedakan batasan nominal transfer SKNBI, BI-FAST, dan RTGS.',
              r2: 'Dapat menginput formulir transfer dana antar-bank dengan panduan format data.',
              r3: 'Mampu memproses transaksi transfer dana BI-FAST dan RTGS secara akurat, cepat, dan mandiri.',
              r4: 'Mampu menginvestigasi kegagalan transfer dana, retur kliring, dan proses penyelesaian sengketa transaksi antar-bank.',
              teknik: 'Praktik simulasi transfer dan studi kasus'
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
              jp: 8,
              ind: 'Peserta didik dapat menjurnal setoran/penarikan nasabah, kliring, transfer, dan pencairan kredit pada buku besar perbankan.',
              r1: 'Masih tertukar antara posisi kas bank, simpanan nasabah (liabilitas bank), dan kredit (aset bank).',
              r2: 'Dapat menjurnal transaksi perbankan sederhana dengan bantuan bagan akun standar bank.',
              r3: 'Mampu menjurnal seluruh transaksi operasional perbankan secara tepat akun, balance, dan mandiri.',
              r4: 'Mampu menyusun neraca saldo harian bank dan menganalisis laporan laba rugi operasional kantor cabang.',
              teknik: 'Praktik pembukuan jurnal perbankan'
            },
            {
              teks: 'menganalisis kelayakan calon debitur menggunakan prinsip 5C (Character, Capacity, Capital, Collateral, Condition)',
              jp: 8,
              ind: 'Peserta didik dapat melakukan wawancara kredit, verifikasi SLIK OJK (checking kredit), dan analisis rasio kemampuan mencicil.',
              r1: 'Belum memahami indikator penilaian watak (character) dan kapasitas membayar calon debitur.',
              r2: 'Dapat mengumpulkan dokumen persyaratan kredit usaha mikro dengan bantuan daftar berkas.',
              r3: 'Mampu menganalisis kelayakan kredit berdasarkan prinsip 5C secara komprehensif, objektif, dan mandiri.',
              r4: 'Mampu menyusun nota analisis kredit (credit memo) serta rekomendasi persetujuan/penolakan kredit kepada komite kredit.',
              teknik: 'Studi kasus kredit dan analisis kelayakan'
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
              jp: 8,
              ind: 'Peserta didik dapat mengentri data mutasi rekening nasabah, mencetak mutasi rekening koran, dan rekonsiliasi kas bank terotomatisasi.',
              r1: 'Masih canggung mengoperasikan menu entri transaksi pada aplikasi komputer akuntansi perbankan.',
              r2: 'Dapat mengentri data transaksi simpanan nasabah dengan petunjuk teknis guru.',
              r3: 'Mampu memproses transaksi perbankan secara komputerisasi dan menyajikan neraca saldo cabang secara mandiri.',
              r4: 'Mampu mendeteksi anomali entri data dan melakukan backup database transaksi perbankan secara teratur.',
              teknik: 'Praktik komputer akuntansi perbankan'
            },
            {
              teks: 'menghitung, memotong, dan menyusun laporan perpajakan perbankan (PPh Pasal 4 ayat 2, PPh 21, PPh 23)',
              jp: 6,
              ind: 'Peserta didik dapat menghitung PPh final bunga deposito/tabungan nasabah dan menyiapkan bukti potong serta SPT masa.',
              r1: 'Belum menguasai ketentuan pembebasan pajak bunga simpanan di bawah batas nominal tertentu.',
              r2: 'Dapat menghitung PPh bunga deposito 20% dengan panduan rumus acuan.',
              r3: 'Mampu menghitung kewajiban pajak perbankan, menyusun bukti potong, dan mengarsipkan dokumen pajak secara mandiri.',
              r4: 'Mampu menyusun rekonsiliasi fiskal perbankan dan merumuskan kepatuhan pelaporan SPT Masa PPh perbankan.',
              teknik: 'Perhitungan pajak dan penugasan lembar kerja'
            }
          ]
        }
      ]
    };
  }

  // 1. Matematika
  if (lowerMapel.includes('matematik')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Bilangan',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menggeneralisasi sifat-sifat bilangan berpangkat (eksponen), logaritma, serta barisan dan deret (aritmetika dan geometri) untuk menyelesaikan masalah matematis dan kontekstual.`
        },
        {
          elemen: 'Aljabar dan Fungsi',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menyelesaikan sistem persamaan linear tiga variabel, sistem pertidaksamaan linear dua variabel, serta memodelkan dan menginterpretasikan fungsi kuadrat dan eksponensial dalam kehidupan nyata.`
        },
        {
          elemen: 'Geometri dan Pengukuran',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menyelesaikan permasalahan segitiga siku-siku yang melibatkan perbandingan trigonometri (sinus, cosinus, tangen) beserta penerapannya dalam pengukuran lapangan.`
        },
        {
          elemen: 'Analisis Data dan Peluang',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu merepresentasikan dan menginterpretasi data dengan diagram pencar, ukuran pemusatan (mean, median, modus) data kelompok, ukuran penempatan, serta menentukan frekuensi relatif dan peluang kejadian majemuk.`
        }
      ],
      units: [
        {
          nama: topik ? `Eksponen, Logaritma dan ${topik}` : 'Eksponen dan Logaritma',
          sem: 1,
          elemen: 'Bilangan',
          tps: [
            {
              teks: 'menggeneralisasi sifat-sifat operasi bilangan berpangkat bulat dan rasional (eksponen)',
              jp: 8,
              ind: 'Peserta didik dapat menyederhanakan bentuk eksponen menggunakan sifat perkalian, pembagian, dan pemangkatan.',
              r1: 'Belum menguasai sifat dasar eksponen; masih keliru menjumlahkan dan mengalikan pangkat.',
              r2: 'Dapat menyelesaikan bentuk eksponen sederhana dengan panduan rumus acuan.',
              r3: 'Mampu menyederhanakan dan menghitung nilai bentuk eksponen secara mandiri dan benar.',
              r4: 'Mampu membuktikan sifat-sifat eksponen dan menerapkannya pada model peluruhan dan pertumbuhan eksponensial.',
              teknik: 'Tes tertulis dan lembar kerja'
            },
            {
              teks: 'menerapkan konsep logaritma dan sifat-sifatnya dalam pemecahan masalah',
              jp: 10,
              ind: 'Peserta didik dapat menghubungkan bentuk pangkat dengan bentuk logaritma serta menggunakan sifat-sifat logaritma.',
              r1: 'Belum memahami kaitan antara eksponen dan logaritma.',
              r2: 'Dapat menghitung nilai logaritma basis 10 sederhana dengan bimbingan guru.',
              r3: 'Dapat mengoperasikan sifat-sifat logaritma untuk menyelesaikan persamaan sederhana secara mandiri.',
              r4: 'Mampu menyelesaikan masalah kontekstual (skala Richter, pH kimia, intensitas desibel) menggunakan logaritma.',
              teknik: 'Penugasan terstruktur dan tes formatif'
            }
          ]
        },
        {
          nama: 'Barisan dan Deret Aritmetika serta Geometri',
          sem: 1,
          elemen: 'Bilangan',
          tps: [
            {
              teks: 'menentukan pola, suku ke-n, dan jumlah n suku pertama barisan dan deret aritmetika',
              jp: 10,
              ind: 'Peserta didik dapat menemukan beda (b), suku ke-n (Un), dan jumlah deret (Sn) aritmetika.',
              r1: 'Kesulitan mengidentifikasi pola beda tetap dalam barisan bilangan.',
              r2: 'Mampu menghitung suku ke-n dengan rumus jika nilai awal dan beda diketahui.',
              r3: 'Mampu menganalisis barisan aritmetika dan menghitung jumlah n suku pertama secara tepat.',
              r4: 'Mampu memodelkan fenomena finansial (bunga tunggal, tabungan berkala) dengan deret aritmetika.',
              teknik: 'Tes tertulis dan pemecahan masalah'
            },
            {
              teks: 'menganalisis barisan geometri, deret geometri, dan deret geometri tak hingga',
              jp: 12,
              ind: 'Peserta didik dapat menentukan rasio (r), suku ke-n, dan jumlah deret geometri hingga dan tak hingga.',
              r1: 'Belum dapat membedakan pola pertambahan (aritmetika) dan perbanyakan rasio (geometri).',
              r2: 'Mampu menghitung rasio geometri dengan rumus bantuan acuan.',
              r3: 'Mampu menyelesaikan permasalahan deret geometri dan deret tak hingga konvergen secara mandiri.',
              r4: 'Mampu memecahkan masalah kontekstual pantulan bola dan bunga majemuk menggunakan deret geometri.',
              teknik: 'Uji kompetensi dan proyek mini'
            }
          ]
        },
        {
          nama: 'Sistem Persamaan dan Pertidaksamaan Linear',
          sem: 1,
          elemen: 'Aljabar dan Fungsi',
          tps: [
            {
              teks: 'menyelesaikan sistem persamaan linear tiga variabel (SPLTV) dengan metode eliminasi-substitusi',
              jp: 12,
              ind: 'Peserta didik dapat menentukan himpunan penyelesaian dari SPLTV dalam konteks nyata.',
              r1: 'Sering melakukan kesalahan eliminasi variabel pertama.',
              r2: 'Mampu menyelesaikan SPLTV sederhana jika bentuk koefisien sudah teratur.',
              r3: 'Mampu menyusun model matematika dari soal cerita dan menyelesaikan SPLTV secara mandiri dan akurat.',
              r4: 'Mampu menganalisis jenis-jenis penyelesaian SPLTV (tepat satu, tak hingga, atau tidak ada) serta memeriksa konsistensinya.',
              teknik: 'Portofolio pemecahan masalah dan tes'
            }
          ]
        },
        {
          nama: 'Trigonometri dan Pengukuran Sudut',
          sem: 2,
          elemen: 'Geometri dan Pengukuran',
          tps: [
            {
              teks: 'menentukan perbandingan trigonometri (sinus, cosinus, tangen) pada segitiga siku-siku',
              jp: 12,
              ind: 'Peserta didik dapat mendefinisikan sin, cos, tan sebagai perbandingan sisi depan, samping, dan miring segitiga.',
              r1: 'Masih tertukar menentukan sisi depan dan sisi samping terhadap sudut acuan.',
              r2: 'Mampu menghitung nilai trigonometri sudut istimewa (0°, 30°, 45°, 60°, 90°) dengan tabel bantu.',
              r3: 'Mampu menentukan perbandingan trigonometri segitiga siku-siku secara tepat dan mandiri.',
              r4: 'Mampu menerapkan perbandingan trigonometri untuk mengukur tinggi pohon/gedung dengan klinometer.',
              teknik: 'Praktik lapangan klinometer dan tes tertulis'
            },
            {
              teks: 'menggeneralisasi perbandingan trigonometri untuk sudut di berbagai kuadran dan sudut berelasi',
              jp: 10,
              ind: 'Peserta didik dapat menentukan tanda dan nilai trigonometri pada kuadran I, II, III, dan IV.',
              r1: 'Belum memahami aturan tanda positif/negatif perbandingan trigonometri di tiap kuadran.',
              r2: 'Mampu mencari relasi sudut di kuadran II dengan rumus sudut berelasi (180° - a).',
              r3: 'Mampu menentukan nilai trigonometri sudut berelasi di seluruh kuadran secara mandiri dan benar.',
              r4: 'Mampu membuktikan identitas trigonometri dasar dan menggunakannya dalam penyederhanaan ekspresi.',
              teknik: 'Tes tertulis dan tugas mandiri'
            }
          ]
        },
        {
          nama: 'Statistika dan Analisis Data Kelompok',
          sem: 2,
          elemen: 'Analisis Data dan Peluang',
          tps: [
            {
              teks: 'menyajikan dan menginterpretasi data menggunakan histogram, poligon frekuensi, dan ogive',
              jp: 10,
              ind: 'Peserta didik dapat membuat tabel distribusi frekuensi dari data mentah dan menggambar grafiknya.',
              r1: 'Kesulitan menentukan panjang kelas dan batas nyata kelas interval.',
              r2: 'Mampu membuat tabel frekuensi data berkelompok dengan bimbingan guru.',
              r3: 'Mampu menyajikan data berkelompok ke dalam histogram dan ogive secara rapi, tepat, dan mandiri.',
              r4: 'Mampu membaca tren data, anomali pencilan (outlier), dan menarik kesimpulan berbasis visualisasi data.',
              teknik: 'Penilaian proyek pengolahan data'
            },
            {
              teks: 'menghitung ukuran pemusatan (mean, median, modus) dan dispersi data berkelompok',
              jp: 12,
              ind: 'Peserta didik dapat menghitung rata-rata, median, modus, kuartil, dan simpangan baku data kelompok.',
              r1: 'Keliru memasukkan nilai titik tengah atau frekuensi kumulatif dalam rumus.',
              r2: 'Dapat menghitung mean data kelompok dengan bantuan tabel kerja bertahap.',
              r3: 'Dapat menghitung mean, median, modus, dan simpangan kuartil data kelompok secara mandiri dan akurat.',
              r4: 'Mampu membandingkan stabilitas dua kumpulan data berdasarkan nilai rata-rata dan simpangan bakunya.',
              teknik: 'Tes tertulis dan unjuk kerja'
            }
          ]
        }
      ]
    };
  }

  // 2. Bahasa Indonesia
  if (lowerMapel.includes('indonesia')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Menyimak',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu mengevaluasi dan mengkreasi informasi berupa gagasan, pikiran, perasaan, pandangan, arahan atau pesan yang akurat dari menyimak berbagai jenis teks (laporan hasil observasi, anekdot, negosiasi, biografi, hikayat, puisi) dalam bentuk monolog, dialog, dan gelar wicara.`
        },
        {
          elemen: 'Membaca dan Memirsa',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu mengevaluasi informasi, ide pokok, makna tersirat, struktur, dan kaidah kebahasaan berbagai jenis teks kritis secara analitis dan objektif.`
        },
        {
          elemen: 'Berbicara dan Mempresentasikan',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu mengolah dan menyajikan gagasan, pikiran, pandangan, atau pesan untuk tujuan pengajuan usul, perumusan masalah, dan solusi dalam bentuk monolog, dialog, dan gelar wicara secara logis, runtut, kritis, dan kreatif.`
        },
        {
          elemen: 'Menulis',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menulis gagasan, pikiran, pandangan, pengetahuan metakognisi untuk berbagai tujuan secara logis, kritis, dan kreatif dengan memperhatikan kaidah PUEBI/EYD dan tata bahasa baku.`
        }
      ],
      units: [
        {
          nama: topik ? `Teks Laporan Hasil Observasi (LHO) dan ${topik}` : 'Teks Laporan Hasil Observasi (LHO)',
          sem: 1,
          elemen: 'Membaca dan Memirsa',
          tps: [
            {
              teks: 'menganalisis struktur (pernyataan umum, deskripsi bagian, deskripsi manfaat) dan isi teks LHO',
              jp: 8,
              ind: 'Peserta didik dapat mengidentifikasi bagian-bagian struktur dan keakuratan informasi ilmiah dalam teks LHO.',
              r1: 'Belum mampu membedakan teks deskripsi umum dengan teks laporan hasil observasi objektif.',
              r2: 'Mampu menemukan pernyataan umum dan deskripsi bagian dengan bantuan lembar panduan.',
              r3: 'Mampu membedah struktur dan fakta objektif teks LHO secara mandiri dan kritis.',
              r4: 'Mampu membandingkan keakuratan dua teks LHO berbeda dan menemukan bias atau opini subjektif.',
              teknik: 'Tes tertulis dan analisis teks'
            },
            {
              teks: 'menyusun teks laporan hasil observasi berdasarkan pengamatan langsung secara objektif dan sistematis',
              jp: 10,
              ind: 'Peserta didik dapat menulis teks LHO minimal 3 paragraf dengan kaidah kebahasaan baku (istilah ilmiah, verba material).',
              r1: 'Teks yang ditulis masih memuat opini pribadi tanpa data pengamatan nyata.',
              r2: 'Mampu menyusun teks LHO dengan panduan kerangka karangan dari guru.',
              r3: 'Mampu memproduksi teks LHO utuh dengan data observasi akurat, ejaan EYD tepat, dan mandiri.',
              r4: 'Mampu memublikasikan teks LHO dalam bentuk infografis atau artikel majalah dinding digital sekolah.',
              teknik: 'Penilaian produk tulisan dan portofolio'
            }
          ]
        },
        {
          nama: 'Teks Anekdot (Kritik Sosial Berbalut Humor)',
          sem: 1,
          elemen: 'Berbicara dan Mempresentasikan',
          tps: [
            {
              teks: 'mengevaluasi pesan kritik sosial, struktur (abstraksi, orientasi, krisis, reaksi, koda), dan fungsi kelucuan teks anekdot',
              jp: 8,
              ind: 'Peserta didik dapat mengungkap pesan tersirat dan kritik membangun di balik humor teks anekdot.',
              r1: 'Hanya melihat unsur lelucon tanpa menangkap kritik sosial yang disampaikan.',
              r2: 'Dapat mengidentifikasi kritik sosial dengan bantuan pertanyaan pemantik.',
              r3: 'Dapat menganalisis makna tersirat dan struktur teks anekdot secara mandiri.',
              r4: 'Mampu mengkaji pergeseran bentuk anekdot (stand-up comedy, komik strip, meme cerdas) di era digital.',
              teknik: 'Diskusi kritis dan tes lisan'
            },
            {
              teks: 'menampilkan lawakan tunggal (stand-up comedy) atau dialog komikal bertema kepedulian sosial',
              jp: 8,
              ind: 'Peserta didik dapat menyampaikan anekdot lisan dengan ekspresi, gestur, dan punchline yang etis dan santun.',
              r1: 'Penyampaian belum percaya diri; materi masih menggunakan humor yang merendahkan pihak lain.',
              r2: 'Mampu menyampaikan teks komedi dengan membaca catatan naskah.',
              r3: 'Mampu menyajikan lawakan tunggal/dialog komikal bertema sosial secara santun, komunikatif, dan menarik.',
              r4: 'Mampu mengimprovisasi penyampaian di hadapan audiens dan menggugah kesadaran sosial warga sekolah.',
              teknik: 'Unjuk kerja performa panggung'
            }
          ]
        },
        {
          nama: 'Hikayat dan Cerita Pendek (Nilai Karakter dan Alih Wahana)',
          sem: 1,
          elemen: 'Menulis',
          tps: [
            {
              teks: 'mengidentifikasi nilai-nilai moral, agama, sosial, dan edukasi dalam hikayat klasik serta relevansinya masa kini',
              jp: 8,
              ind: 'Peserta didik dapat menggali nilai kearifan masa lalu dan mengaitkannya dengan kehidupan abad ke-21.',
              r1: 'Kesulitan memahami bahasa Melayu klasik dan alur cerita berbingkai.',
              r2: 'Dapat menemukan nilai moral dengan bantuan glosarium kata arkais.',
              r3: 'Dapat menganalisis nilai-nilai kehidupan dalam teks hikayat secara mandiri dan kontekstual.',
              r4: 'Mampu merefleksikan nilai luhur hikayat untuk penguatan karakter profil pelajar Pancasila.',
              teknik: 'Analisis teks komparasi'
            },
            {
              teks: 'mentransformasi (alih wahana) cerita hikayat klasik menjadi cerpen modern berkonteks kekinian',
              jp: 10,
              ind: 'Peserta didik dapat menulis ulang cerita hikayat dengan sudut pandang dan latar kontemporer tanpa mengubah inti nilai.',
              r1: 'Hanya menyalin teks hikayat tanpa mengubah bahasa dan latar ke bentuk modern.',
              r2: 'Mampu mengubah latar cerita dengan bimbingan plot dari guru.',
              r3: 'Mampu menghasilkan cerpen adaptasi hikayat yang menarik, logis, dan kreatif secara mandiri.',
              r4: 'Mampu menyunting karya cerpen teman sebaya menggunakan kaidah tata bahasa dan EYD terbaru.',
              teknik: 'Produk penulisan kreatif'
            }
          ]
        },
        {
          nama: 'Teks Negosiasi dan Kesepakatan Bisnis',
          sem: 2,
          elemen: 'Berbicara dan Mempresentasikan',
          tps: [
            {
              teks: 'mengevaluasi faktor penentu keberhasilan negosiasi dan pengajuan usulan solutif (win-win solution)',
              jp: 8,
              ind: 'Peserta didik dapat membedakan negosiasi kooperatif dengan debat konfrontatif.',
              r1: 'Belum memahami prinsip kesepakatan bersama dalam proses tawar-menawar.',
              r2: 'Dapat mengenali tahapan negosiasi (orientasi, pengajuan, penawaran, persetujuan) dengan bantuan contoh dialog.',
              r3: 'Dapat menganalisis taktik negosiasi santun dan argumentasi logis secara mandiri.',
              r4: 'Mampu merumuskan solusi alternatif yang menguntungkan kedua belah pihak dalam sengketa kerja/jual beli.',
              teknik: 'Analisis transkrip dan tes tertulis'
            },
            {
              teks: 'mempraktikkan simulasi negosiasi lisan dan menyusun surat penawaran kerjasama bisnis formal',
              jp: 10,
              ind: 'Peserta didik dapat bernegosiasi secara persuasif dan santun serta menuangkannya dalam surat resmi.',
              r1: 'Gaya bicara terlalu memaksa dan format surat penawaran belum baku.',
              r2: 'Dapat bernegosiasi mengikuti naskah latihan yang telah disiapkan.',
              r3: 'Mampu bernegosiasi spontan dengan bahasa persuasif dan menyusun surat penawaran bisnis yang rapi.',
              r4: 'Mampu memimpin mediasi negosiasi kompleks dan menyusun nota kesepahaman (MoU) formal.',
              teknik: 'Role play simulasi negosiasi dan produk surat'
            }
          ]
        },
        {
          nama: 'Teks Biografi Tokoh dan Pembacaan Puisi',
          sem: 2,
          elemen: 'Membaca dan Memirsa',
          tps: [
            {
              teks: 'meneladani karakter unggul, keteladanan, dan perjuangan tokoh dalam teks biografi inspiratif',
              jp: 8,
              ind: 'Peserta didik dapat memetakan latar belakang, rintangan hidup, dan kiat sukses tokoh pahlawan/inovator.',
              r1: 'Hanya mencatat data tanggal lahir tokoh tanpa menganalisis nilai juang.',
              r2: 'Dapat menemukan keteladanan tokoh dengan panduan pertanyaan refleksi.',
              r3: 'Dapat menyimpulkan karakter unggul tokoh dan mengaitkannya dengan cita-cita pribadi secara mandiri.',
              r4: 'Mampu menuliskan esai reflektif autobiografi singkat mengenai rencana masa depan.',
              teknik: 'Resensi biografi dan tes'
            },
            {
              teks: 'membaca indah (musikalisasi atau deklamasi) puisi dengan artikulasi, intonasi, penghayatan, dan ekspresi tepat',
              jp: 8,
              ind: 'Peserta didik dapat mendalami suasana, rima, dan diksi puisi serta membacakannya di hadapan penonton.',
              r1: 'Membaca puisi datar tanpa penjiwaan dan intonasi yang sesuai.',
              r2: 'Mampu membaca puisi dengan tempo yang teratur dengan panduan guru.',
              r3: 'Mampu mendeklamasikan puisi dengan artikulasi vokal jelas, intonasi bervariasi, dan mimik ekspresif.',
              r4: 'Mampu mengaransemen musikalisasi puisi berkelompok dan menciptakan interpretasi puitis yang memukau.',
              teknik: 'Performa unjuk kerja pembacaan puisi'
            }
          ]
        }
      ]
    };
  }

  // 3. Bahasa Inggris
  if (lowerMapel.includes('inggris') || lowerMapel.includes('english')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Listening and Speaking',
          teks: `By the end of Phase ${fase}, students actively listen and communicate ideas and opinions in English in various contexts (personal, social, academic, and workplace) using appropriate pronunciation, intonation, and grammar.`
        },
        {
          elemen: 'Reading and Viewing',
          teks: `By the end of Phase ${fase}, students independently read, comprehend, and evaluate explicit and implicit information from diverse authentic text genres (descriptive, recount, narrative, procedure, report, analytical exposition).`
        },
        {
          elemen: 'Writing and Presenting',
          teks: `By the end of Phase ${fase}, students plan, draft, write, and revise structured texts across various genres and present ideas effectively using digital or multimodal media.`
        }
      ],
      units: [
        {
          nama: topik ? `Descriptive Text & ${topik}` : 'Descriptive Text: Describing Great People and Tourism Spots',
          sem: 1,
          elemen: 'Reading and Viewing',
          tps: [
            {
              teks: 'identify specific details, main ideas, and descriptive adjectives in authentic descriptive texts',
              jp: 8,
              ind: 'Students can locate factual information and sensory adjectives describing famous destinations or inspirational figures.',
              r1: 'Struggles with basic vocabulary; requires step-by-step translation.',
              r2: 'Identifies general topics with guidance from word lists.',
              r3: 'Independently identifies main ideas, supporting details, and adjectives in descriptive passages accurately.',
              r4: 'Critically contrasts promotional tourism texts and synthesizes cultural insights from international sources.',
              teknik: 'Reading comprehension test'
            },
            {
              teks: 'produce written and digital multimodal descriptive texts promoting local cultural heritage',
              jp: 10,
              ind: 'Students can write a 3-paragraph descriptive text using simple present tense and sensory imagery.',
              r1: 'Incomplete sentences and frequent subject-verb agreement errors.',
              r2: 'Writes structured paragraphs using a provided sentence starter template.',
              r3: 'Produces cohesive, grammatically sound descriptive texts independently with rich adjectives.',
              r4: 'Creates an attractive digital travel brochure or blog post featuring multimedia elements.',
              teknik: 'Writing rubric and digital portfolio'
            }
          ]
        },
        {
          nama: 'Recount Text: Historical Events and Memorable Experiences',
          sem: 1,
          elemen: 'Writing and Presenting',
          tps: [
            {
              teks: 'analyze chronological sequence, past tense verbs, and time connectives in personal and historical recounts',
              jp: 8,
              ind: 'Students can differentiate regular and irregular past verbs and follow chronological markers.',
              r1: 'Confuses present and past tense verb forms frequently.',
              r2: 'Identifies time sequencers (first, then, after that) with guidance.',
              r3: 'Accurately determines sequence of events and evaluates historical causes and consequences.',
              r4: 'Delivers a vivid personal narrative speech using engaging vocal variety and body language.',
              teknik: 'Oral storytelling presentation'
            }
          ]
        },
        {
          nama: 'Procedure Text: Manuals, Recipes, and Technology Guides',
          sem: 2,
          elemen: 'Reading and Viewing',
          tps: [
            {
              teks: 'comprehend goals, materials, and imperative command steps in technical and everyday procedure texts',
              jp: 8,
              ind: 'Students can follow instructional steps accurately and explain safety precautions.',
              r1: 'Misinterprets instructional action verbs (twist, stir, insert).',
              r2: 'Follows numbered steps with visual diagram assistance.',
              r3: 'Clearly explains sequential steps and understands conditional troubleshooting steps independently.',
              r4: 'Creates an English video tutorial demonstrating a technical skill or recipe with clear pronunciation.',
              teknik: 'Instructional video project'
            }
          ]
        },
        {
          nama: 'Analytical Exposition: Expressing Arguments and Global Issues',
          sem: 2,
          elemen: 'Listening and Speaking',
          tps: [
            {
              teks: 'construct well-founded arguments (thesis, arguments, reiteration) defending a stance on contemporary issues',
              jp: 12,
              ind: 'Students can use connective words (furthermore, however, therefore) to express logical opinions.',
              r1: 'Struggles to provide factual evidence for personal claims.',
              r2: 'Drafts arguments using sentence frames provided by the teacher.',
              r3: 'Formulates clear argumentative essays with sound supporting data and persuasive tone independently.',
              r4: 'Participates actively in classroom debates, articulating counter-arguments confidently in English.',
              teknik: 'Parliamentary debate rubric and essay test'
            }
          ]
        }
      ]
    };
  }

  // 4. Ilmu Pengetahuan Alam (IPA) / IPAS / Biologi / Fisika / Kimia
  if (lowerMapel.includes('ipa') || lowerMapel.includes('ipas') || lowerMapel.includes('biologi') || lowerMapel.includes('fisika') || lowerMapel.includes('kimia') || lowerMapel.includes('sains')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Pemahaman Sains',
          teks: `Pada akhir Fase ${fase}, peserta didik memahami konsep klasifikasi materi dan perubahannya, sistem organisasi kehidupan, interaksi makhluk hidup dalam ekosistem, hukum-hukum gerak dan energi, serta pelestarian lingkungan hidup dan mitigasi perubahan iklim.`
        },
        {
          elemen: 'Keterampilan Proses',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu mengamati fenomena alam, merumuskan hipotesis ilmiah, merancang dan melakukan eksperimen sederhana, mengumpulkan data pengukuran, mengolah dan menganalisis data, serta mengomunikasikan temuan secara ilmiah.`
        }
      ],
      units: [
        {
          nama: topik ? `Zat, Perubahannya, dan ${topik}` : 'Klasifikasi Materi dan Perubahan Fisika-Kimia',
          sem: 1,
          elemen: 'Pemahaman Sains',
          tps: [
            {
              teks: 'membedakan unsur, senyawa, dan campuran serta metode pemisahannya (filtrasi, kristalisasi, kromatografi)',
              jp: 10,
              ind: 'Peserta didik dapat mengelompokkan bahan sehari-hari dan merancang prosedur pemisahan campuran.',
              r1: 'Masih tertukar antara senyawa kimia homogen dan campuran heterogen.',
              r2: 'Dapat membedakan filtrasi dan evaporasi dengan bantuan bagan panduan.',
              r3: 'Mampu mengklasifikasikan materi dan mempraktikkan pemisahan campuran secara mandiri dan aman.',
              r4: 'Mampu merancang instalasi purifikasi/penjernihan air sederhana untuk kebutuhan masyarakat sekitar.',
              teknik: 'Praktikum laboratorium dan laporan praktikum'
            },
            {
              teks: 'menganalisis perbedaan perubahan fisika dan perubahan kimia pada peristiwa alam dan industri',
              jp: 8,
              ind: 'Peserta didik dapat mengidentifikasi ciri reaksi kimia (perubahan warna, gas, endapan, suhu).',
              r1: 'Belum mampu membedakan perubahan wujud dan reaksi pembentukan zat baru.',
              r2: 'Mampu memberi contoh pembakaran dan pelelehan dengan bantuan guru.',
              r3: 'Mampu membuktikan perubahan kimia melalui percobaan tabung reaksi secara tepat dan mandiri.',
              r4: 'Mampu mengkaji dampak polusi kimia hasil pembakaran bahan bakar fosil terhadap kualitas udara.',
              teknik: 'Observasi praktikum dan tes tertulis'
            }
          ]
        },
        {
          nama: 'Organisasi Kehidupan dan Ekosistem Lingkungan',
          sem: 1,
          elemen: 'Pemahaman Sains',
          tps: [
            {
              teks: 'menganalisis interaksi antar-komponen biotik dan abiotik dalam rantai makanan dan jaring-jaring makanan',
              jp: 10,
              ind: 'Peserta didik dapat membuat diagram piramida energi dan aliran energi dalam ekosistem lokal.',
              r1: 'Belum memahami kedudukan produsen, konsumen, dan dekomposer.',
              r2: 'Dapat menyusun rantai makanan sederhana 3 tingkat dengan bimbingan.',
              r3: 'Dapat menganalisis dampak kepunahan salah satu predator terhadap keseimbangan jaring makanan.',
              r4: 'Mampu merumuskan program konservasi keanekaragaman hayati sekolah (green school / biopori).',
              teknik: 'Studi lapangan lingkungan sekolah'
            }
          ]
        },
        {
          nama: 'Gerak, Gaya, dan Hukum Newton',
          sem: 2,
          elemen: 'Keterampilan Proses',
          tps: [
            {
              teks: 'menyelidiki hubungan antara gaya, massa, dan percepatan (Hukum I, II, dan III Newton)',
              jp: 12,
              ind: 'Peserta didik dapat melakukan pengukuran GLB dan GLBB serta membuktikan persamaan F = m.a.',
              r1: 'Belum menguasai konversi satuan standar internasional (SI) gaya dan percepatan.',
              r2: 'Mampu menghitung resultan gaya searah dengan rumus panduan acuan.',
              r3: 'Mampu melakukan eksperimen Hukum Newton menggunakan ticker timer/sensor dan mengolah grafiknya secara mandiri.',
              r4: 'Mampu menganalisis sistem keselamatan berkendara (seatbelt, airbag, rem ABS) berbasis inersia Newton.',
              teknik: 'Laporan eksperimen fisika dan tes tertulis'
            }
          ]
        },
        {
          nama: 'Energi Terbarukan dan Mitigasi Perubahan Iklim',
          sem: 2,
          elemen: 'Pemahaman Sains',
          tps: [
            {
              teks: 'mengevaluasi potensi energi terbarukan (surya, angin, biomassa, air) sebagai solusi krisis energi',
              jp: 12,
              ind: 'Peserta didik dapat menghitung efisiensi konversi energi dan merancang purwarupa pembangkit mini.',
              r1: 'Belum memahami hukum kekekalan energi.',
              r2: 'Dapat menyebutkan macam-macam energi bersih dengan panduan infografis.',
              r3: 'Mampu merakit model sel surya atau kincir angin mini dan mengukur tegangan yang dihasilkan secara mandiri.',
              r4: 'Mampu menyusun studi kelayakan pemanfaatan energi ramah lingkungan di lingkungan satuan pendidikan.',
              teknik: 'Proyek inovasi STEM dan pameran karya'
            }
          ]
        }
      ]
    };
  }

  // 5. Pendidikan Pancasila / PKn
  if (lowerMapel.includes('pancasila') || lowerMapel.includes('pkn') || lowerMapel.includes('kewarganegaraan')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Pancasila',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis cara pandang para pendiri bangsa tentang dasar negara, kedudukan Pancasila sebagai ideologi terbuka, serta mempraktikkan nilai-nilai Pancasila dalam kehidupan bermasyarakat, berbangsa, dan bernegara.`
        },
        {
          elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis hak dan kewajiban warga negara, norma hukum, hierarki peraturan perundang-undangan, serta peran penegakan hukum dalam mewujudkan keadilan sosial.`
        },
        {
          elemen: 'Bhinneka Tunggal Ika',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu mengidentifikasi pengaruh keanggotaan kelompok lokal, regional, nasional, dan global terhadap pembentukan identitas, serta menumbuhkan sikap toleransi dan kolaborasi antarkeragaman budaya.`
        },
        {
          elemen: 'Negara Kesatuan Republik Indonesia (NKRI)',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis potensi ancaman, tantangan, hambatan, dan gangguan (ATHG) terhadap keutuhan NKRI serta berpartisipasi aktif dalam upaya bela negara di era digital.`
        }
      ],
      units: [
        {
          nama: topik ? `Pancasila Sebagai Ideologi Terbuka & ${topik}` : 'Pancasila dalam Kehidupan Berbangsa dan Bernegara',
          sem: 1,
          elemen: 'Pancasila',
          tps: [
            {
              teks: 'menganalisis dinamika perumusan Pancasila dan kedudukan Pancasila sebagai ideologi terbuka',
              jp: 8,
              ind: 'Peserta didik dapat menjelaskan gagasan Muh. Yamin, Soepomo, dan Ir. Soekarno dalam sidang BPUPK.',
              r1: 'Belum memahami perbedaan konsep dasar negara usulan para pendiri bangsa.',
              r2: 'Dapat menyebutkan sila-sila Pancasila dan piagam Jakarta dengan panduan buku teks.',
              r3: 'Dapat menganalisis dimensi idealitas, normatif, dan realistis Pancasila secara mandiri dan kritis.',
              r4: 'Mampu mengevaluasi implementasi nilai Pancasila dalam merespons tantangan ideologi transnasional.',
              teknik: 'Tes tertulis dan esai analitis'
            },
            {
              teks: 'menerapkan perilaku toleran, gotong royong, dan keadilan sosial dalam kehidupan sekolah',
              jp: 8,
              ind: 'Peserta didik dapat menginisiasi aksi nyata kepedulian sosial dan musyawarah mufakat di kelas.',
              r1: 'Masih enggan berbaur dengan teman berbeda latar belakang sosial/suku.',
              r2: 'Berpartisipasi dalam musyawarah kelas jika ditunjuk oleh ketua kelas.',
              r3: 'Konsisten menunjukkan sikap menghargai perbedaan dan aktif bergotong royong secara mandiri.',
              r4: 'Mampu menjadi juru damai saat terjadi konflik antarteman dan memimpin kegiatan bakti sosial.',
              teknik: 'Observasi sikap dan penilaian antarteman'
            }
          ]
        },
        {
          nama: 'Konstitusi, Hak dan Kewajiban Warga Negara serta Hierarki Hukum',
          sem: 1,
          elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
          tps: [
            {
              teks: 'menganalisis hierarki peraturan perundang-undangan di Indonesia menurut UU No. 12 Tahun 2011',
              jp: 8,
              ind: 'Peserta didik dapat mengurutkan tata urutan perundang-undangan dari UUD 1945 hingga Perda.',
              r1: 'Belum memahami posisi tertinggi konstitusi dalam sistem hukum nasional.',
              r2: 'Dapat mengurutkan hierarki perundangan dengan bantuan bagan acuan.',
              r3: 'Dapat menganalisis asas hukum (lex superior derogat legi inferiori) dan sinkronisasi aturan perundangan secara mandiri.',
              r4: 'Mampu menyusun analisis uji materiil (judicial review) sederhana terhadap regulasi publik yang dinilai diskriminatif.',
              teknik: 'Studi kasus hukum dan tes tertulis'
            }
          ]
        },
        {
          nama: 'Bhinneka Tunggal Ika dan Harmoni Keberagaman Sosial',
          sem: 2,
          elemen: 'Bhinneka Tunggal Ika',
          tps: [
            {
              teks: 'mengidentifikasi kearifan lokal, keragaman budaya, dan mitigasi diskriminasi sosial (SARA)',
              jp: 8,
              ind: 'Peserta didik dapat menguraikan kekayaan adat istiadat nusantara dan menolak ujaran kebencian.',
              r1: 'Masih memiliki prasangka etnosentrisme yang kaku terhadap budaya luar.',
              r2: 'Dapat menyebutkan tradisi daerah dengan bimbingan presentasi guru.',
              r3: 'Dapat mengapresiasi keragaman budaya dan mengampanyekan moderasi beragama secara mandiri.',
              r4: 'Mampu menyelenggarakan pagelaran festival budaya mini atau pameran karya multikultural di sekolah.',
              teknik: 'Proyek pagelaran budaya'
            }
          ]
        },
        {
          nama: 'Menjaga Keutuhan NKRI dan Partisipasi Bela Negara Digital',
          sem: 2,
          elemen: 'Negara Kesatuan Republik Indonesia (NKRI)',
          tps: [
            {
              teks: 'menganalisis ancaman militer dan non-militer (hoaks, cyber crime, radikalisme) serta bela negara',
              jp: 10,
              ind: 'Peserta didik dapat menyaring informasi disinformasi dan memproduksi konten digital penguat persatuan.',
              r1: 'Mudah terpancing menyebarkan berita yang belum terverifikasi kebenarannya.',
              r2: 'Dapat mengenali ciri hoaks dengan bantuan panduan literasi digital.',
              r3: 'Mampu memverifikasi kebenaran informasi dan menerapkan etika digital sebagai wujud cinta tanah air.',
              r4: 'Mampu merancang kampanye literasi anti-hoaks dan cinta produk dalam negeri di media sosial.',
              teknik: 'Produk kampanye digital dan portofolio'
            }
          ]
        }
      ]
    };
  }

  // 6. Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)
  if (lowerMapel.includes('pjok') || lowerMapel.includes('olahraga') || lowerMapel.includes('penjas')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Keterampilan Gerak',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu mempraktikkan keterampilan gerak spesifik dalam berbagai permainan invasi, net, lapangan, olahraga beladiri, atletik, dan aktivitas senam/akuatik secara efektif dan efisien.`
        },
        {
          elemen: 'Pengetahuan Gerak',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis konsep gerak, prinsip biomekanika dasar, taktik, dan strategi bermain dalam berbagai cabang olahraga.`
        },
        {
          elemen: 'Pemanfaatan Gerak dan Kebugaran',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu merancang, mempraktikkan, dan mengevaluasi program latihan kebugaran jasmani terkait kesehatan (daya tahan jantung, kekuatan, kelenturan, komposisi tubuh).`
        },
        {
          elemen: 'Pengembangan Karakter dan Pola Hidup Sehat',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menunjukkan sportivitas, fair play, tanggung jawab personal, serta memahami pencegahan bahaya NAPZA, pergaulan bebas, dan pola makan gizi seimbang.`
        }
      ],
      units: [
        {
          nama: topik ? `Permainan Invasi (Sepak Bola / Basket) & ${topik}` : 'Permainan Invasi: Sepak Bola dan Bola Basket',
          sem: 1,
          elemen: 'Keterampilan Gerak',
          tps: [
            {
              teks: 'mempraktikkan teknik dasar passing, dribbling, shooting, dan kerja sama tim dalam permainan invasi',
              jp: 10,
              ind: 'Peserta didik dapat mengumpan dan mengontrol bola dengan akurasi dan ketepatan posisi.',
              r1: 'Koordinasi kaki/tangan saat mengontrol bola masih kaku; sering kehilangan penguasaan bola.',
              r2: 'Mampu melakukan passing statis dengan bantuan instruksi pelatih.',
              r3: 'Mampu menerapkan variasi gerak passing dan dribbling dinamis dalam simulasi pertandingan kecil.',
              r4: 'Mampu membaca pergerakan tanpa bola, membuka ruang operan, dan menerapkan strategi transisi cepat.',
              teknik: 'Unjuk kerja praktik lapangan dan lembar observasi'
            }
          ]
        },
        {
          nama: 'Permainan Net (Bola Voli dan Bulu Tangkis)',
          sem: 1,
          elemen: 'Pengetahuan Gerak',
          tps: [
            {
              teks: 'menganalisis dan mempraktikkan teknik servis, passing bawah/atas, smash, dan penempatan bola',
              jp: 10,
              ind: 'Peserta didik dapat melakukan servis masuk area lawan dan mengatur arah serangan bola.',
              r1: 'Servis sering menyangkut di net atau keluar garis batas.',
              r2: 'Mampu melakukan passing bawah dengan posisi kuda-kuda dibimbing guru.',
              r3: 'Mampu melakukan rangkaian gerak servis, passing, dan pertahanan bola voli secara konsisten dan terarah.',
              r4: 'Mampu merancang pola penyerangan rotasi dan formasi pertahanan ganda dalam pertandingan resmi.',
              teknik: 'Uji keterampilan motorik dan portofolio'
            }
          ]
        },
        {
          nama: 'Kebugaran Jasmani dan Pola Hidup Sehat',
          sem: 2,
          elemen: 'Pemanfaatan Gerak dan Kebugaran',
          tps: [
            {
              teks: 'mengukur dan merancang program peningkatan derajat kebugaran jasmani (balke test / shuttle run)',
              jp: 10,
              ind: 'Peserta didik dapat menghitung denyut nadi istirahat, denyut nadi latihan, dan tingkat VO2Max.',
              r1: 'Belum mampu menghitung denyut nadi dan tidak terbiasa melakukan pemanasan terstruktur.',
              r2: 'Dapat mengikuti tes kebugaran lari multi-tahap dengan pendampingan catatan waktu.',
              r3: 'Mampu mengukur data kebugaran pribadi dan merumuskan jadwal latihan jasmani mandiri yang seimbang.',
              r4: 'Mampu mengevaluasi perkembangan indeks massa tubuh (BMI) dan mengedukasi prinsip gizi seimbang.',
              teknik: 'Tes kebugaran jasmani Indonesia (TKJI) dan catatan jurnal'
            }
          ]
        }
      ]
    };
  }

  // 7. Akuntansi dan Keuangan Lembaga (AKL)
  if (lowerMapel.includes('akuntansi') || lowerMapel.includes('keuangan') || lowerMapel.includes('pajak')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Proses Bisnis Akuntansi',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami tahapan proses bisnis bidang akuntansi dan keuangan lembaga secara menyeluruh pada perusahaan jasa, dagang, dan manufaktur.`
        },
        {
          elemen: 'Perkembangan Teknologi Akuntansi',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami perkembangan teknologi di industri dan dunia kerja serta isu-isu global di bidang akuntansi termasuk digitalisasi transaksi dan aplikasi spreadsheet/komputer akuntansi.`
        },
        {
          elemen: 'Profil Profesi dan Kewirausahaan',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami profil pekerjaan/profesi akuntan, jenjang karir, peluang kerja, serta peluang wirausaha (technopreneur) di bidang akuntansi dan keuangan lembaga.`
        },
        {
          elemen: 'Etika Profesi dan K3LH',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menerapkan prinsip etika profesi Ikatan Akuntan Indonesia (IAI), integritas kerja, serta keselamatan, kesehatan kerja, dan lingkungan hidup (K3LH) di tempat kerja.`
        },
        {
          elemen: 'Dasar-Dasar Siklus Akuntansi',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis bukti transaksi, menerapkan mekanisme debit-kredit, mencatat ke jurnal umum, posting buku besar, hingga menyusun neraca saldo pada perusahaan jasa dan dagang.`
        }
      ],
      units: [
        {
          nama: topik ? `Proses Bisnis dan Lingkup ${topik}` : 'Proses Bisnis Bidang Akuntansi dan Keuangan Lembaga',
          sem: 1,
          elemen: 'Proses Bisnis Akuntansi',
          tps: [
            {
              teks: 'menjelaskan alur proses bisnis bidang akuntansi dan keuangan lembaga',
              jp: 8,
              ind: 'Peserta didik dapat menjelaskan alur proses bisnis bidang akuntansi dan keuangan lembaga secara runut.',
              r1: 'Belum dapat menjelaskan alur transaksi bisnis; masih memerlukan bimbingan intensif dari guru.',
              r2: 'Dapat menjelaskan alur transaksi bisnis secara garis besar dengan bantuan guru atau teman.',
              r3: 'Dapat menjelaskan alur proses bisnis akuntansi secara mandiri, lengkap, dan runtut.',
              r4: 'Dapat menjelaskan alur proses bisnis akuntansi dengan mandiri serta mengaitkannya pada studi kasus dunia kerja (DUDI).',
              teknik: 'Tes tertulis dan presentasi kelompok'
            },
            {
              teks: 'mengidentifikasi karakteristik entitas perusahaan jasa, dagang, dan manufaktur',
              jp: 10,
              ind: 'Peserta didik dapat membedakan karakteristik entitas perusahaan jasa, dagang, dan manufaktur.',
              r1: 'Belum mampu membedakan karakteristik ketiga jenis perusahaan.',
              r2: 'Mampu membedakan perusahaan jasa dan dagang namun masih ragu pada manufaktur.',
              r3: 'Mampu membedakan karakteristik perusahaan jasa, dagang, dan manufaktur secara tepat.',
              r4: 'Mampu membedakan karakteristik ketiga perusahaan dan menganalisis aliran barang/jasa masing-masing.',
              teknik: 'Observasi diskusi dan penugasan lembar kerja'
            }
          ]
        },
        {
          nama: 'Perkembangan Teknologi dan Komputer Akuntansi',
          sem: 1,
          elemen: 'Perkembangan Teknologi Akuntansi',
          tps: [
            {
              teks: 'menjelaskan perkembangan sistem informasi dan teknologi digital dalam akuntansi',
              jp: 8,
              ind: 'Peserta didik dapat menjelaskan transformasi pencatatan manual menuju digitalisasi akuntansi.',
              r1: 'Belum mampu menjelaskan peran teknologi digital dalam pembukuan.',
              r2: 'Dapat menyebutkan perangkat lunak akuntansi namun belum memahami manfaat digitalisasi.',
              r3: 'Dapat menjelaskan peran dan manfaat software akuntansi dalam efisiensi pembukuan.',
              r4: 'Mampu membandingkan efektivitas software akuntansi modern dan merumuskan solusi tantangan teknologi finansial.',
              teknik: 'Tes tertulis dan observasi'
            },
            {
              teks: 'menerapkan aplikasi spreadsheet dasar untuk pengolahan lembar kerja keuangan',
              jp: 12,
              ind: 'Peserta didik dapat menggunakan rumus dasar spreadsheet (SUM, AVERAGE, IF, VLOOKUP) untuk laporan keuangan.',
              r1: 'Belum menguasai formula dasar spreadsheet; butuh bimbingan langkah demi langkah.',
              r2: 'Mampu memasukkan data dan menggunakan formula penjumlahan dengan panduan.',
              r3: 'Mampu mengoperasikan formula spreadsheet secara mandiri dan akurat untuk tabel keuangan.',
              r4: 'Mampu membuat format laporan terotomatisasi dengan formula lanjutan dan validasi data rapi.',
              teknik: 'Praktik komputer dan unjuk kerja'
            }
          ]
        },
        {
          nama: 'Persamaan Dasar Akuntansi dan Analisis Transaksi Keuangan',
          sem: 2,
          elemen: 'Dasar-Dasar Siklus Akuntansi',
          tps: [
            {
              teks: 'menganalisis bukti transaksi keuangan dan keabsahan dokumen',
              jp: 12,
              ind: 'Peserta didik dapat memverifikasi keabsahan kuitansi, faktur, nota debit/kredit, dan cek.',
              r1: 'Belum mampu membedakan jenis bukti transaksi masuk dan keluar.',
              r2: 'Mampu mengidentifikasi jenis bukti transaksi dasar dengan bantuan contoh acuan.',
              r3: 'Mampu menganalisis komponen dan keabsahan bukti transaksi secara tepat dan mandiri.',
              r4: 'Mampu memvalidasi keabsahan bukti transaksi yang kompleks dan mendeteksi anomali dokumen.',
              teknik: 'Analisis dokumen bukti dan tes tertulis'
            },
            {
              teks: 'menerapkan persamaan dasar akuntansi dan mekanisme debit-kredit pada transaksi usaha',
              jp: 14,
              ind: 'Peserta didik dapat menyusun tabel persamaan dasar akuntansi (Aset = Liabilitas + Ekuitas) secara seimbang.',
              r1: 'Tabel persamaan dasar akuntansi belum seimbang; kesulitan memetakan akun debit dan kredit.',
              r2: 'Dapat menyusun persamaan dasar akuntansi untuk transaksi sederhana dengan pendampingan.',
              r3: 'Dapat menyusun persamaan dasar akuntansi dengan teliti, seimbang, dan mandiri.',
              r4: 'Mampu memproyeksikan pengaruh tiap transaksi terhadap posisi keuangan dan laba rugi secara komprehensif.',
              teknik: 'Penugasan terstruktur dan tes tertulis'
            }
          ]
        },
        {
          nama: 'Pencatatan Siklus Akuntansi Perusahaan Jasa',
          sem: 2,
          elemen: 'Dasar-Dasar Siklus Akuntansi',
          tps: [
            {
              teks: 'mencatat transaksi keuangan ke dalam jurnal umum perusahaan jasa secara kronologis',
              jp: 16,
              ind: 'Peserta didik dapat membuat jurnal umum yang balance dan sesuai standar PSAK.',
              r1: 'Jurnal umum belum balance; penempatan akun debit dan kredit masih terbalik.',
              r2: 'Dapat mencatat transaksi rutin dengan bantuan daftar akun (chart of accounts).',
              r3: 'Dapat menyusun jurnal umum secara kronologis, rapi, tepat akun, dan balance.',
              r4: 'Mampu menjurnal transaksi kompleks (penyesuaian, deferral, accrual) dan memverifikasi referensi silang.',
              teknik: 'Praktik akuntansi siklus dan portofolio'
            },
            {
              teks: 'melakukan posting ke buku besar dan menyusun neraca saldo perusahaan jasa',
              jp: 14,
              ind: 'Peserta didik dapat memindahkan mutasi akun dari jurnal ke buku besar dan membuat neraca saldo.',
              r1: 'Posting buku besar belum lengkap dan neraca saldo tidak seimbang.',
              r2: 'Mampu memposting transaksi dengan bantuan template buku besar 4 kolom.',
              r3: 'Mampu menyelesaikan posting buku besar dan menyusun neraca saldo dengan benar dan mandiri.',
              r4: 'Mampu merekonsiliasi selisih saldo dan menyajikan neraca saldo sebagai dasar penyusunan laporan keuangan.',
              teknik: 'Uji kompetensi praktik dan tes tertulis'
            }
          ]
        }
      ]
    };
  }

  // 8. Kejuruan: Teknik Otomotif / Mesin
  if (lowerMapel.includes('otomotif') || lowerMapel.includes('mesin') || lowerMapel.includes('tbsm') || lowerMapel.includes('tkr')) {
    return {
      isFallback: true,
      cp: [
        {
          elemen: 'Proses Bisnis Bidang Otomotif',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami alur proses bisnis otomotif dari manufaktur, perakitan, penjualan, hingga layanan purnajual dan bengkel servis.`
        },
        {
          elemen: 'Keselamatan Kerja (K3LH) dan Alat Ukur Otomotif',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu menerapkan SOP K3LH bengkel, APD, pemadam api (APAR), serta mengoperasikan alat ukur presisi (jangka sorong, mikrometer, dial gauge, multimeter).`
        },
        {
          elemen: 'Dasar Motor Bakar dan Sistem Otomotif',
          teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami prinsip kerja motor 4 langkah dan 2 langkah, siklus pembakaran, sistem bahan bakar (karburator/injeksi EFI), pelumasan, dan pendinginan mesin.`
        }
      ],
      units: [
        {
          nama: topik ? `K3LH dan Penggunaan Alat Ukur Otomotif & ${topik}` : 'K3LH dan Alat Ukur Presisi Otomotif',
          sem: 1,
          elemen: 'Keselamatan Kerja (K3LH) dan Alat Ukur Otomotif',
          tps: [
            {
              teks: 'menerapkan prosedur keselamatan kerja dan pengelolaan limbah B3 di bengkel otomotif',
              jp: 8,
              ind: 'Peserta didik dapat menggunakan APD wajib bengkel dan membuang oli bekas ke drum penampungan sesuai SOP.',
              r1: 'Belum mematuhi penggunaan kacamata pelindung dan sepatu safety bengkel.',
              r2: 'Menggunakan APD lengkap jika diperingatkan oleh instruktur.',
              r3: 'Disiplin menerapkan SOP keselamatan kerja dan pemilahan limbah B3 secara mandiri.',
              r4: 'Mampu melakukan inspeksi bahaya bengkel dan mengoperasikan APAR saat simulasi darurat.',
              teknik: 'Observasi disiplin bengkel'
            },
            {
              teks: 'menggunakan dan membaca alat ukur presisi mekanik (jangka sorong dan mikrometer luar) dengan teliti',
              jp: 12,
              ind: 'Peserta didik dapat membaca skala vernier jangka sorong ketelitian 0,05 mm dan mikrometer 0,01 mm.',
              r1: 'Salah membaca garis skala nonius dan posisi zero point mikrometer.',
              r2: 'Dapat mengukur diameter luar poros dengan bantuan guru memeriksa skala.',
              r3: 'Mampu mengukur diameter silinder, celah piston, dan ketebalan bantalan dengan presisi dan mandiri.',
              r4: 'Mampu mengkalibrasi alat ukur presisi dan menganalisis batas keausan komponen sesuai manual servis pabrik.',
              teknik: 'Uji kompetensi pengukuran mekanik'
            }
          ]
        },
        {
          nama: 'Prinsip Kerja Motor Bakar 4 Langkah dan 2 Langkah',
          sem: 2,
          elemen: 'Dasar Motor Bakar dan Sistem Otomotif',
          tps: [
            {
              teks: 'menjelaskan siklus 4 langkah (hisap, kompresi, usaha, buang) dan membedakannya dengan motor 2 langkah',
              jp: 12,
              ind: 'Peserta didik dapat menguraikan pergerakan piston, bukaan katup, dan timing pengapian.',
              r1: 'Masih tertukar urutan langkah kerja motor 4 tak.',
              r2: 'Dapat menjelaskan siklus hisap dan buang dengan model peraga mesin potong.',
              r3: 'Dapat menerangkan siklus kerja 4 langkah secara runtut dan menjelaskan keunggulan efisiensi bahan bakarnya.',
              r4: 'Mampu mendiagnosis gangguan tenaga mesin (kurang kompresi, misfiring) berbasis prinsip siklus motor.',
              teknik: 'Tes lisan peraga dan tes tertulis'
            },
            {
              teks: 'melakukan perawatan berkala sistem pelumasan dan pendinginan mesin otomotif',
              jp: 14,
              ind: 'Peserta didik dapat mengganti oli mesin, filter oli, dan memeriksa level cairan pendingin (coolant radiator).',
              r1: 'Belum mampu memposisikan kunci pas/ring dengan aman saat membuka baut tap oli.',
              r2: 'Dapat mengganti oli mesin dengan pengawasan instruktur bengkel.',
              r3: 'Mampu melakukan tune-up ringan pelumasan dan pendinginan sesuai manual servis secara mandiri dan bersih.',
              r4: 'Mampu menguji tutup radiator (radiator cap tester) dan kebocoran sistem pendingin dengan akurat.',
              teknik: 'Praktik tune-up berkala di bengkel'
            }
          ]
        }
      ]
    };
  }

  // 9. Pintar Dinamis untuk Semua Mata Pelajaran Lainnya
  const safeMapel = mapel;
  const cleanTopik = topik ? ` — Fokus: ${topik}` : '';

  return {
    isFallback: true,
    cp: [
      {
        elemen: `Konsep Dasar dan Keilmuan ${safeMapel}`,
        teks: `Pada akhir Fase ${fase}, peserta didik mampu memahami prinsip-prinsip fundamental, terminologi keilmuan, dan teori esensial ${safeMapel}${cleanTopik} sesuai kaidah akademik Kurikulum Merdeka.`
      },
      {
        elemen: `Keterampilan Teknis dan Prosedural ${safeMapel}`,
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mempraktikkan keterampilan spesifik, prosedur kerja ilmiah, serta mengoperasikan instrumen/metode ${safeMapel} secara cermat dan bertanggung jawab.`
      },
      {
        elemen: `Analisis, Pemecahan Masalah, dan Kolaborasi`,
        teks: `Pada akhir Fase ${fase}, peserta didik mampu menganalisis studi kasus kontekstual, merumuskan hipotesis/solusi kreatif, dan berkolaborasi secara produktif dalam tim.`
      },
      {
        elemen: `Evaluasi, Refleksi, dan Inovasi Produk/Karya`,
        teks: `Pada akhir Fase ${fase}, peserta didik mampu mengevaluasi mutu capaian pembelajaran, merefleksikan proses belajar, serta mengomunikasikan hasil karya/laporan secara efektif.`
      }
    ],
    units: [
      {
        nama: topik ? `Fondasi dan Konsep Kunci: ${topik}` : `Fondasi dan Konsep Esensial ${safeMapel}`,
        sem: 1,
        elemen: `Konsep Dasar dan Keilmuan ${safeMapel}`,
        tps: [
          {
            teks: `menjelaskan konsep kunci, definisi, dan ruang lingkup materi dalam ${safeMapel}`,
            jp: 8,
            ind: `Peserta didik dapat menjelaskan ruang lingkup dan prinsip dasar ${safeMapel} secara komprehensif.`,
            r1: 'Belum mampu mendefinisikan konsep dasar; masih memerlukan bimbingan intensif dari guru.',
            r2: 'Mampu menjelaskan sebagian konsep dengan bimbingan dan contoh acuan.',
            r3: 'Mampu menjelaskan konsep kunci secara jelas, sistematis, dan mandiri.',
            r4: 'Mampu mengaitkan konsep dasar dengan fenomena kontekstual di dunia industri/masyarakat.',
            teknik: 'Tes tertulis dan diskusi kelas'
          },
          {
            teks: `mengidentifikasi instrumen, sumber belajar, dan prosedur keselamatan kerja dalam pembelajaran ${safeMapel}`,
            jp: 8,
            ind: 'Peserta didik dapat mengenali instrumen kerja dan menerapkan pedoman keselamatan secara disiplin.',
            r1: 'Belum mengenali instrumen kerja dasar dan prosedur kerja yang aman.',
            r2: 'Dapat mengenali instrumen kerja jika dipandu oleh guru.',
            r3: 'Dapat mengidentifikasi instrumen kerja dan menerapkan SOP keselamatan secara mandiri.',
            r4: 'Mampu memverifikasi kelaikan instrumen kerja dan merumuskan langkah pencegahan risiko.',
            teknik: 'Observasi unjuk kerja'
          }
        ]
      },
      {
        nama: `Metode Kerja dan Prosedur Praktik ${safeMapel}`,
        sem: 1,
        elemen: `Keterampilan Teknis dan Prosedural ${safeMapel}`,
        tps: [
          {
            teks: `mempraktikkan tahapan kerja dan prosedur teknis ${safeMapel} sesuai standar operasional`,
            jp: 12,
            ind: 'Peserta didik dapat menyelesaikan tahapan kerja secara prosedural dan tepat waktu.',
            r1: 'Urutan pengerjaan belum runtut; banyak langkah terlewati.',
            r2: 'Dapat menyelesaikan tugas dengan bantuan lembar panduan teknis.',
            r3: 'Dapat mempraktikkan langkah kerja secara mandiri, teliti, dan sesuai standar mutu.',
            r4: 'Dapat mempraktikkan langkah kerja secara presisi serta mampu membimbing teman sebaya.',
            teknik: 'Unjuk kerja dan lembar observasi'
          },
          {
            teks: `mendokumentasikan dan menyajikan data hasil pelaksanaan kegiatan pembelajaran ${safeMapel}`,
            jp: 10,
            ind: 'Peserta didik dapat mencatat data hasil observasi/praktik ke dalam format laporan yang terstruktur.',
            r1: 'Data hasil kerja belum tercatat dengan rapi dan sistematis.',
            r2: 'Mampu mencatat data dengan template laporan yang disediakan guru.',
            r3: 'Mampu menyusun dokumentasi data hasil kerja secara rapi, akurat, dan mandiri.',
            r4: 'Mampu menyajikan data dalam bentuk visualisasi informatif dan menarik simpulan logis.',
            teknik: 'Penilaian portofolio dan laporan'
          }
        ]
      },
      {
        nama: `Analisis Masalah Kontekstual dan Studi Lapangan`,
        sem: 2,
        elemen: 'Analisis, Pemecahan Masalah, dan Kolaborasi',
        tps: [
          {
            teks: `menganalisis permasalahan riil dalam bidang ${safeMapel} dan merumuskan alternatif solusi`,
            jp: 12,
            ind: 'Peserta didik dapat mengidentifikasi akar penyebab masalah dan memilih solusi paling tepat.',
            r1: 'Belum mampu membedakan gejala dan akar permasalahan.',
            r2: 'Mampu mengidentifikasi masalah namun pilihan solusi masih terbatas.',
            r3: 'Mampu menganalisis masalah dan merumuskan alternatif solusi yang realistis secara mandiri.',
            r4: 'Mampu mengevaluasi dampak solusi dan merekomendasikan perbaikan proses secara komprehensif.',
            teknik: 'Studi kasus dan penilaian proyek'
          },
          {
            teks: 'mempresentasikan hasil telaah dan rekomendasi perbaikan di depan forum kelas',
            jp: 10,
            ind: 'Peserta didik dapat menyampaikan presentasi dengan vokal jelas, slide komunikatif, dan responsif terhadap tanggapan.',
            r1: 'Penyampaian belum percaya diri dan materi kurang terstruktur.',
            r2: 'Mampu presentasi dengan membaca teks catatan.',
            r3: 'Mampu presentasi dengan runtut, intonasi jelas, dan menjawab pertanyaan dengan baik.',
            r4: 'Mampu memoderasi diskusi, menjawab pertanyaan kritis secara argumentatif, dan memikat audiens.',
            teknik: 'Presentasi lisan dan rubrik unjuk kerja'
          }
        ]
      },
      {
        nama: `Proyek Aplikasi Nyata dan Refleksi Akhir ${safeMapel}`,
        sem: 2,
        elemen: 'Evaluasi, Refleksi, dan Inovasi Produk/Karya',
        tps: [
          {
            teks: `menghasilkan karya nyata atau proyek pemecahan masalah dalam bidang ${safeMapel}`,
            jp: 14,
            ind: 'Peserta didik dapat menghasilkan produk/karya nyata yang memenuhi kriteria ketercapaian tujuan.',
            r1: 'Proyek belum tuntas sesuai target spesifikasi yang ditentukan.',
            r2: 'Dapat menyelesaikan proyek dengan asistensi intensif dari fasilitator.',
            r3: 'Dapat menyelesaikan produk proyek dengan tuntas, fungsional, dan tepat waktu secara mandiri.',
            r4: 'Menghasilkan karya berkualitas tinggi dengan sentuhan inovasi dan nilai guna optimal.',
            teknik: 'Penilaian produk/proyek akhir'
          },
          {
            teks: 'melakukan evaluasi diri dan refleksi capaian kompetensi untuk rencana tindak lanjut',
            jp: 8,
            ind: 'Peserta didik dapat mengidentifikasi kekuatan dan area pengembangan diri selama proses belajar.',
            r1: 'Belum mampu merefleksikan capaian belajar secara objektif.',
            r2: 'Dapat mengisi rubrik refleksi dengan panduan pertanyaan pengarah.',
            r3: 'Mampu melakukan refleksi jujur dan merumuskan langkah perbaikan diri secara mandiri.',
            r4: 'Mampu menyusun portofolio karir mandiri dan rencana pengembangan kompetensi berkelanjutan.',
            teknik: 'Jurnal refleksi dan penilaian diri'
          }
        ]
      }
    ]
  };
}
