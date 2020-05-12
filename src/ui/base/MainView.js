import {BaseElement, html} from './BaseElement.js';

const template = html`
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
            left: 25%;
            right: 25%;
        }
        
        #root, #content {
          height: 100%;
          width: 100%;
          position: relative;
        }
        
        #list {
            overflow-x: hidden;
            overflow-y: scroll;
            height: 100%;
            width: 100%;
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
        
        #welcome-text {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            font-weight: 500;
            color: var(--color-primary-dark);
            font-size: 1.1rem;
            z-index: 95;
            margin: 0;
            padding: 10px;
            cursor: pointer;
            background: #faf5fab8;
            box-shadow: none;
            transition: all .5s;
            backdrop-filter: blur(2px);
          }
          #welcome-text.elevation {
            box-shadow: 0px 1px 2px 1px #928d8d4f;
          }
          
    </style>
    
    <div id="root">
          <div id="content">
            <div id="list"></div>
            <p id="empty">Loading...</p>
            <wc-button id="float-button"></wc-button>
            <h5 id="welcome-text"></h5>
          </div>
    </div>

`;

const ids = ['root','list','empty','float-button','welcome-text','content']

export default class MainView extends BaseElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template(customTemplate);
        this.views.departments = {};
        this.views['float-button'].onclick = this.onFloatButtonClick.bind(this);
        this.views.list.onscroll = e => {
            if (this.views.list.scrollTop > 0) {
                this.views['welcome-text'].classList.add('elevation');
            } else {
                this.views['welcome-text'].classList.remove('elevation');
            }
        }
        this.views['welcome-text'].onclick = e => {
            let signOutDialogue = document.createElement('sign-out');
            document.body.appendChild(signOutDialogue);
        }
    }

    setWelcomeText(name) {
        this.views['welcome-text'].textContent = `Hi, ${name}!`;
    }

    setController(controller) {
        this.controller = controller;
    }

    getDepartmentCard(uid) {
        return this.views.departments[uid];
    }

    addDepartment(department) {
        let uid = department.uid;
        if (!this.views.departments[uid]) {
            let departmentCard = this.createDepartmentCard();
            this.views.departments[uid] = departmentCard;
            departmentCard.setDepartment(department);
            departmentCard.setController(this.controller);
            this.views.list.appendChild(departmentCard);
        }
    }

    modifyDepartment(department) {
        let departmentCard = this.views.departments[department.uid];
        departmentCard.setDepartment(department);
    }

    removeDepartment(uid) {
        let departmentCard = this.views.departments[uid];
        departmentCard.remove();
        delete this.views.departments[uid];
    }

    showEmpty() {
        this.views.empty.textContent = "No departments found";
    }

}