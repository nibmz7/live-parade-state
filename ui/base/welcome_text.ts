import { LitElement, html, customElement, css, property } from 'lit-element';
import { buttonStyles, globalStyles } from '../global_styles';
import { onPressed } from '../utils';
import '../dialogs/sign_out';

@customElement('welcome-text')
export default class CustomDialog extends LitElement {
  @property({ type: Boolean }) showSignOutDialog = false;
  @property({ type: Boolean }) elevate = false;

  firstUpdated() {
    this.addEventListener('elevate', (e) => {
      this.elevate = (e as CustomEvent).detail;
    });
  }

  render() {
    return html`<button
        id="welcome-text"
        tabindex="0"
        @click="${onPressed(() => (this.showSignOutDialog = true))}"
        aria-label="Open sign out dialog"
        plain
        ?elevate="${this.elevate}"
      >
        <slot></slot>
      </button>

      ${this.showSignOutDialog
        ? html`<sign-out
            @close="${() => (this.showSignOutDialog = false)}"
          ></sign-out>`
        : ''}`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      css`
        #welcome-text {
          transition: box-shadow 0.5s, background-color 0.5s;
        }
        button {
          position: absolute;
          width: 100%;
          padding: 10px;
          z-index: 99;
          font-weight: 500;
          font-size: 1.1rem;
          box-shadow: none;
          background: #faf5fab8;
          color: var(--color-primary-dark);
          border-radius: 0px;
        }
        button[elevate] {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
          background-color: rgb(153 153 153 / 10%);
        }
      `
    ];
  }
}
