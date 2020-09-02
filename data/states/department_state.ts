import {
  Action,
  ACTION_ROOT,
  DataStoreState,
  ActionError,
  ACTION_ID
} from '../../data/store';
import Department from '../../model/department';
import { ACTION_TYPE } from '../data_manager';

export interface DepartmentActionError extends ActionError {
  action: DepartmentAction;
}

export type DepartmentPayload = Department | Array<Department> | DepartmentActionError | undefined;

export interface DepartmentAction extends Action {
  root: ACTION_ROOT.DEPARTMENTS;
  id: ACTION_ID;
  type: ACTION_TYPE;
  payload?: DepartmentPayload;
}

export interface DepartmentStoreState extends DataStoreState {
  action: DepartmentAction;
  items: {};
}
