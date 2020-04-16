export default class AdminManager {
    constructor() {
        this.functions = firebase.app().functions('asia-northeast1');
        // this.functions.useFunctionsEmulator('http://localhost:5001');
        this.db = firebase.firestore();
    }
    
    setAdminInfo(uid, email) {
      this.adminid = uid;
      this.email = email;
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