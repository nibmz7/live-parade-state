import { AuthStoreState, AuthState, AuthAction } from '../../data/states/auth_state';
import { ACTION_ROOT, Action } from '../../data/store';

const initialState: AuthStoreState = {
  state: AuthState.INITIALIZED
};

export const auth = (state: AuthStoreState = initialState, rootAction: Action): AuthStoreState => {
  if (rootAction.root === ACTION_ROOT.RESET) return initialState;
  if (rootAction.root !== ACTION_ROOT.AUTH) return state;

  const action = rootAction as AuthAction;
  return { state: action.type, payload: action.payload };
};
