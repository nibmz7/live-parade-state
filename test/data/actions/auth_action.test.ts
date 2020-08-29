import { expect } from 'chai';
import {
  signIn,
  signOut,
  updateAuthState
} from '../../../data/actions/auth_action';
import {
  AuthAction,
  AuthState,
} from '../../../data/states/auth_state';
import { ACTION_ROOT } from '../../../data/store';
import { MockUserCredentials} from '../../../data-mock/mock_data';

describe('Auth Actions', () => {
  it('Sign in', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_IN,
      payload: MockUserCredentials
    };
    expect(signIn(MockUserCredentials)).to.deep.equal(expectedAction);
  });

  it('Sign out', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_OUT
    };
    expect(signOut()).to.deep.equal(expectedAction);
  });

  it('Update Auth State', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.SIGNED_IN,
      payload: undefined
    };
    expect(updateAuthState(AuthState.SIGNED_IN, undefined)).to.deep.equal(
      expectedAction
    );
  });
});
