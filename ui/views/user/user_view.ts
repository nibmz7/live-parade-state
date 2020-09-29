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
    return onPressed(() => {
      this.isMorning = !this.isMorning;
    });
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

      <div class="time-selector">
        <button
          ?solid="${this.isMorning}"
          ?outline="${!this.isMorning}"
          @click="${this.toggleAm()}"
        >
          AM
        </button>
        <button
          ?solid="${!this.isMorning}"
          ?outline="${this.isMorning}"
          @click="${this.toggleAm()}"
        >
          PM
        </button>
      </div>
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

        .time-selector {
          display: flex;
          position: fixed;
          z-index: 98;
          right: 10px;
          bottom: 10px;
        }

        .time-selector > button {
          box-sizing: border-box;
          height: 2.5rem;
          font-weight: 600;
          padding: 8px;
          transition: none;
          border: 2px solid var(--color-primary);
        }

        .time-selector > button,
        .time-selector > button:hover,
        .time-selector > button:focus,
        .time-selector > button:active {
          box-shadow: 0 4px 6px -1px rgba(var(--color-primary-rgb), 0.2),
            0 2px 4px -1px rgba(var(--color-primary-rgb), 0.12);
        }

        .time-selector > button:first-child {
          border-radius: 35px 0 0 35px;
        }

        .time-selector > button:last-child {
          border-radius: 0 35px 35px 0;
        }
      `
    ];
  }
}
