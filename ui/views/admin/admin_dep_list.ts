import { html, customElement, property } from 'lit-element';
import MockAdminManager from '../../../data-mock/mock_admin_manager';
import Department from '../../../model/department';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_dep_item';
import './request_log';
import DepList from '../../base/dep_list';
import Branch from '../../../model/branch';

@customElement('admin-dep-list')
export default class AdminDepList extends DepList {
  private adminManager = new MockAdminManager();

  @property({ type: Object }) branch!: Branch;

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
