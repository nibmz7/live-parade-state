import User from '../model/user';
import Admin from '../model/admin';
import { store, dispatch } from '../data/store';
import {
  SignInCredentials,
  AuthState,
  Auth,
  SignInError
} from '../data/states/auth_state';
import { updateAuthState } from './actions/auth_action';

export default abstract class AuthManager {
  private currentState = AuthState.INITIALIZED;

  constructor() {
    store.subscribe(() => {
      let auth = store.getState().auth;
      if (auth.state === this.currentState) return;
      else if (auth.state === AuthState.REQUEST_SIGN_IN)
        this.signInWithCredentials(auth.payload as SignInCredentials);
      else if (auth.state === AuthState.REQUEST_SIGN_OUT) this.signOut();
      this.currentState = auth.state;
    });
  }

  protected abstract async signInAsUser(
    credentials: SignInCredentials
  ): Promise<User>;
  protected abstract async signInAsAdmin(
    credentials: SignInCredentials
  ): Promise<Admin>;

  protected signOut() {
    let auth: Auth = {
      state: AuthState.SIGNED_OUT
    };
    dispatch(updateAuthState(AuthState.SIGNED_OUT, auth));
  }

  private signIn(auth: Auth) {
    dispatch(updateAuthState(AuthState.SIGNED_IN, auth));
  }

  private async signInWithCredentials(credentials: SignInCredentials) {
    try {
      let isAdmin = credentials.email.split('@')[0] === 'admin';
      let currentUser = isAdmin
        ? await this.signInAsAdmin(credentials)
        : await this.signInAsUser(credentials);
      let auth: Auth = {
        state: AuthState.SIGNED_IN,
        isAdmin,
        currentUser
      };
      this.signIn(auth);
    } catch (error) {
      let signInError: SignInError = {
        type: error.type,
        message: error.message
      };
      dispatch(updateAuthState(AuthState.REQUEST_SIGN_IN_FAILED, signInError));
    }
  }
}
