import { ApplicationStore } from './store';
import Department from '../model/department';
import ACTION_DEPARTMENT from './actions/department_action';
import ACTION_USER from './actions/user_action';
import User from '../model/user';

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

  constructor() {}

  protected abstract async connectDB(): Promise<DataResults>;

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

  userOnChange(user: User, type: ACTION_TYPE) {
    switch (type) {
      case ACTION_TYPE.ADDED:
        ApplicationStore.dispatch(ACTION_USER.added(user));
        break;
      case ACTION_TYPE.MODIFIED:
        ApplicationStore.dispatch(ACTION_USER.modified(user));
        break;
      case ACTION_TYPE.REMOVED:
        ApplicationStore.dispatch(ACTION_USER.removed(user));
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
