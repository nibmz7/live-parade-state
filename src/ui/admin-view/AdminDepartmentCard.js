import BasicDepartmentCard from '../base/BasicDepartmentCard.js';
import { STATE } from '../../controller/AdminController.js';
import { fadeAnim } from '../GlobalStyles.js';
import { html } from '../base/BaseElement.js';

const template = html`/*minify-html*/
    <style>
        #sub-header {
            font-size: 1.3rem;
            padding: 10px;
            text-align: center;
            font-weight: 400;
            color: var(--color-primary);
            cursor: pointer;
            background: transparent;
            border-bottom: 2px dashed var(--color-primary);
            transition: all .2s;
        }
        #sub-header:active {
            background: rgba(0,0,0,.1);
        }
        #sub-header.empty {
            border-radius: 15px;
            border-bottom: none;
        }
        .list-item {
            position: relative;
        }
        .list-item .loading {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background: #f9ead5b5;
            padding-right: 10%;
            box-sizing: border-box;
            color: var(--color-primary);
            text-transform: capitalize;
        }

        ${fadeAnim(300, 500)}
    </style>
/*end*/`;

const edit_button = html`<wc-button type="plain" id="edit">edit</wc-button>`;

const loading_template = html`<p class="loading"></p>`;

export default class AdminDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super();
        this.render(this.shadowRoot, template);
        this.render(this.views['header-holder'], edit_button, ['edit']);
        this.views.edit.onclick = this.showEditDepDialogue.bind(this);
        this.onclick(this.views['sub-header'], this.showAddUserDialogue.bind(this));
        this.views['sub-header'].textContent = 'Add user';
        this.views['sub-header'].classList.add('empty');
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        return user.email;
    }

    showEditDepDialogue(e) {
        let dialogue = document.createElement('edit-department');
        dialogue.setEditMode(true);
        dialogue.setController(this.controller);
        dialogue.setDepartment(this.id, this.departmentName);
        document.body.appendChild(dialogue);
    }

    showAddUserDialogue(e) {
        let dialogue = document.createElement('edit-user');
        dialogue.setEditMode(false);
        dialogue.setController(this.controller);
        dialogue.setDepartment(this.id, this.departmentName);
        document.body.appendChild(dialogue);
    }

    onUserSelected(uid) {
        let dialogue = document.createElement('edit-user');
        dialogue.setEditMode(true);
        dialogue.setController(this.controller);
        dialogue.setDepartment(this.id, this.departmentName);
        dialogue.setUser(this.getUser(uid));
        document.body.appendChild(dialogue);
    }

    setListItemData(item, user) {
        super.setListItemData(item, user);
        if (user.state) {
            if (user.state === STATE.completed) {
                let loadingText = item.querySelector('.loading');
                this.animate(loadingText, 'fade-out', () => {
                    loadingText.remove();
                });
                this.onclick(item, () => {this.onUserSelected(user.uid)});
            } else {
                this.onclick(item, null);
                let clone = loading_template.get().content.cloneNode(true);
                let loadingText = clone.querySelector('.loading');
                loadingText.textContent = `${STATE[user.state]} user...`;
                this.animate(loadingText, 'fade-in', () => {
                    loadingText.classList.remove('fade-in');
                });
                item.appendChild(loadingText);
            }  
        }
    }

    changeUser(user, animate = true) {
        super.changeUser(user, !!!user.state);
    }

    updatePendingUserId(user) {
        var index = this.uidArray.indexOf(user.email);
        this.uidArray[index] = user.uid;
        this.items[user.uid] = this.items[user.email];
        delete this.items[user.email];
    }

    addUser(user, animate = true) {
        super.addUser(user, animate);
        if (this.uidArray.length > 0) this.views['sub-header'].classList.remove('empty');
    }

    removeUser(user, animate = true) {
        super.removeUser(user, animate);
        if (this.uidArray.length == 0) this.views['sub-header'].classList.add('empty');
    }

}