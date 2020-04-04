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

        h3 {
            margin-bottom: 5px;
        }

        input {
            font-size: 1.2rem;
            padding: 10px;
            margin-bottom: 20px;
        }

        #confirm {
            --button-padding: 10px;
        }
    </style>

    <div class="container">
        <h3 id="header">Department</h3>
        <input id="name" type="name" placeholder="Log branch etc." autocomplete="off" required/>
        <wc-button id="confirm">Confirm</wc-button>
    </div>
`;

export default class EditDepartment extends Dialogue {

    constructor() {
        super(template);
        this.input = this.shadowRoot.getElementById('name');
        let confirm = this.shadowRoot.getElementById('confirm');
        confirm.onclick = this.onSubmit.bind(this);
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