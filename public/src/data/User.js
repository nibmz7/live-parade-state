import Rank from './Rank.js';

export default class User {

    constructor(branchid, departmentid, name, rank, email, status) {
        this.branchid = branchid;
        this.departmentid = departmentid;
        this.name = name;
        this.rank = rank;
        this.status = status;
        this.email = email;
    }

    static createStatus(code, remarks, user) {
        return {
            code, remarks, updatedby: user.uid, timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
    }
    
    static compare(a,b) {
        let aRank = Rank.rankToInt(a.rank);
        let bRank = Rank.rankToInt(b.rank);

        if (aRank < bRank) return -1;
        if (bRank < aRank) return 1;

        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;

        return 0;
    }

    static compareLinear(a,b) {
        let aRank = Rank.rankToInt(a.rank);
        let bRank = Rank.rankToInt(b.rank);

        if (aRank < bRank) return true;
        if (bRank < aRank) return false;

        if (a.name < b.name) return true;
        if (b.name < a.name) return false;

        return false;
    }

}


