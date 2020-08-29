import Department from '../../model/department';
import {
  DepartmentAction,
  ACTION_TYPE,
  DepartmentActionError
} from '../../data/states/department_state';
import { ACTION_ROOT } from '../../data/store';

const makeAction = (
  type: ACTION_TYPE,
  department: Department
): DepartmentAction => ({
  root: ACTION_ROOT.DEPARTMENTS,
  state: Date.now(),
  type,
  department
});

const ACTION_DEPARTMENT = {
  added: (department: Department): DepartmentAction =>
    makeAction(ACTION_TYPE.ADDED, department),
  modified: (department: Department): DepartmentAction =>
    makeAction(ACTION_TYPE.MODIFIED, department),
  removed: (department: Department): DepartmentAction =>
    makeAction(ACTION_TYPE.REMOVED, department),
  requestAdd: (department: Department): DepartmentAction =>
    makeAction(ACTION_TYPE.REQUEST_ADD, department),
  requestModify: (department: Department): DepartmentAction =>
    makeAction(ACTION_TYPE.REQUEST_MODIFY, department),
  requestRemove: (department: Department): DepartmentAction =>
    makeAction(ACTION_TYPE.REQUEST_REMOVE, department),
  error: (department: Department, actionError: DepartmentActionError) => ({
    ...makeAction(ACTION_TYPE.REQUEST_ERROR, department),
    error: actionError
  })
};
