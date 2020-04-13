import Utils from '../../util/Utils.js';
import SectionView from '../widgets/SectionView.js';

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
`;

export default class DepartmentCard extends SectionView {

    constructor() {
        super(customStyle);
        this.users = {};
        let editButton = document.createElement('wc-button');
        editButton.setAttribute('type', 'plain');
        editButton.onclick = this.showEditDepDialogue.bind(this);
        editButton.textContent = 'edit';
        this.shadowRoot.querySelector('.header-holder').appendChild(editButton);
        Utils.onclick(this.subHeaderText, this.showAddUserDialogue.bind(this));
        this.subHeader = 'Add user';
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
        this.header = name;
    }
    
    onUserSelected(uid) {
        let dialogue = document.createElement('edit-user');
        dialogue.setEditMode(true);
        dialogue.setController(this.controller);
        dialogue.setDepartment(this.id, this.depName);
        dialogue.setUser(this.users[uid]);
        document.body.appendChild(dialogue);
    }

    addUser(user) {
        this.users[user.uid] = user;

        let item = this.createListItem();
        item.id = user.uid;
        item.primaryText = user.rank + ' ' + user.name;
        item.secondaryText = user.email;
        item.onclick = () => this.onUserSelected(user.uid);

        this.list.appendChild(item.clone());
    }

    changeUser(user) {
        this.users[user.uid] = user;
        let userItem = this.shadowRoot.getElementById(user.uid);
        this.setListItemData(userItem, user.rank + ' ' + user.name, user.email);
    }

    removeUser(uid) {
        delete this.users[uid];
        let userItem = this.shadowRoot.getElementById(uid);
        userItem.remove();
    }
    
}