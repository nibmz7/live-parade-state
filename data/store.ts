import { createStore, combineReducers } from 'redux';
import { Action } from './actions/actions';
import { auth } from '../data/reducers/auth_reducer';


export const store = createStore(
  combineReducers({
    auth
  })
);

export const dispatch = (action: Action) => {
  store.dispatch(action);
};
