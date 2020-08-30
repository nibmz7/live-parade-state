import { ACTION_ROOT } from '../store';
import {
  SignInCredentials,
  AuthState,
  AuthAction,
  SignInError,
  AuthPayload
} from '../../data/states/auth_state';
import Admin from 'model/admin';
import User from 'model/user';

const makeAction = (type: AuthState, payload: AuthPayload): AuthAction => ({
  id: Date.now(),
  root: ACTION_ROOT.AUTH,
  type,
  payload
});

const ACTION_AUTH = {
  requestSignIn: (credentials: SignInCredentials): AuthAction =>
    makeAction(AuthState.REQUEST_SIGN_IN, credentials),
  requestSignOut: (): AuthAction =>
    makeAction(AuthState.REQUEST_SIGN_OUT, undefined),
  userSignedIn: (user: User | Admin): AuthAction =>
    makeAction(AuthState.SIGNED_IN, user),
  userSignedOut: (): AuthAction => makeAction(AuthState.SIGNED_OUT, undefined),
  signInFailed: (error: SignInError): AuthAction =>
    makeAction(AuthState.REQUEST_SIGN_IN_FAILED, error)
};

export default ACTION_AUTH;
