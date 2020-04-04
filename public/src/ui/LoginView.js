import {inputStyle, cardStyle} from '../util/GlobalStyles.js';

const template = `
    <style>
        :host {
            width: 70%;
        }

        ${inputStyle}

        ${cardStyle}

        #email {
            margin-bottom: 0px;
        }

        h3 {
            margin: 15px 0 10px;
        }

        .card {
            border-radius: 5px;
            padding: 10px 20px;
        }

        #login {
            --button-font-size: 1rem;
            --button-padding: 7px;
        }

        #error {
            max-height: 0px;
            opacity: 0;
            transition: .5s all;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 0.8rem;
        }

        #error.show {
            max-height: 100px;
            opacity: 1;
        }

    </style>

    <div class="card">
        <h3>Sign in</h3>

        <input id="email" type="email" placeholder="Email" autocomplete="off" required>

        <input id="password" type="password" placeholder="Password" autocomplete="off" required>

        <wc-button id="login">Continue</wc-button>

        <p id="error"></p>
    </div>
`;

export default class LoginView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
        this.error = this.shadowRoot.getElementById('error');
        this.email = this.shadowRoot.getElementById('email');
        this.password = this.shadowRoot.getElementById('password');
        this.login = this.shadowRoot.getElementById('login');

        this.email.onclick = e => {
            this.hideError();
        }

        this.password.onclick = e => {
            this.hideError();
        }
 
    }

    bindSignIn(listener) {
        this.login.onclick = e => {
            let emailInput = this.email.validity.valid ? this.email.value : false;
            let passwordInput = this.password.validity.valid ? this.password.value : false;
            if(emailInput && passwordInput) {
                listener(emailInput, passwordInput);
            } else {
                this.showError("Please enter a valid input!");
            }
        }
    }

    showError(message) {
        this.error.textContent = message;
        this.error.classList.add('show');
    }

    hideError() {
        this.error.classList.remove('show');
    }

}