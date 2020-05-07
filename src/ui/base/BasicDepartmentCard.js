import { cardStyle } from '../GlobalStyles.js';
import Utils from '../../util/Utils.js';
import User from '../../model/User.js';

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
            font-weight: 500;
            margin: 0;
        }

        .header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 18px 0;
        }
    
        #sub-header {
            border-radius: 15px 15px 0 0;
            font-weight: 400;
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
            font-weight: 500;
        }

        #primary-text.regular {
            color: var(--color-primary);
        }

        #secondary-text {
            color: #878787;
            font-size: 0.8rem;
            font-weight: 400;
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

        .list-item.flash {
            animation: flash 1s 2 none;
        }

        .list-item.shrink {
            animation: shrink .5s forwards;
        }

        .list-item.grow {
            animation: grow .5s forwards;
        }

        @keyframes flash {
            0% {
                background-color: white;
            }
            50% {
                background-color: rgba(255, 56, 56, 0.18);
            }
            100% {
                background-color: white;
            }
        }

        @keyframes shrink {
            0% {
                max-height: 100px;
                padding: 10px 15px;
                opacity: 1;
            }
            100% {
                max-height: 0px;
                padding: 0 15px;
                opacity: 0;
            }
        }

        @keyframes grow {
            0% {
                max-height: 0px;
                padding: 0 15px;
                opacity: 0;
            }
            100% {
                max-height: 100px;
                padding: 10px 15px;
                opacity: 1;
            }
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
        this.uidArray = [];
    }

    getUser(uid) {
        return this.controller.getUser(uid);
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
        secondaryTextItem.innerHTML = this.getItemSecondaryText(user);
        if (user.regular) primaryTextItem.classList.add('regular');
    }

    setDepartment(department) {
        this.id = department.uid;
        this.departmentName = department.name;
        this.header = department.name;
    }

    getUserReferenceNode(user) {
        if (this.uidArray.length == 0) {
            this.uidArray.push(user.uid);
            return null;
        }
        let i = this.uidArray.length - 1;
        let uid = null;
        while (i >= 0) {
            let nextUserUid = this.uidArray[i];
            let nextUser = this.getUser(nextUserUid);
            let isHigher = User.compareLinear(user, nextUser);
            if (!isHigher) break;
            else uid = this.uidArray[i--];
        }
        this.uidArray.splice(++i, 0, user.uid);
        return uid ? this.shadowRoot.getElementById(uid) : null;
    }

    addUser(user, animate = true) {
        let template = this.shadowRoot.getElementById('list-item');
        let clone = template.content.cloneNode(true);
        let item = clone.querySelector('.list-item');
        item.id = user.uid;
        this.setListItemData(item, user);
        Utils.onclick(item, () => { this.onUserSelected(user.uid) });
        if (animate) {
            Utils.animate(item, 'grow', () => {
                item.classList.remove('grow');
            });
        }
        let referenceNode = this.getUserReferenceNode(user);
        this.list.insertBefore(item, referenceNode);
    }

    changeUser(user, animate = true) {
        let currentUserRank = this.getUser(user.uid).rank;
        if (currentUserRank != user.rank) {
            this.removeUser(user, false);
            this.addUser(user, false);
        }
        let userItem = this.shadowRoot.getElementById(user.uid);
        this.setListItemData(userItem, user);
        if (animate && !userItem.classList.contains('flash')) {
            Utils.animate(userItem, 'flash', () => {
                userItem.classList.remove('flash');
            });
        }
    }

    removeUser(user, animate = true) {
        let userItem = this.shadowRoot.getElementById(user.uid);
        userItem.id = `${user.uid}-deleted`;
        var index = this.uidArray.indexOf(user.uid);
        this.uidArray.splice(index, 1);
        if (animate) {
            Utils.animate(userItem, 'shrink', () => {
                userItem.remove();
            });
        } else userItem.remove();
    }

}