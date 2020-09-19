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
  items: []
};

export const department = (
  state: DepartmentStoreState = initialState,
  rootAction: Action
): DepartmentStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET)
    return { ...initialState, items: [] };
  if (rootAction.root !== ACTION_ROOT.DEPARTMENTS) return state;

  const action = rootAction as DepartmentAction;
  const type = action.type;

  if (type === ACTION_TYPE.INITIALIZED) {
    return { items: action.payload as Array<Department>, action };
  }

  const department = action.payload as Department;
  let items: Array<Department>;

  switch (type) {
    case ACTION_TYPE.ADDED: {
      items = state.items.slice();
      items.push(department);
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      items = state.items.map((item) => {
        if (item.id !== department.id) return item;
        return {
          ...item,
          ...department
        };
      });
      break;
    }
    case ACTION_TYPE.REMOVED: {
      items = state.items.filter((item) => item.id !== department.id);
      break;
    }
    default: {
      items = state.items;
      break;
    }
  }

  return { items, action };
};
