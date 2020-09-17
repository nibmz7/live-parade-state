import { LitElement, html, customElement, css, property } from 'lit-element';
import MockAuthManager from '../data-mock/mock_auth_manager';
import { ACTION_ROOT, ApplicationStore } from '../data/store';
import { AuthState, AuthStoreState } from '../data/states/auth_state';
import { fadeAnimation } from './global_styles';
import { Unsubscribe } from 'redux';
import Admin from '../model/admin';
import './views/login_view';
import './views/admin_view';

const enum VIEW_TYPES {
  UNINITALIZED,
  AUTH,
  ADMIN,
  USER
}

@customElement('view-switcher')
export default class ViewSwitcher extends LitElement {
  @property({ type: Boolean, reflect: true }) splashscreen = true;
  @property({ type: Boolean, reflect: true }) initialized = false;

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
    ApplicationStore.listen(
      ACTION_ROOT.AUTH,
      (state: AuthStoreState, unsubscribe: Unsubscribe) => {
        let type = state.action.type;
        let onInitialized = () => {
          this.splashscreen = false;
          this.initialized = false;
        };
        this.addEventListener('animationend', onInitialized, { once: true });
        type === AuthState.SIGNED_IN ? this.signedIn() : this.signedOut();
        this.initialized = true;
        unsubscribe();
      }
    );
    new MockAuthManager();
  }

  async hideView() {
    if (this.visible) {
      this.visible = false;
      await new Promise((resolve) => {
        let root = this.shadowRoot?.getElementById('root');
        root?.addEventListener('animationend', () => resolve(), { once: true });
      });
    }
  }

  async showView(type: VIEW_TYPES) {
    await this.hideView();
    this.viewType = type;
    this.visible = true;
  }

  signedIn() {
    let user = ApplicationStore.getAuth().action.payload;
    (user as Admin).isAdmin
      ? this.showView(VIEW_TYPES.ADMIN)
      : this.showView(VIEW_TYPES.USER);
  }

  signedOut() {
    this.showView(VIEW_TYPES.AUTH);
  }

  render() {
    const content = () => {
      switch (this.viewType) {
        case VIEW_TYPES.AUTH:
          return html`<login-view @signed-in="${this.signedIn}"></login-view>`;
        case VIEW_TYPES.ADMIN:
          return html`<admin-view></admin-view>`;
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

        #root {
          height: 100%;
          width: 100%;
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
