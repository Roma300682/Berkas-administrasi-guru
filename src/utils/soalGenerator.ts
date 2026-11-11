import { SoalEssayItem, SoalPgItem, SoalPkg, TpItem, UnitItem } from '../types';

const uid = () => Math.random().toString(36).slice(2, 9);

const cleanTp = (s: string): string =>
  String(s || '')
    .trim()
    .replace(/^peserta didik\s+(mampu|dapat)\s+/i, '')
    .replace(/^\[TP\s+[^\]]+\]\s*/i, '')
    .replace(/^peserta didik\s+(mampu|dapat)\s+/i, '')
    .replace(/[.\s]+$/, '');

const extractTpCode = (s: string, idx: number): string => {
  const m = String(s || '').match(/\[(TP\s+[^\]]+)\]/i);
  return m ? m[1].toUpperCase() : `TP.${idx + 1}`;
};

interface QuestionTemplate {
  keywords: string[];
  pg: Array<{
    indikator: string;
    level: string;
    tanya: string;
    opsi: { A: string; B: string; C: string; D: string; E: string };
    kunci: 'A' | 'B' | 'C' | 'D' | 'E';
    pembahasan: string;
  }>;
  essay: Array<{
    indikator: string;
    level: string;
    tanya: string;
    kunci: string;
    skor: number;
  }>;
}

