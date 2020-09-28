import { LitElement, html, customElement, css } from 'lit-element';
import { buttonStyles, globalStyles } from '../global_styles';
import '../base/custom_dialog';
import { ApplicationStore } from '../../data/store';
import ACTION_AUTH from '../../data/actions/auth_action';

@customElement('sign-out')
export default class EditDepartment extends LitElement {
  private signOut() {
    this.dispatchEvent(
      new Event('signed-out', { bubbles: true, composed: true })
    );
    const action = ACTION_AUTH.requestSignOut();
    ApplicationStore.dispatch(action);
  }

  render() {
    return html`<custom-dialog>
      <div id="root">
        <h4>Are you sure you want sign out?</h4>
        <button solid @click="${this.signOut}">Yes. I'm positive.</button>
      </div>
    </custom-dialog>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      css`
        #root {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        h4 {
          width: 100%;
          color: #313131;
          margin-top: 15px;
        }
      `
    ];
  }
}
