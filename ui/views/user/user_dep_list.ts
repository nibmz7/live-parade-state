import { html, customElement, property } from 'lit-element';
import MockAdminManager from '../../../data-mock/mock_admin_manager';
import Department from '../../../model/department';
import BaseDepList from '../../base/base_dep_list';

@customElement('user-dep-list')
export default class UserDepList extends BaseDepList {
  private adminManager = new MockAdminManager();

  @property({ type: Boolean }) isMorning = true;

  connectedCallback() {
    super.connectedCallback();
    this.adminManager.subscribe();
  }

  cleanup() {
    this.adminManager.unsubscribe();
  }

  depItemTemplate = (department: Department) => {
    return html`<user-dep-item
      .department="${department}"
      .isMorning="${this.isMorning}"
    ></user-dep-item>`;
  };
}
