import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Unsubscribe } from 'redux';
import {
  ACTION_TYPE,
  ACTION_TYPE_TEXT,
  REQUEST_TYPES
} from '../../data/data_manager';
import { UserStoreState } from '../../data/states/user_state';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import Department from '../../model/department';
import User from '../../model/user';
import { globalStyles } from '../global_styles';
import { onPressed } from '../utils';

export interface ItemState {
  index: number;
  type: ACTION_TYPE;
}

export interface ListState {
  items: {
    [userid: string]: ItemState;
  };
  length: number;
}

export default abstract class BaseUserList extends LitElement {
  private usersUnsubscribe?: Unsubscribe;

  @query('#user-list') _userList;

  @property({ type: Number }) listItemHeight = 0;
  @property({ type: Array }) users: Array<User> = [];
  @property({ type: Object }) department!: Department;
  @property({ type: Object }) listState: ListState = { items: {}, length: 0 };

  private init = () => {
    const departmentid = this.department.id;
    const items = ApplicationStore.getUsers().items;
    if (!(departmentid in items)) return;
    const userArray = items[departmentid].slice();
    this.users = userArray;
    this.updateListState(userArray);
    this.onListChanged(userArray);
  };

  private onListChanged = (users: Array<User>) => {
    const event = new CustomEvent('list-changed', {
      detail: { users }
    });
    this.dispatchEvent(event);
  };

  private updateListState = (users: Array<User>) => {
    const items = {};
    const length = users.length;
    users.map((item, index) => {
      const type = ACTION_TYPE.INITIALIZED;
      items[item.uid] = { index, type };
    });
    this.listState = {
      items,
      length
    };
  };

  private usersListener = async (state: UserStoreState) => {
    const type = state.action.type;
    if (REQUEST_TYPES.includes(type)) return;

    const departmentid = this.department.id;
    if (!(departmentid in state.items)) return;

    if (type === ACTION_TYPE.INITIALIZED) {
      this.init();
      return;
    }

    const user = state.action.payload as User;
    if (user.departmentid !== departmentid) return;

    const userArray = state.items[this.department.id].slice();
    this.users = userArray;
    let deletedUserState: ItemState;

    if (type === ACTION_TYPE.REMOVED) {
      deletedUserState = this.listState.items[user.uid];
    }

    if (type === ACTION_TYPE.MODIFIED) {
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    }

    this.updateListState(userArray);

    if (type === ACTION_TYPE.REMOVED) {
      userArray.splice(deletedUserState!.index, 0, user);
      this.listState.items[user.uid] = deletedUserState!;
    }
    this.listState.items[user.uid].type = type;

    this.onListChanged(state.items[this.department.id].slice());
  };

  connectedCallback() {
    super.connectedCallback();
    this.init();
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      this.usersListener
    );
  }

  disconnectedCallback() {
    this.usersUnsubscribe?.();
    super.disconnectedCallback();
  }

  firstUpdated() {
    (this._userList as HTMLElement).onanimationend = (e: Event) => {
      const targetElement = e.composedPath()[0] as HTMLElement;
      if (!targetElement.hasAttribute('removed')) return;
      this.onUserRemoved(targetElement.id);
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

  onUserRemoved(uid: string) {
    const userArray = this.users.filter((user) => user.uid != uid);
    this.updateListState(userArray);
    this.users = userArray;
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
