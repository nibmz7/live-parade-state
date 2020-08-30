import {
  DepartmentAction,
  DepartmentStoreState
} from './states/department_state';
import { ApplicationStore, ACTION_ROOT } from './store';

export default abstract class BranchRepository {
  constructor() {
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, (state) =>
      this.departmentStateChanged(state)
    );
  }

  departmentStateChanged(state: DepartmentStoreState) {
    console.log(state);
  }

  async initialize() {}

  protected abstract async addDepartment(action: DepartmentAction);
  protected abstract async removeDepartment(action: DepartmentAction);
  protected abstract async modifyDepartment(action: DepartmentAction);
}
