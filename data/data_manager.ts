import {
  DepartmentStoreState,
  DepartmentActionError
} from './states/department_state';
import { ApplicationStore, ACTION_ROOT } from './store';
import Department from '../model/department';
import ACTION_DEPARTMENT from './actions/department_action';

export enum ACTION_TYPE {
  INITIALIZED,
  ADDED,
  MODIFIED,
  REMOVED,
  REQUEST_ADD,
  REQUEST_MODIFY,
  REQUEST_REMOVE,
  REQUEST_ERROR
}
export const TYPE_REQUEST = (type: ACTION_TYPE) =>
  type === 4 || type === 5 || type === 6;

export type DepartmentChange = (
  department: Department,
  type: ACTION_TYPE
) => void;

export interface DataResults {
  departments: Array<Department>;
}

export abstract class DataManager {
  protected isDbConnected = false;

  constructor() {
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, (state) =>
      this.departmentOnRequest(state)
    );
  }

  protected abstract async connectDB(): Promise<DataResults>;
  protected abstract requestAddDepartment(state: DepartmentStoreState): void;
  protected abstract requestModifyDepartment(state: DepartmentStoreState): void;
  protected abstract requestRemoveDepartment(state: DepartmentStoreState): void;

  departmentOnRequest(state: DepartmentStoreState) {
    if (!TYPE_REQUEST(state.action.type)) return;
    if (!this.isDbConnected) {
      let error: DepartmentActionError = {
        action: state.action,
        type: 'Request failed',
        message: 'Failed to connect to database'
      };
      ApplicationStore.dispatch(ACTION_DEPARTMENT.error(error));
      return;
    }
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

  departmentOnChange(department: Department, type: ACTION_TYPE) {
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
  }

  async subscribe() {
    let results = await this.connectDB();
    this.isDbConnected = true;
    ApplicationStore.dispatch(
      ACTION_DEPARTMENT.initialized(results.departments)
    );
  }

  unsubscribe() {
    this.isDbConnected = false;
  }
}
