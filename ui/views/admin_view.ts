import { LitElement, html, customElement, css } from 'lit-element';
import { globalStyles } from '../global_styles';

@customElement('admin-view')
export default class AdminView extends LitElement {
  static get properties() {
    return {};
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<div>Admin signed In</div>`;
  }

  static get styles() {
    return [globalStyles, css``];
  }
}
