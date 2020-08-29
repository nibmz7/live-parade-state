import { createStore, combineReducers, Unsubscribe } from 'redux';
import { auth } from '../data/reducers/auth_reducer';
import { Auth } from './states/auth_state';

export enum ACTION_ROOT {
  AUTH,
  DEPARTMENTS,
  USERS,
  RESET
}

export interface Action {
  root: ACTION_ROOT;
  type: any;
}

export interface DataStoreState {
  state: any;
  payload?: any;
}

export interface DataStoreListener {
  actionType: ACTION_ROOT;
  callback(data: DataStoreState, unsubscribe?: Unsubscribe): void;
  predicate?(data: DataStoreState): boolean;
  disableDiffing?: boolean;
}

export interface DataStore {
  reset(): void;
  dispatch(action: Action): void;
  listen(listener: DataStoreListener): Unsubscribe;
}

class DataStoreImpl implements DataStore {
  private store = createStore(
    combineReducers({
      auth
    })
  );

  reset(): void {
    this.store.dispatch({ root: ACTION_ROOT.RESET, type: ACTION_ROOT.RESET });
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  listen(listener: DataStoreListener): Unsubscribe {
    let currentState = null;
    let getState = (data): DataStoreState | undefined => {
      switch (listener.actionType) {
        case ACTION_ROOT.AUTH:
          return data.auth as Auth;
        default:
          return undefined;
      }
    };
    let unsubscribe = this.store.subscribe(() => {
      let data = getState(this.store.getState());
      if(!data) return;
      if (!listener.disableDiffing && currentState === data.state) return;
      if (listener.predicate?.(data)) return;
      currentState = data.state;
      listener.callback(data, unsubscribe);
    });
    return unsubscribe;
  }
}

export const ApplicationStore = new DataStoreImpl();
