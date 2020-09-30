import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query
} from 'lit-element';
import { cardStyles, fadeAnimation, globalStyles } from '../global_styles';

export enum DIALOG_STATE {
  OPENING,
  OPENED,
  CLOSING,
  STALLING
}

@customElement('custom-dialog')
export default class CustomDialog extends LitElement {
  @property({ type: Number }) state = DIALOG_STATE.OPENING;
  @property({ type: Boolean }) closePrompt = false;
  @query('#dialog') _dialog!: HTMLElement;

  firstUpdated() {
    let listener = () => {
      if (this.state === DIALOG_STATE.OPENING) {
        this.state = DIALOG_STATE.OPENED;
      } else if (this.state === DIALOG_STATE.CLOSING) {
        this._dialog.removeEventListener('animationend', listener);
        this.dispatchEvent(
          new Event('close', { bubbles: true, composed: true })
        );
      }
    };
    this._dialog.addEventListener('animationend', listener);
  }

  reset() {
    this.closePrompt = true;
    this.dispatchEvent(new Event('reset'));
  }

  close() {
    if (this.state === DIALOG_STATE.STALLING) {
      this.reset();
    } else if (this.state === DIALOG_STATE.OPENED)
      this.state = DIALOG_STATE.CLOSING;
  }

  render() {
    return html`<div
      tabindex="0"
      id="root"
      class="selectable"
      ?hide="${this.state === DIALOG_STATE.CLOSING}"
      ?show="${this.state === DIALOG_STATE.OPENING}"
      ?ready="${this.state === DIALOG_STATE.OPENED ||
      this.state === DIALOG_STATE.STALLING}"
      aria-label="Close dialog"
      @click="${this.close}"
    >
      <div
        id="dialog"
        class="dialog card"
        aria-label="Dialog"
        @click="${(e: Event) => {
          e.stopPropagation();
          if (this.state === DIALOG_STATE.STALLING) {
            const isInput = (e.composedPath()[0] as HTMLElement).tagName
              .toLowerCase()
              .includes('input');
            if (isInput) return;
            this.reset();
          }
        }}"
      >
        <slot></slot>

        ${this.closePrompt
          ? html` <div class="close-prompt" @click="${this.close}">
              <p>Tap again to close</p>
            </div>`
          : ''}
      </div>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      cardStyles,
      fadeAnimation,
      css`
        :host {
          --offset-item-height: 0px;
          --total-offset-height: calc(
            var(--offset-height) - var(--offset-item-height)
          );
          --offset-dialog: calc(var(--total-offset-height) * var(--offset-on));
        }

        .close-prompt {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -20%;
          text-align: center;
          pointer-events: auto;
          animation: fade-in 0.3s;
        }

        .close-prompt > p {
          padding: 10px;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.1);
          display: inline-block;
        }

        #root {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          width: 100%;
          height: 100%;
          padding: 0 15px;
          display: flex;
          overflow: hidden;
          align-items: center;
          box-sizing: border-box;
          justify-content: center;
          backdrop-filter: blur(2px);
          background: rgba(0, 0, 0, 0.2);
          -webkit-backdrop-filter: blur(2px);
        }

        #root[show] {
          animation: fade-in 0.5s;
        }

        #root[hide] {
          animation: fade-out 0.5s;
        }

        .dialog {
          width: 100%;
          box-sizing: border-box;
          border-radius: 5px;
          padding: 15px 20px;
          pointer-events: none;
          transform: perspective(100px) translateZ(0px)
            translateY(var(--offset-dialog));
        }

        #root[show] > .dialog {
          animation: scale-in 0.5s;
        }

        #root[hide] > .dialog {
          animation: scale-out 0.5s;
        }

        #root[ready] > .dialog {
          pointer-events: auto;
          transition: transform 0.3s;
        }

        @keyframes scale-in {
          from {
            transform: perspective(100px) translateZ(10px)
              translateY(var(--offset-dialog));
          }
          to {
            transform: perspective(100px) translateZ(0px);
          }
        }

        @keyframes scale-out {
          to {
            transform: perspective(100px) translateZ(10px)
              translateY(var(--offset-dialog));
          }
        }
      `
    ];
  }
}
