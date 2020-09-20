import { LitElement, html, customElement, css } from 'lit-element';
import Department from '../../model/department';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  inputStyles
} from '../global_styles';
import { InputState, INPUT_VALIDITY, textInput } from '../input';

@customElement('edit-department')
export default class EditDepartment extends LitElement {
  private department?: Department;
  private editing = false;
  private nameState: InputState = {
    value: '',
    validity: INPUT_VALIDITY.PENDING
  };

  static get properties() {
    return {
      department: { type: Object },
      editing: { type: Boolean, reflect: true }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.department);
  }

  close() {
    this.dispatchEvent(new Event('close'));
  }

  render() {
    return html`<div id="root" class="container">
      <div class="container">
        <div class="header">
          <h3 id="header">Department</h3>
          ${this.editing
            ? html`<wc-button plain id="delete">delete</wc-button>`
            : ''}
        </div>
        ${textInput(this.nameState, (state) => (this.nameState = state), {
          placeholder: 'E.g Log Branch',
          label: 'Department name'
        })}
        <wc-button id="confirm" @click="${this.close}">Confirm</wc-button>
      </div>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      inputStyles,
      css`
        #root {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background: #ff00003d;
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        input {
          font-size: 1.2rem;
          padding: 10px;
          margin-bottom: 20px;
          text-transform: capitalize;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        #confirm {
          --button-padding: 10px;
        }
      `
    ];
  }
}
