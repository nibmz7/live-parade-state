import { LitElement, html, customElement, css, property } from 'lit-element';
import { Unsubscribe } from 'redux';
import {
  Action,
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener,
  DataStoreState
} from '../../../data/store';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_department';
import { REQUEST_TYPES } from '../../../data/data_manager';
import { repeat } from 'lit-html/directives/repeat';
import { DepartmentAction } from '../../../data/states/department_state';
import { UserAction } from '../../../data/states/user_state';

@customElement('request-log')
export default class RequestLog extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;

  @property({ type: Object }) requests: { [actionid: string]: Action } = {};

  private dateStoreListener: DataStoreListener = async (
    state: DataStoreState
  ) => {
    const action = state.action as DepartmentAction | UserAction;
    if (!REQUEST_TYPES.includes(action.type)) return;
    this.requests = { ...this.requests, [action.id]: action };
  };

  connectedCallback() {
    super.connectedCallback();
    this.departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      this.dateStoreListener
    );
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      this.dateStoreListener
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.departmentsUnsubscribe?.();
    this.usersUnsubscribe?.();
  }

  render() {
    const requestTemplate = (action: Action) => {
      const root =
        action.root === ACTION_ROOT.DEPARTMENTS ? 'Department' : 'User';
      return html`<p>${root}</p>`;
    };

    return html`<div id="root">
      ${repeat(
        Object.values(this.requests),
        (action) => action.id,
        requestTemplate
      )}
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          width: 100%;
          position: absolute;
        }
      `
    ];
  }
}
