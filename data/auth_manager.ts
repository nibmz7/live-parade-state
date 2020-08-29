import User from '../model/user';
import Admin from '../model/admin';
import { ApplicationStore, ACTION_ROOT } from '../data/store';
import {
  SignInCredentials,
  AuthState,
  SignInError,
  Auth
} from '../data/states/auth_state';
import { updateAuthState } from './actions/auth_action';

export default abstract class AuthManager {
  constructor() {
    const callback = (auth: Auth) => {
      if (auth.state === AuthState.REQUEST_SIGN_IN)
        this.signInWithCredentials(auth.payload as SignInCredentials);
      else if (auth.state === AuthState.REQUEST_SIGN_OUT) this.signOut();
    };

    ApplicationStore.listen({ actionType: ACTION_ROOT.AUTH, callback });
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
