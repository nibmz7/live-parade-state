import { expect } from '@open-wc/testing';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { AUTH_STATE, AuthStoreState } from '../../data/states/auth_state';
import ACTION_AUTH from '../../data/actions/auth_action';
import MockAuthManager from '../../data-mock/mock_auth_manager';
import { MockAuth, MockModel, MockError } from '../../data-mock/mock_data';
import { Unsubscribe } from 'redux';
import AuthUser from '../../model/auth_user';

describe('Mock Auth Manager', () => {
  before(() => {
    new MockAuthManager();
  });

  beforeEach(() => {
    ApplicationStore.reset();
  });

  it('Sign In with Error', (done) => {
    let action = ACTION_AUTH.requestSignIn(MockAuth.ErrorCredentials);

    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AUTH_STATE.REQUEST_SIGN_IN_FAILED) return;

      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AUTH_STATE.REQUEST_SIGN_IN_FAILED,
          payload: MockError.SignIn(action)
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen(ACTION_ROOT.AUTH, callback);
    ApplicationStore.dispatch(action);
  });

  it('Sign In with User', (done) => {
    const authUser = new AuthUser({...MockModel.User});
    let action = ACTION_AUTH.requestSignIn(MockAuth.UserCredentials);

    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AUTH_STATE.SIGNED_IN) return;
      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AUTH_STATE.SIGNED_IN,
          payload: authUser
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen(ACTION_ROOT.AUTH, callback);
    ApplicationStore.dispatch(action);
  });

  it('Sign In with Admin', (done) => {
    const authUser = new AuthUser({...MockModel.User});
    let action = ACTION_AUTH.requestSignIn(MockAuth.AdminCredentials);

    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AUTH_STATE.SIGNED_IN) return;
      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AUTH_STATE.SIGNED_IN,
          payload: authUser
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen(ACTION_ROOT.AUTH, callback);
    ApplicationStore.dispatch(action);
  });

  it('Sign Out', (done) => {
    let action = ACTION_AUTH.requestSignOut();

    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AUTH_STATE.SIGNED_OUT) return;
      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AUTH_STATE.SIGNED_OUT,
          payload: undefined
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen(ACTION_ROOT.AUTH, callback);
    ApplicationStore.dispatch(action);
  });
});
