import { LitElement, html, customElement, css } from 'lit-element';

const enum VIEWS {
  AUTH,
  ADMIN,
  USER
}

@customElement('view-switcher')
export class ViewSwitcher extends LitElement {
  static get properties() {
    return {
      isProcessing: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html``;
  }

  static get styles() {
    return [css``];
  }
}
