import Auth, { SignInCredentials, AuthAction } from '../states/auth_state';
import store, { ACTION_ROOT } from '../store';
import { AuthState } from '../states/auth_state';

export const signIn = (credentials: SignInCredentials) => {
  let action: AuthAction = {
    root: ACTION_ROOT.AUTH,
    type: AuthState.REQUEST_SIGN_IN,
    payload: credentials
  };
  store.dispatch(action);
};

export const signOut = () => {
  let action: AuthAction = {
    root: ACTION_ROOT.AUTH,
    type: AuthState.REQUEST_SIGN_OUT
  };
  store.dispatch(action);
};

export const updateAuthState = (type: AuthState, payload: Auth) => {
  let action: AuthAction = { root: ACTION_ROOT.AUTH, type, payload };
  store.dispatch(action);
};
