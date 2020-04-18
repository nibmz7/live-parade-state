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
        letter-spacing: 0.1em;
    }

    #secondary-text > span {
        color: var(--color-primary);
    }
`;

export default class UserDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        this.subHeader = 'Total strength';
        this.isEditable = false;
        this.dialogue = {isopen: false, uid: null, view: null};
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        const expiredText = ' <span>-- Expired</span>';
        let status = user.status;
        let am = this.getStatus(status.am, 'AM');
        let pm = this.getStatus(status.pm, 'PM');
        if(status.am.expired) am += expiredText;
        if(status.pm.expired) pm += expiredText;
        return am + '\n' + pm;
    }

    getStatus(status, prefix) {
        let hasRemark = status.remarks.length > 0;
        let statusName = `${prefix}: ${STATUS[status.code].name}`;
        return hasRemark ? `${statusName} (${status.remarks})` : statusName;
    }

    updateDialogue(uid) {
        let user = this.users[uid];
        let amUpdater = this.users[user.status.am.updatedby];
        let pmUpdater = this.users[user.status.pm.updatedby];
        this.dialogue.view.setUser(user,
            amUpdater ? amUpdater.fullname : 'admin',
            pmUpdater ? pmUpdater.fullname : 'admin');
    }

    onUserSelected(uid) {
        if (this.isEditable) {
            let dialogue = document.createElement('edit-status');
            this.dialogue.isopen = true;
            this.dialogue.uid = uid;
            this.dialogue.view = dialogue;
            this.updateDialogue(uid);
            dialogue.setController(this.controller);
            dialogue.ondismiss = () => {
                this.dialogue.isopen = false; 
                this.dialogue.uid = null;
                this.dialogue.view = null;
            }
            document.body.appendChild(dialogue);
        } else {

        }
    }

    changeUser(user) {
        super.changeUser(user);
        if(this.dialogue.isopen && this.dialogue.uid == user.uid) {
            if(user.status.am.timestamp && user.status.pm.timestamp)
                this.updateDialogue(user.uid);
        }
    }

}