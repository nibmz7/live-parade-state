import {inputStyle} from '../../GlobalStyles.js';
import Dialogue from '../../base/Dialogue.js';

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
            text-transform: capitalize;
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
            <wc-button type="plain" id="delete" hidden>delete</wc-button>
        </div>
        <input id="name" type="name" placeholder="e.g. Log branch" autocomplete="off" required/>
        <wc-button id="confirm">Confirm</wc-button>
    </div>
`;

const ids = ['name','confirm','delete','header'];

export default class EditDepartment extends Dialogue {

    constructor() {
        super();
        this.render(this.views.dialogue, template, ids);
        this.views.confirm.onclick = this.onSubmit.bind(this);
        this.views.delete.onclick = this.onDelete.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    onDelete(e) {
        this.controller.deleteDepartment(this.uid);
        this.showToast('Deleting department and its users.\nThis may take a while...')
        this.close();
    }

    onSubmit(e) {
        let input = this.views.name;
        if(input.validity.valid) {
            if(this.isEdit) this.controller.editDepartment(this.uid, input.value);
            else this.controller.createDepartment(input.value);
            this.close();
        }
    }

    setEditMode(isEdit) {
        this.isEdit = isEdit;
        this.views.delete.hidden = false;
        this.views.header.textContent = isEdit? 'Edit department' : 'Add department';
    }

    setDepartment(uid, name) {
        this.uid = uid;
        this.views.name.value = name;
    }
}