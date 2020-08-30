import { ACTION_ROOT, Action } from '../../data/store';
import {
  DepartmentStoreState,
  DepartmentAction,
  DEPARTMENT_ACTION_TYPE as ACTION_TYPE
} from '../states/department_state';
import Department from 'model/department';

const initialState: DepartmentStoreState = {
  action: {
    root: 0,
    type: 0,
    id: 0,
    payload: {
      name: '',
      id: '0'
    }
  },
  items: {}
};

export const department = (
  state: DepartmentStoreState = initialState,
  rootAction: Action
): DepartmentStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET) return initialState;
  if (rootAction.root !== ACTION_ROOT.DEPARTMENTS) return state;

  const action = rootAction as DepartmentAction;
  const department = action.payload as Department;
  const items = state.items;
  if (
    action.type === ACTION_TYPE.ADDED ||
    action.type === ACTION_TYPE.MODIFIED
  ) {
    items[department.id] = department;
  } else if (action.type === ACTION_TYPE.REMOVED) {
    delete items[department.id];
  }

  return { items, action };
};
