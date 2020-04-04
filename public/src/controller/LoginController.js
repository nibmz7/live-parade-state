import Auth from '../data/Auth.js';

export default class LoginController {
    
    constructor() {
        this.auth = Auth.getInstance();
        this.loginView = document.createElement('login-view');

        this.auth.on('signed-out', this.signedOut.bind(this));
        this.auth.on('error', this.error.bind(this));

        this.loginView.bindSignIn((email, password) => {
            this.auth.login(email, password);
        });

        this.viewSwitcher = document.querySelector('view-switcher');
    }

    signedOut() {
        this.viewSwitcher.showView('login', this.loginView);
    }

    error(e) {
        this.loginView.showError(e.message);
    }
}