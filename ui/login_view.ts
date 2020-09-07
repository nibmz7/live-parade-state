import { LitElement, html, customElement, property, css } from 'lit-element';
import { inputStyles, cardStyles, buttonStyles } from './global_styles';

const enum INPUT_STATE {
  PENDING,
  INVALID,
  VALID
}

@customElement('login-view')
export class LoginView extends LitElement {
  @property({ type: Boolean })
  isProcessing = false;

  @property({ type: String, attribute: false })
  emailValue = '';

  @property({ type: String, attribute: false })
  passwordValue = '';

  @property({ type: Number })
  emailIsValid = INPUT_STATE.PENDING;

  @property({ type: Number })
  passwordIsValid = INPUT_STATE.PENDING;

  @property({ type: Boolean })
  passwordVisibility = false;

  @property({ type: Boolean })
  errorVisible = false;

  @property({ type: String })
  errorMessage = '';

  private onSubmit(e: Event) {
    e.preventDefault();
    if (this.emailIsValid !== INPUT_STATE.VALID) {
      this.errorMessage = 'Please enter a valid email address!';
      this.errorVisible = true;
      return;
    } else if (this.passwordIsValid !== INPUT_STATE.VALID) {
      this.errorMessage = 'Please enter a valid password!';
      this.errorVisible = true;
      return;
    }
    if (this.isProcessing) return;
    this.isProcessing = true;
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

  private togglePasswordVisiblity() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  render() {
    return html`
      <form class="card" @submit="${this.onSubmit}" novalidate>
        <h3>Sign in</h3>

        <label for="email" class="visuallyhidden">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          required
          aria-label="Email input"
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
            required
            aria-label="Password input"
            type="${this.passwordVisibility ? 'text' : 'password'}"
            ?invalid="${this.passwordIsValid === INPUT_STATE.INVALID}"
            ?valid="${this.passwordIsValid === INPUT_STATE.VALID}"
            @focus="${this.resetInput}"
            @blur="${this.updateInputValue}"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            class="password-toggle"
            @click="${this.togglePasswordVisiblity}"
            ?visible="${this.passwordVisibility}"
            des
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

        <button id="login">
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
          position: absolute;
          right: 15px;
          top: 0;
          bottom: 0;
          margin-top: auto;
          margin-bottom: auto;
        }

        .password-toggle > #stroke {
          transform: scale(0);
          transition: transform 0.3s;
          transform-origin: 10% 10%;
        }

        .password-toggle[visible] > #stroke {
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
