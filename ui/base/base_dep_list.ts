import {
  LitElement,
  html,
  css,
  query,
  property,
  TemplateResult,
  eventOptions
} from 'lit-element';
import ACTION_AUTH from '../../data/actions/auth_action';
import { ACTION_TYPE, REQUEST_TYPES } from '../../data/data_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import {
  UsersByDepartment,
  UserStoreState
} from '../../data/states/user_state';
import {
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener
} from '../../data/store';
import Admin from '../../model/admin';
import Department from '../../model/department';
import User from '../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';
import { ListState } from './base_user_list';

export default abstract class BaseDepList extends LitElement {
  private welcomeTitle!: string;

  @query('#department-list') _departmentsList!: HTMLElement;
  @query('welcome-text') _welcomeText!: HTMLElement;

  @eventOptions({ passive: true }) _handleOnScroll() {
    this.elevate = this._departmentsList.scrollTop > 0;
  }

  @property({ type: Array }) departments: Array<Department> = [];
  @property({ type: Boolean }) elevate = false;
  @property({ type: Object }) user!: User;
  @property({ type: Object }) admin!: Admin;
  @property({ type: Object }) users: UsersByDepartment = {};
  @property({ type: Object }) listState: {
    [departmentId: string]: ListState;
  } = {};


  abstract depItemTemplate(department: Department): TemplateResult;
  abstract cleanup(): void;

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
    this.welcomeTitle = this.admin
      ? 'Hi, admin user!'
      : `Hi, ${this.user.fullname}!`;
    const departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      this.departmentsListener
    );
    const usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      this.usersListener
    );
    this.addEventListener('signed-out', () => {
      departmentsUnsubscribe();
      usersUnsubscribe();
      this.cleanup();
      const action = ACTION_AUTH.requestSignOut();
      ApplicationStore.dispatch(action);
    });
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
    return html`<div id="root">
      <welcome-text .elevate="${this.elevate}">
        ${this.welcomeTitle}
      </welcome-text>

      <div id="department-list" @scroll="${this._handleOnScroll}">
        ${this.departments.map(this.depItemTemplate)}
      </div>

      ${this.departments.length === 0
        ? html`<p class="empty">No departments found</p>`
        : ''}

      <slot></slot>
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

        #department-list {
          max-height: 99.9%;
          overflow-x: hidden;
          overflow-y: scroll;
          box-sizing: border-box;
          padding: 0px 30px;
        }

        #department-list::-webkit-scrollbar {
          display: none;
        }

        #department-list > * {
          margin-bottom: 20px;
        }

        #department-list > *:first-child {
          margin-top: 30px;
        }

        #department-list > *:last-child {
          margin-bottom: 80px;
        }

        .empty {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `
    ];
  }
}
