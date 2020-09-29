import { LitElement, html, customElement, css, property } from 'lit-element';
import { ApplicationStore } from '../../../data/store';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { onPressed } from '../../utils';
import User from '../../../model/user';
import '../../base/welcome_text';
import './user_dep_item';
import './user_dep_list';
import './user_list';
import '../../base/toggle_am';
import '../../dialogs/edit_status';

@customElement('user-view')
export default class UserView extends LitElement {
  private user = ApplicationStore.getAuth().action.payload as User;

  @property({ type: Boolean }) showSummary = false;
  @property({ type: Boolean }) isMorning = true;

  viewSummary() {
    return onPressed(() => {
      this.showSummary = true;
    });
  }

  closeSummary() {
    this.showSummary = false;
  }

  toggleAm() {
    this.isMorning = !this.isMorning;
  }

  render() {
    return html`<div id="root">
      <user-dep-list
        .user="${this.user}"
        .isMorning="${this.isMorning}"
      ></user-dep-list>

      <button id="view-summary" solid @click="${this.viewSummary()}">
        View Summary
      </button>

      <toggle-am @toggle-am="${this.toggleAm}"></toggle-am>
    </div>`;
  }

  static get styles() {
    return [
      globalStyles,
      buttonStyles,
      cardStyles,
      css`
        #root {
          height: 100%;
          width: 100%;
          position: relative;
        }

        #view-summary {
          width: 50%;
          position: absolute;
          bottom: 10px;
          left: 15%;
          font-size: 1.1rem;
          padding: 15px 0px;
          border-radius: 50px;
          font-weight: 500;
        }

        toggle-am {
          position: fixed;
          z-index: 98;
          right: 10px;
          bottom: 10px;
        }
      `
    ];
  }
}
