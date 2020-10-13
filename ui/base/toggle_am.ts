import { css, customElement, LitElement, property } from 'lit-element';
import { html } from 'lit-html';
import { buttonStyles, globalStyles } from '../global_styles';
import { onPressed } from '../utils';

@customElement('toggle-am')
export default class ToggleAM extends LitElement {
  @property({ type: Boolean }) isMorning = true;

  toggleAm() {
    return onPressed(() => {
      this.isMorning = !this.isMorning;
      this.dispatchEvent(new Event('toggle-am'));
    });
  }

  render() {
    return html`
      <div id="root">
        <button
          outline
          static
          ?selected="${this.isMorning}"
          @click="${this.toggleAm()}"
        >
          AM
        </button>
        <button
          outline
          static
          ?selected="${!this.isMorning}"
          @click="${this.toggleAm()}"
        >
          PM
        </button>
      </div>
    `;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      css`
        :host {
          --padding-button: 8px;
        }

        #root {
          display: flex;
          height: inherit;
        }

        button {
          box-sizing: border-box;
          height: inherit;
          font-weight: 600;
          padding: var(--padding-button);
          border-color: var(--color-primary);
        }

        button:first-child {
          border-radius: 35px 0 0 35px;
        }

        button:last-child {
          border-radius: 0 35px 35px 0;
        }
      `
    ];
  }
}