const TOPIC_BANK: QuestionTemplate[] = [
  {
    keywords: ['persamaan dasar', 'siklus akuntansi', 'jurnal umum', 'perusahaan jasa', 'bukti transaksi', 'neraca saldo'],
    pg: [
      {
        indikator: 'Disajikan transaksi pembelian peralatan secara kredit, peserta didik dapat menentukan pengaruhnya terhadap persamaan dasar akuntansi.',
        level: 'L2 (C3 - Aplikasi)',
        tanya: 'Bengkel Maju Jaya membeli peralatan servis seharga Rp15.000.000, dibayar tunai Rp5.000.000 dan sisanya dibayar bulan depan. Pengaruh transaksi tersebut terhadap persamaan dasar akuntansi adalah ....',
        opsi: {
          A: 'Peralatan (+) Rp15.000.000, Kas (–) Rp5.000.000, dan Utang Usaha (+) Rp10.000.000',
          B: 'Peralatan (+) Rp15.000.000, Kas (–) Rp10.000.000, dan Modal (+) Rp5.000.000',
          C: 'Perlengkapan (+) Rp15.000.000, Kas (–) Rp5.000.000, dan Utang Usaha (+) Rp10.000.000',
          D: 'Kas (+) Rp5.000.000, Peralatan (+) Rp10.000.000, dan Utang Usaha (+) Rp15.000.000',
          E: 'Peralatan (+) Rp15.000.000 dan Utang Usaha (–) Rp10.000.000',
        },
        kunci: 'A',
        pembahasan: 'Pembelian peralatan sebagian tunai dan sebagian kredit menambah Aset Peralatan Rp15.000.000, mengurangi Aset Kas Rp5.000.000, dan menambah Liabilitas Utang Usaha Rp10.000.000.',
      },
      {
        indikator: 'Disajikan data neraca saldo dan data penyesuaian perlengkapan, peserta didik dapat menyusun jurnal penyesuaian yang tepat.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Pada Neraca Saldo per 31 Desember 2026, akun Perlengkapan Kantor menunjukkan saldo Rp8.400.000. Berdasarkan hasil perhitungan fisik pada akhir periode, perlengkapan yang masih tersisa adalah Rp2.900.000. Jurnal penyesuaian yang tepat pada 31 Desember 2026 adalah ....',
        opsi: {
          A: 'Beban Perlengkapan (D) Rp2.900.000; Perlengkapan Kantor (K) Rp2.900.000',
          B: 'Beban Perlengkapan (D) Rp5.500.000; Perlengkapan Kantor (K) Rp5.500.000',
          C: 'Perlengkapan Kantor (D) Rp5.500.000; Beban Perlengkapan (K) Rp5.500.000',
          D: 'Beban Perlengkapan (D) Rp8.400.000; Perlengkapan Kantor (K) Rp8.400.000',
          E: 'Ikhtisar Laba Rugi (D) Rp5.500.000; Perlengkapan Kantor (K) Rp5.500.000',
        },
        kunci: 'B',
        pembahasan: 'Perlengkapan yang terpakai menjadi beban = Rp8.400.000 - Rp2.900.000 = Rp5.500.000. Jurnal penyesuaiannya: Beban Perlengkapan (D) Rp5.500.000 pada Perlengkapan Kantor (K) Rp5.500.000.',
      },
      {
        indikator: 'Disajikan ilustrasi dokumen bukti transaksi internal/eksternal, peserta didik dapat mengidentifikasi fungsi bukti transaksi.',
        level: 'L1 (C2 - Pemahaman)',
        tanya: 'Dokumen bukti transaksi atas pembelian barang atau penggunaan jasa secara kredit yang diterima oleh pembeli dari penjual disebut ....',
        opsi: {
          A: 'Kuitansi',
          B: 'Nota Kontan',
          C: 'Faktur Pembelian (Invoice)',
          D: 'Memo Antarbagian',
          E: 'Bukti Kas Masuk',
        },
        kunci: 'C',
        pembahasan: 'Faktur (invoice) adalah bukti transaksi jual beli secara kredit. Bagi pihak pembeli, faktur yang diterima merupakan Faktur Pembelian.',
      },
    ],
    essay: [
      {
        indikator: 'Disajikan data transaksi perusahaan jasa selama satu bulan, peserta didik dapat menyusun jurnal umum dan menghitung laba bersih.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Kantor Konsultan Akuntansi "Nusantara" selama bulan Juli 2026 mencatat transaksi berikut:\n1) Pemilik menyetorkan kas Rp50.000.000 dan peralatan komputer Rp18.000.000 sebagai modal awal.\n2) Membayar sewa ruang kantor untuk 1 tahun sebesar Rp12.000.000.\n3) Menyelesaikan jasa penyusunan laporan keuangan klien senilai Rp14.500.000, diterima tunai Rp8.500.000 dan sisanya difakturkan.\n4) Membayar gaji staf Rp4.200.000 dan beban utilitas Rp800.000.\nDiminta: Buatlah pencatatan Jurnal Umum atas keempat transaksi tersebut secara lengkap dan rapi!',
        kunci: '1) Kas (D) Rp50.000.000, Peralatan (D) Rp18.000.000 / Modal (K) Rp68.000.000\n2) Sewa Dibayar di Muka (D) Rp12.000.000 / Kas (K) Rp12.000.000\n3) Kas (D) Rp8.500.000, Piutang Usaha (D) Rp6.000.000 / Pendapatan Jasa (K) Rp14.500.000\n4) Beban Gaji (D) Rp4.200.000, Beban Utilitas (D) Rp800.000 / Kas (K) Rp5.000.000.',
        skor: 20,
      },
    ],
  },
  {
    keywords: ['jurnal khusus', 'perusahaan dagang', 'buku besar pembantu', 'sak ep', 'sak emkm', 'hpp', 'harga pokok penjualan'],
    pg: [
      {
        indikator: 'Disajikan transaksi pelunasan utang dagang dalam masa potongan, peserta didik dapat menghitung kas yang dikeluarkan pada Jurnal Pengeluaran Kas.',
        level: 'L2 (C3 - Aplikasi)',
        tanya: 'Pada tanggal 5 Agustus 2026, PD Sejahtera membeli barang dagang dari PT Indofood sebesar Rp20.000.000 dengan syarat 2/10, n/30. Pada tanggal 12 Agustus 2026, PD Sejahtera melunasi seluruh utangnya. Pencatatan pada Jurnal Pengeluaran Kas tanggal 12 Agustus 2026 adalah ....',
        opsi: {
          A: 'Utang Dagang (D) Rp20.000.000; Kas (K) Rp20.000.000',
          B: 'Utang Dagang (D) Rp20.000.000; Kas (K) Rp19.600.000; Potongan Pembelian (K) Rp400.000',
          C: 'Utang Dagang (D) Rp19.600.000; Potongan Pembelian (D) Rp400.000; Kas (K) Rp20.000.000',
          D: 'Pembelian (D) Rp20.000.000; Kas (K) Rp19.600.000; Potongan Pembelian (K) Rp400.000',
          E: 'Piutang Dagang (D) Rp20.000.000; Kas (K) Rp19.600.000; Potongan Penjualan (K) Rp400.000',
        },
        kunci: 'B',
        pembahasan: 'Pelunasan dilakukan 7 hari setelah transaksi (masih dalam masa potongan 10 hari), sehingga mendapat potongan 2% x Rp20.000.000 = Rp400.000. Kas yang dibayar = Rp19.600.000.',
      },
      {
        indikator: 'Disajikan data persediaan, pembelian, beban angkut, retur, dan potongan, peserta didik dapat menghitung Harga Pokok Penjualan (HPP).',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Diketahui data keuangan UD Makmur: Persediaan barang dagang awal Rp35.000.000; Pembelian Rp120.000.000; Beban angkut pembelian Rp3.000.000; Retur pembelian Rp5.000.000; Potongan pembelian Rp2.000.000; dan Persediaan barang dagang akhir Rp41.000.000. Besarnya Harga Pokok Penjualan (HPP) adalah ....',
        opsi: {
          A: 'Rp106.000.000',
          B: 'Rp110.000.000',
          C: 'Rp114.000.000',
          D: 'Rp116.000.000',
          E: 'Rp151.000.000',
        },
        kunci: 'B',
        pembahasan: 'Pembelian bersih = Rp120.000.000 + Rp3.000.000 - Rp5.000.000 - Rp2.000.000 = Rp116.000.000. Barang tersedia dijual = Rp35.000.000 + Rp116.000.000 = Rp151.000.000. HPP = Rp151.000.000 - Rp41.000.000 = Rp110.000.000.',
      },
    ],
    essay: [
      {
        indikator: 'Disajikan data neraca saldo disesuaikan perusahaan dagang, peserta didik dapat menyusun perhitungan Laba Kotor dan Laba Bersih sesuai SAK EP / SAK EMKM.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'PT Niaga Jaya memiliki data akhir tahun 2026: Penjualan Rp450.000.000, Retur Penjualan Rp12.000.000, Potongan Penjualan Rp8.000.000, HPP Rp275.000.000, Beban Pemasaran Rp35.000.000, dan Beban Administrasi Umum Rp40.000.000. Hitunglah: (a) Penjualan Bersih, (b) Laba Kotor, dan (c) Laba Usaha sebelum pajak!',
        kunci: '(a) Penjualan Bersih = Rp450.000.000 - Rp12.000.000 - Rp8.000.000 = Rp430.000.000.\n(b) Laba Kotor = Rp430.000.000 - Rp275.000.000 = Rp155.000.000.\n(c) Laba Usaha = Rp155.000.000 - (Rp35.000.000 + Rp40.000.000) = Rp80.000.000.',
        skor: 20,
      },
    ],
  },
  {
    keywords: ['kas kecil', 'petty cash', 'rekonsiliasi bank', 'piutang', 'wesel', 'persediaan', 'fifo', 'aset tetap', 'penyusutan', 'obligasi'],
    pg: [
      {
        indikator: 'Disajikan perbedaan pencatatan dana kas kecil metode imprest dan fluktuasi, peserta didik dapat menentukan jurnal saat pengeluaran kas kecil.',
        level: 'L2 (C3 - Aplikasi)',
        tanya: ' Dalam pengelolaan dana kas kecil sistem dana tetap (Imprest Fund System), pada saat pemegang kas kecil melakukan pembayaran biaya pembelian materai dan konsumsi rapat sebesar Rp350.000, maka perlakuan pencatatannya adalah ....',
        opsi: {
          A: 'Mendebit Beban Perlengkapan Rp350.000 dan mengkredit Kas Kecil Rp350.000',
          B: 'Mendebit Kas Kecil Rp350.000 dan mengkredit Kas di Bank Rp350.000',
          C: 'Tidak dijurnal saat pengeluaran, hanya mengumpulkan bukti pengeluaran kas kecil dan dicatat pada buku kas kecil',
          D: 'Mendebit Beban Rupa-rupa Rp350.000 dan mengkredit Kas di Bank Rp350.000 saat tanggal pengeluaran',
          E: 'Mendebit Selisih Kas Kecil Rp350.000 dan mengkredit Kas Kecil Rp350.000',
        },
        kunci: 'C',
        pembahasan: 'Pada metode Imprest (dana tetap), saat terjadi pengeluaran kas kecil tidak dibuat jurnal umum; penjurnalan beban baru dilakukan sekaligus pada saat pengisian kembali (replenishment) dana kas kecil.',
      },
      {
        indikator: 'Disajikan data saldo kas perusahaan dan rekening koran bank, peserta didik dapat menghitung saldo kas yang benar pada rekonsiliasi bank.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Saldo Kas PT Gemilang per 31 Oktober 2026 menurut catatan perusahaan adalah Rp42.500.000, sedangkan menurut Rekening Koran Bank sebesar Rp46.200.000. Setelah ditelusuri, terdapat Setoran dalam Perjalanan (Deposit in Transit) Rp5.000.000, Cek Beredar (Outstanding Check) Rp8.200.000, Jasa Giro Bank Rp750.000, dan Biaya Administrasi Bank Rp250.000. Saldo kas yang benar setelah rekonsiliasi adalah ....',
        opsi: {
          A: 'Rp42.000.000',
          B: 'Rp43.000.000',
          C: 'Rp43.250.000',
          D: 'Rp45.700.000',
          E: 'Rp47.500.000',
        },
        kunci: 'B',
        pembahasan: 'Saldo menurut perusahaan = Rp42.500.000 + Jasa Giro Rp750.000 - Admin Bank Rp250.000 = Rp43.000.000. Saldo menurut Bank = Rp46.200.000 + Deposit in Transit Rp5.000.000 - Cek Beredar Rp8.200.000 = Rp43.000.000 (Seimbang).',
      },
    ],
    essay: [
      {
        indikator: 'Disajikan data perolehan aset tetap, nilai residu, dan umur ekonomis, peserta didik dapat menghitung beban penyusutan metode garis lurus dan saldo menurun ganda.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Pada tanggal 2 Januari 2026, PT Karya Mandiri membeli sebuah mesin produksi dengan harga beli Rp210.000.000, biaya instalasi dan uji coba Rp10.000.000. Mesin tersebut ditaksir memiliki umur ekonomis 5 tahun dengan nilai residu (nilai sisa) Rp20.000.000.\nDiminta: Hitunglah harga perolehan mesin dan beban penyusutan tahun 2026 menggunakan: (a) Metode Garis Lurus (Straight Line Method), dan (b) Metode Saldo Menurun Ganda (Double Declining Balance)!',
        kunci: 'Harga Perolehan = Rp210.000.000 + Rp10.000.000 = Rp220.000.000.\n(a) Metode Garis Lurus = (Rp220.000.000 - Rp20.000.000) / 5 tahun = Rp40.000.000 per tahun.\n(b) Tarif Saldo Menurun Ganda = 2 x (100% / 5) = 40%. Penyusutan tahun 2026 = 40% x Rp220.000.000 = Rp88.000.000.',
        skor: 20,
      },
    ],
  },
  {
    keywords: ['pajak', 'perpajakan', 'pph', 'ter', 'coretax', 'npwp', 'ppn', 'rekonsiliasi fiskal'],
    pg: [
      {
        indikator: 'Disajikan data penghasilan bruto bulanan pegawai tetap dan status PTKP, peserta didik dapat menghitung PPh Pasal 21 menggunakan metode Tarif Efektif Rata-rata (TER).',
        level: 'L2 (C3 - Aplikasi)',
        tanya: 'Bapak Andi (status K/1, termasuk Kategori TER A) bekerja sebagai staf akuntansi di PT Nusantara dengan gaji dan tunjangan tetap bruto bulan Maret 2026 sebesar Rp10.000.000. Apabila tarif efektif bulanan (TER A) untuk lapisan penghasilan tersebut adalah 2%, maka PPh Pasal 21 yang dipotong perusahaan pada bulan Maret 2026 adalah ....',
        opsi: {
          A: 'Rp100.000',
          B: 'Rp150.000',
          C: 'Rp200.000',
          D: 'Rp250.000',
          E: 'Rp500.000',
        },
        kunci: 'C',
        pembahasan: 'Sesuai PP 58/2023 & PMK 168/2023, PPh Pasal 21 masa Januari–November dihitung dengan mengalikan Penghasilan Bruto Sebulan dengan Tarif TER: Rp10.000.000 x 2% = Rp200.000.',
      },
      {
        indikator: 'Disajikan transaksi penyerahan Barang Kena Pajak kepada Bendahara Pemerintah, peserta didik dapat menentukan kode Faktur Pajak yang tepat.',
        level: 'L2 (C3 - Aplikasi)',
        tanya: 'PT Mitra Komputer (PKP) menjual 10 unit komputer senilai Rp80.000.000 (belum termasuk PPN) kepada Dinas Pendidikan (Instansi Pemerintah yang ditunjuk sebagai Pemungut PPN). Kode awal Nomor Seri Faktur Pajak (e-Faktur Coretax) yang wajib diterbitkan oleh PT Mitra Komputer adalah ....',
        opsi: {
          A: '010',
          B: '020',
          C: '030',
          D: '070',
          E: '080',
        },
        kunci: 'B',
        pembahasan: 'Kode Faktur Pajak 02 digunakan untuk penyerahan BKP dan/atau JKP kepada Pemungut PPN Instansi Pemerintah (Bendahara Pemerintah).',
      },
    ],
    essay: [
      {
        indikator: 'Disajikan data peredaran bruto (omzet) bulanan Wajib Pajak Orang Pribadi UMKM, peserta didik dapat menghitung PPh Final UMKM 0,5% dengan batas tidak kena pajak Rp500 juta.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Ibu Rina adalah Wajib Pajak Orang Pribadi pemilik usaha toko pakaian "Rina Fashion" yang menggunakan skema PPh Final UMKM 0,5% (PP No. 55 Tahun 2022). Akumulasi peredaran bruto (omzet) toko Ibu Rina dari bulan Januari s.d. Mei 2026 telah mencapai Rp480.000.000. Pada bulan Juni 2026, omzet toko Ibu Rina adalah Rp90.000.000.\nDiminta: Jelaskan ketentuan batas omzet tidak kena pajak bagi WP OP UMKM dan hitunglah PPh Final 0,5% yang wajib disetor Ibu Rina untuk masa pajak Juni 2026!',
        kunci: 'Sesuai UU HPP & PP 55/2022, WP Orang Pribadi UMKM mendapat fasilitas bagian peredaran bruto sampai dengan Rp500.000.000 dalam 1 tahun pajak tidak dikenai PPh Final.\n- Total omzet s.d. Juni 2026 = Rp480.000.000 + Rp90.000.000 = Rp570.000.000.\n- Bagian omzet Juni yang melampaui Rp500.000.000 = Rp570.000.000 - Rp500.000.000 = Rp70.000.000.\n- PPh Final UMKM masa Juni 2026 = 0,5% x Rp70.000.000 = Rp350.000.',
        skor: 20,
      },
    ],
  },
  {
    keywords: ['pemerintah', 'skpd', 'ppkd', 'apbd', 'apbdes', 'siskeudes', 'sipd', 'lra', 'sap'],
    pg: [
      {
        indikator: 'Disajikan transaksi realisasi belanja modal pada SKPD, peserta didik dapat menentukan pencatatan jurnal pelaksanaan anggaran (LRA) dan jurnal finansial (LO/Neraca).',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Dinas Kesehatan (SKPD) membeli kendaraan ambulans senilai Rp350.000.000 melalui mekanisme SP2D-LS. Berdasarkan Standar Akuntansi Pemerintahan (PP 71/2010), selain mencatat Jurnal Finansial (Aset Tetap pada RK-PPKD), SKPD juga wajib mencatat Jurnal Pelaksanaan Anggaran (LRA) yaitu ....',
        opsi: {
          A: 'Belanja Modal Pengadaan Alat Angkutan (D) Rp350.000.000; Perubahan SAL (K) Rp350.000.000',
          B: 'Perubahan SAL (D) Rp350.000.000; Belanja Modal Pengadaan Alat Angkutan (K) Rp350.000.000',
          C: 'Beban Penyusutan Alat Angkutan (D) Rp350.000.000; Kas di Bendahara Pengeluaran (K) Rp350.000.000',
          D: 'Aset Tetap Alat Angkutan (D) Rp350.000.000; Ekuitas Pemerintah Daerah (K) Rp350.000.000',
          E: 'RK-PPKD (D) Rp350.000.000; Perubahan SAL (K) Rp350.000.000',
        },
        kunci: 'A',
        pembahasan: 'Setiap transaksi pengeluaran kas yang membebani anggaran SKPD dicatat dalam Jurnal LRA dengan mendebit akun Belanja (Belanja Modal) dan mengkredit akun Perubahan SAL.',
      },
    ],
    essay: [
      {
        indikator: 'Disajikan struktur APBDes pada pengelolaan keuangan desa, peserta didik dapat menguraikan 5 bidang belanja desa sesuai Permendagri 20/2018 & Siskeudes.',
        level: 'L2 (C3 - Aplikasi)',
        tanya: 'Dalam pengelolaan keuangan desa berbasis aplikasi Siskeudes, klasifikasi Belanja Desa dibagi menjadi 5 (lima) Bidang utama. Sebutkan kelima bidang Belanja Desa tersebut dan berikan masing-masing 1 contoh kegiatannya!',
        kunci: '5 Bidang Belanja Desa:\n1) Bidang Penyelenggaraan Pemerintahan Desa (contoh: penghasilan tetap kepala desa & perangkat, operasional kantor desa).\n2) Bidang Pelaksanaan Pembangunan Desa (contoh: pembangunan jalan desa, irigasi, posyandu).\n3) Bidang Pembinaan Kemasyarakatan Desa (contoh: pembinaan karang taruna, lembaga adat, keamanan).\n4) Bidang Pemberdayaan Masyarakat Desa (contoh: pelatihan UMKM desa, peningkatan kapasitas kelompok tani).\n5) Bidang Penanggulangan Bencana, Keadaan Darurat dan Mendesak Desa (contoh: BLT Dana Desa, penanganan bencana alam).',
        skor: 20,
      },
    ],
  },
  {
    keywords: ['perbankan', 'syariah', 'mudharabah', 'murabahah', 'wadiah', 'teller', 'kliring', 'bi-fast', 'kredit'],
    pg: [
      {
        indikator: 'Disajikan data saldo rata-rata deposito mudharabah, pendapatan bank, dan nisbah bagi hasil, peserta didik dapat menghitung bagi hasil nasabah.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Nasabah menempatkan Deposito Mudharabah di Bank Syariah sebesar Rp50.000.000 (jangka waktu 1 bulan) dengan nisbah bagi hasil 60% Nasabah : 40% Bank. Jika total dana deposito mudharabah 1 bulan di bank tersebut Rp5.000.000.000 dan pendapatan yang dibagihasilkan untuk kelompok deposito 1 bulan adalah Rp75.000.000, maka bagi hasil bruto yang diterima nasabah tersebut adalah ....',
        opsi: {
          A: 'Rp300.000',
          B: 'Rp450.000',
          C: 'Rp500.000',
          D: 'Rp600.000',
          E: 'Rp750.000',
        },
        kunci: 'B',
        pembahasan: 'Porsi dana nasabah = (Rp50.000.000 / Rp5.000.000.000) x Rp75.000.000 = Rp750.000. Bagian nasabah sesuai nisbah 60% = 60% x Rp750.000 = Rp450.000.',
      },
    ],
    essay: [
      {
        indikator: 'Disajikan permohonan pembiayaan jual beli Murabahah di Bank Syariah, peserta didik dapat menghitung harga jual bank dan angsuran per bulan.',
        level: 'L3 / HOTS (C4 - Analisis)',
        tanya: 'Pak Rahmat mengajukan pembiayaan pembelian kendaraan niaga ke Bank Syariah dengan akad Murabahah. Harga beli kendaraan dari dealer adalah Rp180.000.000. Bank Syariah dan Pak Rahmat menyepakati margin keuntungan bank sebesar Rp36.000.000 untuk jangka waktu pembiayaan 36 bulan (3 tahun). Pak Rahmat menyerahkan uang muka (urbun) sebesar Rp36.000.000.\nDiminta: Hitunglah (a) Harga Jual Murabahah, (b) Saldo Piutang Murabahah setelah uang muka, dan (c) Besarnya angsuran per bulan!',
        kunci: '(a) Harga Jual Murabahah = Harga Pokok Rp180.000.000 + Margin Rp36.000.000 = Rp216.000.000.\n(b) Piutang Murabahah bersih yang diangsur = Rp216.000.000 - Uang Muka Rp36.000.000 = Rp180.000.000.\n(c) Angsuran per bulan = Rp180.000.000 / 36 bulan = Rp5.000.000 per bulan.',
        skor: 20,
      },
    ],
  },
];

