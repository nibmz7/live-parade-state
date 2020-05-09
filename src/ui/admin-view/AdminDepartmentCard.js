import Utils from '../../util/Utils.js';
import BasicDepartmentCard from '../base/BasicDepartmentCard.js';
import { STATE } from '../../controller/AdminController.js';
import { fadeAnim } from '../GlobalStyles.js';
import STATUS from '../../model/Status.js';

const customStyle = `
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
`;

export default class AdminDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        let editButton = document.createElement('wc-button');
        editButton.setAttribute('type', 'plain');
        editButton.onclick = this.showEditDepDialogue.bind(this);
        editButton.textContent = 'edit';
        this.shadowRoot.querySelector('.header-holder').appendChild(editButton);
        Utils.onclick(this.subHeaderText, this.showAddUserDialogue.bind(this));
        this.subHeader = 'Add user';
        this.subHeaderText.classList.add('empty');
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
        dialogue.setDepartment(this.id, this.departmentName);
        dialogue.setController(this.controller);
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
                Utils.animate(loadingText, 'fade-out', () => {
                    loadingText.remove();
                });
                Utils.onclick(item, () => {this.onUserSelected(user.uid)});
            } else {
                Utils.onclick(item, null);
                let loadingText = document.createElement('p');
                loadingText.classList.add('loading');
                loadingText.textContent = `${STATE[user.state]} user...`;
                Utils.animate(loadingText, 'fade-in', () => {
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
        let userItem = this.shadowRoot.getElementById(user.email);
        userItem.id = user.uid;
    }

    addUser(user, animate = true) {
        super.addUser(user, animate);
        if (this.uidArray.length > 0) this.subHeaderText.classList.remove('empty');
    }

    removeUser(user, animate = true) {
        super.removeUser(user, animate);
        if (this.uidArray.length == 0) this.subHeaderText.classList.add('empty');
    }

}