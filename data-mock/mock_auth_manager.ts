import AuthManager from '../data/auth_manager';
import { SignInCredentials, AuthAction } from '../data/states/auth_state';
import { MockModel, MockError } from './mock_data';

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async initialize() {
    // this.signIn(MockModel.Admin);
    this.signOut();
  }

  protected async signInWithCredentials(action: AuthAction) {
    let credentials = action.payload as SignInCredentials;
    if (credentials.email.includes('error')) {
      this.signInError(MockError.SignIn(action));
      return;
    }
    this.isAdmin(credentials.email)
      ? this.signIn(MockModel.Admin)
      : this.signIn(MockModel.User);
  }
}
