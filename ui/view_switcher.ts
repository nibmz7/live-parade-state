import { LitElement, html, customElement, css } from 'lit-element';
import MockAuthManager from '../data-mock/mock_auth_manager';
import './login_view';
// import { ApplicationStore } from '../data/store';

const enum VIEW_TYPES {
  LOADING,
  AUTH,
  ADMIN,
  USER
}

@customElement('view-switcher')
export class ViewSwitcher extends LitElement {
  private viewType: VIEW_TYPES = VIEW_TYPES.AUTH;
  private visible = true;

  static get properties() {
    return {
      viewType: { type: Number },
      visible: { type: Boolean }
    };
  }

  connectedCallback() {
    new MockAuthManager();
    super.connectedCallback();
  }

  async performUpdate() {
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    super.performUpdate();
  }

  async signedIn() {
    this.visible = false;
    await new Promise((resolve) => {
      let root = this.shadowRoot?.getElementById('root');
      root?.addEventListener(
        'animationend',
        () => {
          resolve();
        },
        { once: true }
      );
      this.performUpdate();
    });
    this.viewType = VIEW_TYPES.USER;
    this.visible = true;
  }

  render() {
    const content = () => {
      switch (this.viewType) {
        case VIEW_TYPES.AUTH:
          return html`<login-view @signed-in="${this.signedIn}"></login-view>`;
        case VIEW_TYPES.USER:
          return html`<div>User signed In</div>`;
        default:
          return '';
      }
    };
    return html`<div
      id="root"
      ?fade-out="${!this.visible}"
      ?fade-in="${this.visible}"
    >
      ${content()}
    </div> `;
  }

  static get styles() {
    return [
      css`
        #root {
        }

        #root[fade-in] {
          animation: fade-in 1s;
        }

        #root[fade-out] {
          animation: fade-out 3s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `
    ];
  }
}
