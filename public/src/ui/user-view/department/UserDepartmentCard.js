import SectionView from '../widgets/SectionView.js';

const customStyle = `
    #sub-header {
        padding: 10px;
        text-align: center;
        padding: 10 px;
        font-weight: 900;
        background: #34495e;
        color:white;
    }
`;

export default class DepartmentView extends SectionView {

    constructor() {
        super(customStyle);
        this.users = {};
        this.listItems = [];
    }

    setDepartment(department) {
        this.header = department.name;
        this.id = department.uid;
    }

    setEditable(isEditable) {
        this.isEditable = isEditable;
    }

    onUserSelected(uid) {
        if(this.isEditable) {

        } else {

        }
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
}