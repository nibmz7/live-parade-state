import { LitElement, html, customElement, css, property } from 'lit-element';
import ACTION_USER from '../../data/actions/user_action';
import { UserAction } from '../../data/states/user_state';
import { ApplicationStore } from '../../data/store';
import Branch from '../../model/branch';
import Department from '../../model/department';
import Rank from '../../model/rank';
import User, { UserBase } from '../../model/user';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  inputStyles,
  passwordInputStyles
} from '../global_styles';
import {
  InputStateDefault,
  INPUT_VALIDITY,
  passwordInput,
  PasswordStateDefault,
  textInput
} from '../base/input';
import { onPressed } from '../utils';
import '../base/custom_dialog';
import { DIALOG_STATE } from '../base/custom_dialog';

@customElement('edit-user')
export default class EditUser extends LitElement {
  @property({ type: Object }) user?: User;
  @property({ type: Object }) branch!: Branch;
  @property({ type: Object }) department!: Department;
  @property({ type: Object }) nameState = InputStateDefault();
  @property({ type: Object }) rankState = InputStateDefault();
  @property({ type: Object }) emailState = InputStateDefault();
  @property({ type: Object }) passwordState = PasswordStateDefault();
  @property({ type: Object }) errorState = {
    message: '',
    visible: false
  };
  @property({ type: Boolean }) editing = false;
  @property({ type: Boolean }) isRegularState = false;
  @property({ type: Number }) dialogState = DIALOG_STATE.OPENING;

  connectedCallback() {
    super.connectedCallback();
    if (this.user) {
      this.nameState = {
        value: this.user.name,
        validity: INPUT_VALIDITY.VALID
      };
      this.rankState = {
        value: this.user.rank.text,
        validity: INPUT_VALIDITY.VALID
      };
      this.emailState = {
        value: this.user.email.split('@')[0],
        validity: INPUT_VALIDITY.VALID
      };
      this.isRegularState = this.user.regular;
    }
  }

  showError(message: string) {
    this.errorState = { visible: true, message };
  }

  checkValidity() {
    if (this.rankState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid rank!');
    } else if (this.nameState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid name!');
    } else if (this.emailState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid email!');
    } else if (
      !this.editing &&
      this.passwordState.validity !== INPUT_VALIDITY.VALID
    ) {
      this.showError('Please enter a valid password!');
    }
  }

  submit() {
    return onPressed(() => {
      this.checkValidity();
      if (this.errorState.visible) return;

      const name = this.nameState.value;
      const rank = new Rank(this.rankState.value);
      const email = this.emailState.value + '@' + this.branch?.domain;
      const regular = this.isRegularState;
      const departmentid = this.department!.id;
      const branchid = this.branch!.id;

      let data = { name, rank, email, regular, branchid, departmentid };
      let action: UserAction;

      if (this.editing) {
        action = ACTION_USER.requestModify({
          ...this.user!,
          ...data
        });
      } else {
        const password = this.passwordState.value;
        let user = new UserBase({ ...data, password });
        action = ACTION_USER.requestAdd(user);
      }

      ApplicationStore.dispatch(action);
      this.dialogState = DIALOG_STATE.CLOSING;
    });
  }

  changePassword() {
    return onPressed(() => {});
  }

  delete() {
    return onPressed(() => {
      let action = ACTION_USER.requestRemove(this.user!);
      ApplicationStore.dispatch(action);
      this.dialogState = DIALOG_STATE.CLOSING;
    });
  }

  onInputFocus() {
    this.errorState = {
      ...this.errorState,
      visible: false
    };
    this.dialogState = DIALOG_STATE.STALLING;
  }

  render() {
    return html`<custom-dialog
      .state="${this.dialogState}"
      @reset="${() => (this.dialogState = DIALOG_STATE.OPENED)}"
    >
      <div id="root" tabindex="0" class="selectable">
        <p id="department-name">${this.department!.name}</p>

        <div class="header">
          <h3>${this.editing ? 'Edit' : 'Add'} User</h3>

          ${this.editing
            ? html` <button
                plain
                id="delete"
                @click="${this.delete()}"
                aria-label="Delete user"
              >
                delete
              </button>`
            : ''}
        </div>

        <div id="rankname" class="row-box">
          ${textInput(
            this.rankState,
            () => {
              this.rankState = {
                ...this.rankState,
                validity: INPUT_VALIDITY.PENDING
              };
              this.onInputFocus();
            },
            (state) => {
              let isValid = Rank.isValid(state.value.toUpperCase());
              if (state.validity !== INPUT_VALIDITY.PENDING && !isValid) {
                state.validity = INPUT_VALIDITY.INVALID;
              }
              this.rankState = state;
            },
            {
              placeholder: 'Rank',
              label: 'Rank',
              id: 'rank',
              changeText: (text: string) => text.replace(/\W/g, '')
            }
          )}
          ${textInput(
            this.nameState,
            () => {
              this.nameState = {
                ...this.nameState,
                validity: INPUT_VALIDITY.PENDING
              };
              this.onInputFocus();
            },
            (state) => (this.nameState = state),
            {
              placeholder: 'Name',
              label: 'Name',
              id: 'name'
            }
          )}
        </div>

        <div id="email" class="row-box">
          ${textInput(
            this.emailState,
            () => {
              this.emailState = {
                ...this.emailState,
                validity: INPUT_VALIDITY.PENDING
              };
              this.onInputFocus();
            },
            (state) => (this.emailState = state),
            {
              placeholder: 'Email',
              label: 'Email',
              changeText: (text: string) => text.replace(/\W/g, '')
            }
          )}

          <p>@${this.branch?.domain}</p>
        </div>

        <div id="password" class="row-box">
          ${passwordInput(
            this.passwordState,
            () => {
              this.passwordState = {
                ...this.passwordState,
                validity: INPUT_VALIDITY.PENDING
              };
              this.onInputFocus();
            },
            (state) => (this.passwordState = state),
            () => {}
          )}

          <button
            plain
            id="change"
            ?hidden="${!this.editing}"
            @click=${this.changePassword()}
          >
            change
          </button>
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
          @click=${this.submit()}
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

        <p class="error card" ?show=${this.errorState.visible}>
          ${this.errorState.message}
        </p>
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

        .row-box {
          width: 100%;
          display: flex;
          align-items: center;
        }

        #rankname,
        #password {
          margin-bottom: 10px;
        }

        #email {
          margin-bottom: 8px;
        }

        input {
          margin: 0;
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

        .regular-box > label {
          font-size: 1rem;
        }

        .regular-box > input {
          margin: 0 10px 0 0;
          position: relative;
        }

        .regular-box > input::before {
          position: absolute;
          top: -5px;
          bottom: -5px;
          left: -5px;
          right: -5px;
          border-radius: 30px;
          content: '';
          z-index: -1;
          background-color: transparent;
          transition: background-color 0.3s;
        }

        .regular-box > input:focus::before,
        .regular-box > input:active::before {
          background-color: #cacad8;
        }

        @media (hover: hover) {
          .regular-box > input:hover::before {
            background-color: #cacad8;
          }
        }

        .error {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3rem;
          text-align: center;
          color: var(--color-primary);
          margin: 0;
          padding: 10px;
          border-radius: 5px;
          transform: translateY(50%);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
        }

        .error[show] {
          transform: translateY(0);
          opacity: 1;
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
