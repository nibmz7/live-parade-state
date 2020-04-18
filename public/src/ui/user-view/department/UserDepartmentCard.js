import BasicDepartmentCard from '../../widgets/BasicDepartmentCard.js';
import STATUS from '../../../data/Status.js';

const customStyle = `
    #sub-header {
        padding: 10px;
        text-align: center;
        font-weight: 300;
        background: #33475a;
        font-size: 0.9rem;
        color: white;
    }
    #secondary-text {
        white-space: pre-line;
        font-size: 0.7rem;
        margin-top: 3px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    #secondary-text > span {
        color: var(--color-primary);
        font-weight: 900;
        text-transform: capitalize;
    }
`;

export default class UserDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        this.isEditable = false;
        this.dialogue = {isopen: false, uid: null, view: null};
        this.strength = {am: {regular: 0, nsf: 0}, pm:  {regular: 0, nsf: 0}};
        this.timeOfDay = 'am';
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
            let dialogue = document.createElement('status-details');
            this.dialogue.isopen = true;
            this.dialogue.uid = uid;
            this.dialogue.view = dialogue;
            this.updateDialogue(uid);
            document.body.appendChild(dialogue);
        }
    }

    setTimeOfDay(isMorning) {
        this.timeOfDay = isMorning ? 'am' : 'pm';
        this.showStrength();
    }

    showStrength() {
        let strength = this.strength[this.timeOfDay];
        let totol = strength.regular + strength.nsf;
        this.subHeader = `${totol} Present ~ ${strength.regular} Regular + ${strength.nsf} Nsf`;
    }

    changeUser(user) {
        const checkIsPresent = (timeOfDay, statusCode) => {
            let prevStatus = this.users[user.uid].status[timeOfDay].code;
            if(prevStatus == statusCode) return;
            let prefix = user.regular ? 'regular' : 'nsf';
            if(statusCode == 1) this.strength[timeOfDay][prefix] += 1;
             else this.strength[timeOfDay][prefix] -= 1;
            
        }
        checkIsPresent('am', user.status.am.code);
        checkIsPresent('pm', user.status.pm.code);
        super.changeUser(user);
        if(this.dialogue.isopen && this.dialogue.uid == user.uid) {
            if(user.status.am.timestamp && user.status.pm.timestamp)
                this.updateDialogue(user.uid);
        }
        this.showStrength();
    }   

    addUser(user) {
        super.addUser(user);
        const checkIsPresent = (timeOfDay, statusCode) => {
            if(statusCode == 1) {
                let prefix = user.regular ? 'regular' : 'nsf';
                this.strength[timeOfDay][prefix] += 1;
            }
        }
        checkIsPresent('am', user.status.am.code);
        checkIsPresent('pm', user.status.pm.code);
        this.showStrength();
    }

    removeUser(uid) {
        const checkIsPresent = (timeOfDay, statusCode) => {
            if(statusCode == 1) {
                let prefix = user.regular ? 'regular' : 'nsf';
                this.strength[timeOfDay][prefix] -= 1;
            }
        }
        let user = this.users[uid];
        checkIsPresent('am', user.status.am.code);
        checkIsPresent('pm', user.status.pm.code);
        super.removeUser(uid);
        this.showStrength();
    }   
}