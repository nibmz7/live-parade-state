import { LitElement, html, customElement, css } from 'lit-element';
import { Unsubscribe } from 'redux';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import Department from '../../model/department';
import { buttonStyles, globalStyles } from '../global_styles';

@customElement('admin-view')
export default class AdminView extends LitElement {
  private departments: Array<Department> = [];
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
    const department = (item: Department) => html`
      <div class="department">
        <div class="header">
          <h3>${item.name}</h3>
          <button plain>edit</button>
        </div>
        <div class="users">
          <button plain>Add user</button>
          <div id="list"></div>
        </div>
      </div>
    `;
    return html`<div id="root">
      ${this.departments.map((item) => department(item))}
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
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
      `
    ];
  }
}
