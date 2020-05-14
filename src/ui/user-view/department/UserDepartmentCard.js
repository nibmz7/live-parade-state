import BasicDepartmentCard from '../../base/BasicDepartmentCard.js';
import STATUS from '../../../model/Status.js';
import { html } from '../../base/BaseElement.js';

const template = html`
    <style>
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
            font-weight: 500;
            text-transform: capitalize;
        }
        .card {
            counter-reset: am-total am-reg am-nsf pm-total pm-reg pm-nsf;
        }
        .am > #sub-header::before {
            content: counter(am-total) " Total ~ " counter(am-reg) " Regular + " counter(am-nsf) " Nsf";
        }
        .pm > #sub-header::before {
            content: counter(pm-total) " Total ~ " counter(pm-reg) " Regular + " counter(pm-nsf) " Nsf";
        }
        .am > #list > .list-item[am-reg] {
            counter-increment: am-total am-reg;
        }
        .am > #list > .list-item[am-nsf] {
            counter-increment: am-total am-nsf;
        }
        .pm > #list > .list-item[pm-reg] {
            counter-increment: pm-total pm-reg;
        }
        .pm > #list > .list-item[pm-nsf] {
            counter-increment: pm-total pm-nsf;
        }
    </style>
`;

export default class UserDepartmentCard extends BasicDepartmentCard {

    constructor() {
        super();
        this.render(this.shadowRoot, template);
        this.isEditable = false;
        this.dialogue = {isopen: false, uid: null, view: null};
        this.timeOfDay = 'am';
        this.views.card = this.shadowRoot.querySelector('.card');
        this.views.card.classList.add('am');
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
        let timeOfDay = isMorning ? 'am' : 'pm';
        this.views.card.classList.replace(this.timeOfDay, timeOfDay);
        this.timeOfDay = timeOfDay;
    }
    
    setListItemData(item, user) {
        super.setListItemData(item, user);
        const checkIsPresent = (timeOfDay, statusCode) => {
            let attr = user.regular ? `${timeOfDay}-reg` : `${timeOfDay}-nsf`
            if(statusCode === 1) item.div.setAttribute(attr, '');
            else item.div.removeAttribute(attr);
        }
        checkIsPresent('am', user.status.am.code);
        checkIsPresent('pm', user.status.pm.code);
    }

    changeUser(user, animate = true) {
        super.changeUser(user, animate);
        if(this.dialogue.isopen && this.dialogue.uid == user.uid) {
            if(user.status.am.timestamp && user.status.pm.timestamp)
                this.updateDialogue(user);
        }
    }   

}