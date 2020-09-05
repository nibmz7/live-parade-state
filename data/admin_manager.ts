import { DataManager, ACTION_TYPE, TYPE_REQUEST } from './data_manager';
import {
  DepartmentStoreState,
  DepartmentActionError
} from './states/department_state';
import { UserStoreState, UserActionError } from './states/user_state';
import ACTION_DEPARTMENT from './actions/department_action';
import { ApplicationStore, ACTION_ROOT } from './store';
import ACTION_USER from './actions/user_action';

export default abstract class AdminManager extends DataManager {
  constructor() {
    super();
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, (state) =>
      this.departmentOnRequest(state)
    );
    ApplicationStore.listen(ACTION_ROOT.USERS, (state) =>
      this.userOnRequest(state)
    );
  }

  protected abstract requestAddDepartment(state: DepartmentStoreState): void;
  protected abstract requestModifyDepartment(state: DepartmentStoreState): void;
  protected abstract requestRemoveDepartment(state: DepartmentStoreState): void;
  protected abstract requestAddUser(state: UserStoreState): void;
  protected abstract requestModifyUser(state: UserStoreState): void;
  protected abstract requestRemoveUser(state: UserStoreState): void;

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

  userOnRequest(state: UserStoreState) {
    if (!TYPE_REQUEST(state.action.type)) return;
    if (!this.isDbConnected) {
      let error: UserActionError = {
        action: state.action,
        type: 'Request failed',
        message: 'Failed to connect to database'
      };
      ApplicationStore.dispatch(ACTION_USER.error(error));
      return;
    }
    switch (state.action.type) {
      case ACTION_TYPE.REQUEST_ADD:
        this.requestAddUser(state);
        break;
      case ACTION_TYPE.REQUEST_MODIFY:
        this.requestModifyUser(state);
        break;
      case ACTION_TYPE.REQUEST_REMOVE:
        this.requestRemoveUser(state);
        break;
    }
  }
}
