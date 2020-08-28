import Auth, {
  AuthState,
  AuthAction,
  SignInCredentials
} from 'data/states/auth_state';
import { ACTION_ROOT } from 'data/store';

const initialState: Auth = {
  state: AuthState.INITIALIZED,
  isProcessing: false
};

export default function auth(
  state: Auth = initialState,
  action: AuthAction
): Auth {
  if (action.root !== ACTION_ROOT.AUTH) return state;

  switch (action.type) {
    case AuthState.REQUEST_SIGN_IN:
      return {
        ...state,
        state: AuthState.REQUEST_SIGN_IN,
        payload: action.payload as SignInCredentials,
        isProcessing: true
      };

    case AuthState.REQUEST_SIGN_OUT:
      return { state: AuthState.REQUEST_SIGN_OUT, isProcessing: true };

    default:
      return action.payload as Auth;
  }
}
