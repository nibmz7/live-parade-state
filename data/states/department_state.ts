import { Action, ACTION_ROOT, DataStoreState } from '../../data/store';
import Department from '../../model/department';

export enum ACTION_TYPE {
  ADDED,
  REMOVED,
  MODIFIED,
  REQUEST_ADD,
  REQUEST_REMOVE,
  REQUEST_MODIFY,
  REQUEST_ERROR
}

export type ACTION_ID = string | number;

export interface DepartmentAction extends Action {
  root: ACTION_ROOT.DEPARTMENTS;
  state: ACTION_ID,
  type: ACTION_TYPE;
  department: Department;
}

export interface DepartmentActionError {
    actionID: ACTION_ID;
    type: string;
    message: string;
}

export interface DepartmentStoreState extends DataStoreState {
  state: ACTION_ID;
  items: {}; 
  type?: ACTION_TYPE;
  department?: Department;
}
