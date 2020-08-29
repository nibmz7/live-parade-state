import { createStore, combineReducers, Unsubscribe } from 'redux';
import { auth } from '../data/reducers/auth_reducer';

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
  callback(data: DataStoreState, unsubscribe?: Unsubscribe): void;
  getState(data: any): DataStoreState;
  predicate?(data: DataStoreState): boolean;
  diffing: boolean;
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
    this.store.dispatch({ root: ACTION_ROOT.RESET, type: undefined });
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  listen(listener: DataStoreListener): Unsubscribe {
    let currentState = null;
    let unsubscribe = this.store.subscribe(() => {
      let data = listener.getState(this.store.getState());
      if (listener.diffing) {
        if (currentState === data.state) return;
        currentState = data.state;
      }
      if (listener.predicate) {
        if (listener.predicate(data)) return;
      }
      listener.callback(data, unsubscribe);
    });
    return unsubscribe;
  }
}

export const ApplicationStore = new DataStoreImpl();
