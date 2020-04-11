import EventDispatcher from "../util/EventDispatcher.js";

export default class UserRepository extends EventDispatcher {

    constructor() {
        super();
        this.db = firebase.firestore();
    }

    async getBranchName(branchid) {
        return await this.db.doc(`branches/${branchid}`);
    }

    async getDepartmentName(branchid, departmentid) {
        return await this.db.doc(`branches/${branchid}/departments/${departmentid}`);
    }

    updateUserStatus(isMorning, status, uid, departmentid) {
        let userRef = db.doc(`branches/${branchid}/departments/${departmentid}/users/${uid}`);
        if (isMorning) userRef.update({ "status.am": { ...status } });
        else userRef.update({ "status.pm": { ...status } });
    }

    subscribeDepartments(branchid) {
        let departments = this.db.collection(`branches/${branchid}/departments`);
        this.departmentsUnsubscribe = departments.onSnapshot(snapshot => {
            for (let change of snapshot.docChanges()) {
              let uid = change.doc.id;
              let name = change.doc.data().name;
              this.emit(`department-${change.type}`, { uid, name });
            }
           if(snapshot.empty) this.emit('department-empty');
        });
    }

    subscribeUsers(branchid) {
        let users = this.db.collectionGroup('users').where('branchid', '==', branchid);
        this.usersUnsubscribe = users.onSnapshot(snapshot => {
            for (let change of snapshot.docChanges()) {
                let uid = change.doc.id;
                let user = change.doc.data();
                this.emit(`user-${change.type}`, { uid, ...user });
    }
});
    }

unsubscribeDepartments() {
    this.departmentsUnsubscribe();

}

unsubscribeUsers() {
    this.usersUnsubscribe();
}

}