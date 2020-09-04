import { MockModel } from '../../../data-mock/mock_data';
import { expect } from 'chai';
import ACTION_USER from '../../../data/actions/user_action';
import { UserStoreState } from '../../../data/states/user_state';
import { user } from '../../../data/reducers/user_reducer';

describe('User reducer', () => {
  it('Request add', () => {
    let action = ACTION_USER.requestAdd(MockModel.User);
    let reduce = user(undefined, action);
    let expectedResult: UserStoreState = {
      action,
      items: []
    };
    expect(reduce).deep.equal(expectedResult);
  });

  it('Added', () => {
    let action = ACTION_USER.added(MockModel.User);
    let reduce = user(undefined, action);
    let expectedResult: UserStoreState = {
      action,
      items: [MockModel.User]
    };
    expect(reduce).deep.equal(expectedResult);
  });

  it('Removed', () => {
    let action = ACTION_USER.removed(MockModel.User);
    let initialState = {
      action,
      items: [MockModel.User]
    };
    let reduce = user(initialState, action);
    let expectedResult: UserStoreState = {
      action,
      items: []
    };
    expect(reduce).deep.equal(expectedResult);
  });
});
