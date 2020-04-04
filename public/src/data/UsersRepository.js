export default class UserRepository {

    constructor() {
        this.db = firebase.firestore();
    }

    getBranchName(branchid) {
        return await this.db.doc(`branches/${branchid}`);
    }

    async getDepartmentName(branchid, departmentid) {
        return await this.db.doc(`branches/${branchid}/departments/${departmentid}`);
    }

    updateUserStatus(isMorning, status, uid, departmentid) {
        let userRef = db.doc(`branches/${branchid}/departments/${departmentid}/users/${uid}`);
        if(isMorning) userRef.update({"status.am": {...status}});
        else userRef.update({"status.pm": {...status}});
    }

    subscribe(branchid) {
        let users = this.db.collectionGroup('users').where('branchid', '==', branchid);
        this.usersUnsubscribe = users.onSnapshot(snapshot => {
            for (let change of snapshot.docChanges()) {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                }
            }
        });
    }

    unsubscribe() {
        this.usersUnsubscribe();
    }

}