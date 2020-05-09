import Dialogue from '../../base/Dialogue.js';
import { inputStyle } from '../../GlobalStyles.js';
import Rank from '../../../model/Rank.js';
import Utils from '../../../util/Utils.js';

const template = `
    <style>

        ${inputStyle}

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        #department-name {
            width: 100%;
            text-align: center;
            margin: 0;
            font-size: 1.2rem;
            font-weight: 900;
        }

        .header-holder {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        input {
            box-sizing: border-box;
            margin: 0 0 10px;
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

        #change-password {
            --button-font-size: 1rem;
            --button-padding: 0;
            margin: 0 0 0 10px;
        }

        #confirm {
            width: 100%;
            --button-padding: 10px;
            margin-top: 10px;
        }

        .row-box {
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
        }

        .regular-box {
            display: flex;
            align-items: center;
            width: 100%;
        }
        .regular-box input {
            margin: 0 10px 0 0;
        }

        .regular-box .label {
            font-size: 1rem;
        }

    </style>

    <div class="container">
        <p id="department-name"></p>
        <div class="header-holder">
            <h3 id="header">Department</h3>
            <wc-button type="plain" id="delete-user" hidden>delete</wc-button>
        </div>
        <input id="rank" type="text" placeholder="Rank" autocomplete="off" required/>
        <input id="name" type="text" placeholder="Name" autocomplete="off" required/>
        <div class="break"></div>
        <div class="row-box">
            <p id="domain"></p>
            <input id="email" type="text" placeholder="Email" autocomplete="off" required/>
        </div>
        <div class="break"></div>
        <div class="row-box">
            <wc-button type="plain" id="change-password" hidden>change</wc-button>
            <input id="password" minlength="8" type="password" placeholder="Password" autocomplete="off" required/>
        </div>
        <div class="regular-box">
            <input type="checkbox" id="regular">
            <div class="label">Regular serviceman</div>
        </div>
        <wc-button id="confirm">Confirm</wc-button>
        
    </div>
`;

export default class EditUser extends Dialogue {

    constructor() {
        super(template);
        this.shadowRoot.getElementById('confirm').onclick = this.onSubmit.bind(this);
        this.deleteUser = this.shadowRoot.getElementById('delete-user');
        this.changePasswordButton = this.shadowRoot.getElementById('change-password');
        this.domain = this.shadowRoot.getElementById('domain');
        this.emailPrefix = this.shadowRoot.getElementById('email');
        this.rank = this.shadowRoot.getElementById('rank');
        this.name = this.shadowRoot.getElementById('name');
        this.password = this.shadowRoot.getElementById('password');
        this.regular = this.shadowRoot.getElementById('regular');

        this.deleteUser.onclick = this.onDelete.bind(this);
        this.changePasswordButton.onclick = this.changePassword.bind(this);
        this.emailPrefix.oninput = e => {
            this.emailPrefix.value = this.emailPrefix.value.replace(/\W/g, '');
        }
    }

    setController(controller) {
        this.controller = controller;
        this.domain.textContent = '@' + controller.getDomain();
    }

    onDelete(e) {
        this.controller.deleteUser(this.user);
        this.close();
    }

    checkFormValidity(isEdit) {
        let emailValid = this.emailPrefix.checkValidity();
        let nameValid = this.name.checkValidity();
        let rankValid = Rank.isValid(this.rank.value.toUpperCase().trim());
        let passwordValid = this.password.checkValidity();
        if (!rankValid) return { success: false, msg: 'Enter a valid rank' };
        if (!nameValid) return { success: false, msg: 'Enter a valid name' };
        if (!emailValid) return { success: false, msg: 'Enter a valid email' };
        if (!isEdit && !passwordValid) return { success: false, msg: 'Enter a valid password' };
        //emailPrefix, password, name, rank, departmentid
        let user = {};
        user.departmentid = this.departmentId;
        user.emailPrefix = this.emailPrefix.value;
        user.name = this.name.value;
        user.rank = this.rank.value.toUpperCase().trim();
        if (isEdit) user.uid = this.uid;
        if (!isEdit) user.password = this.password.value;
        user.regular = this.regular.checked;
        return { success: true, user };
    }

    onSubmit(e) {
        let formValidity = this.checkFormValidity(this.isEdit);
        if (!formValidity.success) {
            message = formValidity.msg;
        } else {
            if (this.isEdit) this.controller.updateUser(formValidity.user);
            else this.controller.createUser(formValidity.user);
            this.close();
        }
    }

    changePassword(e) {
        let message = 'Password has been changed successfully.';
        if (this.password.checkValidity()) {
            this.controller.updatePassword(this.uid, this.password.value);
            this.password.value = '';
        } else message = 'Please enter a valid password';
        Utils.showToast(message);
    }

    setUser(user) {
        this.user = user;
        this.uid = user.uid;
        this.emailPrefix.value = user.email.split('@')[0];
        this.rank.value = user.rank;
        this.name.value = user.name;
        this.regular.checked = user.regular;
    }

    setDepartment(depId, depName) {
        this.departmentId = depId;
        let depText = this.shadowRoot.getElementById('department-name');
        depText.textContent = depName;
    }

    setEditMode(isEdit) {
        this.isEdit = isEdit;
        let header = this.shadowRoot.getElementById('header');
        if (isEdit) {
            this.deleteUser.hidden = false;
            this.changePasswordButton.hidden = false;
            header.textContent = 'Edit user';
        } else header.textContent = 'Add user';
    }
}