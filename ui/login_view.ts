import { LitElement, html, customElement, css } from 'lit-element';
import {
  inputStyles,
  cardStyles,
  buttonStyles,
  globalStyles
} from './global_styles';
import { ApplicationStore, ACTION_ROOT } from '../data/store';
import {
  AuthStoreState,
  AuthState,
  SignInError,
  SignInCredentials
} from '../data/states/auth_state';
import { Unsubscribe } from 'redux';
import ACTION_AUTH from '../data/actions/auth_action';
import { onPressed } from './utils';
import { emailInput, INPUT_STATE, passwordInput } from './input';

declare global {
  interface Window {
    PasswordCredential: any;
  }
}

@customElement('login-view')
export class LoginView extends LitElement {
  private isProcessing = false;
  private emailValue = '';
  private emailState = INPUT_STATE.PENDING;
  private passwordValue = '';
  private passwordState = INPUT_STATE.PENDING;
  private passwordVisibility = false;
  private errorMessage = '';
  private errorVisible = false;

  private onSubmit = onPressed((e: Event) => {
    e.preventDefault();
    if (this.emailState !== INPUT_STATE.VALID) {
      this.showError('Please enter a valid email address!');
      return;
    } else if (this.passwordState !== INPUT_STATE.VALID) {
      this.showError('Please enter a valid password!');
      return;
    }
    if (this.isProcessing) return;
    this.isProcessing = true;
    let credentials: SignInCredentials = {
      email: this.emailValue,
      password: this.passwordValue
    };
    let action = ACTION_AUTH.requestSignIn(credentials);
    ApplicationStore.dispatch(action);
  });

  static get properties() {
    return {
      isProcessing: { type: Boolean },
      emailValue: { type: String, attribute: false },
      emailIsValid: { type: Number },
      passwordValue: { type: String, attribute: false },
      passwordState: { type: Number },
      passwordVisibility: { type: Boolean },
      errorMessage: { type: String },
      errorVisible: { type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const listener = (state: AuthStoreState, unsubscribe: Unsubscribe) => {
      if (state.action.type === AuthState.REQUEST_SIGN_IN_FAILED) {
        let error = state.action.payload as SignInError;
        this.isProcessing = false;
        this.showError(error.message);
      } else if (state.action.type === AuthState.SIGNED_IN) {
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
            this.emailValue = passwordCredential.id;
            this.passwordValue = passwordCredential.password!;
          }
        });
    }
  }

  private successfullLogin() {
    if (window.PasswordCredential) {
      var c = new window.PasswordCredential({
        id: this.emailValue,
        password: this.passwordValue
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

  render() {
    return html`
      <form
        id="form"
        class="card"
        @submit="${(e: Event) => e.preventDefault()}"
        novalidate
      >
        <h3>Sign in</h3>

        ${emailInput(
          this.emailValue,
          this.emailState,
          (email) => (this.emailValue = email),
          (state) => (this.emailState = state)
        )}
        ${passwordInput(
          this.passwordValue,
          this.passwordState,
          this.passwordVisibility,
          (value) => (this.passwordValue = value),
          (state) => (this.passwordState = state),
          (visible) => (this.passwordVisibility = visible)
        )}

        <button id="login" tabindex="0" @click=${this.onSubmit}>
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
    `;
  }

  static get styles() {
    return [
      globalStyles,
      inputStyles,
      cardStyles,
      buttonStyles,
      css`
        #email {
          margin-bottom: 0px;
        }

        h3 {
          margin: 15px 0 10px;
        }

        .card {
          border-radius: 5px;
          padding: 10px 20px;
        }

        input[valid] {
          border-color: var(--color-input-primary);
        }

        #login {
          font-size: 1.2rem;
        }

        #password {
          width: 100%;
        }

        .password-container {
          position: relative;
        }

        .password-toggle {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 15px;
          top: 15px;
          bottom: 15px;
          margin-top: auto;
          margin-bottom: auto;
          fill: rgb(151, 147, 147);
          cursor: pointer;
        }

        .password-toggle::after {
          background-image: radial-gradient(
            circle farthest-side,
            rgba(0, 0, 0, 0.12),
            rgba(0, 0, 0, 0.12) 80%,
            rgba(0, 0, 0, 0) 100%
          );
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: -5px;
          right: -5px;
          content: '';
          visibility: hidden;
        }

        .password-toggle:focus::after {
          visibility: visible;
          animation: pulse 0.7s infinite alternate;
        }

        @keyframes pulse {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .password-toggle > svg > #stroke {
          transform: scale(0);
          transition: transform 0.3s;
          transform-origin: 10% 10%;
        }

        .password-toggle[visible] > svg > #stroke {
          transform: scale(1);
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
