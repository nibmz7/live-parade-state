import User from 'model/user';
import Admin from 'model/admin';

export interface SignInCredentials {
    email: string; 
    password: string;
}

abstract class Auth {

    abstract async signInAsUser(credentials: SignInCredentials): Promise<User>;
    abstract async signInAsAdmin(credentials: SignInCredentials): Promise<Admin>;

    async signIn(credentials: SignInCredentials) {
        let isAdmin = credentials.email.split('@')[0] === 'admin';
        let user = isAdmin ? await this.signInAsAdmin(credentials) : await this.signInAsUser(credentials);
    }

}