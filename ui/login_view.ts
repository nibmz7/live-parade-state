import { LitElement, html, customElement, property, css } from 'lit-element';
import { inputStyles, cardStyles, buttonStyles } from './global_styles';

@customElement('login-view')
export class LoginView extends LitElement {
  @property({ type: String, attribute: false })
  emailValue = '';

  @property({ type: Boolean })
  emailIsValid = true;

  private onSubmit(e: Event) {
    e.preventDefault();
  }

  private updateEmailValue(e: Event) {
    let input = e.target as HTMLInputElement;
    this.emailValue = input.value;
    this.emailIsValid = input.validity.valid;
    console.log(this.emailIsValid);
  }

  private reset() {
    this.emailIsValid = true;
  }

  render() {
    return html`
      <form class="card" @submit="${this.onSubmit}" novalidate>
        <h3>Sign in</h3>

        <label for="email" class="visuallyhidden">Email: </label>
        <input
          @change="${this.updateEmailValue}"
          ?invalid="${!this.emailIsValid}"
          @focus="${this.reset}"
          id="email"
          type="email"
          placeholder="Email"
          required
        />

        <label for="password" class="visuallyhidden">Password: </label>
        <input
          id="password"
          type="password"
          minlength="8"
          placeholder="Password"
          required
        />

        <button id="login">Continue</button>

        <p id="error"></p>
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

        #login {
          --button-font-size: 1rem;
          --button-padding: 7px;
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

        #error.show {
          max-height: 100px;
          opacity: 1;
        }
      `
    ];
  }
}
