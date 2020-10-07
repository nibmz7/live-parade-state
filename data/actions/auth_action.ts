import { ACTION_ROOT, generateActionId } from '../store';
import {
  SignInCredentials,
  AUTH_STATE,
  AuthAction,
  SignInError,
  AuthPayload
} from '../states/auth_state';
import AuthUser from '../../model/auth_user';

const makeAction = (type: AUTH_STATE, payload: AuthPayload): AuthAction => ({
  id: generateActionId(),
  root: ACTION_ROOT.AUTH,
  type,
  payload
});

const ACTION_AUTH = {
  requestSignIn: (credentials: SignInCredentials): AuthAction =>
    makeAction(AUTH_STATE.REQUEST_SIGN_IN, credentials),
  requestSignOut: (): AuthAction =>
    makeAction(AUTH_STATE.REQUEST_SIGN_OUT, undefined),
  userSignedIn: (user: AuthUser): AuthAction =>
    makeAction(AUTH_STATE.SIGNED_IN, user),
  userSignedOut: (): AuthAction => makeAction(AUTH_STATE.SIGNED_OUT, undefined),
  signInFailed: (error: SignInError): AuthAction =>
    makeAction(AUTH_STATE.REQUEST_SIGN_IN_FAILED, error)
};

export default ACTION_AUTH;
