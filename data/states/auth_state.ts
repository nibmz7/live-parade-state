import { Action, ACTION_ROOT, ACTION_ID, ActionError } from '../../data/store';

import Admin from '../../model/admin';
import User from '../../model/user';
import { DataStoreState } from '../../data/store';

export enum AuthState {
  INITIALIZING,
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

export interface SignInError extends ActionError{
  action: AuthAction
}

export type AuthPayload = SignInCredentials | SignInError | User | Admin | undefined;

export interface AuthAction extends Action {
  root: ACTION_ROOT.AUTH;
  id: ACTION_ID;
  type: AuthState;
  payload?: AuthPayload;
}

export interface AuthStoreState extends DataStoreState{
  action: AuthAction
}
