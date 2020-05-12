import { BaseElement, html } from "../../base/BaseElement";
import SummaryView from "./SummaryView";

const template = html`

    <style>
        :host([hidden]) #root{
            background: red;
        }
        #root {
            height: 100%;
            width: 100%;
            position: absolute;
            background: #FAF5FA;
            top: 0;
            z-index: 97;
            box-shadow: -1px 0px 3px 1px #00000040;
        }

        #close {
            position: fixed;
            bottom: 10px;
            left: 10px;
            --button-font-size: 1rem;
            --button-padding: 7px 15px;
            --button-radius: 35px;
            transform: translateY(0px);
            transition: .4s;
        }

        #export {
            position: fixed;
            bottom: 10px;
            --button-font-size: 1rem;
            left: 45%;
            transform: translateX(-45%) translateY(0px);
            --button-padding: 15px;
            --button-radius: 35px;
            transition: .5s;
        }

        wc-button {
            transition: .5s all;
        }

        .show {
            animation: slide-in-x ease-in-out .5s;
        } 
        .show > #export {
            transform: translateX(-45%) translateY(150%);
        }
        .show > #close {
            transform: translateY(150%);
        }

        .hide {
            animation: slide-out-x ease-in-out .5s;
        } 

        ${slideXAnim()}
        
    </style>

    <div id="root">
        <summary-view id="am"></summary-view>
        <summary-view id="pm"></summary-view>
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
        let amSummaryView = this.shadowRoot.getElementById('am');
        let pmSummaryView = this.shadowRoot.getElementById('pm');
        this.summaryView = {am: amSummaryView, pm: pmSummaryView};
    }

    setController(controller) {
        this.controller = controller;
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