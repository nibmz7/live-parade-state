import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query
} from 'lit-element';
import { ApplicationStore } from '../../../data/store';
import { STATUSES } from '../../../model/status';
import User from '../../../model/user';
import {
  buttonStyles,
  cardStyles,
  fadeAnimation,
  globalStyles,
  slideAnimation
} from '../../global_styles';
import { onPressed } from '../../utils';

interface StatusCodes {
  [type: string]: Array<User>;
}

@customElement('summary-view')
export default class SummaryView extends LitElement {
  private isOpening = true;

  @query('#root') _root!: HTMLElement;

  @property({ type: Boolean }) shouldClose = false;
  @property({ type: Array }) users!: Array<User>;
  @property({ type: Number }) selectedCode = 0;
  @property({ type: Object }) statusCodes!: StatusCodes;

  private init() {
    this.users = ApplicationStore.users.sortedUsers.slice();
    const statusCodes: { [type: string]: Array<User> } = {};
    this.users.map((user) => {
      const status = user.morning!;
      if (!(user.morning!.code in statusCodes)) statusCodes[status.code] = [];
      statusCodes[status.code].push(user);
    });
    this.statusCodes = statusCodes;
    this.selectedCode = Number(Object.keys(statusCodes)[0]);
  }

  connectedCallback() {
    this.init();
    super.connectedCallback();
  }

  codeChanged(code: number) {
    return onPressed(() => {
      this.selectedCode = code;
    });
  }

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
    return html` <div class="scrim" ?close="${this.shouldClose}"></div>
      <div id="root" ?close="${this.shouldClose}">
        <div class="status-selector">
          ${Object.keys(this.statusCodes).map((code) => {
            const count = this.statusCodes[code].length;
            return html`
              <button
                outline
                ?selected="${Number(code) === this.selectedCode}"
                @click=${this.codeChanged(Number(code))}
              >
                ${STATUSES[code].name} (${count})
              </button>
            `;
          })}
        </div>

        <div id="user-list" class="card">
          <h4 id="header">7 Total ~ 0 Regular + 1 Nsf</h4>
          ${this.statusCodes[this.selectedCode].map((user) => {
            return html`<div class="user">
              <p class="fullname" ?regular="${user.regular}">
                ${user.fullname}
              </p>
              <p class="remarks">
                ${user.morning!.remarks}
                ${user.morning!.expired ? html`<span>-- Expired</span>` : ''}
              </p>
            </div>`;
          })}
        </div>

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
      fadeAnimation,
      css`
        #header {
          margin: 0px;
          text-align: center;
          padding: 10px;
          border-bottom: 2px dashed rgb(66, 59, 57);
          font-weight: 600;
        }

        .status-selector {
          display: flex;
          flex-wrap: wrap;
          row-gap: 10px;
          column-gap: 10px;
        }
        .status-selector > button {
          font-size: 0.8rem;
          border-radius: 35px;
          padding: 5px 10px;
          line-height: 0.8rem;
        }

        .status-selector > button[selected] {
          background-color: var(--color-primary);
          color: white;
        }

        #user-list {
          margin-top: 20px;
          border-radius: 15px;
        }

        .user {
          padding: 0.65rem 15px;
        }

        .user p {
          margin: 0;
        }

        .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
        }

        .fullname[regular] {
          color: var(--color-primary);
        }

        .remarks {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
        }

        .remarks span {
          color: var(--color-error);
          font-weight: 500;
          text-transform: capitalize;
        }

        .scrim {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0000004a;
          animation: fade-in 1s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .scrim[close] {
          animation: fade-out 0.8s 0.1s cubic-bezier(0.77, 0, 0.175, 1);
        }

        #root {
          padding: 30px;
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
          box-shadow: rgb(0 0 0 / 20%) -2px 0px 6px -3px;
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
