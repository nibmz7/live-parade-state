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
import { onPressed } from '../utils';
import '../dialogs/edit_department';

@customElement('admin-view')
export default class AdminView extends LitElement {
  private departments: Array<Department> = [];
  private usersByDepartment: UsersByDepartment = {};
  private adminManager = new MockAdminManager();
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;
  private selectedDepartment?: Department;
  private showEditDepartment: Boolean = false;

  static get properties() {
    return {
      departments: { type: Array },
      selectedDepartment: { type: Object },
      showEditDepartment: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      (state: DepartmentStoreState) => {
        this.departments = state.items;
      }
    );
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      (state: UserStoreState) => {
        this.usersByDepartment = state.items;
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

  private onEditDepartment = onPressed(() => {
    this.showEditDepartment = true;
  });

  render() {
    const userTemplate = (user: User) => html`
      <div class="item">
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
              @click="${(e: Event) => {
                this.selectedDepartment = department;
                this.onEditDepartment(e);
              }}"
            >
              edit
            </button>
          </div>
          <div
            class="users card"
            ?empty="${this.usersByDepartment[department.id].length === 0}"
          >
            <button id="add" plain>Add user</button>
            <div id="list">
              ${this.usersByDepartment[department.id].map(userTemplate)}
            </div>
          </div>
        </div>
      `;
    return html`<div id="root">
      ${this.departments.map(departmentTemplate)}

      <button id="add-department" solid @click="${this.onEditDepartment}">
        Add department
      </button>

      ${this.showEditDepartment
        ? html`<edit-department
            .department=${this.selectedDepartment}
            ?editing="${this.selectedDepartment}"
            @close="${() => {
              this.showEditDepartment = false;
              this.selectedDepartment = undefined;
            }}"
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
          padding: 8px 30px;
          position: relative;
          box-sizing: border-box;
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
