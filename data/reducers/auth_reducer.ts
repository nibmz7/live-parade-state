import { Action, ACTION_ROOT } from '../../data/actions/actions';

import {
  Auth,
  AuthState,
  AuthAction,
  SignInCredentials
} from 'data/states/auth_state';

const initialState: Auth = {
  state: AuthState.INITIALIZED,
  isProcessing: false
};

export const auth = (state: Auth = initialState, rootAction: Action): Auth => {
  if (rootAction.root !== ACTION_ROOT.AUTH) return state;

  const action = rootAction as AuthAction;

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
};
