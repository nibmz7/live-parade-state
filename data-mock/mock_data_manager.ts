import {
  DataManager,
  DepartmentChange,
  ACTION_TYPE
} from '../data/data_manager';
import { DepartmentStoreState } from '../data/states/department_state';
import Department from '../model/department';

export default class MockDataManager extends DataManager {
  private departmentChange?: DepartmentChange;
  constructor() {
    super();
  }

  protected requestAddDepartment(state: DepartmentStoreState): void {
    this.departmentChange!(
      state.action.payload as Department,
      ACTION_TYPE.ADDED
    );
  }
  protected requestModifyDepartment(state: DepartmentStoreState): void {
    this.departmentChange!(
      state.action.payload as Department,
      ACTION_TYPE.MODIFIED
    );
  }
  protected requestRemoveDepartment(state: DepartmentStoreState): void {
    this.departmentChange!(
      state.action.payload as Department,
      ACTION_TYPE.REMOVED
    );
  }
  protected async connectToDB(departmentChange: DepartmentChange): Promise<void> {
    this.departmentChange = departmentChange;
  }
}
