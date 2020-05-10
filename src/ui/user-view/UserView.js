import MainView from "../base/MainView.js";


const template = `

    <style>
        #time-selector {
            display: flex;
            position: fixed;
            z-index: 99;
            right: 10px;
            bottom: 10px;
        }

        #time-selector > wc-button {
            --button-font-size: 1rem;
            --button-padding: 5px;
        }

        #time-selector > wc-button:nth-of-type(1) {
            --button-radius: 35px 0 0 35px;
        }
        #time-selector > wc-button:nth-of-type(2) {
            --button-radius: 0 35px 35px 0;
        }
        #float-button {
            left: 15%;
            right: 35%;
        }
        .content {
          transition: .7s filter;
        }
        .blur {
            filter: blur(2px);
        }
    </style>

    <div id="time-selector">
        <wc-button type="solid">AM</wc-button>
        <wc-button type="outline">PM</wc-button>
    </div>
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
        this.content.classList.add('blur');
        this.root.appendChild(this.summaryView);
    }

    summaryViewOnClose() {
        this.content.classList.remove('blur');
    }

}