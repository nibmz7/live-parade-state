import { createStore, combineReducers, Unsubscribe } from 'redux';
import { auth } from '../data/reducers/auth_reducer';
import { AuthStoreState } from './states/auth_state';

export enum ACTION_ROOT {
  RESET,
  AUTH,
  DEPARTMENTS,
  USERS
}

export type ACTION_ID = string | number;

export interface Action {
  id: ACTION_ID;
  root: ACTION_ROOT;
  type: any;
}

export interface ActionError {
  action: Action;
  type: string;
  message: string;
}

export interface DataStoreState {
  action: Action;
}

export interface DataStoreListener {
  actionType: ACTION_ROOT;
  callback(data: DataStoreState, unsubscribe?: Unsubscribe): void;
  predicate?(data: DataStoreState): boolean;
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
    this.store.dispatch({
      id: 0,
      root: ACTION_ROOT.RESET,
      type: ACTION_ROOT.RESET
    });
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  listen(listener: DataStoreListener): Unsubscribe {
    let currentActionId: ACTION_ID = 0;
    let getState = (data): DataStoreState | undefined => {
      switch (listener.actionType) {
        case ACTION_ROOT.AUTH:
          return data.auth as AuthStoreState;
        default:
          return undefined;
      }
    };
    let unsubscribe = this.store.subscribe(() => {
      let data = getState(this.store.getState());
      if (!data) return;
      if (currentActionId === data.action.id) return;
      if (listener.predicate?.(data)) return;
      currentActionId = data.action.id;
      listener.callback(data, unsubscribe);
    });
    return unsubscribe;
  }
}

export const ApplicationStore = new DataStoreImpl();
