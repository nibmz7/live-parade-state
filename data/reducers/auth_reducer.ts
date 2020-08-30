import {
  AuthStoreState,
  AuthState,
  AuthAction
} from '../../data/states/auth_state';
import { ACTION_ROOT, Action } from '../../data/store';

const initialState: AuthStoreState = {
  action: {
    id: 0,
    root: 0,
    type: AuthState.INITIALIZED
  }
};

export const auth = (
  state: AuthStoreState = initialState,
  rootAction: Action
): AuthStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET) return initialState;
  if (rootAction.root !== ACTION_ROOT.AUTH) return state;

  const action = rootAction as AuthAction;
  return { action };
};
