import { expect } from 'chai';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { AuthState, AuthStoreState } from '../../data/states/auth_state';
import ACTION_AUTH from '../../data/actions/auth_action';
import MockAuthManager from '../../data-mock/mock_auth_manager';
import {
  MockErrorCredentials,
  MockSignInError,
  MockUserCredentials,
  MockAdminCredentials,
  MockUser,
  MockAdmin
} from '../../data-mock/mock_data';
import { Unsubscribe } from 'redux';

describe('Mock Auth Manager', () => {
  before(() => {
    new MockAuthManager();
  });

  afterEach(() => {
    ApplicationStore.reset();
  });

  it('Sign In with Error', (done) => {
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.REQUEST_SIGN_IN_FAILED) return;
      let expectedState: AuthStoreState = {
        state: AuthState.REQUEST_SIGN_IN_FAILED,
        payload: MockSignInError
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen({
      actionType: ACTION_ROOT.AUTH,
      callback
    });

    let action = ACTION_AUTH.requestSignIn(MockErrorCredentials);
    ApplicationStore.dispatch(action);
  });

  it('Sign In with User', (done) => {
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.SIGNED_IN) return;
      let expectedState: AuthStoreState = {
        state: AuthState.SIGNED_IN,
        payload: MockUser
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen({
      actionType: ACTION_ROOT.AUTH,
      callback
    });

    let action = ACTION_AUTH.requestSignIn(MockUserCredentials);
    ApplicationStore.dispatch(action);
  });

  it('Sign In with Admin', (done) => {
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.SIGNED_IN) return;
      let expectedState: AuthStoreState = {
        state: AuthState.SIGNED_IN,
        payload: MockAdmin
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen({
      actionType: ACTION_ROOT.AUTH,
      callback
    });

    let action = ACTION_AUTH.requestSignIn(MockAdminCredentials);
    ApplicationStore.dispatch(action);
  });

  it('Sign Out', (done) => {
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.SIGNED_OUT) return;
      let expectedState: AuthStoreState = {
        state: AuthState.SIGNED_OUT,
        payload: undefined
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen({
      actionType: ACTION_ROOT.AUTH,
      callback
    });

    let action = ACTION_AUTH.requestSignOut();
    ApplicationStore.dispatch(action);
  });
});
