import User from '../model/user';
import Admin from '../model/admin';
import { ApplicationStore } from '../data/store';
import {
  SignInCredentials,
  AuthState,
  SignInError,
  Auth
} from '../data/states/auth_state';
import { updateAuthState } from './actions/auth_action';

export default abstract class AuthManager {
  constructor() {
    const getState = (data) => data.auth as Auth;

    const callback = (auth: Auth) => {
      if (auth.state === AuthState.REQUEST_SIGN_IN)
        this.signInWithCredentials(auth.payload as SignInCredentials);
      else if (auth.state === AuthState.REQUEST_SIGN_OUT) this.signOut();
    };

    ApplicationStore.listen({ getState, callback, diffing: true });
  }

  protected abstract async signInWithCredentials(
    credentials: SignInCredentials
  );

  protected signOut() {
    ApplicationStore.dispatch(updateAuthState(AuthState.SIGNED_OUT, undefined));
  }

  protected signIn(user: User | Admin) {
    ApplicationStore.dispatch(updateAuthState(AuthState.SIGNED_IN, user));
  }

  protected isAdmin(email): boolean {
    return email.split('@')[0] === 'admin';
  }

  protected signInError(error: SignInError) {
    ApplicationStore.dispatch(
      updateAuthState(AuthState.REQUEST_SIGN_IN_FAILED, error)
    );
  }
}
