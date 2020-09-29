import {
  LitElement,
  html,
  css,
  property,
  query,
  TemplateResult
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import '../dialogs/edit_department';
import '../dialogs/edit_user';
import '../base/welcome_text';
import { ACTION_TYPE, ACTION_TYPE_TEXT } from '../../data/data_manager';
import User from '../../model/user';
import { onPressed } from '../utils';
import { globalStyles } from '../global_styles';

export interface ListState {
  items: {
    [userid: string]: {
      index: number;
      type: ACTION_TYPE;
    };
  };
  length: number;
}

export default abstract class UserList extends LitElement {
  @query('#user-list') _userList;

  @property({ type: Number }) listItemHeight = 0;
  @property({ type: Array }) users: Array<User> = [];
  @property({ type: Object }) listState: ListState = { items: {}, length: 0 };

  firstUpdated() {
    (this._userList as HTMLElement).onanimationend = (e: Event) => {
      const targetElement = e.composedPath()[0] as HTMLElement;
      if (!targetElement.hasAttribute('removed')) return;
      const event = new CustomEvent('user-removed', {
        detail: {
          userid: targetElement.id
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    };
  }

  onUserSelected(user: User) {
    return onPressed(() => {
      const event = new CustomEvent('user-selected', {
        detail: { user },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
  }

  abstract userItemTemplate(user: User): TemplateResult;

  render() {
    const length = this.listState.length;
    const height = length * this.listItemHeight;

    const userTemplate = (user: User) => {
      const itemState = this.listState.items[user.uid];
      return html`
        <div
          id="${user.uid}"
          style="--offset-y:${itemState.index * this.listItemHeight}rem;"
          tabindex="0"
          class="user selectable"
          state="${ACTION_TYPE_TEXT[itemState.type]}"
          ?regular="${user.regular}"
          ?last="${itemState.index === length - 1}"
          @click="${this.onUserSelected(user)}"
        >
          ${this.userItemTemplate(user)}
        </div>
      `;
    };

    return html` <div id="user-list" style="height:${height}rem;">
      ${repeat(this.users, (user) => user.uid, userTemplate)}
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      css`
        #user-list {
          position: relative;
          transition: height 0.3s;
        }

        .user {
          width: 100%;
          position: absolute;
          box-sizing: border-box;
          padding: 0.65rem 15px;
          opacity: 1;
          transform: translateY(var(--offset-y));
          transition: all 0.3s;
          cursor: pointer;
        }

        .user[state='added'] {
          animation: item-appear-in 0.3s;
        }

        .user[state='modified'] {
          animation: flash 1s 2;
        }

        .user[state='removed'] {
          animation: item-appear-out 0.3s forwards;
        }

        .user:focus,
        .user:active {
          background-color: rgba(0, 0, 0, 0.1);
        }

        @media (hover: hover) {
          .user:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }

        @keyframes item-appear-in {
          from {
            opacity: 0;
            padding: 0rem 15px;
          }
          to {
            opacity: 1;
            padding: 0.65rem 15px;
          }
        }

        @keyframes item-appear-out {
          to {
            opacity: 0;
            padding: 0rem 15px;
          }
        }

        @keyframes flash {
          0% {
            background-color: white;
          }
          50% {
            background-color: rgba(255, 56, 56, 0.18);
          }
          100% {
            background-color: white;
          }
        }
      `
    ];
  }
}
