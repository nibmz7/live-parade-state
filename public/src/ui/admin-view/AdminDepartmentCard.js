import Utils from '../../util/Utils.js';
import BasicDepartmentCard from '../widgets/BasicDepartmentCard.js';

const customStyle = `
    #sub-header {
        font-size: 1.3rem;
        padding: 10px;
        text-align: center;
        font-weight: 400;
        color: var(--color-primary);
        cursor: pointer;
        background: transparent;
        transition: all .2s;
    }
    #sub-header:active {
        background: rgba(0,0,0,.1);
    }
    .list-item:first-child {
        border-top: 2px dashed var(--color-primary);
    }
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
    
}