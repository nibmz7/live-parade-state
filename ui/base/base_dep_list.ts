import {
  LitElement,
  html,
  css,
  query,
  property,
  TemplateResult,
  eventOptions
} from 'lit-element';
import ACTION_AUTH from '../../data/actions/auth_action';
import { REQUEST_TYPES } from '../../data/data_manager';
import { DepartmentStoreState } from '../../data/states/department_state';
import {
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener
} from '../../data/store';
import Admin from '../../model/admin';
import Department from '../../model/department';
import User from '../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';

export default abstract class BaseDepList extends LitElement {
  private welcomeTitle!: string;

  @query('#department-list') _departmentsList!: HTMLElement;
  @query('welcome-text') _welcomeText!: HTMLElement;

  @eventOptions({ passive: true }) _handleOnScroll() {
    this.elevate = this._departmentsList.scrollTop > 0;
  }

  @property({ type: Array }) departments: Array<Department> = [];
  @property({ type: Boolean }) elevate = false;
  @property({ type: Object }) user!: User;
  @property({ type: Object }) admin!: Admin;

  abstract depItemTemplate(department: Department): TemplateResult;
  abstract cleanup(): void;

  private departmentsListener: DataStoreListener = (
    state: DepartmentStoreState
  ) => {
    const type = state.action.type;
    if (REQUEST_TYPES.includes(type)) return;
    this.departments = state.items;
  };

  connectedCallback() {
    super.connectedCallback();
    this.welcomeTitle = this.admin
      ? 'Hi, admin user!'
      : `Hi, ${this.user.fullname}!`;
    const departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      this.departmentsListener
    );
    const onSignedOut = () => {
      departmentsUnsubscribe();
      this.cleanup();
      const action = ACTION_AUTH.requestSignOut();
      ApplicationStore.dispatch(action);
    };
    this.addEventListener('signed-out', onSignedOut, { once: true });
  }

  render() {
    return html`<div id="root">
      <welcome-text .elevate="${this.elevate}">
        ${this.welcomeTitle}
      </welcome-text>

      <div id="department-list" @scroll="${this._handleOnScroll}">
        ${this.departments.map(this.depItemTemplate)}
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

        #department-list {
          max-height: 99.9%;
          overflow-x: hidden;
          overflow-y: scroll;
          box-sizing: border-box;
          padding: 0px 30px;
        }

        #department-list::-webkit-scrollbar {
          display: none;
        }

        #department-list > * {
          margin-bottom: 20px;
        }

        #department-list > *:first-child {
          margin-top: 30px;
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
