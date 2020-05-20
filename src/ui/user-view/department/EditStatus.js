import Dialogue from '../../base/Dialogue.js';
import STATUS from '../../../model/Status.js';
import { timeSelector } from '../../GlobalStyles.js';
import { html } from '../../base/BaseElement.js';

const HINT = 'Event, work, pooping etc.';
const template = html`
  <style>
    .container {
        position: relative;
    }
    #status-chooser {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    #status-chooser > wc-button {
        margin-right: 10px;
        margin-bottom: 10px;
        --button-font-size: 0.9rem;
        --button-padding: 7px;
        --button-radius: 5px;
    }
    .remarks {
        margin-bottom: 25px;
    }
    .remarks > p {
        margin: 5px 0;
    }
    input {
        padding: 5px;
        border: 1px solid grey;
        transition: all .3s .3s;
        outline:none;
        font: inherit;
        text-transform: uppercase;
    }
    input:focus {
        outline: none;
        border: 1px solid #FF3838;
    }
    .header {
        display: flex;
        align-items: center;
    }

    .header > h4 {
        flex-grow: 1;
    }

    #comment {
        margin-top: 10px;
        font-size: 0.6rem;
        white-space: pre-line;
        text-align: center;
    }

    .expired {
        text-align: center;
        font-weight: 900;
        color: var(--color-primary);
        max-height: 0;
        opacity: 0;
        transition: .5s all;
    }

    :host([expired="true"]) .expired {
        max-height: 100px;
        opacity: 1;
    }

    .verify-buttons {
        display: flex;
        position: relative;

    }

    .verify-buttons > wc-button {
        --button-font-size: 1rem;
        --button-padding: 15px;
    }

    #save-all {
        flex-grow: 1;
        margin-right: 10px;
    }

    #processing {
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
        transition: .3s all;
    }

    #processing.show {
        pointer-events: inherit;
        opacity: 1;
    }

  </style>
  
  <div class="container">
      <div class="expired">[Expired] - Please verify again</div>
      <div class="header">
        <h4 id="name"></h4>
        ${timeSelector}
      </div>
      
      <div id="status-chooser"></div>
      
      <div class="remarks">
        <p>Remarks</p>
        <input id="remarks-input" maxlength="20" type="text" placeholder="${HINT}">
      </div>

      <div class="verify-buttons">
        <wc-button id="save-all">Verify</wc-button>
        <wc-button id="save-only">AM only</wc-button>
        <div id="processing">Processing...</div>
      </div>

      <div id="comment"></div>
  </div>
  
`;

const ids = ['remarks-input', 'status-chooser', 'comment', 'name', 'save-all', 'save-only', 'time-selector', 'processing'];

export default class EditStatus extends Dialogue {

    constructor() {
        super();
        this.timeOfDay = 'am';
        this.status = { 'am': {}, 'pm': {} };
        this.views.statusChooser = [];
        this.isProcessing = false;
        this.render(this.views.dialogue, template, ids);
        this.views['save-all'].onclick = this.verifyAll.bind(this);
        this.views['save-only'].onclick = this.verifyOnly.bind(this);
        this.views['remarks-input'].onblur = e => {
            this.saveRemarks();
        }
        this.views.timeSelectors = this.views['time-selector'].querySelectorAll('wc-button');
        this.views.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
        this.populateStatusChooser();
    }

    close() {
        this.ondismiss();
        super.close();
    }

    setController(controller) {
        this.controller = controller;
    }

    toggleTime(isMorning) {
        this.saveRemarks();
        this.timeOfDay = isMorning ? 'am' : 'pm';
        let morningType = isMorning ? 'solid' : 'outline';
        let afternoonType = isMorning ? 'outline' : 'solid';
        let { code, remarks, updater, date, expired } = this.status[this.timeOfDay];
        this.views['remarks-input'].value = remarks;
        this.views.comment.textContent = `Last verified by ${updater}\non ${date}`;
        this.views.timeSelectors[0].setAttribute('type', morningType);
        this.views.timeSelectors[1].setAttribute('type', afternoonType);
        this.views['save-only'].textContent = `${this.timeOfDay.toUpperCase()} only`;
        this.setStatus(code);
        this.setAttribute('expired', expired);
    }

    saveRemarks() {
        this.status[this.timeOfDay].remarks = this.views['remarks-input'].value;
    }

    sendUserUpdates(timeOfDay) {
        let inputStatusCode = this.status[timeOfDay].code;
        let inputRemarks = this.views['remarks-input'].value.trim();
        this.controller.updateUserStatus(timeOfDay === 'am', inputStatusCode, inputRemarks, this.user.uid);
    }

    verifyOnly(e) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        this.views.processing.classList.add('show');
        this.sendUserUpdates(this.timeOfDay);
    }

    verifyAll(e) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        let oppositeTime = this.timeOfDay === 'am' ? 'pm' : 'am';
        this.status[oppositeTime].code = this.status[this.timeOfDay].code;
        this.views.processing.classList.add('show');
        this.sendUserUpdates('am');
        this.sendUserUpdates('pm');
    }

    setStatus(code) {
        if (this.views.prevButton) {
            this.views.prevButton.setAttribute('type', 'outline');
        }
        this.views.statusChooser[code].setAttribute('type', 'solid');
        this.views.prevButton = this.views.statusChooser[code];
        this.status[this.timeOfDay].code = code;
    }

    populateStatusChooser() {
        STATUS.forEach((status, idx) => {
            let button = document.createElement('wc-button');
            button.setAttribute('type', 'outline');
            button.textContent = status.name;
            button.onclick = e => {
                let currentCode = this.status[this.timeOfDay].code;
                if (currentCode === idx) return;
                this.setStatus(idx);
                this.views['remarks-input'].value = "";
            };
            this.views['status-chooser'].appendChild(button);
            this.views.statusChooser.push(button);
        });
    }

    setUser(user, amUpdater, pmUpdater) {
        this.isProcessing = true;
        this.user = user;
        this.compareStatusDate('am', amUpdater);
        this.compareStatusDate('pm', pmUpdater);
        this.toggleTime(this.timeOfDay == 'am');
        this.views.name.textContent = user.fullname;
        this.views.processing.classList.remove('show');
        this.isProcessing = false;
    }

    compareStatusDate(timeOfDay, updater) {
        let userStatus = this.user.status[timeOfDay];
        let userDate = userStatus.timestamp;
        let statusDate = this.status[timeOfDay].date;
        if (!statusDate || statusDate.getTime() != userDate.getTime()) {
            let status = {
                code: Number(userStatus.code),
                remarks: userStatus.remarks,
                expired: userStatus.expired,
                date: userDate,
                updater
            }
            this.status[timeOfDay] = status;
            if (this.timeOfDay == timeOfDay) {
                this.views['remarks-input'].value = this.status[timeOfDay].remarks;
            }
        }
    }

    updateAfternoonStatus() {
        this.pmStatus = this.user.status.pm.code;
        this.pmRemarks = this.user.status.pm.remarks;
        this.pmDate = this.user.status.pm.timestamp;
    }
}