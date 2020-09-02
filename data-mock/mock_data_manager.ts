import {
  DataManager,
  ACTION_TYPE,
  DataResults
} from '../data/data_manager';
import { DepartmentStoreState } from '../data/states/department_state';
import Department from '../model/department';
import { MockModel } from './mock_data';

export default class MockDataManager extends DataManager {
  constructor() {
    super();
  }

  protected requestAddDepartment(state: DepartmentStoreState): void {
    this.departmentOnChange(
      state.action.payload as Department,
      ACTION_TYPE.ADDED
    );
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
  protected async connectToDB(): Promise<DataResults> {
    return { departments: MockModel.DepartmentArray };
  }
}
