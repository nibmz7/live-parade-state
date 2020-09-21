import { ACTION_ROOT, Action } from '../store';
import { ACTION_TYPE } from '../data_manager';
import {
  UserStoreState,
  UserAction,
  UsersByDepartment
} from '../states/user_state';
import User, { compare, getInsertionIndex } from '../../model/user';

const initialState: UserStoreState = {
  action: {
    root: 0,
    type: 0,
    id: 0
  },
  items: {},
  sortedItems: []
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
    let users = action.payload as Array<User>;
    users.sort(compare);
    let usersByDepartment: UsersByDepartment = {};
    for (let user of users) {
      if (user.departmentid in usersByDepartment)
        usersByDepartment[user.departmentid].push(user);
      else usersByDepartment[user.departmentid] = [user];
    }
    return { action, items: usersByDepartment, sortedItems: users };
  }

  const user = new User(action.payload as User);
  let items: UsersByDepartment;
  let sortedItems: Array<User>;

  const setData = (users: Array<User>, sortedUsers: Array<User>) => {
    items = {
      ...state.items,
      [user.departmentid]: users
    };
    sortedItems = sortedUsers;
  };

  const addUser = (users: Array<User>, sortedUsers: Array<User>) => {
    let userIndex = getInsertionIndex(users, user);
    let sortedUserIndex = getInsertionIndex(sortedUsers, user);
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
      let users = state.items[user.departmentid]?.slice() || [];
      let sortedUsers = state.sortedItems.slice();
      addUser(users, sortedUsers);
      setData(users, sortedUsers);
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      let { users, sortedUsers } = removeUser();
      addUser(users, sortedUsers);
      setData(users, sortedUsers);
      break;
    }
    case ACTION_TYPE.REMOVED: {
      let { users, sortedUsers } = removeUser();
      setData(users, sortedUsers);
      break;
    }
    default: {
      items = state.items;
      sortedItems = state.sortedItems;
      break;
    }
  }

  //@ts-ignore
  return { action, items, sortedItems };
};
