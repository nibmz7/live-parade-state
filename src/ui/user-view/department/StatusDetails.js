import Dialogue from '../../base/Dialogue.js';
import STATUS from '../../../model/Status.js';
import { html } from '../../base/BaseElement.js';

const template = html`

    <style>
        .container {

        }

        .name {
            text-align: center;
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: capitalize;
            color: #2b2929;
            margin-bottom: 10px;
        }

        .status {
            text-align: center;
            margin-bottom: 10px;
            white-space: pre-line;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #823333;
            font-weight: 900;
        }

        .updatedby {
            text-align: center;
            font-size: .6rem;
            white-space: pre-line;
        }

        .remarks {
            text-align: center;
            margin-bottom: 10px;
            text-transform: uppercase;
            font-weight: 700;
            color: #9C27B0;
            font-size: 0.9rem;
        }

        .status > span {
            color: var(--color-primary);
            text-transform: capitalize;
        }

        .seperator {
            margin: 20px;
            height: 1px;
            border-bottom: 3px dashed var(--color-primary);
        }
    </style>

    <div class="container">
        <div class="name"></div>

        <div class="status"></div>
        <div class="remarks"></div>
        <div class="updatedby"></div>

        <div class="seperator"></div>

        <div class="status"></div>
        <div class="remarks"></div>
        <div class="updatedby"></div>
    </div>  
`;

export default class StatusDetails extends Dialogue {

    constructor() {
        super();
        let views = this.views;
        this.render(views.dialogue, template);
        this.name = this.shadowRoot.querySelector('.name');
        this.status = this.shadowRoot.querySelectorAll('.status');
        this.updatedby = this.shadowRoot.querySelectorAll('.updatedby');
        this.remarks = this.shadowRoot.querySelectorAll('.remarks');
    }

    setUser(user, amupdater, pmupdater) {
        this.name.textContent = user.fullname + ' Status';
        this.setInfo(user.status.am, 0, 'am', amupdater);
        this.setInfo(user.status.pm, 1, 'pm', pmupdater);
    } 

    setInfo(status, idx, prefix, updater) {
        let updatedTime = status.timestamp;
        let hasRemark = status.remarks.length > 0;
        let statusName = `${prefix}: ${STATUS[status.code].fullName}`;
        if(status.expired) statusName = ' <span>[Expired]</span>\n' + statusName;
        this.status[idx].innerHTML = statusName;
        this.remarks[idx].textContent = hasRemark ? 'Remarks: ' + status.remarks : '';
        this.updatedby[idx].textContent = `Last verified by ${updater}\non ${updatedTime}`;
    }
} 