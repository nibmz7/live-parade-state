import { DepartmentStoreState } from './states/department_state';
import { ApplicationStore, ACTION_ROOT } from './store';
import Department from '../model/department';
import ACTION_DEPARTMENT from './actions/department_action';

export enum CHANGE_TYPE {
  ADDED,
  MODIFIED,
  REMOVED
}
export type DepartmentChange = (
  department: Department,
  type: CHANGE_TYPE
) => void;

export abstract class DataManager {
  constructor() {
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, (state) =>
      this.departmentStateChanged(state)
    );
  }

  departmentStateChanged(state: DepartmentStoreState) {
    console.log(state);
  }

  protected abstract connectToDB(departmentChange: DepartmentChange): void;

  async initialize() {
    const departmentChange: DepartmentChange = (department, type) => {
      if (type === CHANGE_TYPE.ADDED)
        ApplicationStore.dispatch(ACTION_DEPARTMENT.added(department));
      else if (type === CHANGE_TYPE.MODIFIED)
        ApplicationStore.dispatch(ACTION_DEPARTMENT.modified(department));
      else if (type === CHANGE_TYPE.REMOVED)
        ApplicationStore.dispatch(ACTION_DEPARTMENT.removed(department));
    };
    this.connectToDB(departmentChange);
  }
}
