import Dialogue from '../../widgets/Dialogue.js';
import { inputStyle } from '../../../util/GlobalStyles.js';

const template = `
    <style>

        ${inputStyle}

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        .header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        #confirm {
            width: 100%;
            --button-padding: 10px;
        }

        input {
            box-sizing: border-box;
        }

        #rank {
            text-transform: uppercase;
            width: 25%;
        }
        #rank::placeholder { 
            text-transform: none;
        }
        #name {
            text-transform: capitalize;
            margin-left: 15px;
            width: calc(75% - 15px);
        }

        .break {
            flex-basis: 100%;
            width: 0;
        }

        #email {
            flex-grow: 1;
            min-width: 0;
        }

        #domain {
            margin: 0 15px;
            align-self: center;
        }

        #password {
            flex-grow: 1;
        }

        .row-box {
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
        }

    </style>

    <div class="container">
        <div class="header-holder">
            <h3 id="header">Department</h3>
            <wc-button type="plain" id="delete-user" hidden>delete</wc-button>
        </div>
        <input id="rank" type="text" placeholder="Rank" autocomplete="off" required/>
        <input id="name" type="text" placeholder="Name" autocomplete="off" required/>
        <div class="break"></div>
        <div class="row-box">
            <p id="domain"></p>
            <input id="email" type="text" pattern="^[a-zA-Z0-9]+$" placeholder="Email" autocomplete="off" required/>
        </div>
        <div class="break"></div>
        <input id="password" type="password" placeholder="Password" autocomplete="off" required/>
        <wc-button id="confirm">Confirm</wc-button>
    </div>
`;

export default class EditUser extends Dialogue {

    constructor() {
        super(template);
        this.deleteUser = this.shadowRoot.getElementById('delete-user');
        this.deleteUser.onclick = this.onDelete.bind(this);
        this.domain = this.shadowRoot.getElementById('domain');
        this.email = this.shadowRoot.getElementById('email');
        this.email.oninput = e => {
            this.email.value = this.email.value.replace(' ', '');
        }
    }

    setController(controller) {
        this.controller = controller;
        this.domain.textContent = '@' + controller.getDomain();
    }

    onDelete(e) {

    }

    onSubmit(e) {

    }

    setDepartment(depId, depName) {
        this.departmentId = depId;
    }

    setEditMode(isEdit) {
        this.isEdit = isEdit;
        let header = this.shadowRoot.getElementById('header');
        if (isEdit) {
            this.deleteUser.hidden = false;
            header.textContent = 'Edit user';
        } else header.textContent = 'Add user';
    }
}