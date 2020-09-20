import { LitElement, html, customElement, css } from 'lit-element';
import ACTION_DEPARTMENT from '../../data/actions/department_action';
import ACTION_USER from '../../data/actions/user_action';
import { ApplicationStore, generateActionId } from '../../data/store';
import Branch from '../../model/branch';
import Department from '../../model/department';
import User from '../../model/user';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  inputStyles,
  passwordInputStyles
} from '../global_styles';
import {
  emailInput,
  InputState,
  INPUT_VALIDITY,
  passwordInput,
  PasswordInputState,
  textInput
} from '../input';
import './custom_dialog';
import { DIALOG_STATE } from './custom_dialog';

@customElement('edit-user')
export default class EditUser extends LitElement {
  private user?: User;
  private branch?: Branch;
  private department?: Department;
  private editing = false;
  private dialogState = DIALOG_STATE.OPENING;
  private nameState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private rankState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private emailState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private passwordState: PasswordInputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING,
    visible: false
  };
  private isRegularState = false;

  static get properties() {
    return {
      user: { type: Object },
      branch: { type: Object },
      department: { type: Object },
      editing: { type: Boolean, reflect: true },
      dialogState: { type: Number },
      nameState: { type: Object },
      rankState: { type: Object },
      emailState: { type: Object },
      passwordState: { type: Object },
      isRegularState: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.user) {
      this.nameState.value = this.user.name;
      this.rankState.value = this.user.rank.text;
      this.emailState.value = this.user.email.split('@')[0];
      this.isRegularState = this.user.regular;
    }
  }

  submit() {
    if (this.editing) {
      let action = ACTION_USER.requestModify({
        ...this.user!,
        name: this.nameState.value
      });
      ApplicationStore.dispatch(action);
    } else {
      let action = ACTION_DEPARTMENT.requestAdd({
        id: `${generateActionId()}`,
        name: this.nameState.value
      });
      ApplicationStore.dispatch(action);
    }
    this.dialogState = DIALOG_STATE.CLOSING;
  }

  delete() {
    let action = ACTION_USER.requestRemove(this.user!);
    ApplicationStore.dispatch(action);
    this.dialogState = DIALOG_STATE.CLOSING;
  }

  render() {
    return html`<custom-dialog .state="${this.dialogState}">
      <div id="root" tabindex="0" class="selectable">
        <p id="department-name">${this.department!.name}</p>
        <div class="header">
          <h3>Edit user</h3>
          ${this.editing
            ? html` <button
                plain
                id="delete"
                @click="${this.delete}"
                aria-label="Delete user"
              >
                delete
              </button>`
            : ''}
        </div>

        ${textInput(this.rankState, (state) => (this.rankState = state), {
          placeholder: 'Rank',
          label: 'Rank',
          id: 'rank'
        })}
        ${textInput(this.nameState, (state) => (this.nameState = state), {
          placeholder: 'Name',
          label: 'Name',
          id: 'name'
        })}
        <div id="email" class="row-box-reversed">
          <p>@${this.branch?.domain}</p>
          ${emailInput(this.emailState, (state) => (this.emailState = state))}
        </div>

        <div id="password" class="row-box-reversed">
          <button id="change" ?hidden="${!this.editing}" plain>change</button>
          ${passwordInput(
            this.passwordState,
            (state) => (this.passwordState = state)
          )}
        </div>

        <div class="regular-box">
          <input
            type="checkbox"
            .checked="${this.isRegularState}"
            @click="${() => (this.isRegularState = !this.isRegularState)}"
          />
          <label for="regular">Regular serviceman</label>
        </div>

        <button
          id="confirm"
          @click="${this.submit}"
          aria-label="Add/Edit department"
          @keydown="${(e: Event) => {
            let key = (e as KeyboardEvent).key;
            if (key === 'Tab') {
              this.shadowRoot?.getElementById('root')?.focus();
            }
          }}"
          solid
        >
          Confirm
        </button>
      </div>
    </custom-dialog>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      inputStyles,
      passwordInputStyles,
      css`
        #root {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        input,
        #password {
          margin: 0 0 10px 0;
        }

        #department-name {
          width: 100%;
          text-align: center;
          margin: 0;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .row-box-reversed {
          display: flex;
          flex-direction: row-reverse;
          width: 100%;
        }

        #rank {
          text-transform: uppercase;
          width: 25%;
        }

        #rank::placeholder {
          text-transform: none;
        }

        #name {
          text-transform: capitalize;
          margin-left: 15px;
          width: calc(75% - 15px);
        }

        #email > p {
          margin: 0 15px;
          align-self: center;
        }

        #email > input {
          flex-grow: 1;
          min-width: 0;
        }

        #password > .password-container {
          flex-grow: 1;
        }

        #password > #change {
          font-size: 1rem;
          margin: 0 0 0 10px;
        }

        .password-container > .password-toggle {
          top: 0px;
          right: 15px;
          bottom: 0px;
        }

        .password-container > input {
          margin: 0;
        }

        .regular-box {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .regular-box > input {
          margin: 0 10px 0 0;
        }

        .regular-box > label {
          font-size: 1rem;
        }

        #delete {
          font-size: 1.3rem;
        }

        #confirm {
          font-size: 1.3rem;
          font-weight: 500;
          width: 100%;
          margin-top: 10px;
        }
      `
    ];
  }
}
