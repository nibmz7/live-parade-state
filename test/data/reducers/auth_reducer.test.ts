import { expect } from 'chai';
import { auth } from '../../../data/reducers/auth_reducer';
import {
  AuthAction,
  AuthState,
  Auth
} from '../../../data/states/auth_state';
import { ACTION_ROOT, Action } from '../../../data/actions/actions';
import { credentials as MockCredentials} from '../../../data-mock/mock_data';

describe('Auth Reducer', () => {
  it('Undefined', () => {
    const action: Action = {
      root: 1,
      type: 2
    };
    const expectedState: Auth = {
      state: AuthState.INITIALIZED
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });

  it('Null payload', () => {
    const action: Action = {
      root: 0,
      type: 2
    };
    const expectedState: Auth = {
      state: AuthState.INITIALIZED
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });

  it('Request Sign In', () => {
    const action: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_IN,
      payload: MockCredentials
    };
    const expectedState: Auth = {
      state: AuthState.REQUEST_SIGN_IN,
      payload: MockCredentials
    };
    expect(auth(undefined, action)).to.deep.equal(expectedState);
  });
});
