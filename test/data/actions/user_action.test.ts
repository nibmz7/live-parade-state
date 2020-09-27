import { expect } from '@open-wc/testing';
import { MockModel, MockError } from '../../../data-mock/mock_data';
import { ACTION_ROOT } from '../../../data/store';
import { ACTION_TYPE } from '../../../data/data_manager';
import ACTION_USER from '../../../data/actions/user_action';
import { UserAction } from '../../../data/states/user_state';

describe('User actions', () => {
  it('Add user', () => {
    let action = ACTION_USER.requestAdd(MockModel.User);
    let expectedAction: UserAction = {
      id: action.id,
      root: ACTION_ROOT.USERS,
      type: ACTION_TYPE.REQUEST_ADD,
      payload: MockModel.User
    };
    expect(action).deep.equal(expectedAction);
  });
  it('User added', () => {
    let action = ACTION_USER.added(MockModel.User);
    let expectedAction: UserAction = {
      id: action.id,
      root: ACTION_ROOT.USERS,
      type: ACTION_TYPE.ADDED,
      payload: MockModel.User
    };
    expect(action).deep.equal(expectedAction);
  });
  it('User request error', () => {
    let addAction = ACTION_USER.requestAdd(MockModel.User);
    let error = MockError.UserRequest(addAction);
    let errorAction = ACTION_USER.requestError(error);
    let expectedAction: UserAction = {
      id: errorAction.id,
      root: ACTION_ROOT.USERS,
      type: ACTION_TYPE.REQUEST_ERROR,
      payload: error
    };
    expect(errorAction).deep.equal(expectedAction);
  });
});
