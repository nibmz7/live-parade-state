import { ACTION_ROOT, Action } from '../store';
import { ACTION_TYPE, REQUEST_TYPES } from '../data_manager';
import {
  UserStoreState,
  UserAction,
  UsersByDepartment
} from '../states/user_state';
import User from '../../model/user';

const InitialState = (): UserStoreState => ({
  action: {
    root: 0,
    type: 0,
    id: 0
  },
  users: {},
  sortedUsers: [],
  sortedUsersByDepartment: {}
});

export const user = (
  state: UserStoreState = InitialState(),
  rootAction: Action
): UserStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET) return InitialState();
  if (rootAction.root !== ACTION_ROOT.USERS) return state;

  const action = rootAction as UserAction;
  const type = action.type;

  if (REQUEST_TYPES.includes(type)) {
    return { ...state, action };
  }

  if (type === ACTION_TYPE.INITIALIZED) {
    const users = {};
    const sortedUsers = (action.payload as Array<User>).slice();
    const sortedUsersByDepartment: UsersByDepartment = {};
    sortedUsers.sort(User.compare);
    for (let user of sortedUsers) {
      if (user.departmentid in sortedUsersByDepartment)
        sortedUsersByDepartment[user.departmentid].push(user);
      else sortedUsersByDepartment[user.departmentid] = [user];
      users[user.uid] = user;
    }
    return { action, users, sortedUsers, sortedUsersByDepartment };
  }

  const user = new User(action.payload as User);
  const depid = user.departmentid;
  let users: { [uid: string]: User } = {};
  let sortedUsers: Array<User>;
  let sortedUsersByDepartment: UsersByDepartment;

  const setData = (departmentUsers: Array<User>, allUsers: Array<User>) => {
    sortedUsersByDepartment = {
      ...state.sortedUsersByDepartment,
      [depid]: departmentUsers
    };
    sortedUsers = allUsers;
    users = { ...state.users, [user.uid]: user };
  };

  const addUser = (depUsers: Array<User>, allUsers: Array<User>) => {
    const depUserIndex = User.getInsertionIndex(depUsers, user);
    const allUserIndex = User.getInsertionIndex(allUsers, user);
    depUsers.splice(depUserIndex, 0, user);
    allUsers.splice(allUserIndex, 0, user);
  };

  const removeUser = () => {
    const depUsers = state.sortedUsersByDepartment[depid].filter(
      (item) => item.uid !== user.uid
    );
    const allUsers = state.sortedUsers.filter((item) => item.uid !== user.uid);
    return { depUsers, allUsers };
  };

  switch (type) {
    case ACTION_TYPE.ADDED: {
      const depUsers = state.sortedUsersByDepartment[depid]?.slice() || [];
      const allUsers = state.sortedUsers.slice();
      addUser(depUsers, allUsers);
      setData(depUsers, allUsers);
      break;
    }
    case ACTION_TYPE.MODIFIED: {
      const { depUsers, allUsers } = removeUser();
      addUser(depUsers, allUsers);
      setData(depUsers, allUsers);
      break;
    }
    case ACTION_TYPE.REMOVED: {
      const { depUsers, allUsers } = removeUser();
      setData(depUsers, allUsers);
      const { [user.uid]: omit, ...others } = users;
      users = others;
      break;
    }
    default: {
      users = state.users;
      sortedUsers = state.sortedUsers;
      sortedUsersByDepartment = state.sortedUsersByDepartment;
      break;
    }
  }

  //@ts-ignore
  return { action, users, sortedUsers, sortedUsersByDepartment };
};
