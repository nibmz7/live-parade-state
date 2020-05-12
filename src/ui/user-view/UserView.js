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
        super();
        this.render(this.root, template, ['time-selector']);
        this.views['float-button'].textContent = 'View summary';
        this.views.timeSelectors = this.views['time-selector'].querySelectorAll('wc-button');
        this.views.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
        this.views.summary = document.createElement('summary-view');
        this.views.summary.onCloseView = this.views.summaryOnClose.bind(this);
        this.isMorning = true;
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
        if(this.isMorning === isMorning) return;
        this.isMorning = isMorning;
        this.views.summary.setTimeOfDay(isMorning);
        let morningType = isMorning ? 'solid' : 'outline';
        let afternoonType = isMorning ? 'outline' : 'solid';
        this.views.timeSelectors[0].setAttribute('type', morningType);
        this.views.timeSelectors[1].setAttribute('type', afternoonType);
        for(let departmentCard of Object.values(this.views.departments)) {
            departmentCard.setTimeOfDay(isMorning);
        }
    }

    createDepartmentCard() {
        return document.createElement('user-department-card');
    }

    onFloatButtonClick() {
        this.views.root.classList.add('blur');
        this.views.root.appendChild(this.views.summary);
    }

    summaryViewOnClose() {
        this/views.root.classList.remove('blur');
    }

}