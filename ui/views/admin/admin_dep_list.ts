import { html, customElement, property } from 'lit-element';
import MockAdminManager from '../../../data-mock/mock_admin_manager';
import Department from '../../../model/department';
import Branch from '../../../model/branch';
import BaseDepList from '../../base/base_dep_list';

@customElement('admin-dep-list')
export default class AdminDepList extends BaseDepList {
  private adminManager = new MockAdminManager();

  @property({ type: Object }) branch!: Branch;

  connectedCallback() {
    super.connectedCallback();
    this.adminManager.subscribe();
  }

  cleanup() {
    this.adminManager.unsubscribe();
  }

  depItemTemplate = (department: Department) => {
    return html`<admin-dep-item
      .branch="${this.branch}"
      .department="${department}"
      .users="${this.users[department.id] || []}"
      .listState="${this.listState[department.id] || {
        items: {},
        length: 0
      }}"
      @user-removed="${this.onUserRemoved}"
    ></admin-dep-item>`;
  };
}