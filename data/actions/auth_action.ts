import { ACTION_ROOT } from '../store';
import {
  SignInCredentials,
  AuthState,
  AuthAction,
  SignInError
} from '../../data/states/auth_state';
import Admin from 'model/admin';
import User from 'model/user';

const ACTION_AUTH = {
  requestSignIn: (credentials: SignInCredentials): AuthAction => ({
    root: ACTION_ROOT.AUTH,
    type: AuthState.REQUEST_SIGN_IN,
    payload: credentials
  }),
  requestSignOut: (): AuthAction => ({
    root: ACTION_ROOT.AUTH,
    type: AuthState.REQUEST_SIGN_OUT
  }),
  userSignedIn: (user: User | Admin): AuthAction => ({
    root: ACTION_ROOT.AUTH,
    type: AuthState.SIGNED_IN,
    payload: user
  }),
  userSignedOut: (): AuthAction => ({
    root: ACTION_ROOT.AUTH,
    type: AuthState.SIGNED_OUT
  }),
  signInFailed: (error: SignInError): AuthAction => ({
    root: ACTION_ROOT.AUTH,
    type: AuthState.REQUEST_SIGN_IN_FAILED,
    payload: error
  })
};

export default ACTION_AUTH;
