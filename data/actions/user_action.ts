import { ACTION_ROOT, generateActionId } from '../store';
import { ACTION_TYPE } from '../data_manager';
import { UserAction, UserPayload, UserActionError, UsersByDepartment } from '../states/user_state';
import User from '../../model/user';

const makeAction = (type: ACTION_TYPE, payload: UserPayload): UserAction => ({
  root: ACTION_ROOT.USERS,
  id: generateActionId(),
  type,
  payload
});

const ACTION_USER = {
  initialized: (Users: UsersByDepartment): UserAction =>
    makeAction(ACTION_TYPE.INITIALIZED, Users),
  added: (User: User): UserAction => makeAction(ACTION_TYPE.ADDED, User),
  modified: (User: User): UserAction => makeAction(ACTION_TYPE.MODIFIED, User),
  removed: (User: User): UserAction => makeAction(ACTION_TYPE.REMOVED, User),
  requestAdd: (User: User): UserAction =>
    makeAction(ACTION_TYPE.REQUEST_ADD, User),
  requestModify: (User: User): UserAction =>
    makeAction(ACTION_TYPE.REQUEST_MODIFY, User),
  requestRemove: (User: User): UserAction =>
    makeAction(ACTION_TYPE.REQUEST_REMOVE, User),
  error: (actionError: UserActionError) =>
    makeAction(ACTION_TYPE.REQUEST_ERROR, actionError)
};

export default ACTION_USER;
