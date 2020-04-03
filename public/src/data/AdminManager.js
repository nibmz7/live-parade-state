export default class AdminManager {
    constructor() {
        this.functions = firebase.app().functions('asia-northeast1');
        this.functions.useFunctionsEmulator('http://localhost:5001');
        this.user = firebase.auth().currentUser;
        this.db = firebase.firestore();
    }

    createDepartment(name) {
        let uid = this.user.uid;
        this.db.collection(`branches/${uid}/departments`).add({
            name
        })
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        });
    }

    createUser(emailPrefix, password, name, rank, departmentid) {
        let createUser = this.functions.httpsCallable('createUser');
        createUser({ emailPrefix, password, name, rank, departmentid }).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    }
}