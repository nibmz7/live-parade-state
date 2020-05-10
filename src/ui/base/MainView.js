const template = customTemplate => `
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
        
        #root, .content {
          height: 100%;
          width: 100%;
          position: relative;
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
          <div class="content">
            <div id="list"></div>
            <p id="empty">Loading...</p>
            <wc-button id="float-button"></wc-button>
            <h5 id="welcome-text"></h5>
          </div>
          ${customTemplate? customTemplate : ''}
    </div>

`;

export default class MainView extends HTMLElement {

    constructor(customTemplate) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template(customTemplate);
        this.root = this.shadowRoot.getElementById('root');
        this.content = this.shadowRoot.querySelector('.content');
        this.list = this.shadowRoot.getElementById('list');
        this.emptyText = this.shadowRoot.getElementById('empty');
        this.departmentViews = {};
        this.floatButton = this.shadowRoot.getElementById('float-button');
        this.floatButton.onclick = e => {
            this.onFloatButtonClick();
        }
        this.welcomeText = this.shadowRoot.getElementById('welcome-text');
        this.list.onscroll = e => {
            if (this.list.scrollTop > 0) {
                this.welcomeText.classList.add('elevation');
            } else {
                this.welcomeText.classList.remove('elevation');
            }
        }
        this.welcomeText.onclick = e => {
            let signOutDialogue = document.createElement('sign-out');
            document.body.appendChild(signOutDialogue);
        }
    }

    setWelcomeText(name) {
        this.welcomeText.textContent = `Hi, ${name}!`;
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

    modifyDepartment(department) {
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