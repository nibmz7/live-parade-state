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
    ApplicationStore.listen(ACTION_ROOT.AUTH, (state) =>
      this.authStateChanged(state)
    );
    this.signOut();
  }

  authStateChanged(state: AuthStoreState) {
    if (state.action.type === AuthState.REQUEST_SIGN_IN)
      this.signInWithCredentials(state.action);
    else if (state.action.type === AuthState.REQUEST_SIGN_OUT) this.signOut();
  }

  protected abstract async signInWithCredentials(auth: AuthAction);

  protected signOut() {
    ApplicationStore.reset();
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
