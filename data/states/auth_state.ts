import Admin from 'model/admin';
import User from 'model/user';
import { Action } from 'data/store';

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
  type: AuthState;
  payload?: SignInCredentials | SignInError | Auth;
}

export default interface Auth {
  state: AuthState;
  currentUser?: Admin | User;
  payload?: SignInCredentials | SignInError;
  isProcessing: boolean;
}
