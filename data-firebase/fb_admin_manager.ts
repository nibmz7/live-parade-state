import { ACTION_TYPE, DataResults } from '../data/data_manager';
import {
  DepartmentAction,
  DepartmentActionError,
  DepartmentStoreState
} from '../data/states/department_state';
import Department from '../model/department';
import {
  UserAction,
  UserActionError,
  UserStoreState
} from '../data/states/user_state';
import User, { UserBase } from '../model/user';
import AdminManager from '../data/admin_manager';
import { Action, ActionError, ApplicationStore } from '../data/store';
import ACTION_USER from '../data/actions/user_action';
import ACTION_DEPARTMENT from '../data/actions/department_action';
import FirestoreDBListener from './fb_db_listener';

export default class FBAdminManager extends AdminManager {
  private db!: firebase.firestore.Firestore;
  private functions!: firebase.functions.Functions;
  private repositoryUnsubscribe?: any;

  unsubscribe() {
    super.unsubscribe();
    this.repositoryUnsubscribe?.();
  }

  protected async connectDB(): Promise<DataResults> {
    //@ts-ignore
    //prettier-ignore
    await import(/* webpackIgnore: true */ '/__/firebase/7.22.1/firebase-functions.js');
    this.functions = window.firebase.app().functions('asia-northeast1');
    return FirestoreDBListener(this);
  }

  private onSucess(action: Action, isDepartment = false) {
    const success = isDepartment
      ? ACTION_DEPARTMENT.requestSuccessful(action as DepartmentAction)
      : ACTION_USER.requestSuccessful(action as UserAction);
    ApplicationStore.dispatch(success);
  }

  private onError(action: ActionError, isDepartment = false) {
    const error = isDepartment
      ? ACTION_DEPARTMENT.requestError(action as DepartmentActionError)
      : ACTION_USER.requestError(action as UserActionError);
    ApplicationStore.dispatch(error);
  }

  protected requestAddDepartment(state: DepartmentStoreState): void {
    const action = state.action;
    const department = action.payload as Department;
    const collectionRef = `branches/${this.branch.id}/repository`;
    const data = { type: 'department', name: department.name };
    this.db
      .collection(collectionRef)
      .add(data)
      .then(() => this.onSucess(action, true))
      .catch(() => {
        const actionError: DepartmentActionError = {
          action,
          type: 'Modify department failed',
          message: `Failed to change department '${department.name}' name`
        };
        this.onError(actionError, true);
      });
  }

  protected requestModifyDepartment(state: DepartmentStoreState): void {
    const action = state.action;
    const department = action.payload as Department;
    const docRef = `branches/${this.branch.id}/repository/${department.id}`;
    this.db
      .doc(docRef)
      .update({ 'name': department.name })
      .then(() => this.onSucess(action, true))
      .catch(() => {
        const actionError: DepartmentActionError = {
          action,
          type: 'Modify department failed',
          message: `Failed to change department '${department.name}' name`
        };
        this.onError(actionError, true);
      });
  }

  protected requestRemoveDepartment(state: DepartmentStoreState): void {
    const department = state.action.payload as Department;
    this.departmentOnChange(department, ACTION_TYPE.REMOVED);
    const users = ApplicationStore.users.sortedUsers.filter(
      (user) => user.departmentid !== department.id
    );
    const initalizeUsers = ACTION_USER.initialized(users);
    const success = ACTION_DEPARTMENT.requestSuccessful(state.action);
    ApplicationStore.dispatch(initalizeUsers);
    ApplicationStore.dispatch(success);
    const removeDepFunc = this.functions.httpsCallable('deleteDepartment');
    removeDepFunc({ departmentid: department.id });
  }

  protected requestAddUser(state: UserStoreState): void {
    const action = state.action;
    const userBase = action.payload as UserBase;
    const userExists = ApplicationStore.users.sortedUsers.find(
      (item) => item.email === userBase.email
    );
    if (userExists) {
      const actionError: UserActionError = {
        action,
        type: 'email unavailable',
        message: `The email ${userBase.email} has already been used`
      };
      this.onError(actionError);
      return;
    }

    //emailPrefix, password, name, rank, departmentid, regular
    const data = {
      emailPrefix: userBase.email.split('@')[0],
      password: userBase.password,
      name: userBase.name,
      rank: userBase.rank.text,
      departmentid: userBase.departmentid,
      regular: userBase.regular
    };

    const createUserFunc = this.functions.httpsCallable('createUser');
    createUserFunc(data)
      .then(() => this.onSucess(action))
      .catch(() => {
        const actionError: UserActionError = {
          action,
          type: 'Adding user failed',
          message: `Failed to add user '${userBase.name}'`
        };
        this.onError(actionError);
      });
  }

  private changePassword(action: UserAction, user): void {
    const updatePasswordFunc = this.functions.httpsCallable('updatePassword');
    updatePasswordFunc({ uid: user.uid, password: user.password })
      .then(() => this.onSucess(action))
      .catch(() => {
        const actionError: UserActionError = {
          action,
          type: 'Updating user password failed',
          message: `Failed to update '${user.name} password'`
        };
        this.onError(actionError);
      });
  }

  protected requestModifyUser(state: UserStoreState): void {
    const action = state.action;
    const user = action.payload as User;
    if (user.password) {
      this.changePassword(action, user);
      return;
    }
    //uid, emailPrefix, name, rank, departmentid, regular
    const data = {
      uid: user.uid,
      emailPrefix: user.email.split('@')[0],
      name: user.name,
      rank: user.rank.text,
      departmentid: user.departmentid,
      regular: user.regular
    };
    const updateUserFunc = this.functions.httpsCallable('updateUser');
    updateUserFunc(data)
      .then(() => this.onSucess(action))
      .catch(() => {
        const actionError: UserActionError = {
          action,
          type: 'Updating user failed',
          message: `Failed to update user '${user.name}'`
        };
        this.onError(actionError);
      });
  }

  protected requestRemoveUser(state: UserStoreState): void {
    const action = state.action;
    const user = action.payload as User;
    const data = { departmentid: user.departmentid, uid: user.uid };
    let deleteUserFunc = this.functions.httpsCallable('deleteUser');
    deleteUserFunc(data)
      .then(() => this.onSucess(action))
      .catch(() => {
        const actionError: UserActionError = {
          action,
          type: 'Removing user failed',
          message: `Failed to delete user '${user.name}'`
        };
        this.onError(actionError);
      });
  }
}
