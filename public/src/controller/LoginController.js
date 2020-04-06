import Auth from '../data/Auth.js';

export default class LoginController {
    
    constructor() {
        this.auth = Auth.getInstance();
        this.auth.on('signed-out', this.signedOut.bind(this));
        this.auth.on('error', this.error.bind(this));
    }
    
    init() {
      this.loginView = document.createElement('login-view');
      this.viewSwitcher = document.querySelector('view-switcher');
      this.loginView.bindSignIn((email, password) => {
        this.auth.login(email, password);
      });
    }

    signedOut() {
      if(!this.loginView) this.init();
      this.viewSwitcher.showView('login', this.loginView);
    }

    error(e) {
        this.loginView.showError(e.message);
    }
}