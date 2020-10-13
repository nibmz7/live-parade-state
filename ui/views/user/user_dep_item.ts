import { css, customElement, html, LitElement, property } from 'lit-element';
import Department from '../../../model/department';
import Status from '../../../model/status';
import User from '../../../model/user';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  slideAnimation
} from '../../global_styles';

interface PresentCount {
  regular: number;
  nsf: number;
}

@customElement('user-dep-item')
export default class UserDepItem extends LitElement {
  @property({ type: Number }) index = 0;
  @property({ type: Object }) department!: Department;
  @property({ type: Object }) selectedUser?: User;
  @property({ type: Boolean }) isMorning = true;
  @property({ type: Boolean }) isEmpty = true;
  @property({ type: Object }) presentCount: {
    am: PresentCount;
    pm: PresentCount;
  } = {
    am: { regular: 0, nsf: 0 },
    pm: { regular: 0, nsf: 0 }
  };

  onUserSelected(e: CustomEvent) {
    this.selectedUser = e.detail.user as User;
  }

  onListChanged(e: CustomEvent) {
    const users = e.detail.users as Array<User>;
    const amCount = { regular: 0, nsf: 0 };
    const pmCount = { regular: 0, nsf: 0 };
    users.map((user) => {
      if (Status.isPresent(user.morning!.code)) {
        user.regular ? amCount.regular++ : amCount.nsf++;
      }
      if (Status.isPresent(user.afternoon!.code)) {
        user.regular ? pmCount.regular++ : pmCount.nsf++;
      }
    });
    this.presentCount = { am: amCount, pm: pmCount };
    this.isEmpty = users.length === 0;
  }

  render() {
    const presentCount = this.isMorning
      ? this.presentCount.am
      : this.presentCount.pm;
    const regular = presentCount.regular;
    const nsf = presentCount.nsf;
    return html`<div id="root" style="--anim-delay:${(this.index * 2) / 10}s;">
        <div class="header">
          <h3>${this.department.name}</h3>
        </div>

        <div class="card">
          <h4 class="summary" ?empty="${this.isEmpty}">
            ${regular + nsf} Total ~ ${regular} Regular + ${nsf} Nsf
          </h4>

          <user-list
            .department="${this.department}"
            @user-selected="${this.onUserSelected}"
            @list-changed="${this.onListChanged}"
          ></user-list>
        </div>
      </div>

      ${this.selectedUser
        ? html`<edit-status
            .uid="${this.selectedUser.uid}"
            .isMorning="${this.isMorning}"
            @close="${() => (this.selectedUser = undefined)}"
          ></edit-status>`
        : ''} `;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      slideAnimation,
      css`
        #root {
          width: 100%;
          margin: inherit;
          --offset-y: 100px;
          --should-fade: 1;
          animation: slide-in 0.5s both;
          animation-delay: var(--anim-delay);
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
        }

        .header h3 {
          color: #828282;
          text-transform: capitalize;
          font-weight: 500;
          margin: 0;
          color: var(--color-text-primary);
        }

        .summary {
          margin: 0;
          padding: 10px;
          text-align: center;
          font-weight: 400;
          background: #33475a;
          font-size: 0.9rem;
          border-radius: 15px 15px 0 0;
          color: var(--color-text-primary);
        }

        .summary[empty] {
          border-radius: 15px;
        }

        .card {
          border-radius: 15px;
        }
      `
    ];
  }
}
