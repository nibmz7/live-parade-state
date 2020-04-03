const template = `
    <style>
        input {
            font: inherit;
            margin: 15px 0;
            outline: none;
            border: 3px solid;
            border-color: var(--color-primary);
            border-radius: 3px;
            padding: 5px;
            font-size: 0.8rem;
            transition: border-color .2s;
        }

        input:focus {
            animation: glow 1.5s infinite;
        }
            
        @keyframes glow {
            0% { border-color: var(--color-primary); }
            50% { border-color: var(--color-primary-dark); }
            100% { border-color: var(--color-primary); }
        }
    </style>

    <div class="container">

        <input id="email" type="email" placeholder="Email" required>

        <input id="password" type="password" placeholder="Password" required>

        <wc-button id="login">Login</wc-button>

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
    }

    hideError() {

    }

}