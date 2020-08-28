import Auth, { SignInCredentials, AuthAction } from '../states/auth_state';
import store from '../store';
import { AuthState } from '../states/auth_state';

export const signIn = (credentials: SignInCredentials) => {
  let action: AuthAction = {
    type: AuthState.REQUEST_SIGN_IN,
    payload: credentials
  };
  store.dispatch(action);
};

export const signOut = () => {
  let action: AuthAction = { type: AuthState.REQUEST_SIGN_OUT };
  store.dispatch(action);
};

export const updateAuthState = (type: AuthState, payload: Auth) => {
  let action: AuthAction = { type, payload };
  store.dispatch(action);
};
