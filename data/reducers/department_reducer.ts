import { ACTION_ROOT, Action } from '../../data/store';
import {
  DepartmentStoreState,
  DepartmentAction,
  ACTION_TYPE
} from 'data/states/department_state';

const initialState: DepartmentStoreState = {
  action: {
    root: ACTION_ROOT.DEPARTMENTS,
    type: 0,
    id: 0,
    department: {
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
  const department = action.department;
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
