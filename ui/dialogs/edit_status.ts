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
  private authUser = ApplicationStore.getAuth().action.payload as User;

  @property({ type: String }) uid!: string;
  @property({ type: String }) updatedByName = '';
  @property({ type: Object }) selectedUser!: User;
  @property({ type: Object }) statusToEdit!: Status;
  @property({ type: Boolean }) isMorning = true;
  @property({ type: Boolean }) isProcessing = false;
  @property({ type: Number }) dialogState = DIALOG_STATE.OPENING;

  submit() {
    this.dialogState = DIALOG_STATE.CLOSING;
  }

  onInputFocus() {
    this.dialogState = DIALOG_STATE.STALLING;
  }

  onInputBlur(e) {
    const input = e.target as HTMLInputElement;
    const remarks = input.value;
    this.statusToEdit = { ...this.statusToEdit, remarks };
  }

  resetStatus() {
    const userStatus = this.isMorning
      ? this.selectedUser.morning!
      : this.selectedUser.afternoon!;
    this.statusToEdit = new Status(userStatus);
    this.updatedByName = ApplicationStore.getUsers().users[
      userStatus.updatedby
    ].fullname;
    this.isProcessing = false;
  }

  private usersListener = async (state: UserStoreState) => {
    const type = state.action.type;
    if (type !== ACTION_TYPE.MODIFIED) return;
    const user = state.action.payload as User;
    if (user.uid !== this.uid) return;
    this.selectedUser = user;
    this.resetStatus();
  };

  connectedCallback() {
    super.connectedCallback();
    this.selectedUser = ApplicationStore.getUsers().users[this.uid];
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

  toggleAm() {
    this.isMorning = !this.isMorning;
    this.resetStatus();
  }

  statusChanged(code: number) {
    return onPressed(() => {
      this.statusToEdit = { ...this.statusToEdit, code };
    });
  }

  submitBoth() {
    return onPressed(() => {
      if(this.isProcessing) return;
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
        afternoon: status,
        morning: status
      });
      const action = ACTION_USER.requestModify(user);
      ApplicationStore.dispatch(action);
    });
  }

  render() {
    console.log('rerender');
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
              static
              ?outline="${this.statusToEdit.code !== index}"
              ?solid="${this.statusToEdit.code === index}"
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
          <button class="specific" solid>AM ONLY</button>
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
          --offset-item-height: 190px;
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
          border: 2px solid var(--color-primary);
        }

        .remarks {
          margin-bottom: 25px;
        }
        .remarks > label {
          display: block;
          margin: 5px 0;
        }
        .remarks > input {
          padding: 5px;
          border: 1px solid grey;
          transition: all 0.3s 0.3s;
          outline: none;
          font: inherit;
          text-transform: uppercase;
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
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-primary);
          color: white;
          border-radius: 5px;
          pointer-events: none;
          opacity: 0;
          transition: 0.3s all;
        }

        .verify-buttons > .processing[show] {
          pointer-events: inherit;
          opacity: 1;
        }

        .updated-by {
          font-size: 0.6rem;
          white-space: pre-line;
          text-align: center;
        }

        .updated-by > span {
          font-weight: 600;
        }
      `
    ];
  }
}
