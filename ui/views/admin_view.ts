import { LitElement, html, customElement, css } from 'lit-element';
import { Unsubscribe } from 'redux';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import Department from '../../model/department';
import User from '../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';


@customElement('admin-view')
export default class AdminView extends LitElement {
  private departments: Array<Department> = [];
  //@ts-ignore
  private usersByDepartment: { [departmentId: string]: User } = {};
  private adminManager = new MockAdminManager();
  private unsubscribe?: Unsubscribe;

  static get properties() {
    return {
      departments: { type: Array }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      (state: DepartmentStoreState) => {
        this.departments = state.items;
      }
    );
    this.adminManager.subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.adminManager.unsubscribe();
    this.unsubscribe?.();
  }

  render() {
    const department = (item: Department) => {
      
      return html`
      <div class="department">
        <div class="header">
          <h3>${item.name}</h3>
          <button id="edit" plain>edit</button>
        </div>
        <div class="users card">
          <button id="add" plain>Add user</button>
          <div id="list"></div>
        </div>
      </div>
    `};
    return html`<div id="root">
      ${this.departments.map((item) => department(item))}
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
