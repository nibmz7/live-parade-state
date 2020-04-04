export default class User {

    constructor(branchid, departmentid, name, rank, status) {
        this.branchid = branchid;
        this.departmentid = departmentid;
        this.name = name;
        this.rank = rank;
        this.status = status;
    }

    static createStatus(code, remarks, updatedby) {
        return {
            code, remarks, updatedby, timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
    }

    static userConverter = {
        toFirestore: user => {
            return {
                branchid: user.branchid,
                departmentid: user.departmentid,
                name: user.name,
                rank: user.rank,
                status: user.status
            }
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new User(data.branchid, data.departmentid, data.name, data.rank, data.status);
        }
    }

}


