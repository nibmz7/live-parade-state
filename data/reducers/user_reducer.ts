import { ACTION_ROOT, Action } from '../store';
import { ACTION_TYPE } from '../data_manager';
import {
  UserStoreState,
  UserAction,
  UsersByDepartment
} from '../states/user_state';
import User, { getInsertionIndex } from '../../model/user';

const initialState: UserStoreState = {
  action: {
    root: 0,
    type: 0,
    id: 0
  },
  items: {}
};

export const user = (
  state: UserStoreState = initialState,
  rootAction: Action
): UserStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET)
    return { ...initialState, items: {} };
  if (rootAction.root !== ACTION_ROOT.USERS) return state;

  const action = rootAction as UserAction;
  const type = action.type;

  if (type === ACTION_TYPE.INITIALIZED) {
    return { items: action.payload as UsersByDepartment, action };
  }

  const user = action.payload as User;
  let items: UsersByDepartment;

  switch (type) {
    case ACTION_TYPE.ADDED: {
      let users = state.items[user.department.id]?.slice() || [];
      let index = getInsertionIndex(users, user);
      users.splice(index, 0, user);
      items = {
        ...state.items,
        [user.department.id]: users
      };
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      let users = state.items[user.department.id].filter(
        (item) => item.uid !== user.uid
      );
      let index = getInsertionIndex(users, user);
      users.splice(index, 0, user);
      items = {
        ...state.items,
        [user.department.id]: users
      };
      break;
    }
    case ACTION_TYPE.REMOVED: {
      let users = state.items[user.department.id].filter(
        (item) => item.uid !== user.uid
      );
      items = {
        ...state.items,
        [user.department.id]: users
      };
      break;
    }
    default: {
      items = state.items;
      break;
    }
  }

  return { items, action };
};
