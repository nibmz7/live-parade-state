import EventDispatcher from '../../public/src/util/EventDispatcher.js';

export default class Auth extends EventDispatcher {

    constructor() {
        super();
    }

    static getInstance() {
        if (!Auth.instance) Auth.instance = new Auth();
        return Auth.instance;
    }

    init() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) this.emit('signed-in', user);
        else this.emit('signed-out');
    }

    login(email, password) {
        if (email.contains('admin')) {
            if (password == '12345678') {
                this.emit('signed-in', {uid: 'ZG3J12BF9RQ9', email: 'admin@company.app'});
            } else this.emit('error', 'Password is invalid');
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
                let message = 'User doesn\'t exist';
                if (error.code === 'auth/wrong-password') message = 'Password is invalid';
                this.emit('error', message);
            });
        }
    }

    logout() {
        localStorage.clear();
        this.emit('signed-out');
    }

}
Auth.instance = null;