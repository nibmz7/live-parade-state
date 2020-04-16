import BasicDepartmentCard from '../../widgets/BasicDepartmentCard.js';
import STATUS from '../../../data/Status.js';

const customStyle = `
    #sub-header {
        padding: 10px;
        text-align: center;
        padding: 10 px;
        font-weight: 900;
        background: #34495e;
        color:white;
    }
    #secondary-text {
        white-space: pre-line;
        font-size: 0.7rem;
        margin-top: 3px;
    }
`;

export default class UserDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        this.subHeader = 'Total strength';
        this.isEditable = false;
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        let status = user.status;
        let am = this.getStatus(status.am, 'AM');
        let pm = this.getStatus(status.pm, 'PM');
        return am + '\n' + pm;
    }

    getStatus(status, prefix) {
        let hasRemark = status.remarks.length > 0;
        let statusName =  `${prefix}: ${STATUS[status.code].name}`;
        return hasRemark ? `${statusName} (${status.remarks})` : statusName;
    }
    
    onUserSelected(uid) {
        if(this.isEditable) {

        } else {

        }
    }
    
}