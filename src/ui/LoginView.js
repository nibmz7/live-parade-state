import {inputStyle, cardStyle} from './GlobalStyles.js';
import {BaseElement, html} from './base/BaseElement.js';

const template = html`
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

        <input id="password" type="password" minlength="8" placeholder="Password" autocomplete="off" required>

        <wc-button id="login">Continue</wc-button>

        <p id="error"></p>
    </div>
`;

const ids = ['error','email','password','login'];

export default class LoginView extends BaseElement {

    constructor() {
        super();
        this.render(this.shadowRoot, template, ids);
        this.views.email.onclick = e => {
            this.hideError();
        }
        this.views.password.onclick = e => {
            this.hideError();
        }
 
    }

    onSignIn(listener) {
        this.views.login.onclick = e => {
            let emailInput = this.views.email.validity.valid ? this.views.email.value : false;
            let passwordInput = this.views.password.validity.valid ? this.views.password.value : false;
            if(!emailInput) this.showError("Please enter a valid email!");
            else if(!passwordInput) this.showError("Please enter a valid password!");
            else {
              if(this.isLoading) return;
              this.isLoading = false;
              this.views.login.textContent = "Loading...";
              listener(emailInput, passwordInput);
            }
        }
    }
    
    reset() {
      this.views.login.textContent = "Continue";
      this.views.password.value = '';
      this.isLoading = false;
    }

    showError(message) {
        this.views.error.textContent = message;
        this.views.error.classList.add('show');
    }

    hideError() {
        this.views.error.classList.remove('show');
    }

}