import { LitElement, html, customElement, css, property } from 'lit-element';
import { Unsubscribe } from 'redux';
import { DepartmentStoreState } from '../../../data/states/department_state';
import { UserAction, UserStoreState } from '../../../data/states/user_state';
import {
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener
} from '../../../data/store';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_department';
import {
  ACTION_TYPE,
  REQUEST_ACTIONS,
  REQUEST_TYPES
} from '../../../data/data_manager';

@customElement('request-log')
export default class RequestLog extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;

  @property({ type: Object }) userRequests: { [uid: string]: UserAction } = {};

  private departmentsListener: DataStoreListener = (
    state: DepartmentStoreState
  ) => {
    const type = state.action.type;
    if (type === ACTION_TYPE.INITIALIZED) return;
  };

  private usersListener: DataStoreListener = async (state: UserStoreState) => {
    const type = state.action.type;
    if (!REQUEST_TYPES.includes(type)) return;

    if (REQUEST_ACTIONS.includes(type)) {
      console.log('REQUEST ACTIONS');
    } else if (type === ACTION_TYPE.REQUEST_SUCCESSFUL) {
      console.log('SUCCESS');
    } else if (type === ACTION_TYPE.REQUEST_ERROR) {
      console.log('ERROR');
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.departmentsUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.DEPARTMENTS,
      this.departmentsListener
    );
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      this.usersListener
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.departmentsUnsubscribe?.();
    this.usersUnsubscribe?.();
  }

  render() {
    return html`<div id="root"></div>`;
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
