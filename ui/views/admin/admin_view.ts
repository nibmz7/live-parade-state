import {
  LitElement,
  html,
  customElement,
  css,
  query,
  property
} from 'lit-element';
import { Unsubscribe } from 'redux';
import MockAdminManager from '../../../data-mock/mock_admin_manager';
import { DepartmentStoreState } from '../../../data/states/department_state';
import {
  UsersByDepartment,
  UserStoreState
} from '../../../data/states/user_state';
import {
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener
} from '../../../data/store';
import Department from '../../../model/department';
import User from '../../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { ACTION_TYPE, REQUEST_TYPES } from '../../../data/data_manager';
import Admin from '../../../model/admin';
import { ListState } from './admin_department';
import { onPressed } from '../../utils';
import { shouldElevate } from '../../base/welcome_text';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_department';
import './request_log';

@customElement('admin-view')
export default class AdminView extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;
  private branch = (ApplicationStore.getAuth().action.payload as Admin).branch;
  private adminManager = new MockAdminManager();

  @query('#department-list') _departmentsList!: HTMLElement;
  @query('welcome-text') _welcomeText!: HTMLElement;

  @property({ type: Boolean }) showAddDepartment = false;
  @property({ type: Array }) departments: Array<Department> = [];
  @property({ type: Object }) users: UsersByDepartment = {};
  @property({ type: Object }) listState: {
    [departmentId: string]: ListState;
  } = {};

  private departmentsListener: DataStoreListener = (
    state: DepartmentStoreState
  ) => {
    const type = state.action.type;
    if (REQUEST_TYPES.includes(type)) return;
    this.departments = state.items;
    if (type === ACTION_TYPE.REMOVED) {
      const department = state.action.payload as Department;
      const { [department.id]: value, ...listState } = this.listState;
      this.listState = listState;
    }
  };

  private updateListState(departmentid: string, users: Array<User>) {
    const items = {};
    const length = users.length;
    users.map((item, index) => {
      const type = ACTION_TYPE.INITIALIZED;
      items[item.uid] = { index, type };
    });
    this.listState = {
      ...this.listState,
      [departmentid]: {
        items,
        length
      }
    };
  }

  private usersListener: DataStoreListener = async (state: UserStoreState) => {
    const type = state.action.type;
    if (REQUEST_TYPES.includes(type)) return;
    this.users = state.items;

    if (type === ACTION_TYPE.INITIALIZED) {
      for (const [departmentid, userArray] of Object.entries(state.items)) {
        this.updateListState(departmentid, userArray);
      }
      return;
    }

    const user = state.action.payload as User;
    const departmentid = user.departmentid;
    const userArray = state.items[user.departmentid].slice();

    switch (type) {
      case ACTION_TYPE.ADDED: {
        this.updateListState(departmentid, userArray);
        this.listState[departmentid].items[user.uid].type = ACTION_TYPE.ADDED;
        break;
      }
      case ACTION_TYPE.MODIFIED: {
        await new Promise((resolve) => requestAnimationFrame(() => resolve()));
        this.updateListState(departmentid, userArray);
        this.listState[departmentid].items[user.uid].type =
          ACTION_TYPE.MODIFIED;
        break;
      }
      case ACTION_TYPE.REMOVED: {
        const userState = this.listState[departmentid].items[user.uid];
        this.updateListState(departmentid, userArray);
        userArray.splice(userState.index, 0, user);
        userState.type = ACTION_TYPE.REMOVED;
        this.listState[departmentid].items[user.uid] = userState;
        break;
      }
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      this.departmentsListener
    );
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      this.usersListener
    );
    this.adminManager.subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.adminManager.unsubscribe();
    this.departmentsUnsubscribe?.();
    this.usersUnsubscribe?.();
  }

  onAddDepartment() {
    return onPressed(() => {
      this.showAddDepartment = true;
    });
  }

  closeAddDepartment() {
    this.showAddDepartment = false;
  }

  onUserRemoved(e: Event) {
    const { departmentid, userid } = (e as CustomEvent).detail;
    const userArray = this.users[departmentid].filter(
      (user) => user.uid != userid
    );
    this.updateListState(departmentid, userArray);
    this.users = {
      ...this.users,
      [departmentid]: userArray
    };
  }

  render() {
    const departmentTemplate = (department: Department) => {
      return html`<admin-department
        .branch="${this.branch}"
        .department="${department}"
        .users="${this.users[department.id] || []}"
        .listState="${this.listState[department.id] || {
          items: {},
          length: 0
        }}"
        @user-removed="${this.onUserRemoved}"
      ></admin-department>`;
    };

    return html`<div id="root">
      <welcome-text>Hi, admin user!</welcome-text>

      <div
        id="department-list"
        @scroll="${shouldElevate(this._welcomeText, this._departmentsList)}"
      >
        ${this.departments.map(departmentTemplate)}
      </div>

      <button id="add-department" solid @click="${this.onAddDepartment()}">
        Add department
      </button>

      <request-log></request-log>

      ${this.showAddDepartment
        ? html`<edit-department
            @close="${this.closeAddDepartment}"
          ></edit-department>`
        : ''}
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          height: 100%;
          width: 100%;
          position: relative;
        }

        #add-department {
          position: absolute;
          bottom: 10px;
          left: 0px;
          right: 0px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.1rem;
          padding: 15px 50px;
          border-radius: 50px;
          font-weight: 500;
        }

        #department-list {
          max-height: 99%;
          overflow-x: hidden;
          overflow-y: scroll;
          box-sizing: border-box;
          padding: 30px 30px 80px 30px;
        }

        #department-list::-webkit-scrollbar {
          display: none;
        }

        admin-department {
          margin-bottom: 20px;
        }

        admin-department:last-of-type {
          margin-bottom: 0px;
        }
      `
    ];
  }
}
