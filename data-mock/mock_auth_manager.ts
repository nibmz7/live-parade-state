import AuthManager from '../data/auth_manager';
import { SignInCredentials, AuthAction } from '../data/states/auth_state';
import AuthUser from '../model/auth_user';
import { MockModel, MockError } from './mock_data';

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async initialize() {
    // this.signOut();
    // this.signIn(MockModel.Admin);
    const authUser = new AuthUser({ ...MockModel.User });
    this.signIn(authUser);
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
