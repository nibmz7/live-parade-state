import { Action, ACTION_ROOT, DataStoreState, ActionError, ACTION_ID } from '../../data/store';
import Department from '../../model/department';

export enum DEPARTMENT_ACTION_TYPE {
  ADDED,
  REMOVED,
  MODIFIED,
  REQUEST_ADD,
  REQUEST_REMOVE,
  REQUEST_MODIFY,
  REQUEST_ERROR
}

export interface DepartmentAction extends Action {
  root: ACTION_ROOT.DEPARTMENTS;
  id: ACTION_ID,
  type: DEPARTMENT_ACTION_TYPE;
  department: Department;
}

export interface DepartmentActionError extends ActionError{
    action: DepartmentAction
}

export interface DepartmentStoreState extends DataStoreState {
  action: DepartmentAction,
  items: {}
}
