import { LitElement, html, customElement, css } from 'lit-element';
import Department from '../../model/department';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  inputStyles
} from '../global_styles';
import { InputState, INPUT_VALIDITY, textInput } from '../input';
import './custom_dialog';
import { DIALOG_STATE } from './custom_dialog';

@customElement('edit-department')
export default class EditDepartment extends LitElement {
  private department?: Department;
  private editing = false;
  private nameState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };
  private dialogState = DIALOG_STATE.OPENING;

  static get properties() {
    return {
      department: { type: Object },
      editing: { type: Boolean, reflect: true },
      dialogState: { type: Number }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.department);
  }

  close() {
    this.dialogState = DIALOG_STATE.CLOSING;
  }

  render() {
    return html`<custom-dialog .state="${this.dialogState}">
      <div id="root">
        <div class="header">
          <h3 id="header">Department</h3>
          ${this.editing ? html`<button plain id="delete">delete</button>` : ''}
        </div>
        ${textInput(this.nameState, (state) => (this.nameState = state), {
          placeholder: 'e.g Log Branch',
          label: 'Department name'
        })}
        <button id="confirm" @click="${this.close}" solid>Confirm</button>
      </div>
    </custom-dialog>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      inputStyles,
      css`
        #root {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        input {
          font-size: 1.2rem;
          padding: 10px;
          margin-bottom: 20px;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        #delete {
          font-size: 1.3rem;
        }

        #confirm {
          font-size: 1.3rem;
          font-weight: 500;
        }
      `
    ];
  }
}
