import EventDispatcher from '../../src/util/EventDispatcher.js';

export default class BranchRepository extends EventDispatcher {

    constructor() {
        super();
        this.db = firebase.firestore();
        this.db.enablePersistence();
    }

    updateUserStatus(isMorning, status, uid, branchid) {
        let userRef = this.db.doc(`branches/${branchid}/repository/${uid}`);
        if (isMorning) userRef.update({ "data.status.am": { ...status } });
        else userRef.update({ "data.status.pm": { ...status } });
    }

    toDepartment(doc) {
        return {
            uid: doc.id,
            ...doc.data().data
        }
    }

    checkSameDay(statusDate) {
        let date = new Date();
        return date.getFullYear() === statusDate.getFullYear() &&
            date.getMonth() === statusDate.getMonth() &&
            date.getDate() === statusDate.getDate();
    }

    toUser(doc) {
        let user = doc.data().data;
        let amTimestamp = user.status.am.timestamp;
        let pmTimestamp = user.status.pm.timestamp;
        let amIsExpired = false;
        let pmIsExpired = false;
        if (amTimestamp && pmTimestamp) {
            amIsExpired = !this.checkSameDay(amTimestamp.toDate());
            pmIsExpired = !this.checkSameDay(pmTimestamp.toDate());
        }
        user.status.am.expired = amIsExpired;
        user.status.pm.expired = pmIsExpired;

        return {
            uid: doc.id,
            fullname: user.rank + ' ' + user.name,
            ...user
        }
    }

    subscribe(branchid) {
        let initialLoad = true;
        let repository = this.db.collection(`branches/${branchid}/repository`);
        this.branchUnsubscribe = repository.onSnapshot(snapshot => {
            if (snapshot.empty) {
                if (initialLoad) {
                    initialLoad = false;
                    this.emit('user-event', { type: 'found', users: [] });
                }
                this.emit('department-event', { type: 'empty' });
            }
            else {
                if (initialLoad) {
                    initialLoad = false;
                    let departments = [];
                    let users = [];
                    for (let change of snapshot.docChanges()) {
                        let type = change.doc.data().type;
                        if (type == 'user') users.push(this.toUser(change.doc));
                        else departments.push(this.toDepartment(change.doc));
                    }
                    this.emit('department-event', { type: 'found', departments });
                    this.emit('user-event', { type: 'found', users });
                } else {
                    for (let change of snapshot.docChanges()) {
                        let type = change.doc.data().type;
                        let data = type === 'user' ? this.toUser(change.doc) : this.toDepartment(change.doc);
                        this.emit(`${type}-event`, { type: change.type, [type]: data });
                    }
                }
            }
        }, error => {
            console.log(error);
        });
    }

    unsubscribe() {
        this.branchUnsubscribe();
    }

}
BranchRepository.instance = null;