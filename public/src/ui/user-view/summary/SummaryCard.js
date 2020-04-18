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
        display: none;
    }
`;

export default class SummaryCard extends BasicDepartmentCard {

    constructor() {
        super(customStyle);
        this.strength = {regular: 0, nsf: 0};
    }

    setStatusName(name) {
        this.header = name;
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        return '';
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
        this.strength[timeOfDay][prefix] -= 1;
        super.removeUser(user.uid);
        this.showStrength();
    }   

    onUserSelected(uid) {
        
    }
} 