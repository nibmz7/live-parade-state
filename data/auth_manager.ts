import User from 'model/user';
import Admin from 'model/admin';
import store from './store';

export interface SignInCredentials {
    email: string; 
    password: string;
}

abstract class Auth {


    constructor() {
        store.subscribe(() => {
            console.log(store.getState().lastAction);
          });
          
    }

    abstract async signInAsUser(credentials: SignInCredentials): Promise<User>;
    abstract async signInAsAdmin(credentials: SignInCredentials): Promise<Admin>;

    async signIn(credentials: SignInCredentials) {
        let isAdmin = credentials.email.split('@')[0] === 'admin';
        let user = isAdmin ? await this.signInAsAdmin(credentials) : await this.signInAsUser(credentials);
    }

}