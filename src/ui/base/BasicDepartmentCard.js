import { cardStyle } from '../GlobalStyles.js';
import User from '../../model/User.js';
import { html, BaseElement } from './BaseElement.js';

const template = html`

    <style>
        ${cardStyle}

        #root {
            padding: inherit;
        }

        .card {
            border-radius: 15px;
        }

        #header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 18px 0;
        }

        #header {
            color: #828282;
            text-transform: capitalize;
            font-weight: 500;
            margin: 0;
        }
    
        #sub-header {
            border-radius: 15px 15px 0 0;
            font-weight: 400;
        }

        #sub-header:only-child {
            border-radius: 15px;
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

        .list-item #primary-text {
            text-transform: capitalize;
            color: #323232;
            font-weight: 500;
        }

        .list-item #primary-text.regular {
            color: var(--color-primary);
        }

        .list-item #secondary-text {
            color: #878787;
            font-size: 0.8rem;
            font-weight: 400;
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

    </style>

    <div id="root">
        <div id="header-holder">
            <h3 id="header"></h3>
        </div>
        <div class="card">
            <div id="sub-header"></div>
            <div id="list"></div>
        </div>
    </div>
          
`;

const ids = ['list', 'header', 'sub-header','header-holder'];

const item_template = html`
    <div class="list-item">
        <p id="primary-text"></p>
        <p id="secondary-text"></p>
    </div>
`;


export default class BasicDepartmentCard extends BaseElement {

    constructor() {
        super();
        this.render(this.shadowRoot, template, ids);
        this.uidArray = [];
        this.items = {};
    }

    getUser(uid) {
        return this.controller.getUser(uid);
    }

    setController(controller) {
        this.controller = controller;
    }

    setDepartment(department) {
        this.id = department.uid;
        this.departmentName = department.name;
        this.views.header.textContent = department.name;
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
        return uid ? this.items[uid].item : null;
    }

    setListItemData(user) {
        let item = this.items[user.uid];
        item.primaryText.textContent = this.getItemPrimaryText(user);
        item.secondaryText.innerHTML = this.getItemSecondaryText(user);
        if (user.regular) item.primaryText.classList.add('regular');
    }

    addUser(user, animate = true) {
        let clone = item_template.get().content.cloneNode(true);
        let item = clone.querySelector('.list-item');
        let primaryText = clone.getElementById('primary-text');
        let secondaryText = clone.getElementById('secondary-text');
        item.id = user.uid;
        this.items[user.uid] = {item, primaryText, secondaryText};
        this.onclick(item, () => { this.onUserSelected(user.uid) });
        this.setListItemData(user);
        if (animate) {
            this.animate(item, 'grow', () => {
                item.classList.remove('grow');
            });
        }
        let referenceNode = this.getUserReferenceNode(user);
        this.views.list.insertBefore(item, referenceNode);
    }

    changeUser(user, animate = true) {
        let currentUserRank = this.getUser(user.uid).rank;
        if (currentUserRank !== user.rank) {
            this.removeUser(user, false);
            this.addUser(user, false);
        }
        if (currentUserRank === user.rank) this.setListItemData(user);
        let userItem = this.items[user.uid].item;
        if (animate && !userItem.classList.contains('flash')) {
            this.animate(userItem, 'flash', () => {
                userItem.classList.remove('flash');
            });
        }
    }

    removeUser(user, animate = true) {
        let userItem = this.items[user.uid].item;
        userItem.id = `${user.uid}-deleted`;
        var index = this.uidArray.indexOf(user.uid);
        this.uidArray.splice(index, 1);
        if (animate) {
            this.animate(userItem, 'shrink', () => {
                userItem.remove();
            });
        } else userItem.remove();
    }

}