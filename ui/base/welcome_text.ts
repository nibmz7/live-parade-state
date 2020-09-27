import { LitElement, html, customElement, css, property } from 'lit-element';
import { buttonStyles, globalStyles } from '../global_styles';
import { onScroll } from '../utils';

export const shouldElevate = (welcomeText, container) =>
  onScroll(() => {
    let hasScrolled = false;
    const element = container as HTMLElement;
    if (element.scrollTop > 0) hasScrolled = true;
    welcomeText.dispatchEvent(
      new CustomEvent('has-scrolled', { detail: hasScrolled })
    );
  });

@customElement('welcome-text')
export default class CustomDialog extends LitElement {
  @property({ type: Boolean }) showSignOutDialog = false;
  @property({ type: Boolean }) elevate = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      'has-scrolled',
      (e: any) => (this.elevate = e.detail)
    );
  }

  render() {
    return html`<button
      tabindex="0"
      @click="${() => (this.showSignOutDialog = true)}"
      aria-label="Open sign out dialog"
      plain
      ?elevate="${this.elevate}"
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
        button[elevate] {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;
        }
      `
    ];
  }
}
