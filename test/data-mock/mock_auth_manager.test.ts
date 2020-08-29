import { expect } from 'chai';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import { AuthState, Auth } from '../../data/states/auth_state';
import { signIn, signOut } from '../../data/actions/auth_action';
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
    let callback = (auth: Auth, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.REQUEST_SIGN_IN_FAILED) return;
      let expectedState: Auth = {
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

    ApplicationStore.dispatch(signIn(MockErrorCredentials));
  });

  it('Sign In with User', (done) => {
    let callback = (auth: Auth, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.SIGNED_IN) return;
      let expectedState: Auth = {
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

    ApplicationStore.dispatch(signIn(MockUserCredentials));
  });

  it('Sign In with Admin', (done) => {
    let callback = (auth: Auth, unsubscribe: Unsubscribe) => {
      if (auth.state !== AuthState.SIGNED_IN) return;
      let expectedState: Auth = {
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

    ApplicationStore.dispatch(signIn(MockAdminCredentials));
  });

  it('Sign Out', (done) => {
    let callback = (auth: Auth, unsubscribe: Unsubscribe) => {
      console.log(auth.state);
      if (auth.state !== AuthState.SIGNED_OUT) return;
      console.log('asddssd');
      let expectedState: Auth = {
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

    ApplicationStore.dispatch(signOut());
  });
  
});
