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

    updateDialogue(user) {
        let amUpdater = this.getUser(user.status.am.updatedby);
        let pmUpdater = this.getUser(user.status.pm.updatedby);
        let amName = amUpdater? amUpdater.fullname : 'admin';
        let pmName = pmUpdater? pmUpdater.fullname : 'admin';
        this.dialogue.view.setUser(user, amName,pmName);
    }

    onUserSelected(uid) {
        let user = this.getUser(uid);
        let dialogue;
        if (this.isEditable) {
            dialogue = document.createElement('edit-status');
            dialogue.timeOfDay = this.timeOfDay;
            dialogue.setController(this.controller);
        } else dialogue = document.createElement('status-details');
        dialogue.ondismiss = () => {
            this.dialogue.isopen = false; 
            this.dialogue.uid = null;
            this.dialogue.view = null;
        }
        this.dialogue.isopen = true;
        this.dialogue.uid = uid;
        this.dialogue.view = dialogue;
        this.updateDialogue(user);
        document.body.appendChild(dialogue);
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
            let prevStatus = this.getUser(user.uid).status[timeOfDay].code;
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
                this.updateDialogue(user);
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
        let user = this.getUser(uid);
        checkIsPresent('am', user.status.am.code);
        checkIsPresent('pm', user.status.pm.code);
        super.removeUser(uid);
        this.showStrength();
    }   
}