import LoginView from '../ui/login-view/LoginView.js';
import Singleton from '../util/Singleton.js';

export default class LoginController extends Singleton {

  constructor() {
    super();
    this.auth = ApplicationContext.getAuth();
    this.viewSwitcher = document.querySelector('view-switcher');
    this.onError = this.onError.bind(this);
  }

  activate() {
    this.loginView = new LoginView();
    this.loginView.onSignIn((email, password) => {
      this.auth.login(email, password);
    });
    this.auth.on('error', this.onError);
    this.viewSwitcher.addView(this.loginView);
  }

  deactivate() {
    this.auth.stop('error', this.onError);
    this.viewSwitcher.removeView(this.loginView);
    this.loginView = null;
  }

  onError(message) {
    this.loginView.reset();
    this.loginView.showError(message);
  }
}
LoginController.instance = null;