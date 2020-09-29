import { LitElement, html, customElement, css, property } from 'lit-element';
import { ApplicationStore } from '../../../data/store';
import { buttonStyles, cardStyles, globalStyles } from '../../global_styles';
import { onPressed } from '../../utils';
import '../../base/welcome_text';
import './user_dep_item';
import './user_dep_list';
import './user_list';
import User from '../../../model/user';

@customElement('user-view')
export default class UserView extends LitElement {
  private user = ApplicationStore.getAuth().action.payload as User;

  @property({ type: Boolean }) showSummary = false;

  viewSummary() {
    return onPressed(() => {
      this.showSummary = true;
    });
  }

  closeSummary() {
    this.showSummary = false;
  }

  render() {
    return html`<div id="root">
      <user-dep-list .user="${this.user}"></user-dep-list>

      <button id="view-summary" solid @click="${this.viewSummary()}">
        View Summary
      </button>
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
          left: 25%;
          right: 25%;
          font-size: 1.1rem;
          padding: 15px 0px;
          border-radius: 50px;
          font-weight: 500;
        }
      `
    ];
  }
}
