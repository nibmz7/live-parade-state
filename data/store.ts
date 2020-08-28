import { createStore, combineReducers } from 'redux';

export enum ACTION_ROOT {
    AUTH,
    DEPARTMENTS,
    USERS
}

export interface Action {
    root: ACTION_ROOT;
}

const store = createStore();

export default store;