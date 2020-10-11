import { html, customElement } from 'lit-element';
import Department from '../../../model/department';
import BaseDepList from '../../base/base_dep_list';

@customElement('admin-dep-list')
export default class AdminDepList extends BaseDepList {
  depItemTemplate = (department: Department, index: number) => {
    return html`<admin-dep-item
      .department="${department}"
      .index=${index}
    ></admin-dep-item>`;
  };
}
