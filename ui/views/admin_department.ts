import { LitElement, html, customElement, css, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import Department from '../../model/department';
import User from '../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';
import { ACTION_TYPE } from '../../data/data_manager';
import '../dialogs/edit_department';
import '../base/welcome_text';
import '../dialogs/edit_user';
import { onPressed } from '../utils';
import Branch from '../../model/branch';

export interface ListState {
  items: {
    [userid: string]: {
      index: number;
      type: ACTION_TYPE;
    };
  };
  length: number;
}

@customElement('admin-department')
export default class AdminDepartment extends LitElement {
  @property({ type: Object }) branch!: Branch;
  @property({ type: Object }) department!: Department;
  @property({ type: Array }) users: Array<User> = [];
  @property({ type: Object }) listState: ListState = { items: {}, length: 0 };
  @property({ type: Boolean }) showEditDepartment: Boolean = false;
  @property({ type: Object }) selectedUser?: User;
  @property({ type: Boolean }) showEditUser = false;

  onEditDepartment() {
    return onPressed(() => {
      this.showEditDepartment = true;
    });
  }

  onEditUser(user?: User) {
    return onPressed(() => {
      this.selectedUser = user;
      this.showEditUser = true;
    });
  }

  closeEditDepartment(e: Event) {
    e.stopPropagation();
    this.showEditDepartment = false;
  }

  closeEditUser(e: Event) {
    e.stopPropagation();
    this.showEditUser = false;
    this.selectedUser = undefined;
  }

  render() {
    const itemHeight = 3.5;
    const length = this.listState.length;
    const height = length * itemHeight;

    const userTemplate = (user: User) => {
      const itemState = this.listState.items[user.uid];
      return html`
        <div
          style="--offset-y:${itemState.index * itemHeight}rem;"
          tabindex="0"
          class="item selectable"
          ?regular="${user.regular}"
          ?added="${itemState.type === ACTION_TYPE.ADDED}"
          ?modified="${itemState.type === ACTION_TYPE.MODIFIED}"
          ?removed="${itemState.type === ACTION_TYPE.REMOVED}"
          ?last="${itemState.index === length - 1}"
          @click="${this.onEditUser(user)}"
        >
          <p id="primary-text">${user.fullname}</p>
          <p id="secondary-text">${user.email}</p>
        </div>
      `;
    };

    return html`<div id="root">
      <div class="header">
        <h3>${this.department.name}</h3>
        <button id="edit" plain @click="${this.onEditDepartment()}">
          edit
        </button>
      </div>

      <div class="card">
        <button
          id="add"
          plain
          @click="${this.onEditUser()}"
          ?empty="${length === 0}"
        >
          Add user
        </button>

        <div id="user-list" style="height:${height}rem;">
          ${repeat(this.users, (user) => user.uid, userTemplate)}
        </div>
      </div>

      ${this.showEditDepartment
        ? html`<edit-department
            editing
            .department=${this.department}
            @close="${this.closeEditDepartment}"
          ></edit-department>`
        : ''}
      ${this.showEditUser
        ? html`
            <edit-user
              .branch=${this.branch}
              .department=${this.department}
              .user=${this.selectedUser}
              ?editing=${this.selectedUser}
              @close="${this.closeEditUser}"
            ></edit-user>
          `
        : ''}
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

        .header #edit {
          font-size: 1.3rem;
        }

        .card {
          border-radius: 15px;
        }

        #add {
          font-size: 1.3rem;
          border-bottom: 2px dashed var(--color-primary);
          border-radius: 15px 15px 0 0;
        }

        #add[empty] {
          border-bottom: none;
          border-radius: 15px;
        }

        #user-list {
          position: relative;
          transition: height 0.3s;
        }

        .item {
          width: 100%;
          position: absolute;
          box-sizing: border-box;
          height: 3.5rem;
          padding: 0.65rem 15px;
          opacity: 1;
          transform: translateY(var(--offset-y));
          transition: all 0.3s;
          cursor: pointer;
        }

        .item p {
          margin: 0;
        }

        .item #primary-text {
          text-transform: capitalize;
          color: #323232;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.2rem;
        }

        .item[regular] #primary-text {
          color: var(--color-primary);
        }

        .item #secondary-text {
          color: #878787;
          font-size: 0.8rem;
          line-height: 1rem;
          font-weight: 400;
        }

        .item[added] {
          animation: item-appear-in 0.3s;
        }

        .item[modified] {
          animation: flash 1s 2;
        }

        .item[removed] {
          padding: 0rem 15px;
          opacity: 0;
        }

        .item[last] {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .item:focus,
        .item:active {
          background-color: rgba(0, 0, 0, 0.1);
        }

        @media (hover: hover) {
          .item:hover {
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
