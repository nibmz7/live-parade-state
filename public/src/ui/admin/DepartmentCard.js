import { cardStyle } from '../../util/GlobalStyles.js';
import Utils from '../../util/Utils.js';

const template = `
    <style>
        ${cardStyle}

        .container {
            padding: 30px;
        }

        .card {
            border-radius: 15px;
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
    
        #add-user {
            --button-radius: 15px 15px 0 0;
        }

        .user {
            padding: 10px 15px;
            transition: .3s background;
            cursor: pointer;
        }
        
        .user:active {
            background: #F0F0F0;
        }

        .user:first-child {
            border-top: 2px dashed var(--color-primary);
        }
        
        .user:last-child {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        .user > p {
            margin: 0;
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
        this.list = this.shadowRoot.getElementById('list');
        this.users = {};
        this.shadowRoot.getElementById('edit-dep').onclick = this.showEditDepDialogue.bind(this);
        this.shadowRoot.getElementById('add-user').onclick = this.showAddUserDialogue.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    showEditDepDialogue(e) {
        let dialogue = document.createElement('edit-department');
        dialogue.setEditMode(true);
        dialogue.setDepartment(this.id, this.depName);
        dialogue.setController(this.controller);
        document.body.appendChild(dialogue);
    }

    showAddUserDialogue(e) {
        let dialogue = document.createElement('edit-user');
        dialogue.setEditMode(false);
        dialogue.setController(this.controller);
        dialogue.setDepartment(this.id, this.depName);
        document.body.appendChild(dialogue);
    }

    setDepartmentId(depId) {
        this.id = depId;
    }

    setDepartmentName(name) {
        this.depName = name;
        let depText = this.shadowRoot.getElementById('header');
        depText.textContent = name;
    }
    
    onUserSelected(uid) {
        let dialogue = document.createElement('edit-user');
        dialogue.setEditMode(true);
        dialogue.setController(this.controller);
        dialogue.setDepartment(this.id, this.depName);
        dialogue.setUser(this.users[uid]);
        document.body.appendChild(dialogue);
    }

    setUserItemData(item, user) {
        let name = item.querySelector('#name');
        let email = item.querySelector('#email');
        name.textContent = user.rank + ' ' + user.name;
        email.textContent = user.email;
    }

    addUser(user) {
        this.users[user.uid] = user;
        let template = this.shadowRoot.getElementById('user');
        let clone = template.content.cloneNode(true);
        let userItem = clone.querySelector('.user');
        userItem.id = user.uid;
        this.setUserItemData(userItem, user);
        Utils.onclick(userItem, () => this.onUserSelected(user.uid));
        this.list.appendChild(clone);
    }

    changeUser(user) {
        this.users[user.uid] = user;
        let userItem = this.shadowRoot.getElementById(user.uid);
        this.setUserItemData(userItem, user);
    }

    removeUser(uid) {
        delete this.users[uid];
        let userItem = this.shadowRoot.getElementById(uid);
        userItem.remove();
    }
}