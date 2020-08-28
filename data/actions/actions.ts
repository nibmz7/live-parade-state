export enum ACTION_ROOT {
  AUTH,
  DEPARTMENTS,
  USERS
}

export interface Action {
  root: ACTION_ROOT;
  type: any;
}
