import {
  Action,
  ACTION_ROOT,
  DataStoreState,
  ActionError,
  ACTION_ID
} from '../store';
import { ACTION_TYPE } from '../data_manager';
import User from '../../model/user';

export type UsersByDepartment = {[departmentId: string]: Array<User>};

export interface UserActionError extends ActionError {
  action: UserAction;
}

export type UserPayload = User | UsersByDepartment | UserActionError | undefined;

export interface UserAction extends Action {
  root: ACTION_ROOT.USERS;
  id: ACTION_ID;
  type: ACTION_TYPE;
  payload?: UserPayload;
}

export interface UserStoreState extends DataStoreState {
  action: UserAction;
  items: UsersByDepartment;
}
