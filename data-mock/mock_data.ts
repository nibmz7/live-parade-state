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
import {
  DepartmentAction,
  DepartmentActionError
} from '../data/states/department_state';

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
  } as SignInCredentials
};

export const MockError = {
  SignIn: (action: AuthAction): SignInError => ({
    action,
    type: 'Wrong password',
    message: "Please check that you've entered the correct password!"
  }),
  DepartmentRequest: (action: DepartmentAction): DepartmentActionError => ({
    action,
    type: 'Error adding departmnet',
    message: 'Department name is too long'
  })
};

const ModelRank = new Rank('SSG');
const ModelBranch: Branch = {
  id: '123',
  name: 'Pasir Laba',
  domain: MockAuth.UserCredentials.email.split('@')[1]
};
const ModelDepartment: Department = { id: '123', name: 'Manpower Branch' };
const ModelUser: User = {
  uid: '101',
  name: 'John',
  email: 'john@lol.com',
  regular: true,
  rank: ModelRank,
  branch: ModelBranch,
  department: ModelDepartment
};
const ModelDepartmentArray: Array<Department> = [
  { id: '123', name: 'Manpower Branch' },
  { id: '456', name: 'Logistics Branch' },
  { id: '789', name: 'Accounting Branch' }
];
const ModelUserArray: Array<User> = [
  {
    uid: '101',
    name: 'John1',
    email: 'john1@lol.com',
    regular: true,
    rank: new Rank('CPL'),
    branch: ModelBranch,
    department: ModelDepartmentArray[0]
  },
  {
    uid: '104',
    name: 'John4',
    email: 'john4@lol.com',
    regular: true,
    rank: new Rank('CPL'),
    branch: ModelBranch,
    department: ModelDepartmentArray[1]
  },
  {
    uid: '107',
    name: 'John7',
    email: 'john7@lol.com',
    regular: true,
    rank: new Rank('CPL'),
    branch: ModelBranch,
    department: ModelDepartmentArray[2]
  }
];

export const MockModel = {
  Rank: ModelRank,
  Branch: ModelBranch,
  Department: ModelDepartment,
  DepartmentArray: ModelDepartmentArray,
  User: ModelUser,
  UserArray: ModelUserArray,
  Admin: new Admin('321', 'admin@lol.com')
};
