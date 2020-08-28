import { ACTION_ROOT } from './actions';
import {
  SignInCredentials,
  AuthState,
  AuthAction,
  SignInError
} from '../../data/states/auth_state';
import Admin from 'model/admin';
import User from 'model/user';

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
  payload: SignInCredentials | SignInError | User | Admin | undefined
): AuthAction => ({ root: ACTION_ROOT.AUTH, type, payload });
