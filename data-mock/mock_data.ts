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
import {
  UserAction,
  UserActionError,
  UsersByDepartment
} from '../data/states/user_state';

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
  }),
  UserRequest: (action: UserAction): UserActionError => ({
    action,
    type: 'Error adding user',
    message: "User's rank is invalid"
  })
};

const ModelRank = new Rank('SSG');

const ModelBranch: Branch = {
  id: '123',
  name: 'Pasir Laba',
  domain: MockAuth.UserCredentials.email.split('@')[1]
};

const ModelDepartment1: Department = { id: '123', name: 'Manpower Branch' };
const ModelDepartment2: Department = { id: '456', name: 'Logistics Branch' };
const ModelDepartment3: Department = { id: '789', name: 'Accounting Branch' };

const ModelDepartmentArray: Array<Department> = [
  ModelDepartment1,
  ModelDepartment2,
  ModelDepartment3
];

const ModelUser1 = new User({
  uid: '101',
  name: 'John',
  email: 'john1@lol.com',
  regular: true,
  rank: new Rank('CPL'),
  branch: ModelBranch,
  department: ModelDepartment1
});
const ModelUser2 = new User({
  uid: '201',
  name: 'John',
  email: 'john2@lol.com',
  regular: true,
  rank: new Rank('MAJ'),
  branch: ModelBranch,
  department: ModelDepartment2
});
const ModelUser3 = new User({
  uid: '301',
  name: 'John',
  email: 'john3@lol.com',
  regular: true,
  rank: new Rank('PTE'),
  branch: ModelBranch,
  department: ModelDepartment3
});

const ModelUsers: UsersByDepartment = {
  [ModelDepartment1.id]: [ModelUser1],
  [ModelDepartment2.id]: [ModelUser2],
  [ModelDepartment3.id]: [ModelUser3]
};

const ModelUserArray: Array<User> = [ModelUser1, ModelUser2, ModelUser3];

export const MockModel = {
  Rank: ModelRank,
  Branch: ModelBranch,
  Department: ModelDepartment1,
  DepartmentArray: ModelDepartmentArray,
  User: ModelUser1,
  UsersByDepartment: ModelUsers,
  UserArray: ModelUserArray,
  Admin: new Admin('321', 'admin@lol.com')
};
