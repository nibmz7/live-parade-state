import { html, customElement } from 'lit-element';
import MockAdminManager from '../../../data-mock/mock_admin_manager';
import { ApplicationStore } from '../../../data/store';
import Department from '../../../model/department';
import Admin from '../../../model/admin';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_dep_item';
import './request_log';
import DepList from '../../base/dep_list';

@customElement('admin-dep-list')
export default class AdminDepList extends DepList {
  private branch = (ApplicationStore.getAuth().action.payload as Admin).branch;
  private adminManager = new MockAdminManager();

  connectedCallback() {
    super.connectedCallback();
    this.adminManager.subscribe();
  }

  cleanup() {
    this.adminManager.unsubscribe();
  }

  depItemTemplate = (department: Department) =>
    html`<admin-dep-item
      .branch="${this.branch}"
      .department="${department}"
      .users="${this.users[department.id] || []}"
      .listState="${this.listState[department.id] || {
        items: {},
        length: 0
      }}"
      @user-removed="${this.onUserRemoved}"
    ></admin-dep-item>`;
}
