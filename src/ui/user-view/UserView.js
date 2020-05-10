import MainView from "../base/MainView.js";
import {timeSelector} from '../GlobalStyles.js';


const template = `

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

    </style>

    ${timeSelector}

`;

export default class UserView extends MainView {

    constructor() {
        super(template);
        this.floatButton.textContent = 'View summary';
        this.timeSelectors = this.shadowRoot.getElementById('time-selector').querySelectorAll('wc-button');
        this.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
        this.summaryView = document.createElement('summary-view');
        this.summaryView.onCloseView = this.summaryViewOnClose.bind(this);
        this.isMorning = true;
    }

    connectedCallback() {
        let isMorning = new Date().getHours() < 12;
        this.toggleTime(isMorning);
    }

    setController(controller) {
        super.setController(controller);
        this.summaryView.setController(controller);
    }

    toggleTime(isMorning) {
        if(this.isMorning == isMorning) return;
        this.isMorning = isMorning;
        this.summaryView.setTimeOfDay(isMorning);
        let morningType = isMorning ? 'solid' : 'outline';
        let afternoonType = isMorning ? 'outline' : 'solid';
        this.timeSelectors[0].setAttribute('type', morningType);
        this.timeSelectors[1].setAttribute('type', afternoonType);
        for(let departmentCard of Object.values(this.departmentViews)) {
            departmentCard.setTimeOfDay(isMorning);
        }
    }

    createDepartmentCard() {
        return document.createElement('user-department-card');
    }

    onFloatButtonClick() {
        this.root.classList.add('blur');
        this.root.appendChild(this.summaryView);
    }

    summaryViewOnClose() {
        this.root.classList.remove('blur');
    }

}