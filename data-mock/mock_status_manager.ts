import StatusManager from '../data/status_manager';
import { UserStoreState } from '../data/states/user_state';
import { MockModel } from './mock_data';
import { ACTION_TYPE, DataResults } from '../data/data_manager';
import User from '../model/user';
import ACTION_USER from '../data/actions/user_action';
import { ApplicationStore } from '../data/store';
import Department from '../model/department';

export default class MockStatusManager extends StatusManager {
  protected requestModifyUser(state: UserStoreState): void {
    setTimeout(() => {
      const user = new User(state.action.payload as User);
      const action = ACTION_USER.requestSuccessful(state.action);
      this.userOnChange(user, ACTION_TYPE.MODIFIED);
      ApplicationStore.dispatch(action);
    }, 2000);
  }

  protected async connectDB(): Promise<DataResults> {
    let userDepartment!: Department;
    const departments = MockModel.DepartmentArray.filter((item) => {
      let isUserDepartment = item.id === this.authUser.departmentid;
      if (isUserDepartment) userDepartment = item;
      return !isUserDepartment;
    });
    departments.unshift(userDepartment);
    return {
      departments,
      users: MockModel.UserArray
    };
  }
}
