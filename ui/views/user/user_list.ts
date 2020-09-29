import { css, customElement } from 'lit-element';
import { html } from 'lit-html';
import Status, { STATUSES } from '../../../model/status';
import User from '../../../model/user';
import BaseUserList from '../../base/base_user_list';

@customElement('user-list')
export default class UserList extends BaseUserList {
  statusTemplate(status: Status, prefix: string) {
    const statusText = STATUSES[status.code].name;
    const hasRemarks = status.remarks.trim().length > 0;
    const hasExpired = status.expired;
    return html`<p class="status">
      ${prefix}: ${statusText} ${hasRemarks ? html`(${status.remarks})` : ''}
      ${hasExpired ? '<span>-- Expired</span>' : ''}
    </p> `;
  }

  userItemTemplate(user: User) {
    return html`
      <p class="fullname">${user.fullname}</p>
      ${this.statusTemplate(user.morning!, 'AM')}
      ${this.statusTemplate(user.afternoon!, 'PM')}
    `;
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .user[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .user[regular] .fullname {
          color: var(--color-primary);
        }

        .user p {
          margin: 0;
        }

        .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
        }

        .status {
          white-space: pre-line;
          font-size: 0.7rem;
          margin-top: 3px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .status > span {
          color: var(--color-error);
          font-weight: 500;
          text-transform: capitalize;
        }
      `
    ];
  }
}
