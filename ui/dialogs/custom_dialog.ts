import { LitElement, html, customElement, css } from 'lit-element';
import { cardStyles, fadeAnimation, globalStyles } from '../global_styles';

export enum DIALOG_STATE {
  OPENING,
  OPENED,
  CLOSING
}

@customElement('custom-dialog')
export default class CustomDialog extends LitElement {
  private state = DIALOG_STATE.OPENING;

  static get properties() {
    return { state: { type: Number } };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    let dialog = this.shadowRoot?.getElementById('dialog');
    let listener = () => {
      if (this.state === DIALOG_STATE.OPENING) {
        this.state = DIALOG_STATE.OPENED;
      } else if (this.state === DIALOG_STATE.CLOSING) {
        dialog?.removeEventListener('animationend', listener);
        this.dispatchEvent(
          new Event('close', { bubbles: true, composed: true })
        );
      }
    };
    dialog?.addEventListener('animationend', listener);
  }

  close() {
    if (this.state === DIALOG_STATE.OPENED) this.state = DIALOG_STATE.CLOSING;
  }

  render() {
    return html`<div
      tabindex="0"
      id="root"
      ?hide="${this.state === DIALOG_STATE.CLOSING}"
      ?show="${this.state === DIALOG_STATE.OPENING}"
      ?ready="${this.state === DIALOG_STATE.OPENED}"
      @click="${this.close}"
      aria-label="Close dialog"
    >
      <div
        id="dialog"
        class="card"
        @click="${(e: Event) => e.stopPropagation()}"
        aria-label="Dialog"
      >
        <slot></slot>
      </div>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      cardStyles,
      fadeAnimation,
      css`
        #root {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          height: 100%;
          width: 100%;
          padding: 0 15px;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(2px);
        }

        #root[show] {
          animation: fade-in 0.5s;
        }

        #root[hide] {
          animation: fade-out 0.3s;
        }

        #dialog {
          width: 100%;
          box-sizing: border-box;
          border-radius: 5px;
          padding: 15px 20px;
          transform: perspective(100px) translateZ(0px)
            translateY(var(--offset-height));
          pointer-events: none;
        }

        #root[show] > #dialog {
          animation: scale-in 0.5s;
        }

        #root[hide] > #dialog {
          animation: scale-out 0.3s;
        }

        #root[ready] > #dialog {
          pointer-events: auto;
          transition: transform .3s;
        }

        @keyframes scale-in {
          0% {
            transform: perspective(100px) translateZ(10px)
              translateY(var(--offset-height));
          }
          100% {
            transform: perspective(100px) translateZ(0px)
              translateY(var(--offset-height));
          }
        }

        @keyframes scale-out {
          0% {
            transform: perspective(100px) translateZ(0px)
              translateY(var(--offset-height));
          }
          100% {
            transform: perspective(100px) translateZ(10px)
              translateY(var(--offset-height));
          }
        }
      `
    ];
  }
}
