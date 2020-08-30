import Rank from '../model/rank';
import Branch from '../model/branch';
import {
  SignInCredentials,
  SignInError,
  AuthAction
} from '../data/states/auth_state';
import Department from '../model/department';
import User from '../model/user';
import Admin from '../model/admin';

export const MockAuth = {
  UserCredentials: {
    email: 'john@lol.com',
    password: 'pass123'
  } as SignInCredentials,
  AdminCredentials: {
    email: 'admin@lol.com',
    password: 'pass123'
  } as SignInCredentials,
  ErrorCredentials: {
    email: 'error@lol.com',
    password: 'pass123'
  } as SignInCredentials,
  SignInError: (action: AuthAction): SignInError => ({
    action,
    type: 'Wrong password',
    message: "Please check that you've entered the correct password!"
  })
};

const ModelRank = new Rank('SSG');
const ModelBranch: Branch = {
  id: '123',
  name: 'Pasir Laba',
  domain: MockAuth.UserCredentials.email.split('@')[1]
};
const ModelDepartment: Department = { id: '456', name: 'Manpower Branch' };

export const MockModel = {
  Rank: ModelRank,
  Branch: ModelBranch,
  Department: ModelDepartment,
  User: {
    uid: '101',
    name: 'John',
    email: 'john@lol.com',
    regular: true,
    rank: ModelRank,
    branch: ModelBranch,
    department: ModelDepartment
  } as User,
  Admin: new Admin('321', 'admin@lol.com')
};
