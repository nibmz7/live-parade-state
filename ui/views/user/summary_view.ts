import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query
} from 'lit-element';
import { Unsubscribe } from 'redux';
import { REQUEST_TYPES } from '../../../data/data_manager';
import { UserStoreState } from '../../../data/states/user_state';
import { ACTION_ROOT, ApplicationStore } from '../../../data/store';
import Status, { STATUSES, STATUS_CATEGORY } from '../../../model/status';
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
  [type: string]: {
    users: Array<User>;
    regular: number;
    nsf: number;
  };
}

const CODE_NOT_SET = 'a-0';
const CODE_PRESENT = 'a-1';
const CODE_PRESENT_REMARKS = 'a-11';
const CODE_EXPIRED = 'a-00';

const STATUS_NAMES = {
  ...STATUSES.reduce((acc, status, index) => {
    acc[`a-${index}`] = status.name;
    return acc;
  }, {}),
  [CODE_EXPIRED]: 'EXPIRED',
  [CODE_PRESENT_REMARKS]: 'PRESENT (REMARKS)'
};

const StatusCodeDefault = () => ({ users: [], regular: 0, nsf: 0 });

const StatusCodesDefault = () => ({
  [CODE_NOT_SET]: StatusCodeDefault(),
  [CODE_EXPIRED]: StatusCodeDefault(),
  [CODE_PRESENT]: StatusCodeDefault(),
  [CODE_PRESENT_REMARKS]: StatusCodeDefault()
});

const StatsCountDefault = () => new Array(STATUS_CATEGORY.length).fill(0);

@customElement('summary-view')
export default class SummaryView extends LitElement {
  private isOpening = true;
  private initialHeight = 0;
  private usersUnsubscribe?: Unsubscribe;

  @query('#root') _root!: HTMLElement;
  @query('#header') _header!: HTMLElement;
  @query('#status-card', true) _statusCard!: HTMLElement;
  @query('#user-list', true) _userList!: HTMLElement;

  @property({ type: Array }) statsCount!: number[];
  @property({ type: Array }) users!: Array<User>;
  @property({ type: Object }) statusCodes!: StatusCodes;
  @property({ type: String }) listHeight!: string;
  @property({ type: String }) selectedCode!: string;
  @property({ type: Boolean }) isMorning!: boolean;
  @property({ type: Boolean }) shouldClose = false;

  private init() {
    this.users = ApplicationStore.users.sortedUsers.slice();
    const statusCodes = StatusCodesDefault();
    this.users.map((user) => {
      this.statsCount = StatsCountDefault();
      const status = this.isMorning ? user.morning! : user.afternoon!;
      const categoryCode = STATUSES[status.code].category;
      this.statsCount[categoryCode]++;
      let code = `a-${status.code}`;
      if (status.expired) code = CODE_EXPIRED;
      else if (Status.isPresent(status.code) && status.remarks.length > 0) {
        code = CODE_PRESENT_REMARKS;
      }
      if (!(code in statusCodes)) {
        statusCodes[code] = StatusCodeDefault();
      }
      statusCodes[code].users.push(user);
      user.regular ? statusCodes[code].regular++ : statusCodes[code].nsf++;
    });
    this.statusCodes = statusCodes;
    for (const key of Object.keys(statusCodes)) {
      if (statusCodes[key].users.length === 0) delete statusCodes[key];
    }
    this.selectedCode = Object.keys(statusCodes)[0];
  }

  connectedCallback() {
    super.connectedCallback();
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      (state: UserStoreState) => {
        if (REQUEST_TYPES.includes(state.action.type)) return;
        this.init();
      }
    );
  }

  codeChanged(code: string) {
    return onPressed(() => {
      this.selectedCode = code;
    });
  }

  close() {
    return onPressed(() => {
      this.usersUnsubscribe?.();
      if (!this.isOpening) this.shouldClose = true;
    });
  }

  firstUpdated() {
    this.initialHeight = this._header.clientHeight;
    this._statusCard.style.height = `${this.initialHeight}px`;
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

  updated(changedProperties: Map<any, any>) {
    if (changedProperties.has('selectedCode')) {
      const height = this._userList.scrollHeight;
      this._statusCard.style.height = `${this.initialHeight + height}px`;
    }
  }

  shouldUpdate(changedProperties: Map<any, any>) {
    if (changedProperties.has('isMorning')) {
      this.init();
    }
    return true;
  }

  render() {
    const status = this.statusCodes[this.selectedCode];
    const regular = status.regular;
    const nsf = status.nsf;
    const total = regular + nsf;
    return html` <div class="scrim" ?close="${this.shouldClose}"></div>
      <div id="root" ?close="${this.shouldClose}">
        <h4>Summary - ${this.users.length} Total</h4>

        <div class="status-selector">
          ${Object.keys(this.statusCodes).map((code) => {
            const count = this.statusCodes[code].users.length;
            return html`
              <button
                outline
                ?selected="${code === this.selectedCode}"
                @click=${this.codeChanged(code)}
              >
                ${STATUS_NAMES[code]} (${count})
              </button>
            `;
          })}
        </div>

        <div id="status-card" class="card">
          <h4 id="header">${total} Total ~ ${regular} Regular + ${nsf} Nsf</h4>
          <div id="user-list">
            ${status.users.map((user) => {
              const status = this.isMorning ? user.morning! : user.afternoon!;
              return html`<div class="user">
                <p class="fullname" ?regular="${user.regular}">
                  ${user.fullname}
                </p>
                <p class="remarks">
                  ${status.remarks}
                  ${status.expired ? html`<span>-- Expired</span>` : ''}
                </p>
              </div>`;
            })}
          </div>
        </div>

        <button id="close" solid @click="${this.close()}">X</button>
        <button id="view-stats" solid>View Statistics</button>
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
        #user-list {
          height: 0;
        }

        #header {
          margin: 0px;
          text-align: center;
          padding: 10px;
          background: var(--color-primary);
          border-radius: 15px 15px 0 0;
          color: white;
          font-weight: 600;
        }

        #root > h4 {
          margin-top: 0;
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

        #status-card {
          margin-top: 20px;
          border-radius: 15px;
          justify-content: end;
          overflow: hidden;
          transition: height 0.5s;
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
          animation: fade-in 0.5s;
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
          animation: slide-in-from-right 0.5s backwards;
          box-shadow: rgb(0 0 0 / 20%) -2px 0px 6px -3px;
        }

        .scrim[close] {
          animation: fade-out 0.5s 0.3s;
        }

        #root[close] {
          animation: slide-out-to-right 0.5s 0.3s;
        }

        #root[close] > button {
          animation: slide-out 0.3s forwards;
        }

        #root[close] > #close {
          animation-delay: 0s;
        }

        #root[close] > #view-stats {
          animation-delay: 0.1s;
        }

        button {
          font-weight: 500;
        }

        #close,
        #view-stats {
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
          animation-delay: 0.5s;
        }

        #view-stats {
          position: absolute;
          bottom: 10px;
          left: 27%;
          padding: 15px;
          border-radius: 35px;
          animation-delay: 0.6s;
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
