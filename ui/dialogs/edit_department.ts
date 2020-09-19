import { LitElement, html, customElement, css } from 'lit-element';
import Department from '../../model/department';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';

@customElement('edit-department')
export default class EditDepartment extends LitElement {
  private department?: Department;

  static get properties() {
    return { department: { type: Object} };
  }

  connectedCallback() {
      super.connectedCallback();
      console.log(this.department);
  }

  close() {
    this.dispatchEvent(new Event('close'));
  }

  render() {
    return html`<div id="root">
      <button @click="${this.close}">Close</button>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background: #ff00003d;
        }
      `
    ];
  }
}
