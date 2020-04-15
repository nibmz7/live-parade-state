import EventElement from '../widgets/EventElement.js';

const template = `
    <style>
        :host {
            width: inherit;
            height: inherit;
        }

        #add-department {
            position: fixed;
            --button-radius: 50px;
            --button-font-size: 1.1rem;
            bottom: 10px;
            left: 25%;
            right: 25%;
        }
        
        #root {
          height: 100%;
          width: 100%;
        }
        
        #list {
            overflow-x: hidden;
            overflow-y: scroll;
            height: 100%;
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
        
    </style>
    
    <div id="root">
        <div id="list"></div>
        <p id="empty">Loading...</p>
        <wc-button id="add-department">Create department</wc-button>
    </div>

`;

export default class AdminView extends EventElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');
        this.list = this.shadowRoot.getElementById('list');
        this.emptyText = this.shadowRoot.getElementById('empty');
        this.departmentViews = {};
        let addDepartment = this.shadowRoot.getElementById('add-department');
        addDepartment.onclick = e => {
            let dialogue = document.createElement('edit-department');
            dialogue.setEditMode(false);
            dialogue.setController(this.controller);
            document.body.appendChild(dialogue);
        }
        let welcomeText = document.getElementById('welcome-text');
        this.list.onscroll = e => {
            if (this.list.scrollTop > 0) {
                welcomeText.classList.add('elevation');
            } else {
                welcomeText.classList.remove('elevation');
            }
        }
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
            let departmentCard = document.createElement('admin-department-card');
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