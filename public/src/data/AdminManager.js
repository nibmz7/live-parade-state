export default class AdminManager {
    constructor() {
        this.functions = firebase.app().functions('asia-northeast1');
        this.functions.useFunctionsEmulator('http://localhost:5001');
        this.adminid = firebase.auth().currentUser.uid;
        this.db = firebase.firestore();
    }

    changeBranchName(name) {
        this.db.doc(`branches/${this.adminid}`).update({ name });
    }

    changeDepartmentName(departmentid, name) {
        this.db.doc(`branches/${this.adminid}/departments/${departmentid}`).update({ name });
    }

    createDepartment(name) {
        this.db.collection(`branches/${this.adminid}/departments`).add({ name });
    }

    createUser(emailPrefix, password, name, rank, departmentid) {
        let createUserFunc = this.functions.httpsCallable('createUser');
        createUserFunc({ emailPrefix, password, name, rank, departmentid });
    }

    updateUser(emailPrefix, name, rank, departmentid) {
        let updateUserFunc = this.functions.httpsCallable('updateUser');
        updateUserFunc({ emailPrefix, name, rank, departmentid });
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