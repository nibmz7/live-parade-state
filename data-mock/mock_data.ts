import Rank from '../model/rank';
import Branch from '../model/branch';
import {
  SignInCredentials,
  SignInError,
  AuthAction
} from '../data/states/auth_state';
import Department from '../model/department';
import User from '../model/user';
import {
  DepartmentAction,
  DepartmentActionError
} from '../data/states/department_state';
import { UserAction, UserActionError } from '../data/states/user_state';
import Status from '../model/status';

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

const ModelDepartment1: Department = { id: 'dep-123', name: 'Manpower Branch' };
const ModelDepartment2: Department = {
  id: 'dep-456',
  name: 'Logistics Branch'
};
const ModelDepartment3: Department = {
  id: 'dep-789',
  name: 'Accounting Branch'
};
const ModelDepartment4: Department = { id: 'dep-321', name: 'Signal Wing' };

const ModelDepartmentArray: Array<Department> = [
  ModelDepartment4,
  ModelDepartment1,
  ModelDepartment2,
  ModelDepartment3
];

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const userIds = ['user-101', 'user-201', 'user-202', 'user-301', 'admin'];

const makeStatus = () =>
  new Status({
    code: randomInt(5),
    remarks: '',
    expired: randomInt(7) >= 3,
    updatedby: userIds[randomInt(4)],
    date: new Date()
  });

export const makeUser = (
  name: string,
  uid: string,
  depId: string,
  rank: string,
  regular: boolean
) =>
  new User({
    uid: `user-${uid}`,
    name,
    email: `${name}@lol.com`,
    regular,
    rank: new Rank(rank),
    branchid: ModelBranch.id,
    departmentid: depId,
    morning: makeStatus(),
    afternoon: makeStatus()
  });

const ModelUser1 = new User({
  uid: 'user-101',
  name: 'Marquez',
  email: 'john1@lol.com',
  regular: false,
  rank: new Rank('CPL'),
  branchid: ModelBranch.id,
  departmentid: ModelDepartment1.id,
  morning: makeStatus(),
  afternoon: makeStatus()
});
const ModelUser2 = new User({
  uid: 'user-201',
  name: 'Rebecca',
  email: 'john2@lol.com',
  regular: true,
  rank: new Rank('MAJ'),
  branchid: ModelBranch.id,
  departmentid: ModelDepartment2.id,
  morning: makeStatus(),
  afternoon: makeStatus()
});
const ModelUser22 = new User({
  uid: 'user-202',
  name: 'Jim',
  email: 'jim@lol.com',
  regular: false,
  rank: new Rank('PTE'),
  branchid: ModelBranch.id,
  departmentid: ModelDepartment2.id,
  morning: makeStatus(),
  afternoon: makeStatus()
});
const ModelUser3 = new User({
  uid: 'user-301',
  name: 'John',
  email: 'john3@lol.com',
  regular: false,
  rank: new Rank('PTE'),
  branchid: ModelBranch.id,
  departmentid: ModelDepartment3.id,
  morning: makeStatus(),
  afternoon: makeStatus()
});

const ModelUserArray: Array<User> = [
  makeUser('Lucas', '781929', 'dep-321', 'MAJ', true),
  ModelUser1,
  ModelUser2,
  ModelUser22,
  ModelUser3,
  makeUser('Lily', '1234', 'dep-123', 'LTC', true),
  makeUser('Joe', '12344', 'dep-123', 'LCP', false),
  makeUser('Bob', '123444', 'dep-456', '1WO', true),
  makeUser('Joyce', '4568', 'dep-456', '1SG', true),
  makeUser('Bill', '4566', 'dep-456', 'LCP', false),
  makeUser('Sam', '45666', 'dep-456', 'CPL', false),
  makeUser('Ruby', '78910', 'dep-789', 'MSG', true),
  makeUser('Paula', '78999', 'dep-789', 'REC', false),
  makeUser('Rob', '7899919', 'dep-789', 'PTE', false)
];

export const MockModel = {
  Rank: ModelRank,
  Branch: ModelBranch,
  Department: ModelDepartment1,
  DepartmentArray: ModelDepartmentArray,
  User: ModelUser22,
  UserArray: ModelUserArray,
  Users: {
    [ModelDepartment1.id]: [ModelUser1],
    [ModelDepartment2.id]: [ModelUser2, ModelUser22],
    [ModelDepartment3.id]: [ModelUser3]
  },
  Admin: { uid: '321', branchid: '321', email: 'admin@lol.com' }
};
