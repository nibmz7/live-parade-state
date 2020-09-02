import { DepartmentStoreState } from './states/department_state';
import { ApplicationStore, ACTION_ROOT } from './store';
import Department from '../model/department';
import ACTION_DEPARTMENT from './actions/department_action';

export enum ACTION_TYPE {
  INITIALIZED,
  ADDED,
  MODIFIED,
  REMOVED,
  REQUEST_ADD,
  REQUEST_REMOVE,
  REQUEST_MODIFY,
  REQUEST_ERROR
}
export type DepartmentChange = (
  department: Department,
  type: ACTION_TYPE
) => void;

export interface DataResults {
  departments: Array<Department>;
}

export abstract class DataManager {
  constructor() {
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, (state) =>
      this.departmentStateChanged(state)
    );
  }

  protected abstract async connectToDB(
    departmentChange: DepartmentChange
  ): Promise<DataResults>;
  protected abstract requestAddDepartment(state: DepartmentStoreState): void;
  protected abstract requestModifyDepartment(state: DepartmentStoreState): void;
  protected abstract requestRemoveDepartment(state: DepartmentStoreState): void;

  departmentStateChanged(state: DepartmentStoreState) {
    switch (state.action.type) {
      case ACTION_TYPE.REQUEST_ADD:
        this.requestAddDepartment(state);
        break;
      case ACTION_TYPE.REQUEST_MODIFY:
        this.requestModifyDepartment(state);
        break;
      case ACTION_TYPE.REQUEST_REMOVE:
        this.requestRemoveDepartment(state);
        break;
    }
  }

  async initialize() {
    const departmentChange: DepartmentChange = (department, type) => {
      switch (type) {
        case ACTION_TYPE.ADDED:
          ApplicationStore.dispatch(ACTION_DEPARTMENT.added(department));
          break;
        case ACTION_TYPE.MODIFIED:
          ApplicationStore.dispatch(ACTION_DEPARTMENT.modified(department));
          break;
        case ACTION_TYPE.REMOVED:
          ApplicationStore.dispatch(ACTION_DEPARTMENT.removed(department));
          break;
      }
    };
    let results = await this.connectToDB(departmentChange);
    ApplicationStore.dispatch(
      ACTION_DEPARTMENT.initialized(results.departments)
    );
  }
}
