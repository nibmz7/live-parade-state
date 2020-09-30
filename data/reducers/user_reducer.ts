import { ACTION_ROOT, Action } from '../store';
import { ACTION_TYPE, REQUEST_TYPES } from '../data_manager';
import {
  UserStoreState,
  UserAction,
  UsersByDepartment
} from '../states/user_state';
import User from '../../model/user';

const initialState: UserStoreState = {
  action: {
    root: 0,
    type: 0,
    id: 0
  },
  items: {},
  sortedItems: [],
  fullnames: {}
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

  if (REQUEST_TYPES.includes(type)) {
    return { ...state, action };
  }

  if (type === ACTION_TYPE.INITIALIZED) {
    let users = action.payload as Array<User>;
    users.sort(User.compare);
    let usersByDepartment: UsersByDepartment = {};
    let fullnames = {};
    for (let user of users) {
      if (user.departmentid in usersByDepartment)
        usersByDepartment[user.departmentid].push(user);
      else usersByDepartment[user.departmentid] = [user];
      fullnames[user.uid] = user.fullname;
    }
    return { action, items: usersByDepartment, sortedItems: users, fullnames };
  }

  const user = new User(action.payload as User);
  let items: UsersByDepartment;
  let sortedItems: Array<User>;
  let fullnames = {};

  const setData = (users: Array<User>, sortedUsers: Array<User>) => {
    items = {
      ...state.items,
      [user.departmentid]: users
    };
    sortedItems = sortedUsers;
  };

  const addUser = (users: Array<User>, sortedUsers: Array<User>) => {
    let userIndex = User.getInsertionIndex(users, user);
    let sortedUserIndex = User.getInsertionIndex(sortedUsers, user);
    users.splice(userIndex, 0, user);
    sortedUsers.splice(sortedUserIndex, 0, user);
  };

  const removeUser = () => {
    let depId = user.departmentid;
    let users = state.items[depId].filter((item) => item.uid !== user.uid);
    let sortedUsers = state.sortedItems.filter((item) => item.uid !== user.uid);
    return { users, sortedUsers };
  };

  switch (type) {
    case ACTION_TYPE.ADDED: {
      const users = state.items[user.departmentid]?.slice() || [];
      const sortedUsers = state.sortedItems.slice();
      addUser(users, sortedUsers);
      setData(users, sortedUsers);
      fullnames = { ...state.fullnames, [user.uid]: user.fullname };
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      const { users, sortedUsers } = removeUser();
      addUser(users, sortedUsers);
      setData(users, sortedUsers);
      fullnames = { ...state.fullnames, [user.uid]: user.fullname };
      break;
    }
    case ACTION_TYPE.REMOVED: {
      const { users, sortedUsers } = removeUser();
      setData(users, sortedUsers);
      const { [user.uid]: omit, ...others } = state.fullnames;
      fullnames = others;
      break;
    }
    default: {
      items = state.items;
      sortedItems = state.sortedItems;
      break;
    }
  }

  //@ts-ignore
  return { action, items, sortedItems, fullnames };
};
