import EventDispatcher from "../util/EventDispatcher.js";

export default class UserRepository extends EventDispatcher {

    constructor() {
        super();
        this.db = firebase.firestore();
    }

    updateUserStatus(isMorning, status, uid, departmentid) {
        let userRef = db.doc(`branches/${branchid}/departments/${departmentid}/users/${uid}`);
        if (isMorning) userRef.update({ "status.am": { ...status } });
        else userRef.update({ "status.pm": { ...status } });
    }

    async getBranchName(branchid) {
        return await this.db.doc(`branches/${branchid}`);
    }

    async getDepartmentName(branchid, departmentid) {
        return await this.db.doc(`branches/${branchid}/departments/${departmentid}`);
    }

    toDepartment = doc => {
        return {
            uid: doc.id,
            ...doc.data()
        }
    }

    async getDepartments(branchid) {
        let querySnapshot = await this.db.collection(`branches/${branchid}/departments`).get();
        if (!querySnapshot.empty) {
            let departments = [];
            for (let doc of querySnapshot.docs) {
                let department = this.toDepartment(doc);
                departments.push(department);
            }
            this.emit('department-event', { type: 'found', departments });
        }

    }

    subscribeDepartments(branchid) {
        let initialLoad = true;
        let departments = this.db.collection(`branches/${branchid}/departments`);
        this.departmentsUnsubscribe = departments.onSnapshot(snapshot => {
            if (snapshot.empty) this.emit('department-event', { type: 'empty' });
            else {
                if(initialLoad) {
                    let departments = [];
                    for (let change of snapshot.docChanges()) {
                        let department = this.toDepartment(change.doc);
                        departments.push(department);
                    }
                    this.emit('department-event', { type: 'found', departments });
                } else {
                    for (let change of snapshot.docChanges()) {
                        let department = this.toDepartment(change.doc);
                        this.emit('department-event', { type: change.type, department });
                    }
                }
            }
        });
    }

    toUser = doc => {
        let user = doc.data();
        return {
            uid: doc.id,
            fullname: user.rank + ' ' + user.name,
            ...user
        }
    }

    subscribeUsers(branchid) {
        let initialLoad = true;
        let users = this.db.collectionGroup('users').where('branchid', '==', branchid);
        this.usersUnsubscribe = users.onSnapshot(snapshot => {
            if (snapshot.empty) this.emit('user-event', { type: 'empty' });
            else {
                if(initialLoad) {
                    let users = [];
                    for (let change of snapshot.docChanges()) {
                        let user = this.toUser(change.doc);
                        users.push(user);
                    }
                    this.emit('user-event', { type: 'found', users });
                } else {
                    for (let change of snapshot.docChanges()) {
                        let user = this.toUser(change.doc);
                        this.emit('user-event', { type: change.type, user });
                    }
                }
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