import User from '../model/user';
import Admin from '../model/admin';
import { store, dispatch } from '../data/store';
import {
  SignInCredentials,
  AuthState,
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

  protected abstract async signInWithCredentials(
    credentials: SignInCredentials
  );

  protected signOut() {
    dispatch(updateAuthState(AuthState.SIGNED_OUT, undefined));
  }

  protected signIn(user: User | Admin) {
    dispatch(updateAuthState(AuthState.SIGNED_IN, user));
  }

  protected isAdmin(email): boolean {
    return email.split('@')[0] === 'admin';
  }

  protected signInError(error: SignInError) {
    dispatch(updateAuthState(AuthState.REQUEST_SIGN_IN_FAILED, error));
  }
}
