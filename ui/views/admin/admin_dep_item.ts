import { css, customElement, html, LitElement, property } from 'lit-element';
import Department from '../../../model/department';
import User from '../../../model/user';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  slideAnimation
} from '../../global_styles';
import { onPressed } from '../../utils';

@customElement('admin-dep-item')
export default class AdminDepItem extends LitElement {
  @property({ type: Object }) department!: Department;
  @property({ type: Object }) selectedUser?: User;
  @property({ type: Boolean }) showEditDepartment: Boolean = false;
  @property({ type: Boolean }) showEditUser = false;
  @property({ type: Boolean }) isEmpty = true;
  @property({ type: Number }) index = 0;

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

  onListChanged(e: CustomEvent) {
    const users = e.detail.users as Array<User>;
    this.isEmpty = users.length === 0;
  }

  render() {
    return html`<div id="root" style="--anim-delay:${this.index / 10 + 0.2}s;">
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
          ?empty="${this.isEmpty}"
        >
          Add user
        </button>

        <admin-user-list
          .department="${this.department}"
          @user-selected="${this.onEditUser}"
          @list-changed="${this.onListChanged}"
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
      slideAnimation,
      buttonStyles,
      cardStyles,
      css`
        #root {
          --offset-y: 10px;
          --should-fade: 1;
          width: 100%;
          margin: inherit;
          animation: slide-in 0.5s backwards;
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
      `
    ];
  }
}
