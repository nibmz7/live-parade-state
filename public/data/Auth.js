import EventDispatcher from '../../src/util/EventDispatcher.js';

export default class Auth extends EventDispatcher {

    constructor() {
        super();
    }

    init() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.emit('signed-in', user);
            } else {
                this.emit('signed-out');
            }
        });
    }

    async getUserToken() {
        return await firebase.auth().currentUser.getIdTokenResult();
    }

    login(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            let message = 'User doesn\'t exist';
            if (error.code === 'auth/wrong-password') message = 'Password is invalid';
            this.emit('error', message);
        });
    }
    
    logout() {
      firebase.auth().signOut();
    }

}
Auth.instance = null;