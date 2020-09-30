import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query
} from 'lit-element';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  slideAnimation
} from '../../global_styles';
import { onPressed } from '../../utils';

@customElement('summary-view')
export default class SummaryView extends LitElement {
  private isOpening = true;

  @query('#root') _root!: HTMLElement;

  @property({ type: Boolean }) shouldClose = false;

  firstUpdated() {
    const onClose = (e: AnimationEvent) => {
      if (e.animationName === 'slide-out-to-right') {
        this.removeEventListener('animationend', onClose);
        this.dispatchEvent(new Event('on-close'));
      }
      if (e.animationName === 'slide-in') {
        this.isOpening = false;
      }
    };
    this._root.addEventListener('animationend', onClose);
  }

  close() {
    return onPressed(() => {
      if (!this.isOpening) this.shouldClose = true;
    });
  }

  render() {
    return html`<div id="root" ?close="${this.shouldClose}">
      <button id="close" solid @click="${this.close()}">X</button>
      <button id="download" solid>Download file</button>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      slideAnimation,
      css`
        #root {
          overflow: hidden;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          z-index: 20;
          animation: slide-in-from-right 1s cubic-bezier(0.77, 0, 0.175, 1)
            backwards;
          box-shadow: -1px 0 6px -3px #00000096;
        }

        #root[close] {
          animation: slide-out-to-right 0.8s 0.1s
            cubic-bezier(0.77, 0, 0.175, 1);
        }

        #root[close] > button {
          animation: slide-out 0.3s forwards;
        }

        #root[close] > #close {
          animation-delay: 0s;
        }

        #root[close] > #download {
          animation-delay: 0.1s;
        }

        button {
          font-weight: 500;
          --should-fade: 0;
          --offset-y: 150%;
          animation: slide-in 0.5s backwards;
        }

        #close {
          position: absolute;
          bottom: 10px;
          left: 10px;
          padding: 7px 15px;
          border-radius: 35px;
          animation-delay: 0.8s;
        }

        #download {
          position: absolute;
          bottom: 10px;
          left: 27%;
          padding: 15px;
          border-radius: 35px;
          animation-delay: 0.9s;
        }

        @keyframes slide-out {
          to {
            transform: translateY(var(--offset-y));
          }
        }

        @keyframes slide-in-from-right {
          from {
            transform: translateX(105%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slide-out-to-right {
          to {
            transform: translateX(105%);
          }
        }
      `
    ];
  }
}
