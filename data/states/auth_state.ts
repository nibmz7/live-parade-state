import { Action, ACTION_ROOT } from '../../data/store';

import Admin from '../../model/admin';
import User from '../../model/user';
import { DataStoreState } from '../../data/store';

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

export type AuthPayload = SignInCredentials | SignInError | User | Admin | undefined;

export interface AuthAction extends Action {
  root: ACTION_ROOT.AUTH,
  type: AuthState;
  payload?: AuthPayload;
}

export interface Auth extends DataStoreState{
  state: AuthState;
  payload?: AuthPayload;
}
