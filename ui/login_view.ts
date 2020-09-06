import { LitElement, html } from 'lit-element';

class LoginView extends LitElement {
  render() {
    return html` <div>Hello world</div> `;
  }
}

customElements.define('login-view', LoginView);
