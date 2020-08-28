import { expect } from 'chai';
import { store } from '../../data/store';
import { AuthState, Auth } from '../../data/states/auth_state';
import { signIn } from '../../data/actions/auth_action';
import MockAuthManager from '../../data-mock/mock_auth_manager';

describe('Mock Auth Manager', () => {
  before(() => {
    new MockAuthManager();
  });

  it('Sign In with Error', (done) => {
    let currentState = AuthState.INITIALIZED;
    let unsubscribe = store.subscribe(() => {
      let auth = store.getState().auth;
      if (
        auth.state !== AuthState.REQUEST_SIGN_IN_FAILED ||
        currentState === auth.state
      )
        return;
      currentState = auth.state;

      let expectedState: Auth = {
        state: AuthState.REQUEST_SIGN_IN_FAILED,
        payload: {
          type: 'Wrong password',
          message: "Please check that you've entered the correct password!"
        }
      };
      expect(auth).deep.equal(expectedState);
      unsubscribe();
      done();
    });
    store.dispatch(signIn({ email: 'error@lol.com', password: 'apappas' }));
  });
});
