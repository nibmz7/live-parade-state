import AuthManager from '../data/auth_manager';
import { SignInCredentials, AuthAction } from '../data/states/auth_state';
import { MockUser, MockAdmin, MockSignInError } from './mock_data';

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async signInWithCredentials(action: AuthAction) {
    let credentials = action.payload as SignInCredentials;
    if (credentials.email.includes('error')) {
      this.signInError(MockSignInError(action));
      return;
    }
    this.isAdmin(credentials.email)
      ? this.signIn(MockAdmin)
      : this.signIn(MockUser);
  }
}
