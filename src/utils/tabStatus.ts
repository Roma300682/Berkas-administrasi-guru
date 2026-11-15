import { AppState, Semester } from '../types';

export function jpAvailForSem(state: AppState, sem: Semester): number {
  const jp = Number(state.profil.jp) || 0;
  return state.bulan
    .filter(b => b.sem === sem)
    .reduce((acc, b) => acc + (b.n - b.off.length) * jp, 0);
}

export function jpTotalForSem(state: AppState, sem: Semester): number {
  const uIds = state.unit.filter(u => u.sem === sem).map(u => u.id);
  return state.tp
    .filter(t => uIds.includes(t.unitId))
    .reduce((acc, t) => acc + (Number(t.jp) || 0), 0);
}

const ratioSt = (r: number) => (r <= 0 ? 0 : r >= 1 ? 2 : 1);

export function getTabStatus(state: AppState, id: string): number {
  const p = state.profil;
  const n = state.tp.length;
  const U = state.unit.length;

  switch (id) {
    case 'mulai': {
      const fields = ['guru', 'sekolah', 'mapel', 'kelas', 'ta', 'kepsek'];
      const filled = fields.filter(k => Boolean((p as any)[k])).length;
      return ratioSt(filled / fields.length);
    }
    case 'waktu': {
      const a1 = jpAvailForSem(state, 1);
      const a2 = jpAvailForSem(state, 2);
      return a1 > 0 && a2 > 0 ? 2 : a1 > 0 || a2 > 0 ? 1 : 0;
    }
    case 'cpatp': {
      const r = n ? state.tp.filter(t => t.teks && Number(t.jp) > 0).length / n : 0;
      return ratioSt(state.cp.length ? r : Math.min(r, 0.5));
    }
    case 'prota':
      return !n
        ? 0
        : jpTotalForSem(state, 1) <= jpAvailForSem(state, 1) &&
          jpTotalForSem(state, 2) <= jpAvailForSem(state, 2)
        ? 2
        : 1;
    case 'promes':
      return ratioSt(n ? state.tp.filter(t => (state.promes[t.id] || []).length).length / n : 0);
    case 'kktp':
      return ratioSt(
        n ? state.tp.filter(t => t.ind && t.r1 && t.r2 && t.r3 && t.r4).length / n : 0
      );
    case 'modul':
      return ratioSt(
        U
          ? state.unit.filter(u => {
              const m = state.modul[u.id];
              return m && m.pendahuluan && m.memahami;
            }).length / U
          : 0
      );
    case 'lkpd':
      return ratioSt(
        U
          ? state.unit.filter(u => {
              const l = state.lkpd[u.id];
              return l && l.tugas;
            }).length / U
          : 0
      );
    case 'soal': {
      if (U === 0) return 0;
      const readyCount = state.unit.filter(u => {
        const s = state.soal?.[u.id];
        return s && Array.isArray(s.pg) && s.pg.length > 0;
      }).length;
      return readyCount > 0 ? ratioSt(readyCount / U) : 1;
    }
    default:
      return 0;
  }
}

export function getTabDetail(state: AppState, id: string): string {
  const n = state.tp.length;
  const U = state.unit.length;
  const mgSum = (s: Semester) =>
    state.bulan.filter(b => b.sem === s).reduce((acc, b) => acc + (b.n - b.off.length), 0);

  switch (id) {
    case 'mulai':
      return 'Identitas guru dan sekolah';
    case 'waktu':
      return `${mgSum(1) + mgSum(2)} minggu efektif · ${jpAvailForSem(state, 1) + jpAvailForSem(state, 2)} JP · Kaldik Jabar`;
    case 'cpatp':
      return `${U} unit · ${n} TP`;
    case 'prota':
      return `${jpTotalForSem(state, 1) + jpTotalForSem(state, 2)} JP materi`;
    case 'promes':
      return `${state.tp.filter(t => (state.promes[t.id] || []).length).length} dari ${n} TP terjadwal`;
    case 'kktp':
      return `${state.tp.filter(t => t.ind && t.r1 && t.r2 && t.r3 && t.r4).length} dari ${n} TP lengkap`;
    case 'modul':
      return `${
        state.unit.filter(u => {
          const m = state.modul[u.id];
          return m && m.pendahuluan && m.memahami;
        }).length
      } dari ${U} unit`;
    case 'lkpd':
      return `${
        state.unit.filter(u => {
          const l = state.lkpd[u.id];
          return l && l.tugas;
        }).length
      } dari ${U} unit`;
    case 'soal': {
      const soalReady = state.unit.filter(u => state.soal?.[u.id]?.pg?.length).length;
      return `${soalReady > 0 ? soalReady : U} dari ${U} unit · Kisi-kisi, PG & Uraian`;
    }
    default:
      return '';
  }
}
