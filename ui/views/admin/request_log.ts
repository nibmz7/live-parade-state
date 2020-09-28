import { LitElement, html, customElement, css, property } from 'lit-element';
import { Unsubscribe } from 'redux';
import {
  ACTION_ID,
  ACTION_ROOT,
  ApplicationStore,
  DataStoreListener,
  DataStoreState
} from '../../../data/store';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import '../../dialogs/edit_department';
import '../../base/welcome_text';
import './admin_department';
import { ACTION_TYPE, REQUEST_TYPES } from '../../../data/data_manager';
import { repeat } from 'lit-html/directives/repeat';
import {
  DepartmentAction,
  DepartmentActionError
} from '../../../data/states/department_state';
import { UserAction, UserActionError } from '../../../data/states/user_state';
import User from '../../../model/user';
import Department from '../../../model/department';

interface Request {
  id: ACTION_ID;
  root: ACTION_ROOT;
  type: ACTION_TYPE;
  message: string;
  error?: string;
  payload?: User | Department;
}

const ACTION_TYPE_TEXT = {
  [ACTION_TYPE.ADDED]: 'added',
  [ACTION_TYPE.MODIFIED]: 'updated',
  [ACTION_TYPE.REMOVED]: 'removed',
  [ACTION_TYPE.REQUEST_ADD]: 'adding',
  [ACTION_TYPE.REQUEST_MODIFY]: 'updating',
  [ACTION_TYPE.REQUEST_REMOVE]: 'removing',
  [ACTION_TYPE.REQUEST_SUCCESSFUL]: 'successfully',
  [ACTION_TYPE.REQUEST_ERROR]: 'error'
};

const getItemText = (
  root: ACTION_ROOT,
  action: DepartmentAction | UserAction
) =>
  root === ACTION_ROOT.USERS
    ? (action.payload as User).fullname
    : (action.payload as Department).name;

@customElement('request-log')
export default class RequestLog extends LitElement {
  private departmentsUnsubscribe?: Unsubscribe;
  private usersUnsubscribe?: Unsubscribe;

  @property({ type: Object }) requests: { [id: string]: Request } = {};

  private dateStoreListener: DataStoreListener = async (
    state: DataStoreState
  ) => {
    if (!REQUEST_TYPES.includes(state.action.type)) return;
    const type = state.action.type;
    const action = state.action as DepartmentAction | UserAction;
    const actionText = ACTION_TYPE_TEXT[type];
    const root = state.action.root;
    const rootText = root === ACTION_ROOT.USERS ? 'user' : 'department';
    let id: ACTION_ID;
    let message: string;
    let error: string | undefined = undefined;
    let payload: User | Department | undefined = undefined;
    if (action.type === ACTION_TYPE.REQUEST_SUCCESSFUL) {
      const requestAction = action.payload as DepartmentAction | UserAction;
      const requestActionText = ACTION_TYPE_TEXT[requestAction.type - 3];
      const itemText = getItemText(root, requestAction);
      message = `${rootText} ${itemText} ${requestActionText} ${actionText}!`;
      id = requestAction.id;
    } else if (action.type === ACTION_TYPE.REQUEST_ERROR) {
      const requestAction = action.payload as
        | DepartmentActionError
        | UserActionError;
      const errorAction = requestAction.action;
      const errorActionText = ACTION_TYPE_TEXT[errorAction.type];
      const itemText = getItemText(root, errorAction);
      message = `${actionText} ${errorActionText} ${rootText} ${itemText}`;
      id = errorAction.id;
      payload = errorAction.payload as User | Department;
      error = requestAction.message;
    } else {
      const itemText = getItemText(root, action);
      message = `${actionText} ${rootText} ${itemText}...`;
      id = action.id;
    }
    this.requests = {
      ...this.requests,
      [id]: {
        id,
        root,
        type,
        message,
        payload,
        error
      }
    };
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
    const requestTemplate = (request: Request) => {
      const type = request.type;
      return html`<div
        class="request card"
        ?success="${type === ACTION_TYPE.REQUEST_SUCCESSFUL}"
        ?error="${type === ACTION_TYPE.REQUEST_ERROR}"
      >
        <p class="message">${request.message}</p>
        ${request.error ? html`<p class="error">${request.error}!</p>` : ''}
      </div>`;
    };

    return html`<div id="root">
      ${repeat(
        Object.values(this.requests),
        (request) => request.id,
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
          max-height: 30%;
          bottom: 80px;
          position: absolute;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 0 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column-reverse;
        }

        #root::-webkit-scrollbar {
          display: none;
        }

        .request {
          margin-top: 10px;
          color: white;
          background-color: var(--color-pending);
          display: flex;
          justify-content: center;
          text-align: center;
          padding: 10px;
          border-radius: 5px;
          font-weight: 500;
          transition: background-color 0.3s;
        }

        .request[success] {
          background-color: var(--color-success);
        }

        .request[error] {
          background-color: var(--color-error);
        }

        .request[error] .message {
          font-weight: 700;
        }

        .error {
        }

        p {
          margin: 0;
        }

        p::first-letter {
          text-transform: uppercase;
        }
      `
    ];
  }
}
