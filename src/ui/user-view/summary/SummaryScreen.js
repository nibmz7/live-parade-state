import { BaseElement, html } from "../../base/BaseElement.js";
import SummaryView from "./SummaryView.js";

const template = html`

    <style>
        #root {
            height: 100%;
            width: 100%;
            position: relative;
            background: #FAF5FA;
            top: 0;
            z-index: 97;
            box-shadow: -1px 0px 3px 1px #00000040;
        }

        #close {
            position: absolute;
            bottom: 10px;
            left: 10px;
            --button-font-size: 1rem;
            --button-padding: 7px 15px;
            --button-radius: 35px;
            transform: translateY(150%);
            transition: .3s;
        }

        #export {
            position: absolute;
            bottom: 10px;
            --button-font-size: 1rem;
            left: 45%;
            transform: translateX(-45%) translateY(150%);
            --button-padding: 15px;
            --button-radius: 35px;
            transition: .3s .1s;
        }

        .show > #export {
            transition: .5s .7s;
            transform: translateX(-45%) translateY(0px);
        }
        .show > #close {
            transition: .5s .6s;
            transform: translateY(0px);
        }
        
    </style>

    <div id="root">
        <wc-button id="close">X</wc-button>
        <wc-button id="export">Download file</wc-button>
    </div>

`;

const ids = ['root','close','export'];

const loadingText = 'Using advanced AI algorithms coupled with state-of-the-art data analytics system assembled by world-renowned programmers, to construct and produce a freshly baked spreadsheet for our unit.';

export default class SummaryScreen extends BaseElement {

    constructor() {
        super();
        this.render(this.shadowRoot, template, ids);
        let amSummaryView = new SummaryView();
        let pmSummaryView = new SummaryView();
        amSummaryView.timeOfDay = 'am';
        pmSummaryView.timeOfDay = 'pm';
        this.views.root.appendChild(amSummaryView);
        this.views.root.appendChild(pmSummaryView);
        this.summaryView = {am: amSummaryView, pm: pmSummaryView};
    }

    show() {
        this.views.root.classList.add('show');
    }

    hide() {
        this.views.root.classList.remove('show');
    }

    setController(controller) {
        this.controller = controller;
        this.summaryView.am.setController(controller);
        this.summaryView.pm.setController(controller);
    }

    setTimeOfDay(isMorning) {
        this.currentTime = isMorning ? 'am' : 'pm';
        this.hiddenTime = isMorning ? 'pm' : 'am';
        this.summaryView[this.currentTime].setAttribute('hidden', '');
        this.summaryView[this.hiddenTime].removeAttribute('hidden');
    }

    addUser(user) {
        this.summaryView.am.addUser(user);
        this.summaryView.pm.addUser(user);
    }

    changeUser(user) {
        const checkIfStatusChanged = timeOfDay => {
            let userBefore = this.controller.getUser(user.uid);
            let status = user.status[timeOfDay];
            let prevStatus = userBefore.status[timeOfDay];
            if (prevStatus.code != status.code) {
                this.summaryView[timeOfDay].removeUser(userBefore);
                this.summaryView[timeOfDay].addUser(user);
            } else {
                let prevRemarksLength = prevStatus.remarks.length;
                let remarksLength = status.remarks.length;
                let remarksChanged = 0;
                if (prevRemarksLength == 0 && remarksLength > 0) remarksChanged = -1;
                if (prevRemarksLength > 0 && remarksLength == 0) remarksChanged = 1;
                this.summaryView[timeOfDay].changeUser(user, remarksChanged);
            }
        }
        checkIfStatusChanged('am');
        checkIfStatusChanged('pm');
    }

    removeUser(user) {
        this.summaryView.am.removeUser(user);
        this.summaryView.pm.removeUser(user);
    }

}