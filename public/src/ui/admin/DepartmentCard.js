import { cardStyle } from '../../util/GlobalStyles.js';

const template = `
    <style>
        ${cardStyle}

        .container {
            padding: 30px;
        }

        .card {
            border-radius: 15px;
        }

        .user {
            padding: 10px 15px;
            transition: .3s background;
            cursor: pointer;
        }
        
        .user:active {
            background: #F0F0F0;
        }
        
        .user:last-child {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        #name {
            text-transform: capitalize;
            color: #323232;
            font-weight: 700;
        }
        #email {
            color: #878787;
            font-size: 0.8rem;
            font-weight: 600;
        }

        #header {
            color: #828282;
            text-transform: capitalize;
        }

        .header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

    </style>
    
    <div class="container">
        <div class="header-holder">
            <h3 id="header"></h3>
            <wc-button type="plain" id="edit-dep">edit</wc-button>
        </div>
        <div class="card">
            <wc-button type="plain" id="add-user">Add user</wc-button>
            <div id="list"></div>
        </div>
    </div>

    <template id="user">
        <div class="user">
            <p id="name"></p>
            <p id="email"></p>
        </div>
    </template>
`;

export default class DepartmentCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        let editDepartment = this.shadowRoot.getElementById('edit-dep');
        editDepartment.onclick = e => {
            let dialogue = document.createElement('edit-department');
            dialogue.setEditMode(true);
            dialogue.setDepartment(this.id, this.depName);
            dialogue.setController(this.controller);
            document.body.appendChild(dialogue);
        }
    }

    setController(controller) {
        this.controller = controller;
    }

    setDepartmentId(depId) {
        this.id = depId;
    }

    setDepartmentName(name) {
        this.depName = name;
        let depText = this.shadowRoot.getElementById('header');
        depText.textContent = name;
    }

    addUser(uid, user) {
        let template = this.shadowRoot.getElementById('user');
        let clone = template.content.cloneNode(true);
        let userItem = clone.querySelector('.user');
        let name = clone.getElementById('name');
        let email = clone.getElementById('email');
        userItem.id = uid;
        name.textContent = user.rank + ' ' + user.name;
        email.textContent = user.email;
    }
}