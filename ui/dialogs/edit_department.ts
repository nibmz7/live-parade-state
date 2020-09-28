import { LitElement, html, customElement, css, property } from 'lit-element';
import ACTION_DEPARTMENT from '../../data/actions/department_action';
import { ApplicationStore } from '../../data/store';
import Department from '../../model/department';
import {
  buttonStyles,
  cardStyles,
  globalStyles,
  inputStyles
} from '../global_styles';
import { InputStateDefault, INPUT_VALIDITY, textInput } from '../base/input';
import '../base/custom_dialog';
import { DIALOG_STATE } from '../base/custom_dialog';

@customElement('edit-department')
export default class EditDepartment extends LitElement {
  @property({ type: Object }) department?: Department;
  @property({ type: Object }) nameState = InputStateDefault();
  @property({ type: Number }) dialogState = DIALOG_STATE.OPENING;
  @property({ type: Boolean }) editing = false;

  connectedCallback() {
    super.connectedCallback();
    if (this.department) this.nameState.value = this.department.name;
  }

  submit() {
    if (this.nameState.value.length === 0) {
      this.nameState = {
        ...this.nameState,
        validity: INPUT_VALIDITY.INVALID
      };
      return;
    }
    if (this.editing) {
      let action = ACTION_DEPARTMENT.requestModify({
        ...this.department!,
        name: this.nameState.value
      });
      ApplicationStore.dispatch(action);
    } else {
      let action = ACTION_DEPARTMENT.requestAdd(this.nameState.value);
      ApplicationStore.dispatch(action);
    }
    this.dialogState = DIALOG_STATE.CLOSING;
  }

  delete() {
    let action = ACTION_DEPARTMENT.requestRemove(this.department!);
    ApplicationStore.dispatch(action);
    this.dialogState = DIALOG_STATE.CLOSING;
  }

  render() {
    return html`<custom-dialog .state="${this.dialogState}">
      <div id="root" tabindex="0" class="selectable">
        <div class="header">
          <h3>Department</h3>

          ${this.editing
            ? html`<button
                plain
                id="delete"
                @click="${this.delete}"
                aria-label="Delete department"
              >
                delete
              </button>`
            : ''}
        </div>

        ${textInput(this.nameState, (state) => (this.nameState = state), {
          placeholder: 'e.g. Log Branch',
          label: 'Department name'
        })}

        <button
          solid
          id="confirm"
          @click="${this.submit}"
          aria-label="Add/Edit department"
          @keydown="${(e: Event) => {
            let key = (e as KeyboardEvent).key;
            if (key === 'Tab') {
              this.shadowRoot?.getElementById('root')?.focus();
            }
          }}"
        >
          Confirm
        </button>
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
