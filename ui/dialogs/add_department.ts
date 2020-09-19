import { LitElement, html, customElement, css } from 'lit-element';
import { buttonStyles, cardStyles, globalStyles } from '../global_styles';

@customElement('add-department')
export default class AddDepartment extends LitElement {
  static get properties() {
    return {};
  }

  render() {
    return html`<div id="root">hello</div>`;
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
