import { expect } from 'chai';
import { signIn, signOut, updateAuthState } from '../../../data/actions/auth_action';
import {
  SignInCredentials,
  AuthAction,
  AuthState,
  Auth
} from 'data/states/auth_state';
import { ACTION_ROOT } from '../../../data/actions/actions';

describe('Auth Actions', () => {
  it('Sign in', () => {
    const credentials: SignInCredentials = {
      email: 'John@lol.com',
      password: 'pass123'
    };
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_IN,
      payload: credentials
    };
    expect(signIn(credentials)).to.equal(expectedAction);
  });

  it('Sign out', () => {
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.REQUEST_SIGN_OUT
    };
    expect(signOut()).to.equal(expectedAction);
  });

  it('Update Auth State', () => {
    const auth: Auth = {
      state: AuthState.SIGNED_IN,
      isProcessing: false
    };
    const expectedAction: AuthAction = {
      root: ACTION_ROOT.AUTH,
      type: AuthState.SIGNED_IN,
      payload: auth
    };
    expect(updateAuthState(AuthState.SIGNED_IN, auth)).to.equal(expectedAction);
  });
});
