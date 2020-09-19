import { LitElement, html, customElement, css } from 'lit-element';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import { globalStyles } from '../global_styles';

@customElement('admin-view')
export default class AdminView extends LitElement {
  static get properties() {
    return {};
  }

  connectedCallback() {
    super.connectedCallback();
    ApplicationStore.listen(ACTION_ROOT.DEPARTMENTS, (state) => {
      console.log(state);
    });
    ApplicationStore.listen(ACTION_ROOT.USERS, (state) => {
      console.log(state);
    });
    let adminManager = new MockAdminManager();
    adminManager.subscribe();

    let someObject = { item1: { data: 'hello' } };
    let item = someObject.item1;
    console.log(item, someObject);
    // @ts-ignore
    delete someObject.item1;
    console.log(item, someObject);
  }

  render() {
    return html`<div>Admin signed In</div>`;
  }

  static get styles() {
    return [globalStyles, css``];
  }
}
