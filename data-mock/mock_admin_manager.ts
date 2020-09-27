import { ACTION_TYPE, DataResults } from '../data/data_manager';
import { DepartmentStoreState } from '../data/states/department_state';
import Department, { DepartmentName } from '../model/department';
import { MockModel } from './mock_data';
import { UserStoreState } from '../data/states/user_state';
import User, { UserBase } from '../model/user';
import AdminManager from '../data/admin_manager';
import { ApplicationStore, generateActionId } from '../data/store';
import ACTION_USER from '../data/actions/user_action';

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
    let name = state.action.payload as DepartmentName;
    let department: Department = {
      id: `dep-${generateActionId()}`,
      name
    };
    this.departmentOnChange(department, ACTION_TYPE.ADDED);
  }

  protected requestModifyDepartment(state: DepartmentStoreState): void {
    this.departmentOnChange(
      state.action.payload as Department,
      ACTION_TYPE.MODIFIED
    );
  }

  protected requestRemoveDepartment(state: DepartmentStoreState): void {
    this.departmentOnChange(
      state.action.payload as Department,
      ACTION_TYPE.REMOVED
    );
  }

  protected requestAddUser(state: UserStoreState): void {
    let userBase = state.action.payload as UserBase;
    let user = new User({ uid: `user-${generateActionId()}`, ...userBase });
    setTimeout(() => {
      this.userOnChange(user, ACTION_TYPE.ADDED);
      let action = ACTION_USER.requestSuccessful(state.action);
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
