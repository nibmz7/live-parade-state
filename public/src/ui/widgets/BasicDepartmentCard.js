import { cardStyle } from '../../util/GlobalStyles.js';
import Utils from '../../util/Utils.js';
import User from '../../data/User.js';

const template = customStyle => `

    <style>
        ${cardStyle}

        .container {
            padding: inherit;
        }

        .card {
            border-radius: 15px;
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
    
        #sub-header {
            border-radius: 15px 15px 0 0;
        }

        #sub-header:only-child {
            border-radius: 15px;
        }

    </style>
    
    <div class="container">
        <div class="header-holder">
            <h3 id="header"></h3>
        </div>
        <div class="card">
            <div id="sub-header"></div>
            <div id="list"></div>
        </div>
    </div>

    <style>

        #primary-text {
            text-transform: capitalize;
            color: #323232;
            font-weight: 700;
        }

        #secondary-text {
            color: #878787;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .list-item {
            padding: 10px 15px;
            transition: .3s background;
            cursor: pointer;
        }

        .list-item:active {
            background: #F0F0F0;
        }

        .list-item:last-child {
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }

        .list-item > p {
            margin: 0;
        }

        ${customStyle}

    </style>
          
    <template id="list-item">
        <div class="list-item">
            <p id="primary-text"></p>
            <p id="secondary-text"></p>
        </div>
    </template>
`;
    

export default class BasicDepartmentCard extends HTMLElement {

    constructor(customStyle) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template(customStyle);
        this.list = this.shadowRoot.getElementById('list');
        this.headerText = this.shadowRoot.getElementById('header');
        this.subHeaderText = this.shadowRoot.getElementById('sub-header');
        this.users = {};
        this.uidArray = [];
    }

    setController(controller) {
        this.controller = controller;
    }

    set header(title) {
        this.headerText.textContent = title;
    }

    set subHeader(title) {
        this.subHeaderText.textContent = title;
    }

    setListItemData(item, user) {
        let primaryTextItem = item.querySelector('#primary-text');
        let secondaryTextItem = item.querySelector('#secondary-text');
        primaryTextItem.textContent = this.getItemPrimaryText(user);
        secondaryTextItem.textContent = this.getItemSecondaryText(user);
    }

    setDepartment(department) {
        this.id = department.uid;
        this.departmentName = department.name;
        this.header = department.name;
    }

    getUserReferenceNode(user) {
        if(this.uidArray.length == 0) {
            this.uidArray.push(user.uid);
            return null;
        }
        let i = this.uidArray.length - 1;
        let uid = null;
        while(i >= 0) {
            let nextUserUid = this.uidArray[i];
            let nextUser = this.users[nextUserUid];
            let isHigher = User.compareLinear(user, nextUser);
            if(!isHigher) break;
            else uid = this.uidArray[i--];
        }
        this.uidArray.splice(++i, 0, user.uid);
        return uid ? this.shadowRoot.getElementById(uid) : null;
    }

    addUser(user) {
        this.users[user.uid] = user;

        let template = this.shadowRoot.getElementById('list-item');
        let clone = template.content.cloneNode(true);
        let item = clone.querySelector('.list-item');
        item.id = user.uid;
        this.setListItemData(item, user);
        Utils.onclick(item, () => {this.onUserSelected(user.uid)});

        let referenceNode = this.getUserReferenceNode(user);
        this.list.insertBefore(item, referenceNode);
    }

    changeUser(user) {
        let currentUser = this.users[user.uid];
        if(currentUser.rank != user.rank) {
            this.removeUser(user.uid);
            this.addUser(user);
        } else {
            this.users[user.uid] = user;
            let userItem = this.shadowRoot.getElementById(user.uid);
            this.setListItemData(userItem, user);
        }
    }

    removeUser(uid) {
        delete this.users[uid];
        let userItem = this.shadowRoot.getElementById(uid);
        userItem.remove();
        var index = this.uidArray.indexOf(uid);
        this.uidArray.splice(index, 1);
    }
    
}