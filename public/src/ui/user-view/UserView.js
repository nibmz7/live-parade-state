import MainView from "../widgets/MainView.js";


const timeChooserTemplate = `

    <style>
        #time-selector {
            display: flex;
            position: absolute;
            z-index: 99;
            right: 10px;
            bottom: 10px;
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
        this.root.prepend(el);
        this.timeSelectors = el.querySelectorAll('wc-button');
        this.timeSelectors.forEach((el, i) => el.onclick = e => this.toggleTime(i == 0));
    }

    
    toggleTime(isMorning) {
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
        
    }

}