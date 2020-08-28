import AuthManager from '../data/auth_manager';
import { SignInCredentials } from '../data/states/auth_state';
import User from '../model/user';
import Admin from '../model/admin';
import Rank from '../model/rank';
import Department from '../model/department';
import Branch from '../model/branch';

export default class MockAuthManager extends AuthManager {
  constructor() {
    super();
  }

  protected async signInAsUser(credentials: SignInCredentials): Promise<User> {
    let rank = new Rank('SGT');
    let branch: Branch = {
      id: '123',
      name: 'Pasir Laba'
    };
    let department: Department = {
      id: '456',
      name: 'Manpower Branch'
    };
    let user: User = {
      uid: '101',
      name: 'John',
      email: 'john@lol.com',
      regular: true,
      rank: new Rank('SGT')
    };
  }

  protected async signInAsAdmin(
    credentials: SignInCredentials
  ): Promise<Admin> {
    throw new Error('Method not implemented.');
  }

  protected async signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
