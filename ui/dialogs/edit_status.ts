import { LitElement, html, customElement, css, property } from 'lit-element';
import { buttonStyles, globalStyles } from '../global_styles';
import '../base/custom_dialog';
import { DIALOG_STATE } from '../base/custom_dialog';
import User from '../../model/user';
import Status, { STATUSES } from '../../model/status';
import { onPressed } from '../utils';
import { ACTION_ROOT, ApplicationStore } from '../../data/store';
import ACTION_USER from '../../data/actions/user_action';
import { Unsubscribe } from 'redux';
import { ACTION_TYPE } from '../../data/data_manager';
import { UserStoreState } from '../../data/states/user_state';

const getTimestamp = (date: Date) => {
  let dateString = date.toString();
  const index = dateString.indexOf(' (');
  if (index !== -1) {
    dateString = dateString.substr(0, index);
  }
  return dateString;
};

@customElement('edit-status')
export default class EditStatus extends LitElement {
  private usersUnsubscribe?: Unsubscribe;
  private authUser = ApplicationStore.auth.action.payload as User;

  @property({ type: String }) uid!: string;
  @property({ type: String }) updatedByName = '';
  @property({ type: Object }) selectedUser!: User;
  @property({ type: Object }) statusToEdit!: Status;
  @property({ type: Boolean }) isMorning = true;
  @property({ type: Boolean }) isProcessing = false;
  @property({ type: Number }) dialogState = DIALOG_STATE.OPENING;

  onInputFocus() {
    this.dialogState = DIALOG_STATE.INPUT_FOCUSED;
  }

  onInputBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    const remarks = input.value.trim();
    this.statusToEdit = { ...this.statusToEdit, remarks };
  }

  resetStatus() {
    const userStatus = this.isMorning
      ? this.selectedUser.morning!
      : this.selectedUser.afternoon!;
    this.statusToEdit = new Status(userStatus);
    this.updatedByName =
      ApplicationStore.users.usersById[userStatus.updatedby]?.fullname ||
      'Admin';
  }

  private usersListener = async (state: UserStoreState) => {
    const type = state.action.type;
    if (type !== ACTION_TYPE.MODIFIED) return;
    const user = state.action.payload as User;
    if (user.uid !== this.uid) return;
    this.selectedUser = user;
    this.resetStatus();
    this.isProcessing = false;
  };

  toggleAm() {
    this.isMorning = !this.isMorning;
    this.resetStatus();
  }

  statusChanged(code: number) {
    return onPressed(() => {
      this.statusToEdit = { ...this.statusToEdit, code, remarks: '' };
    });
  }

  requestUpdateStatus(submitAll: boolean) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    const updatedby = this.authUser.uid;
    const status = new Status({
      ...this.statusToEdit,
      updatedby,
      date: new Date(),
      expired: false
    });
    const user = new User({
      ...this.selectedUser,
      morning: submitAll ? status : this.isMorning ? status : undefined,
      afternoon: submitAll ? status : !this.isMorning ? status : undefined
    });
    const action = ACTION_USER.requestModify(user);
    ApplicationStore.dispatch(action);
  }

  submitOnly() {
    return onPressed(() => {
      this.requestUpdateStatus(false);
    });
  }

  submitBoth() {
    return onPressed(() => {
      this.requestUpdateStatus(true);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.selectedUser = ApplicationStore.users.usersById[this.uid];
    this.resetStatus();
    this.usersUnsubscribe = ApplicationStore.listen(
      ACTION_ROOT.USERS,
      this.usersListener
    );
  }

  disconnectedCallback() {
    this.usersUnsubscribe?.();
    super.disconnectedCallback();
  }

  render() {
    return html`<custom-dialog
      .state="${this.dialogState}"
      @reset="${() => (this.dialogState = DIALOG_STATE.OPENED)}"
    >
      <div id="root" tabindex="0" class="selectable">
        <div class="expired" ?show="${this.statusToEdit.expired}">
          [Expired] - Please verify again
        </div>
        <div class="header">
          <h4 class="name">${this.selectedUser.fullname}</h4>
          <toggle-am
            @toggle-am="${this.toggleAm}"
            .isMorning="${this.isMorning}"
          ></toggle-am>
        </div>

        <div class="status-chooser">
          ${STATUSES.map((statusType, index) => {
            return html`<button
              outline
              static
              ?selected="${this.statusToEdit.code === index}"
              @click="${this.statusChanged(index)}"
            >
              ${statusType.name}
            </button>`;
          })}
        </div>

        <div class="remarks">
          <label>Remarks</label>
          <input
            maxlength="30"
            type="text"
            placeholder="EVENT, WORK, POOPING etc."
            @focus="${this.onInputFocus}"
            @blur="${this.onInputBlur}"
            value="${this.statusToEdit.remarks}"
          />
        </div>

        <div class="verify-buttons">
          <button class="all" solid @click="${this.submitBoth()}">
            BOTH AM & PM
          </button>
          <button class="specific" solid @click="${this.submitOnly()}">
            ${this.isMorning ? 'AM' : 'PM'} ONLY
          </button>
          <div class="processing" ?show="${this.isProcessing}">
            Processing...
          </div>
        </div>

        <div class="updated-by">
          Last verified by <span>${this.updatedByName}</span> on
          ${getTimestamp(this.statusToEdit.date)}
        </div>
      </div>
    </custom-dialog>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      css`
        custom-dialog {
          --offset-reduce: 100px;
        }

        toggle-am {
          --padding-button: 5px;
        }

        #root {
          position: relative;
        }

        .expired {
          text-align: center;
          font-weight: 900;
          color: var(--color-primary);
          max-height: 0px;
          opacity: 0;
          transition: 0.5s all;
        }
        .expired[show] {
          max-height: 100px;
          opacity: 1;
        }

        .header {
          display: flex;
          align-items: center;
        }
        .header > .name {
          flex-grow: 1;
          color: var(--color-text-primary);
        }

        .status-chooser {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
        .status-chooser > button {
          margin-right: 10px;
          margin-bottom: 10px;
          font-size: 0.9rem;
          padding: 7px;
          border-radius: 5px;
        }

        .remarks {
          margin-bottom: 25px;
        }
        .remarks > label {
          display: block;
          margin: 5px 0;
          color: var(--color-text-primary);
        }

        .remarks > input {
          padding: 5px;
          border: 1px solid grey;
          transition: all 0.3s 0.3s;
          outline: none;
          font: inherit;
          text-transform: uppercase;
          color: var(--color-text-light);
          background-color: var(--bg-primary-light);
          transition: background-color 0.3s;
        }

        .remarks > input::placeholder {
          color: var(--color-input-hint);
        }

        .remarks > input:focus {
          outline: none;
          border: 1px solid #ff3838;
        }

        #comment {
          margin-top: 10px;
          font-size: 0.6rem;
          white-space: pre-line;
          text-align: center;
        }

        .verify-buttons {
          display: flex;
          position: relative;
        }

        .verify-buttons > button {
          padding: 15px;
        }

        .verify-buttons > .all {
          flex-grow: 1;
          margin-right: 10px;
        }

        .verify-buttons > .processing {
          position: absolute;
          top: -5px;
          bottom: -5px;
          right: -5px;
          left: -5px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-primary);
          color: white;
          border-radius: 5px;
          pointer-events: none;
          box-shadow: 0 2px 4px -1px rgba(var(--color-shadow-primary-rgb), 0.5);
          transform: scale(0);
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }

        .verify-buttons > .processing[show] {
          pointer-events: inherit;
          opacity: 1;
          transform: scale(1);
        }

        .updated-by {
          font-size: 0.6rem;
          white-space: pre-line;
          text-align: center;
          color: var(--color-text-dark);
        }

        .updated-by > span {
          font-weight: 600;
        }
      `
    ];
  }
}
