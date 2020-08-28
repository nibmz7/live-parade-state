import AuthManager from '../data/auth_manager';
import { SignInCredentials } from '../data/states/auth_state';
import User from '../model/user';
import Admin from '../model/admin';
import { user as MockUser, admin as MockAdmin } from './mock_data';

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async signInAsUser(credentials: SignInCredentials): Promise<User> {
    return Promise.resolve(MockUser);
  }

  protected async signInAsAdmin(
    credentials: SignInCredentials
  ): Promise<Admin> {
    return Promise.resolve(MockAdmin);
  }
}
