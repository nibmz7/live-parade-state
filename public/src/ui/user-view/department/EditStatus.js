import Dialogue from '../../widgets/Dialogue.js';
import STATUS from '../../../data/Status.js';

const HINT = 'Event, work, pooping etc.';
const template = `
  <style>
    .container {
        position: relative;
    }
    #status-chooser {
        display: flex;
        flex-wrap: wrap;
        width: 90%;
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

    #save {
        --button-font-size: 1rem;
        --button-padding: 15px;
    }

    #time-selector {
        display: flex;
    }

    #time-selector > wc-button {
        --button-font-size: 1rem;
        --button-padding: 5px;
    }

    #time-selector > wc-button:nth-of-type(1) {
        --button-radius: 15px 0 0 15px;
    }
    #time-selector > wc-button:nth-of-type(2) {
        --button-radius: 0 15px 15px 0;
    }

    #comment {
        margin-top: 10px;
        font-size: 0.6rem;
        white-space: pre-line;
        text-align: center;
    }

  </style>
  
  <div class="container">
      <div class="header">
        <h4 id="name"></h4>
        <div id="time-selector">
            <wc-button type="solid">AM</wc-button>
            <wc-button type="outline">PM</wc-button>
        </div>
      </div>
      
      <div id="status-chooser"></div>
      
      <div class="remarks">
        <p>Remarks</p>
        <input id="remarks-input" type="text" placeholder="${HINT}">
      </div>

      <wc-button id="save">Verify</wc-button>
      <div id="comment"></div>
  </div>
  
`;

export default class EditStatus extends Dialogue {

    constructor() {
        super(template);
        this.isMorning = true;
        this.statusChooser = [];
        this.isProcessing = false;
        this.remarksInput = this.shadowRoot.getElementById('remarks-input');
        this.statusChooserContainer = this.shadowRoot.getElementById('status-chooser');
        this.comment = this.shadowRoot.getElementById('comment');
        this.name = this.shadowRoot.getElementById('name');
        this.save = this.shadowRoot.getElementById('save');
        this.save.onclick = this.verify.bind(this);
        this.timeSelectors = this.shadowRoot.getElementById('time-selector').querySelectorAll('wc-button');
        this.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
        this.populateStatusChooser();
        this.remarksInput.onblur = e => {
            if(this.isMorning) this.amRemarks = this.remarksInput.value;
            else this.pmRemarks = this.remarksInput.value;
        }
    }

    close() {
        this.ondismiss();
        super.close();
    }

    setController(controller) {
        this.controller = controller;
    }

    toggleTime(isMorning) {
        let morningType = isMorning ? 'solid' : 'outline';
        let afternoonType = isMorning ? 'outline' : 'solid';
        this.timeSelectors[0].setAttribute('type', morningType);
        this.timeSelectors[1].setAttribute('type', afternoonType);
        let status = isMorning ? this.amStatus : this.pmStatus;
        let remarks = isMorning ? this.amRemarks : this.pmRemarks;
        let updater = isMorning ? this.amUpdater : this.pmUpdater;
        let updatedTime = isMorning ? this.amDate : this.pmDate;
        this.remarksInput.value = remarks;
        this.comment.textContent = `Last verified by ${updater}\non ${updatedTime}`;
        this.isMorning = isMorning;
        this.setStatus(status);
    }

    verify(e) {
        if(this.isProcessing) return;
        this.isProcessing = true;
        this.save.textContent = 'Processing...';
        let inputStatus = this.isMorning ? this.amStatus : this.pmStatus;
        let inputRemarks = this.remarksInput.value;
        this.controller.updateUserStatus(this.isMorning, inputStatus, inputRemarks, this.user.uid);
    }

    setStatus(code) {
        if(this.prevButton) {
            this.prevButton.setAttribute('type', 'outline');
        }
        this.statusChooser[code].setAttribute('type', 'solid');
        this.prevButton = this.statusChooser[code];
        if(this.isMorning) this.amStatus = code;
        else this.pmStatus = code;
    }

    populateStatusChooser() {
        for (let idx in STATUS) {
            let button = document.createElement('wc-button');
            button.setAttribute('type', 'outline');
            button.textContent = STATUS[idx].name;
            button.onclick = e => {
                let currentStatus = this.isMorning ? this.amStatus : this.pmStatus;
                if(currentStatus == idx) return;
                this.setStatus(idx);
            };
            this.statusChooserContainer.appendChild(button);
            this.statusChooser.push(button);
        }
    }

    setUser(user, amUpdater, pmUpdater) {
        this.isProcessing = true;
        this.name.textContent = user.fullname;
        this.user = user;
        this.amUpdater = amUpdater;
        this.pmUpdater = pmUpdater;
        this.save.textContent = 'Verify';
        this.checkChanges();
    }

    checkChanges() {
        if(!this.amDate || this.amDate != this.user.status.am.timestamp.toDate()) {
            this.updateMorningStatus();
        }
        if(!this.pmDate || this.amDate != this.user.status.pm.timestamp.toDate()) {
            this.updateAfternoonStatus();
        }
        this.toggleTime(this.isMorning);
        this.isProcessing = false;
    }

    updateMorningStatus() {
        this.amStatus = this.user.status.am.code;
        this.amRemarks = this.user.status.am.remarks;
        this.amDate = this.user.status.am.timestamp.toDate();
    }

    updateAfternoonStatus() {
        this.pmStatus = this.user.status.pm.code;
        this.pmRemarks = this.user.status.pm.remarks;
        this.pmDate = this.user.status.pm.timestamp.toDate();
    }


}