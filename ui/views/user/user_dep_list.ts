import { html, customElement, property } from 'lit-element';
import Department from '../../../model/department';
import BaseDepList from '../../base/base_dep_list';

@customElement('user-dep-list')
export default class UserDepList extends BaseDepList {
  @property({ type: Boolean }) isMorning = true;

  depItemTemplate = (department: Department, index: number) => {
    console.log('ddsds');
    return html`<user-dep-item
      .index="${index}"
      .department="${department}"
      .isMorning="${this.isMorning}"
    ></user-dep-item>`;
  };
}
