import { ACTION_ROOT, generateActionId } from '../store';
import { ACTION_TYPE } from '../data_manager';
import {
  UserAction,
  UserPayload,
  UserActionError
} from '../states/user_state';
import User from '../../model/user';

const makeAction = (type: ACTION_TYPE, payload: UserPayload): UserAction => ({
  root: ACTION_ROOT.USERS,
  id: generateActionId(),
  type,
  payload
});

const ACTION_USER = {
  initialized: (users: Array<User>): UserAction =>
    makeAction(ACTION_TYPE.INITIALIZED, users),
  added: (user: User): UserAction => makeAction(ACTION_TYPE.ADDED, user),
  modified: (user: User): UserAction => makeAction(ACTION_TYPE.MODIFIED, user),
  removed: (user: User): UserAction => makeAction(ACTION_TYPE.REMOVED, user),
  requestAdd: (user: User): UserAction =>
    makeAction(ACTION_TYPE.REQUEST_ADD, user),
  requestModify: (user: User): UserAction =>
    makeAction(ACTION_TYPE.REQUEST_MODIFY, user),
  requestRemove: (user: User): UserAction =>
    makeAction(ACTION_TYPE.REQUEST_REMOVE, user),
  error: (actionError: UserActionError) =>
    makeAction(ACTION_TYPE.REQUEST_ERROR, actionError)
};

export default ACTION_USER;
