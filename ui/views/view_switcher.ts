import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query
} from 'lit-element';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import { AUTH_STATE, AuthStoreState } from '../../data/states/auth_state';
import { fadeAnimation } from '../global_styles';
import { Unsubscribe } from 'redux';
import './login/login_view';
import './admin/admin_view';
import './user/user_view';
import AuthUser from '../../model/auth_user';
import { DataManager } from '../../data/data_manager';

const enum VIEW_TYPES {
  UNINITALIZED,
  AUTH,
  ADMIN,
  USER
}

@customElement('view-switcher')
export default class ViewSwitcher extends LitElement {
  private application = window.application;
  private dataManager?: DataManager;
  private isDarkMode = localStorage.getItem('dark-mode') === 'true';

  @query('#root') _root!: HTMLElement;
  @property({ type: Boolean, reflect: true }) splashscreen = true;
  @property({ type: Boolean, reflect: true }) initialized = false;
  @property({ type: Number }) viewType: VIEW_TYPES = VIEW_TYPES.UNINITALIZED;
  @property({ type: Boolean }) visible = false;

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
        type === AUTH_STATE.SIGNED_IN ? this.signedIn() : this.signedOut();
        this.initialized = true;
        unsubscribe();
      }
    );
    this.application.getAuthManager();
  }

  async hideView() {
    if (this.visible) {
      this.visible = false;
      await new Promise((resolve) => {
        this._root.addEventListener('animationend', () => resolve(), {
          once: true
        });
      });
    }
  }

  async showView(type: VIEW_TYPES) {
    await this.hideView();
    this.viewType = type;
    this.visible = true;
  }

  signedIn() {
    const user = ApplicationStore.auth.action.payload as AuthUser;
    this.dataManager = user.isAdmin
      ? this.application.getAdminManager()
      : this.application.getStatusManager();
    this.dataManager.subscribe().then(() => {
      user.isAdmin
        ? this.showView(VIEW_TYPES.ADMIN)
        : this.showView(VIEW_TYPES.USER);
    });
  }

  signedOut() {
    this.dataManager?.unsubscribe();
    this.dataManager = undefined;
    this.showView(VIEW_TYPES.AUTH);
  }

  toggleDarkMode(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    document.body.classList.toggle('dark');
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-mode', `${this.isDarkMode}`);
  }

  render() {
    const content = () => {
      switch (this.viewType) {
        case VIEW_TYPES.AUTH:
          return html`<login-view @signed-in="${this.signedIn}"></login-view>`;
        case VIEW_TYPES.ADMIN:
          return html`<admin-view
            @signed-out="${this.signedOut}"
          ></admin-view>`;
        case VIEW_TYPES.USER:
          return html`<user-view @signed-out="${this.signedOut}"></user-view>`;
        default:
          return ``;
      }
    };
    return html`
      <div id="root" ?fade-out="${!this.visible}" ?fade-in="${this.visible}">
        ${content()}

        <svg
          id="toggle-dark-mode"
          @click="${this.toggleDarkMode}"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M20 15.31l1.9-1.9c.78-.78.78-2.05 0-2.83L20 8.69V6c0-1.1-.9-2-2-2h-2.69l-1.9-1.9c-.78-.78-2.05-.78-2.83 0L8.69 4H6c-1.1 0-2 .9-2 2v2.69l-1.9 1.9c-.78.78-.78 2.05 0 2.83l1.9 1.9V18c0 1.1.9 2 2 2h2.69l1.9 1.9c.78.78 2.05.78 2.83 0l1.9-1.9H18c1.1 0 2-.9 2-2v-2.69zm-8 1.59V7.1c0-.61.55-1.11 1.15-.99C15.91 6.65 18 9.08 18 12s-2.09 5.35-4.85 5.89c-.6.12-1.15-.38-1.15-.99z"
          />
        </svg>
      </div>
    `;
  }

  static get styles() {
    return [
      fadeAnimation,
      css`
        #root {
          height: 100%;
          width: 100%;
          position: relative;
        }

        #root[fade-in] {
          animation: fade-in 0.5s;
        }

        #root[fade-out] {
          animation: fade-out 0.5s;
        }

        #toggle-dark-mode {
          position: absolute;
          top: 0px;
          right: 0px;
          fill: var(--color-text-primary);
          padding: 10px;
          z-index: 99;
          cursor: pointer;
        }
      `
    ];
  }
}
