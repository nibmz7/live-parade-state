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

@customElement('admin-view')
export default class AdminView extends LitElement {
  private departments: Array<Department> = [];
  private usersByDepartment: UsersByDepartment = {};
  private adminManager = new MockAdminManager();
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;

  static get properties() {
    return {
      departments: { type: Array }
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

  render() {
    const userTemplate = (user: User) => html`
      <div class="list-item">
        <p id="primary-text">${user.fullname}</p>
        <p id="secondary-text">${user.email}</p>
      </div>
    `;

    const departmentTemplate = (department: Department) =>
      html`
        <div class="department">
          <div class="header">
            <h3>${department.name}</h3>
            <button id="edit" plain>edit</button>
          </div>
          <div class="users card">
            <button id="add" plain>Add user</button>
            <div id="list">
              ${this.usersByDepartment[department.id].map(userTemplate)}
            </div>
          </div>
        </div>
      `;
    return html`<div id="root">
      ${this.departments.map(departmentTemplate)}
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          padding: 8px;
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
          border-radius: 15px;
          border-bottom: 2px dashed var(--color-primary);
        }

        .users.empty #add {
          border-bottom: none;
        }
      `
    ];
  }
}
