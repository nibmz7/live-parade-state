import { expect } from '@open-wc/testing';
import ACTION_AUTH from '../../../data/actions/auth_action';
import {
  AuthAction,
  AUTH_STATE,
  SignInError,
} from '../../../data/states/auth_state';
import { ACTION_ROOT } from '../../../data/store';
import { MockAuth, MockModel, MockError } from '../../../data-mock/mock_data';
import AuthUser from '../../../model/auth_user';

describe('Auth Actions', () => {
  it('Sign in', () => {
    const action = ACTION_AUTH.requestSignIn(MockAuth.UserCredentials);
    const expectedAction: AuthAction = {
      id: action.id,
      root: ACTION_ROOT.AUTH,
      type: AUTH_STATE.REQUEST_SIGN_IN,
      payload: MockAuth.UserCredentials,
    };
    expect(action).to.deep.equal(expectedAction);
  });

  it('Sign out', () => {
    const action = ACTION_AUTH.requestSignOut();
    const expectedAction: AuthAction = {
      id: action.id,
      root: ACTION_ROOT.AUTH,
      type: AUTH_STATE.REQUEST_SIGN_OUT,
      payload: undefined,
    };
    expect(action).to.deep.equal(expectedAction);
  });

  it('Update Auth State', () => {
    const authUser = new AuthUser({...MockModel.User});
    const action = ACTION_AUTH.userSignedIn(authUser);
    const expectedAction: AuthAction = {
      id: action.id,
      root: ACTION_ROOT.AUTH,
      type: AUTH_STATE.SIGNED_IN,
      payload: authUser,
    };
    expect(action).to.deep.equal(expectedAction);
  });

  it('Sign in error', () => {
    const authUser = new AuthUser({...MockModel.User});
    const addAction = ACTION_AUTH.userSignedIn(authUser);
    const error: SignInError = MockError.SignIn(addAction);
    const action = ACTION_AUTH.signInFailed(error);
    const expectedAction: AuthAction = {
      id: action.id,
      root: ACTION_ROOT.AUTH,
      type: AUTH_STATE.REQUEST_SIGN_IN_FAILED,
      payload: error,
    };
    expect(action).to.deep.equal(expectedAction);
  });
});
