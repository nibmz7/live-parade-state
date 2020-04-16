import BasicDepartmentCard from '../../widgets/BasicDepartmentCard.js';

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

export default class UserDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        this.subHeader = 'Total strength';
    }

    setEditable(isEditable) {
        this.isEditable = isEditable;
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        return user.email;
    }
    
    onUserSelected(uid) {
        console.log(this.users[uid]);
        if(this.isEditable) {

        } else {

        }
    }
    
}