import { LitElement, html, customElement, css } from 'lit-element';
import MockAuthManager from '../data-mock/mock_auth_manager';
import { ACTION_ROOT, ApplicationStore } from '../data/store';
import { AuthState, AuthStoreState } from '../data/states/auth_state';
import { fadeAnimation } from './global_styles';
import './login_view';

const enum VIEW_TYPES {
  UNINITALIZED,
  AUTH,
  ADMIN,
  USER
}

@customElement('view-switcher')
export class ViewSwitcher extends LitElement {
  private viewType: VIEW_TYPES = VIEW_TYPES.UNINITALIZED;
  private visible = false;

  static get properties() {
    return {
      viewType: { type: Number },
      visible: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    ApplicationStore.listen(ACTION_ROOT.AUTH, (state: AuthStoreState) => {
      if (this.viewType === VIEW_TYPES.UNINITALIZED) {
        this.addEventListener(
          'animationend',
          () => {
            this.removeAttribute('loading');
            this.removeAttribute('initialized');
          },
          { once: true }
        );
        this.setAttribute('initialized', '');
      }
      if (state.action.type === AuthState.SIGNED_OUT) {
        this.viewType = VIEW_TYPES.AUTH;
        this.visible = true;
      } else if (
        this.viewType === VIEW_TYPES.UNINITALIZED &&
        state.action.type === AuthState.SIGNED_IN
      ) {
        this.viewType = VIEW_TYPES.USER;
        this.visible = true;
      }
    });
    new MockAuthManager();
  }

  async performUpdate() {
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    super.performUpdate();
  }

  async signedIn() {
    this.visible = false;
    await new Promise((resolve) => {
      let root = this.shadowRoot?.getElementById('root');
      root?.addEventListener('animationend', () => resolve(), { once: true });
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
          return ``;
      }
    };
    return html`
      <div id="root" ?fade-out="${!this.visible}" ?fade-in="${this.visible}">
        ${content()}
      </div>
    `;
  }

  static get styles() {
    return [
      fadeAnimation,
      css`
        :host([initialized])::after {
          animation: fade-out 0.3s forwards;
        }

        #root[fade-in] {
          animation: fade-in 0.5s;
        }

        #root[fade-out] {
          animation: fade-out 0.3s;
        }
      `
    ];
  }
}
