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

    static createStatus(code, remarks, uid) {
        return {
            code, remarks, updatedby: uid, timestamp: firebase.firestore.FieldValue.serverTimestamp()
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

    static fromDoc(doc) {
        let user = doc.data().data;
        let amTimestamp = user.status.am.timestamp;
        let pmTimestamp = user.status.pm.timestamp;
        let amIsExpired = false;
        let pmIsExpired = false;
        if (pmTimestamp) {
            pmTimestamp = pmTimestamp.toDate();
            user.status.pm.timestamp = pmTimestamp;
            pmIsExpired = !this.checkSameDay(pmTimestamp);
        }
        if (amTimestamp) {
            amTimestamp = amTimestamp.toDate();
            user.status.am.timestamp = amTimestamp;
            amIsExpired = !this.checkSameDay(amTimestamp);
        }
        user.status.am.expired = amIsExpired;
        user.status.pm.expired = pmIsExpired;

        return {
            uid: doc.id,
            fullname: user.rank + ' ' + user.name,
            ...user
        }
    }

    static checkSameDay(statusDate){
        let date = new Date();
        let dayDifference = statusDate.getDate() - date.getDate();
        let isSameDayBeforeSix = dayDifference === 0 && statusDate.getHours() < 17 && date.getHours() < 17;
        let isSameDayAfterSix = dayDifference === 0 && statusDate.getHours() > 17 && date.getHours() > 17;
        let isPrevDayAfterSix = dayDifference === -1 && statusDate.getHours() > 17 && date.getHours() < 17;
        return date.getFullYear() === statusDate.getFullYear() &&
            date.getMonth() === statusDate.getMonth() &&
            (isSameDayBeforeSix || isSameDayAfterSix || isPrevDayAfterSix);
    }

}


