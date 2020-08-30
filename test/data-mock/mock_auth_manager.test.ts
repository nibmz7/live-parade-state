import { expect } from 'chai';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { AuthState, AuthStoreState } from '../../data/states/auth_state';
import ACTION_AUTH from '../../data/actions/auth_action';
import MockAuthManager from '../../data-mock/mock_auth_manager';
import { MockAuth, MockModel, MockError } from '../../data-mock/mock_data';
import { Unsubscribe } from 'redux';

describe('Mock Auth Manager', () => {
  before(() => {
    new MockAuthManager();
  });

  afterEach(() => {
    ApplicationStore.reset();
  });

  it('Sign In with Error', (done) => {
    let action = ACTION_AUTH.requestSignIn(MockAuth.ErrorCredentials);
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AuthState.REQUEST_SIGN_IN_FAILED) return;

      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AuthState.REQUEST_SIGN_IN_FAILED,
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
    let action = ACTION_AUTH.requestSignIn(MockAuth.UserCredentials);

    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AuthState.SIGNED_IN) return;
      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AuthState.SIGNED_IN,
          payload: MockModel.User
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
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AuthState.SIGNED_IN) return;
      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AuthState.SIGNED_IN,
          payload: MockModel.Admin
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen(ACTION_ROOT.AUTH, callback);

    let action = ACTION_AUTH.requestSignIn(MockAuth.AdminCredentials);
    ApplicationStore.dispatch(action);
  });

  it('Sign Out', (done) => {
    let callback = (auth: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (auth.action.type !== AuthState.SIGNED_OUT) return;
      let expectedState: AuthStoreState = {
        action: {
          id: auth.action.id,
          root: ACTION_ROOT.AUTH,
          type: AuthState.SIGNED_OUT,
          payload: undefined
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    };

    ApplicationStore.listen(ACTION_ROOT.AUTH, callback);

    let action = ACTION_AUTH.requestSignOut();
    ApplicationStore.dispatch(action);
  });
});
