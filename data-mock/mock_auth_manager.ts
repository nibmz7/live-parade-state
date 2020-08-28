import AuthManager from '../data/auth_manager';
import { SignInCredentials } from '../data/states/auth_state';
import { user as MockUser, admin as MockAdmin } from './mock_data';

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async signInWithCredentials(credentials: SignInCredentials) {
    if (credentials.email.includes('error')) {
      this.signInError({
        type: 'Wrong password',
        message: "Please check that you've entered the correct password!"
      });
      return;
    }
    if (this.isAdmin(credentials.email)) {
      this.signIn(MockAdmin);
    } else {
      this.signIn(MockUser);
    }
  }
}
