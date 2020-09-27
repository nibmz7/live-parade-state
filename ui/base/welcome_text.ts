import { LitElement, html, customElement, css, property } from 'lit-element';
import { buttonStyles, globalStyles } from '../global_styles';

@customElement('welcome-text')
export default class CustomDialog extends LitElement {
  @property({ type: Boolean }) showSignOutDialog = false;

  render() {
    return html`<button
      tabindex="0"
      @click="${() => (this.showSignOutDialog = true)}"
      aria-label="Open sign out dialog"
      plain
    >
      <slot></slot>
    </button>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      css`
        button {
          position: absolute;
          width: 100%;
          padding: 10px;
          z-index: 10;
          font-weight: 500;
          font-size: 1.1rem;
          box-shadow: none;
          background: #faf5fab8;
          backdrop-filter: blur(2px);
          color: var(--color-primary-dark);
          border-radius: 0px;
        }
        #root.elevation {
          box-shadow: 0px 1px 2px 1px #928d8d4f;
        }
      `
    ];
  }
}
