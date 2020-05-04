import Singleton from "../../src/util/Singleton.js";

export default class AdminManager extends Singleton {
    constructor() {
        super();
    }

    async init(uid, email) {
        await import(/* webpackIgnore: true */ '/__/firebase/7.14.2/firebase-functions.js');
        this.functions = firebase.app().functions('asia-northeast1');
        this.functions.useFunctionsEmulator('http://localhost:5001');
        this.db = firebase.firestore();
        this.adminid = uid;
        this.email = email;
    }

    changeBranchName(name) {
        this.db.doc(`branches/${this.adminid}`).update({ name });
    }

    changeDepartmentName(departmentid, name) {
        this.db.doc(`branches/${this.adminid}/repository/${departmentid}`).update({ 'data.name': name });
    }

    createDepartment(name) {
        this.db.collection(`branches/${this.adminid}/repository`).add({ type: 'department', data: { name } });
    }

    deleteDepartment(departmentid) {
        let deleteDepartmentFunc = this.functions.httpsCallable('deleteDepartment');
        deleteDepartmentFunc({ departmentid });
    }

    createUser(user) {
        //emailPrefix, password, name, rank, departmentid
        let createUserFunc = this.functions.httpsCallable('createUser');
        createUserFunc({ ...user });
    }

    updateUser(user) {
        //emailPrefix, name, rank, departmentid
        let updateUserFunc = this.functions.httpsCallable('updateUser');
        updateUserFunc({ ...user });
    }

    updatePassword(uid, password) {
        let updatePasswordFunc = this.functions.httpsCallable('updatePassword');
        updatePasswordFunc({ uid, password });
    }

    deleteUser(departmentid, uid) {
        let deleteUserFunc = this.functions.httpsCallable('deleteUser');
        deleteUserFunc({ departmentid, uid });
    }
}
AdminManager.instance = null;