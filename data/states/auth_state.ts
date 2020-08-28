import { Action, ACTION_ROOT } from '../../data/actions/actions';

import Admin from '../../model/admin';
import User from '../../model/user';

export enum AuthState {
  INITIALIZED,
  SIGNED_IN,
  SIGNED_OUT,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_IN_FAILED,
  REQUEST_SIGN_OUT
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInError {
  type: string;
  message: string;
}

export interface AuthAction extends Action {
  root: ACTION_ROOT.AUTH,
  type: AuthState;
  payload?: SignInCredentials | SignInError | Auth;
}

export interface Auth {
  state: AuthState;
  isAdmin?: boolean;
  user?: Admin | User;
  payload?: SignInCredentials | SignInError;
}
