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
