import Singleton from "../../src/util/Singleton.js";

export default class AdminManager extends Singleton {
    constructor() {
        super();
    }

    async init(uid, email) {
        await import(/* webpackIgnore: true */ '/__/firebase/7.14.4/firebase-functions.js');
        this.functions = firebase.app().functions('asia-northeast1');
        this.functions.useFunctionsEmulator('http://192.168.0.139:5001');
        this.db = firebase.firestore();
        this.adminid = uid;
        this.email = email;
        this.domain = email.split('@')[1];
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
        //emailPrefix, password, name, rank, departmentid, regular
        let createUserFunc = this.functions.httpsCallable('createUser');
        return createUserFunc({ ...user });
    }

    updateUser(user) {
        //emailPrefix, name, rank, departmentid, regular
        let updateUserFunc = this.functions.httpsCallable('updateUser');
        return updateUserFunc({ ...user });
    }

    updatePassword(uid, password) {
        let updatePasswordFunc = this.functions.httpsCallable('updatePassword');
        updatePasswordFunc({ uid, password });
    }

    deleteUser(departmentid, uid) {
        let deleteUserFunc = this.functions.httpsCallable('deleteUser');
        return deleteUserFunc({ departmentid, uid });
    }
}
AdminManager.instance = null;