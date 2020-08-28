import Rank from '../model/rank';
import Branch from '../model/branch';
import { SignInCredentials } from '../data/states/auth_state';
import Department from '../model/department';
import User from '../model/user';
import Admin from '../model/admin';

export const credentials: SignInCredentials = {
  email: 'john@lol.com',
  password: 'pass123'
};

export const rank = new Rank('SGT');

export const branch: Branch = {
  id: '123',
  name: 'Pasir Laba',
  domain: credentials.email.split('@')[1]
};

export const department: Department = {
  id: '456',
  name: 'Manpower Branch'
};

export const user: User = {
  uid: '101',
  name: 'John',
  email: 'john@lol.com',
  regular: true,
  rank,
  branch,
  department
};

export const admin = new Admin('321', 'admin@lol.com');
