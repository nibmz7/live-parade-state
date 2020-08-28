import { expect } from 'chai';
import Rank from '../../model/rank';

const validRanks = [
  'LG',
  'MG',
  'BG',
  'COL',
  'SLTC',
  'LTC',
  'MAJ',
  'CPT',
  'LTA',
  '2LT',
  'CWO',
  'SWO',
  'MWO',
  '1WO',
  '2WO',
  '3WO',
  'DX10',
  'DX5',
  'MSG',
  'SSG',
  '1SG',
  '2SG',
  '3SG',
  'CFC',
  'CPL',
  'LCP',
  'PTE',
  'REC',
];

const invalidRanks = ['Mr', 'DX20', 'CAPTAIN'];

const ranks = {
  'LG': 1,
  '3WO': 16,
  'DX19': 17,
  'DX1': 35,
  'MSG': 37,
  'REC': 46,
};

describe('Rank class methods', () => {
  it('Check valid ranks', () => {
    let results = validRanks.map((rank) => Rank.isValid(rank));
    expect(results.every((result) => result === true)).to.equal(true);
  });

  it('Check invalid ranks', () => {
    let results = invalidRanks.map((rank) => Rank.isValid(rank));
    expect(results.every((result) => result === false)).to.equal(true);
  });

  it('Check rank to int method', () => {
    let results = Object.keys(ranks).map((rank) => {
      return ranks[rank] === Rank.ToInt(rank);
    });
    expect(results.every((result) => result === true)).to.equal(true);
  });
});
