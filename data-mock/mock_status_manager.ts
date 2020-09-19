import StatusManager from '../data/status_manager';
import { UserStoreState } from '../data/states/user_state';
import { MockModel } from './mock_data';
import { ACTION_TYPE, DataResults } from '../data/data_manager';
import User from '../model/user';

export default class MockStatusManager extends StatusManager {
  constructor() {
    super();
  }

  protected requestModifyUser(state: UserStoreState): void {
    this.userOnChange(state.action.payload as User, ACTION_TYPE.MODIFIED);
  }

  protected async connectDB(): Promise<DataResults> {
    return {
      departments: MockModel.DepartmentArray,
      users: MockModel.UsersByDepartment
    };
  }
}
