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

const enum INPUT_STATE {
  PENDING,
  INVALID,
  VALID
}

declare global {
  interface Window {
    PasswordCredential: any;
  }
}

const onPressed = (
  callback: (e: Event) => any,
  autoBlur = true,
  debounce = true
) => {
  let isRunning = false;

  let onPressListener = (e: Event) => {
    if (isRunning) return;
    if (debounce) {
      isRunning = true;
      setTimeout(() => (isRunning = false), 1000);
    }
    if (autoBlur) {
      let element = e.target as HTMLElement;
      element.blur();
    }
    let eventType = e.type;
    if (eventType === 'click') callback(e);
    else if (eventType === 'keydown') {
      let key = (e as KeyboardEvent).key;
      if (key === 'Enter' || key === ' ') {
        callback(e);
      }
    }
  };

  return onPressListener;
};

@customElement('login-view')
export class LoginView extends LitElement {
  private isProcessing = false;
  private emailValue = '';
  private emailIsValid = INPUT_STATE.PENDING;
  private passwordValue = '';
  private passwordIsValid = INPUT_STATE.PENDING;
  private passwordVisibility = false;
  private errorMessage = '';
  private errorVisible = false;
  private togglePasswordVisiblity = onPressed(
    () => {
      this.passwordVisibility = !this.passwordVisibility;
    },
    false,
    false
  );

  private onSubmit = onPressed((e: Event) => {
    e.preventDefault();
    if (this.emailIsValid !== INPUT_STATE.VALID) {
      this.showError('Please enter a valid email address!');
      return;
    } else if (this.passwordIsValid !== INPUT_STATE.VALID) {
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
      passwordIsValid: { type: Number },
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
      navigator.credentials.get({
        password: true,
        mediation: 'required'
      }).then(c => {
        console.log(c);
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

  private updateInputValue(e: Event) {
    let input = e.target as HTMLInputElement;
    let inputValue = input.value;
    let inputIsValid: INPUT_STATE = INPUT_STATE.PENDING;
    if (inputValue.length > 0) {
      inputIsValid = input.validity.valid
        ? INPUT_STATE.VALID
        : INPUT_STATE.INVALID;
    }
    if (input.id === 'email') {
      this.emailValue = inputValue;
      this.emailIsValid = inputIsValid;
    } else {
      this.passwordValue = inputValue;
      this.passwordIsValid = inputIsValid;
    }
  }

  private resetInput(e: Event) {
    let input = e.target as HTMLInputElement;
    if (input.id === 'email') {
      this.emailIsValid = INPUT_STATE.PENDING;
    } else {
      this.passwordIsValid = INPUT_STATE.PENDING;
    }
    this.errorVisible = false;
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

        <input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          autocomplete="username"
          required
          aria-label="Email input"
          tabindex="0"
          ?invalid="${this.emailIsValid === INPUT_STATE.INVALID}"
          ?valid="${this.emailIsValid === INPUT_STATE.VALID}"
          @focus="${this.resetInput}"
          @blur="${this.updateInputValue}"
        />

        <div class="password-container">
          <input
            id="password"
            minlength="8"
            placeholder="Password"
            name="password"
            autocomplete="current-password"
            required
            aria-label="Password input"
            tabindex="0"
            type="${this.passwordVisibility ? 'text' : 'password'}"
            ?invalid="${this.passwordIsValid === INPUT_STATE.INVALID}"
            ?valid="${this.passwordIsValid === INPUT_STATE.VALID}"
            @focus="${this.resetInput}"
            @blur="${this.updateInputValue}"
          />

          <div
            tabindex="0"
            aria-label="Toggle password visibility"
            class="password-toggle selectable"
            @click="${this.togglePasswordVisiblity}"
            @keydown="${this.togglePasswordVisiblity}"
            ?visible="${this.passwordVisibility}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              />
              <path
                id="stroke"
                d="m2.71,3.16c-0.39,0.39 -0.39,1.02 0,1.41l16.32,16.33c0.39,0.39 1.02,0.39 1.41,0c0.39,-0.39 0.39,-1.02 0,-1.41l-16.31,-16.33c-0.39,-0.39 -1.03,-0.39 -1.42,0z"
              />
            </svg>
          </div>
        </div>

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
