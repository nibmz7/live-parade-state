import MainView from "../widgets/MainView.js";


const timeChooserTemplate = `

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
    </style>

    <div id="time-selector">
        <wc-button type="solid">AM</wc-button>
        <wc-button type="outline">PM</wc-button>
    </div>
`;

export default class UserView extends MainView {

    constructor() {
        super();
        this.floatButton.textContent = 'View summary';
        let el = document.createElement('div');
        el.innerHTML = timeChooserTemplate;
        this.shadowRoot.appendChild(el);
        this.timeSelectors = el.querySelectorAll('wc-button');
        this.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
        this.summaryView = document.createElement('summary-view');
    }

    connectedCallback() {
        super.connectedCallback();
        let isMorning = new Date().getHours() <= 12;
        this.toggleTime(isMorning);
    }

    setController(controller) {
        super.setController(controller);
        this.summaryView.setController(controller);
    }

    toggleTime(isMorning) {
        this.summaryView.toggleTimeOfDay(isMorning);
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
        document.body.appendChild(this.summaryView);
    }

}