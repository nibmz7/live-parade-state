import BasicDepartmentCard from "../../widgets/BasicDepartmentCard.js";

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
        text-transform: lowercase;
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
        return remarks.length > 0 ? `Remarks: ${remarks}` : '';
    }

    showStrength() {
        let totol = this.strength.regular + this.strength.nsf;
        this.subHeader = `${totol} Total ~ ${this.strength.regular} Regular + ${this.strength.nsf} Nsf`;
    } 

    addUser(user) {
        super.addUser(user);
        let prefix = user.regular ? 'regular' : 'nsf';
        this.strength[prefix] += 1;
        this.showStrength();
    }

    removeUser(user) {
        let prefix = user.regular ? 'regular' : 'nsf';
        this.strength[prefix] -= 1;
        super.removeUser(user.uid);
        this.showStrength();
    }   

    onUserSelected(uid) {
        let toast = document.createElement('wc-toast');
        toast.textContent = 'Self destruct sequence initiated';
        document.body.appendChild(toast);
    }
} 