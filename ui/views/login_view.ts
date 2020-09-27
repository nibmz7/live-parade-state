import { LitElement, html, customElement, css } from 'lit-element';
import {
  inputStyles,
  cardStyles,
  buttonStyles,
  globalStyles,
  passwordInputStyles
} from '../global_styles';
import { ApplicationStore, ACTION_ROOT } from '../../data/store';
import {
  AuthStoreState,
  AUTH_STATE,
  SignInError,
  SignInCredentials
} from '../../data/states/auth_state';
import { Unsubscribe } from 'redux';
import ACTION_AUTH from '../../data/actions/auth_action';
import { onPressed } from '../utils';
import {
  emailInput,
  InputState,
  INPUT_VALIDITY,
  passwordInput,
  PasswordInputState
} from '../base/input';

declare global {
  interface Window {
    PasswordCredential: any;
  }
}

@customElement('login-view')
export class LoginView extends LitElement {
  private isProcessing = false;
  private emailState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private passwordState: PasswordInputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING,
    visible: false
  };
  private errorMessage = '';
  private errorVisible = false;

  static get properties() {
    return {
      isProcessing: { type: Boolean },
      emailState: { type: Object },
      passwordState: { type: Object },
      errorMessage: { type: String },
      errorVisible: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const listener = (state: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (state.action.type === AUTH_STATE.REQUEST_SIGN_IN_FAILED) {
        let error = state.action.payload as SignInError;
        this.isProcessing = false;
        this.showError(error.message);
      } else if (state.action.type === AUTH_STATE.SIGNED_IN) {
        unsubscribe();
        this.successfullLogin();
      }
    };
    ApplicationStore.listen(ACTION_ROOT.AUTH, listener);

    if (window.PasswordCredential) {
      navigator.credentials
        .get({
          password: true,
          mediation: 'required'
        })
        .then((c?) => {
          if (c) {
            let passwordCredential = c as PasswordCredential;
            this.emailState.value = passwordCredential.id;
            this.passwordState.value = passwordCredential.password!;
          }
        });
    }
  }

  private successfullLogin() {
    if (window.PasswordCredential) {
      var c = new window.PasswordCredential({
        id: this.emailState.value,
        password: this.passwordState.value
      });
      navigator.credentials.store(c);
    }
    let event = new Event('signed-in');
    this.dispatchEvent(event);
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.errorVisible = true;
  }

  private onSubmit = onPressed((e: Event) => {
    e.preventDefault();
    if (this.emailState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid email address!');
      return;
    } else if (this.passwordState.validity !== INPUT_VALIDITY.VALID) {
      this.showError('Please enter a valid password!');
      return;
    }
    if (this.isProcessing) return;
    this.isProcessing = true;
    let credentials: SignInCredentials = {
      email: this.emailState.value,
      password: this.passwordState.value
    };
    let action = ACTION_AUTH.requestSignIn(credentials);
    ApplicationStore.dispatch(action);
  });

  render() {
    return html`
      <div id="root" tabindex="0" class="selectable">
        <form
          id="form"
          class="card"
          @submit="${(e: Event) => e.preventDefault()}"
          novalidate
        >
          <h3>Sign in</h3>

          ${emailInput(
            this.emailState,
            (state) => (this.emailState = state),
            () => (this.errorVisible = false)
          )}
          ${passwordInput(
            this.passwordState,
            (state) => (this.passwordState = state),
            () => (this.errorVisible = false),
            (e) => this.onSubmit(e)
          )}

          <button
            id="submit"
            tabindex="0"
            @click=${this.onSubmit}
            @keydown="${(e: Event) => {
              let key = (e as KeyboardEvent).key;
              if (key === 'Tab') {
                this.shadowRoot?.getElementById('root')?.focus();
              }
            }}"
            solid
          >
            ${this.isProcessing ? 'Loading...' : 'Continue'}
          </button>

          <p
            id="error"
            aria-label="Input error"
            ?aria-errormessage="${this.errorVisible}"
            aria-hidden="${!this.errorVisible}"
          >
            ${this.errorMessage}
          </p>
        </form>
      </div>
    `;
  }

  static get styles() {
    return [
      globalStyles,
      inputStyles,
      passwordInputStyles,
      cardStyles,
      buttonStyles,
      css`
        #root {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        form {
          width: 70%;
          transform: translateY(var(--offset-height));
          transition: transform .3s;
        }

        h3 {
          margin: 15px 0 10px;
        }

        .card {
          border-radius: 5px;
          padding: 10px 20px;
        }

        input[type='email'] {
          margin-bottom: 0px;
        }

        #submit {
          font-size: 1.2rem;
          width: 100%;
        }

        #error {
          max-height: 0px;
          opacity: 0;
          transition: 0.5s all;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 0.8rem;
        }

        #error[aria-hidden='false'] {
          max-height: 2.4rem;
          opacity: 1;
        }
      `
    ];
  }
}
