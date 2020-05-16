import MainView from "../base/MainView.js";
import { timeSelector } from '../GlobalStyles.js';
import { html } from "../base/BaseElement.js";
import SummaryScreen from "./summary/SummaryScreen.js";

const template = html`
    <style>
        #time-selector {
            position: fixed;
            z-index: 98;
            right: 10px;
            bottom: 10px;
        }
        
        #float-button {
            left: 15%;
            right: 35%;
        }
        #root {
            width: 200vw;
            display: flex;
            transition: margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
            margin-left: 0;
            background: #FAF5FA;
        }
        #root.open {
            margin-left: -100vw;
        }
        #content {
            width: 50%;
        }
        
        #float-button {
            position: absolute;
        }
        summary-screen {
            width: 50%;
        }
    </style>
    ${timeSelector}
`;

const ids = ['time-selector'];

export default class UserView extends MainView {

    constructor() {
        super();
        this.render(this.views.root, template, ids);
        this.views['float-button'].textContent = 'View summary';
        this.views.timeSelectors = this.views['time-selector'].querySelectorAll('wc-button');
        this.views.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
        this.isMorning = true;
        this.views.summary = new SummaryScreen();
        this.views.root.appendChild(this.views.summary);
        this.views.summary.views.close.onclick = this.closeSummaryScreen.bind(this);
    }

    connectedCallback() {
        let isMorning = new Date().getHours() < 12;
        this.toggleTime(isMorning);

    }

    setController(controller) {
        super.setController(controller);
        this.views.summary.setController(controller);
    }

    toggleTime(isMorning) {
        if (this.isMorning === isMorning) return;
        this.isMorning = isMorning;
        this.views.summary.setTimeOfDay(isMorning);
        let morningType = isMorning ? 'solid' : 'outline';
        let afternoonType = isMorning ? 'outline' : 'solid';
        this.views.timeSelectors[0].setAttribute('type', morningType);
        this.views.timeSelectors[1].setAttribute('type', afternoonType);
        for (let departmentCard of Object.values(this.views.departments)) {
            departmentCard.setTimeOfDay(isMorning);
        }
    }

    createDepartmentCard() {
        return document.createElement('user-department-card');
    }

    onFloatButtonClick() {
        this.views.root.classList.add('open');
        this.views.summary.show();
    }

    closeSummaryScreen() {
        this.views.summary.hide();
        this.views.root.classList.remove('open');
    }

}