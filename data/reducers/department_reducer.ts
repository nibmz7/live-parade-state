import { ACTION_ROOT, Action } from '../../data/store';
import {
  DepartmentStoreState,
  DepartmentAction
} from '../states/department_state';
import Department from '../../model/department';
import { ACTION_TYPE } from '../data_manager';

const initialState: DepartmentStoreState = {
  action: {
    root: 0,
    type: 0,
    id: 0
  },
  items: {}
};

export const department = (
  state: DepartmentStoreState = initialState,
  rootAction: Action
): DepartmentStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET)
    return { ...initialState, items: {} };
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
