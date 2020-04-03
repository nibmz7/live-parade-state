import EventDispatcher from '../util/EventDispatcher.js';

let instance;
export default class Auth extends EventDispatcher {

    constructor() {
        super();
    }

    static getInstance() {
        if (!instance) instance = new Auth();
        return instance;
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
            console.log(error);
            this.emit('error', error);
        });
    }

}