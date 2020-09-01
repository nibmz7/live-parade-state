import { createStore, combineReducers, Unsubscribe } from 'redux';
import { auth } from '../data/reducers/auth_reducer';
import { department } from '../data/reducers/department_reducer';

export enum ACTION_ROOT {
  RESET,
  AUTH,
  DEPARTMENTS,
  USERS,
  ALL
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

export type Predicate = (data: DataStoreState) => boolean;

export type DataStoreListener = (data: any, unsubscribe: Unsubscribe) => void;

export interface DataStore {
  reset(): void;
  dispatch(action: Action): void;
  listen(
    actionType: ACTION_ROOT,
    listener: DataStoreListener,
    predicate?: Predicate
  ): Unsubscribe;
}

let action_uuid: number = 1000;
export const generateActionId = (): number => action_uuid++;

class DataStoreImpl implements DataStore {
  private store = createStore(
    combineReducers({
      auth,
      department
    })
  );

  reset(): void {
    this.store.dispatch({
      id: 0,
      root: ACTION_ROOT.RESET,
      type: ACTION_ROOT.RESET
    });
    action_uuid = 1000;
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  listen(
    actionType: ACTION_ROOT,
    listener: DataStoreListener,
    predicate?: Predicate
  ): Unsubscribe {
    let currentActionId: ACTION_ID = 0;
    let getState = (data) => {
      switch (actionType) {
        case ACTION_ROOT.AUTH:
          return data.auth;
        case ACTION_ROOT.DEPARTMENTS:
          return data.department;
        default:
          return data;
      }
    };
    const handleChange = () => {
      let data = getState(this.store.getState());
      if (!data || currentActionId === data?.action?.id) return;
      if (predicate?.(data)) return;
      currentActionId = data?.action?.id;
      listener(data, unsubscribe);
    };
    let unsubscribe = this.store.subscribe(handleChange);
    return unsubscribe;
  }

  getState() {
    return this.store.getState();
  }
}

export const ApplicationStore = new DataStoreImpl();
