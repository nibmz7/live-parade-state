import { ACTION_ROOT, Action } from '../store';
import { ACTION_TYPE } from '../data_manager';
import { UserStoreState, UserAction } from '../states/user_state';
import User, { getInsertionIndex } from '../../model/user';

const initialState: UserStoreState = {
  action: {
    root: 0,
    type: 0,
    id: 0
  },
  items: []
};

export const user = (
  state: UserStoreState = initialState,
  rootAction: Action
): UserStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET)
    return { ...initialState, items: [] };
  if (rootAction.root !== ACTION_ROOT.USERS) return state;

  const action = rootAction as UserAction;
  const type = action.type;

  if (type === ACTION_TYPE.INITIALIZED) {
    return { items: action.payload as Array<User>, action };
  }

  const user = action.payload as User;
  const items = state.items;

  const addUser = (user: User) => {
    let index = getInsertionIndex(items, user);
    items.splice(index, 0, user);
  };

  const removeUser = (user: User) => {
    let index = items.findIndex((item) => item.uid === user.uid);
    items.splice(index, 1);
  };

  switch (type) {
    case ACTION_TYPE.ADDED: {
      addUser(user);
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      removeUser(user);
      addUser(user);
      break;
    }
    case ACTION_TYPE.REMOVED: {
      removeUser(user);
      break;
    }
  }

  return { items, action };
};
