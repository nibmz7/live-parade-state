import { css, customElement } from 'lit-element';
import { html } from 'lit-html';
import Status, { STATUSES } from '../../../model/status';
import User from '../../../model/user';
import BaseUserList from '../../base/base_user_list';

@customElement('user-list')
export default class UserList extends BaseUserList {
  listItemHeight = 4.6;

  statusTemplate(status: Status, prefix: string) {
    const statusText = STATUSES[status.code].name;
    const hasRemarks = status.remarks.trim().length > 0;
    const hasExpired = status.expired;
    return html`<p class="status">
      ${prefix}: ${statusText} ${hasRemarks ? html`(${status.remarks})` : ''}
      ${hasExpired ? html`<span>-- Expired</span>` : ''}
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
        .user {
          height: 4.6rem;
        }
        .user[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .user[regular] .fullname {
          color: var(--color-primary);
        }

        p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fullname {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
          margin-bottom: 0.2rem;
          color: var(--color-text-primary);
        }

        .status {
          color: #878787;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1rem;
          color: var(--color-text-secondary);
        }

        .status > span {
          color: var(--color-input-error);
          font-weight: 500;
          text-transform: capitalize;
        }
      `
    ];
  }
}
