import { expect } from 'chai';
import { auth } from '../../../data/reducers/auth_reducer';
import {
  AuthAction,
  AuthState,
  AuthStoreState
} from '../../../data/states/auth_state';
import { MockAuth } from '../../../data-mock/mock_data';
import { ACTION_ROOT } from '../../../data/store';

describe('Auth Reducer', () => {
  it('Request Sign In', () => {
    const action: AuthAction = {
      id: Date.now(),
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_IN,
      payload: MockAuth.UserCredentials
    };
    const expectedState: AuthStoreState = {
      action
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });

  it('Request Sign out', () => {
    const action: AuthAction = {
      id: Date.now(),
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_OUT
    };
    const expectedState: AuthStoreState = {
      action
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });
});
