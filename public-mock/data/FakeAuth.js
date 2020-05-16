import { SingletonEventDispatcher } from '../../src/util/EventDispatcher.js';
import FakeDb from './FakeDb.js';

export default class FakeAuth extends SingletonEventDispatcher {

    constructor() {
        super();
        this.isSignedIn = false;
    }

    init() {
        var userObject = localStorage.getItem('user');
        if (userObject) this.isSignedIn = true;
        this.isSignedIn ? this.emit('signed-in', JSON.parse(userObject)) : this.emit('signed-out');
    }

    async getUserToken() {
        return await firebase.auth().currentUser.getIdTokenResult();
    }

    login(email, password) {
        let isAdmin = email.split('@')[0] === 'admin';
        let userInfo;
        if (isAdmin) userInfo = { isAdmin, email: 'admin@test.com', uid: 1 };
        else {
            userInfo = FakeDb.users[5];
        }
        localStorage.setItem('user', JSON.stringify(userInfo));
        if (!this.isSignedIn) {
            this.isSignedIn = true;
            this.emit('signed-in', userInfo);
        }
    }

    logout() {
        this.isSignedIn = false;
        localStorage.clear();
        this.emit('signed-out');
    }

}
FakeAuth.instance = null;