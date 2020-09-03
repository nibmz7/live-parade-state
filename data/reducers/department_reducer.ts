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
  const items = state.items;

  switch (type) {
    case ACTION_TYPE.ADDED: {
      items.push(department);
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      let index = items.findIndex((item) => item.id === department.id);
      items[index] = department;
      break;
    }
    case ACTION_TYPE.REMOVED: {
      let index = items.findIndex((item) => item.id === department.id);
      items.splice(index, 1);
      break;
    }
  }

  return { items, action };
};
