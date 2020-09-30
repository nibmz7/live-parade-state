import { expect } from '@open-wc/testing';
import { MockModel } from '../../../data-mock/mock_data';
import ACTION_USER from '../../../data/actions/user_action';
import { UserStoreState } from '../../../data/states/user_state';
import { user } from '../../../data/reducers/user_reducer';

describe('User reducer', () => {
  it('Request add', () => {
    let action = ACTION_USER.requestAdd(MockModel.User);
    let reduce = user(undefined, action);
    let expectedResult: UserStoreState = {
      action,
      users: {},
      sortedUsers: [],
      sortedUsersByDepartment: {}
    };
    expect(reduce).deep.equal(expectedResult);
  });

  it('Added', () => {
    let mockUser = MockModel.User;
    let action = ACTION_USER.added(mockUser);
    let reduce = user(undefined, action);
    let expectedResult: UserStoreState = {
      action,
      users: { [mockUser.uid]: mockUser },
      sortedUsers: [mockUser],
      sortedUsersByDepartment: { [mockUser.departmentid]: [mockUser] }
    };
    expect(reduce).deep.equal(expectedResult);
  });

  it('Removed', () => {
    let mockUser = MockModel.User;
    let action = ACTION_USER.removed(mockUser);
    let initialState = {
      action,
      users: { [mockUser.uid]: mockUser },
      sortedUsers: [mockUser],
      sortedUsersByDepartment: { [mockUser.departmentid]: [mockUser] }
    };
    let reduce = user(initialState, action);
    let expectedResult: UserStoreState = {
      action,
      users: {},
      sortedUsers: [],
      sortedUsersByDepartment: { [mockUser.departmentid]: [] }
    };
    expect(reduce).deep.equal(expectedResult);
  });
});
