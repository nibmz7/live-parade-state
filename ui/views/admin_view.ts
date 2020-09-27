import { LitElement, html, customElement, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Unsubscribe } from 'redux';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import {
  UsersByDepartment,
  UserStoreState
} from '../../data/states/user_state';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import Department from '../../model/department';
import User from '../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';
import { ACTION_TYPE } from '../../data/data_manager';
import Admin from '../../model/admin';
import '../dialogs/edit_department';
import '../base/welcome_text';
import '../dialogs/edit_user';
import { onPressed } from '../utils';

@customElement('admin-view')
export default class AdminView extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;
  private branch = (ApplicationStore.getAuth().action.payload as Admin).branch;
  private adminManager = new MockAdminManager();
  private departments: Array<Department> = [];
  private users: UsersByDepartment = {};
  private listState: {
    [departmentId: string]: {
      items: {
        [userid: string]: {
          index: number;
          type: ACTION_TYPE;
        };
      };
      size: number;
    };
  } = {};
  private selectedDepartment?: Department;
  private showEditDepartment: Boolean = false;
  private selectedUser?: User;
  private selectedUserDepartment?: Department;
  private showEditUser = false;

  static get properties() {
    return {
      departments: { type: Array },
      users: { type: Object },
      listState: { type: Object },
      selectedDepartment: { type: Object },
      showEditDepartment: { type: Boolean },
      selectedUser: { type: Object },
      selectedUserDepartment: { type: Object },
      showEditUser: { type: Boolean }
    };
  }

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
              this.listState[item.id] = { items: {}, size: 0 };
            });
            break;
          }
          case ACTION_TYPE.ADDED: {
            const department = state.action.payload as Department;
            this.departments = state.items;
            this.listState = {
              ...this.listState,
              [department.id]: { items: {}, size: 0 }
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
                size: userArray.length
              };
            }
            this.users = state.items;
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
                size: departmentUsers.length
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
                size: departmentUsers.length
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
                size: departmentUsers.length - 1
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

  onEditDepartment(department?: Department) {
    return onPressed(() => {
      this.showEditDepartment = true;
      this.selectedDepartment = department;
    });
  }

  onEditUser(department: Department, user?: User) {
    return onPressed(() => {
      this.selectedUser = user;
      this.selectedUserDepartment = department;
      this.showEditUser = true;
    });
  }

  render() {
    const userTemplate = (
      department: Department,
      user: User,
      length: number
    ) => {
      const itemState = this.listState[department.id].items[user.uid];
      return html`
        <div
          style="--offset-y:${itemState.index * 3.5}rem;"
          tabindex="0"
          class="item selectable"
          ?regular="${user.regular}"
          ?added="${itemState.type === ACTION_TYPE.ADDED}"
          ?modified="${itemState.type === ACTION_TYPE.MODIFIED}"
          ?removed="${itemState.type === ACTION_TYPE.REMOVED}"
          ?last="${itemState.index === length - 1}"
          @click="${this.onEditUser(department, user)}"
        >
          <p id="primary-text">${user.fullname}</p>
          <p id="secondary-text">${user.email}</p>
        </div>
      `;
    };

    const departmentTemplate = (department: Department) => {
      const users = this.users[department.id];
      const length = this.listState[department.id].size;
      const height = length * 3.5;
      return html`
        <div class="department" id="${department.id}">
          <div class="header">
            <h3>${department.name}</h3>
            <button
              id="edit"
              plain
              @click="${this.onEditDepartment(department)}"
            >
              edit
            </button>
          </div>
          <div class="users card" ?empty="${length === 0}">
            <button id="add" plain @click="${this.onEditUser(department)}">
              Add user
            </button>
            <div id="list" style="height:${height}rem;">
              ${repeat(
                users,
                (user) => user.uid,
                (user) => userTemplate(department, user, length)
              )}
            </div>
          </div>
        </div>
      `;
    };
    return html` <div id="root">
      <welcome-text>Hi, admin user!</welcome-text>

      <div class="departments">${this.departments.map(departmentTemplate)}</div>

      <button id="add-department" solid @click="${this.onEditDepartment()}">
        Add department
      </button>

      ${this.showEditDepartment
        ? html`<edit-department
            .department=${this.selectedDepartment}
            ?editing="${this.selectedDepartment}"
            @close="${(e: Event) => {
              e.stopPropagation();
              this.showEditDepartment = false;
              this.selectedDepartment = undefined;
            }}"
          ></edit-department>`
        : ''}
      ${this.showEditUser
        ? html`
            <edit-user
              .branch=${this.branch}
              .department=${this.selectedUserDepartment}
              .user=${this.selectedUser}
              ?editing=${this.selectedUser}
              @close="${(e: Event) => {
                e.stopPropagation();
                this.showEditUser = false;
                this.selectedUser = undefined;
              }}"
            ></edit-user>
          `
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

        .departments {
          overflow-y: auto;
          max-height: 99%;
          padding: 30px 30px 80px 30px;
          box-sizing: border-box;
        }

        .department {
          margin-bottom: 20px;
        }

        .department:last-of-type {
          margin-bottom: 0px;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
        }

        .header h3 {
          color: #828282;
          text-transform: capitalize;
          font-weight: 500;
          margin: 0;
        }

        .header #edit {
          font-size: 1.3rem;
        }

        .users {
          border-radius: 15px;
        }

        .users #add {
          font-size: 1.3rem;
          border-bottom: 2px dashed var(--color-primary);
          border-radius: 15px 15px 0 0;
        }

        .users[empty] #add {
          border-bottom: none;
          border-radius: 15px;
        }

        .users > #list {
          position: relative;
          transition: height 0.3s;
        }

        .item {
          width: 100%;
          position: absolute;
          box-sizing: border-box;
          height: 3.5rem;
          padding: 0.65rem 15px;
          opacity: 1;
          transform: translateY(var(--offset-y));
          transition: all 0.3s;
          cursor: pointer;
        }

        .item[added] {
          animation: item-appear-in 0.3s;
        }

        .item[modified] {
          animation: flash 1s 2;
        }

        @keyframes item-appear-in {
          from {
            opacity: 0;
            padding: 0rem 15px;
          }
          to {
            opacity: 1;
            padding: 0.65rem 15px;
          }
        }

        @keyframes flash {
          0% {
            background-color: white;
          }
          50% {
            background-color: rgba(255, 56, 56, 0.18);
          }
          100% {
            background-color: white;
          }
        }

        .item[removed] {
          padding: 0rem 15px;
          opacity: 0;
        }

        .item[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .item > p {
          margin: 0;
        }

        .item #primary-text {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
        }

        .item[regular] #primary-text {
          color: var(--color-primary);
        }

        .item #secondary-text {
          color: #878787;
          font-size: 0.8rem;
          line-height: 1rem;
          font-weight: 400;
        }

        .item:focus,
        .item:active {
          background-color: rgba(0, 0, 0, 0.1);
        }

        @media (hover: hover) {
          .item:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      `
    ];
  }
}
