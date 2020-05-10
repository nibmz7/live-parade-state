import BasicDepartmentCard from "../../base/BasicDepartmentCard.js";

const customStyle = `
    #sub-header {
        padding: 10px;
        text-align: center;
        background: #33475a;
        font-size: 0.9rem;
        color: white;
    }
    #secondary-text {
        text-transform: lowercase;
    }
    #secondary-text > .remarks {
        text-transform: uppercase;
    }
    #secondary-text > .expired {
        color: var(--color-primary);
        font-weight: 700;
        text-transform: capitalize;
    }
`;

export default class SummaryCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        this.strength = {regular: 0, nsf: 0};
        this.timeOfDay = 'am';
    }

    setStatusName(name) {
        this.header = name;
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        let remarks = user.status[this.timeOfDay].remarks;
        let expiredText = user.status[this.timeOfDay].expired ? '<span class="remarks"> -- Expired</span>' : '';
        let remarksText = remarks.length > 0 ? `Remarks: <span class="remarks">${remarks}</span>` : '';
        return remarksText + expiredText;
    }

    showStrength() {
        let totol = this.strength.regular + this.strength.nsf;
        this.subHeader = `${totol} Total ~ ${this.strength.regular} Regular + ${this.strength.nsf} Nsf`;
    } 

    addUser(user) {
        super.addUser(user, false);
        let prefix = user.regular ? 'regular' : 'nsf';
        this.strength[prefix] += 1;
        this.showStrength();
    }

    removeUser(user) {
        let prefix = user.regular ? 'regular' : 'nsf';
        this.strength[prefix] -= 1;
        super.removeUser(user, false);
        this.showStrength();
    }   

    changeUser(user) {
        super.changeUser(user, false);
    }

    onUserSelected(uid) {
        
    }

} 