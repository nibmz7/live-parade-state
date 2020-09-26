import { LitElement, html, customElement, css } from 'lit-element';
import { Unsubscribe } from 'redux';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import { UserStoreState } from '../../data/states/user_state';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import Department from '../../model/department';
import User from '../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';
import { ACTION_TYPE } from '../../data/data_manager';
import Admin from '../../model/admin';
import '../dialogs/edit_department';
import '../dialogs/edit_user';
import { onPressed } from '../utils';

interface UserItem extends User {
  index?: number;
  removed?: boolean;
}
@customElement('admin-view')
export default class AdminView extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;
  private branch = (ApplicationStore.getAuth().action.payload as Admin).branch;
  private adminManager = new MockAdminManager();
  private departments: Array<Department> = [];
  private usersByDepartment: {
    [departmentId: string]: {
      items: { [userid: string]: UserItem };
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
      usersByDepartment: { type: Object },
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
        if (
          type === ACTION_TYPE.INITIALIZED ||
          type === ACTION_TYPE.ADDED ||
          type === ACTION_TYPE.MODIFIED ||
          type === ACTION_TYPE.REMOVED
        ) {
          this.departments = state.items;
        }
      }
    );
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      (state: UserStoreState) => {
        let type = state.action.type;
        switch (type) {
          case ACTION_TYPE.INITIALIZED: {
            for (const [departmentid, userArray] of Object.entries(
              state.items
            )) {
              const users = {};
              for (const user of userArray) {
                users[user.uid] = user;
              }
              this.usersByDepartment[departmentid] = {
                items: users,
                size: userArray.length
              };
            }
            break;
          }
          case ACTION_TYPE.ADDED: {
            break;
          }
          case ACTION_TYPE.MODIFIED: {
            break;
          }
          case ACTION_TYPE.REMOVED: {
            const user = state.action.payload as User;
            const users = this.usersByDepartment[user.departmentid];
            this.usersByDepartment = {
              ...this.usersByDepartment,
              [user.departmentid]: {
                items: {
                  ...users.items,
                  [user.uid]: {
                    ...user,
                    removed: true
                  }
                },
                size: users.size - 1
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
    const userTemplate = (department: Department, user: UserItem) => {
      return html`
        <div
          id="${user.uid}"
          style="--offset-y:${user.index! * 3.5}rem;"
          tabindex="0"
          class="item selectable"
          ?removed="${user.removed}"
          @click="${this.onEditUser(department, user)}"
          @keydown="${this.onEditUser(department, user)}"
        >
          <p id="primary-text">${user.fullname}</p>
          <p id="secondary-text">${user.email}</p>
        </div>
      `;
    };

    const departmentTemplate = (department: Department) => {
      const users = this.usersByDepartment[department.id];
      const length = users.size;
      const height = users.size * 3.5;
      return html`
        <div class="department">
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
              ${Object.values(users.items).map((user, index, userArray) => {
                if (index === 0) user.index = 0;
                else {
                  let prevUser = userArray[index - 1];
                  if (prevUser.removed) {
                    user.index = prevUser.index;
                  } else user.index = prevUser.index! + 1;
                }
                return userTemplate(department, user);
              })}
            </div>
          </div>
        </div>
      `;
    };
    return html`<div id="root">
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
          padding: 8px 30px 80px 30px;
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
          transition: background-color 0.3s, transform 0.3s, padding-top 0.3s,
            padding-bottom 0.3s, opacity 0.3s;
          cursor: pointer;
        }

        .item[removed] {
          padding: 0rem 15px;
          opacity: 0;
        }

        .item:last-child {
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

        .item #primary-text[regular] {
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
