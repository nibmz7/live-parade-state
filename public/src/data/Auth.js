import EventDispatcher from '../util/EventDispatcher.js';

export default class Auth extends EventDispatcher {

    constructor() {
        super();
    }

    static getInstance() {
        if (!Auth.instance) Auth.instance = new Auth();
        return Auth.instance;
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