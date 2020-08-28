import { SignInCredentials } from '../states/auth_state';
import store from '../store';
import { AuthState } from '../states/auth_state';

export const signIn = (credentials: SignInCredentials) => {
  store.dispatch({
    type: AuthState.LOADING,
  });
  store.dispatch({
    type: AuthState.REQUEST_SIGN_IN,
    payload: credentials,
  });
};

export const signOut = () => {
  store.dispatch({
    type: AuthState.REQUEST_SIGN_OUT
  });
};
