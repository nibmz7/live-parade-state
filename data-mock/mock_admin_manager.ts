import { ACTION_TYPE, DataResults } from '../data/data_manager';
import { DepartmentStoreState } from '../data/states/department_state';
import Department from '../model/department';
import { MockModel } from './mock_data';
import { UserActionError, UserStoreState } from '../data/states/user_state';
import User, { UserBase } from '../model/user';
import AdminManager from '../data/admin_manager';
import { Action, ApplicationStore, generateActionId } from '../data/store';
import ACTION_USER from '../data/actions/user_action';
import ACTION_DEPARTMENT from '../data/actions/department_action';

export default class MockAdminManager extends AdminManager {
  constructor() {
    super();
  }

  protected async connectDB(): Promise<DataResults> {
    return {
      departments: MockModel.DepartmentArray,
      users: MockModel.UserArray
    };
  }

  protected requestAddDepartment(state: DepartmentStoreState): void {
    let department = state.action.payload as Department;
    let newDepartment: Department = {
      id: `dep-${generateActionId()}`,
      name: department.name
    };
    this.departmentOnChange(newDepartment, ACTION_TYPE.ADDED);
    let action = ACTION_DEPARTMENT.requestSuccessful(state.action);
    ApplicationStore.dispatch(action);
    console.log(action);
  }

  protected requestModifyDepartment(state: DepartmentStoreState): void {
    this.departmentOnChange(
      state.action.payload as Department,
      ACTION_TYPE.MODIFIED
    );
    let action = ACTION_DEPARTMENT.requestSuccessful(state.action);
    ApplicationStore.dispatch(action);
  }

  protected requestRemoveDepartment(state: DepartmentStoreState): void {
    const department = state.action.payload as Department;
    this.departmentOnChange(department, ACTION_TYPE.REMOVED);
    const users = ApplicationStore.getUsers().sortedUsers.filter(
      (user) => user.departmentid !== department.id
    );
    let action = ACTION_USER.initialized(users);
    ApplicationStore.dispatch(action);
    let action2 = ACTION_DEPARTMENT.requestSuccessful(state.action);
    ApplicationStore.dispatch(action2);
  }

  protected requestAddUser(state: UserStoreState): void {
    const userBase = state.action.payload as UserBase;
    const user = new User({ uid: `user-${generateActionId()}`, ...userBase });
    setTimeout(() => {
      let action: Action;
      const userExists = ApplicationStore.getUsers().sortedUsers.find(
        (item) => item.email === user.email
      );
      if (userExists) {
        const actionError: UserActionError = {
          action: state.action,
          type: 'email unavailable',
          message: `The email ${user.email} has already been used`
        };
        action = ACTION_USER.requestError(actionError);
      } else {
        this.userOnChange(user, ACTION_TYPE.ADDED);
        action = ACTION_USER.requestSuccessful(state.action);
      }
      ApplicationStore.dispatch(action);
    }, 2000);
  }

  protected requestModifyUser(state: UserStoreState): void {
    setTimeout(() => {
      let user = state.action.payload as User;
      this.userOnChange(new User(user), ACTION_TYPE.MODIFIED);
      let action = ACTION_USER.requestSuccessful(state.action);
      ApplicationStore.dispatch(action);
    }, 2000);
  }

  protected requestRemoveUser(state: UserStoreState): void {
    setTimeout(() => {
      let user = state.action.payload as User;
      this.userOnChange(new User(user), ACTION_TYPE.REMOVED);
      let action = ACTION_USER.requestSuccessful(state.action);
      ApplicationStore.dispatch(action);
    }, 2000);
  }
}
