import { Action, ACTION_ROOT, ACTION_ID, ActionError } from '../../data/store';


import { DataStoreState } from '../../data/store';
import AuthUser from '../../model/auth_user';

export enum AUTH_STATE {
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

export interface SignInError extends ActionError {
  action: AuthAction;
}

export type AuthPayload =
  | SignInCredentials
  | SignInError
  | AuthUser
  | undefined;

export interface AuthAction extends Action {
  root: ACTION_ROOT.AUTH;
  id: ACTION_ID;
  type: AUTH_STATE;
  payload?: AuthPayload;
}

export interface AuthStoreState extends DataStoreState {
  action: AuthAction;
}
