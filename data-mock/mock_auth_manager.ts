import AuthManager from '../data/auth_manager';
import { SignInCredentials, AuthAction } from '../data/states/auth_state';
import AuthUser from '../model/auth_user';
import { MockModel, MockError } from './mock_data';

declare global {
  interface Window {
    authStatus: AUTH_STATUS;
  }
}

enum AUTH_STATUS {
  ADMIN_SIGNED_IN,
  USER_SIGNED_IN
}

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async initialize() {
    if (window.authStatus === AUTH_STATUS.ADMIN_SIGNED_IN) {
      const authUser = new AuthUser({ ...MockModel.Admin });
      this.signIn(authUser);
      return;
    }
    if (window.authStatus === AUTH_STATUS.USER_SIGNED_IN) {
      const authUser = new AuthUser({ ...MockModel.User });
      this.signIn(authUser);
      return;
    }
    this.signOut();
  }

  protected async signInWithCredentials(action: AuthAction) {
    let credentials = action.payload as SignInCredentials;
    if (credentials.email.includes('error')) {
      this.signInError(MockError.SignIn(action));
      return;
    }
    let authUser: AuthUser;
    if (this.isAdmin(credentials.email))
      authUser = new AuthUser({ ...MockModel.Admin });
    else authUser = new AuthUser({ ...MockModel.User });
    this.signIn(authUser);
  }
}
