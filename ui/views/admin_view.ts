import { LitElement, html, customElement, css } from 'lit-element';
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
import '../dialogs/edit_user';

@customElement('admin-view')
export default class AdminView extends LitElement {
  private adminManager = new MockAdminManager();
  private departments: Array<Department> = [];
  private usersByDepartment: UsersByDepartment = {};
  private selectedDepartment?: Department;
  private showEditDepartment: Boolean = false;
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;
  private branch = (ApplicationStore.getAuth().action.payload as Admin).branch;
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
        if (
          type === ACTION_TYPE.INITIALIZED ||
          type === ACTION_TYPE.ADDED ||
          type === ACTION_TYPE.MODIFIED ||
          type === ACTION_TYPE.REMOVED
        ) {
          this.usersByDepartment = state.items;
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
    this.showEditDepartment = true;
    this.selectedDepartment = department;
  }

  render() {
    const userTemplate = (department: Department, user: User) => html`
      <div
        class="item"
        @click="${() => {
          this.selectedUser = user;
          this.selectedUserDepartment = department;
          this.showEditUser = true;
        }}"
      >
        <p id="primary-text">${user.fullname}</p>
        <p id="secondary-text">${user.email}</p>
      </div>
    `;

    const departmentTemplate = (department: Department) =>
      html`
        <div class="department">
          <div class="header">
            <h3>${department.name}</h3>
            <button
              id="edit"
              plain
              @click="${() => this.onEditDepartment(department)}"
            >
              edit
            </button>
          </div>
          <div
            class="users card"
            ?empty="${this.usersByDepartment[department.id]?.length > 0 ===
            false}"
          >
            <button id="add" plain>Add user</button>
            <div id="list">
              ${this.usersByDepartment[department.id]?.map((user) =>
                userTemplate(department, user)
              )}
            </div>
          </div>
        </div>
      `;
    return html`<div id="root">
      <div class="departments">${this.departments.map(departmentTemplate)}</div>

      <button
        id="add-department"
        solid
        @click="${() => this.onEditDepartment()}"
      >
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

        .item {
          padding: 10px 15px;
          transition: background-color 0.3s;
          cursor: pointer;
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
        }

        .item #primary-text[regular] {
          color: var(--color-primary);
        }

        .item #secondary-text {
          color: #878787;
          font-size: 0.8rem;
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
