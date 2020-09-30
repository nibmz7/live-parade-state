import StatusManager from '../data/status_manager';
import { UserStoreState } from '../data/states/user_state';
import { MockModel } from './mock_data';
import { ACTION_TYPE, DataResults } from '../data/data_manager';
import User from '../model/user';
import ACTION_USER from '../data/actions/user_action';
import { ApplicationStore } from '../data/store';
import Department from '../model/department';
import Status from '../model/status';

export default class MockStatusManager extends StatusManager {
  protected requestModifyUser(state: UserStoreState): void {
    setTimeout(() => {
      const userToUpdate = new User(state.action.payload as User);
      const userData = ApplicationStore.getUsers().users[userToUpdate.uid];
      const morning = new Status(userToUpdate.morning || userData.morning!);
      const afternoon = new Status(
        userToUpdate.afternoon || userData.afternoon!
      );
      const newUser = new User({ ...userData, morning, afternoon });
      const action = ACTION_USER.requestSuccessful(state.action);
      this.userOnChange(newUser, ACTION_TYPE.MODIFIED);
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
