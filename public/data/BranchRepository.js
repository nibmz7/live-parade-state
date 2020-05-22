import { SingletonEventDispatcher } from '../../src/util/EventDispatcher.js';
import User from '../../src/model/User.js';

export default class BranchRepository extends SingletonEventDispatcher {

    constructor() {
        super();
        firebase.firestore().settings({
            host: "192.168.0.139:8080",
            ssl: false
        });
        this.db = firebase.firestore();
        this.db.enablePersistence({ synchronizeTabs: true });
    }

    updateUserStatus(morningOnlyUpdate, status, uid, branchid) {
        let userRef = this.db.doc(`branches/${branchid}/repository/${uid}`);
        if (morningOnlyUpdate === null) {
            userRef.update({
                "data.status": {
                    am: status, pm: status
                }
            });
        }
        else if (morningOnlyUpdate === true) userRef.update({ "data.status.am": { ...status } });
        else if (morningOnlyUpdate === false) userRef.update({ "data.status.pm": { ...status } });
    }

    toDepartment(doc) {
        return {
            uid: doc.id,
            ...doc.data().data
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
                        if (type == 'user') users.push(User.fromDoc(change.doc));
                        else departments.push(this.toDepartment(change.doc));
                    }
                    this.emit('department-event', { type: 'found', departments });
                    this.emit('user-event', { type: 'found', users });
                } else {
                    for (let change of snapshot.docChanges()) {
                        let type = change.doc.data().type;
                        let data = type === 'user' ? User.fromDoc(change.doc) : this.toDepartment(change.doc);
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