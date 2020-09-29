import { css, customElement, html, LitElement, property } from "lit-element";
import { ACTION_TYPE } from "../../../data/data_manager";
import Branch from "../../../model/branch";
import Department from "../../../model/department";
import User from "../../../model/user";
import { buttonStyles, cardStyles, globalStyles } from "../../global_styles";
import { onPressed } from "../../utils";

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
  @property({ type: Array }) users: Array<User> = [];
  @property({ type: Object }) branch!: Branch;
  @property({ type: Object }) department!: Department;
  @property({ type: Object }) listState: ListState = { items: {}, length: 0 };
  @property({ type: Object }) selectedUser?: User;
  @property({ type: Boolean }) showEditDepartment: Boolean = false;
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
      `
    ];
  }
}
