import {inputStyle} from '../../../util/GlobalStyles.js';
import Dialogue from '../../widgets/Dialogue.js';

const template = `
    <style>
        ${inputStyle}

        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        input {
            font-size: 1.2rem;
            padding: 10px;
            margin-bottom: 20px;
        }

        .header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #confirm {
            --button-padding: 10px;
        }
    </style>

    <div class="container">
        <div class="header-holder">
            <h3 id="header">Department</h3>
            <wc-button type="plain" id="delete-dep">delete</wc-button>
        </div>
        <input id="name" type="name" placeholder="e.g. Log branch" autocomplete="off" required/>
        <wc-button id="confirm">Confirm</wc-button>
    </div>
`;

export default class EditDepartment extends Dialogue {

    constructor() {
        super(template);
        this.input = this.shadowRoot.getElementById('name');
        let confirm = this.shadowRoot.getElementById('confirm');
        confirm.onclick = this.onSubmit.bind(this);
        let deleteDep = this.shadowRoot.getElementById('delete-dep');
        deleteDep.onclick = e => {
            this.controller.deleteDepartment(this.uid);
            let toast = document.createElement('wc-toast');
            toast.textContent = 'Deleting department and its users. Please wait...';
            document.body.appendChild(toast);
            this.close();
        }
    }

    setController(controller) {
        this.controller = controller;
    }

    onSubmit(e) {
        if(this.input.validity.valid) {
            if(this.isEdit) this.controller.editDepartment(this.uid, this.input.value);
            else this.controller.createDepartment(this.input.value);
            this.close();
        }
    }

    setEditMode(isEdit) {
        this.isEdit = isEdit;
        let header = this.shadowRoot.getElementById('header');
        if(isEdit) {
            header.textContent = 'Edit department';
        } else header.textContent = 'Add department';
    }

    setDepartment(uid, name) {
        this.uid = uid;
        this.input.value = name;
    }
}