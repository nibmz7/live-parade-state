import { ACTION_ROOT } from './actions';

import {
  Auth,
  SignInCredentials,
  AuthState,
  AuthAction,
  SignInError
} from '../../data/states/auth_state';

export const signIn = (credentials: SignInCredentials): AuthAction => ({
  root: ACTION_ROOT.AUTH,
  type: AuthState.REQUEST_SIGN_IN,
  payload: credentials
});

export const signOut = (): AuthAction => ({
  root: ACTION_ROOT.AUTH,
  type: AuthState.REQUEST_SIGN_OUT
});

export const updateAuthState = (
  type: AuthState,
  payload: SignInCredentials | SignInError | Auth
): AuthAction => ({ root: ACTION_ROOT.AUTH, type, payload });
