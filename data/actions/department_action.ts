import Department from '../../model/department';
import {
  DepartmentAction,
  DEPARTMENT_ACTION_TYPE as ACTION_TYPE,
  DepartmentActionError,
  DepartmentPayload
} from '../states/department_state';
import { ACTION_ROOT } from '../store';

const makeAction = (
  type: ACTION_TYPE,
  payload: DepartmentPayload
): DepartmentAction => ({
  root: ACTION_ROOT.DEPARTMENTS,
  id: Date.now(),
  type,
  payload
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
  error: (actionError: DepartmentActionError) =>
    makeAction(ACTION_TYPE.REQUEST_ERROR, actionError)
};

export default ACTION_DEPARTMENT;
