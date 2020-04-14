const Rank = {
    ranks: {
        "LG": 1,
        "MG": 2,
        "BG": 3,
        "COL": 4,
        "SLTC": 5,
        "LTC": 6,
        "MAJ": 7,
        "CPT": 8,
        "LTA": 9,
        "2LT": 10,
        "CWO": 11,
        "SWO": 12,
        "MWO": 13,
        "1WO": 14,
        "2WO": 15,
        "3WO": 16,
        "DX": 36,
        "MSG": 37,
        "SSG": 38,
        "1SG": 39,
        "2SG": 40,
        "3SG": 41,
        "CFC": 42,
        "CPL": 43,
        "LCP": 44,
        "PTE": 45,
        "REC": 46
    },

    isValid(rank) {
        return rank in this.ranks || rank.toUpperCase().includes('DX');
    },

    rankToInt(rank) {
        if (rank.toUpperCase().includes('DX')) {
            let suffix = Number(rank.substring(2));
            return this.ranks['DX'] - suffix;
        }
        return this.ranks[rank];
    }
}

export default Rank;