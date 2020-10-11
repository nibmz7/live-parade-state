import {
  LitElement,
  html,
  css,
  query,
  property,
  TemplateResult
} from 'lit-element';
import ACTION_AUTH from '../../data/actions/auth_action';
import { REQUEST_TYPES } from '../../data/data_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import {
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener
} from '../../data/store';
import AuthUser from '../../model/auth_user';
import Department from '../../model/department';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';

export default abstract class BaseDepList extends LitElement {
  private welcomeTitle!: string;
  private authUser = ApplicationStore.auth.action.payload as AuthUser;

  @query('welcome-text', true) _welcomeText!: HTMLElement;
  @query('#scrollable', true) _scrollable!: HTMLElement;
  @query('#gap', true) _gap!: HTMLElement;

  @property({ type: Array }) departments: Array<Department> = [];

  abstract depItemTemplate(
    department: Department,
    index: number
  ): TemplateResult;

  private departmentsListener: DataStoreListener = (
    state: DepartmentStoreState
  ) => {
    const type = state.action.type;
    if (REQUEST_TYPES.includes(type)) return;
    this.departments = state.items;
  };

  connectedCallback() {
    if (this.authUser.isAdmin) {
      this.welcomeTitle = 'Hi, admin user!';
    } else {
      const fullname =
        ApplicationStore.users.usersById[this.authUser.uid].fullname;
      this.welcomeTitle = `Hi, ${fullname}!`;
    }
    this.departments = ApplicationStore.departments.items.slice();
    const departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      this.departmentsListener
    );
    const onSignedOut = () => {
      departmentsUnsubscribe();
      const action = ACTION_AUTH.requestSignOut();
      ApplicationStore.dispatch(action);
    };
    this.addEventListener('signed-out', onSignedOut, { once: true });
    super.connectedCallback();
  }

  firstUpdated() {
    let options = {
      root: this._scrollable,
      rootMargin: '1px',
      threshold: 1
    };

    const callback = () => {
      const shouldElevate = this._scrollable.scrollTop > 1;
      const event = new CustomEvent('elevate', { detail: shouldElevate });
      this._welcomeText.dispatchEvent(event);
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this._gap);
  }

  render() {
    return html`<div id="root">
      <welcome-text> ${this.welcomeTitle} </welcome-text>

      <div id="scrollable">
        <div id="gap"></div>
        <div id="department-list">
          ${this.departments.map(this.depItemTemplate)}
        </div>
      </div>

      ${this.departments.length === 0
        ? html`<p class="empty">No departments found</p>`
        : ''}

      <slot></slot>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          height: 100%;
          width: 100%;
          position: relative;
        }

        #scrollable {
          max-height: 99.9%;
          overflow-x: hidden;
          overflow-y: scroll;
        }

        #scrollable::-webkit-scrollbar {
          display: none;
        }

        #scrollable #gap {
          content: '';
          height: 30px;
          display: block;
        }

        #department-list {
          box-sizing: border-box;
          padding: 0px 30px;
        }

        #department-list > * {
          margin-bottom: 20px;
        }

        #department-list > *:last-child {
          margin-bottom: 80px;
        }

        .empty {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `
    ];
  }
}
