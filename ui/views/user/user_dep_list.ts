import { html, customElement, property } from 'lit-element';
import MockStatusManager from '../../../data-mock/mock_status_manager';
import Department from '../../../model/department';
import BaseDepList from '../../base/base_dep_list';

@customElement('user-dep-list')
export default class UserDepList extends BaseDepList {
  private statusManager = new MockStatusManager();

  @property({ type: Boolean }) isMorning = true;

  connectedCallback() {
    super.connectedCallback();
    this.statusManager.subscribe();
  }

  cleanup() {
    this.statusManager.unsubscribe();
  }

  depItemTemplate = (department: Department, index: number) => {
    return html`<user-dep-item
      .index="${index}"
      .department="${department}"
      .isMorning="${this.isMorning}"
    ></user-dep-item>`;
  };
}
