import BasicDepartmentCard from "../../base/BasicDepartmentCard.js";
import { html } from "../../base/BaseElement.js";

const template = html`
    <style>
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
        .card {
            counter-reset: total reg nsf;
        }
        #sub-header::before {
            content: counter(total) " Total ~ " counter(reg) " Regular + " counter(nsf) " Nsf";
        }
        #list > .list-item[reg] {
            counter-increment: total reg;
        }
        #list > .list-item[nsf] {
            counter-increment: total nsf;
        }
    </style>
`;

export default class SummaryCard extends BasicDepartmentCard {

    constructor() {
        super();
        this.render(this.shadowRoot, template);
        this.timeOfDay = 'am';
    }

    setStatusName(name) {
        this.views.header.textContent = name;
    }

    getItemPrimaryText(user) {
        return user.fullname;
    }

    getItemSecondaryText(user) {
        let remarks = user.status[this.timeOfDay].remarks;
        let expiredText = user.status[this.timeOfDay].expired ? '<span class="expired"> -- Expired</span>' : '';
        let remarksText = remarks.length > 0 ? `Remarks: <span class="remarks">${remarks}</span>` : '';
        return remarksText + expiredText;
    }

    setListItemData(item, user) {
        super.setListItemData(item, user);
        let attrSet = user.regular ? `reg` : `nsf`;
        let attrRemove = user.regular ? `nsf` : `reg`;
        item.div.setAttribute(attrSet, '');
        item.div.removeAttribute(attrRemove);
    }

    addUser(user) {
        super.addUser(user, false);
    }

    removeUser(user) {
        super.removeUser(user, false);
    }

    changeUser(user) {
        super.changeUser(user, false);
    }

    onUserSelected(uid) { }

} 