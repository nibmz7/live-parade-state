import Auth from '../data/Auth.js';
import UI from '../ui/index.js';

export default class LoginController {

  constructor() {
    UI.loginScreen();
    this.auth = Auth.getInstance();
    this.viewSwitcher = document.querySelector('view-switcher');
    this.onError = this.onError.bind(this);
  }

  static getInstance() {
    if (!LoginController.instance) LoginController.instance = new LoginController();
    return LoginController.instance;
  }

  activate() {
    this.loginView = document.createElement('login-view');
    this.loginView.bindSignIn((email, password) => {
      this.auth.login(email, password);
    });
    this.auth.on('error', this.onError);
    this.viewSwitcher.showView('login', this.loginView);
  }

  deactivate() {
    this.auth.stop('error', this.onError);
  }

  onError(message) {
    this.loginView.reset();
    this.loginView.showError(message);
  }
}
LoginController.instance = null;