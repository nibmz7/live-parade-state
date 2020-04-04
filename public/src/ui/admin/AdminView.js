import EventElement from '../widgets/EventElement.js';

const template = `
    <style>
        #add-department {
            position: fixed;
            --button-radius: 50px;
            --button-font-size: 1.1rem;
            bottom: 10px;
            left: 25%;
            right: 25%;
        }
    </style>
    
    <div id="root">
        <wc-button id="add-department">Create department</wc-button>
    </div>

`;

export default class AdminView extends EventElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        this.root = this.shadowRoot.getElementById('root');
        this.departmentViews = {};
        let addDepartment = this.shadowRoot.getElementById('add-department');
        addDepartment.onclick = e => {
            let dialogue = document.createElement('edit-department');
            dialogue.setEditMode(false);
            dialogue.setController(this.controller);
            document.body.appendChild(dialogue);
        }
    }

    setController(controller) {
        this.controller = controller;
    }

    addDepartment(uid, name) {
        if(!this.departmentViews[uid]) {
            let departmentCard = document.createElement('department-card');
            departmentCard.setDepartmentId(uid);
            departmentCard.setDepartmentName(name);
            this.root.appendChild(departmentCard);
        }
    }

}