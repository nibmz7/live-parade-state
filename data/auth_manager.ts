import User from '../model/user';
import Admin from '../model/admin';
import { ApplicationStore, ACTION_ROOT } from '../data/store';
import {
  AuthState,
  SignInError,
  AuthStoreState,
  AuthAction
} from '../data/states/auth_state';
import ACTION_AUTH from './actions/auth_action';

export default abstract class AuthManager {
  constructor() {
    const callback = (auth: AuthStoreState) => {
      if (auth.action.type === AuthState.REQUEST_SIGN_IN)
        this.signInWithCredentials(auth.action);
      else if (auth.action.type === AuthState.REQUEST_SIGN_OUT) this.signOut();
    };

    ApplicationStore.listen({ actionType: ACTION_ROOT.AUTH, callback });
  }

  protected abstract async signInWithCredentials(auth: AuthAction);

  protected signOut() {
    let action = ACTION_AUTH.userSignedOut();
    ApplicationStore.dispatch(action);
  }

  protected signIn(user: User | Admin) {
    let action = ACTION_AUTH.userSignedIn(user);
    ApplicationStore.dispatch(action);
  }

  protected isAdmin(email): boolean {
    return email.split('@')[0] === 'admin';
  }

  protected signInError(error: SignInError) {
    let action = ACTION_AUTH.signInFailed(error);
    ApplicationStore.dispatch(action);
  }
}
