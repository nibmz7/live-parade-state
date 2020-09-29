import { css, customElement, html, LitElement, property } from 'lit-element';
import Branch from '../../../model/branch';
import Department from '../../../model/department';
import Status from '../../../model/status';
import User from '../../../model/user';
import { ListState } from '../../base/base_user_list';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';

@customElement('user-dep-item')
export default class UserDepItem extends LitElement {
  @property({ type: Array }) users: Array<User> = [];
  @property({ type: Object }) branch!: Branch;
  @property({ type: Object }) department!: Department;
  @property({ type: Object }) listState: ListState = { items: {}, length: 0 };
  @property({ type: Object }) selectedUser?: User;
  @property({ type: Boolean }) isMorning = true;

  onUserSelected(e: CustomEvent) {
    const user = e.detail.user as User;
    console.log(user);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      'toggle-am',
      () => {
        console.log('toggling');
      },
      { capture: true }
    );
  }

  render() {
    let regular = 0;
    let nsf = 0;
    this.users.map((user) => {
      let status: Status;
      if (this.isMorning) status = user.morning!;
      else status = user.afternoon!;
      if (Status.isPresent(status.code)) {
        user.regular ? regular++ : nsf++;
      }
    });
    return html`<div id="root">
      <div class="header">
        <h3>${this.department.name}</h3>
      </div>

      <div class="card">
        <h4 class="summary" ?empty="${this.listState.length === 0}">
          ${regular + nsf} Total ~ ${regular} Regular + ${nsf} Nsf
        </h4>

        <user-list
          .listItemHeight="${4.6}"
          .users="${this.users}"
          .listState="${this.listState}"
          @user-selected="${this.onUserSelected}"
        ></user-list>
      </div>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          width: 100%;
          margin: inherit;
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
        }

        .summary {
          margin: 0;
          padding: 10px;
          text-align: center;
          font-weight: 400;
          background: #33475a;
          font-size: 0.9rem;
          color: white;
          border-radius: 15px 15px 0 0;
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
