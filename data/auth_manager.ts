import User from '../model/user';
import Admin from '../model/admin';
import { store, dispatch } from '../data/store';
import { SignInCredentials, AuthState, Auth } from '../data/states/auth_state';
import { updateAuthState } from './actions/auth_action';

export default abstract class AuthManager {
  constructor() {
    store.subscribe(() => {
      console.log(store.getState());
    });
  }

  abstract async signInAsUser(credentials: SignInCredentials): Promise<User>;
  abstract async signInAsAdmin(credentials: SignInCredentials): Promise<Admin>;

  async signIn(credentials: SignInCredentials) {
    let isAdmin = credentials.email.split('@')[0] === 'admin';
    let currentUser = isAdmin
      ? await this.signInAsAdmin(credentials)
      : await this.signInAsUser(credentials);
    let auth: Auth = {
      state: AuthState.SIGNED_IN,
      isAdmin,
      currentUser,
      isProcessing: false
    };
    dispatch(updateAuthState(AuthState.SIGNED_IN, auth));
  }
}
