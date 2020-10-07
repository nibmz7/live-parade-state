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
import MockAuthManager from '../../data-mock/mock_auth_manager';
import AuthUser from '../../model/auth_user';
import { DataManager } from '../../data/data_manager';
import MockAdminManager from '../../data-mock/mock_admin_manager';
import MockStatusManager from '../../data-mock/mock_status_manager';
import FBAuthManager from '../../data-firebase/fb_auth_manager';
import FBStatusManager from '../../data-firebase/fb_status_manager';

const enum VIEW_TYPES {
  UNINITALIZED,
  AUTH,
  ADMIN,
  USER
}

@customElement('view-switcher')
export default class ViewSwitcher extends LitElement {
  private dataManager?: DataManager;
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
    new FBAuthManager();
    // new MockAuthManager();
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
    let user = ApplicationStore.auth.action.payload as AuthUser;
    this.dataManager = user.isAdmin ? new MockAdminManager() : new FBStatusManager();
    this.dataManager.subscribe().then(() => {
      user.isAdmin
      ? this.showView(VIEW_TYPES.ADMIN)
      : this.showView(VIEW_TYPES.USER);
    })
  }

  signedOut() {
    this.dataManager?.unsubscribe();
    this.dataManager = undefined;
    this.showView(VIEW_TYPES.AUTH);
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
        }

        #root[fade-in] {
          animation: fade-in 0.5s;
        }

        #root[fade-out] {
          animation: fade-out 0.5s;
        }
      `
    ];
  }
}
