import { cardStyle } from '../../util/GlobalStyles.js';

const template = `
    <style>
        ${cardStyle}

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

        #add-user {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            font-weight: 900;
            background: #34495e;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            color:white;
        }

    </style>
    
    <div>
        <h3 id="header"></h3>
        <div class="card">
            <div id="add-user">Add user</div>
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
    }

    setDepartmentId(depId) {
        this.depId = depId;
    }

    setDepartmentName(name) {
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