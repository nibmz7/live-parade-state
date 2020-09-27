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
import { ACTION_ROOT, ApplicationStore } from '../../../data/store';
import Department from '../../../model/department';
import User from '../../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { ACTION_TYPE } from '../../../data/data_manager';
import Admin from '../../../model/admin';
import { ListState } from './admin_department';
import { onPressed } from '../../utils';
import { shouldElevate } from '../../base/welcome_text';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_department';

@customElement('admin-view')
export default class AdminView extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;
  private branch = (ApplicationStore.getAuth().action.payload as Admin).branch;
  private adminManager = new MockAdminManager();

  @query('#department-list') _departmentsList;
  @query('welcome-text') _welcomeText;

  @property({ type: Boolean }) showAddDepartment = false;
  @property({ type: Array }) departments: Array<Department> = [];
  @property({ type: Object }) users: UsersByDepartment = {};
  @property({ type: Object }) listState: {
    [departmentId: string]: ListState;
  } = {};

  connectedCallback() {
    super.connectedCallback();
    this.departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      (state: DepartmentStoreState) => {
        let type = state.action.type;
        switch (type) {
          case ACTION_TYPE.INITIALIZED: {
            this.departments = state.items;
            this.departments.map((item) => {
              this.users[item.id] = [];
              this.listState[item.id] = { items: {}, length: 0 };
            });
            break;
          }
          case ACTION_TYPE.ADDED: {
            const department = state.action.payload as Department;
            this.departments = state.items;
            this.listState = {
              ...this.listState,
              [department.id]: { items: {}, length: 0 }
            };
            this.users = {
              ...this.users,
              [department.id]: []
            };
            break;
          }
          case ACTION_TYPE.MODIFIED: {
            this.departments = state.items;
            break;
          }
          case ACTION_TYPE.REMOVED: {
            const department = state.action.payload as Department;
            const { [department.id]: value, ...listState } = this.listState;
            this.listState = listState;
            this.departments = state.items;
            break;
          }
        }
      }
    );

    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      async (state: UserStoreState) => {
        let type = state.action.type;
        switch (type) {
          case ACTION_TYPE.INITIALIZED: {
            for (const [departmentid, userArray] of Object.entries(
              state.items
            )) {
              const items = {};
              userArray.map((item, index) => {
                const type = ACTION_TYPE.INITIALIZED;
                items[item.uid] = { index, type };
              });
              this.listState[departmentid] = {
                items,
                length: userArray.length
              };
            }
            this.users = {
              ...this.users,
              ...state.items
            };
            break;
          }
          case ACTION_TYPE.ADDED: {
            const items = {};
            const user = state.action.payload as User;
            const departmentUsers = state.items[user.departmentid].slice();

            departmentUsers.map((item, index) => {
              const type =
                item.uid === user.uid
                  ? ACTION_TYPE.ADDED
                  : ACTION_TYPE.INITIALIZED;
              items[item.uid] = { index, type };
            });

            this.users = {
              ...this.users,
              [user.departmentid]: departmentUsers
            };

            this.listState = {
              ...this.listState,
              [user.departmentid]: {
                items,
                length: departmentUsers.length
              }
            };
            break;
          }
          case ACTION_TYPE.MODIFIED: {
            const items = {};
            const user = state.action.payload as User;
            const departmentUsers = state.items[user.departmentid].slice();

            departmentUsers.map((item, index) => {
              const type =
                item.uid === user.uid
                  ? ACTION_TYPE.MODIFIED
                  : ACTION_TYPE.INITIALIZED;
              items[item.uid] = { index, type };
            });

            this.users = {
              ...this.users,
              [user.departmentid]: departmentUsers
            };

            await new Promise((resolve) =>
              requestAnimationFrame(() => resolve())
            );

            this.listState = {
              ...this.listState,
              [user.departmentid]: {
                items,
                length: departmentUsers.length
              }
            };

            break;
          }
          case ACTION_TYPE.REMOVED: {
            const items = {};
            const user = state.action.payload as User;
            const userState = this.listState[user.departmentid].items[user.uid];
            const departmentUsers = state.items[user.departmentid].slice();

            departmentUsers.map((item, index) => {
              const type = ACTION_TYPE.INITIALIZED;
              items[item.uid] = { index, type };
            });
            departmentUsers.splice(userState.index, 0, user);

            items[user.uid] = {
              ...userState,
              type: ACTION_TYPE.REMOVED
            };

            this.users = {
              ...this.users,
              [user.departmentid]: departmentUsers
            };

            this.listState = {
              ...this.listState,
              [user.departmentid]: {
                items,
                length: departmentUsers.length - 1
              }
            };
          }
        }
      }
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

  render() {
    const departmentTemplate = (department: Department) => {
      return html`<admin-department
        .branch="${this.branch}"
        .department="${department}"
        .users="${this.users[department.id]}"
        .listState="${this.listState[department.id]}"
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
