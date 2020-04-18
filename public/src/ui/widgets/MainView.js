import Utils from '../../util/Utils.js';

const template = `
    <style>
        :host {
            width: inherit;
            height: inherit;
        }

        #float-button {
            position: fixed;
            --button-radius: 50px;
            --button-font-size: 1.1rem;
            bottom: 10px;
            left: 20%;
            right: 35%;
        }
        
        #root {
          height: 100%;
          width: 100%;
        }
        
        #list {
            overflow-x: hidden;
            overflow-y: scroll;
            height: 100%;
            padding-bottom: 55px;
            box-sizing: border-box;
        }
        
        #empty {
          position: absolute;
          top: 40%;
          text-align: center;
          width: 100%;
          color: #34495e;
          display: none;
        }
        
        #list:empty + #empty {
          display: block;
        }

        #list > * {
            padding: 5px 30px;
        }
        
    </style>
    
    <div id="root">
        <div id="list"></div>
        <p id="empty">Loading...</p>
        <wc-button id="float-button"></wc-button>
    </div>

`;

export default class MainView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');
        this.list = this.shadowRoot.getElementById('list');
        this.emptyText = this.shadowRoot.getElementById('empty');
        this.departmentViews = {};
        this.floatButton = this.shadowRoot.getElementById('float-button');
        this.floatButton.onclick = e => {
            this.onFloatButtonClick();
        }
    }

    showWelcomeText(name) {
        Utils.addWelcomeText(name);
        this.welcomeText = document.getElementById('welcome-text');
        this.list.onscroll = e => {
            if (this.list.scrollTop > 0) {
                this.welcomeText.classList.add('elevation');
            } else {
                this.welcomeText.classList.remove('elevation');
            }
        }
    }

    disconnectedCallback() {
        this.welcomeText.remove();
    }

    setController(controller) {
        this.controller = controller;
    }

    getDepartmentCard(uid) {
        return this.departmentViews[uid];
    }

    addDepartment(department) {
        let uid = department.uid;
        if (!this.departmentViews[uid]) {
            let departmentCard = this.createDepartmentCard();
            this.departmentViews[uid] = departmentCard;
            departmentCard.setDepartment(department);
            departmentCard.setController(this.controller);
            this.list.appendChild(departmentCard);
        }
    }

    modifyDepartment() {
        let departmentCard = this.departmentViews[department.uid];
        departmentCard.setDepartment(department);
    }

    removeDepartment(uid) {
        let departmentCard = this.departmentViews[uid];
        departmentCard.remove();
        delete this.departmentViews[uid];
    }

    showEmpty() {
        this.emptyText.textContent = "No departments found";
    }

}