import { ApplicationStore, ACTION_ROOT } from '../data/store';
import {
  AUTH_STATE,
  SignInError,
  AuthStoreState,
  AuthAction
} from '../data/states/auth_state';
import ACTION_AUTH from './actions/auth_action';
import AuthUser from '../model/auth_user';

export default abstract class AuthManager {
  constructor() {
    ApplicationStore.listen(ACTION_ROOT.AUTH, (state) =>
      this.authStateChanged(state)
    );
    this.initialize();
  }

  protected abstract async signInWithCredentials(auth: AuthAction);
  protected abstract async initialize();

  authStateChanged(state: AuthStoreState) {
    if (state.action.type === AUTH_STATE.REQUEST_SIGN_IN)
      this.signInWithCredentials(state.action);
    else if (state.action.type === AUTH_STATE.REQUEST_SIGN_OUT) this.signOut();
  }

  protected signOut() {
    ApplicationStore.reset();
    let action = ACTION_AUTH.userSignedOut();
    ApplicationStore.dispatch(action);
  }

  protected signIn(user: AuthUser) {
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
