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
  [CODE_PRESENT_REMARKS]: 'PRESENT (AWAY)',
  [CODE_PRESENT]: 'PRESENT (FALL-IN)'
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
  private initialHeight = 0;
  private usersUnsubscribe?: Unsubscribe;

  @query('#root') _root!: HTMLElement;
  @query('#status-count') _statusCount!: HTMLElement;
  @query('#stats') _stats!: HTMLElement;
  @query('#status-card', true) _statusCard!: HTMLElement;
  @query('#user-list', true) _userList!: HTMLElement;
  @query('#header', true) _header!: HTMLElement;
  @query('#status-card-container', true) _statusCardContainer!: HTMLElement;

  @property({ type: Array }) statsCount!: number[];
  @property({ type: Array }) users!: Array<User>;
  @property({ type: Object }) statusCodes!: StatusCodes;
  @property({ type: String }) listHeight!: string;
  @property({ type: String }) selectedCode!: string;
  @property({ type: Boolean }) isMorning!: boolean;
  @property({ type: Boolean }) showStats = false;
  @property({ type: Boolean }) fadeOutStats = false;
  @property({ type: Boolean }) closeView = false;
  @property({ type: Boolean }) openingView = true;

  private init() {
    this.statsCount = StatsCountDefault();
    this.users = ApplicationStore.users.sortedUsers.slice();
    const statusCodes = StatusCodesDefault();
    this.users.map((user) => {
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
      if (!this.openingView) this.closeView = true;
    });
  }

  hideStats() {
    this._stats.addEventListener(
      'animationend',
      () => {
        this.showStats = false;
        this.fadeOutStats = false;
      },
      { once: true }
    );
    this.fadeOutStats = true;
  }

  firstUpdated() {
    this.initialHeight = this._statusCount.clientHeight;
    this._statusCard.style.height = `${this.initialHeight}px`;
    const onClose = (e: AnimationEvent) => {
      if (e.animationName === 'slide-out-to-right') {
        this.removeEventListener('animationend', onClose);
        this.dispatchEvent(new Event('on-close'));
      }
      if (e.animationName === 'slide-in') {
        this.openingView = false;
      }
    };
    this._root.addEventListener('animationend', onClose);
  }

  updated(changedProperties: Map<any, any>) {
    const selectedCodeChanged = changedProperties.has('selectedCode');
    const isMorningChanged = changedProperties.has('isMorning');

    if (selectedCodeChanged || isMorningChanged) {
      const height = this._userList.scrollHeight;
      const offsetY = this._header.clientHeight;
      this._statusCard.style.height = `${this.initialHeight + height}px`;
      this._statusCardContainer.style.setProperty('--offset-y', `${offsetY}px`);
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
    return html` <div class="scrim" ?close="${this.closeView}"></div>
      <div id="root" ?close="${this.closeView}">
        <div id="header">
          <h4>Summary - ${this.users.length} Total</h4>

          <div id="status-selector">
            ${Object.keys(this.statusCodes).map((code) => {
              const count = this.statusCodes[code].nsf;
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
        </div>

        <div id="status-card-container">
          <div id="status-card" class="card" ?loading="${this.openingView}">
            <h4 id="status-count">
              ${total} Total ~ ${regular} Regular + ${nsf} Nsf
            </h4>
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

          <div class="padding"></div>
        </div>

        <button id="close" solid @click="${this.close()}">X</button>
        <button id="view-stats" solid @click="${() => (this.showStats = true)}">
          View Statistics
        </button>

        ${this.showStats
          ? html`
              <div
                id="stats"
                @click="${this.hideStats}"
                ?hide="${this.fadeOutStats}"
              >
                <div class="card">
                  ${STATUS_CATEGORY.map((name, index) => {
                    return html`<p>
                      ${name}: <span>${this.statsCount[index]}</span>
                    </p>`;
                  })}
                </div>
              </div>
            `
          : ''}
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
        button {
          font-weight: 500;
        }

        .scrim {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0000004a;
          animation: fade-in 0.5s;
          z-index: 19;
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

        #close,
        #view-stats {
          --should-fade: 0;
          --offset-y: 150%;
          animation: slide-in 0.5s backwards;
        }

        #root {
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
          background-color: var(--bg-primary);
        }

        #header {
          padding: 0 1.8rem;
          position: absolute;
          z-index: 50;
        }

        #header h4 {
          margin-top: 1.8rem;
          margin-bottom: 1.2rem;
          line-height: 2rem;
          color: var(--color-text-primary);
        }

        #header #status-selector {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -10px;
        }

        #status-selector > button {
          font-size: 0.8rem;
          border-radius: 35px;
          padding: 5px 10px;
          line-height: 0.8rem;
          margin-bottom: 10px;
          margin-left: 10px;
        }

        #status-card-container {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 0 1.8rem;
          --offset-y: 0px;
        }

        #status-card-container::-webkit-scrollbar {
          display: none;
        }

        #status-card-container .padding {
          content: '';
          height: var(--offset-y);
          display: block;
        }

        #status-card {
          margin-top: 1rem;
          border-radius: 15px;
          transition: height 0.5s, transform 0.5s;
          transform: translateY(var(--offset-y));
          justify-content: start;
          margin-bottom: 70px;
        }

        #status-card[loading] {
          transition: none;
        }

        #status-card #status-count {
          margin: 0px;
          text-align: center;
          padding: 10px;
          background: var(--color-primary);
          border-radius: 15px 15px 0 0;
          color: white;
          font-weight: 600;
        }

        #status-card #user-list {
          height: 0;
        }

        #user-list .user {
          padding: 0.65rem 15px;
        }

        .user p {
          margin: 0;
        }

        .user .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .user .fullname[regular] {
          color: var(--color-primary);
        }

        .user .remarks {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--color-text-secondary);
        }

        .user .remarks span {
          color: var(--color-input-error);
          font-weight: 500;
          text-transform: capitalize;
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

        #stats {
          animation: fade-in 0.5s;
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          z-index: 51;
        }

        #stats[hide] {
          animation: fade-out 0.3s;
        }

        #stats .card {
          width: 100%;
          padding: 10px 30px;
          border-radius: 5px;
        }

        #stats p {
          font-weight: bold;
          margin: 10px 0 10px 0;
          color: var(--color-text-primary);
        }

        #stats p span {
          color: var(--color-primary);
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
