import { expect } from 'chai';
import {
  ApplicationStore
} from '../../data/store';
import { AuthState, Auth } from '../../data/states/auth_state';
import { signIn } from '../../data/actions/auth_action';
import MockAuthManager from '../../data-mock/mock_auth_manager';
import {
  MockErrorCredentials,
  MockSignInError,
  MockUserCredentials,
  MockUser
} from '../../data-mock/mock_data';
import { Unsubscribe } from 'redux';

describe('Mock Auth Manager', () => {
  before(() => {
    new MockAuthManager();
  });

  const getState = (data) => data.auth as Auth;

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
      getState,
      callback,
      diffing: true
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
      getState,
      callback,
      diffing: true
    });

    ApplicationStore.dispatch(signIn(MockUserCredentials));
  });
});
