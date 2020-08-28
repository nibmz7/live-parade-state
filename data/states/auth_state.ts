import Admin from 'model/admin';
import User from 'model/user';
import { SignInCredentials } from 'data/auth_manager';

export enum AuthState {
    INITIALIZED,
    SIGNED_IN,
    SIGNED_OUT,
    REQUEST_SIGN_IN,
    REQUEST_SIGN_OUT,
    LOADING
}

export default interface Auth {
    currentUser?: Admin | User;
    state: AuthState
    payload?: SignInCredentials
}