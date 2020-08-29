import Rank from '../model/rank';
import Branch from '../model/branch';
import { SignInCredentials, SignInError } from '../data/states/auth_state';
import Department from '../model/department';
import User from '../model/user';
import Admin from '../model/admin';

export const MockUserCredentials: SignInCredentials = {
  email: 'john@lol.com',
  password: 'pass123'
};

export const MockAdminCredentials: SignInCredentials = {
  email: 'admin@lol.com',
  password: 'pass123'
};

export const MockErrorCredentials: SignInCredentials = {
  email: 'error@lol.com',
  password: 'pass123'
};

export const MockSignInError: SignInError = {
  type: 'Wrong password',
  message: "Please check that you've entered the correct password!"
};

export const MockRank = new Rank('SGT');

export const MockBranch: Branch = {
  id: '123',
  name: 'Pasir Laba',
  domain: MockUserCredentials.email.split('@')[1]
};

export const MockDepartment: Department = {
  id: '456',
  name: 'Manpower Branch'
};

export const MockUser: User = {
  uid: '101',
  name: 'John',
  email: 'john@lol.com',
  regular: true,
  rank: MockRank,
  branch: MockBranch,
  department: MockDepartment
};

export const MockAdmin = new Admin('321', 'admin@lol.com');
