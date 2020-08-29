import { expect } from 'chai';
import { auth } from '../../../data/reducers/auth_reducer';
import {
  AuthAction,
  AuthState,
  Auth
} from '../../../data/states/auth_state';
import { MockUserCredentials} from '../../../data-mock/mock_data';
import { ACTION_ROOT } from '../../../data/store';

describe('Auth Reducer', () => {

  it('Request Sign In', () => {
    const action: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_IN,
      payload: MockUserCredentials
    };
    const expectedState: Auth = {
      state: AuthState.REQUEST_SIGN_IN,
      payload: MockUserCredentials
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });

  it('Request Sign out', () => {
    const action: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_OUT
    };
    const expectedState: Auth = {
      state: AuthState.REQUEST_SIGN_OUT,
      payload: undefined
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });
});
