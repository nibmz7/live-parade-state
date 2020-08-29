import { expect } from 'chai';
import ACTION_AUTH from '../../../data/actions/auth_action';
import { AuthAction, AuthState } from '../../../data/states/auth_state';
import { ACTION_ROOT } from '../../../data/store';
import { MockUserCredentials, MockUser } from '../../../data-mock/mock_data';

describe('Auth Actions', () => {
  it('Sign in', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_IN,
      payload: MockUserCredentials
    };
    const action = ACTION_AUTH.requestSignIn(MockUserCredentials);
    expect(action).to.deep.equal(expectedAction);
  });

  it('Sign out', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_OUT
    };
    const action = ACTION_AUTH.requestSignOut();
    expect(action).to.deep.equal(expectedAction);
  });

  it('Update Auth State', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.SIGNED_IN,
      payload: MockUser
    };
    const action = ACTION_AUTH.userSignedIn(MockUser);
    expect(action).to.deep.equal(expectedAction);
  });
});
