const ranks = {
  'LG': 1,
  'MG': 2,
  'BG': 3,
  'COL': 4,
  'SLTC': 5,
  'LTC': 6,
  'MAJ': 7,
  'CPT': 8,
  'LTA': 9,
  '2LT': 10,
  'CWO': 11,
  'SWO': 12,
  'MWO': 13,
  '1WO': 14,
  '2WO': 15,
  '3WO': 16,
  'DX': 36,
  'MSG': 37,
  'SSG': 38,
  '1SG': 39,
  '2SG': 40,
  '3SG': 41,
  'CFC': 42,
  'CPL': 43,
  'LCP': 44,
  'PTE': 45,
  'REC': 46,
};

export default class Rank {
  readonly text: string;
  readonly code: number;

  constructor(rank: string) {
    this.text = rank;
    this.code = Rank.ToInt(rank);
  }

  static isValid(rank: string): boolean {
    if (rank in ranks) return true;
    if (rank.toUpperCase().includes('DX') && rank.length <= 4) {
      return true;
    }
    return false;
  }

  static ToInt(rank: string): number {
    if (rank.toUpperCase().includes('DX')) {
      if (rank.length > 4) return 99;
      let suffix = Number(rank.substring(2));
      return ranks['DX'] - suffix;
    }
    return ranks[rank];
  }
}