export function generateContextualSoal(
  mapel: string,
  kelas: string,
  unit: UnitItem,
  tps: TpItem[],
  opts?: {
    jenisUjian?: string;
    waktuMenit?: number;
    topikFokus?: string;
    kesulitan?: string;
    jmlPg?: number;
    jmlEssay?: number;
  }
): SoalPkg {
  const jenisUjian = opts?.jenisUjian || 'Asesmen Sumatif Lingkup Materi (Ulangan Harian)';
  const waktuMenit = opts?.waktuMenit || 90;
  const topikFokus = opts?.topikFokus?.trim() || unit.nama || mapel || 'Materi Pembelajaran';
  const kesulitan = opts?.kesulitan || 'Proporsional (LOTS 30%, MOTS 50%, HOTS 20%)';
  const targetPg = Math.max(1, Math.min(30, Number(opts?.jmlPg) || 10));
  const targetEssay = Math.max(1, Math.min(10, Number(opts?.jmlEssay) || 5));

  const combinedText = `${mapel} ${unit.nama} ${topikFokus} ${tps.map(t => t.teks).join(' ')}`.toLowerCase();

  const pgList: SoalPgItem[] = [];
  const essayList: SoalEssayItem[] = [];

  // 1. Pull matching domain-specific case questions first
  TOPIC_BANK.forEach(bank => {
    if (bank.keywords.some(kw => combinedText.includes(kw))) {
      bank.pg.forEach((q, idx) => {
        if (pgList.length < targetPg) {
          const refTp = tps[idx % Math.max(1, tps.length)];
          pgList.push({
            id: uid(),
            tpKode: refTp ? extractTpCode(refTp.teks, idx) : `TP.${idx + 1}`,
            indikatorSoal: q.indikator,
            levelKognitif: q.level,
            tanya: q.tanya,
            opsi: { ...q.opsi },
            kunci: q.kunci,
            pembahasan: q.pembahasan,
          });
        }
      });

      bank.essay.forEach((e, idx) => {
        if (essayList.length < targetEssay) {
          const refTp = tps[idx % Math.max(1, tps.length)];
          essayList.push({
            id: uid(),
            tpKode: refTp ? extractTpCode(refTp.teks, idx) : `TP.${idx + 1}`,
            indikatorSoal: e.indikator,
            levelKognitif: e.level,
            tanya: e.tanya,
            kunci: e.kunci,
            skor: e.skor,
          });
        }
      });
    }
  });

  // 2. Generate tailored questions from the Unit's TPs & Topic to reach exact targetPg
  const effectiveTps: TpItem[] =
    tps.length > 0
      ? tps
      : [
          {
            id: 'tp-default',
            unitId: unit.id,
            teks: `menganalisis konsep dan prosedur ${topikFokus}`,
            jp: 8,
            ind: '',
            r1: '',
            r2: '',
            r3: '',
            r4: '',
            teknik: '',
          },
        ];

  const pgVariants = [
    {
      level: 'L1 (C2 - Pemahaman Konsep)',
      prefixInd: 'Disajikan deskripsi konsep tentang',
      makeQ: (inti: string, uNama: string) =>
        `Dalam mempelajari materi "${uNama}", langkah awal yang paling tepat ketika peserta didik ${inti} sesuai prosedur standar adalah ....`,
      makeOpts: (inti: string) => ({
        A: `Mengidentifikasi dokumen sumber, konsep dasar, dan memverifikasi kelengkapan data untuk ${inti} secara sistematis`,
        B: `Langsung menyusun kesimpulan akhir tanpa memeriksa kesesuaian data awal transaksi`,
        C: `Mengabaikan pedoman standar operasional agar proses pengerjaan selesai lebih cepat`,
        D: `Menggunakan perkiraan subjektif tanpa didukung bukti atau referensi yang sah`,
        E: `Menunda proses verifikasi hingga periode pelaporan tahun berikutnya selesai`,
      }),
      kunci: 'A' as const,
      makeBahasan: (inti: string) =>
        `Prosedur yang benar dalam ${inti} selalu diawali dengan identifikasi dokumen/data sumber dan verifikasi ketelitian sesuai standar.`,
    },
    {
      level: 'L2 (C3 - Penerapan / Aplikasi)',
      prefixInd: 'Disajikan situasi praktik di dunia kerja terkait',
      makeQ: (inti: string, uNama: string) =>
        `Seorang staf profesional sedang menangani pekerjaan pada lingkup "${uNama}", khususnya untuk ${inti}. Tindakan penerapan yang menunjukkan ketelitian dan kepatuhan standar adalah ....`,
      makeOpts: (inti: string) => ({
        A: `Mencatat dan mengolah data hanya berdasarkan ingatan tanpa arsip dokumen pendukung`,
        B: `Menerapkan prosedur kerja secara berurutan, memeriksa keseimbangan/akurasi perhitungan, dan mendokumentasikan hasil ketika ${inti}`,
        C: `Menggabungkan data periode berjalan dengan data pribadi di luar entitas kerja`,
        D: `Menghapus rincian data yang mengalami selisih tanpa melakukan penelusuran (rekonsiliasi)`,
        E: `Melewati tahapan validasi agar laporan tampak rapi meskipun datanya belum lengkap`,
      }),
      kunci: 'B' as const,
      makeBahasan: (inti: string) =>
        `Penerapan kompetensi ${inti} yang tepat menuntut ketelitian prosedur, pengecekan akurasi perhitungan, dan dokumentasi yang akuntabel.`,
    },
    {
      level: 'L3 / HOTS (C4 - Analisis Kasus)',
      prefixInd: 'Disajikan studi kasus permasalahan pada',
      makeQ: (inti: string, _uNama: string) =>
        `Perhatikan kasus berikut: Pada saat dilakukan evaluasi berkala terkait proses ${inti}, ditemukan adanya ketidaksesuaian antara data catatan dengan bukti fisik di lapangan. Langkah analisis dan penyelesaian yang paling tepat adalah ....`,
      makeOpts: (inti: string) => ({
        A: `Membiarkan selisih tersebut karena dianggap wajar dalam kegiatan operasional harian`,
        B: `Mengubah angka pada bukti asli secara sepihak agar sama dengan catatan`,
        C: `Menelusuri kembali bukti sumber (audit trail), mengidentifikasi letak kesalahan saat ${inti}, dan menyusun koreksi/penyesuaian sesuai standar`,
        D: `Membuat laporan baru tanpa menyertakan lampiran rincian transaksi periode berjalan`,
        E: `Membebankan seluruh selisih kepada pelanggan tanpa konfirmasi terlebih dahulu`,
      }),
      kunci: 'C' as const,
      makeBahasan: (inti: string) =>
        `Dalam analisis kasus (HOTS), setiap selisih atau ketidaksesuaian saat ${inti} wajib ditelusuri ke dokumen sumber (audit trail) dan dikoreksi sesuai kaidah resmi.`,
    },
    {
      level: 'L3 / HOTS (C5 - Evaluasi)',
      prefixInd: 'Disajikan dua alternatif pengambilan keputusan dalam',
      makeQ: (inti: string, uNama: string) =>
        `Manajemen meminta pertimbangan Anda mengenai efektivitas pelaksanaan ${inti} pada unit "${uNama}". Indikator utama bahwa proses tersebut telah berjalan efektif, efisien, dan akuntabel adalah ....`,
      makeOpts: (inti: string) => ({
        A: `Banyaknya jumlah koreksi kesalahan yang harus dibuat pada akhir periode`,
        B: `Tidak adanya bukti dokumen tertulis yang disimpan di dalam arsip perusahaan`,
        C: `Lamanya waktu penyelesaian laporan hingga melewati batas waktu yang ditetapkan`,
        D: `Data hasil ${inti} tersaji tepat waktu, akurat (bebas salah saji material), dapat diverifikasi, dan relevan untuk pengambilan keputusan`,
        E: `Seluruh tahapan dikerjakan tanpa mengikuti pedoman standar yang berlaku`,
      }),
      kunci: 'D' as const,
      makeBahasan: (inti: string) =>
        `Kualitas informasi hasil ${inti} diukur dari ketepatan waktu, akurasi, keterverifikasian (verifiability), dan relevansinya bagi pengambilan keputusan.`,
    },
    {
      level: 'L2 (C3 - Aplikasi Prosedural)',
      prefixInd: 'Disajikan urutan tahapan kerja pada',
      makeQ: (inti: string, _uNama: string) =>
        `Apabila dalam proses ${inti} diperlukan pengendalian mutu (internal control) agar terhindar dari kesalahan input maupun kecurangan (fraud), maka langkah preventif yang wajib diterapkan adalah ....`,
      makeOpts: (inti: string) => ({
        A: `Menyerahkan seluruh wewenang otorisasi, pencatatan, dan penyimpanan kepada satu orang tanpa pengawasan`,
        B: `Memisahkan fungsi otorisasi dan pencatatan serta melakukan verifikasi silang atas setiap dokumen saat ${inti}`,
        C: `Menonaktifkan fitur pemeriksaan otomatis pada sistem pengolah data`,
        D: `Membuang bukti transaksi segera setelah data selesai diketik ke dalam tabel`,
        E: `Melakukan pencatatan hanya pada akhir tahun tanpa pembukuan harian`,
      }),
      kunci: 'B' as const,
      makeBahasan: (_inti: string) =>
        'Pengendalian internal yang baik menerapkan pemisahan tugas (segregation of duties) dan verifikasi silang terhadap dokumen sumber.',
    },
  ];

  let variantIdx = 0;
  while (pgList.length < targetPg) {
    const tp = effectiveTps[variantIdx % effectiveTps.length];
    const inti = cleanTp(tp.teks);
    const v = pgVariants[variantIdx % pgVariants.length];
    const tpCode = extractTpCode(tp.teks, variantIdx % effectiveTps.length);

    pgList.push({
      id: uid(),
      tpKode: tpCode,
      indikatorSoal: `${v.prefixInd} ${inti}, peserta didik dapat menyelesaikan permasalahan pada topik ${topikFokus} dengan tepat.`,
      levelKognitif: v.level,
      tanya: v.makeQ(inti, topikFokus),
      opsi: v.makeOpts(inti),
      kunci: v.kunci,
      pembahasan: v.makeBahasan(inti),
    });
    variantIdx++;
  }

  let essayIdx = 0;
  const defaultScore = Math.round(100 / Math.max(1, targetEssay));
  while (essayList.length < targetEssay) {
    const tp = effectiveTps[essayIdx % effectiveTps.length];
    const inti = cleanTp(tp.teks);
    const tpCode = extractTpCode(tp.teks, essayIdx % effectiveTps.length);

    const isCase = essayIdx % 2 === 0;
    essayList.push({
      id: uid(),
      tpKode: tpCode,
      indikatorSoal: `Disajikan permasalahan kontekstual terkait ${inti}, peserta didik dapat menguraikan langkah analisis dan penyelesaiannya secara sistematis.`,
      levelKognitif: isCase ? 'L3 / HOTS (C4 - Analisis Kasus)' : 'L2 (C3 - Aplikasi Prosedur)',
      tanya: isCase
        ? `Studi Kasus (${topikFokus}):\nDalam praktik di dunia kerja Kelas ${kelas}, sering dijumpai kendala ketelitian saat melaksanakan ${inti}. Jelaskan: (a) tahapan prosedur yang benar untuk ${inti}, (b) potensi kesalahan yang sering terjadi beserta dampaknya, dan (c) solusi pengendalian agar hasilnya akurat!`
        : `Uraikan langkah-langkah sistematis dalam ${inti} pada lingkup materi "${topikFokus}", serta berikan contoh penerapannya secara nyata!`,
      kunci: isCase
        ? `(a) Tahapan prosedur: menyiapkan dokumen/data sumber, memverifikasi keabsahan data, memproses ${inti} sesuai standar, dan memeriksa ulang hasil akhir.\n(b) Potensi kesalahan: salah input data/nominal atau terlewatnya dokumen yang berdampak pada ketidakakuratan laporan.\n(c) Solusi: melakukan rekonsiliasi/pengecekan silang (cross-check) dan pengarsipan tertib.`
        : `Langkah-langkah ${inti}:\n1. Identifikasi dan verifikasi data/dokumen awal pada ${topikFokus}.\n2. Analisis komponen utama sesuai aturan/standar yang berlaku.\n3. Lakukan pencatatan/perhitungan/eksekusi secara teliti.\n4. Evaluasi dan simpulkan hasil pekerjaan secara akuntabel.`,
      skor: defaultScore,
    });
    essayIdx++;
  }

  return {
    unitId: unit.id,
    jenisUjian,
    waktuMenit,
    topikFokus,
    kesulitan,
    jmlPg: targetPg,
    jmlEssay: targetEssay,
    petunjuk:
      '1. Berdoalah sebelum mulai mengerjakan soal ujian.\n2. Tulislah identitas lengkap (Nama, Nomor Peserta/Absen, dan Kelas) pada lembar jawaban.\n3. Bacalah setiap butir soal dan studi kasus dengan teliti.\n4. Untuk soal Pilihan Ganda, pilihlah satu jawaban yang paling tepat (A, B, C, D, atau E).\n5. Untuk soal Uraian/Studi Kasus, tuliskan langkah penyelesaian dan perhitungan secara lengkap, rapi, dan sistematis.',
    cetakKisi: true,
    cetakNaskah: true,
    cetakKunci: true,
    pg: pgList,
    essay: essayList,
  };
}
