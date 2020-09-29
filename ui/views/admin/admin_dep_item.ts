import { LitElement, html, customElement, css, property } from 'lit-element';
import Branch from '../../../model/branch';
import Department from '../../../model/department';
import User from '../../../model/user';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { ACTION_TYPE } from '../../../data/data_manager';
import { onPressed } from '../../utils';
import '../../dialogs/edit_department';
import '../../dialogs/edit_user';
import '../../base/welcome_text';
import './admin_user_list';

export interface ListState {
  items: {
    [userid: string]: {
      index: number;
      type: ACTION_TYPE;
    };
  };
  length: number;
}

@customElement('admin-dep-item')
export default class AdminDepItem extends LitElement {
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

  onAddUser() {
    return onPressed(() => {
      this.selectedUser = undefined;
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

  onEditUser(e: CustomEvent) {
    this.selectedUser = e.detail.user;
    this.showEditUser = true;
  }

  render() {
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
          @click="${this.onAddUser()}"
          ?empty="${this.listState.length === 0}"
        >
          Add user
        </button>

        <admin-user-list
          .listItemHeight="${3.5}"
          .users="${this.users}"
          .listState="${this.listState}"
          @user-selected="${this.onEditUser}"
        ></admin-user-list>

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
                .editing=${!!this.selectedUser}
                @close="${this.closeEditUser}"
              ></edit-user>
            `
          : ''}
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
          margin: 0;
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
          animation: item-appear-out 0.3s forwards;
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

        @keyframes item-appear-out {
          from {
            opacity: 1;
            padding: 0.65rem 15px;
          }
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
