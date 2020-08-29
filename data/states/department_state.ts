import { Action, ACTION_ROOT, DataStoreState } from '../../data/store';
import Department from '../../model/department';

export enum ACTION_TYPE {
  ADDED,
  REMOVED,
  MODIFIED,
  REQUEST_ADD,
  REQUEST_REMOVE,
  REQUEST_MODIFY
}

export type ACTION_ID = string;

export interface DepartmentAction extends Action {
  root: ACTION_ROOT.DEPARTMENTS;
  state: ACTION_ID,
  type: ACTION_TYPE;
  payload: Department;
}

export interface DepartmentStoreState extends DataStoreState {
  state: ACTION_ID;
  type: ACTION_TYPE;
  payload: Department;
}
